'use client' ;

/**
 * Sizing box and lifecycle states for a responsive chart.
 *
 * @module components/charts/ChartFrame
 */

import isChartDataEmpty from '../../helpers/charts/isChartDataEmpty' ;

import cn from '../../themes/helpers/cn' ;

import MetricLegend from '../metrics/MetricLegend' ;

import EmptyState from '../EmptyState' ;
import Skeleton   from '../Skeleton' ;

/**
 * How the frame lays itself out around its legend.
 *
 * Written as four literal pairs rather than composed from the position :
 * Tailwind v4 scans source text, and a class built from a variable never
 * appears in it. The chart box takes `min-w-0` beside a legend so a long
 * name cannot push it out of the row.
 *
 * @type {Object.<string,{ frame : string , legend : string }>}
 */
const LEGEND_LAYOUT =
{
    bottom : { frame : 'flex w-full flex-col gap-3'          , legend : 'justify-center' } ,
    top    : { frame : 'flex w-full flex-col gap-3'          , legend : 'justify-center' } ,
    right  : { frame : 'flex w-full flex-row items-center gap-4' , legend : '' } ,
    left   : { frame : 'flex w-full flex-row items-center gap-4' , legend : '' } ,
} ;

/**
 * The positions that put the legend beside the chart rather than under it.
 * @type {string[]}
 */
const SIDE_POSITIONS = [ 'left' , 'right' ] ;

/**
 * The positions that put the legend before the chart in reading order.
 * @type {string[]}
 */
const LEADING_POSITIONS = [ 'top' , 'left' ] ;

/**
 * Gives a chart the explicit box it needs, and owns its empty and loading
 * states.
 *
 * **Sizing** — nivo's `Responsive*` components measure their parent, and a
 * parent with no resolved height measures zero, which is why raw nivo usage
 * ends up sprinkled with `<div className="w-full h-[500px]">`. This owns that
 * box so the chart components take a plain `height` or `aspect` prop.
 * `aspect` is usually the better choice : the chart keeps its proportions
 * across breakpoints instead of getting squashed on narrow screens. On a
 * circular chart it is close to mandatory — a radial shape takes its radius
 * from the *smaller* inner dimension, so a fixed height that fits a desktop
 * leaves two large empty bands on a phone, where the width is what limits the
 * circle. `aspect` with `maxHeight` gives the box the width's proportions and
 * stops it growing as tall as it is wide on a large screen.
 *
 * **States** — every chart passes through here, so this is where "no data
 * yet" and "no data at all" are handled once rather than guarded at all
 * fourteen call sites. Without it, a chart fed from an API renders a blank
 * frame while loading and an indistinguishable blank frame when the query
 * comes back empty.
 *
 * The box keeps its size in all three states, so the page does not jump when
 * the data lands.
 *
 * **Accessibility lives here, not on the nivo component.** nivo's aria
 * support is uneven across its packages — `@nivo/pie`, `@nivo/calendar` and
 * `@nivo/marimekko` accept only `role`, with no `ariaLabel` — so forwarding
 * to it would leave four of the twelve charts with no text alternative. The
 * attributes go on this wrapper instead, which makes them uniform and
 * independent of what each package happens to implement.
 *
 * **The legend is drawn here, in HTML, and deliberately outside that role.**
 * `role="img"` collapses everything under it into one labelled image, so a
 * legend placed inside would be unreadable to a screen reader — which is what
 * nivo's in-SVG legend was. Out here it is an ordinary list, read as text.
 *
 * `role="img"` hides the SVG internals from assistive technology, which is
 * what you want : hundreds of unlabelled paths are noise, and `ariaLabel`
 * is the readable summary that replaces them. It suits these charts because
 * they are hover-driven, not keyboard-interactive. A caller who genuinely
 * needs another role can still pass `role` through, since the spread
 * lands last.
 *
 * The role and its label **step aside while the frame is empty**. Collapsing
 * the subtree into one labelled image is right for a chart and wrong for a
 * placeholder : it made the empty text unreadable — only `ariaLabel` was ever
 * announced — and it would silently swallow anything richer put in its place,
 * a description, a retry button, a live region.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The chart.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Required in practice — a chart without one is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio (e.g. `16/9`). Takes precedence over `height` — pair it with `maxHeight` to stop a wide frame from growing as tall as it is wide.
 * @param {string} [props.className] - Additional classes.
 * @param {*} [props.data] - The chart data ; emptiness is derived from it unless `empty` says otherwise.
 * @param {boolean} [props.empty] - Force the empty state, for data shapes this cannot inspect on its own.
 * @param {string} [props.emptyLabel='No data'] - Title of the default empty state.
 * @param {Object} [props.emptyProps] - Spread onto the default `EmptyState` — `icon`, `description`, `actions`, `announce`, `size`… Ignored when `emptyState` replaces it. **Only reachable on `ChartFrame` itself**: the fourteen chart wrappers forward `emptyLabel` and `emptyState` only, so from a chart a rich empty state goes through `emptyState={ <EmptyState … /> }`.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Height in px, or any CSS length. Ignored when `aspect` is set.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height, in px or any CSS length. **This is what makes `aspect` usable on a circular chart** : a radial shape is sized by the smaller inner dimension, so a box with a fixed height wastes on a phone exactly what it saves on a desktop — the circle shrinks with the width while the box keeps its height, and the room left over becomes two empty bands. `aspect` ties the box to the width instead, and `maxHeight` keeps it from turning a wide card into a square one.
 * @param {Object} [props.legend] - The legend to draw, as resolved by `useChartLegend`. `null` or omitted draws none, and the frame then renders exactly as it did before it could.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 *
 * @example
 * ```jsx
 * <ChartFrame aspect="16/9" data={ data } loading={ isFetching }>
 *     <ResponsiveBar ... />
 * </ChartFrame>
 * ```
 *
 * @example
 * ```jsx
 * // Custom empty state
 * <ChartFrame data={ data } emptyState={ <RefreshButton onClick={ reload } /> }>
 *     <ResponsiveBar ... />
 * </ChartFrame>
 * ```
 */
