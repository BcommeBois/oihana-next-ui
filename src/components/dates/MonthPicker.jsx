'use client' ;

import { useMemo } from 'react' ;

import useLang  from '../../contexts/lang/useLang' ;
import useValue from '../../hooks/useValue' ;

import getCalendarClasses from '../../themes/components/calendar' ;

import createDisabledModel from '../../helpers/date/createDisabledModel' ;

import MonthsGrid from './calendar/MonthsGrid' ;

/**
 * MonthPicker — a month of the year, with no year attached.
 *
 * The grid of twelve localised months, headerless, selecting rather than
 * navigating. The value is the **month index**, `0` (January) to `11`
 * (December) — a recurring month, a birthday's month, a fiscal period. When the
 * year is part of what is being picked, reach for
 * {@link module:components/dates/MonthYearPicker} instead.
 *
 * Month names and their order follow the language ({@link module:contexts/lang/useLang}).
 * Full names need room : give them `columns={ 3 }` and `labelFormat="MMMM"`.
 *
 * @module components/dates/MonthPicker
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel='Month picker'] - Accessible name of the grid.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {boolean} [props.clearable=false] - Re-clicking the selected month clears the selection; `Escape` also clears.
 * @param {2|3|4|6} [props.columns=4] - Months per row.
 * @param {number} [props.defaultValue] - Initial month index (uncontrolled).
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [props.disabledMonths] - Blocked months : `0`–`11`, a `{year,month}` pair, an array of those, or a predicate.
 * @param {'MMM'|'MMMM'} [props.labelFormat='MMM'] - Abbreviated or full month names.
 * @param {(value: number|null) => void} [props.onChange] - Selection handler (month index).
 * @param {number} [props.referenceYear] - The year `disabledMonths` is evaluated against. Only matters when a rule names a year; defaults to the current one.
 * @param {number|null} [props.value] - Controlled month index (0–11).
 *
 * @example
 * ```jsx
 * const [ month , setMonth ] = useState( 8 ) ; // September
 * <MonthPicker value={ month } onChange={ setMonth } />
 *
 * // Full names, three per row, and no summer
 * <MonthPicker columns={ 3 } labelFormat="MMMM" disabledMonths={ [ 6 , 7 ] } />
 * ```
 */
const MonthPicker =
({
    ariaLabel = 'Month picker' ,
    className ,
    clearable = false ,
    columns = 4 ,
    defaultValue ,
    disabledMonths ,
    labelFormat = 'MMM' ,
    onChange : onChangeFromProps ,
    referenceYear ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { lang } = useLang() ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const selected = value ?? null ;

    // No year is being picked, so none can bound anything : `min` / `max` are
    // meaningless here and only `disabledMonths` is asked.
    const year = referenceYear ?? new Date().getFullYear() ;

    const { getMonthReason } = useMemo
    (
        () => createDisabledModel({ disabledMonths }) ,
        [ disabledMonths ]
    ) ;

    const handlePick = ( month ) =>
    {
        if ( getMonthReason( year , month ) !== null )
        {
            return ;
        }
        setValue( clearable && month === selected ? null : month ) ;
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
            <MonthsGrid
                year           = { year }
                currentMonth   = { selected ?? -1 }
                currentYear    = { year }
                lang           = { lang }
                columns        = { columns }
                labelFormat    = { labelFormat }
                getMonthReason = { getMonthReason }
                showHeader     = { false }
                onPick         = { handlePick }
            />
        </div>
    ) ;
} ;

MonthPicker.displayName = 'MonthPicker' ;

export default MonthPicker ;
