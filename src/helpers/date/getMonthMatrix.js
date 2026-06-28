import dayjs from './configureDayjs' ;

const DOW = { sun : 0 , mon : 1 , tue : 2 , wed : 3 , thu : 4 , fri : 5 , sat : 6 } ;

/**
 * Normalises a "week start" value to a dayjs weekday number (0 = Sunday … 6 = Saturday).
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
 * Builds the 6×7 day grid for the month containing `month`. The first day of week
 * follows `weekStartsOn` when provided, otherwise the locale's first day of week.
 * Days that belong to the previous / next month (the "outside" days) are included
 * so the grid is always rectangular.
 *
 * @param {import('dayjs').ConfigType} month - Any date within the target month.
 * @param {string} [lang='en'] - Active locale code (e.g. 'fr', 'en').
 * @param {number|string} [weekStartsOn] - Force the first day of week (0–6 or 'sun'…'sat'); defaults to the locale.
 * @returns {import('dayjs').Dayjs[][]} 6 weeks × 7 dayjs days.
 *
 * @example
 * getMonthMatrix(new Date('2026-02-15'), 'fr')          // weeks starting on Monday (locale)
 * getMonthMatrix(new Date('2026-02-15'), 'fr', 'sun')   // forced to start on Sunday
 */
export const getMonthMatrix = ( month , lang = 'en' , weekStartsOn ) =>
{
    const monthStart = dayjs( month ).locale( lang ).startOf( 'month' ) ;
    const first      = normalizeWeekday( weekStartsOn ) ?? monthStart.localeData().firstDayOfWeek() ;
    const diff       = ( monthStart.day() - first + 7 ) % 7 ;
    const start      = monthStart.subtract( diff , 'day' ) ;

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
 * Minimal localised weekday labels, ordered from `weekStartsOn` when provided,
 * otherwise from the locale's first day of week.
 *
 * @param {string} [lang='en'] - Active locale code.
 * @param {number|string} [weekStartsOn] - Force the first day of week (0–6 or 'sun'…'sat'); defaults to the locale.
 * @returns {string[]} 7 labels (e.g. ['lun','mar',…] for fr, ['Su','Mo',…] for en).
 */
export const getWeekdayLabels = ( lang = 'en' , weekStartsOn ) =>
{
    const localeData = dayjs().locale( lang ).localeData() ;
    const first      = normalizeWeekday( weekStartsOn ) ?? localeData.firstDayOfWeek() ;
    const labels     = localeData.weekdaysMin() ; // index 0 = Sunday

    return Array.from( { length : 7 } , ( _ , i ) => labels[ ( first + i ) % 7 ] ) ;
} ;

export default getMonthMatrix ;
