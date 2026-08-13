'use client' ;

import cn from '../../themes/helpers/cn' ;

import {
    DEFAULT_COLORS ,
    getCategoryBarClasses ,
    getCategoryBarLabelsClasses ,
    getCategoryBarLegendClasses ,
    getCategoryBarLegendDot ,
    getCategoryBarMarker ,
    getCategoryBarSegment ,
    getCategoryBarTrackClasses ,
} from '../../themes/components/categoryBar' ;

import Tooltip from '../Tooltip' ;

/**
 * Formats a value for the cumulative labels and the legend.
 *
 * @param {number} value - The value to format.
 * @returns {string} The formatted value.
 */
const formatValue = ( value ) => Number.isInteger( value ) ? String( value ) : value.toFixed( 1 ) ;

/**
 * Decides which cumulative labels can be shown without crowding.
 *
 * The rule is proportional, not pixel-based : a label appears when its own segment is
 * wide enough to carry it, or when enough consecutive segments have been skipped that
 * the reader has lost the thread — and never within a tenth of either end, where it
 * would collide with the `0` and total anchors.
 *
 * @param {Array<{ key : string , name : string , value : number }>} entries - The segments.
 * @param {number} total - The sum of their values.
 * @returns {Array<{ cumulative : number , key : string , visible : boolean , width : number }>} One label per segment.
 */
const getLabels = ( entries , total ) =>
{
    let cumulative = 0 ;
    let skipped    = 0 ;

    return entries.map( ( entry , index ) =>
    {
        const value = entry.value ;

        cumulative += value ;

        const visible = ( value >= 0.1 * total || skipped >= 0.09 * total )
            && cumulative >= 0.1 * total
            && total - cumulative >= 0.1 * total ;

        skipped = visible ? 0 : skipped + value ;

        return {
            cumulative ,
            key     : entry.key ?? entry.name ?? `segment-${ index }` ,
            visible ,
            width   : ( value / total ) * 100 ,
        } ;
    } ) ;
} ;

/**
 * Finds the colour of the segment the marker lands on.
 *
 * @param {number} value - The clamped marker value.
 * @param {Array<{ color : string , value : number }>} segments - The segments, in order.
 * @returns {string | undefined} The colour of the segment under the marker.
 */
const getMarkerColor = ( value , segments ) =>
{
    let cumulative = 0 ;

    for ( const segment of segments )
    {
        cumulative += segment.value ;

        if ( cumulative >= value )
        {
            return segment.color ;
        }
    }

    return segments[ segments.length - 1 ]?.color ;
} ;

/**
 * A coloured band, wrapped in a tooltip only when there is something to say.
 *
 * `Tooltip` renders its children and nothing else when it is disabled, and these bands
 * have no children — so the choice has to be made here rather than through its `show`
 * prop, which would leave the segment invisible.
 *
 * @param {Object} props
 * @param {string} props.className - The band classes.
 * @param {Object} [props.style] - The band inline style.
 * @param {string} [props.tip] - The tooltip text.
 */
const Band = ( { className , style , tip } ) => tip
    ? <Tooltip as="span" className={ className } style={ style } tip={ tip } />
    : <span className={ className } style={ style } /> ;

