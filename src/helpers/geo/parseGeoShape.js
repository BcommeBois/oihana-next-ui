/**
 * Reads a schema.org `GeoShape` into GeoJSON, and writes one back.
 *
 * ### The one place in this folder that touches the axis order
 *
 * schema.org writes its shapes as **text**, in `latitude longitude` order.
 * GeoJSON writes arrays, in `[ longitude , latitude ]` order. Getting that
 * backwards does not raise anything : the geometry draws, somewhere else
 * entirely, and the mistake surfaces days later as "the delivery zone is in
 * the sea". So the inversion happens here and nowhere else — everything around
 * this file names its coordinates, and named coordinates cannot be swapped by
 * accident.
 *
 * ### Tolerant on the separator, strict on the count
 *
 * The spec says space-delimited, publishers also emit commas between the two
 * halves of a point. Both are read. What is not forgiven is a wrong number of
 * values : an odd count, or a polygon of two points, means the payload is
 * wrong and `null` says so.
 *
 * ### Both directions live here, deliberately
 *
 * `toGeoShape` is the way back, and it sits in this file rather than a
 * neighbouring one so the two halves of the same inversion are read side by
 * side. Anywhere else, one could be corrected without the other.
 *
 * @module helpers/geo/parseGeoShape
 */

export const BOX     = 'box' ;
export const CIRCLE  = 'circle' ;
export const LINE    = 'line' ;
export const POLYGON = 'polygon' ;

/**
 * The members read from a `GeoShape`, in the order they are tried.
 * @type {string[]}
 */
export const shapes = [ POLYGON , LINE , BOX , CIRCLE ] ;

const MAX_LATITUDE  = 90 ;
const MAX_LONGITUDE = 180 ;

/**
 * Splits a schema.org shape expression into numbers.
 *
 * @param {string} value
 * @returns {number[]|null}
 */
const readNumbers = ( value ) =>
{
    if ( typeof value !== 'string' )
    {
        return null ;
    }

    const parts = value.trim().split( /[\s,]+/ ).filter( Boolean ) ;

    if ( parts.length === 0 )
    {
        return null ;
    }

    const numbers = parts.map( Number ) ;

    return numbers.every( Number.isFinite ) ? numbers : null ;
} ;

/**
 * Turns a flat `latitude longitude …` list into GeoJSON positions.
 *
 * @param {number[]} numbers
 * @returns {number[][]|null} Positions as `[ longitude , latitude ]`.
 */
const toPositions = ( numbers ) =>
{
    if ( numbers.length % 2 !== 0 )
    {
        return null ;
    }

    const positions = [] ;

    for ( let i = 0 ; i < numbers.length ; i += 2 )
    {
        const latitude  = numbers[ i ] ;
        const longitude = numbers[ i + 1 ] ;

        if ( Math.abs( latitude ) > MAX_LATITUDE || Math.abs( longitude ) > MAX_LONGITUDE )
        {
            return null ;
        }

        positions.push( [ longitude , latitude ] ) ;
    }

    return positions ;
} ;

/**
 * Closes a polygon ring, GeoJSON requiring the first and last positions to be
 * identical where schema.org only recommends it.
 *
 * @param {number[][]} ring
 * @returns {number[][]}
 */
const close = ( ring ) =>
{
    const first = ring[ 0 ] ;
    const last  = ring[ ring.length - 1 ] ;

    return first[ 0 ] === last[ 0 ] && first[ 1 ] === last[ 1 ] ? ring : [ ...ring , first ] ;
} ;

/**
 * @param {number[][]} positions
 * @returns {Object|null}
 */
const readPolygon = ( positions ) =>
{
    // Three distinct corners at least, plus the repeat that closes the ring.
    if ( positions.length < 3 )
    {
        return null ;
    }

    return { type : 'Polygon' , coordinates : [ close( positions ) ] } ;
} ;

/**
 * @param {number[][]} positions
 * @returns {Object|null}
 */
