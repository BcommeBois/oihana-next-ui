'use client' ;

/**
 * A collection of places on a map, optionally grouped.
 *
 * @module components/maps/MapMarkers
 */

import useMapCluster from '../../hooks/useMapCluster' ;
import usePalette    from '../../hooks/usePalette' ;

import { CLUSTER_STEPS , getMapClusterStep } from '../../themes/components/map' ;

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
 * **`clusterPalette` grades the bubbles by how much they hold.** It resolves
 * through the same `usePalette` the charts and the scheduler use, in its
 * sequential mode — a ramp where more reads as stronger, pushed lighter on a
 * dark background and darker on a light one so nothing sinks into the tiles.
 * There are as many colours as there are size steps, so the two cues always
 * agree : a bigger bubble is never a paler one.
 *
 * @param {Object} props
 * @param {boolean|Object} [props.cluster=false] - Group nearby points. An object is passed to supercluster — `radius`, `maxZoom`, `minPoints`.
 * @param {import('../../themes/components/map').MapMarkerColor} [props.clusterColor] - Bubble color, as a theme token. Uniform across levels.
 * @param {Function} [props.clusterLabel] - `( count ) => string`, the accessible name of a bubble.
 * @param {string|string[]} [props.clusterPalette] - A palette name — `'brand'`, `'theme'`, `'nivo'` — or explicit colors. Grades the bubbles by level, and wins over `clusterColor`.
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
    clusterPalette ,
    items ,
    markerProps ,
    onSelect ,
    prefer ,
}) =>
{
    const map = useMapInstance() ;

    // Hooks cannot be called conditionally, so the ramp is always resolved and
    // only used when asked for. It costs a handful of chroma calls, memoized.
    const ramp = usePalette({ count : CLUSTER_STEPS , palette : clusterPalette , sequential : true }) ;

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
                background = { clusterPalette ? ramp[ getMapClusterStep( entry.count ) ] : undefined }
                color      = { clusterColor }
                count      = { entry.count }
                key        = { entry.id }
                latitude   = { entry.latitude }
                longitude  = { entry.longitude }
                onClick    = { () => expand( entry ) }
                title      = { clusterLabel ? clusterLabel( entry.count ) : undefined }
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
