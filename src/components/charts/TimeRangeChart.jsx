'use client' ;

/**
 * Time range heatmap — a calendar over an arbitrary span of days.
 *
 * @module components/charts/TimeRangeChart
 */

import { useCallback , useMemo } from 'react' ;

import { ResponsiveTimeRange } from '@nivo/calendar' ;

import { useMedia } from 'react-use' ;

import useChartPalette from '../../hooks/useChartPalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import { CALENDAR_COLOR_KEYS } from '../../themes/charts/calendar' ;
import { getChartLegends }     from '../../themes/charts/legends' ;
import { getGridMargin }       from '../../themes/charts/margins' ;
import { NIVO }                from '../../themes/charts/palettes' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * Time range heatmap.
 *
 * The simpler sibling of {@link CalendarChart} : the same day grid, but over
 * an arbitrary span rather than whole calendar years. Use it for the last
 * few weeks or months, where a full year of empty cells would be noise.
 *
 * Like the calendar, it maps a quantity to a color, so the palette is a
 * **sequential ramp** rather than categorical colors.
 *
 * **SVG only** — nivo ships no canvas renderer for this one. It is not a
 * chart that grows large enough to need one.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {Array<{day:string,value:number}>} props.data - Days as `YYYY-MM-DD` with their value.
 * @param {string} [props.dayBorderColor] - Gap color between days ; defaults to the surface color.
 * @param {number} [props.dayRadius=2] - Corner rounding of each day cell.
 * @param {string} [props.emptyColor] - Color of days with no data ; defaults to a DaisyUI theme color.
 * @param {number} [props.firstWeekday] - Index of the first weekday shown.
 * @param {string|number|Date} [props.from] - First day shown ; inferred from the data when omitted.
 * @param {number|string} [props.height=240] - Frame height.
 * @param {boolean|string|Object} [props.legend=false] - `false`, a position, or a nivo legend override.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Sequential palette, or explicit ramp colors.
 * @param {boolean} [props.square=true] - Force square cells.
 * @param {number} [props.steps=5] - Number of buckets in the generated ramp.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string|number|Date} [props.to] - Last day shown ; inferred from the data when omitted.
 * @param {number[]} [props.weekdayTicks] - Which weekday labels to show, `0` to `6`.
 *
 * @example
 * ```jsx
 * <TimeRangeChart
 *     data = { [ { day : '2026-06-01' , value : 12 } ] }
 *     from = "2026-05-01"
 *     to   = "2026-07-31"
 * />
 * ```
 */
const TimeRangeChart =
({
    animate = true ,
    aspect ,
    className ,
    data ,
    dayBorderColor ,
    dayRadius = 2 ,
    emptyColor ,
    firstWeekday ,
    from ,
    height = 240 ,
    legend = false ,
    margin ,
    nivoProps ,
    palette = NIVO ,
    square = true ,
    steps = 5 ,
    theme : themeOverrides ,
    to ,
    weekdayTicks ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = useChartPalette( { palette , count : steps , sequential : true } ) ;

    const { empty , dayBorder } = useThemeColors( CALENDAR_COLOR_KEYS ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // Weekday names are spelled out down the left side, so they need real room.
    const resolvedMargin = useMemo
    (
        () => getGridMargin( { weekdayLabels : true , legend , margin } ) ,
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

    return (
        <ChartFrame aspect={ aspect } className={ className } height={ height }>
            <ResponsiveTimeRange
                animate        = { animate && !reduceMotion }
                colors         = { colors }
                data           = { data }
                dayBorderColor = { dayBorderColor ?? dayBorder ?? 'transparent' }
                dayBorderWidth = { 2 }
                dayRadius      = { dayRadius }
                emptyColor     = { emptyColor ?? empty ?? 'transparent' }
                firstWeekday   = { firstWeekday }
                from           = { from }
                legends        = { legends }
                margin         = { resolvedMargin }
                square         = { square }
                theme          = { theme }
                to             = { to }
                tooltip        = { tooltip }
                weekdayTicks   = { weekdayTicks }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

TimeRangeChart.displayName = 'TimeRangeChart' ;

export default TimeRangeChart ;
