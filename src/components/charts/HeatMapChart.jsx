'use client' ;

/**
 * Heatmap — a matrix of cells colored by value.
 *
 * @module components/charts/HeatMapChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveHeatMap , ResponsiveHeatMapCanvas } from '@nivo/heatmap' ;

import { useMedia } from 'react-use' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import useChartLegend  from '../../hooks/useChartLegend' ;
import usePalette from '../../hooks/usePalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import { CALENDAR_COLOR_KEYS } from '../../themes/charts/calendar' ;
import { GRID }                from '../../themes/charts/layout' ;
import { NIVO }                from '../../themes/charts/palettes' ;

import { getValueBounds } from '../../themes/charts/legendItems' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Heatmap.
 *
 * A matrix of cells, one per row/column pair, colored by value — for
 * spotting where a quantity concentrates across two dimensions at once.
 *
 * **Colors are a scale config, not a list.** nivo takes a continuous color
 * scale here rather than an array of series colors, so the sequential ramp
 * is wrapped in a `quantize` config : discrete buckets, which read better
 * than a smooth gradient when the reader has to map a cell back to a value.
 * Passing an explicit `colors` object through `nivoProps` bypasses this.
 *
 * **The legend is a gradient bar, not a list of swatches** — a quantitative
 * scale has no discrete entries to list. The `legend` prop behaves the same
 * from the outside but resolves to nivo's continuous shape.
 *
 * Column labels sit on top and row labels on the left, so the margin is the
 * grid one. Row labels are data-driven and can be long — widen with
 * `margin={{ left : 120 }}` when they collide.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderRadius=2] - Cell corner rounding.
 * @param {number} [props.borderWidth=1] - Cell border width.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {string} [props.emptyColor] - Color of cells with a `null` value ; defaults to a DaisyUI theme color.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=460] - Frame height.
 * @param {boolean} [props.labels=true] - Draw the value inside each cell.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position — `'bottom'`, `'top'`, `'right'`, `'left'` — or `{ position , valueFormatter , orientation , size , className }`. Drawn as a `MetricScale` : a quantitative chart legends itself with its colour ramp and the two ends of its range, not with a list. `ticks` prints the bucket boundaries instead of the ends alone.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height. Pair it with `aspect` : a circular chart takes its radius from the smaller inner dimension, so a fixed `height` leaves two empty bands on a narrow screen.
 * @param {number} [props.maxValue='auto'] - Upper bound of the color scale.
 * @param {number} [props.minValue='auto'] - Lower bound of the color scale.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Sequential palette, or explicit ramp colors.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` (past ~2k cells).
 * @param {number} [props.steps=5] - Number of buckets in the color scale.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 * @param {Object|boolean} [props.xAxis] - Top axis — `{ legend , format , tickRotation , hide }`.
 * @param {Object|boolean} [props.yAxis] - Left axis — `{ legend , format , hide }`.
 *
 * @example
 * ```jsx
 * <HeatMapChart
 *     data = {[
 *         { id : 'Japan' , data : [ { x : 'Train' , y : 92 } , { x : 'Bus' , y : 41 } ] } ,
 *         { id : 'France', data : [ { x : 'Train' , y : 63 } , { x : 'Bus' , y : 78 } ] } ,
 *     ]}
 * />
 * ```
 */
const HeatMapChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    borderRadius = 2 ,
    borderWidth = 1 ,
    className ,
    data ,
    emptyColor ,
    emptyLabel ,
    emptyState ,
    height = 460 ,
    labels = true ,
    legend = 'bottom' ,
    loading ,
    margin ,
    maxHeight ,
    maxValue = 'auto' ,
    minValue = 'auto' ,
    nivoProps ,
    palette = NIVO ,
    renderer = 'svg' ,
    steps = 5 ,
    theme : themeOverrides ,
    valueFormat ,
    xAxis ,
    yAxis ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const ramp = usePalette( { palette , count : steps , sequential : true } ) ;

    const { empty : emptyCell } = useThemeColors( CALENDAR_COLOR_KEYS ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // nivo wants a scale config here, not a list of colors.
    const colors = useMemo
    (
        () =>
        ({
            type   : 'quantize' ,
            colors : ramp ,
            ...( minValue !== 'auto' && maxValue !== 'auto' ? { domain : [ minValue , maxValue ] } : {} ) ,
        }) ,
        [ ramp , minValue , maxValue ] ,
    ) ;

    // The scale is drawn in HTML under the frame, so nothing is reserved for it
    // in the margin any more and the plot gets that room back.
    const { margin : resolvedMargin , axisTop , axisLeft } = useChartLayout
    ({
        kind             : GRID ,
        margin ,
        xAxis ,
        xAxisPosition    : 'top' ,
        yAxis ,
    }) ;

    // nivo keeps the domain it works out to itself, so the scale reads the data
    // again — unless the caller stated the bounds, in which case they win.
    const bounds = useMemo
    (
        () => ( minValue !== 'auto' && maxValue !== 'auto'
            ? { min : minValue , max : maxValue }
            : getValueBounds( data?.flatMap( serie => serie?.data?.map( datum => datum?.y ) ?? [] ) ) ) ,
        [ data , minValue , maxValue ] ,
    ) ;

    const legendProps = useChartLegend
    ({
        colors : ramp ,
        legend ,
        scale  : bounds ,
    }) ;


    // The cell datum uses `serieId` — singular, unlike the line chart's `seriesId`.
    const tooltip = useCallback
    (
        ( { cell } ) => (
            <ChartTooltip
                title = { cell?.serieId }
                color = { cell?.color }
                label = { cell?.data?.x }
                value = { cell?.formattedValue ?? cell?.value }
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveHeatMapCanvas : ResponsiveHeatMap ;

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
            legend          = { legendProps }
            loading         = { loading }
            maxHeight       = { maxHeight }
        >
            <Component
                animate        = { animate && !reduceMotion }
                axisBottom     = { null }
                axisLeft       = { axisLeft }
                axisRight      = { null }
                axisTop        = { axisTop }
                borderColor    = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderRadius   = { borderRadius }
                borderWidth    = { borderWidth }
                colors         = { colors }
                data           = { data }
                emptyColor     = { emptyColor ?? emptyCell ?? 'transparent' }
                enableLabels   = { labels }
                labelTextColor = {{ from : 'color' , modifiers : [ [ 'darker' , 2 ] ] }}
                margin         = { resolvedMargin }
                theme          = { theme }
                tooltip        = { tooltip }
                valueFormat    = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

HeatMapChart.displayName = 'HeatMapChart' ;

export default HeatMapChart ;
