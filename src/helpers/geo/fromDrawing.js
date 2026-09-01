/**
 * Between what a drawing tool produces and what schema.org stores.
 *
 * ### Why a translation is needed at all
 *
 * A drawing library speaks GeoJSON and nothing else : a circle drawn on screen
 * comes back as a polygon of many sides, and a rectangle as a polygon of four.
 * Written back that way, « a four-kilometre radius around the warehouse » would
 * become sixty-four numbers that nobody can edit and no one can read.
 *
 * Terra Draw records what drew each feature — `properties.mode` — and the
 * circle mode adds `properties.radiusKilometers`. That is enough to restore the
 * intent : a circle goes back as a centre and a radius, a rectangle as two
 * corners, a polygon as itself.
 *
 * It is the same trick `parseGeoShape` already used with `properties.shape`,
 * arrived at independently by another library, which is mildly reassuring.
 *
 * @module helpers/geo/fromDrawing
 */

import parseGeoShape , { BOX , CIRCLE , POLYGON , toGeoShape } from './parseGeoShape' ;

/** The Terra Draw modes this library exposes, and the member each one writes. */
export const MODES =
{
    circle    : CIRCLE ,
    polygon   : POLYGON ,
    rectangle : BOX ,
} ;

/** The mode that draws each `GeoShape` member, the other way round. */
const DRAWN_BY =
{
    [ BOX ]     : 'rectangle' ,
    [ CIRCLE ]  : 'circle' ,
    [ POLYGON ] : 'polygon' ,
} ;

const METRES_PER_KILOMETRE = 1000 ;

/**
 * The centre of a ring, as the mean of its distinct positions.
 *
 * Exact for the regular polygon a circle mode draws, which is the only case
 * this is asked for.
 *
 * @param {number[][]} ring
 * @returns {number[]|null}
 */
const centreOf = ( ring ) =>
{
    // The last position repeats the first : counting it would pull the mean.
    const positions = ring?.slice( 0 , -1 ) ?? [] ;

    if ( positions.length === 0 )
    {
        return null ;
    }

    const sum = positions.reduce
    (
        ( total , [ longitude , latitude ] ) => [ total[ 0 ] + longitude , total[ 1 ] + latitude ] ,
        [ 0 , 0 ] ,
    ) ;

    return [ sum[ 0 ] / positions.length , sum[ 1 ] / positions.length ] ;
} ;

/**
 * Reads a drawn feature back into a `GeoShape`.
 *
 * @param {Object} feature - A Terra Draw feature.
 * @returns {Object|null} A `GeoShape`, or `null` when the feature is not one this writes.
 *
 * @example
 * ```js
 * fromDrawFeature( drawn ) ; // → { '@type' : 'GeoShape' , circle : '48.75 2.36 4000' }
 * ```
 */
export const fromDrawFeature = ( feature ) =>
{
    const mode  = feature?.properties?.mode ;
    const shape = MODES[ mode ] ;

    if ( !shape )
    {
        return null ;
    }

    if ( shape !== CIRCLE )
    {
        return toGeoShape( feature , { shape } ) ;
    }

    const kilometres = Number( feature?.properties?.radiusKilometers ) ;
    const centre     = centreOf( feature?.geometry?.coordinates?.[ 0 ] ) ;

    if ( !centre || !Number.isFinite( kilometres ) )
    {
        return null ;
    }

    // The drawn shape is a polygon ; what was meant is a centre and a radius,
    // and that is what goes back to the store.
    return toGeoShape
    (
        { type : 'Feature' , geometry : { type : 'Point' , coordinates : centre } , properties : {} } ,
        { radius : kilometres * METRES_PER_KILOMETRE , shape : CIRCLE } ,
    ) ;
} ;

/**
 * Turns a stored `GeoShape` into a feature a drawing tool can take back.
 *
 * The mode is written into the properties so that editing it and saving it
 * again returns the same member it came in as — without that, every reopened
 * circle would be saved back as a polygon.
 *
 * @param {Object} shape - A `GeoShape`.
 * @param {Object} [options]
 * @param {string|number} [options.id] - Kept on the feature, so an edit updates rather than duplicates.
 * @param {Function} [options.circleToPolygon] - `( centre , radius ) => geometry`, since a circle has to be drawn as one.
 * @returns {Object|null}
 */
export const toDrawFeature = ( shape , { circleToPolygon , id } = {} ) =>
{
    const feature = parseGeoShape( shape ) ;

    if ( !feature )
    {
        return null ;
    }

    const member = feature.properties?.shape ;
    const mode   = DRAWN_BY[ member ] ;

    if ( !mode )
    {
        return null ;
    }

    const drawn =
    {
        ...feature ,
        properties : { ...feature.properties , mode } ,
        ...id !== undefined && { id } ,
    } ;

    if ( member !== CIRCLE )
    {
        return drawn ;
    }

    const [ longitude , latitude ] = feature.geometry?.coordinates ?? [] ;
    const radius  = feature.properties?.radius ;
    const polygon = circleToPolygon?.( { latitude , longitude } , radius ) ;

    if ( !polygon )
    {
        return null ;
    }

    return {
        ...drawn ,
        geometry   : polygon ,
        properties : { ...drawn.properties , radiusKilometers : radius / METRES_PER_KILOMETRE } ,
    } ;
} ;

export default fromDrawFeature ;
