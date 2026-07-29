'use client' ;

/**
 * Calendar heatmap — one cell per day, colored by value.
 *
 * @module components/charts/CalendarChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveCalendar , ResponsiveCalendarCanvas } from '@nivo/calendar' ;

import { useMedia } from 'react-use' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import { CALENDAR_COLOR_KEYS } from '../../themes/charts/calendar' ;
import { getChartLegends }     from '../../themes/charts/legends' ;
import { getDayGridMargin }    from '../../themes/charts/margins' ;
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
 * so the colors have to be ordered ; the component asks `useChartPalette`
 * for a ramp rather than for mutually distinguishable colors, which would
 * destroy the reading.
 *
 * The cell, day and month border colors come from the DaisyUI theme.
 * nivo's own defaults are hardcoded to `#fff` and `#000`, which turn a dark
 * theme into a black grid on a black background.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {Array<{day:string,value:number}>} props.data - Days as `YYYY-MM-DD` with their value.
 * @param {string} [props.dayBorderColor] - Gap color between days ; defaults to the surface color.
 * @param {string} [props.direction='horizontal'] - `'horizontal'` or `'vertical'`.
 * @param {string} [props.emptyColor] - Color of days with no data ; defaults to a DaisyUI theme color.
 * @param {string|number|Date} props.from - First day shown.
 * @param {string} [props.monthBorderColor] - Month outline color ; defaults to a light DaisyUI theme color.
 * @param {number|string} [props.height=260] - Frame height.
 * @param {boolean|string|Object} [props.legend=false] - `false`, a position, or a nivo legend override.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxValue='auto'] - Upper bound of the color scale.
 * @param {number|string} [props.minValue='auto'] - Lower bound of the color scale.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Sequential palette, or explicit ramp colors.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` — worth it past two or three years of days.
 * @param {number} [props.steps=5] - Number of buckets in the generated ramp.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string|number|Date} props.to - Last day shown.
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
    aspect ,
    className ,
    data ,
    dayBorderColor ,
    direction = 'horizontal' ,
    emptyColor ,
    from ,
    monthBorderColor ,
    height = 260 ,
    legend = false ,
    margin ,
    maxValue = 'auto' ,
    minValue = 'auto' ,
    nivoProps ,
    palette = NIVO ,
    renderer = 'svg' ,
    steps = 5 ,
    theme : themeOverrides ,
    to ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = useChartPalette( { palette , count : steps , sequential : true } ) ;

    const { empty , dayBorder , monthBorder } = useThemeColors( CALENDAR_COLOR_KEYS ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    const resolvedMargin = useMemo
    (
        () => getDayGridMargin( { legend , margin } ) ,
        [ legend , margin ] ,
    ) ;

    const legends = useMemo
    (
        () => getChartLegends( { legend , margin : resolvedMargin } ) ,
        [ legend , resolvedMargin ] ,
    ) ;

    const tooltip = useCallback
    (
        ( { color , day , value } ) => (
            <ChartTooltip color={ color } label={ day } value={ value } />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsiveCalendarCanvas : ResponsiveCalendar ;

    return (
        <ChartFrame aspect={ aspect } className={ className } height={ height }>
            <Component
                animate          = { animate && !reduceMotion }
                colors           = { colors }
                data             = { data }
                dayBorderColor   = { dayBorderColor ?? dayBorder ?? 'transparent' }
                dayBorderWidth   = { 2 }
                direction        = { direction }
                emptyColor       = { emptyColor ?? empty ?? 'transparent' }
                from             = { from }
                legends          = { legends }
                margin           = { resolvedMargin }
                maxValue         = { maxValue }
                minValue         = { minValue }
                monthBorderColor = { monthBorderColor ?? monthBorder ?? 'transparent' }
                monthBorderWidth = { 2 }
                theme            = { theme }
                to               = { to }
                tooltip          = { tooltip }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

CalendarChart.displayName = 'CalendarChart' ;

export default CalendarChart ;
