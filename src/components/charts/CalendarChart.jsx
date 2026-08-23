'use client' ;

/**
 * Calendar heatmap — one cell per day, colored by value.
 *
 * @module components/charts/CalendarChart
 */

import { useCallback } from 'react' ;

import { ResponsiveCalendar , ResponsiveCalendarCanvas } from '@nivo/calendar' ;

import { useMedia } from 'react-use' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import usePalette from '../../hooks/usePalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import { CALENDAR_COLOR_KEYS } from '../../themes/charts/calendar' ;
import { GRID }                from '../../themes/charts/layout' ;
import { NIVO }                from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Calendar heatmap.
 *
 * One cell per day between `from` and `to`, colored by value — the shape
 * used for contribution graphs and activity over a year.
 *
 * **The palette is sequential, not categorical.** Cells encode a quantity,
 * so the colors have to be ordered ; the component asks `usePalette`
 * for a ramp rather than for mutually distinguishable colors, which would
 * destroy the reading.
 *
 * The cell, day and month border colors come from the DaisyUI theme.
 * nivo's own defaults are hardcoded to `#fff` and `#000`, which turn a dark
 * theme into a black grid on a black background.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {string} [props.dayBorderColor] - Gap color between days ; defaults to the surface color.
 * @param {number} [props.dayBorderWidth=2] - Width of the gap between days.
 * @param {string} [props.direction='horizontal'] - `'horizontal'` or `'vertical'`.
 * @param {string} [props.emptyColor] - Color of days with no data ; defaults to a DaisyUI theme color.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {string|number|Date} props.from - First day shown.
 * @param {number|string} [props.height=260] - Frame height.
 * @param {boolean|string|Object} [props.legend=false] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height. Pair it with `aspect` : a circular chart takes its radius from the smaller inner dimension, so a fixed `height` leaves two empty bands on a narrow screen.
 * @param {number|string} [props.maxValue='auto'] - Upper bound of the color scale.
 * @param {number|string} [props.minValue='auto'] - Lower bound of the color scale.
 * @param {string} [props.monthBorderColor] - Month outline color ; defaults to a light DaisyUI theme color.
 * @param {number} [props.monthBorderWidth=2] - Width of the month outline.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Sequential palette, or explicit ramp colors.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` — worth it past two or three years of days.
 * @param {number} [props.steps=5] - Number of buckets in the generated ramp.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string|number|Date} props.to - Last day shown.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <CalendarChart
 *     data = { [ { day : '2026-06-01' , value : 200 } ] }
 *     from = "2026-01-01"
 *     to   = "2026-12-31"
 * />
 * ```
 */
const CalendarChart =
({
    animate = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    className ,
    data ,
    dayBorderColor ,
    dayBorderWidth = 2 ,
    direction = 'horizontal' ,
    emptyColor ,
    emptyLabel ,
    emptyState ,
    from ,
    height = 260 ,
    legend = false ,
    loading ,
    margin ,
    maxHeight ,
    maxValue = 'auto' ,
    minValue = 'auto' ,
    monthBorderColor ,
    monthBorderWidth = 2 ,
    nivoProps ,
    palette = NIVO ,
    renderer = 'svg' ,
    steps = 5 ,
    theme : themeOverrides ,
    to ,
    valueFormat ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = usePalette( { palette , count : steps , sequential : true } ) ;

    const { empty : emptyCell , dayBorder , monthBorder } = useThemeColors( CALENDAR_COLOR_KEYS ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    const { margin : resolvedMargin , legends } = useChartLayout
    ({
        kind   : GRID ,
        legend ,
        margin ,
    }) ;

    const tooltip = useCallback
    (
        ( { color , day , value } ) => (
            <ChartTooltip color={ color } label={ day } value={ value } />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveCalendarCanvas : ResponsiveCalendar ;

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
            maxHeight       = { maxHeight }
        >
            <Component
                animate          = { animate && !reduceMotion }
                colors           = { colors }
                data             = { data }
                dayBorderColor   = { dayBorderColor ?? dayBorder ?? 'transparent' }
                dayBorderWidth   = { dayBorderWidth }
                direction        = { direction }
                emptyColor       = { emptyColor ?? emptyCell ?? 'transparent' }
                from             = { from }
                legends          = { legends }
                margin           = { resolvedMargin }
                maxValue         = { maxValue }
                minValue         = { minValue }
                monthBorderColor = { monthBorderColor ?? monthBorder ?? 'transparent' }
                monthBorderWidth = { monthBorderWidth }
                theme            = { theme }
                to               = { to }
                tooltip          = { tooltip }
                valueFormat      = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

CalendarChart.displayName = 'CalendarChart' ;

export default CalendarChart ;
