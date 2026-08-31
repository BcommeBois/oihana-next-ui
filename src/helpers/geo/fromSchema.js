/**
 * Reads a schema.org geographic source into the point a map can draw.
 *
 * ### Why an adapter rather than reading the vocabulary directly
 *
 * A `Place` carries its position **twice** : in `geo`, which is the canonical
 * `GeoCoordinates` form, and in its own flat `latitude` / `longitude`. Both are
 * legitimate schema.org, both come out of the back office, and a view that
 * picks whichever it happens to find first draws the same place in two
 * different spots depending on which emitter produced the payload. So the
 * order is decided once, here, and `prefer` lets a caller invert it.
 *
 * ### It reads properties, never `@type`
 *
 * Same rule as the scheduler's adapter : an object carrying `latitude` and
 * `longitude` is a point whether it calls itself `GeoCoordinates`, `Place` or a
 * house subtype nobody declared on this side. `@type` alone is ambiguous
 * without `@context`, so nothing here looks at it.
 *
 * ### It never throws
 *
 * A missing or nonsensical coordinate returns `null`. A map with one point
 * missing is still a map ; an exception thrown while rendering a list of
 * places takes the whole page down.
 *
 * @module helpers/geo/fromSchema
 */

/** Read `geo` first, then the flat properties. */
export const GEO = 'geo' ;

/** Read the flat properties first, then `geo`. */
export const FLAT = 'flat' ;

const MAX_LATITUDE  = 90 ;
const MAX_LONGITUDE = 180 ;

/**
 * The `GeoShape` members. An object carrying one of them describes an area,
 * not a point — `parseGeoShape` is what reads those.
 * @type {string[]}
 */
const SHAPE_MEMBERS = [ 'box' , 'circle' , 'line' , 'polygon' ] ;

/**
 * Reads a number the API may have emitted as a string.
 *
 * @param {*} value
 * @returns {number|null}
 */
const readNumber = ( value ) =>
{
    if ( typeof value === 'number' )
    {
        return Number.isFinite( value ) ? value : null ;
    }

    if ( typeof value === 'string' && value.trim() !== '' )
    {
        const parsed = Number( value ) ;
        return Number.isFinite( parsed ) ? parsed : null ;
    }

    return null ;
} ;

/**
 * Reads an elevation.
 *
 * schema.org allows `'1,000 m'` beside a plain number, and no parse of that is
 * safe — `parseFloat` reads it as 1. Anything that is not cleanly numeric is
 * dropped rather than guessed at.
 *
 * @param {*} value
 * @returns {number|null}
 */
const readElevation = ( value ) => readNumber( value ) ;

/**
 * Reads the coordinate pair an object carries directly.
 *
 * @param {*} source
 * @returns {{ latitude : number , longitude : number }|null}
 */
const readPair = ( source ) =>
{
    if ( !source || typeof source !== 'object' )
    {
        return null ;
    }

    const latitude  = readNumber( source.latitude ) ;
    const longitude = readNumber( source.longitude ) ;

    if ( latitude === null || longitude === null )
    {
        return null ;
    }

    // Out-of-range values are the one class of swap this can catch on its own.
    // A pair that stays in range once inverted — Paris at 48.85 / 2.35 — cannot
    // be told apart here, which is why `parseGeoShape` owns the axis order and
    // nothing else in this folder touches it.
    if ( Math.abs( latitude ) > MAX_LATITUDE || Math.abs( longitude ) > MAX_LONGITUDE )
    {
        return null ;
    }

    return { latitude , longitude } ;
} ;

/**
 * True when the object describes an area rather than a point.
 *
 * @param {*} value
 * @returns {boolean}
 */
const isShape = ( value ) =>
       !!value
    && typeof value === 'object'
    && SHAPE_MEMBERS.some( ( member ) => value[ member ] != null ) ;

/**
 * @typedef {Object} GeoPoint
 * @property {number} latitude - Latitude in WGS 84.
 * @property {number} longitude - Longitude in WGS 84.
 * @property {number|null} elevation - Elevation in metres, when the source gives a clean number.
 * @property {*} source - The original object, untouched.
 */

/**
 * Reads a point out of a `Place`, a `GeoCoordinates` or anything carrying a
 * coordinate pair.
 *
 * @param {*} source - The schema.org object, or a plain `{ latitude , longitude }`.
 * @param {Object} [options]
 * @param {'geo'|'flat'} [options.prefer='geo'] - Which of the two sources wins when a `Place` carries both.
 * @returns {GeoPoint|null} The point, or `null` when there is nothing usable.
 *
 * @example
 * ```js
 * fromSchema({ '@type' : 'Place' , geo : { latitude : 48.8566 , longitude : 2.3522 } }) ;
 * // → { latitude : 48.8566 , longitude : 2.3522 , elevation : null , source : … }
 *
 * // A Place carrying both : `geo` wins by default.
 * fromSchema( place ) ;
 * fromSchema( place , { prefer : 'flat' } ) ;
 * ```
 */
const fromSchema = ( source , { prefer = GEO } = {} ) =>
{
    if ( !source || typeof source !== 'object' )
    {
        return null ;
    }

    // A `geo` holding a GeoShape describes an area and is not a candidate here.
    const geo = isShape( source.geo ) ? null : source.geo ;

    const candidates = prefer === FLAT ? [ source , geo ] : [ geo , source ] ;

    for ( const candidate of candidates )
    {
        const pair = readPair( candidate ) ;

        if ( pair )
        {
            return {
                ...pair ,
                elevation : readElevation( candidate.elevation ?? source.elevation ) ,
                source ,
            } ;
        }
    }

    return null ;
} ;

export default fromSchema ;
