'use client' ;

/**
 * Radar chart.
 *
 * @module components/charts/RadarChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveRadar } from '@nivo/radar' ;

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
 * Radar chart.
 *
 * Plots several series over the same set of dimensions, each dimension its
 * own spoke — for comparing profiles rather than magnitudes, which is what
 * it is good at and a bar chart is not.
 *
 * **SVG only** : nivo ships no canvas renderer for this chart, hence no
 * `renderer` prop. It is not a chart that scales to the point of needing
 * one anyway — past a handful of series the polygons stop being readable.
 *
 * The dimension labels sit outside the polygon, so the margin reserves room
 * for them on all four sides.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=2] - Outline width of each series polygon.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {string} [props.curve='linearClosed'] - Interpolation between spokes.
 * @param {Object[]} props.data - One object per dimension.
 * @param {number} [props.dotSize=8] - Size of the dots on each spoke.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {boolean} [props.enableDots=true] - Draw the dots.
 * @param {number} [props.fillOpacity=0.25] - Opacity of the filled polygons.
 * @param {number} [props.gridLevels=5] - Number of concentric grid rings.
 * @param {string} [props.gridShape='circular'] - `'circular'` or `'linear'`.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {string} [props.indexBy='id'] - Field holding the dimension name.
 * @param {string[]} [props.keys] - Series keys ; inferred from the first datum when omitted.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <RadarChart
 *     data    = { [ { taste : 'fruity' , chardonay : 93 , carmenere : 61 } ] }
 *     indexBy = "taste"
 * />
 * ```
 */
const RadarChart =
({
    animate = true ,
    aspect ,
    borderWidth = 2 ,
    className ,
    curve = 'linearClosed' ,
    data ,
    dotSize = 8 ,
    emptyLabel ,
    emptyState ,
    enableDots = true ,
    fillOpacity = 0.25 ,
    gridLevels = 5 ,
    gridShape = 'circular' ,
    height = 400 ,
    indexBy = 'id' ,
    keys ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    palette = NIVO ,
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

    // Radar hovers a whole spoke rather than a single point, so every series
    // shows up at once — hence the multi-row tooltip.
    const sliceTooltip = useCallback
    (
        ( { index , data : slice } ) => (
            <ChartTooltip
                title = { index }
                items = { slice?.map( ( datum ) =>
                ({
                    color : datum?.color ,
                    label : datum?.id ,
                    value : datum?.formattedValue ?? datum?.value ,
                }) ) }
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
            <ResponsiveRadar
                animate        = { animate && !reduceMotion }
                borderColor    = {{ from : 'color' }}
                borderWidth    = { borderWidth }
                colors         = { colors }
                curve          = { curve }
                data           = { data }
                dotBorderColor = {{ theme : 'background' }}
                dotBorderWidth = { 2 }
                dotColor       = {{ from : 'color' }}
                dotSize        = { dotSize }
                enableDots     = { enableDots }
                fillOpacity    = { fillOpacity }
                gridLabelOffset = { 16 }
                gridLevels     = { gridLevels }
                gridShape      = { gridShape }
                indexBy        = { indexBy }
                keys           = { resolvedKeys }
                legends        = { legends }
                margin         = { resolvedMargin }
                sliceTooltip   = { sliceTooltip }
                theme          = { theme }
                valueFormat    = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

RadarChart.displayName = 'RadarChart' ;

export default RadarChart ;
