'use client' ;

/**
 * Sizing box and lifecycle states for a responsive chart.
 *
 * @module components/charts/ChartFrame
 */

import isChartDataEmpty from '../../helpers/charts/isChartDataEmpty' ;

import cn from '../../themes/helpers/cn' ;

import Skeleton from '../Skeleton' ;

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
 * @param {Object} props
 * @param {React.ReactNode} props.children - The chart.
 * @param {string|number} [props.aspect] - CSS aspect ratio (e.g. `16/9`). Takes precedence over `height`.
 * @param {string} [props.className] - Additional classes.
 * @param {*} [props.data] - The chart data ; emptiness is derived from it unless `empty` says otherwise.
 * @param {boolean} [props.empty] - Force the empty state, for data shapes this cannot inspect on its own.
 * @param {string} [props.emptyLabel='No data'] - Text shown in the default empty state.
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
    aspect ,
    className ,
    data ,
    empty ,
    emptyLabel = 'No data' ,
    emptyState ,
    height = 400 ,
    loading = false ,
    ...rest
}) =>
{
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
            <div className="flex size-full items-center justify-center text-sm text-base-content/50">
                { emptyLabel }
            </div>
        ) ;
    }

    return (
        <div
            className = { cn( 'w-full' , className ) }
            style     = { style }
            { ...rest }
        >
            { content }
        </div>
    ) ;
} ;

ChartFrame.displayName = 'ChartFrame' ;

export default ChartFrame ;
