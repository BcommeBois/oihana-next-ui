'use client' ;

/**
 * A collection of places on a map, optionally grouped.
 *
 * @module components/maps/MapMarkers
 */

import useMapCluster from '../../hooks/useMapCluster' ;

import { useMapInstance } from './context' ;

import MapCluster from './MapCluster' ;
import MapMarker  from './MapMarker' ;

/**
 * Draws a list of places, and groups them when asked.
 *
 * **It takes the payloads, not points.** `fromSchema` is called here, so a page
 * hands over what its API returned and nothing in between has to convert
 * anything. Whatever cannot be placed is dropped, silently and deliberately —
 * one address a geocoder never resolved should not cost the other two hundred
 * their map.
 *
 * **`markerProps` is how a marker learns what it is.** It receives the source
 * object and returns props merged into the `MapMarker` : colour, icon, title.
 * That keeps the component data-driven — `items` *or* children, never both, as
 * everywhere else in this library — while leaving the mapping from a business
 * type to a colour where it belongs, in the application.
 *
 * **Clustering is off by default.** It changes where the points appear, which
 * is not something a component should decide on a caller's behalf. Turned on,
 * a bubble opens on click by easing to the zoom at which it comes apart.
 *
 * @param {Object} props
 * @param {boolean|Object} [props.cluster=false] - Group nearby points. An object is passed to supercluster — `radius`, `maxZoom`, `minPoints`.
 * @param {import('../../themes/components/map').MapMarkerColor} [props.clusterColor] - Bubble color.
 * @param {Function} [props.clusterLabel] - `( count ) => string`, the accessible name of a bubble.
 * @param {Array} props.items - Places, `GeoCoordinates`, or anything `fromSchema` reads.
 * @param {Function} [props.markerProps] - `( item , point ) => Object`, props merged into each marker.
 * @param {Function} [props.onSelect] - `( item , point ) => void`, called when a single marker is clicked.
 * @param {'geo'|'flat'} [props.prefer] - Forwarded to `fromSchema`.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapMarkers
 *         cluster
 *         items       = { sites }
 *         markerProps = { ( site ) => BY_TYPE[ site['@type'] ] }
 *         onSelect    = { ( site ) => open( site ) }
 *     />
 * </Map>
 * ```
 */
const MapMarkers =
({
    cluster = false ,
    clusterColor ,
    clusterLabel ,
    items ,
    markerProps ,
    onSelect ,
    prefer ,
}) =>
{
    const map = useMapInstance() ;

    const { entries , expand } = useMapCluster({
        enabled : !!cluster ,
        items ,
        map ,
        options : typeof cluster === 'object' ? cluster : undefined ,
        prefer ,
    }) ;

    return entries.map( ( entry ) => entry.cluster
        ? (
            <MapCluster
                color     = { clusterColor }
                count     = { entry.count }
                key       = { entry.id }
                latitude  = { entry.latitude }
                longitude = { entry.longitude }
                onClick   = { () => expand( entry ) }
                title     = { clusterLabel ? clusterLabel( entry.count ) : undefined }
            />
        )
        : (
            <MapMarker
                key       = { entry.id }
                latitude  = { entry.latitude }
                longitude = { entry.longitude }
                onClick   = { onSelect ? () => onSelect( entry.item , entry.point ) : undefined }
                { ...markerProps?.( entry.item , entry.point ) }
            />
        ) ,
    ) ;
} ;

MapMarkers.displayName = 'MapMarkers' ;

export default MapMarkers ;
