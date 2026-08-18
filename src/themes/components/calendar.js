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

import { BLACKOUT , isStructuralReason } from '../../helpers/date/disabledReasons' ;

/**
 * The floor of a day cell — **measured, not chosen**.
 *
 * `.btn-sm` sets `--size: calc(var(--size-field) * 8)` and `.btn-square` makes
 * that the width too, so this expression *is* what a day cell measures today.
 * Written as the calculation rather than as `2rem` so it keeps following the
 * theme : a theme with a larger `--size-field` gets larger cells, exactly as it
 * already gets larger buttons.
 *
 * It is what guarantees the non-regression. Where no width is imposed — the
 * `w-fit` panel of a picker's popover — the grid falls back to its intrinsic
 * size, which is seven of these, which is the calendar as it has always looked.
 */
export const CALENDAR_CELL_MIN = 'calc(var(--size-field, 0.25rem) * 8)' ;

/**
 * The ceiling, and the only number here that is a judgement call.
 *
 * A cell that grew without limit would make a month in a wide card as tall as
 * it is wide — nine hundred pixels of calendar. So it fills, then stops, then
 * centres. Half again the floor is enough to fill a phone comfortably without
 * the grid ever looking inflated.
 *
 * **Setting it to the floor turns the whole thing off**, which is why there is
 * no second prop to do that.
 */
export const CALENDAR_CELL_MAX = 'calc(var(--size-field, 0.25rem) * 12)' ;

/**
 * Base classes for the calendar panel.
 *
 * `flex w-full` rather than `inline-flex` : a panel that shrink-wraps can never
 * be given a width, and that was the whole reason a month could not fill the
 * space it was put in. It costs nothing where nothing imposes a width, since
 * the grid inside still reports its own intrinsic size.
 */
export const CALENDAR = 'flex w-full flex-col gap-1 select-none' ;

/**
 * A row of seven — the weekday header and every week.
 *
 * `minmax()` is the whole mechanism : the **min** is what the track reports when
 * it is asked how wide it wants to be, so a popover that sizes to its content
 * gets exactly today's calendar ; the **max** is where growth stops when there
 * *is* room to grow, and `justify-center` places the grid in what is left.
 *
 * @safelist grid-cols-[repeat(7,minmax(var(--cal-cell-min),var(--cal-cell-max)))]
 */
export const CALENDAR_WEEK = 'grid justify-center gap-0.5 grid-cols-[repeat(7,minmax(var(--cal-cell-min),var(--cal-cell-max)))]' ;

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

/**
 * Base classes for a day cell (colour/style is added per modifier — see below).
 *
 * `btn-square` is gone : it fixes width **and** height in pixels, which is what
 * kept a month from ever filling anything. The cell now takes its column and
 * stays square by ratio — `h-auto` because `.btn` sets a height of its own, and
 * `px-0` because `.btn` sets a padding-inline that would make it wider than it
 * is tall.
 */
export const CALENDAR_DAY = 'btn btn-sm h-auto w-full max-w-[var(--cal-cell-max)] aspect-square px-0 rounded-field font-normal' ;

/**
 * Generates the className for a single day cell.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.disabled] - Not selectable.
 * @param {string} [props.disabledReason] - Why : 'bounds' | 'weekday' (structural, muted only) or 'blackout' (exceptional, struck through). Defaults to the blackout rendering.
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
    disabledReason ,
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

    // Crossed by the range without belonging to it — only reachable under
    // `allowDisabledInRange`. It keeps the band's square corners so the selection
    // still reads as one span, but never its primary fill : it is not selected.
    const isExcluded = !!disabled && !!inRange && !isEndpoint ;

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
            ...!isEndpoint && inRange && !isExcluded && { 'btn-ghost bg-primary/20 text-base-content rounded-none' : true } ,
            ...isExcluded && { 'btn-ghost bg-base-300 rounded-none' : true } ,
            ...!isEndpoint && !inRange && { 'btn-ghost' : true } ,

            // Today marker (only when it is not already an endpoint).
            ...today && !isEndpoint && { 'ring-1 ring-primary ring-inset' : true } ,

            // Visual hierarchy for non-selectable cells :
            //   normal in-month   → full base-content (clickable)
            //   other-month day   → muted but clearly clickable
            //   structural block  → readable muted colour + inert (a bound, a blocked weekday)
            //   exceptional block → the same, plus a line-through (a blackout date)
            ...outside && !disabled && !isEndpoint && !inRange && { 'text-base-content/40' : true } ,
            ...disabled && { 'text-base-content/55 pointer-events-none' : true } ,
            ...disabled && !isStructuralReason( disabledReason ) && { 'line-through' : true } ,

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
 * @param {boolean} [props.disabled] - Not selectable.
 * @param {string} [props.disabledReason] - Why : 'bounds' | 'month' | 'year' (structural, muted only) or 'blackout' — a month every day of which is blocked, struck through like the days it holds.
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
    disabledReason ,
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
        // Struck through only when explicitly a blackout : unlike a day, a month or
        // a year cell is structural by nature, so silence must keep it plain.
        ...disabled && disabledReason === BLACKOUT && { 'line-through' : true } ,
        ...after ,
    } ,
    className ,
) ;

export default getCalendarClasses ;
