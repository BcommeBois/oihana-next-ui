/**
 * Turns a list of schema.org places into a GeoJSON feature collection.
 *
 * This is what a vector source is fed with — clustering, heat maps and any
 * layer-rendered marker take a collection, not React elements. Nothing needs
 * it yet at the point it was written : it exists so that the day a list of
 * markers outgrows the DOM, the conversion is already there and already
 * agrees with `fromSchema` on where a point comes from.
 *
 * @module helpers/geo/toGeoJSON
 */

import fromSchema from './fromSchema' ;

/**
 * Reads the identifier of a record.
 *
 * `_key` is the real unique id in the back office ; `id` is a business id that
 * may collide across types, so it is only the fallback.
 *
 * @param {*} source
 * @returns {string|number|undefined}
 */
const readId = ( source ) => source?._key ?? source?.id ;

/**
 * Converts places into a GeoJSON `FeatureCollection` of points.
 *
 * Sources with no usable position are dropped rather than turned into a
 * feature at `0, 0` — the Gulf of Guinea is where bad coordinates go to be
 * mistaken for real ones.
 *
 * @param {Array} sources - Places, `GeoCoordinates`, or anything `fromSchema` reads.
 * @param {Object} [options]
 * @param {'geo'|'flat'} [options.prefer='geo'] - Forwarded to `fromSchema`.
 * @param {Function} [options.properties] - `( source , point ) => Object`, what each feature carries.
 * @returns {Object} A `FeatureCollection`, empty rather than null when nothing converts.
 *
 * @example
 * ```js
 * toGeoJSON( places , { properties : ( place ) => ({ name : place.name }) } ) ;
 * ```
 */
const toGeoJSON = ( sources , { prefer , properties } = {} ) =>
{
    const features = [] ;

    for ( const source of Array.isArray( sources ) ? sources : [] )
    {
        const point = fromSchema( source , { prefer } ) ;

        if ( !point )
        {
            continue ;
        }

        const id = readId( source ) ;

        features.push({
            type       : 'Feature' ,
            ...id !== undefined && { id } ,
            geometry   : { type : 'Point' , coordinates : [ point.longitude , point.latitude ] } ,
            properties : properties ? properties( source , point ) : {} ,
        }) ;
    }

    return { type : 'FeatureCollection' , features } ;
} ;

export default toGeoJSON ;
