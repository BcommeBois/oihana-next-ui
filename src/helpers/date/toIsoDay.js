/**
 * A `Date` → its ISO day `YYYY-MM-DD`, from its LOCAL parts.
 *
 * `toISOString()` converts to UTC first, which turns the 1ˢᵗ of a month into
 * the 31ˢᵗ of the previous one for anyone east of Greenwich ; the day the
 * reader picked is the local one. The converse trap is `new Date( 'YYYY-MM-DD' )`,
 * which parses as UTC — build a `Date` from its parts instead.
 *
 * @module helpers/date/toIsoDay
 *
 * @param {Date} date
 * @returns {string} `YYYY-MM-DD`.
 *
 * @example
 * ```js
 * toIsoDay( new Date( 2026 , 6 , 1 ) ) ; // '2026-07-01', in every time zone
 * ```
 */
const toIsoDay = date =>
{
    const month = String( date.getMonth() + 1 ).padStart( 2 , '0' ) ;
    const day   = String( date.getDate() ).padStart( 2 , '0' ) ;

    return `${ date.getFullYear() }-${ month }-${ day }` ;
} ;

export default toIsoDay ;
