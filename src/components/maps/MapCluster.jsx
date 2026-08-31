'use client' ;

/**
 * The bubble that stands for several points.
 *
 * @module components/maps/MapCluster
 */

import readableOn from '../../helpers/colors/readableOn' ;

import { getMapClusterClassNames } from '../../themes/components/map' ;

import { Marker } from './engine' ;

/**
 * Formats a count for a bubble that is 36 to 56 pixels across.
 *
 * Past a thousand the exact figure stops being information and starts being a
 * legibility problem — nobody reads `1 248` off a circle, and the bubble would
 * have to grow to hold it. `1k+` says the one thing the reader needs.
 *
 * @param {number} count
 * @returns {string}
 */
export const formatCount = ( count ) => count >= 1000 ? `${ Math.floor( count / 1000 ) }k+` : String( count ) ;

/**
 * A cluster, drawn in the DOM like the markers it stands for.
 *
 * **It is a button, and its name says what it does.** A circle with a number in
 * it means nothing to a screen reader ; « 24 places, zoom in » is the whole
 * affordance in four words.
 *
 * **A `background` overrides `color` entirely.** A palette ramp gives hex
 * values rather than tokens, so the fill goes inline — and the text colour is
 * then computed from it by contrast, because a hex carries no `-content` pair
 * to lean on.
 *
 * @param {Object} props
 * @param {string} [props.background] - Fill as a colour value. Wins over `color`.
 * @param {string} [props.className] - Additional classes.
 * @param {import('../../themes/components/map').MapMarkerColor} [props.color='primary'] - Bubble color, as a theme token.
 * @param {number} props.count - How many points it stands for.
 * @param {number} props.latitude - Latitude in WGS 84.
 * @param {number} props.longitude - Longitude in WGS 84.
 * @param {Function} [props.onClick] - Usually opens the cluster.
 * @param {string} [props.title] - Accessible name. Falls back to the count alone.
 */
const MapCluster =
({
    background ,
    className ,
    color ,
    count ,
    latitude ,
    longitude ,
    onClick ,
    title ,
    ...rest
}) =>
{
    if ( !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
    {
        return null ;
    }

    const label = title ?? `${ count }` ;

    const painted = !!background ;

    return (
        <Marker
            latitude  = { latitude }
            longitude = { longitude }
            onClick   = { onClick }
            { ...rest }
        >
            <button
                aria-label = { label }
                className  = { getMapClusterClassNames({ className , color : painted ? null : color , count }) }
                style      = { painted ? { background , color : readableOn( background ) } : undefined }
                title      = { label }
                type       = "button"
            >
                { formatCount( count ) }
            </button>
        </Marker>
    ) ;
} ;

MapCluster.displayName = 'MapCluster' ;

export default MapCluster ;
