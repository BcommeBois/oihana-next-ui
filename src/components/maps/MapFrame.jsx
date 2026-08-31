'use client' ;

/**
 * Sizing box, lifecycle states and attribution for a map.
 *
 * @module components/maps/MapFrame
 */

import cn from '../../themes/helpers/cn' ;

import { getMapClassNames } from '../../themes/components/map' ;

import EmptyState from '../EmptyState' ;
import Skeleton   from '../Skeleton' ;

/**
 * The minimum any map built on OpenStreetMap data owes its source.
 *
 * Offered as a constant, never as a default : the engine already prints an
 * attribution of its own, and drawing this one beside it credits the same data
 * twice. It is here for a style that declares nothing — pass it explicitly.
 *
 * @type {string}
 */
export const OSM_ATTRIBUTION = '© OpenStreetMap contributors' ;

/**
 * Gives a map the explicit box it needs, and owns its empty, loading and
 * attribution states.
 *
 * **Sizing** — the engine fills its container, and a container with no
 * resolved height measures zero. Same contract as `ChartFrame`, prop for prop :
 * `aspect` takes precedence over `height`, and `maxHeight` caps both.
 *
 * **Attribution is not decoration** — OSM data is under ODbL and the credit is
 * a licence condition — but it is *not* this frame's job by default. MapLibre's
 * own control reads it from the style's sources and from the TileJSON they
 * point to, which is where a provider actually declares it. This draws a label
 * only when it is given one, for a style that declares nothing anywhere.
 *
 * **A named frame is a `section`, not a `role="img"`.** `ChartFrame` collapses
 * its subtree into one labelled image because a chart is hover-driven and its
 * hundreds of paths are noise. A map is the opposite : it pans, zooms and takes
 * keyboard focus, and `img` would hide every one of those controls from
 * assistive technology. A `section` with an accessible name is a region, which
 * is what a map is — a named area of the page you can move around in.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The map.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the frame is an unnamed region.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio (e.g. `16/9`). Takes precedence over `height`.
 * @param {React.ReactNode} [props.attribution] - Source credit drawn by the frame. Omitted, the engine's own control is what credits the data.
 * @param {string} [props.className] - Additional classes.
 * @param {boolean} [props.empty] - Show the empty state instead of the map.
 * @param {string} [props.emptyLabel='No location'] - Title of the default empty state.
 * @param {Object} [props.emptyProps] - Spread onto the default `EmptyState`.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Height in px, or any CSS length. Ignored when `aspect` is set.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the map.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height.
 *
 * @example
 * ```jsx
 * <MapFrame aspect="16/9" loading={ isFetching }>
 *     <MapGL … />
 * </MapFrame>
 * ```
 */
const MapFrame =
({
    children ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    attribution ,
    className ,
    empty = false ,
    emptyLabel = 'No location' ,
    emptyProps ,
    emptyState ,
    height = 400 ,
    loading = false ,
    maxHeight ,
    ...rest
}) =>
{
    const length = ( value ) => ( typeof value === 'number' ? `${ value }px` : value ) ;

    const style = aspect
        ? { aspectRatio : aspect , maxHeight : length( maxHeight ) }
        : { height : length( height ) , maxHeight : length( maxHeight ) } ;

    let content = children ;

    if ( loading )
    {
        content = <Skeleton className="size-full" /> ;
    }
    else if ( empty )
    {
        content = emptyState ?? (
            <EmptyState className="size-full" size="sm" title={ emptyLabel } { ...emptyProps } />
        ) ;
    }

    const body = (
        <>
            { content }
            {
                attribution && !loading && !empty && (
                    <p
                        className = { cn
                        (
                            'pointer-events-none absolute bottom-0 end-0 z-10' ,
                            'rounded-ss-box bg-base-100/75 px-2 py-0.5' ,
                            'text-[0.6875rem] leading-tight text-base-content/70' ,
                        )}
                    >
                        { attribution }
                    </p>
                )
            }
        </>
    ) ;

    // Two branches rather than one element with computed attributes : a named
    // frame is a `section`, which *is* a region once it has an accessible name,
    // and an unnamed `section` is not — so the element carries the distinction
    // instead of an ARIA attribute describing it.
    if ( !( ariaLabel || ariaLabelledBy ) )
    {
        return (
            <div
                aria-busy = { loading || undefined }
                className = { getMapClassNames({ className }) }
                style     = { style }
                { ...rest }
            >
                { body }
            </div>
        ) ;
    }

    return (
        <section
            aria-busy        = { loading || undefined }
            aria-describedby = { ariaDescribedBy }
            aria-label       = { ariaLabelledBy ? undefined : ariaLabel }
            aria-labelledby  = { ariaLabelledBy }
            className        = { getMapClassNames({ className }) }
            style            = { style }
            { ...rest }
        >
            { body }
        </section>
    ) ;
} ;

MapFrame.displayName = 'MapFrame' ;

export default MapFrame ;
