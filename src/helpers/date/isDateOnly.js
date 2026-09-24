/**
 * Whether a value is a calendar date alone — `2026-05-31`, with no hour and no
 * zone.
 *
 * Such a value names a DAY, not an instant : written with an hour it reads
 * « 31/05/2026 at 00:00:00 », an hour nobody stated. A label can then pick a
 * pattern without one — see the `datePattern` of
 * {@link module:components/labels/DateLabel}.
 *
 * @module helpers/date/isDateOnly
 *
 * @param {*} value - Anything a date label may receive.
 * @returns {boolean} `true` for a string `YYYY-MM-DD` alone, surrounding spaces aside.
 *
 * @example
 * ```js
 * isDateOnly( '2026-05-31' ) ;           // true
 * isDateOnly( '2026-05-31T00:00:00Z' ) ; // false
 * isDateOnly( new Date() ) ;             // false
 * ```
 */
const isDateOnly = ( value ) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test( value.trim() ) ;

export default isDateOnly ;
