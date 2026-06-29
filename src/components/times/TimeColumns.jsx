'use client' ;

import { useMemo } from 'react' ;

import useTime from '../../helpers/time/useTime' ;
import Time from '../../helpers/time/Time' ;
import formatTime from '../../helpers/time/formatTime' ;
import convertTo12Hour from '../../helpers/time/convertTo12Hour' ;
import getTimeColumns from '../../helpers/time/getTimeColumns' ;

import { getTimeColumnsClasses } from '../../themes/components/timePicker' ;

import TimeColumn from './timecolumns/TimeColumn' ;

import { MdSchedule as NowIcon } from 'react-icons/md' ;

const toTime = ( value ) => value == null ? null : ( value instanceof Time ? value : new Time( value ) ) ;

/**
 * TimeColumns — a self-contained, column/list time picker built on the `Time`
 * class and the {@link useTime} hook (no analog clock). Hours
 * and minutes, with optional **seconds** and an **AM/PM** column (`ampm`), stepped
 * by `minuteStep` / `secondStep`, bounded by `min` / `max` (24-hour). Controlled or
 * uncontrolled, with a **Now** shortcut. Shares the value semantics of
 * {@link InputTime}.
 *
 * @module components/times/TimeColumns
 *
 * @param {Object} props
 * @param {boolean} [props.ampm=false] - 12-hour display with an AM/PM column.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {string} [props.defaultMeridiem] - Initial meridiem (uncontrolled, AM/PM).
 * @param {string} [props.defaultValue] - Initial time string (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the whole picker.
 * @param {Object} [props.labels] - Column header labels ({ hour, minute, second }).
 * @param {Date|string|Time} [props.max] - Latest selectable time (24-hour).
 * @param {string} [props.meridiem] - Controlled meridiem (AM/PM).
 * @param {Date|string|Time} [props.min] - Earliest selectable time (24-hour).
 * @param {number} [props.minuteStep=1] - Minutes increment.
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(meridiem: string) => void} [props.onChangeMeridiem] - Meridiem change handler.
 * @param {(time: Time|null) => void} [props.onTime] - Time-object change handler.
 * @param {number} [props.secondStep=1] - Seconds increment.
 * @param {boolean} [props.showNow=true] - Show the "Now" shortcut button.
 * @param {string} [props.nowLabel='Now'] - Label of the "Now" button.
 * @param {boolean} [props.useSeconds=false] - Add a seconds column.
 * @param {string} [props.value] - Controlled time string.
 *
 * @example
 * ```jsx
 * const [ time , setTime ] = useState('14:30') ;
 * <TimeColumns value={ time } onChange={ setTime } minuteStep={ 5 } />
 * ```
 */
const TimeColumns =
({
    ampm = false ,
    className ,
    defaultMeridiem ,
    defaultValue ,
    disabled = false ,
    labels ,
    max ,
    meridiem : meridiemFromProps ,
    min ,
    minuteStep = 1 ,
    nowLabel = 'Now' ,
    onChange : onChangeFromProps ,
    onChangeMeridiem : onChangeMeridiemFromProps ,
    onTime ,
    secondStep = 1 ,
    showNow = true ,
    useSeconds = false ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { meridiem , time , setValue , setMeridiem } = useTime({
        ampm ,
        defaultMeridiem ,
        defaultValue ,
        meridiemFromProps ,
        valueFromProps ,
        onChangeFromProps ,
        onChangeMeridiemFromProps ,
        onTime ,
    }) ;

    const minTime = useMemo( () => toTime( min ) , [ min ] ) ;
    const maxTime = useMemo( () => toTime( max ) , [ max ] ) ;

    const columns = useMemo(
        () => getTimeColumns({ time , meridiem , ampm , useSeconds , minuteStep , secondStep , min : minTime , max : maxTime }) ,
        [ time , meridiem , ampm , useSeconds , minuteStep , secondStep , minTime , maxTime ]
    ) ;

    // Rebuild the value string (without meridiem) from the current components with a
    // single one patched ; useTime re-derives the Time and fires onChange / onTime.
    const setComponent = ( patch ) =>
    {
        const base = time
            ? { hour : time.hour , minute : time.minute , second : time.second }
            : { hour : ampm ? 12 : 0 , minute : 0 , second : 0 } ;
        const next = { ...base , ...patch } ;
        setValue( formatTime({ hour : next.hour , minute : next.minute , second : useSeconds ? next.second : undefined , ampm }) ) ;
    } ;

    const handleNow = () =>
    {
        const now = new Date() ;
        let hour = now.getHours() ;
        let merid ;
        if ( ampm )
        {
            [ hour , merid ] = convertTo12Hour( hour ) ;
        }
        setValue( formatTime({ hour , minute : now.getMinutes() , second : useSeconds ? now.getSeconds() : undefined , ampm }) ) ;
        if ( ampm )
        {
            setMeridiem( merid ) ;
        }
    } ;

    const L = { hour : 'Hr' , minute : 'Min' , second : 'Sec' , ...labels } ;

    return (
        <div className={ getTimeColumnsClasses({ className }) } { ...rest }>
            <div className="flex items-start justify-center gap-2">
                <TimeColumn label={ L.hour }   options={ columns.hours }   disabled={ disabled } onSelect={ ( v ) => setComponent({ hour : v }) } />
                <TimeColumn label={ L.minute } options={ columns.minutes } disabled={ disabled } onSelect={ ( v ) => setComponent({ minute : v }) } />
                { columns.seconds && (
                    <TimeColumn label={ L.second } options={ columns.seconds } disabled={ disabled } onSelect={ ( v ) => setComponent({ second : v }) } />
                ) }
                { columns.meridiem && (
                    <TimeColumn label="" options={ columns.meridiem } disabled={ disabled } onSelect={ ( v ) => setMeridiem( v ) } />
                ) }
            </div>

            { showNow && (
                <button type="button" disabled={ disabled } className="btn btn-ghost btn-sm gap-1 self-center" onClick={ handleNow }>
                    <NowIcon className="size-4" /> { nowLabel }
                </button>
            ) }
        </div>
    ) ;
} ;

TimeColumns.displayName = 'TimeColumns' ;

export default TimeColumns ;
