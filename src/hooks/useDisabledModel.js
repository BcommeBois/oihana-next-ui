'use client' ;

import { useMemo } from 'react' ;

import dayjs from '../helpers/date/configureDayjs' ;
import createDisabledModel from '../helpers/date/createDisabledModel' ;

/**
 * Memoises the {@link module:helpers/date/createDisabledModel} of a date field,
 * from the same rule props its `Calendar` receives. The three pickers all need
 * to answer the very question the calendar answers — "may this date be picked ?" —
 * for the value typed into their masked field, which the grid never sees.
 *
 * Takes the raw `Date` bounds rather than dayjs instances : those are rebuilt on
 * every render, so keying the memo on them would rebuild the model every time.
 *
 * @module hooks/useDisabledModel
 *
 * @param {Object} [rules]
 * @param {Date|{from?:Date,to?:Date}|Array|((date:Date)=>boolean)} [rules.disabledDates]
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [rules.disabledMonths]
 * @param {number|string|Array<number|string>} [rules.disabledWeekdays]
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [rules.disabledYears]
 * @param {Date} [rules.min] - Earliest selectable date (inclusive).
 * @param {Date} [rules.max] - Latest selectable date (inclusive).
 *
 * @returns {{ getDayReason : Function , isDayDisabled : Function , getMonthReason : Function , getYearReason : Function }}
 *
 * @example
 * const { isDayDisabled } = useDisabledModel({ disabledWeekdays : [ 'sat' , 'sun' ] , min }) ;
 * isDayDisabled( dayjs( typedDate ) ) // → true on a Saturday
 */
export const useDisabledModel = ( { disabledDates , disabledMonths , disabledWeekdays , disabledYears , min , max } = {} ) =>
{
    const minDay = useMemo( () => ( min ? dayjs( min ).startOf( 'day' ) : null ) , [ min ] ) ;
    const maxDay = useMemo( () => ( max ? dayjs( max ).startOf( 'day' ) : null ) , [ max ] ) ;

    return useMemo
    (
        () => createDisabledModel({ disabledDates , disabledMonths , disabledWeekdays , disabledYears , minDay , maxDay }) ,
        [ disabledDates , disabledMonths , disabledWeekdays , disabledYears , minDay , maxDay ]
    ) ;
} ;

export default useDisabledModel ;
