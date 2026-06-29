'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;
import useValue from '../../hooks/useValue' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import formatDateForMode from '../../helpers/date/formatDateForMode' ;
import { DD_MM_YYYY } from '../../helpers/date/dateModes' ;

import InputDate from './InputDate' ;
import Calendar from '../dates/Calendar' ;
import Popover from '../Popover' ;

import { MdCalendarToday as CalendarIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputDatePicker — the masked {@link module:components/inputs/InputDate} paired
 * with a visual {@link module:components/dates/Calendar} in a responsive popover.
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
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.defaultValue=''] - Initial formatted value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {Date} [props.max] - Latest selectable date.
 * @param {Date} [props.min] - Earliest selectable date.
 * @param {string} [props.mode='dd/mm/yyyy'] - Date format mode (see `dateModes`).
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(date: Date|null) => void} [props.onDate] - Parsed-date handler.
 * @param {string} [props.separator='/'] - Segment separator.
 * @param {boolean} [props.showIcon=false] - Show the left calendar icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
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
    defaultValue = '' ,
    disabled = false ,
    display = 'responsive' ,
    max ,
    min ,
    mode = DD_MM_YYYY ,
    onChange : onChangeFromProps ,
    onDate ,
    separator = '/' ,
    showIcon = false ,
    size ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ strValue , setStrValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const [ dateValue , setDateValue ] = useState( null ) ;
    const [ open , setOpen ] = useState( false ) ;

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
        setDateValue( date ) ;
        onDate?.( date ) ;
    } ;

    const handlePick = ( date ) =>
    {
        setStrValue( formatDateForMode( date , mode , separator ) ) ;
        setDateValue( date ) ;
        onDate?.( date ) ;
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setStrValue( '' ) ;
        setDateValue( null ) ;
        onDate?.( null ) ;
    } ;

    const clearButton = clearable && strValue
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = "Clear date"
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
            aria-label = "Open calendar"
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
                <Calendar value={ dateValue } onChange={ handlePick } min={ min } max={ max } { ...calendarProps } />
            </Popover>
        </div>
    ) ;
} ;

InputDatePicker.displayName = 'InputDatePicker' ;

export default InputDatePicker ;
