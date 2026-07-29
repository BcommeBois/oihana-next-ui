'use client' ;

/**
 * Sizing box for a responsive chart.
 *
 * @module components/charts/ChartFrame
 */

import cn from '../../themes/helpers/cn' ;

/**
 * Gives a chart the explicit box it needs.
 *
 * nivo's `Responsive*` components measure their parent, and a parent with no
 * resolved height measures zero — which is why raw nivo usage ends up
 * sprinkled with `<div className="w-full h-[500px]">`. This owns that box so
 * the chart components can take a plain `height` or `aspect` prop.
 *
 * `aspect` is usually the better choice : the chart keeps its proportions
 * across breakpoints instead of getting squashed on narrow screens.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The chart.
 * @param {string|number} [props.aspect] - CSS aspect ratio (e.g. `16/9`). Takes precedence over `height`.
 * @param {string} [props.className] - Additional classes.
 * @param {number|string} [props.height=400] - Height in px, or any CSS length.
 *
 * @example
 * ```jsx
 * <ChartFrame aspect="16/9">
 *     <ResponsiveBar ... />
 * </ChartFrame>
 * ```
 */
const ChartFrame =
({
    children ,
    aspect ,
    className ,
    height = 400 ,
    ...rest
}) =>
{
    const style = aspect
        ? { aspectRatio : aspect }
        : { height : typeof height === 'number' ? `${ height }px` : height } ;

    return (
        <div
            className = { cn( 'w-full' , className ) }
            style     = { style }
            { ...rest }
        >
            { children }
        </div>
    ) ;
} ;

ChartFrame.displayName = 'ChartFrame' ;

export default ChartFrame ;
