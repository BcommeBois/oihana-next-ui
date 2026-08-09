/**
 * Why a calendar cell is not selectable. Kept in a dependency-free module so the
 * theme layer can style each reason without pulling dayjs in.
 *
 * The distinction is visual, not functional : an explicit blackout is an
 * exception and must stand out (struck through), while a bound or a blocked
 * weekday is the structure of the calendar and only needs to be muted —
 * striking through every Saturday and Sunday turns the grid into a checkerboard.
 *
 * @module helpers/date/disabledReasons
 */

/** Outside the `min` / `max` bounds. */
export const BOUNDS = 'bounds' ;

/** Matched by an explicit `disabledDates` entry (a date, a range or a predicate). */
export const BLACKOUT = 'blackout' ;

/** Matched by `disabledWeekdays`. */
export const WEEKDAY = 'weekday' ;

/**
 * Reasons that describe the calendar's structure rather than an exception.
 * These are muted but never struck through.
 */
export const STRUCTURAL_REASONS = [ BOUNDS , WEEKDAY ] ;

/**
 * Tells whether a reason is structural (as opposed to an explicit blackout).
 * An unknown or missing reason is treated as an exception, which keeps a bare
 * `{ disabled : true }` rendering exactly as it did before reasons existed.
 *
 * @param {string|null|undefined} reason
 * @returns {boolean}
 */
export const isStructuralReason = ( reason ) => STRUCTURAL_REASONS.includes( reason ) ;
