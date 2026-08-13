'use client' ;

import cn from '../../themes/helpers/cn' ;

import {
    DEFAULT_COLORS ,
    getCategoryBarClasses ,
    getCategoryBarLabelsClasses ,
    getCategoryBarMarker ,
    getCategoryBarMeasure ,
    getCategoryBarSegment ,
    getCategoryBarTrackClasses ,
} from '../../themes/components/categoryBar' ;

import MetricLegend from './MetricLegend' ;
import Tooltip      from '../Tooltip' ;

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
 * @param {number} total - The scale the labels are laid out on : the sum of the values, or `max` when it runs further.
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
 * **`measure` turns it into a bullet graph** — Stephen Few's answer to the dashboard gauge.
 * The segments stop being shares of a whole and become *qualitative bands* (poor, fair,
 * good) ; the measure is drawn over them as a thin rule from zero, and `marker` becomes the
 * target. Three of them stacked on a shared `max` compare at a glance, which no gauge does.
 *
 * @module components/metrics/CategoryBar
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative for the bar. Derived from the data when omitted.
 * @param {string} [props.className] - Additional classes on the container.
 * @param {string[]} [props.colors] - Segment colours, cycled. Theme tokens or any CSS colour.
 * @param {boolean} [props.contiguous] - Drop the gaps between segments. Defaults to `true` under `measure`, `false` otherwise.
 * @param {Array<{ color : string , key : string , name : string , tooltip : string , value : number }>} [props.items] - Named segments. Takes precedence over `values`, and unlocks per-segment tooltips and the legend.
 * @param {string} [props.labelsClassName] - Additional classes on the cumulative labels row.
 * @param {string} [props.legendClassName] - Additional classes on the legend.
 * @param {Object} [props.legendProps] - Spread onto the underlying `MetricLegend` — `marker`, `orientation`, `size`.
 * @param {{ animated : boolean , tooltip : string , value : number }} [props.marker] - A threshold to point at, clamped into the bar.
 * @param {string} [props.markerClassName] - Additional classes on the marker.
 * @param {number} [props.max] - The scale the bar is drawn against. It can only extend the domain past the segments, never squeeze them.
 * @param {number|{ animated : boolean , color : string , ring : boolean , tooltip : string , value : number }} [props.measure] - The value read against the bands — what makes the bar a bullet graph.
 * @param {string} [props.measureClassName] - Additional classes on the measure.
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
 *
 * @example A bullet graph : a value, its qualitative bands, and a target
 * ```jsx
 * <CategoryBar
 *     colors  = { QUALITATIVE_COLORS }
 *     marker  = {{ value : 90 , tooltip : 'Objectif' }}
 *     max     = { 120 }
 *     measure = { 82 }
 *     size    = "xl"
 *     values  = { [ 60 , 25 , 15 ] }
 * />
 * ```
 */
