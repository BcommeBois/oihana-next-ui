/**
 * Reads the stops of a route into the order they are served in.
 *
 * ### Why the order is a parameter
 *
 * In the house schema a `DeliveryRouteAssignment` carries `position` — the rank
 * of a stop in its circuit — but **not the place it applies to** : the address
 * is what holds the assignment, not the other way round. So how a payload nests
 * that rank is the application's business, and guessing a property name here
 * would work until the first API that nests it differently.
 *
 * The default reads `position` off the stop itself and falls back to the order
 * the list already came in ; anything else is one accessor away.
 *
 * @module helpers/geo/fromRoute
 */

import fromSchema from './fromSchema' ;

/**
 * @typedef {Object} RouteStop
 * @property {*} item - The source object, untouched.
 * @property {Object} point - What `fromSchema` returned.
 * @property {number} position - The rank read from the payload.
 * @property {number} rank - Its place in the sorted list, from 1.
 */

/**
 * Reads the rank of a stop.
 *
 * `position` may legitimately be a string — the back office stores it as one on
 * some routes — so it is coerced rather than trusted.
 *
 * @param {*} stop
 * @param {number} index
 * @returns {number}
 */
const readPosition = ( stop , index ) =>
{
    const raw = Number( stop?.position ) ;

    return Number.isFinite( raw ) ? raw : index ;
} ;

/**
 * Orders the stops of a route, dropping the ones that cannot be placed.
 *
 * @param {Array} stops - Places, or whatever carries them.
 * @param {Object} [options]
 * @param {Function} [options.place] - `( stop ) => source`, when the place is nested. Defaults to the stop itself.
 * @param {Function} [options.position] - `( stop , index ) => number`, when the rank is nested.
 * @param {'geo'|'flat'} [options.prefer] - Forwarded to `fromSchema`.
 * @returns {RouteStop[]} Ordered, ranked from 1.
 *
 * @example
 * ```js
 * fromRoute( places ) ;
 * fromRoute( places , { position : ( place ) => place.assignment?.position } ) ;
 * ```
 */
export const fromRoute = ( stops , { place , position , prefer } = {} ) =>
{
    const read = [] ;

    ( Array.isArray( stops ) ? stops : [] ).forEach( ( stop , index ) =>
    {
        const source = place ? place( stop ) : stop ;
        const point  = fromSchema( source , { prefer } ) ;

        if ( !point )
        {
            return ;
        }

        read.push({
            item     : stop ,
            point ,
            position : position ? Number( position( stop , index ) ) : readPosition( stop , index ) ,
        }) ;
    } ) ;

    return read
        .sort( ( left , right ) => left.position - right.position )
        .map( ( stop , index ) => ({ ...stop , rank : index + 1 }) ) ;
} ;

/**
 * Turns ordered stops into the line that joins them.
 *
 * **This is not a road.** It is the order of passage drawn as straight
 * segments — which is why whatever displays it draws it dashed. A real path
 * comes from a routing service and is handed in as a geometry of its own.
 *
 * @param {RouteStop[]} stops - As returned by `fromRoute`.
 * @returns {Object|null} A GeoJSON `LineString` feature, or `null` under two stops.
 *
 * @example
 * ```js
 * toRouteLine( fromRoute( places ) ) ;
 * ```
 */
export const toRouteLine = ( stops ) =>
{
    const coordinates = ( stops ?? [] ).map( ( { point } ) => [ point.longitude , point.latitude ] ) ;

    if ( coordinates.length < 2 )
    {
        return null ;
    }

    return {
        type       : 'Feature' ,
        geometry   : { type : 'LineString' , coordinates } ,
        properties : { straight : true } ,
    } ;
} ;

export default fromRoute ;
