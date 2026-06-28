import dayjs from './configureDayjs' ;

/**
 * Builds a predicate that tells whether a given day is "disabled" (blocked),
 * from a flexible `disabledDates` definition. Used by {@link module:components/dates/Calendar}
 * for blackout dates (holidays, unavailable days…).
 *
 * `disabledDates` may be :
 * - a `Date` — that single day,
 * - a range `{ from, to }` (inclusive ; `from` or `to` alone = open-ended),
 * - an array mixing the two,
 * - a function `(date: Date) => boolean` — used as-is (e.g. disable weekends).
 *
 * @param {Date | {from?: Date, to?: Date} | Array | ((date: Date) => boolean) | null | undefined} disabledDates
 * @returns {(day: import('dayjs').Dayjs) => boolean} A predicate over a dayjs day.
 *
 * @example
 * const blocked = createDisabledMatcher([
 *     new Date('2026-07-14'),                                  // a single day
 *     { from: new Date('2026-08-01'), to: new Date('2026-08-15') }, // a range
 * ]) ;
 * blocked( dayjs('2026-08-10') ) // → true
 */
export const createDisabledMatcher = ( disabledDates ) =>
{
    if ( !disabledDates )
    {
        return () => false ;
    }

    if ( typeof disabledDates === 'function' )
    {
        return ( day ) => !!disabledDates( day.toDate() ) ;
    }

    const items = Array.isArray( disabledDates ) ? disabledDates : [ disabledDates ] ;

    const matchers = items.map( ( item ) =>
    {
        if ( item && ( item.from || item.to ) )
        {
            const from = item.from ? dayjs( item.from ).startOf( 'day' ) : null ;
            const to   = item.to   ? dayjs( item.to   ).startOf( 'day' ) : null ;
            return ( day ) =>
                ( !from || !day.isBefore( from , 'day' ) ) &&
                ( !to   || !day.isAfter( to , 'day' ) ) ;
        }

        const single = dayjs( item ).startOf( 'day' ) ;
        return ( day ) => day.isSame( single , 'day' ) ;
    } ) ;

    return ( day ) => matchers.some( ( match ) => match( day ) ) ;
} ;

export default createDisabledMatcher ;
