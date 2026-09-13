'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useValue from '../../hooks/useValue' ;
import useDisabledModel from '../../hooks/useDisabledModel' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import dayjs from '../../helpers/date/configureDayjs' ;
import formatDateForMode from '../../helpers/date/formatDateForMode' ;
import { toMaxDay , toMinDay } from '../../helpers/date/periodBounds' ;
import { MM_YYYY } from '../../helpers/date/dateModes' ;

import InputDate from './InputDate' ;
import MonthYearPicker from '../dates/MonthYearPicker' ;
import Popover from '../Popover' ;

import { MdCalendarMonth as MonthIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputMonthYearPicker — the masked {@link InputDate} in one of its month modes,
 * paired with a {@link module:components/dates/MonthYearPicker} in a responsive
 * popover.

 * The segments may be ordered either way — `mm/yyyy`, or `yyyy/mm` with
 * `separator="-"` for the ISO 8601 year-month the back end speaks. Nothing here
 * reads the order : the value is normalised with `startOf('month')` whichever
 * side it came from.
 *
 * The twin of {@link InputDatePicker} one granularity up : the same props, the same
 * handlers, no days. The text field and the grid share one value — typing moves the
 * grid, picking a month fills the field and closes the popover — and a clear `×`
 * appears in the field when there is a value.
 *
 * **The value is a `Date` on the first day of the month**, midnight local, whichever
 * side it came from : the mask has no day segment to parse, so the month is what was
 * picked and the day is only what a `Date` insists on having.
 *
 * The popover is a **dropdown** anchored under the field on `md`+ screens and a
 * **modal** (bottom-sheet) on mobile — force either with `display`.
 *
 * `disabledDates` and `disabledWeekdays` are deliberately not accepted : a day does
 * not exist at this granularity, and a rule that can never block anything is worse
 * than a missing one.
 *
 * @module components/inputs/InputMonthYearPicker
 *
 * @param {Object} props
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.clearLabel='Clear month'] - Clear button aria-label (localizable).
 * @param {string} [props.defaultValue=''] - Initial formatted value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {string} [props.disabledLabel='This month is not available'] - Error shown by `strict` when the typed month is blocked (localizable).
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [props.disabledMonths] - Blocked months, forwarded to the picker.
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [props.disabledYears] - Blocked years, forwarded to the picker.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {string} [props.error] - Error message shown under the field.
 * @param {Date|number} [props.max] - Latest selectable month (a `Date`, or a year — inclusive).
 * @param {Date|number} [props.min] - Earliest selectable month (same).
 * @param {'mm/yyyy'|'mm/yy'|'yyyy/mm'} [props.mode='mm/yyyy'] - Mask mode. `mm/yy` reads a two-digit year as the 2000s ; `yyyy/mm` with `separator="-"` is the ISO 8601 year-month, `2026-09`.
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(date: Date|null) => void} [props.onDate] - Parsed-month handler (first day of the month).
 * @param {(date: Date) => void} [props.onDisabledDate] - Called instead of `onDate` when `strict` refuses a typed month.
 * @param {Object} [props.pickerProps] - Extra props forwarded to the `MonthYearPicker` (`columns`, `labelFormat`…).
 *        `onChange` is applied after this spread and cannot be replaced.
 * @param {string} [props.separator='/'] - Segment separator.
 * @param {boolean} [props.showIcon=false] - Show the left icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {boolean} [props.strict=false] - Refuse, rather than emit, a typed month the grid would not let you click : `onDate` stays silent, the text stays in the field and the field goes into error.
 * @param {string} [props.triggerLabel='Open month picker'] - Trigger button aria-label (localizable).
 * @param {string} [props.value] - Controlled formatted value.
 * @param {Object} props.rest - Other props forwarded to InputDate (label, helper…).
 *
 * @example
 * ```jsx
 * const [ period , setPeriod ] = useState('') ;
 * <InputMonthYearPicker label="Billing period" value={ period } onChange={ setPeriod } max={ new Date() } />
 *
 * // ISO 8601 year-month : the field reads 2026-09
 * <InputMonthYearPicker mode={ YYYY_MM } separator="-" onDate={ setPeriod } />
 *
 * // Bounded by years, and no month of the second half
 * <InputMonthYearPicker min={ 2020 } max={ 2030 } disabledMonths={ [ 6 , 7 , 8 , 9 , 10 , 11 ] } strict />
 * ```
 */
