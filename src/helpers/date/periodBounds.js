import dayjs from './configureDayjs' ;

/**
 * Normalises the `min` / `max` bounds of the month / year pickers into the day
 * objects {@link module:helpers/date/createDisabledModel} expects.
 *
 * A `Date` is taken as it is. A **number is read as a year**, and a year bound
 * always covers the whole year : `min` snaps to its first day, `max` to its
 * last — so `max = 2030` leaves December 2030 selectable rather than blocking
 * everything after the 1st of January.
 *
 * @module helpers/date/periodBounds
 *
 * @example
 * toMinDay( 2026 ).format('YYYY-MM-DD') // → '2026-01-01'
 * toMaxDay( 2026 ).format('YYYY-MM-DD') // → '2026-12-31'
 */

/**
 * The earliest selectable day of a bound.
 *
 * @param {Date|number|null} [min] - A date, or a year.
 * @returns {import('dayjs').Dayjs|null}
 */
export const toMinDay = ( min ) =>
{
    if ( min == null )
    {
        return null ;
    }
    return typeof min === 'number'
        ? dayjs( new Date( min , 0 , 1 ) ).startOf( 'day' )
        : dayjs( min ).startOf( 'day' ) ;
} ;

/**
 * The latest selectable day of a bound.
 *
 * @param {Date|number|null} [max] - A date, or a year.
 * @returns {import('dayjs').Dayjs|null}
 */
export const toMaxDay = ( max ) =>
{
    if ( max == null )
    {
        return null ;
    }
    return typeof max === 'number'
        ? dayjs( new Date( max , 11 , 31 ) ).startOf( 'day' )
        : dayjs( max ).startOf( 'day' ) ;
} ;
