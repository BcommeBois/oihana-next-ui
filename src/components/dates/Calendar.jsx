'use client' ;

import { useEffect , useState } from 'react' ;

import useLang       from '../../contexts/lang/useLang' ;
import useValue      from '../../hooks/useValue' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import MonthGrid from './calendar/MonthGrid' ;

/** Single-date selection mode. */
export const SINGLE = 'single' ;

/** Date-range selection mode. */
export const RANGE = 'range' ;

const EMPTY_RANGE = { from : null , to : null } ;

/**
 * Calendar — a self-contained, dayjs-based month calendar. Single date or date
 * range, one or two months. Locale-aware via {@link useLang}
 * (month / weekday names + first day of week), controlled or uncontrolled via
 * {@link useValue}. No react-day-picker / date-fns.
 *
 * In `single` mode the value is a `Date` (or null). In `range` mode the value is
 * `{ from: Date|null, to: Date|null }`.
 *
 * @module components/dates/Calendar
 *
 * @param {Object} props
 * @param {boolean} [props.clearable=false] - Re-clicking the selected day (single) or a range endpoint clears the selection; `Escape` also clears.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {Date|{from:Date|null,to:Date|null}|null} [props.defaultValue] - Initial value (uncontrolled).
 * @param {Date} [props.max] - Latest selectable date (inclusive).
 * @param {Date} [props.min] - Earliest selectable date (inclusive).
 * @param {'single'|'range'} [props.mode='single'] - Selection mode.
 * @param {1|2|'auto'} [props.months=1] - Number of months shown. `'auto'` = 2 on `md`+ screens, 1 below.
 * @param {(value: Date|{from:Date|null,to:Date|null}) => void} [props.onChange] - Selection handler.
 * @param {Date|{from:Date|null,to:Date|null}|null} [props.value] - Controlled value.
 *
 * @example
 * ```jsx
 * // Single
 * <Calendar value={ date } onChange={ setDate } min={ new Date() } />
 *
 * // Range over two months (auto on desktop)
 * <Calendar mode="range" months="auto" value={ range } onChange={ setRange } />
 * ```
 */
