'use client' ;

/**
 * Marimekko chart — stacked bars of variable thickness.
 *
 * @module components/charts/MarimekkoChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveMarimekko } from '@nivo/marimekko' ;

import { useMedia } from 'react-use' ;

import isMarimekkoDataValid from '../../helpers/charts/isMarimekkoDataValid' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { getChartAxis }    from '../../themes/charts/axes' ;
import { getChartLegends } from '../../themes/charts/legends' ;
import { getChartMargin }  from '../../themes/charts/margins' ;
import { NIVO }            from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Marimekko chart.
 *
 * A stacked bar chart where each bar's *thickness* also carries a value —
 * so it shows a breakdown and a weight at once. Market share by segment
 * where the segments are not the same size; survey answers where the
 * cohorts differ in headcount.
 *
 * **Three separate accessors, which is what makes it unusual.** `id` names
 * each bar, `value` drives its **thickness**, and `dimensions` lists the
 * stacked slices. A bar can therefore be thin and tall, or thick and short,
 * and both readings matter — that is the whole point of the chart.
 *
 * `offset="expand"` normalizes every bar to the same length, turning the
 * stacks into percentages while thickness keeps the absolute weight.
 *
 * **SVG only** — nivo ships no canvas renderer for this chart.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=1] - Slice border width.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {Object[]} props.data - The raw bars.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=420] - Frame height.
 * @param {string|Function} props.id - Accessor naming each bar.
 * @param {number} [props.innerPadding=0] - Gap between slices of a bar.
 * @param {string} [props.layout='vertical'] - `'vertical'` or `'horizontal'`.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string} [props.offset='none'] - Stack offset — `'none'`, `'expand'`, `'diverging'`, `'silouhette'`, `'wiggle'`.
 * @param {number} [props.outerPadding=6] - Gap between bars.
 * @param {string|string[]} [props.palette='nivo'] - Dimension palette.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string|Function} props.value - Accessor driving each bar's thickness.
 * @param {string} [props.valueFormat] - d3-format string for values.
 * @param {Object|boolean} [props.xAxis] - Bottom axis — `{ legend , format , tickRotation , hide }`.
 * @param {Object|boolean} [props.yAxis] - Left axis — `{ legend , format , hide }`.
 *
 * @example
 * ```jsx
 * <MarimekkoChart
 *     data       = { data }
 *     id         = "statement"
 *     value      = "participants"
 *     dimensions = {[
 *         { id : 'agree'    , value : 'agree'    } ,
 *         { id : 'disagree' , value : 'disagree' } ,
 *     ]}
 * />
 * ```
 */
const MarimekkoChart =
({
    animate = true ,
    aspect ,
    borderWidth = 1 ,
    className ,
    data ,
    dimensions ,
    emptyLabel ,
    emptyState ,
    height = 420 ,
    id ,
    innerPadding = 0 ,
    layout = 'vertical' ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    offset = 'none' ,
    outerPadding = 6 ,
    palette = NIVO ,
    theme : themeOverrides ,
    value ,
    valueFormat ,
    xAxis ,
    yAxis ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = useChartPalette( { palette , count : dimensions?.length ?? 0 } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // nivo dereferences the three accessors without checking they exist, so a
    // missing one throws mid-render — caught here and shown as the empty state.
    const invalid = !isMarimekkoDataValid( data , id , value , dimensions ) ;

    if ( invalid && process.env.NODE_ENV === 'development' )
    {
        console.warn(
            '[MarimekkoChart] `data`, `id`, `value` and `dimensions` are all required — ' +
            'showing the empty state instead.' ,
        ) ;
    }

    const resolvedMargin = useMemo
    (
        () => getChartMargin( { xAxis , yAxis , legend , margin } ) ,
        [ xAxis , yAxis , legend , margin ] ,
    ) ;

    const legends = useMemo
    (
        () => getChartLegends( { legend , margin : resolvedMargin } ) ,
        [ legend , resolvedMargin ] ,
    ) ;

    const axisBottom = useMemo
    (
        () => getChartAxis( { axis : xAxis , margin : resolvedMargin , position : 'bottom' } ) ,
        [ xAxis , resolvedMargin ] ,
    ) ;

    const axisLeft = useMemo
    (
        () => getChartAxis( { axis : yAxis , margin : resolvedMargin , position : 'left' } ) ,
        [ yAxis , resolvedMargin ] ,
    ) ;

    // The bar carries both its own slice and the datum it belongs to.
    const tooltip = useCallback
    (
        ( { bar } ) => (
            <ChartTooltip
                title = { bar?.datum?.id }
                color = { bar?.color }
                label = { bar?.id }
                value = { bar?.formattedValue ?? bar?.value }
            />
        ) ,
        [] ,
    ) ;

    return (
        <ChartFrame
            aspect     = { aspect }
            className  = { className }
            data       = { data }
            empty      = { invalid }
            emptyLabel = { emptyLabel }
            emptyState = { emptyState }
            height     = { height }
            loading    = { loading }
        >
            <ResponsiveMarimekko
                animate      = { animate && !reduceMotion }
                axisBottom   = { axisBottom }
                axisLeft     = { axisLeft }
                axisRight    = { null }
                axisTop      = { null }
                borderColor  = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderWidth  = { borderWidth }
                colors       = { colors }
                data         = { data }
                dimensions   = { dimensions }
                id           = { id }
                innerPadding = { innerPadding }
                layout       = { layout }
                legends      = { legends }
                margin       = { resolvedMargin }
                offset       = { offset }
                outerPadding = { outerPadding }
                theme        = { theme }
                tooltip      = { tooltip }
                value        = { value }
                valueFormat  = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

MarimekkoChart.displayName = 'MarimekkoChart' ;

export default MarimekkoChart ;