const readLine = ( positions ) => positions.length < 2
    ? null
    : { type : 'LineString' , coordinates : positions } ;

/**
 * Reads the two opposite corners into a rectangle.
 *
 * @param {number[][]} positions
 * @returns {Object|null}
 */
const readBox = ( positions ) =>
{
    if ( positions.length !== 2 )
    {
        return null ;
    }

    const [ [ west , south ] , [ east , north ] ] = positions ;

    return {
        type        : 'Polygon' ,
        coordinates : [ [
            [ west , south ] ,
            [ east , south ] ,
            [ east , north ] ,
            [ west , north ] ,
            [ west , south ] ,
        ] ] ,
    } ;
} ;

/**
 * @typedef {Object} GeoShapeFeature
 * @property {'Feature'} type
 * @property {Object} geometry - A GeoJSON geometry. A circle becomes a `Point`.
 * @property {Object} properties - `{ shape }`, plus `radius` in metres for a circle.
 */

/**
 * Reads a `GeoShape` into a GeoJSON feature.
 *
 * A circle has no GeoJSON equivalent, so it comes back as a `Point` carrying
 * its `radius` in the feature's properties — which is what a renderer needs
 * anyway, a circle on a map being drawn from a centre and a radius.
 *
 * @param {Object|string} shape - A `GeoShape`, or the raw expression when `type` is given.
 * @param {'polygon'|'line'|'box'|'circle'} [type] - The member to read, when `shape` is a raw string.
 * @returns {GeoShapeFeature|null} The feature, or `null` when nothing usable is there.
 *
 * @example
 * ```js
 * parseGeoShape({ polygon : '48.85 2.29 48.87 2.29 48.87 2.37 48.85 2.37' }) ;
 * // → Feature / Polygon, coordinates in [ longitude , latitude ], ring closed
 *
 * parseGeoShape({ circle : '48.8566 2.3522 1500' }) ;
 * // → Feature / Point at [ 2.3522 , 48.8566 ], properties.radius = 1500
 * ```
 */
const parseGeoShape = ( shape , type ) =>
{
    let member = type ;
    let value  = shape ;

    if ( shape && typeof shape === 'object' )
    {
        member = shapes.find( ( name ) => shape[ name ] != null ) ;
        value  = member ? shape[ member ] : null ;
    }

    const numbers = readNumbers( value ) ;

    if ( !member || !numbers )
    {
        return null ;
    }

    let geometry   = null ;
    let properties = { shape : member } ;

    if ( member === CIRCLE )
    {
        // Centre plus radius : three values, and the radius is not a coordinate.
        if ( numbers.length !== 3 )
        {
            return null ;
        }

        const centre = toPositions( numbers.slice( 0 , 2 ) ) ;
        const radius = numbers[ 2 ] ;

        if ( !centre || radius <= 0 )
        {
            return null ;
        }

        geometry   = { type : 'Point' , coordinates : centre[ 0 ] } ;
        properties = { ...properties , radius } ;
    }
    else
    {
        const positions = toPositions( numbers ) ;

        if ( !positions )
        {
            return null ;
        }

        if ( member === POLYGON )
        {
            geometry = readPolygon( positions ) ;
        }
        else if ( member === LINE )
        {
            geometry = readLine( positions ) ;
        }
        else
        {
            geometry = readBox( positions ) ;
        }
    }

    return geometry && { type : 'Feature' , geometry , properties } ;
} ;

/**
 * Trims the float noise a round trip leaves behind.
 *
 * `2.32` read, projected and written back can come out as
 * `2.3200000000000003` — true to the double, useless to a reader, and a diff
 * against the stored value for no reason. Twelve significant digits is well
 * past any coordinate's meaning and short of where the noise starts, which is
 * the same figure `MetricScale` settled on.
 *
 * @param {number} value
 * @returns {number}
 */
const trim = ( value ) => Number( Number( value ).toPrecision( 12 ) ) ;

