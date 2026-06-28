/**
 * Calendar class generators.
 *
 * Our own dayjs-based calendar (no react-day-picker / date-fns). Provides the
 * panel container classes and a per-day-cell generator covering the day
 * modifiers (selected / today / outside / disabled / range).
 *
 * @module themes/components/calendar
 */

import cn from '../helpers/cn' ;

/** Base classes for the calendar panel. */
export const CALENDAR = 'inline-flex flex-col gap-1 select-none' ;

/**
 * Generates the className for the {@link module:components/dates/Calendar} panel.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The calendar panel className expression.
 *
 * @example
 * getCalendarClasses() // → 'inline-flex flex-col gap-1 select-none'
 */
const getCalendarClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
}
= {} ) => cn
(
    beforeClassName ,
    CALENDAR ,
    { ...before , ...after } ,
    className ,
) ;

/** Base classes for a day cell (colour/style is added per modifier — see below). */
export const CALENDAR_DAY = 'btn btn-sm btn-square rounded-field font-normal' ;

/**
 * Generates the className for a single day cell.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.disabled] - Out of the allowed range.
 * @param {boolean} [props.inRange] - Inside a selected range (between endpoints).
 * @param {boolean} [props.outside] - Belongs to the previous / next month.
 * @param {boolean} [props.rangeEnd] - End of a selected range.
 * @param {boolean} [props.rangeStart] - Start of a selected range.
 * @param {boolean} [props.selected] - The selected day (single mode).
 * @param {boolean} [props.today] - Today's date.
 *
 * @returns {string} The day-cell className expression.
 */
export const getCalendarDayClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    disabled ,
    inRange ,
    outside ,
    rangeEnd ,
    rangeStart ,
    selected ,
    today ,
}
= {} ) =>
{
    const isEndpoint = selected || rangeStart || rangeEnd ;

    return cn
    (
        beforeClassName ,
        CALENDAR_DAY ,
        {
            ...before ,

            // Colour / style — endpoint (btn-primary) and normal (btn-ghost) are
            // mutually exclusive : combining them lets btn-ghost win the background
            // while the primary-content text stays, making the label invisible.
            ...isEndpoint && { 'btn-primary text-primary-content' : true } ,
            ...!isEndpoint && inRange && { 'btn-ghost bg-primary/20 text-base-content rounded-none' : true } ,
            ...!isEndpoint && !inRange && { 'btn-ghost' : true } ,

            // Today marker (only when it is not already an endpoint).
            ...today && !isEndpoint && { 'ring-1 ring-primary ring-inset' : true } ,

            // Visual hierarchy for non-selectable cells :
            //   normal in-month  → full base-content (clickable)
            //   other-month day  → muted but clearly clickable
            //   out-of-range day → readable muted colour + line-through + inert
            ...outside && !disabled && !isEndpoint && !inRange && { 'text-base-content/40' : true } ,
            ...disabled && { 'text-base-content/55 line-through pointer-events-none' : true } ,

            ...after ,
        } ,
        className ,
    ) ;
} ;

/** Base classes for a month / year cell of the quick-navigation grids. */
export const CALENDAR_CELL = 'btn btn-sm rounded-field font-normal' ;

/**
 * Generates the className for a month / year cell (the quick month/year picker
 * grids). Mirrors {@link getCalendarDayClasses} but for the wider (non-square)
 * month / year buttons.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.active] - The current month / year.
 * @param {boolean} [props.disabled] - Out of the allowed min / max range.
 *
 * @returns {string} The cell className expression.
 */
export const getCalendarCellClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    active ,
    disabled ,
}
= {} ) => cn
(
    beforeClassName ,
    CALENDAR_CELL ,
    {
        ...before ,
        ...active && { 'btn-primary text-primary-content' : true } ,
        ...!active && { 'btn-ghost' : true } ,
        ...disabled && !active && { 'text-base-content/40' : true } ,
        ...after ,
    } ,
    className ,
) ;

export default getCalendarClasses ;
