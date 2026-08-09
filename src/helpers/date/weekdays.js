/**
 * Weekday helpers, shared by the calendar grid (first day of week) and the
 * disabled-day rules (blocked weekdays).
 *
 * Weekday numbers follow dayjs : 0 = Sunday … 6 = Saturday. They are absolute —
 * they never depend on the locale nor on `weekStartsOn`, so the same value always
 * designates the same day.
 *
 * @module helpers/date/weekdays
 */

/** Weekday name (3-letter prefix, lowercase) → dayjs weekday number. */
const DOW = { sun : 0 , mon : 1 , tue : 2 , wed : 3 , thu : 4 , fri : 5 , sat : 6 } ;

/**
 * Normalises a weekday value to a dayjs weekday number (0 = Sunday … 6 = Saturday).
 *
 * @param {number|string|null|undefined} value - A number (0–6) or a day name ('sun'…'sat', case-insensitive, 3-letter prefix).
 * @returns {number|null} The weekday number, or `null` when not provided / unrecognised.
 */
export const normalizeWeekday = ( value ) =>
{
    if ( value == null )
    {
        return null ;
    }
    if ( typeof value === 'number' )
    {
        return ( ( value % 7 ) + 7 ) % 7 ;
    }
    const key = String( value ).slice( 0 , 3 ).toLowerCase() ;
    return key in DOW ? DOW[ key ] : null ;
} ;

/**
 * Normalises a set of weekdays — a scalar or an array, mixing numbers and names.
 * Unrecognised entries are dropped rather than throwing, so a typo blocks nothing.
 *
 * @param {number|string|Array<number|string>|null|undefined} value
 * @returns {Set<number>} The weekday numbers (empty when nothing is given).
 *
 * @example
 * normalizeWeekdays([ 'sat' , 'sun' ]) // → Set { 6 , 0 }
 * normalizeWeekdays( 0 )               // → Set { 0 }
 */
export const normalizeWeekdays = ( value ) =>
{
    if ( value == null )
    {
        return new Set() ;
    }

    const items = Array.isArray( value ) ? value : [ value ] ;
    const days  = new Set() ;

    for ( const item of items )
    {
        const day = normalizeWeekday( item ) ;
        if ( day != null )
        {
            days.add( day ) ;
        }
    }

    return days ;
} ;

export default normalizeWeekday ;