/**
 * Writes GeoJSON positions back as schema.org text.
 *
 * **The inversion happens again, the other way.** Positions are
 * `[ longitude , latitude ]` and schema.org writes `latitude longitude`.
 *
 * @param {number[][]} positions
 * @returns {string}
 */
const fromPositions = ( positions ) => positions
    .map( ( [ longitude , latitude ] ) => `${ trim( latitude ) } ${ trim( longitude ) }` )
    .join( ' ' ) ;

/**
 * Writes a GeoJSON feature back into a schema.org `GeoShape`.
 *
 * A round trip through `parseGeoShape` and back returns the same member : the
 * shape it read is recorded in `properties.shape`, so a box comes back a box
 * rather than the polygon it was drawn as. Without that hint the member is
 * inferred from the geometry, and a rectangle is then indistinguishable from
 * any other four-cornered polygon — which is correct, since it is.
 *
 * **The values survive, the formatting does not.** `48.900` comes back `48.9` :
 * once the text has been read as a number the two *are* the same number, and
 * nothing says how many decimals to write. A ring also comes back closed, since
 * GeoJSON requires that where schema.org only recommends it.
 *
 * So a store that detects changes by **comparing strings** will see an
 * untouched shape as modified. Compare the numbers, or compare against what a
 * round trip produces rather than against what was first received.
 *
 * @param {Object} feature - A GeoJSON `Feature` or geometry.
 * @param {Object} [options]
 * @param {number} [options.radius] - Metres, for a point being written as a circle.
 * @param {'polygon'|'line'|'box'|'circle'} [options.shape] - Forces the member.
 * @returns {Object|null} A `GeoShape`, or `null` when there is nothing to write.
 *
 * @example
 * ```js
 * toGeoShape( parseGeoShape({ polygon : '48.845 2.32 48.865 2.32 48.865 2.37' }) ) ;
 * // → { '@type' : 'GeoShape' , polygon : '48.845 2.32 48.865 2.32 48.865 2.37 48.845 2.32' }
 * ```
 */
export const toGeoShape = ( feature , { radius , shape } = {} ) =>
{
    const geometry = feature?.geometry ?? feature ;
    const hinted   = shape ?? feature?.properties?.shape ;

    if ( !geometry?.type )
    {
        return null ;
    }

    const written = { '@type' : 'GeoShape' } ;

    if ( geometry.type === 'Point' )
    {
        const metres = radius ?? feature?.properties?.radius ;
        const [ longitude , latitude ] = geometry.coordinates ?? [] ;

        if ( !Number.isFinite( metres ) || !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
        {
            return null ;
        }

        return { ...written , [ CIRCLE ] : `${ trim( latitude ) } ${ trim( longitude ) } ${ trim( metres ) }` } ;
    }

    if ( geometry.type === 'LineString' )
    {
        return { ...written , [ hinted === BOX ? BOX : LINE ] : fromPositions( geometry.coordinates ?? [] ) } ;
    }

    if ( geometry.type !== 'Polygon' )
    {
        return null ;
    }

    const ring = geometry.coordinates?.[ 0 ] ?? [] ;

    if ( ring.length < 4 )
    {
        return null ;
    }

    if ( hinted === BOX )
    {
        // A box is two opposite corners, so the ring collapses back to its own
        // extent rather than to the four points it was drawn with.
        const longitudes = ring.map( ( [ longitude ] ) => longitude ) ;
        const latitudes  = ring.map( ( [ , latitude ] ) => latitude ) ;

        return { ...written , [ BOX ] : fromPositions
        ([
            [ Math.min( ...longitudes ) , Math.min( ...latitudes ) ] ,
            [ Math.max( ...longitudes ) , Math.max( ...latitudes ) ] ,
        ]) } ;
    }

    return { ...written , [ POLYGON ] : fromPositions( ring ) } ;
} ;

export default parseGeoShape ;
