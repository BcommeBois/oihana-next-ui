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
import { DD_MM_YYYY } from '../../helpers/date/dateModes' ;

import InputDate from './InputDate' ;
import Calendar from '../dates/Calendar' ;
import Popover from '../Popover' ;

import { MdCalendarToday as CalendarIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputDatePicker — the masked {@link InputDate} paired with a visual {@link Calendar} in a responsive popover.
 *
 * The text field and the calendar share one value : typing updates the calendar,
 * picking a day fills the field and closes the popover. A clear `×` button appears
 * in the field when there is a value.
 *
 * The popover is a **dropdown** anchored under the field on `md`+ screens and a
 * **modal** (bottom-sheet) on mobile — force either with `display`.
 *
 * @module components/inputs/InputDatePicker
 *
 * @param {Object} props
 * @param {Object} [props.calendarProps] - Extra props forwarded to the `Calendar` (shortcuts…).
 *        `onChange` is applied after this spread and cannot be replaced.
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.clearLabel='Clear date'] - Clear button aria-label (localizable).
 * @param {string} [props.defaultValue=''] - Initial formatted value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {Date|{from?:Date,to?:Date}|Array|((date:Date)=>boolean)} [props.disabledDates] - Blackout days, forwarded to the `Calendar`.
 * @param {string} [props.disabledLabel='This date is not available'] - Error shown by `strict` when the typed date is blocked (localizable).
 * @param {number|{year?:number,month:number}|Array|((year:number,month:number)=>boolean)} [props.disabledMonths] - Blocked months, forwarded to the `Calendar`.
 * @param {number|string|Array<number|string>} [props.disabledWeekdays] - Blocked weekdays, forwarded to the `Calendar`.
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [props.disabledYears] - Blocked years, forwarded to the `Calendar`.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {string} [props.error] - Error message shown under the field.
 * @param {Date} [props.max] - Latest selectable date.
 * @param {Date} [props.min] - Earliest selectable date.
 * @param {string} [props.mode='dd/mm/yyyy'] - Date format mode (see `dateModes`).
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(date: Date|null) => void} [props.onDate] - Parsed-date handler.
 * @param {(date: Date) => void} [props.onDisabledDate] - Called instead of `onDate` when `strict` refuses a typed date.
 * @param {string} [props.separator='/'] - Segment separator.
 * @param {boolean} [props.strict=false] - Refuse, rather than emit, a typed date the calendar would not let you click : `onDate` stays silent, the text stays in the field and the field goes into error.
 * @param {boolean} [props.showIcon=false] - Show the left calendar icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {string} [props.triggerLabel='Open calendar'] - Trigger button aria-label (localizable).
 * @param {string} [props.value] - Controlled formatted value.
 * @param {Object} props.rest - Other props forwarded to InputDate (label, error, helper…).
 *
 * @example
 * ```jsx
 * const [ date , setDate ] = useState('') ;
 * <InputDatePicker label="Date" value={ date } onChange={ setDate } min={ new Date() } />
 * ```
 */
const InputDatePicker =
({
    calendarProps ,
    clearable = true ,
    clearLabel ,
    defaultValue = '' ,
    disabled = false ,
    disabledDates ,
    disabledLabel ,
    disabledMonths ,
    disabledWeekdays ,
    disabledYears ,
    display = 'responsive' ,
    error ,
    max ,
    min ,
    mode = DD_MM_YYYY ,
    onChange : onChangeFromProps ,
    onDate ,
    onDisabledDate ,
    separator = '/' ,
    strict = false ,
    path = 'components.picker.date' ,
    showIcon = false ,
    size ,
    triggerLabel ,
    value : valueFromProps ,
    ...rest
}) =>
{
    // Only the labels naming *what* is picked are resolved here ; this picker has no footer of its own.
    const {
        clear    : clearFromI18n    = 'Clear date' ,
        disabled : disabledFromI18n = 'This date is not available' ,
        open     : openFromI18n     = 'Open calendar' ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const clearText    = clearLabel    ?? clearFromI18n ;
    const triggerText  = triggerLabel  ?? openFromI18n ;
    const disabledText = disabledLabel ?? disabledFromI18n ;

    const [ strValue , setStrValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const [ dateValue , setDateValue ] = useState( null ) ;
    const [ open , setOpen ] = useState( false ) ;

    // A date typed into the masked field never goes through the grid, so the rules
    // have to be asked here too — otherwise the keyboard accepts what the click
    // refuses. Off by default : `strict` is what turns the refusal on.
    const [ refused , setRefused ] = useState( false ) ;

    const { isDayDisabled } = useDisabledModel({ disabledDates , disabledMonths , disabledWeekdays , disabledYears , min , max }) ;

    // Viewport-aware positioning : the dropdown flips (top/bottom) and aligns
    // (start/center/end) based on where the field sits in the page.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 340 ,
        panelHeight        : 380 ,
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

    const handleInputDate = ( date ) =>
    {
        if ( strict && date && isDayDisabled( dayjs( date ) ) )
        {
            setRefused( true ) ;
            onDisabledDate?.( date ) ;
            return ;
        }

        setRefused( false ) ;
        setDateValue( date ) ;
        onDate?.( date ) ;
    } ;

    // A day can only be picked from the grid when the grid allows it, so anything
    // coming through here clears a previous refusal.
    const handlePick = ( date ) =>
    {
        setRefused( false ) ;
        setStrValue( formatDateForMode( date , mode , separator ) ) ;
        setDateValue( date ) ;
        onDate?.( date ) ;
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setRefused( false ) ;
        setStrValue( '' ) ;
        setDateValue( null ) ;
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
            <CalendarIcon className="size-5" />
        </button>
    ) ;

    return (
        <div ref={ anchorRef }>
            <InputDate
                { ...rest }
                showIcon  = { showIcon }
                mode      = { mode }
                separator = { separator }
                min       = { min }
                max       = { max }
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
            >
                <Calendar
                    value            = { dateValue }
                    min              = { min }
                    max              = { max }
                    disabledDates    = { disabledDates }
                    disabledMonths   = { disabledMonths }
                    disabledWeekdays = { disabledWeekdays }
                    disabledYears    = { disabledYears }
                    { ...calendarProps }
                    onChange         = { handlePick }
                />
            </Popover>
        </div>
    ) ;
} ;

InputDatePicker.displayName = 'InputDatePicker' ;

export default InputDatePicker ;
