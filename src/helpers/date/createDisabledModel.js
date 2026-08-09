import dayjs from './configureDayjs' ;

import createDisabledMatcher from './matchDisabledDate' ;
import { normalizeWeekdays } from './weekdays' ;

import { BLACKOUT , BOUNDS , MONTH , WEEKDAY , YEAR } from './disabledReasons' ;

/**
 * Builds the predicate behind `disabledYears`. Accepts a year, a `{from,to}`
 * range (inclusive, either bound optional), an array of those, or a predicate.
 *
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)|null|undefined} disabledYears
 * @returns {(year: number) => boolean}
 */
const createYearMatcher = ( disabledYears ) =>
{
    if ( disabledYears == null )
    {
        return () => false ;
    }

    if ( typeof disabledYears === 'function' )
    {
        return ( year ) => !!disabledYears( year ) ;
    }

    const items = Array.isArray( disabledYears ) ? disabledYears : [ disabledYears ] ;

    const matchers = items.map( ( item ) =>
    {
        if ( item && typeof item === 'object' )
        {
            const { from , to } = item ;
            return ( year ) => ( from == null || year >= from ) && ( to == null || year <= to ) ;
        }

        return ( year ) => year === Number( item ) ;
    } ) ;

    return ( year ) => matchers.some( ( match ) => match( year ) ) ;
} ;

/**
 * Builds the predicate behind `disabledMonths`. Accepts a month index (0–11,
 * every year), a `{year,month}` pair (that month of that year — `year` omitted
 * means every year), an array of those, or a `(year, month)` predicate.
 *
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)|null|undefined} disabledMonths
 * @returns {(year: number, month: number) => boolean}
 */
const createMonthMatcher = ( disabledMonths ) =>
{
    if ( disabledMonths == null )
    {
        return () => false ;
    }

    if ( typeof disabledMonths === 'function' )
    {
        return ( year , month ) => !!disabledMonths( year , month ) ;
    }

    const items = Array.isArray( disabledMonths ) ? disabledMonths : [ disabledMonths ] ;

    const matchers = items.map( ( item ) =>
    {
        if ( item && typeof item === 'object' )
        {
            const target = Number( item.month ) ;
            return ( year , month ) => month === target && ( item.year == null || year === item.year ) ;
        }

        return ( _ , month ) => month === Number( item ) ;
    } ) ;

    return ( year , month ) => matchers.some( ( match ) => match( year , month ) ) ;
} ;

/**
 * Builds the single object that decides whether a calendar cell is selectable,
 * from every rule {@link module:components/dates/Calendar} accepts. All rules
 * combine with a logical OR : a cell is blocked as soon as one of them matches.
 *
 * Unlike {@link matchDisabledDate}, this does not answer yes / no only — it says *why*,
 * which is what lets the theme mute a blocked weekday without striking it through
 * like an exceptional blackout date.
 *
 * Rules cascade downwards : a blocked year blocks its twelve months, a blocked
 * month blocks all its days, and each level reports the reason it inherited.
 * The reverse direction — a month whose every day happens to be blocked showing
 * up as blocked in the quick picker — costs a scan of the month and is therefore
 * opt-in, through `deriveEmptyMonths`. It is never applied to years.
 *
 * @module helpers/date/createDisabledModel
 *
 * @param {Object} [rules]
 * @param {Date|{from?:Date,to?:Date}|Array|((date:Date)=>boolean)} [rules.disabledDates] - Explicit blackout days.
 * @param {number|string|Array<number|string>} [rules.disabledWeekdays] - Blocked weekdays (0–6 or 'sun'…'sat').
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [rules.disabledMonths] - Blocked months.
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [rules.disabledYears] - Blocked years.
 * @param {import('dayjs').Dayjs|null} [rules.minDay] - Earliest selectable day (inclusive).
 * @param {import('dayjs').Dayjs|null} [rules.maxDay] - Latest selectable day (inclusive).
 * @param {boolean} [rules.deriveEmptyMonths=false] - Also report a month as blocked when every one of its days is.
 *
 * @returns {{
 *   getDayReason   : (day: import('dayjs').Dayjs) => string|null ,
 *   isDayDisabled  : (day: import('dayjs').Dayjs) => boolean ,
 *   getMonthReason : (year: number, month: number) => string|null ,
 *   getYearReason  : (year: number) => string|null ,
 * }}
 *
 * @example
 * const model = createDisabledModel({ disabledWeekdays : [ 'sat' , 'sun' ] }) ;
 * model.getDayReason( dayjs('2026-08-08') )  // → 'weekday'
 * model.isDayDisabled( dayjs('2026-08-10') ) // → false
 *
 * @example
 * const model = createDisabledModel({ disabledMonths : 7 , disabledYears : { from : 2030 } }) ;
 * model.getMonthReason( 2026 , 7 ) // → 'month'  (August, every year)
 * model.getYearReason( 2031 )      // → 'year'
 * model.getMonthReason( 2031 , 0 ) // → 'year'   (inherited)
 */
