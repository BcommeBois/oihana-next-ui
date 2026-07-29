'use client' ;

/**
 * Radial bar chart — bars wrapped around a circle.
 *
 * @module components/charts/RadialBarChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveRadialBar } from '@nivo/radial-bar' ;

import { useMedia } from 'react-use' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { getChartLegends } from '../../themes/charts/legends' ;
import { getRadialMargin } from '../../themes/charts/margins' ;
import { NIVO }            from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Counts the distinct categories across every serie.
 *
 * nivo colors radial bars by category, not by serie, so this — and not
 * `data.length` — is how many colors the palette must yield.
 *
 * @param {Array} [data] - The series.
 * @returns {number} The number of distinct categories.
 */
const countCategories = ( data ) =>
{
    const categories = new Set() ;

    data?.forEach( ( serie ) =>
    {
        serie?.data?.forEach( ( datum ) =>
        {
            categories.add( datum?.x ) ;
        } ) ;
    } ) ;

    return categories.size ;
} ;

/**
 * Radial bar chart.
 *
 * Each serie is a ring, each datum a segment of that ring — useful for
 * comparing a handful of series across the same few categories, where a
 * grouped bar chart would read as a wall.
 *
 * **SVG only** : nivo ships no canvas renderer for this chart, so there is
 * no `renderer` prop. With enough rings to need canvas, a heatmap is the
 * better chart anyway.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {boolean|Object} [props.circularAxis=true] - Outer circular axis ; an object is passed through to nivo.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {number} [props.cornerRadius=2] - Rounding of the bar ends.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {number} [props.innerRadius=0.3] - Size of the hole, `0` to `1`.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxValue='auto'] - Upper bound of the value scale.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {number} [props.padding=0.2] - Gap between rings.
 * @param {string|string[]} [props.palette='nivo'] - Category palette.
 * @param {boolean|Object} [props.radialAxis=true] - Starting radial axis ; an object is passed through to nivo.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <RadialBarChart
 *     data = {[
 *         { id : 'Supermarket' , data : [ { x : 'vegetables' , y : 92 } , { x : 'fruits' , y : 47 } ] } ,
 *         { id : 'Combini'     , data : [ { x : 'vegetables' , y : 63 } , { x : 'fruits' , y : 88 } ] } ,
 *     ]}
 * />
 * ```
 */
const RadialBarChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    circularAxis = true ,
    className ,
    cornerRadius = 2 ,
    data ,
    emptyLabel ,
    emptyState ,
    height = 400 ,
    innerRadius = 0.3 ,
    legend = 'bottom' ,
    loading ,
    margin ,
    maxValue = 'auto' ,
    nivoProps ,
    padding = 0.2 ,
    palette = NIVO ,
    radialAxis = true ,
    theme : themeOverrides ,
    valueFormat ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const categories = useMemo( () => countCategories( data ) , [ data ] ) ;

    const colors = useChartPalette( { palette , count : categories } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // No arc link labels on this chart, so only the legend eats into the box.
    const resolvedMargin = useMemo
    (
        () => getRadialMargin( { legend , margin } ) ,
        [ legend , margin ] ,
    ) ;

    const legends = useMemo
    (
        () => getChartLegends( { legend , margin : resolvedMargin } ) ,
        [ legend , resolvedMargin ] ,
    ) ;

    const tooltip = useCallback
    (
        ( { bar } ) => (
            <ChartTooltip
                title = { bar?.groupId }
                color = { bar?.color }
                label = { bar?.category }
                value = { bar?.formattedValue ?? bar?.value }
            />
        ) ,
        [] ,
    ) ;

    return (
        <ChartFrame
            ariaDescribedBy = { ariaDescribedBy }
            ariaLabel       = { ariaLabel }
            ariaLabelledBy  = { ariaLabelledBy }
            aspect          = { aspect }
            className       = { className }
            data            = { data }
            emptyLabel      = { emptyLabel }
            emptyState      = { emptyState }
            height          = { height }
            loading         = { loading }
        >
            <ResponsiveRadialBar
                animate           = { animate && !reduceMotion }
                circularAxisOuter = { circularAxis === true ? {} : ( circularAxis || null ) }
                colors            = { colors }
                cornerRadius      = { cornerRadius }
                data              = { data }
                innerRadius       = { innerRadius }
                legends           = { legends }
                margin            = { resolvedMargin }
                maxValue          = { maxValue }
                padding           = { padding }
                radialAxisStart   = { radialAxis === true ? {} : ( radialAxis || null ) }
                theme             = { theme }
                tooltip           = { tooltip }
                valueFormat       = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

RadialBarChart.displayName = 'RadialBarChart' ;

export default RadialBarChart ;
