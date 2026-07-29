'use client' ;

/**
 * Waffle chart — a grid of cells representing parts of a whole.
 *
 * @module components/charts/WaffleChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveWaffle , ResponsiveWaffleCanvas } from '@nivo/waffle' ;

import { useMedia } from 'react-use' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import { getChartLegends } from '../../themes/charts/legends' ;
import { getRadialMargin } from '../../themes/charts/margins' ;
import { NIVO }            from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Waffle chart.
 *
 * A grid of `rows × columns` cells where each serie fills a share of the
 * whole. It reads proportions better than a pie when the parts are small :
 * counting cells is easier than comparing thin angles.
 *
 * `total` is what a full grid represents, and it is **not** derived from the
 * data — that is the point. Values summing to less than `total` leave empty
 * cells, which is how a waffle shows "42 % of a target" rather than just a
 * breakdown.
 *
 * The empty cells follow the DaisyUI theme rather than a fixed grey, so they
 * stay legible in the dark theme.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=0] - Cell border width.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {number} [props.columns=14] - Grid width, in cells.
 * @param {string} [props.emptyColor] - Color of the unfilled cells ; defaults to a DaisyUI theme color.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {string} [props.fillDirection='bottom'] - Where filling starts — `'bottom'`, `'top'`, `'left'`, `'right'`.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {number} [props.padding=1] - Gap between cells.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` (past ~2k cells).
 * @param {number} [props.rows=18] - Grid height, in cells.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {number} props.total - What a completely filled grid represents.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <WaffleChart
 *     data  = { [ { id : 'men' , label : 'men' , value : 32 } ] }
 *     total = { 100 }
 * />
 * ```
 */
const WaffleChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    borderWidth = 0 ,
    className ,
    columns = 14 ,
    data ,
    emptyColor ,
    emptyLabel ,
    emptyState ,
    fillDirection = 'bottom' ,
    height = 400 ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    padding = 1 ,
    palette = NIVO ,
    renderer = 'svg' ,
    rows = 18 ,
    theme : themeOverrides ,
    total ,
    valueFormat ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = useChartPalette( { palette , count : data?.length ?? 0 } ) ;

    // Empty cells are a chart color, not chrome, so they do not come from the
    // nivo theme object — they need a resolved value of their own.
    const { empty : emptyCell } = useThemeColors( { empty : 'base-content/10' } ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

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
        ( { data : datum } ) => (
            <ChartTooltip
                color = { datum?.color }
                label = { datum?.label ?? datum?.id }
                value = { datum?.formattedValue ?? datum?.value }
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveWaffleCanvas : ResponsiveWaffle ;

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
                animate       = { animate && !reduceMotion }
                borderColor   = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderWidth   = { borderWidth }
                colors        = { colors }
                columns       = { columns }
                data          = { data }
                emptyColor    = { emptyColor ?? emptyCell ?? 'transparent' }
                fillDirection = { fillDirection }
                legends       = { legends }
                margin        = { resolvedMargin }
                motionStagger = { 2 }
                padding       = { padding }
                rows          = { rows }
                theme         = { theme }
                tooltip       = { tooltip }
                total         = { total }
                valueFormat   = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

WaffleChart.displayName = 'WaffleChart' ;

export default WaffleChart ;
