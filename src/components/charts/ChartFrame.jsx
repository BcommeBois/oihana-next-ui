'use client' ;

/**
 * Sizing box and lifecycle states for a responsive chart.
 *
 * @module components/charts/ChartFrame
 */

import isChartDataEmpty from '../../helpers/charts/isChartDataEmpty' ;

import cn from '../../themes/helpers/cn' ;

import EmptyState from '../EmptyState' ;
import Skeleton   from '../Skeleton' ;

/**
 * Gives a chart the explicit box it needs, and owns its empty and loading
 * states.
 *
 * **Sizing** — nivo's `Responsive*` components measure their parent, and a
 * parent with no resolved height measures zero, which is why raw nivo usage
 * ends up sprinkled with `<div className="w-full h-[500px]">`. This owns that
 * box so the chart components take a plain `height` or `aspect` prop.
 * `aspect` is usually the better choice : the chart keeps its proportions
 * across breakpoints instead of getting squashed on narrow screens.
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
 * @param {string|number} [props.aspect] - CSS aspect ratio (e.g. `16/9`). Takes precedence over `height`.
 * @param {string} [props.className] - Additional classes.
 * @param {*} [props.data] - The chart data ; emptiness is derived from it unless `empty` says otherwise.
 * @param {boolean} [props.empty] - Force the empty state, for data shapes this cannot inspect on its own.
 * @param {string} [props.emptyLabel='No data'] - Title of the default empty state.
 * @param {Object} [props.emptyProps] - Spread onto the default `EmptyState` — `icon`, `description`, `actions`, `announce`, `size`… Ignored when `emptyState` replaces it. **Only reachable on `ChartFrame` itself**: the fourteen chart wrappers forward `emptyLabel` and `emptyState` only, so from a chart a rich empty state goes through `emptyState={ <EmptyState … /> }`.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Height in px, or any CSS length.
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

    const style = aspect
        ? { aspectRatio : aspect }
        : { height : typeof height === 'number' ? `${ height }px` : height } ;

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

    const frameClassName = cn( 'w-full' , className ) ;

    // Two branches rather than a computed `role` : written as a literal, the role can
    // still be checked against the ARIA attributes by static analysis, which is what
    // caught the `aria-busy` / `aria-label` mismatch a conditional had introduced here.
    if ( !describesChart )
    {
        return (
            <div className={ frameClassName } style={ style } { ...rest }>
                { content }
            </div>
        ) ;
    }

    return (
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
} ;

ChartFrame.displayName = 'ChartFrame' ;

export default ChartFrame ;
