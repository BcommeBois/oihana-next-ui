'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import useValue from '../../hooks/useValue' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import createDisabledModel from '../../helpers/date/createDisabledModel' ;
import { toMaxDay , toMinDay } from '../../helpers/date/periodBounds' ;

import YearsGrid from './calendar/YearsGrid' ;

/** How many years a page holds — the 4×3 shape the calendar's quick picker has. */
const PAGE = 12 ;

/**
 * YearPicker — a year, and nothing else.
 *
 * The 12-year grid the {@link module:components/dates/Calendar} uses to navigate,
 * turned into a control that **owns a value** : clicking a year selects it and
 * fires `onChange` with the year as a plain number, rather than jumping the
 * calendar to it. Paged ±12 by the double-chevron header.
 *
 * A plain block : drop it in a page, a card or a `Popover` — it has no opinion
 * about where it lives.
 *
 * @module components/dates/YearPicker
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel='Year picker'] - Accessible name of the grid.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {boolean} [props.clearable=false] - Re-clicking the selected year clears the selection; `Escape` also clears.
 * @param {2|3|4|6} [props.columns=4] - Years per row.
 * @param {number} [props.defaultValue] - Initial year (uncontrolled).
 * @param {number} [props.defaultYear] - Page shown on first render when there is no value. Defaults to the current year.
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [props.disabledYears] - Blocked years : a year, a `{from,to}` range, an array of those, or a predicate.
 * @param {Date|number} [props.max] - Latest selectable year (a `Date`, or a year — inclusive).
 * @param {Date|number} [props.min] - Earliest selectable year (same).
 * @param {(value: number|null) => void} [props.onChange] - Selection handler.
 * @param {number|null} [props.value] - Controlled year.
 *
 * @example
 * ```jsx
 * const [ year , setYear ] = useState( 2026 ) ;
 * <YearPicker value={ year } onChange={ setYear } min={ 2020 } max={ 2035 } />
 *
 * // Clearable, and only the leap years selectable
 * <YearPicker clearable disabledYears={ ( y ) => y % 4 !== 0 } />
 * ```
 */
const YearPicker =
({
    ariaLabel = 'Year picker' ,
    className ,
    clearable = false ,
    columns = 4 ,
    defaultValue ,
    defaultYear ,
    disabledYears ,
    max ,
    min ,
    onChange : onChangeFromProps ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const selected = value ?? null ;

    // The page is anchored so the year of interest sits in the middle row, as the
    // calendar's own year grid does.
    const [ pageStart , setPageStart ] = useState( () => ( selected ?? defaultYear ?? new Date().getFullYear() ) - 4 ) ;

    // Follow the value when it moves out of the visible page — a controlled parent
    // setting a far-away year should not leave the grid where it was. A value still
    // on the page never moves it, so paging around stays where the reader put it.
    useEffect( () =>
    {
        if ( selected === null )
        {
            return ;
        }
        setPageStart( ( start ) => ( selected >= start && selected < start + PAGE ? start : selected - 4 ) ) ;
    }
    , [ selected ] ) ;

    const minDay = useMemo( () => toMinDay( min ) , [ min ] ) ;
    const maxDay = useMemo( () => toMaxDay( max ) , [ max ] ) ;

    const { getYearReason } = useMemo
    (
        () => createDisabledModel({ disabledYears , minDay , maxDay }) ,
        [ disabledYears , minDay , maxDay ]
    ) ;

    const minYear = minDay ? minDay.year() : null ;
    const maxYear = maxDay ? maxDay.year() : null ;

    // A page is out when even its nearest year falls short of the bound.
    const prevDisabled = minYear !== null && pageStart - 1 < minYear ;
    const nextDisabled = maxYear !== null && pageStart + PAGE > maxYear ;

    const handlePick = ( year ) =>
    {
        if ( getYearReason( year ) !== null )
        {
            return ;
        }
        setValue( clearable && year === selected ? null : year ) ;
    } ;

    // Escape clears. Stopped here so it does not also close a surrounding Popover
    // while there is still something to clear — a second Escape will.
    const handleKeyDown = ( event ) =>
    {
        if ( clearable && selected !== null && event.key === 'Escape' )
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
            <YearsGrid
                pageStart     = { pageStart }
                currentYear   = { selected }
                columns       = { columns }
                getYearReason = { getYearReason }
                prevDisabled  = { prevDisabled }
                nextDisabled  = { nextDisabled }
                onPick        = { handlePick }
                onPrevPage    = { () => setPageStart( ( start ) => start - PAGE ) }
                onNextPage    = { () => setPageStart( ( start ) => start + PAGE ) }
            />
        </div>
    ) ;
} ;

YearPicker.displayName = 'YearPicker' ;

export default YearPicker ;
