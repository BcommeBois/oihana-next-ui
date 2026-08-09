import createDisabledMatcher from './matchDisabledDate' ;
import { normalizeWeekdays } from './weekdays' ;

import { BLACKOUT , BOUNDS , WEEKDAY } from './disabledReasons' ;

/**
 * Builds the single object that decides whether a calendar cell is selectable,
 * from every rule {@link module:components/dates/Calendar} accepts. All rules
 * combine with a logical OR : a day is blocked as soon as one of them matches.
 *
 * Unlike {@link module:helpers/date/matchDisabledDate}, this does not answer
 * yes / no only — it says *why*, which is what lets the theme mute a blocked
 * weekday without striking it through like an exceptional blackout date.
 *
 * @module helpers/date/createDisabledModel
 *
 * @param {Object} [rules]
 * @param {Date|{from?:Date,to?:Date}|Array|((date:Date)=>boolean)} [rules.disabledDates] - Explicit blackout days.
 * @param {number|string|Array<number|string>} [rules.disabledWeekdays] - Blocked weekdays (0–6 or 'sun'…'sat').
 * @param {import('dayjs').Dayjs|null} [rules.minDay] - Earliest selectable day (inclusive).
 * @param {import('dayjs').Dayjs|null} [rules.maxDay] - Latest selectable day (inclusive).
 *
 * @returns {{ getDayReason : (day: import('dayjs').Dayjs) => string|null , isDayDisabled : (day: import('dayjs').Dayjs) => boolean }}
 *
 * @example
 * const model = createDisabledModel({ disabledWeekdays : [ 'sat' , 'sun' ] }) ;
 * model.getDayReason( dayjs('2026-08-08') )  // → 'weekday'
 * model.isDayDisabled( dayjs('2026-08-10') ) // → false
 */
export const createDisabledModel = ( { disabledDates , disabledWeekdays , minDay , maxDay } = {} ) =>
{
    const isBlackout = createDisabledMatcher( disabledDates ) ;
    const weekdays   = normalizeWeekdays( disabledWeekdays ) ;

    // Ordered cheapest-first : two date comparisons, then a Set lookup, and only
    // then the blackout matchers — which may be a caller-supplied predicate.
    const getDayReason = ( day ) =>
    {
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

    return {
        getDayReason ,
        isDayDisabled : ( day ) => getDayReason( day ) !== null ,
    } ;
} ;

export default createDisabledModel ;
