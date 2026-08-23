'use client' ;

/**
 * Time range heatmap — a calendar over an arbitrary span of days.
 *
 * @module components/charts/TimeRangeChart
 */

import { useCallback } from 'react' ;

import { ResponsiveTimeRange } from '@nivo/calendar' ;

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
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {string} [props.dayBorderColor] - Gap color between days ; defaults to the surface color.
 * @param {number} [props.dayBorderWidth=2] - Width of the gap between days.
 * @param {number} [props.dayRadius=2] - Corner rounding of each day cell.
 * @param {string} [props.emptyColor] - Color of days with no data ; defaults to a DaisyUI theme color.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number} [props.firstWeekday] - Index of the first weekday shown.
 * @param {string|number|Date} [props.from] - First day shown ; inferred from the data when omitted.
 * @param {number|string} [props.height=240] - Frame height.
 * @param {boolean|string|Object} [props.legend=false] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height. Pair it with `aspect` : a circular chart takes its radius from the smaller inner dimension, so a fixed `height` leaves two empty bands on a narrow screen.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {string|string[]} [props.palette='nivo'] - Sequential palette, or explicit ramp colors.
 * @param {boolean} [props.square=true] - Force square cells.
 * @param {number} [props.steps=5] - Number of buckets in the generated ramp.
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string|number|Date} [props.to] - Last day shown ; inferred from the data when omitted.
 * @param {string} [props.valueFormat] - d3-format string for values.
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
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    className ,
    data ,
    dayBorderColor ,
    dayBorderWidth = 2 ,
    dayRadius = 2 ,
    emptyColor ,
    emptyLabel ,
    emptyState ,
    firstWeekday ,
    from ,
    height = 240 ,
    legend = false ,
    loading ,
    margin ,
    maxHeight ,
    nivoProps ,
    palette = NIVO ,
    square = true ,
    steps = 5 ,
    theme : themeOverrides ,
    to ,
    valueFormat ,
    weekdayTicks ,
    ...rest
}) =>
{
    const theme = useChartTheme( { overrides : themeOverrides } ) ;

    const colors = usePalette( { palette , count : steps , sequential : true } ) ;

    const { empty : emptyCell , dayBorder } = useThemeColors( CALENDAR_COLOR_KEYS ) ?? {} ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    const { margin : resolvedMargin , legends } = useChartLayout
    ({
        kind          : GRID ,
        legend ,
        margin ,
        weekdayLabels : true ,
    }) ;

    const tooltip = useCallback
    (
        ( { color , day , value } ) => (
            <ChartTooltip color={ color } label={ day } value={ value } />
        ) ,
        [] ,
    ) ;

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
            <ResponsiveTimeRange
                animate        = { animate && !reduceMotion }
                colors         = { colors }
                data           = { data }
                dayBorderColor = { dayBorderColor ?? dayBorder ?? 'transparent' }
                dayBorderWidth = { dayBorderWidth }
                dayRadius      = { dayRadius }
                emptyColor     = { emptyColor ?? emptyCell ?? 'transparent' }
                firstWeekday   = { firstWeekday }
                from           = { from }
                legends        = { legends }
                margin         = { resolvedMargin }
                square         = { square }
                theme          = { theme }
                to             = { to }
                tooltip        = { tooltip }
                valueFormat    = { valueFormat }
                weekdayTicks   = { weekdayTicks }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

TimeRangeChart.displayName = 'TimeRangeChart' ;

export default TimeRangeChart ;