const ChartFrame =
({
    children ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    className ,
    data ,
    empty ,
    emptyLabel = 'No data' ,
    emptyProps ,
    emptyState ,
    height = 400 ,
    legend ,
    maxHeight ,
    loading = false ,
    ...rest
}) =>
{
    if ( process.env.NODE_ENV === 'development' && !ariaLabel && !ariaLabelledBy )
    {
        console.warn(
            '[charts] This chart has no text alternative and is invisible to a screen reader. ' +
            'Pass `ariaLabel` with a one-sentence summary of what it shows, or `ariaLabelledBy` ' +
            'pointing at a visible heading.' ,
        ) ;
    }

    const length = ( value ) => ( typeof value === 'number' ? `${ value }px` : value ) ;

    const style = aspect
        ? { aspectRatio : aspect , maxHeight : length( maxHeight ) }
        : { height : length( height ) , maxHeight : length( maxHeight ) } ;

    // An explicit `empty` wins : chord and marimekko know things about their
    // own shape that no generic inspection could work out.
    const isEmpty = empty ?? isChartDataEmpty( data ) ;

    let content = children ;

    if ( loading )
    {
        content = <Skeleton className="size-full" /> ;
    }
    else if ( isEmpty )
    {
        content = emptyState ?? (
            <EmptyState className="size-full" size="sm" title={ emptyLabel } { ...emptyProps } />
        ) ;
    }

    // `role="img"` collapses the whole subtree into a single labelled image, which is
    // right for the chart — but wrong the moment there is no chart. It made the empty
    // text unreadable to a screen reader (only `ariaLabel` was ever announced), and it
    // would silently swallow anything richer put in its place : a description, a retry
    // button, an `announce` live region. So the role and its label step aside while the
    // frame holds an empty state, and the text inside speaks for itself.
    //
    // Loading keeps the role : the frame still stands in for the chart that is coming,
    // nothing readable is being hidden, and `aria-busy` needs a role to sit on.
    const describesChart = loading || !isEmpty ;

    // An empty frame names nothing, so it carries no legend either — the entries
    // would still be there when `empty` is forced over data the frame cannot read,
    // as `MarimekkoChart` does with an incomplete accessor.
    const drawnLegend = isEmpty ? null : legend ;

    const beside  = SIDE_POSITIONS.includes( drawnLegend?.position ) ;
    const leading = LEADING_POSITIONS.includes( drawnLegend?.position ) ;

    // Standing alone the box owns the width ; beside a legend the row owns it and
    // the box takes what is left, `min-w-0` keeping a long name from pushing it out.
    const frameClassName = cn( beside ? 'min-w-0 flex-1' : 'w-full' , className ) ;

    // Two branches rather than a computed `role` : written as a literal, the role can
    // still be checked against the ARIA attributes by static analysis, which is what
    // caught the `aria-busy` / `aria-label` mismatch a conditional had introduced here.
    let box ;

    if ( !describesChart )
    {
        box = (
            <div className={ frameClassName } style={ style } { ...rest }>
                { content }
            </div>
        ) ;
    }
    else
    {
        box = (
            <div
                aria-busy        = { loading || undefined }
                aria-describedby = { ariaDescribedBy }
                aria-label       = { ariaLabelledBy ? undefined : ariaLabel }
                aria-labelledby  = { ariaLabelledBy }
                className        = { frameClassName }
                role             = "img"
                style            = { style }
                { ...rest }
            >
                { content }
            </div>
        ) ;
    }

    // No legend, no wrapper : the frame renders exactly what it rendered before it
    // could carry one, which is what keeps the remaining charts untouched.
    if ( !drawnLegend )
    {
        return box ;
    }

    const layout = LEGEND_LAYOUT[ drawnLegend.position ] ?? LEGEND_LAYOUT.bottom ;

    const list = (
        <MetricLegend
            className      = { cn( layout.legend , drawnLegend.className ) }
            items          = { drawnLegend.items }
            marker         = { drawnLegend.marker }
            orientation    = { drawnLegend.orientation ?? ( beside ? 'vertical' : undefined ) }
            size           = { drawnLegend.size }
            valueFormatter = { drawnLegend.valueFormatter }
        />
    ) ;

    // Placed in reading order rather than flipped with `flex-*-reverse` : a screen
    // reader follows the DOM, not the painted layout.
    return (
        <div className={ layout.frame }>
            { leading ? list : null }
            { box }
            { leading ? null : list }
        </div>
    ) ;
} ;

ChartFrame.displayName = 'ChartFrame' ;

export default ChartFrame ;
