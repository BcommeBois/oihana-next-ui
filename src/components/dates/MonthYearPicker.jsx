'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import useLang  from '../../contexts/lang/useLang' ;
import useValue from '../../hooks/useValue' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import dayjs from '../../helpers/date/configureDayjs' ;
import createDisabledModel from '../../helpers/date/createDisabledModel' ;
import { toMaxDay , toMinDay } from '../../helpers/date/periodBounds' ;

import MonthsGrid from './calendar/MonthsGrid' ;
import YearsGrid from './calendar/YearsGrid' ;

/** The two grids this picker chains, in the order the reader walks them. */
const MONTHS_VIEW = 'months' ;
const YEARS_VIEW  = 'years' ;

/** How many years a page holds — the 4×3 shape the calendar's quick picker has. */
const PAGE = 12 ;

/**
 * MonthYearPicker — a month of a given year, without the days.
 *
 * The quick navigation of {@link module:components/dates/Calendar} promoted to a
 * control of its own : the months grid with its ‹ year › header, and the year
 * itself opening the 12-year grid behind it. The same chain, one step shorter —
 * years → month, where the calendar goes years → month → day.
 *
 * The value is a `Date` **on the first day of the month**, midnight local : the
 * month is what was picked, and the day is only what a `Date` insists on having.
 *
 * Only the month commits. Picking a year moves the picker to that year and hands
 * it back to the months grid — an invoicing period is a month, and a year alone
 * would be an incomplete answer. Use {@link module:components/dates/YearPicker}
 * when the year *is* the answer.
 *
 * @module components/dates/MonthYearPicker
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel='Month and year picker'] - Accessible name of the panel.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {boolean} [props.clearable=false] - Re-clicking the selected month clears the selection; `Escape` also clears.
 * @param {2|3|4|6} [props.columns=4] - Cells per row, in both grids.
 * @param {Date} [props.defaultMonth] - Year shown on first render when there is no value. Defaults to the current one.
 * @param {Date|null} [props.defaultValue] - Initial value (uncontrolled).
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [props.disabledMonths] - Blocked months : `0`–`11` (every year), a `{year,month}` pair, an array of those, or a predicate.
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [props.disabledYears] - Blocked years : a year, a `{from,to}` range, an array of those, or a predicate.
 * @param {'MMM'|'MMMM'} [props.labelFormat='MMM'] - Abbreviated or full month names.
 * @param {Date|number} [props.max] - Latest selectable month (a `Date`, or a year — inclusive).
 * @param {Date|number} [props.min] - Earliest selectable month (same).
 * @param {(value: Date|null) => void} [props.onChange] - Selection handler.
 * @param {Date|null} [props.value] - Controlled value.
 *
 * @example
 * ```jsx
 * const [ period , setPeriod ] = useState( null ) ;
 * <MonthYearPicker value={ period } onChange={ setPeriod } min={ 2020 } max={ new Date() } />
 * // period → Wed Sep 01 2026 00:00:00
 * ```
 */
