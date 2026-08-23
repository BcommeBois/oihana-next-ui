'use client' ;

/**
 * Bar chart — grouped or stacked.
 *
 * @module components/charts/BarChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveBar , ResponsiveBarCanvas } from '@nivo/bar' ;

import { useMedia } from 'react-use' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import useChartLegend  from '../../hooks/useChartLegend' ;
import usePalette from '../../hooks/usePalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { CARTESIAN } from '../../themes/charts/layout' ;
import { sumBy }     from '../../themes/charts/legendItems' ;
import { NIVO }      from '../../themes/charts/palettes' ;

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
 * Bar chart.
 *
 * Wraps nivo's bar chart with the DaisyUI theme, automatic margins and
 * legend presets. Data keeps the native nivo shape — an array of objects,
 * one per index — because translating it would only add a layer to debug.
 *
 * `stacked` covers the stacked-bar case ; it maps to nivo's
 * `groupMode="stacked"`, there is no separate component.
 *
 * `xAxis` is always the bottom axis and `yAxis` the left one, whatever
 * `layout` is — so a horizontal chart puts its categories on `yAxis`.
 *
 * Anything not exposed here can go through `nivoProps`, which is spread last.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=1] - Mark border width — what actually separates bars from the background.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {Object[]} props.data - One object per index.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {string} [props.indexBy='id'] - Field holding the index value.
 * @param {string[]} [props.keys] - Series keys ; inferred from the first datum when omitted.
 * @param {string} [props.layout='vertical'] - `'vertical'` or `'horizontal'`.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position — `'bottom'`, `'top'`, `'right'`, `'left'` — or `{ position , values , valueFormatter , marker , orientation , size , className , items }`.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height. Pair it with `aspect` : a circular chart takes its radius from the smaller inner dimension, so a fixed `height` leaves two empty bands on a narrow screen.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` (past ~2k marks).
 * @param {boolean} [props.stacked=false] - Stack the series instead of grouping them.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 * @param {Object|boolean} [props.xAxis] - Bottom axis — `{ legend , format , tickRotation , hide }`.
 * @param {Object|boolean} [props.yAxis] - Left axis — `{ legend , format , hide }`.
 *
 * @example
 * ```jsx
 * <BarChart
 *     data    = { data }
 *     indexBy = "country"
 *     keys    = { [ 'burger' , 'fries' , 'kebab' ] }
 *     stacked
 *     xAxis   = {{ legend : 'country' }}
 *     yAxis   = {{ legend : 'food' }}
 *     legend  = "right"
 * />
 * ```
 */
const BarChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    borderWidth = 1 ,
    className ,
    data ,
    emptyLabel ,
    emptyState ,
    height = 400 ,
    indexBy = 'id' ,
    keys ,
    layout = 'vertical' ,
    legend = 'bottom' ,
    loading ,
    margin ,
    maxHeight ,
    nivoProps ,
    palette = NIVO ,
    renderer = 'svg' ,
    stacked = false ,
    theme : themeOverrides ,
    valueFormat ,
    xAxis ,
    yAxis ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const resolvedKeys = useMemo
    (
        () => ( keys?.length ? keys : inferKeys( data , indexBy ) ) ,
        [ keys , data , indexBy ] ,
    ) ;

    const colors = usePalette( { palette , count : resolvedKeys.length } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // The legend is drawn in HTML under the frame, so nothing is reserved for it
    // in the margin any more and the plot gets that room back.
    const { margin : resolvedMargin , axisBottom , axisLeft } = useChartLayout
    ({
        kind    : CARTESIAN ,
        margin ,
        xAxis ,
        yAxis ,
    }) ;

    // A key spans every index, so its legend value is its total.
    const legendValues = useMemo
    (
        () => resolvedKeys.map( key => sumBy( data , key ) ) ,
        [ resolvedKeys , data ] ,
    ) ;

    const legendProps = useChartLegend
    ({
        colors ,
        legend ,
        names  : resolvedKeys ,
        values : legendValues ,
    }) ;

    const tooltip = useCallback
    (
        ( { color , formattedValue , id , indexValue , value } ) => (
            <ChartTooltip
                title = { indexValue }
                color = { color }
                label = { id }
                value = { formattedValue ?? value }
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveBarCanvas : ResponsiveBar ;

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
                animate            = { animate && !reduceMotion }
                axisBottom         = { axisBottom }
                axisLeft           = { axisLeft }
                axisRight          = { null }
                axisTop            = { null }
                borderColor        = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderWidth        = { borderWidth }
                colors             = { colors }
                data               = { data }
                groupMode          = { stacked ? 'stacked' : 'grouped' }
                indexBy            = { indexBy }
                keys               = { resolvedKeys }
                labelSkipHeight    = { 14 }
                labelSkipWidth     = { 20 }
                labelTextColor     = {{ from : 'color' , modifiers : [ [ 'darker' , 1.8 ] ] }}
                layout             = { layout }
                margin             = { resolvedMargin }
                padding            = { 0.25 }
                theme              = { theme }
                tooltip            = { tooltip }
                valueFormat        = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

BarChart.displayName = 'BarChart' ;

export default BarChart ;