/**
 * A horizontal bar splitting a total into proportional segments — a budget across
 * categories, a quota across plans, a score across bands.
 *
 * **Not a progress bar.** `Progress` shows one value against a maximum ; this shows how a
 * whole is *divided*. Reach for `Progress` when there is a single quantity to report.
 *
 * **Colours are theme tokens** (`'primary'`, `'success'`…), so the bar follows the DaisyUI
 * theme and needs no dark-mode variant. Any other CSS colour — a hex, an `oklch()` — is
 * accepted too and lands as an inline style, which is how a bar gets aligned with the
 * colours of a chart next to it.
 *
 * **Two ways to label it, and they suit different screens.** `showLabels` draws the
 * running totals above the bar, in the manner of a ruler ; it reads well on a wide
 * container and crowds on a narrow one, so labels that cannot fit are dropped rather than
 * overlapped. `showLegend` — which needs `items`, since it has names to show — wraps onto
 * as many rows as it needs and is the better answer on mobile. Both default to `false` :
 * a bar embedded in a card usually has its own heading already.
 *
 * @module components/metrics/CategoryBar
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative for the bar. Derived from the data when omitted.
 * @param {string} [props.className] - Additional classes on the container.
 * @param {string[]} [props.colors] - Segment colours, cycled. Theme tokens or any CSS colour.
 * @param {Array<{ color : string , key : string , name : string , tooltip : string , value : number }>} [props.items] - Named segments. Takes precedence over `values`, and unlocks per-segment tooltips and the legend.
 * @param {string} [props.labelsClassName] - Additional classes on the cumulative labels row.
 * @param {string} [props.legendClassName] - Additional classes on the legend.
 * @param {{ animated : boolean , tooltip : string , value : number }} [props.marker] - A threshold to point at, clamped into the bar.
 * @param {string} [props.markerClassName] - Additional classes on the marker.
 * @param {React.Ref} [props.ref] - Forwarded to the container.
 * @param {boolean} [props.showLabels=false] - Draw the running totals above the bar.
 * @param {boolean} [props.showLegend=false] - Draw a wrapping legend under the bar. Needs `items`.
 * @param {import('../../themes/components/categoryBar').CategoryBarSize|Object} [props.size='md'] - Bar thickness, scalar or per breakpoint.
 * @param {string} [props.trackClassName] - Additional classes on the track.
 * @param {Function} [props.valueFormatter] - Formats the labels and legend values : `( value ) => string`.
 * @param {number[]} [props.values] - Segment values. Ignored when `items` is given.
 *
 * @example Plain proportions
 * ```jsx
 * <CategoryBar values={ [ 70 , 18 , 12 ] } />
 * ```
 *
 * @example Named segments, legend, and a threshold
 * ```jsx
 * <CategoryBar
 *     items={[
 *         { name : 'Disponible' , value : 60 , color : 'success' } ,
 *         { name : 'Réservé'    , value : 25 , color : 'warning' } ,
 *         { name : 'Dépassé'    , value : 15 , color : 'error'   } ,
 *     ]}
 *     marker         = {{ value : 70 , tooltip : 'Objectif' }}
 *     showLegend
 *     valueFormatter = { value => `${ value } Go` }
 * />
 * ```
 *
 * @example Aligned on a chart palette
 * ```jsx
 * <CategoryBar values={ [ 40 , 35 , 25 ] } colors={ [ '#4E79A7' , '#F28E2C' , '#E15759' ] } />
 * ```
 */