const InputMonthYearPicker =
({
    clearable = true ,
    clearLabel ,
    defaultValue = '' ,
    disabled = false ,
    disabledLabel ,
    disabledMonths ,
    disabledYears ,
    display = 'responsive' ,
    error ,
    max ,
    min ,
    mode = MM_YYYY ,
    onChange : onChangeFromProps ,
    onDate ,
    onDisabledDate ,
    path = 'components.picker.monthYear' ,
    pickerProps ,
    separator = '/' ,
    showIcon = false ,
    size ,
    strict = false ,
    triggerLabel ,
    value : valueFromProps ,
    ...rest
}) =>
{
    // Only the labels naming *what* is picked are resolved here ; this picker has no footer of its own.
    const {
        clear    : clearFromI18n    = 'Clear month' ,
        disabled : disabledFromI18n = 'This month is not available' ,
        open     : openFromI18n     = 'Open month picker' ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const clearText    = clearLabel    ?? clearFromI18n ;
    const triggerText  = triggerLabel  ?? openFromI18n ;
    const disabledText = disabledLabel ?? disabledFromI18n ;

    // One normalisation for the three consumers — the mask, the rules and the grid.
    // A bound given as a year covers the whole year, which is what `periodBounds` says.
    const minDate = toMinDay( min )?.toDate() ;
    const maxDate = toMaxDay( max )?.toDate() ;

    const [ strValue , setStrValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const [ monthValue , setMonthValue ] = useState( null ) ;
    const [ open , setOpen ] = useState( false ) ;

    // A month typed into the masked field never goes through the grid, so the rules
    // have to be asked here too — otherwise the keyboard accepts what the click
    // refuses. Off by default : `strict` is what turns the refusal on.
    const [ refused , setRefused ] = useState( false ) ;

    // 🚨 `getMonthReason`, never `isDayDisabled` : a month partly inside the bounds is
    // not blocked — its days are. Asking the day rules would refuse March because its
    // first day falls before a `min` set mid-month, which is not what was picked.
    const { getMonthReason } = useDisabledModel({ disabledMonths , disabledYears , min : minDate , max : maxDate }) ;

    // Viewport-aware positioning : the dropdown flips (top/bottom) and aligns
    // (start/center/end) based on where the field sits in the page. Smaller than the
    // calendar's — a month grid is twelve cells, not six weeks.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 280 ,
        panelHeight        : 280 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const toggleOpen = () =>
    {
        if ( !open )
        {
            recalculate() ;
        }
        setOpen( ( previous ) => !previous ) ;
    } ;

    // The mask has no day segment, so what comes back is already the 1st — but the
    // bounds are clamped during the parse, which can move it. Snapping to the start
    // of the month is what keeps the promise whichever side the value came from.
    const toMonth = ( date ) => dayjs( date ).startOf( 'month' ).toDate() ;

    const handleInputDate = ( date ) =>
    {
        if ( !date )
        {
            setRefused( false ) ;
            setMonthValue( null ) ;
            onDate?.( null ) ;
            return ;
        }

        const month = toMonth( date ) ;

        if ( strict && getMonthReason( month.getFullYear() , month.getMonth() ) !== null )
        {
            setRefused( true ) ;
            onDisabledDate?.( month ) ;
            return ;
        }

        setRefused( false ) ;
        setMonthValue( month ) ;
        onDate?.( month ) ;
    } ;

    // A month can only be picked from the grid when the grid allows it, so anything
    // coming through here clears a previous refusal.
    const handlePick = ( date ) =>
    {
        if ( !date )
        {
            return ;
        }

        const month = toMonth( date ) ;

        setRefused( false ) ;
        setStrValue( formatDateForMode( month , mode , separator ) ) ;
        setMonthValue( month ) ;
        onDate?.( month ) ;
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setRefused( false ) ;
        setStrValue( '' ) ;
        setMonthValue( null ) ;
        onDate?.( null ) ;
    } ;

    const clearButton = clearable && strValue
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = { clearText }
                disabled   = { disabled }
                className  = { cn( getButtonClassNames({ shape : SQUARE , size , style : GHOST }) , 'join-item' ) }
                onClick    = { handleClear }
            >
                <ClearIcon className="size-5" />
            </button>
        )
        : null ;

    const trigger = (
        <button
            key        = "trigger"
            type       = "button"
            aria-label = { triggerText }
            disabled   = { disabled }
            className  = { cn( getButtonClassNames({ shape : SQUARE , size }) , 'join-item' ) }
            onClick    = { toggleOpen }
        >
            <MonthIcon className="size-5" />
        </button>
    ) ;

    return (
        <div ref={ anchorRef }>
            <InputDate
                { ...rest }
                showIcon  = { showIcon }
                icon      = { <MonthIcon /> }
                mode      = { mode }
                separator = { separator }
                min       = { minDate }
                max       = { maxDate }
                size      = { size }
                disabled  = { disabled }
                value     = { strValue }
                onChange  = { setStrValue }
                onDate    = { handleInputDate }
                error     = { refused ? disabledText : error }
                actions   = { [ clearButton , trigger ] }
            />

            <Popover
                anchorRef = { anchorRef }
                isOpen    = { open }
                onClose   = { () => setOpen( false ) }
                display   = { display }
                direction = { direction }
                placement = { placement }
                ariaLabel = { triggerText }
            >
                <MonthYearPicker
                    value          = { monthValue }
                    min            = { minDate }
                    max            = { maxDate }
                    disabledMonths = { disabledMonths }
                    disabledYears  = { disabledYears }
                    { ...pickerProps }
                    onChange       = { handlePick }
                />
            </Popover>
        </div>
    ) ;
} ;

InputMonthYearPicker.displayName = 'InputMonthYearPicker' ;

export default InputMonthYearPicker ;
