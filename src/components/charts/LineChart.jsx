'use client' ;

/**
 * Line chart.
 *
 * @module components/charts/LineChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveLine , ResponsiveLineCanvas } from '@nivo/line' ;

import { useMedia } from 'react-use' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import usePalette from '../../hooks/usePalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { formatTimeTick } from '../../themes/charts/axes' ;
import { CARTESIAN }      from '../../themes/charts/layout' ;
import { NIVO }           from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Expands the `xScale` shorthand into a nivo scale config.
 *
 * The `'time'` case is the one worth automating : nivo needs `format` to
 * parse string dates but must not receive it for real `Date` objects, and
 * getting that wrong yields an empty chart with no error.
 *
 * @param {string|Object} [xScale] - The shorthand or a full nivo scale config.
 * @param {Object[]} [data] - The chart series, used to sniff the x type.
 * @returns {Object} A nivo scale config.
 */
const resolveXScale = ( xScale , data ) =>
{
    if ( xScale && typeof xScale === 'object' )
    {
        return xScale ;
    }

    const type = xScale ?? 'point' ;

    if ( type !== 'time' )
    {
        return { type } ;
    }

    const firstX = data?.[ 0 ]?.data?.[ 0 ]?.x ;

    return {
        type      : 'time' ,
        useUTC    : false ,
        precision : 'day' ,
        ...( typeof firstX === 'string' ? { format : '%Y-%m-%d' } : {} ) ,
    } ;
} ;

/**
 * Expands the `yScale` shorthand into a nivo scale config.
 *
 * @param {string|Object} [yScale] - The shorthand or a full nivo scale config.
 * @param {boolean} [stacked=false] - Whether series stack.
 * @returns {Object} A nivo scale config.
 */
const resolveYScale = ( yScale , stacked = false ) =>
{
    if ( yScale && typeof yScale === 'object' )
    {
        return { stacked , ...yScale } ;
    }

    const type = yScale ?? 'linear' ;

    // A log scale cannot take min/max 'auto' with a zero floor.
    if ( type === 'log' )
    {
        return { type : 'log' , base : 10 } ;
    }

    return { type , min : 'auto' , max : 'auto' , stacked } ;
} ;

/**
 * Renders a tooltip x value, which is a `Date` on a time scale — and a Date
 * put straight into JSX throws.
 *
 * @param {*} value - The raw x value.
 * @returns {React.ReactNode} Something React can render.
 */
const formatTooltipX = ( value ) => ( value instanceof Date ? formatTimeTick( value ) : value ) ;

/**
 * Line chart.
 *
 * Wraps nivo's line chart with the DaisyUI theme, automatic margins and
 * legend presets. Data keeps the native nivo shape :
 * `[ { id , data : [ { x , y } ] } ]`.
 *
 * `useMesh` is forced on — it is the voronoi mesh that makes hovering
 * anywhere near a point work, and turning it off has no upside.
 *
 * Points are drawn hollow (filled with the background, outlined with the
 * series color) so overlapping series stay readable.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {string} [props.curve='linear'] - Interpolation — `'linear'`, `'monotoneX'`, `'step'`…
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {boolean} [props.enableArea=false] - Fill the area below each line.
 * @param {boolean} [props.enablePoints=true] - Draw the data points.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` (past ~2k points).
 * @param {boolean} [props.stacked=false] - Stack the series on the y axis.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {Object|boolean} [props.xAxis] - Bottom axis — `{ legend , format , tickRotation , hide }`.
 * @param {string} [props.xFormat] - d3-format string for x values ; this chart's equivalent of `valueFormat`.
 * @param {string|Object} [props.xScale='point'] - `'point'`, `'time'`, `'linear'`, or a nivo scale config.
 * @param {Object|boolean} [props.yAxis] - Left axis — `{ legend , format , hide }`.
 * @param {string} [props.yFormat] - d3-format string for y values ; this chart's equivalent of `valueFormat`.
 * @param {string|Object} [props.yScale='linear'] - `'linear'`, `'log'`, or a nivo scale config.
 *
 * @example
 * ```jsx
 * <LineChart
 *     data  = { [ { id : 'france' , data : [ { x : 'plane' , y : 431 } ] } ] }
 *     xAxis = {{ legend : 'transportation' }}
 *     yAxis = {{ legend : 'count' }}
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Time axis — ticks are formatted in the active locale
 * <LineChart data={ series } xScale="time" xAxis={{ legend : 'date' }} />
 * ```
 */
const LineChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    className ,
    curve = 'linear' ,
    data ,
    emptyLabel ,
    emptyState ,
    enableArea = false ,
    enablePoints = true ,
    height = 400 ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    palette = NIVO ,
    renderer = 'svg' ,
    stacked = false ,
    theme : themeOverrides ,
    xAxis ,
    xFormat ,
    xScale ,
    yAxis ,
    yFormat ,
    yScale ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = usePalette( { palette , count : data?.length ?? 0 } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    const resolvedXScale = useMemo( () => resolveXScale( xScale , data ) , [ xScale , data ] ) ;
    const resolvedYScale = useMemo( () => resolveYScale( yScale , stacked ) , [ yScale , stacked ] ) ;

    const { margin : resolvedMargin , legends , axisBottom , axisLeft } = useChartLayout
    ({
        kind       : CARTESIAN ,
        legend ,
        margin ,
        xAxis ,
        xScaleType : resolvedXScale?.type ,
        yAxis ,
    }) ;

    const tooltip = useCallback
    (
        ( { point } ) => (
            <ChartTooltip
                title = { formatTooltipX( point?.data?.xFormatted ?? point?.data?.x ) }
                color = { point?.seriesColor ?? point?.color }
                label = { point?.seriesId }
                value = { point?.data?.yFormatted ?? point?.data?.y }
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveLineCanvas : ResponsiveLine ;

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
            <Component
                animate           = { animate && !reduceMotion }
                axisBottom        = { axisBottom }
                axisLeft          = { axisLeft }
                axisRight         = { null }
                axisTop           = { null }
                colors            = { colors }
                curve             = { curve }
                data              = { data }
                enableArea        = { enableArea }
                enablePoints      = { enablePoints }
                legends           = { legends }
                margin            = { resolvedMargin }
                pointBorderColor  = {{ from : 'series.color' }}
                pointBorderWidth  = { 2 }
                pointColor        = {{ theme : 'background' }}
                pointSize         = { 8 }
                theme             = { theme }
                tooltip           = { tooltip }
                useMesh           = { true }
                xFormat           = { xFormat }
                xScale            = { resolvedXScale }
                yFormat           = { yFormat }
                yScale            = { resolvedYScale }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

LineChart.displayName = 'LineChart' ;

export default LineChart ;
