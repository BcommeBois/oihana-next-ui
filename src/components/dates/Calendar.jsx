'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import useLang  from '../../contexts/lang/useLang' ;
import useValue from '../../hooks/useValue' ;

import dayjs from '../../helpers/date/configureDayjs' ;
import { getMonthMatrix , getWeekdayLabels } from '../../helpers/date/getMonthMatrix' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import Header   from './calendar/Header' ;
import Weekdays from './calendar/Weekdays' ;
import Day      from './calendar/Day' ;

/**
 * Calendar — a self-contained, dayjs-based month calendar (single-date for now ;
 * range + shortcuts come next). Locale-aware via {@link module:contexts/lang/useLang}
 * (month / weekday names + first day of week), controlled or uncontrolled via
 * {@link module:hooks/useValue}. Emits a native `Date`.
 *
 * @module components/dates/Calendar
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {Date|null} [props.defaultValue] - Initial selected date (uncontrolled).
 * @param {Date} [props.max] - Latest selectable date (inclusive).
 * @param {Date} [props.min] - Earliest selectable date (inclusive).
 * @param {(date: Date) => void} [props.onChange] - Selection handler.
 * @param {Date|null} [props.value] - Controlled selected date.
 *
 * @example
 * ```jsx
 * const [ date , setDate ] = useState( new Date() ) ;
 * <Calendar value={ date } onChange={ setDate } min={ new Date() } />
 * ```
 */
const Calendar =
({
    className ,
    defaultValue = null ,
    max ,
    min ,
    onChange : onChangeFromProps ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { lang } = useLang() ;

    const [ selected , setSelected ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const selectedDay = useMemo( () => ( selected ? dayjs( selected ) : null ) , [ selected ] ) ;

    const [ viewMonth , setViewMonth ] = useState( () => ( selected ? dayjs( selected ) : dayjs() ).startOf( 'month' ) ) ;

    // Follow the selected date's month when it changes from the outside.
    useEffect( () =>
    {
        if ( selectedDay )
        {
            setViewMonth( ( m ) => ( selectedDay.isSame( m , 'month' ) ? m : selectedDay.startOf( 'month' ) ) ) ;
        }
    }
    , [ selectedDay ] ) ;

    const weeks    = useMemo( () => getMonthMatrix( viewMonth , lang ) , [ viewMonth , lang ] ) ;
    const weekdays = useMemo( () => getWeekdayLabels( lang ) , [ lang ] ) ;

    const minDay = useMemo( () => ( min ? dayjs( min ).startOf( 'day' ) : null ) , [ min ] ) ;
    const maxDay = useMemo( () => ( max ? dayjs( max ).startOf( 'day' ) : null ) , [ max ] ) ;

    const isDisabled = ( day ) =>
        ( !!minDay && day.isBefore( minDay , 'day' ) ) ||
        ( !!maxDay && day.isAfter( maxDay , 'day' ) ) ;

    const handlePick = ( day ) =>
    {
        if ( isDisabled( day ) )
        {
            return ;
        }
        setSelected( day.toDate() ) ;
        if ( !day.isSame( viewMonth , 'month' ) )
        {
            setViewMonth( day.startOf( 'month' ) ) ;
        }
    } ;

    const today = dayjs() ;
    const days  = weeks.flat() ;

    return (
        <div className={ getCalendarClasses({ className }) } { ...rest }>
            <Header
                month  = { viewMonth }
                lang   = { lang }
                onPrev = { () => setViewMonth( ( m ) => m.subtract( 1 , 'month' ) ) }
                onNext = { () => setViewMonth( ( m ) => m.add( 1 , 'month' ) ) }
            />

            <Weekdays labels={ weekdays } />

            <div className="grid grid-cols-7 gap-0.5">
                { days.map( ( day ) => (
                    <Day
                        key      = { day.valueOf() }
                        day      = { day }
                        outside  = { !day.isSame( viewMonth , 'month' ) }
                        today    = { day.isSame( today , 'day' ) }
                        selected = { !!selectedDay && day.isSame( selectedDay , 'day' ) }
                        disabled = { isDisabled( day ) }
                        onPick   = { handlePick }
                    />
                ) ) }
            </div>
        </div>
    ) ;
} ;

Calendar.displayName = 'Calendar' ;

export default Calendar ;