const MonthYearPicker =
({
    ariaLabel = 'Month and year picker' ,
    className ,
    clearable = false ,
    columns = 4 ,
    defaultMonth ,
    defaultValue ,
    disabledMonths ,
    disabledYears ,
    labelFormat = 'MMM' ,
    max ,
    min ,
    onChange : onChangeFromProps ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { lang } = useLang() ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const selected = value ?? null ;

    const selectedYear  = selected ? dayjs( selected ).year()  : null ;
    const selectedMonth = selected ? dayjs( selected ).month() : null ;

    // A primitive, so the effect below is not re-run by a `Date` rebuilt identical.
    const anchorTime = selected ? +new Date( selected ) : null ;

    const [ view          , setView          ] = useState( MONTHS_VIEW ) ;
    const [ viewYear      , setViewYear      ] = useState( () => dayjs( anchorTime ?? defaultMonth ?? undefined ).year() ) ;
    const [ yearPageStart , setYearPageStart ] = useState( () => dayjs( anchorTime ?? defaultMonth ?? undefined ).year() - 4 ) ;

    // Follow the value when it is set from outside : a controlled parent moving to
    // another year should not leave the grid on the previous one. Navigating
    // without picking changes no value, so the reader is never pulled back.
    useEffect( () =>
    {
        if ( anchorTime === null )
        {
            return ;
        }
        setViewYear( dayjs( anchorTime ).year() ) ;
    }
    , [ anchorTime ] ) ;

    const minDay = useMemo( () => toMinDay( min ) , [ min ] ) ;
    const maxDay = useMemo( () => toMaxDay( max ) , [ max ] ) ;

    const { getMonthReason , getYearReason } = useMemo
    (
        () => createDisabledModel({ disabledMonths , disabledYears , minDay , maxDay }) ,
        [ disabledMonths , disabledYears , minDay , maxDay ]
    ) ;

    const minYear = minDay ? minDay.year() : null ;
    const maxYear = maxDay ? maxDay.year() : null ;

    // Only the bounds ever stop navigation : a year blocked by `disabledYears`
    // stays reachable, otherwise the year behind it would not be — the same rule
    // the calendar follows.
    const prevYearDisabled = minYear !== null && viewYear - 1 < minYear ;
    const nextYearDisabled = maxYear !== null && viewYear + 1 > maxYear ;

    const prevPageDisabled = minYear !== null && yearPageStart - 1 < minYear ;
    const nextPageDisabled = maxYear !== null && yearPageStart + PAGE > maxYear ;

    const openYears = () =>
    {
        setYearPageStart( viewYear - 4 ) ;
        setView( YEARS_VIEW ) ;
    } ;

    // A year only carries the picker to its months — it is never an answer here.
    const pickYear = ( year ) =>
    {
        if ( getYearReason( year ) !== null )
        {
            return ;
        }
        setViewYear( year ) ;
        setView( MONTHS_VIEW ) ;
    } ;

    const pickMonth = ( month ) =>
    {
        if ( getMonthReason( viewYear , month ) !== null )
        {
            return ;
        }

        if ( clearable && viewYear === selectedYear && month === selectedMonth )
        {
            setValue( null ) ;
            return ;
        }

        setValue( new Date( viewYear , month , 1 ) ) ;
    } ;

    // Escape clears. Stopped here so it does not also close a surrounding Popover
    // while there is still something to clear — a second Escape will.
    const handleKeyDown = ( event ) =>
    {
        if ( clearable && selected && event.key === 'Escape' )
        {
            event.preventDefault() ;
            event.stopPropagation() ;
            setValue( null ) ;
        }
    } ;

    return (
        // biome-ignore lint/a11y/useSemanticElements: a `<fieldset>` is a form control with its own layout ; this is a named group of buttons, and it is not always inside a form
        <div
            className  = { getCalendarClasses({ className }) }
            role       = "group"
            aria-label = { ariaLabel }
            onKeyDown  = { handleKeyDown }
            { ...rest }
        >
            { view === YEARS_VIEW
                ? (
                    <YearsGrid
                        pageStart     = { yearPageStart }
                        currentYear   = { selectedYear }
                        columns       = { columns }
                        getYearReason = { getYearReason }
                        prevDisabled  = { prevPageDisabled }
                        nextDisabled  = { nextPageDisabled }
                        onPick        = { pickYear }
                        onPrevPage    = { () => setYearPageStart( ( start ) => start - PAGE ) }
                        onNextPage    = { () => setYearPageStart( ( start ) => start + PAGE ) }
                    />
                )
                : (
                    <MonthsGrid
                        year           = { viewYear }
                        currentMonth   = { selectedMonth ?? -1 }
                        currentYear    = { selectedYear ?? -1 }
                        lang           = { lang }
                        columns        = { columns }
                        labelFormat    = { labelFormat }
                        getMonthReason = { getMonthReason }
                        prevDisabled   = { prevYearDisabled }
                        nextDisabled   = { nextYearDisabled }
                        onPick         = { pickMonth }
                        onPrevYear     = { () => setViewYear( ( y ) => y - 1 ) }
                        onNextYear     = { () => setViewYear( ( y ) => y + 1 ) }
                        onYearClick    = { openYears }
                    />
                )
            }
        </div>
    ) ;
} ;

MonthYearPicker.displayName = 'MonthYearPicker' ;

export default MonthYearPicker ;
