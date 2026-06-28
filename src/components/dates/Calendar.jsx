'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import useLang       from '../../contexts/lang/useLang' ;
import useValue      from '../../hooks/useValue' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import { getRangeShortcuts , getSingleShortcuts } from '../../helpers/date/shortcuts' ;
import createDisabledMatcher from '../../helpers/date/matchDisabledDate' ;

import MonthGrid from './calendar/MonthGrid' ;
import MonthsGrid from './calendar/MonthsGrid' ;
import YearsGrid from './calendar/YearsGrid' ;
import Shortcuts from './calendar/Shortcuts' ;

/** Single-date selection mode. */
export const SINGLE = 'single' ;

/** Date-range selection mode. */
export const RANGE = 'range' ;

const EMPTY_RANGE = { from : null , to : null } ;

// Quick-navigation picker kinds (a month column shows one in place of its days).
const MONTHS_VIEW = 'months' ;
const YEARS_VIEW  = 'years' ;

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
 * @param {boolean} [props.allowDisabledInRange=false] - Allow a selected range to span blocked days (by default a range stops before the first blocked day).
 * @param {boolean} [props.clearable=false] - Re-clicking the selected day (single) or a range endpoint clears the selection; `Escape` also clears.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {Date} [props.defaultMonth] - Month shown on first render when there is no value (quick navigation start).
 * @param {Date|{from:Date|null,to:Date|null}|null} [props.defaultValue] - Initial value (uncontrolled).
 * @param {Date|{from?:Date,to?:Date}|Array|((date:Date)=>boolean)} [props.disabledDates] - Blackout days : a date, a `{from,to}` range, an array of those, or a predicate.
 * @param {Date} [props.max] - Latest selectable date (inclusive).
 * @param {Date} [props.min] - Earliest selectable date (inclusive).
 * @param {'single'|'range'} [props.mode='single'] - Selection mode.
 * @param {1|2|'auto'} [props.months=1] - Number of months shown. `'auto'` = 2 on `md`+ screens, 1 below.
 * @param {(value: Date|{from:Date|null,to:Date|null}) => void} [props.onChange] - Selection handler.
 * @param {boolean|{id:string,label:string,value:Function}[]} [props.shortcuts=false] - `true` for the default presets (Today, Last 7 days, This month… in range mode; Today / Yesterday / Tomorrow in single mode), or a custom array.
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
    allowDisabledInRange = false ,
    className ,
    clearable = false ,
    defaultMonth ,
    defaultValue ,
    disabledDates ,
    max ,
    min ,
    mode = SINGLE ,
    months = 1 ,
    onChange : onChangeFromProps ,
    shortcuts = false ,
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

    const [ viewMonth , setViewMonth ] = useState( () => dayjs( anchorTime ?? defaultMonth ?? undefined ).startOf( 'month' ) ) ;

    // Quick month / year navigation : which month column (if any) has its picker
    // open, the kind of grid, and the working year / 12-year page. `null` index =
    // every column shows its days.
    const [ pickerIndex   , setPickerIndex   ] = useState( null ) ;
    const [ pickerKind    , setPickerKind    ] = useState( MONTHS_VIEW ) ;
    const [ pickerYear    , setPickerYear    ] = useState( () => dayjs( anchorTime ?? defaultMonth ?? undefined ).year() ) ;
    const [ yearPageStart , setYearPageStart ] = useState( () => dayjs( anchorTime ?? defaultMonth ?? undefined ).year() - 4 ) ;

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

    const minYear = minDay ? minDay.year() : null ;
    const maxYear = maxDay ? maxDay.year() : null ;

    // Quick-navigation handlers, per month column. Picking a month sets the anchor
    // so the picked month lands in the column it was opened from (in a dual view
    // the right column is anchor + 1). The years grid chains into the months grid
    // (years → month → day).
    const slotMonth  = ( index ) => viewMonth.add( index , 'month' ) ;
    const openMonths = ( index ) => { setPickerIndex( index ) ; setPickerKind( MONTHS_VIEW ) ; setPickerYear( slotMonth( index ).year() ) ; } ;
    const openYears  = ( index , fromYear ) => { setPickerIndex( index ) ; setPickerKind( YEARS_VIEW ) ; setYearPageStart( ( fromYear ?? slotMonth( index ).year() ) - 4 ) ; } ;
    const pickMonth  = ( m ) => { setViewMonth( dayjs( new Date( pickerYear , m , 1 ) ).subtract( pickerIndex , 'month' ) ) ; setPickerIndex( null ) ; } ;
    const pickYear   = ( y ) => { setPickerYear( y ) ; setPickerKind( MONTHS_VIEW ) ; } ;

    // Blackout dates (holidays / unavailable days). A day is disabled when out of
    // the min/max bounds OR matched by `disabledDates`.
    const isBlocked = useMemo( () => createDisabledMatcher( disabledDates ) , [ disabledDates ] ) ;

    const isDisabled = ( day ) =>
        ( !!minDay && day.isBefore( minDay , 'day' ) ) ||
        ( !!maxDay && day.isAfter( maxDay , 'day' ) ) ||
        isBlocked( day ) ;

    // Furthest day reachable from `from` toward `end` without crossing a blocked
    // day (so a range can never span one, unless `allowDisabledInRange`). `from`
    // is assumed selectable. The span is bounded by the visible months → cheap.
    const capTowardBlock = ( from , end ) =>
    {
        if ( !from || !end || allowDisabledInRange )
        {
            return end ;
        }
        const step = end.isBefore( from , 'day' ) ? -1 : 1 ;
        let cursor = from ;
        while ( !cursor.isSame( end , 'day' ) )
        {
            const nextDay = cursor.add( step , 'day' ) ;
            if ( isBlocked( nextDay ) )
            {
                break ;
            }
            cursor = nextDay ;
        }
        return cursor ;
    } ;

    const shortcutItems = useMemo( () =>
    {
        if ( shortcuts === true )
        {
            return isRange ? getRangeShortcuts() : getSingleShortcuts() ;
        }
        return Array.isArray( shortcuts ) ? shortcuts : [] ;
    }
    , [ shortcuts , isRange ] ) ;

    const applyShortcut = ( item ) =>
    {
        setRawValue( typeof item.value === 'function' ? item.value() : item.value ) ;
        setHovered( null ) ;
    } ;

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

        // Cap the second endpoint so the range never spans a blocked day (no-op
        // when `allowDisabledInRange`) — commits exactly what the preview showed.
        const end = capTowardBlock( fromDay , day ) ;
        const lo  = end.isBefore( fromDay , 'day' ) ? end : fromDay ;
        const hi  = end.isBefore( fromDay , 'day' ) ? fromDay : end ;
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

    // Effective range endpoints (with the live hover preview while picking). The
    // preview stops before the first blocked day (unless `allowDisabledInRange`).
    const previewEnd = ( isRange && fromDay && !toDay && hovered ) ? capTowardBlock( fromDay , hovered ) : toDay ;
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

    // Highlight the shortcut whose value matches the current selection.
    const activeShortcutId = shortcutItems.length === 0 ? null : ( shortcutItems.find( ( item ) =>
    {
        const v = typeof item.value === 'function' ? item.value() : item.value ;
        if ( isRange )
        {
            return !!( v?.from && v?.to && selected.from && selected.to
                && dayjs( v.from ).isSame( selected.from , 'day' )
                && dayjs( v.to ).isSame( selected.to , 'day' ) ) ;
        }
        return !!( v && selected && dayjs( v ).isSame( selected , 'day' ) ) ;
    } )?.id ?? null ) ;

    const monthsArr = Array.from( { length : monthCount } , ( _ , i ) => viewMonth.add( i , 'month' ) ) ;

    return (
        <div className={ getCalendarClasses({ className }) } onKeyDown={ handleKeyDown } { ...rest }>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

                { shortcutItems.length > 0 && (
                    <Shortcuts items={ shortcutItems } onSelect={ applyShortcut } activeId={ activeShortcutId } />
                )}

                <div className="flex flex-col gap-4 sm:flex-row">
                    { monthsArr.map( ( month , i ) =>
                    {
                        if ( pickerIndex === i && pickerKind === MONTHS_VIEW )
                        {
                            return (
                                <MonthsGrid
                                    key          = { `picker-${ i }` }
                                    year         = { pickerYear }
                                    currentMonth = { slotMonth( i ).month() }
                                    currentYear  = { slotMonth( i ).year() }
                                    lang         = { lang }
                                    minDay       = { minDay }
                                    maxDay       = { maxDay }
                                    onPick       = { pickMonth }
                                    onPrevYear   = { () => setPickerYear( ( y ) => y - 1 ) }
                                    onNextYear   = { () => setPickerYear( ( y ) => y + 1 ) }
                                    onYearClick  = { () => openYears( i , pickerYear ) }
                                />
                            ) ;
                        }

                        if ( pickerIndex === i && pickerKind === YEARS_VIEW )
                        {
                            return (
                                <YearsGrid
                                    key         = { `picker-${ i }` }
                                    pageStart   = { yearPageStart }
                                    currentYear = { slotMonth( i ).year() }
                                    minYear     = { minYear }
                                    maxYear     = { maxYear }
                                    onPick      = { pickYear }
                                    onPrevPage  = { () => setYearPageStart( ( s ) => s - 12 ) }
                                    onNextPage  = { () => setYearPageStart( ( s ) => s + 12 ) }
                                />
                            ) ;
                        }

                        return (
                            <MonthGrid
                                key          = { month.valueOf() }
                                month        = { month }
                                lang         = { lang }
                                showPrev     = { i === 0 }
                                showNext     = { i === monthCount - 1 }
                                onPrev       = { () => setViewMonth( ( m ) => m.subtract( 1 , 'month' ) ) }
                                onNext       = { () => setViewMonth( ( m ) => m.add( 1 , 'month' ) ) }
                                getDayState  = { ( day ) => getDayState( day , month ) }
                                onPick       = { handlePick }
                                onHover      = { handleHover }
                                onLeave      = { () => setHovered( null ) }
                                headerInteractive = { true }
                                onMonthClick = { () => openMonths( i ) }
                                onYearClick  = { () => openYears( i ) }
                            />
                        ) ;
                    } ) }
                </div>
            </div>
        </div>
    ) ;
} ;

Calendar.displayName = 'Calendar' ;

export default Calendar ;
