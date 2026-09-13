'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useValue from '../../hooks/useValue' ;
import useDisabledModel from '../../hooks/useDisabledModel' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import formatDateForMode from '../../helpers/date/formatDateForMode' ;
import { toMaxDay , toMinDay } from '../../helpers/date/periodBounds' ;
import { YYYY } from '../../helpers/date/dateModes' ;

import InputDate from './InputDate' ;
import YearPicker from '../dates/YearPicker' ;
import Popover from '../Popover' ;

import { MdDateRange as YearIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputYearPicker — a four-digit masked field paired with a
 * {@link module:components/dates/YearPicker} in a responsive popover.
 *
 * The third of the field pickers, one granularity above
 * {@link InputMonthYearPicker} : the same montage — typing moves the grid, picking
 * a year fills the field and closes the popover, a clear `×` appears when there is
 * a value — with `InputDate` in its `yyyy` mode, a mask of four digits and nothing
 * to separate.
 *
 * **It speaks the language of the grid it wraps** : `onYear` hands back a plain
 * `number`, as {@link module:components/dates/YearPicker} does. `onDate` is
 * offered beside it, on the 1st of January, for symmetry with the rest of the
 * family — a year is more often an integer than a point in time.
 *
 * Only `disabledYears` is accepted. Neither a day nor a month exists at this
 * granularity, and a rule that can never block anything is worse than a missing one.
 *
 * @module components/inputs/InputYearPicker
 *
 * @param {Object} props
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.clearLabel='Clear year'] - Clear button aria-label (localizable).
 * @param {string} [props.defaultValue=''] - Initial field value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {string} [props.disabledLabel='This year is not available'] - Error shown by `strict` when the typed year is blocked (localizable).
 * @param {number|{from?:number,to?:number}|Array|((year:number)=>boolean)} [props.disabledYears] - Blocked years, forwarded to the grid.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {string} [props.error] - Error message shown under the field.
 * @param {Date|number} [props.max] - Latest selectable year (a `Date`, or a year — inclusive).
 * @param {Date|number} [props.min] - Earliest selectable year (same).
 * @param {(value: string) => void} [props.onChange] - Change handler (the field's text, which may be partial while typing).
 * @param {(date: Date|null) => void} [props.onDate] - Parsed-year handler as a `Date` on the 1st of January.
 * @param {(year: number) => void} [props.onDisabledYear] - Called instead of `onYear` when `strict` refuses a typed year.
 * @param {(year: number|null) => void} [props.onYear] - Parsed-year handler. The one to reach for.
 * @param {Object} [props.pickerProps] - Extra props forwarded to the `YearPicker` (`columns`…).
 *        `onChange` is applied after this spread and cannot be replaced.
 * @param {boolean} [props.showIcon=false] - Show the left icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {boolean} [props.strict=false] - Refuse, rather than emit, a typed year the grid would not let you click : `onYear` stays silent, the text stays in the field and the field goes into error.
 * @param {string} [props.triggerLabel='Open year picker'] - Trigger button aria-label (localizable).
 * @param {string} [props.value] - Controlled field value.
 * @param {Object} props.rest - Other props forwarded to InputDate (label, helper…).
 *
 * @example
 * ```jsx
 * const [ text , setText ] = useState('') ;
 * const [ year , setYear ] = useState( null ) ;
 * <InputYearPicker label="Vintage" value={ text } onChange={ setText } onYear={ setYear } min={ 1950 } max={ 2030 } />
 * // year → 2026
 * ```
 */
const InputYearPicker =
({
    clearable = true ,
    clearLabel ,
    defaultValue = '' ,
    disabled = false ,
    disabledLabel ,
    disabledYears ,
    display = 'responsive' ,
    error ,
    max ,
    min ,
    onChange : onChangeFromProps ,
    onDate ,
    onDisabledYear ,
    onYear ,
    path = 'components.picker.year' ,
    pickerProps ,
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
        clear    : clearFromI18n    = 'Clear year' ,
        disabled : disabledFromI18n = 'This year is not available' ,
        open     : openFromI18n     = 'Open year picker' ,
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
    const [ yearValue , setYearValue ] = useState( null ) ;
    const [ open , setOpen ] = useState( false ) ;

    // A year typed into the masked field never goes through the grid, so the rules
    // have to be asked here too — otherwise the keyboard accepts what the click
    // refuses. Off by default : `strict` is what turns the refusal on.
    const [ refused , setRefused ] = useState( false ) ;

    const { getYearReason } = useDisabledModel({ disabledYears , min : minDate , max : maxDate }) ;

    // Viewport-aware positioning : the dropdown flips (top/bottom) and aligns
    // (start/center/end) based on where the field sits in the page.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 280 ,
        panelHeight        : 260 ,
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

    // Both handlers end here, so the two callbacks can never tell different stories.
    const emit = ( year ) =>
    {
        setYearValue( year ) ;
        onYear?.( year ) ;
        onDate?.( year === null ? null : new Date( year , 0 , 1 ) ) ;
    } ;

    const handleInputDate = ( date ) =>
    {
        if ( !date )
        {
            setRefused( false ) ;
            emit( null ) ;
            return ;
        }

        const year = date.getFullYear() ;

        if ( strict && getYearReason( year ) !== null )
        {
            setRefused( true ) ;
            onDisabledYear?.( year ) ;
            return ;
        }

        setRefused( false ) ;
        emit( year ) ;
    } ;

    // A year can only be picked from the grid when the grid allows it, so anything
    // coming through here clears a previous refusal.
    const handlePick = ( year ) =>
    {
        if ( year === null || year === undefined )
        {
            return ;
        }

        setRefused( false ) ;
        setStrValue( formatDateForMode( new Date( year , 0 , 1 ) , YYYY ) ) ;
        emit( year ) ;
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setRefused( false ) ;
        setStrValue( '' ) ;
        emit( null ) ;
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
            <YearIcon className="size-5" />
        </button>
    ) ;

    return (
        <div ref={ anchorRef }>
            <InputDate
                { ...rest }
                showIcon  = { showIcon }
                icon      = { <YearIcon /> }
                mode      = { YYYY }
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
                <YearPicker
                    value         = { yearValue }
                    min           = { minDate }
                    max           = { maxDate }
                    disabledYears = { disabledYears }
                    { ...pickerProps }
                    onChange      = { handlePick }
                />
            </Popover>
        </div>
    ) ;
} ;

InputYearPicker.displayName = 'InputYearPicker' ;

export default InputYearPicker ;
