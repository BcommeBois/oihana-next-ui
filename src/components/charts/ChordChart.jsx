'use client' ;

/**
 * Chord diagram — flows between entities.
 *
 * @module components/charts/ChordChart
 */

import { useCallback } from 'react' ;

import { ResponsiveChord , ResponsiveChordCanvas } from '@nivo/chord' ;

import { useMedia } from 'react-use' ;

import isChordDataValid from '../../helpers/charts/isChordDataValid' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { RADIAL } from '../../themes/charts/layout' ;
import { NIVO }   from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Chord diagram.
 *
 * Shows flows *between* entities rather than values *of* entities — trade
 * between countries, transitions between states, traffic between pages.
 * Each entity is an arc on the circle, each flow a ribbon between two arcs.
 *
 * **`data` is a square matrix, not a list of objects** — the one chart in
 * the family with that shape. `data[i][j]` is the flow from `keys[i]` to
 * `keys[j]`, so the matrix must be exactly `keys.length × keys.length`.
 *
 * There are two tooltips because there are two things to hover : an arc
 * (one entity's total) and a ribbon (one flow, in both directions).
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {number} [props.arcBorderWidth=1] - Arc border width.
 * @param {number} [props.arcOpacity=1] - Arc opacity.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {number[][]} props.data - Square matrix of flows, `keys.length` on each side.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=460] - Frame height.
 * @param {number} [props.innerRadiusRatio=0.9] - Where the arcs start, as a share of the radius.
 * @param {string[]} props.keys - Entity names, in matrix order.
 * @param {number} [props.labelOffset=12] - Distance of the labels from the arcs.
 * @param {number} [props.labelRotation=-90] - Label rotation, in degrees.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {number} [props.padAngle=0.02] - Gap between arcs, in radians.
 * @param {string|string[]} [props.palette='nivo'] - Entity palette.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'`.
 * @param {number} [props.ribbonOpacity=0.5] - Ribbon opacity.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <ChordChart
 *     keys = { [ 'John' , 'Raoul' , 'Jane' ] }
 *     data = {[
 *         [ 0  , 15 , 8 ] ,
 *         [ 15 , 0  , 3 ] ,
 *         [ 8  , 3  , 0 ] ,
 *     ]}
 * />
 * ```
 */
const ChordChart =
({
    animate = true ,
    arcBorderWidth = 1 ,
    arcOpacity = 1 ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    className ,
    data ,
    emptyLabel ,
    emptyState ,
    height = 460 ,
    innerRadiusRatio = 0.9 ,
    keys ,
    labelOffset = 12 ,
    labelRotation = -90 ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    padAngle = 0.02 ,
    palette = NIVO ,
    renderer = 'svg' ,
    ribbonOpacity = 0.5 ,
    theme : themeOverrides ,
    valueFormat ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = useChartPalette( { palette , count : keys?.length ?? 0 } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // A matrix that does not match `keys` throws while rendering rather than
    // drawing nothing, so it is caught here and shown as the empty state.
    const invalid = !isChordDataValid( data , keys ) ;

    if ( invalid && process.env.NODE_ENV === 'development' )
    {
        console.warn(
            '[ChordChart] `data` must be a square matrix of exactly `keys.length` rows and columns — ' +
            'showing the empty state instead.' ,
        ) ;
    }

    const { margin : resolvedMargin , legends } = useChartLayout
    ({
        kind          : RADIAL ,
        legend ,
        margin ,
        outsideLabels : true ,
    }) ;

    const arcTooltip = useCallback
    (
        ( { arc } ) => (
            <ChartTooltip
                color = { arc?.color }
                label = { arc?.label ?? arc?.id }
                value = { arc?.formattedValue ?? arc?.value }
            />
        ) ,
        [] ,
    ) ;

    // A ribbon carries a flow each way, so both ends are listed.
    const ribbonTooltip = useCallback
    (
        ( { ribbon } ) => (
            <ChartTooltip
                items =
                {[
                    {
                        color : ribbon?.source?.color ,
                        label : `${ ribbon?.source?.id } → ${ ribbon?.target?.id }` ,
                        value : ribbon?.source?.formattedValue ?? ribbon?.source?.value ,
                    } ,
                    {
                        color : ribbon?.target?.color ,
                        label : `${ ribbon?.target?.id } → ${ ribbon?.source?.id }` ,
                        value : ribbon?.target?.formattedValue ?? ribbon?.target?.value ,
                    } ,
                ]}
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveChordCanvas : ResponsiveChord ;

    return (
        <ChartFrame
            ariaDescribedBy = { ariaDescribedBy }
            ariaLabel       = { ariaLabel }
            ariaLabelledBy  = { ariaLabelledBy }
            aspect          = { aspect }
            className       = { className }
            data            = { data }
            empty           = { invalid }
            emptyLabel      = { emptyLabel }
            emptyState      = { emptyState }
            height          = { height }
            loading         = { loading }
        >
            <Component
                animate           = { animate && !reduceMotion }
                arcBorderColor    = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                arcBorderWidth    = { arcBorderWidth }
                arcOpacity        = { arcOpacity }
                arcTooltip        = { arcTooltip }
                colors            = { colors }
                data              = { data }
                innerRadiusRatio  = { innerRadiusRatio }
                keys              = { keys }
                labelOffset       = { labelOffset }
                labelRotation     = { labelRotation }
                labelTextColor    = {{ theme : 'labels.text.fill' }}
                legends           = { legends }
                margin            = { resolvedMargin }
                padAngle          = { padAngle }
                ribbonBorderColor = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                ribbonBorderWidth = { 1 }
                ribbonOpacity     = { ribbonOpacity }
                ribbonTooltip     = { ribbonTooltip }
                theme             = { theme }
                valueFormat       = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

ChordChart.displayName = 'ChordChart' ;

export default ChordChart ;