const Calendar =
({
    className ,
    clearable = false ,
    defaultValue ,
    max ,
    min ,
    mode = SINGLE ,
    months = 1 ,
    onChange : onChangeFromProps ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const isRange = mode === RANGE ;

    // Responsive month count (auto: 2 on md+, 1 below).
    const isMdUp     = useBreakpoint( 'md' ) ;
    const monthCount = months === 'auto' ? ( isMdUp ? 2 : 1 ) : ( Number( months ) === 2 ? 2 : 1 ) ;

    const [ rawValue , setRawValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const selected = isRange ? ( rawValue ?? EMPTY_RANGE ) : ( rawValue ?? null ) ;

    const fromDay   = isRange && selected.from ? dayjs( selected.from ) : null ;
    const toDay     = isRange && selected.to   ? dayjs( selected.to )   : null ;
    const singleDay = !isRange && selected     ? dayjs( selected )      : null ;

    const [ hovered , setHovered ] = useState( null ) ;

    const anchorTime = isRange
        ? ( selected.from ? +new Date( selected.from ) : null )
        : ( selected ? +new Date( selected ) : null ) ;

    const [ viewMonth , setViewMonth ] = useState( () => dayjs( anchorTime ?? undefined ).startOf( 'month' ) ) ;

    // Bring the anchor's month into view when the value changes — but only when it
    // is not already visible, so picking a range endpoint in the second month of a
    // dual view never makes the calendar jump.
    useEffect( () =>
    {
        if ( !anchorTime )
        {
            return ;
        }
        const a = dayjs( anchorTime ).startOf( 'month' ) ;
        setViewMonth( ( m ) =>
        {
            const last    = m.add( monthCount - 1 , 'month' ) ;
            const visible = !a.isBefore( m , 'month' ) && !a.isAfter( last , 'month' ) ;
            return visible ? m : a ;
        } ) ;
    }
    , [ anchorTime , monthCount ] ) ;

    const minDay = min ? dayjs( min ).startOf( 'day' ) : null ;
    const maxDay = max ? dayjs( max ).startOf( 'day' ) : null ;

    const isDisabled = ( day ) =>
        ( !!minDay && day.isBefore( minDay , 'day' ) ) ||
        ( !!maxDay && day.isAfter( maxDay , 'day' ) ) ;

    const handlePick = day =>
    {
        if ( isDisabled( day ) )
        {
            return ;
        }

        if ( !isRange )
        {
            // Re-clicking the selected day clears it (when clearable).
            if ( clearable && singleDay && day.isSame( singleDay , 'day' ) )
            {
                setRawValue( null ) ;
                return ;
            }
            setRawValue( day.toDate() ) ;
            return ;
        }

        // Re-clicking an endpoint clears the whole range (when clearable).
        if ( clearable && ( ( fromDay && day.isSame( fromDay , 'day' ) ) || ( toDay && day.isSame( toDay , 'day' ) ) ) )
        {
            setRawValue({ from : null , to : null }) ;
            setHovered( null ) ;
            return ;
        }

        // Range : start a new range, or complete the open one (swapping if needed).
        if ( !fromDay || ( fromDay && toDay ) )
        {
            setRawValue({ from : day.toDate() , to : null }) ;
            setHovered( null ) ;
            return ;
        }

        const lo = day.isBefore( fromDay , 'day' ) ? day : fromDay ;
        const hi = day.isBefore( fromDay , 'day' ) ? fromDay : day ;
        setRawValue({ from : lo.toDate() , to : hi.toDate() }) ;
        setHovered( null ) ;
    } ;

    const handleHover = ( day ) =>
    {
        if ( isRange && fromDay && !toDay )
        {
            setHovered( day ) ;
        }
    } ;

    // Effective range endpoints (with the live hover preview while picking).
    const previewEnd = ( isRange && fromDay && !toDay && hovered ) ? hovered : toDay ;
    let lo = fromDay ;
    let hi = previewEnd ;
    if ( lo && hi && hi.isBefore( lo , 'day' ) )
    {
        [ lo , hi ] = [ hi , lo ] ;
    }

    const today = dayjs() ;

    const getDayState = ( day , monthAnchor ) =>
    {
        const base =
        {
            outside  : !day.isSame( monthAnchor , 'month' ) ,
            disabled : isDisabled( day ) ,
            today    : day.isSame( today , 'day' ) ,
        } ;

        if ( !isRange )
        {
            return { ...base , selected : !!singleDay && day.isSame( singleDay , 'day' ) } ;
        }

        return {
            ...base ,
            rangeStart : !!lo && day.isSame( lo , 'day' ) ,
            rangeEnd   : !!hi && day.isSame( hi , 'day' ) ,
            inRange    : !!lo && !!hi && day.isAfter( lo , 'day' ) && day.isBefore( hi , 'day' ) ,
        } ;
    } ;

    const hasValue = isRange ? !!( selected.from || selected.to ) : !!selected ;

    // Escape clears the selection (when clearable). Stop it here so it doesn't also
    // close a surrounding Modal in the input pickers — a second Escape (no value) will.
    const handleKeyDown = ( event ) =>
    {
        if ( clearable && hasValue && event.key === 'Escape' )
        {
            event.preventDefault() ;
            event.stopPropagation() ;
            setRawValue( isRange ? { from : null , to : null } : null ) ;
            setHovered( null ) ;
        }
    } ;

    const monthsArr = Array.from( { length : monthCount } , ( _ , i ) => viewMonth.add( i , 'month' ) ) ;

    return (
        <div className={ getCalendarClasses({ className }) } onKeyDown={ handleKeyDown } { ...rest }>
            <div className="flex flex-col gap-4 sm:flex-row">
                {
                    monthsArr.map( ( month , i ) => (
                    <MonthGrid
                        key         = { month.valueOf() }
                        month       = { month }
                        lang        = { lang }
                        showPrev    = { i === 0 }
                        showNext    = { i === monthCount - 1 }
                        onPrev      = { () => setViewMonth( ( m ) => m.subtract( 1 , 'month' ) ) }
                        onNext      = { () => setViewMonth( ( m ) => m.add( 1 , 'month' ) ) }
                        getDayState = { ( day ) => getDayState( day , month ) }
                        onPick      = { handlePick }
                        onHover     = { handleHover }
                        onLeave     = { () => setHovered( null ) }
                    />
                ) ) }
            </div>
        </div>
    ) ;
} ;

Calendar.displayName = 'Calendar' ;

export default Calendar ;
