import dayjs from './configureDayjs' ;

/**
 * Builds the 6×7 day grid for the month containing `month`, honouring the
 * locale's first day of week. Days that belong to the previous / next month
 * (the "outside" days) are included so the grid is always rectangular.
 *
 * @param {import('dayjs').ConfigType} month - Any date within the target month.
 * @param {string} [lang='en'] - Active locale code (e.g. 'fr', 'en').
 * @returns {import('dayjs').Dayjs[][]} 6 weeks × 7 dayjs days.
 *
 * @example
 * getMonthMatrix(new Date('2026-02-15'), 'fr') // weeks starting on Monday
 */
export const getMonthMatrix = ( month , lang = 'en' ) =>
{
    const start = dayjs( month ).locale( lang ).startOf( 'month' ).weekday( 0 ) ;

    const weeks = [] ;
    let cursor = start ;

    for ( let w = 0 ; w < 6 ; w++ )
    {
        const days = [] ;
        for ( let d = 0 ; d < 7 ; d++ )
        {
            days.push( cursor ) ;
            cursor = cursor.add( 1 , 'day' ) ;
        }
        weeks.push( days ) ;
    }

    return weeks ;
} ;

/**
 * Minimal localised weekday labels, ordered from the locale's first day of week.
 *
 * @param {string} [lang='en'] - Active locale code.
 * @returns {string[]} 7 labels (e.g. ['lun','mar',…] for fr, ['Su','Mo',…] for en).
 */
export const getWeekdayLabels = ( lang = 'en' ) =>
{
    const localeData = dayjs().locale( lang ).localeData() ;
    const first      = localeData.firstDayOfWeek() ;
    const labels     = localeData.weekdaysMin() ; // index 0 = Sunday

    return Array.from( { length : 7 } , ( _ , i ) => labels[ ( first + i ) % 7 ] ) ;
} ;

export default getMonthMatrix ;