const CategoryBar =
({
    ariaLabel ,
    className ,
    colors = DEFAULT_COLORS ,
    items ,
    labelsClassName ,
    legendClassName ,
    marker ,
    markerClassName ,
    ref ,
    showLabels = false ,
    showLegend = false ,
    size = 'md' ,
    trackClassName ,
    valueFormatter = formatValue ,
    values = [] ,
    ...rest
}) =>
{
    const source = Array.isArray( items ) && items.length > 0
        ? items
        : values.map( value => ( { value } ) ) ;

    // Negative values would push the total below the sum of the parts and hand every
    // width a wrong denominator, so they are floored rather than trusted.
    const entries = source.map( ( entry , index ) => ({
        ...entry ,
        color : entry.color ?? colors[ index % colors.length ] ,
        value : Math.max( entry.value ?? 0 , 0 ) ,
    }) ) ;

    const total = entries.reduce( ( sum , entry ) => sum + entry.value , 0 ) ;

    // A zero total has no proportions to show. Every width would divide by it, so the
    // bar falls back to an empty track instead of a row of `NaN%`.
    const segments = total > 0 ? entries.filter( entry => entry.value > 0 ) : [] ;

    const labels = showLabels && total > 0 ? getLabels( entries , total ) : null ;

    const markerValue = marker ? Math.min( Math.max( marker.value ?? 0 , 0 ) , total ) : null ;

    const marked = marker
        ? getCategoryBarMarker({
            animated  : marker.animated ,
            className : markerClassName ,
            color     : getMarkerColor( markerValue , segments ) ,
            size ,
        })
        : null ;

    const label = ariaLabel ?? entries
        .map( entry => entry.name ? `${ entry.name } : ${ valueFormatter( entry.value ) }` : valueFormatter( entry.value ) )
        .join( ', ' ) ;

    const track = (
        <>
            { segments.length > 0 ? segments.map( ( segment , index ) =>
            {
                const { className : segmentClassName , style } = getCategoryBarSegment({ color : segment.color }) ;

                return (
                    <Band
                        className = { segmentClassName }
                        key       = { segment.key ?? segment.name ?? `segment-${ index }` }
                        style     = {{ ...style , width : `${ ( segment.value / total ) * 100 }%` }}
                        tip       = { segment.tooltip }
                    />
                ) ;
            } ) : (
                <span className="h-full w-full rounded-full bg-base-300" />
            ) }

            { marked ? (
                <div
                    className = { cn( 'absolute flex w-2 -translate-x-1/2 justify-center' , marker.animated && 'transition-all duration-300 ease-in-out' ) }
                    style     = {{ left : `${ total > 0 ? ( markerValue / total ) * 100 : 0 }%` }}
                >
                    <Band
                        className = { marked.className }
                        style     = { marked.style }
                        tip       = { marker.tooltip }
                    />
                </div>
            ) : null }
        </>
    ) ;

    return (
        <div className={ getCategoryBarClasses({ className }) } ref={ ref } { ...rest }>

            { labels ? (
                <div className={ getCategoryBarLabelsClasses({ className : labelsClassName }) } aria-hidden="true">

                    <span className="absolute bottom-0 left-0">{ valueFormatter( 0 ) }</span>

                    { labels.map( ( item ) => (
                        <span
                            className = "flex justify-end pr-0.5"
                            key       = { item.key }
                            style     = {{ width : `${ item.width }%` }}
                        >
                            { item.visible ? (
                                <span className="translate-x-1/2">{ valueFormatter( item.cumulative ) }</span>
                            ) : null }
                        </span>
                    ) ) }

                    <span className="absolute bottom-0 right-0">{ valueFormatter( total ) }</span>

                </div>
            ) : null }

            {/*
                The label lives on the bar rather than on the container : `role="img"`
                collapses its whole subtree, and the labels and legend are text worth
                reading on their own. Keeping the role here leaves them audible.

                Two branches rather than a computed role : written as a literal, the role
                can still be checked against the ARIA attributes by static analysis.
            */}
            { label ? (
                <div
                    aria-label = { label }
                    className  = { getCategoryBarTrackClasses({ className : trackClassName , size }) }
                    role       = "img"
                >
                    { track }
                </div>
            ) : (
                <div className={ getCategoryBarTrackClasses({ className : trackClassName , size }) }>
                    { track }
                </div>
            ) }

            { showLegend && entries.length > 0 ? (
                <ul className={ getCategoryBarLegendClasses({ className : legendClassName }) }>
                    { entries.map( ( entry , index ) =>
                    {
                        const { className : dotClassName , style } = getCategoryBarLegendDot({ color : entry.color }) ;

                        return (
                            <li className="flex items-center gap-1.5" key={ entry.key ?? entry.name ?? `segment-${ index }` }>
                                <span aria-hidden="true" className={ dotClassName } style={ style } />
                                <span className="text-base-content/70">{ entry.name }</span>
                                <span className="font-medium tabular-nums">{ valueFormatter( entry.value ) }</span>
                            </li>
                        ) ;
                    } ) }
                </ul>
            ) : null }

        </div>
    ) ;
} ;

CategoryBar.displayName = 'CategoryBar' ;

export default CategoryBar ;
