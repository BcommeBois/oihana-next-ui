'use client' ;

/**
 * A circuit : its stops, in order, and the line that joins them.
 *
 * @module components/maps/MapRoute
 */

import { useEffect , useMemo } from 'react' ;

import { fromRoute , toRouteLine } from '../../helpers/geo/fromRoute' ;

import { colors as tokens } from '../../themes/components/map' ;

import { useMapInstance } from './context' ;

import MapGeoJSON from './MapGeoJSON' ;
import MapMarker  from './MapMarker' ;

/** Room left around a route when the map is fitted to it. */
const PADDING = 48 ;

/**
 * A delivery route.
 *
 * **It draws a geometry, it never computes an itinerary.** Working out the road
 * between two addresses is a call to a routing service — OSRM, Valhalla, a
 * provider — and belongs nowhere near a display component. Hand it a
 * `geometry` and it draws the road ; hand it none and it joins the stops with
 * straight **dashed** segments, the dashes saying « this is an order of
 * passage, not a road ». A solid line there would be a lie about a path nobody
 * computed.
 *
 * **The order comes from the data.** `position` in the house schema, read
 * through `fromRoute` — and the rank goes in the marker, because a route whose
 * order is invisible is a cloud of points.
 *
 * **The colour may come from the data too.** A `DeliveryRouteTerm` carries one,
 * as a hex, and it goes through untouched ; a theme token is resolved against
 * the theme instead. Both end up in the same paint spec.
 *
 * @param {Object} props
 * @param {string} [props.color='primary'] - A theme token, or the colour the route carries.
 * @param {boolean} [props.fit=true] - Bring the map to the whole route on mount.
 * @param {Object} [props.geometry] - The real path, as GeoJSON. Without it the stops are joined by straight dashes.
 * @param {Function} [props.markerProps] - `( stop ) => Object`, props merged into each stop's marker.
 * @param {Function} [props.onSelect] - `( item , point , rank ) => void`, when a stop is clicked.
 * @param {Function} [props.place] - `( stop ) => source`, when the place is nested. Forwarded to `fromRoute`.
 * @param {Function} [props.position] - `( stop , index ) => number`, when the rank is nested. Forwarded to `fromRoute`.
 * @param {'geo'|'flat'} [props.prefer] - Forwarded to `fromSchema`.
 * @param {boolean} [props.showOrder=true] - Print the rank inside each marker.
 * @param {Array} props.stops - The places served, in any order.
 * @param {number} [props.width=4] - Line width in pixels.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapRoute stops={ places } color={ route.color } />
 * </Map>
 * ```
 */
const MapRoute =
({
    color = 'primary' ,
    fit = true ,
    geometry ,
    markerProps ,
    onSelect ,
    place ,
    position ,
    prefer ,
    showOrder = true ,
    stops ,
    width ,
}) =>
{
    const map = useMapInstance() ;

    // A theme token styles the marker through its classes ; anything else — the
    // hex a `DeliveryRouteTerm` carries — has to be painted inline instead.
    const isToken = tokens.includes( color ) ;

    const ordered = useMemo
    (
        () => fromRoute( stops , { place , position , prefer } ) ,
        [ place , position , prefer , stops ] ,
    ) ;

    const line = useMemo( () => geometry ?? toRouteLine( ordered ) , [ geometry , ordered ] ) ;

    // A route almost always overflows the opening view, and a route off-screen
    // is a route nobody sees — the same lesson the address search taught.
    useEffect( () =>
    {
        if ( !fit || !map || ordered.length === 0 )
        {
            return ;
        }

        const bounds = ordered.reduce( ( box , { point } ) =>
        ({
            east  : Math.max( box.east  , point.longitude ) ,
            north : Math.max( box.north , point.latitude ) ,
            south : Math.min( box.south , point.latitude ) ,
            west  : Math.min( box.west  , point.longitude ) ,
        })
        , {
            east  : -Infinity ,
            north : -Infinity ,
            south : Infinity ,
            west  : Infinity ,
        } ) ;

        map.fitBounds( [ [ bounds.west , bounds.south ] , [ bounds.east , bounds.north ] ] , { padding : PADDING } ) ;
    }
    , [ fit , map , ordered ] ) ;

    return (
        <>
            {
                line && (
                    <MapGeoJSON
                        color  = { color }
                        // Straight segments are an order, not a road. A supplied
                        // geometry is the road, so it is drawn solid.
                        dashed = { !geometry }
                        data   = { line }
                        fill   = { false }
                        width  = { width }
                    />
                )
            }

            {
                ordered.map( ( { item , point , rank } ) => (
                    <MapMarker
                        { ...point }
                        background = { isToken ? undefined : color }
                        color      = { isToken ? color : undefined }
                        key        = { item?._key ?? item?.id ?? rank }
                        onClick    = { onSelect ? () => onSelect( item , point , rank ) : undefined }
                        showIcon   = { !showOrder }
                        title      = { item?.name ?? `Stop ${ rank }` }
                        { ...markerProps?.( item , point , rank ) }
                    >
                        { showOrder ? <span className="text-xs font-semibold tabular-nums">{ rank }</span> : null }
                    </MapMarker>
                ) )
            }
        </>
    ) ;
} ;

MapRoute.displayName = 'MapRoute' ;

export default MapRoute ;