const CategoryBar =
({
    ariaLabel ,
    className ,
    colors = DEFAULT_COLORS ,
    contiguous ,
    items ,
    labelsClassName ,
    legendClassName ,
    legendProps ,
    marker ,
    markerClassName ,
    max ,
    measure ,
    measureClassName ,
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

    // A number is the common case ; the object is there for a tooltip or a colour.
    const measured = typeof measure === 'number' ? { value : measure } : measure ;

    // `max` may only *extend* the domain. Allowed to shrink it, it would push the last
    // segments past the end of the track, and there is no honest way to draw that.
    const domain = Math.max( max ?? 0 , total ) ;

    // A zero total has no proportions to show. Every width would divide by it, so the
    // bar falls back to an empty track instead of a row of `NaN%`.
    const segments = total > 0 ? entries.filter( entry => entry.value > 0 ) : [] ;

    // The bands of a bullet are read against the scale, not against each other : the gaps
    // would shift every boundary leftwards. Still overridable, for the caller who wants
    // the gaps back.
    const gapless = contiguous ?? measured != null ;

    // Part of the domain no segment covers — `max` beyond the bands.
    const remainder = domain > total ;

    const labels = showLabels && domain > 0 ? getLabels( entries , domain ) : null ;

    const markerValue = marker ? Math.min( Math.max( marker.value ?? 0 , 0 ) , domain ) : null ;

    const measureValue = measured ? Math.min( Math.max( measured.value ?? 0 , 0 ) , domain ) : null ;

    const marked = marker
        ? getCategoryBarMarker({
            animated  : marker.animated ,
            className : markerClassName ,
            color     : getMarkerColor( markerValue , segments ) ,
            size ,
        })
        : null ;

    const measurement = measured
        ? getCategoryBarMeasure({
            animated  : measured.animated ,
            className : cn( measured.tooltip && 'pointer-events-auto' , measureClassName ) ,
            color     : measured.color ,
            ring      : measured.ring ,
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
                const { className : segmentClassName , style } = getCategoryBarSegment({
                    color      : segment.color ,
                    roundedEnd : !remainder ,
                }) ;

                return (
                    <Band
                        className = { segmentClassName }
                        key       = { segment.key ?? segment.name ?? `segment-${ index }` }
                        style     = {{ ...style , width : `${ ( segment.value / domain ) * 100 }%` }}
                        tip       = { segment.tooltip }
                    />
                ) ;
            } ) : (
                <span className="h-full w-full rounded-full bg-base-300" />
            ) }

            {/*
                The overlay spans the whole track, so it would swallow every segment
                tooltip : it lets pointer events through, and only the measure itself
                takes them back when it has something to say.
            */}
            { measurement ? (
                <div className="pointer-events-none absolute inset-0 flex items-center">
                    <Band
                        className = { measurement.className }
                        style     = {{ ...measurement.style , width : `${ domain > 0 ? ( measureValue / domain ) * 100 : 0 }%` }}
                        tip       = { measured.tooltip }
                    />
                </div>
            ) : null }

            { marked ? (
                <div
                    className = { cn( 'absolute flex w-2 -translate-x-1/2 justify-center' , marker.animated && 'transition-all duration-300 ease-in-out' ) }
                    style     = {{ left : `${ domain > 0 ? ( markerValue / domain ) * 100 : 0 }%` }}
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

    const trackClasses = getCategoryBarTrackClasses({
        background : remainder ,
        className  : trackClassName ,
        contiguous : gapless ,
        size ,
    }) ;

    /*
        The semantics live on the bar rather than on the container : a role collapses its
        whole subtree, and the labels and legend are text worth reading on their own.
        Keeping the role here leaves them audible.

        A measure makes the bar a *meter* — one value, a scale, a reading — where a plain
        partition is only an image of how a whole is divided. Each role is written as a
        literal in its own branch rather than computed, so static analysis can still check
        it against the ARIA attributes that go with it.
    */
    let bar ;

    if ( measured )
    {
        bar = (
            // biome-ignore lint/a11y/useSemanticElements: <meter> is a replaced element — it draws a gauge of its own and treats its children as fallback content, so the qualitative bands, the measure and the marker would never be painted
            <div
                aria-valuemax  = { domain }
                aria-valuemin  = { 0 }
                aria-valuenow  = { measureValue }
                aria-valuetext = { ariaLabel ?? valueFormatter( measureValue ) }
                className      = { trackClasses }
                role           = "meter"
            >
                { track }
            </div>
        ) ;
    }
    else if ( label )
    {
        bar = (
            <div aria-label={ label } className={ trackClasses } role="img">
                { track }
            </div>
        ) ;
    }
    else
    {
        bar = <div className={ trackClasses }>{ track }</div> ;
    }

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

                    <span className="absolute bottom-0 right-0">{ valueFormatter( domain ) }</span>

                </div>
            ) : null }

            { bar }

            { showLegend ? (
                <MetricLegend
                    className      = { legendClassName }
                    items          = { entries }
                    valueFormatter = { valueFormatter }
                    { ...legendProps }
                />
            ) : null }

        </div>
    ) ;
} ;

CategoryBar.displayName = 'CategoryBar' ;

export default CategoryBar ;
