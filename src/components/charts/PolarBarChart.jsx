'use client' ;

/**
 * Polar bar chart — bars in polar coordinates.
 *
 * @module components/charts/PolarBarChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsivePolarBar } from '@nivo/polar-bar' ;

import { useMedia } from 'react-use' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { getChartLegends } from '../../themes/charts/legends' ;
import { getRadialMargin } from '../../themes/charts/margins' ;
import { NIVO }            from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Derives the series keys from the first datum when `keys` is omitted :
 * every numeric field that is not the index.
 *
 * @param {Object[]} [data] - The chart data.
 * @param {string} [indexBy] - The index field.
 * @returns {string[]} The inferred keys.
 */
const inferKeys = ( data , indexBy ) =>
{
    const first = data?.[ 0 ] ;

    if ( !first )
    {
        return [] ;
    }

    return Object.keys( first ).filter( ( key ) => key !== indexBy && typeof first[ key ] === 'number' ) ;
} ;

/**
 * Polar bar chart.
 *
 * Takes the same data as {@link BarChart} — one object per index, one key
 * per series — and lays the bars out around a circle instead of along an
 * axis. The rose or coxcomb shape: good for cyclical indices, where wind
 * directions or months read better wrapped than in a straight line.
 *
 * **Not the same chart as {@link RadialBarChart}**, which draws one
 * concentric ring per serie. Here every bar radiates from the center and
 * the circle is divided by index.
 *
 * **SVG only** — nivo ships no canvas renderer for this chart.
 *
 * @param {Object} props
 * @param {boolean} [props.adjustValueRange=true] - Let the value scale start at the smallest value rather than zero.
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {boolean} [props.arcLabels=false] - Draw the value inside each bar.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=1] - Bar border width.
 * @param {boolean|Object} [props.circularAxis=true] - Outer circular axis ; an object is passed through to nivo.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {number} [props.cornerRadius=2] - Rounding of the bar ends.
 * @param {Object[]} props.data - One object per index.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number} [props.endAngle=360] - Where the circle ends, in degrees.
 * @param {number|string} [props.height=460] - Frame height.
 * @param {string} [props.indexBy='id'] - Field holding the index value.
 * @param {number} [props.innerRadius=0.2] - Size of the hole, `0` to `1`.
 * @param {string[]} [props.keys] - Series keys ; inferred from the first datum when omitted.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {boolean|Object} [props.radialAxis=true] - Radial axis ; an object is passed through to nivo.
 * @param {number} [props.startAngle=0] - Where the circle starts, in degrees.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <PolarBarChart
 *     data    = { [ { direction : 'N' , winter : 12 , summer : 8 } ] }
 *     indexBy = "direction"
 * />
 * ```
 */
const PolarBarChart =
({
    adjustValueRange = true ,
    animate = true ,
    arcLabels = false ,
    aspect ,
    borderWidth = 1 ,
    circularAxis = true ,
    className ,
    cornerRadius = 2 ,
    data ,
    emptyLabel ,
    emptyState ,
    endAngle = 360 ,
    height = 460 ,
    indexBy = 'id' ,
    innerRadius = 0.2 ,
    keys ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    palette = NIVO ,
    radialAxis = true ,
    startAngle = 0 ,
    theme : themeOverrides ,
    valueFormat ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const resolvedKeys = useMemo
    (
        () => ( keys?.length ? keys : inferKeys( data , indexBy ) ) ,
        [ keys , data , indexBy ] ,
    ) ;

    const colors = useChartPalette( { palette , count : resolvedKeys.length } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // The circular axis writes the index names around the circle.
    const resolvedMargin = useMemo
    (
        () => getRadialMargin( { outsideLabels : true , legend , margin } ) ,
        [ legend , margin ] ,
    ) ;

    const legends = useMemo
    (
        () => getChartLegends( { legend , margin : resolvedMargin } ) ,
        [ legend , resolvedMargin ] ,
    ) ;

    const tooltip = useCallback
    (
        ( { arc } ) => (
            <ChartTooltip
                title = { arc?.index }
                color = { arc?.color }
                label = { arc?.key }
                value = { arc?.formattedValue ?? arc?.value }
            />
        ) ,
        [] ,
    ) ;

    return (
        <ChartFrame
            aspect     = { aspect }
            className  = { className }
            data       = { data }
            emptyLabel = { emptyLabel }
            emptyState = { emptyState }
            height     = { height }
            loading    = { loading }
        >
            <ResponsivePolarBar
                adjustValueRange  = { adjustValueRange }
                animate           = { animate && !reduceMotion }
                borderColor       = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderWidth       = { borderWidth }
                circularAxisOuter = { circularAxis === true ? {} : ( circularAxis || null ) }
                colors            = { colors }
                cornerRadius      = { cornerRadius }
                data              = { data }
                enableArcLabels   = { arcLabels }
                endAngle          = { endAngle }
                indexBy           = { indexBy }
                innerRadius       = { innerRadius }
                keys              = { resolvedKeys }
                legends           = { legends }
                margin            = { resolvedMargin }
                radialAxis        = { radialAxis === true ? {} : ( radialAxis || null ) }
                startAngle        = { startAngle }
                theme             = { theme }
                tooltip           = { tooltip }
                valueFormat       = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

PolarBarChart.displayName = 'PolarBarChart' ;

export default PolarBarChart ;
