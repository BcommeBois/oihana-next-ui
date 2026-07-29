/**
 * Theme colors for the day-grid charts — calendar, time range.
 *
 * These are the one family whose *structural* colors cannot come from the
 * nivo theme object : `emptyColor`, `dayBorderColor` and `monthBorderColor`
 * are plain props, and nivo defaults them to `#fff` and `#000`. Left alone,
 * a dark theme renders a black grid on a black background.
 *
 * Borders take the surface color rather than a line color on purpose : the
 * cells are separated by *gaps of background*, not by drawn strokes, which
 * is what gives the grid its lightness.
 *
 * @module themes/charts/calendar
 */

/**
 * The DaisyUI color keys a day-grid chart needs.
 *
 * Passed straight to `useThemeColors`.
 *
 * @type {Object.<string,string>}
 */
export const CALENDAR_COLOR_KEYS =
{
    empty       : 'base-200' ,
    dayBorder   : 'base-100' ,
    // Kept light on purpose : the month outline only has to group the cells,
    // and anything stronger reads as a drawn frame competing with the data.
    monthBorder : 'base-content/20' ,
} ;

export default CALENDAR_COLOR_KEYS ;