export const createDisabledModel = ( {
    disabledDates ,
    disabledWeekdays ,
    disabledMonths ,
    disabledYears ,
    minDay ,
    maxDay ,
    deriveEmptyMonths = false ,
} = {} ) =>
{
    const isBlackout     = createDisabledMatcher( disabledDates ) ;
    const weekdays       = normalizeWeekdays( disabledWeekdays ) ;
    const isBlockedYear  = createYearMatcher( disabledYears ) ;
    const isBlockedMonth = createMonthMatcher( disabledMonths ) ;

    // The bounds are compared as plain integers rather than dayjs instances : the
    // cascade runs once per day cell, and building a dayjs there would allocate
    // forty-two objects a month for a pair of comparisons.
    const minYear  = minDay ? minDay.year()  : null ;
    const minMonth = minDay ? minDay.month() : null ;
    const maxYear  = maxDay ? maxDay.year()  : null ;
    const maxMonth = maxDay ? maxDay.month() : null ;

    /** Declarative only — never derived, so it stays safe to call per day cell. */
    const yearReason = ( year ) =>
    {
        if ( ( minYear !== null && year < minYear ) || ( maxYear !== null && year > maxYear ) )
        {
            return BOUNDS ;
        }
        return isBlockedYear( year ) ? YEAR : null ;
    } ;

    /** Declarative only. A month partly inside the bounds is not blocked — its days are. */
    const monthReason = ( year , month ) =>
    {
        const inherited = yearReason( year ) ;
        if ( inherited )
        {
            return inherited ;
        }

        if ( ( minYear !== null && year === minYear && month < minMonth ) ||
             ( maxYear !== null && year === maxYear && month > maxMonth ) )
        {
            return BOUNDS ;
        }

        return isBlockedMonth( year , month ) ? MONTH : null ;
    } ;

    // Ordered cheapest-first : the integer cascade, then two date comparisons,
    // then a Set lookup, and only then the blackout matchers — which may be a
    // caller-supplied predicate.
    const getDayReason = day =>
    {
        const inherited = monthReason( day.year() , day.month() ) ;
        if ( inherited )
        {
            return inherited ;
        }

        if ( ( !!minDay && day.isBefore( minDay , 'day' ) ) || ( !!maxDay && day.isAfter( maxDay , 'day' ) ) )
        {
            return BOUNDS ;
        }

        if ( weekdays.size > 0 && weekdays.has( day.day() ) )
        {
            return WEEKDAY ;
        }

        return isBlackout( day ) ? BLACKOUT : null ;
    } ;

    // Memoized across renders : the model itself is memoized by the Calendar, so
    // reopening the months grid never rescans a month it has already walked.
    const emptyMonths = new Map() ;

    const isEmptyMonth = ( year , month ) =>
    {
        const key = `${ year }-${ month }` ;
        if ( emptyMonths.has( key ) )
        {
            return emptyMonths.get( key ) ;
        }

        const first = dayjs( new Date( year , month , 1 ) ) ;
        const total = first.daysInMonth() ;

        let empty = true ;
        for ( let i = 0 ; i < total ; i++ )
        {
            if ( getDayReason( first.add( i , 'day' ) ) === null )
            {
                empty = false ;
                break ;
            }
        }

        emptyMonths.set( key , empty ) ;
        return empty ;
    } ;

    const getMonthReason = ( year , month ) =>
    {
        const declared = monthReason( year , month ) ;
        if ( declared )
        {
            return declared ;
        }

        // Reported as a blackout, not as a month rule : nothing declares this
        // month blocked, its contents do — and the line-through says so.
        return ( deriveEmptyMonths && isEmptyMonth( year , month ) ) ? BLACKOUT : null ;
    } ;

    // Years are never derived from their days — twelve month scans a cell, over a
    // twelve-year page, is not a price a quick picker should pay. A year is only
    // derived from the declarative state of its own months.
    const getYearReason = year =>
    {
        const declared = yearReason( year ) ;
        if ( declared )
        {
            return declared ;
        }

        for ( let month = 0 ; month < 12 ; month++ )
        {
            if ( monthReason( year , month ) === null )
            {
                return null ;
            }
        }

        return YEAR ;
    } ;

    return {
        getDayReason ,
        isDayDisabled : ( day ) => getDayReason( day ) !== null ,
        getMonthReason ,
        getYearReason ,
    } ;
} ;

export default createDisabledModel ;
