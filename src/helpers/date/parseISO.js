/**
 * Parses a date string formatted as an ISO-like date (YYYY{separator}MM{separator}DD)
 * and returns a corresponding JavaScript Date object.
 *
 * The function expects exactly three parts separated by the provided separator.
 * The month is converted to JavaScript's zero-based month index (0–11).
 *
 * @param {string} str - The date string to parse.
 * @param {string} separator - The separator used between year, month, and day.
 * @returns {Date|null} A valid Date object if parsing succeeds; otherwise null.
 *
 * @example
 * parseISO('2025-02-19', '-') // → Date object (Feb 19, 2025)
 * parseISO('2025/02/19', '/') // → Date object
 * parseISO('invalid', '-')    // → null
 */
const parseISO = ( str , separator ) =>
{
    if ( !str ) return null ;

    const parts = str.trim().split( separator ) ;

    if ( parts.length !== 3 ) return null ;

    const year  = parseInt( parts[ 0 ], 10 ) ;
    const month = parseInt( parts[ 1 ], 10 ) - 1 ; // Mois 0-11 en JS
    const day   = parseInt( parts[ 2 ], 10 ) ;

    const date = new Date( year, month, day ) ;

    return isNaN( date.getTime() ) ? null : date ;
} ;

export default parseISO ;