'use client' ;

import { useEffect , useMemo , useRef , useState } from 'react' ;

import { useMaskito } from '@maskito/react' ;
import { maskitoParseDate } from '@maskito/kit' ;

import cn from '../../themes/helpers/cn' ;
import useValue from '../../hooks/useValue' ;
import useMergeRefs from '../../hooks/useMergeRefs' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import formatDateForMode from '../../helpers/date/formatDateForMode' ;
import parseISO from '../../helpers/date/parseISO' ;
import { DD_MM_YYYY , YYYY_MM_DD } from '../../helpers/date/dateModes' ;
import Time from '../../helpers/time/Time' ;
import convertTo24Hour from '../../helpers/time/convertTo24Hour' ;
import { AM , PM } from '../../helpers/time/meridies' ;

import Input from './Input' ;
import SwapButton from '../buttons/SwapButton' ;
import Calendar from '../dates/Calendar' ;
import TimeColumns from '../times/TimeColumns' ;
import Popover from '../Popover' ;

import { MdEditCalendar as DateTimeIcon , MdClose as ClearIcon , MdAccessTime as TimeFieldIcon } from 'react-icons/md' ;

/** Joins the date / time parts into the field string (no meridiem). */
const joinField = ( datePart , timePart ) => [ datePart , timePart ].filter( Boolean ).join( ' ' ) ;

/** Per-date-segment config : max / min value + the first-digit constraint. */
const DATE_SEG = {
    d : { max : 31 , min : 1 , first : /[0-3]/ } ,
    m : { max : 12 , min : 1 , first : /[0-1]/ } ,
    y : { max : null , min : null , first : /\d/ } ,
} ;

/**
 * Builds the combined `date + ' ' + HH:MM[:SS]` maskito mask AND the ordered list of
 * `{ max, min }` per numeric segment, so a postprocessor can clamp out-of-range input
 * (month ≤ 12, day ≤ 31, hour ≤ 23 / 12, minute ≤ 59…). First digits are constrained
 * in the mask itself for immediate feedback.
 */
/** Number of days in a month (1–12). February uses the year for the leap check;
 *  when the year is unknown yet, the permissive 29 is used. */
const daysInMonth = ( month , year ) =>
{
    if ( month === 2 )
    {
        if ( year == null ) { return 29 ; }
        return ( ( year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0 ) ? 29 : 28 ;
    }
    return [ 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31 ][ month - 1 ] ?? 31 ;
} ;

const buildDateTimeMask = ( mode , separator , useSeconds , ampm ) =>
{
    const mask = [] ;
    const segs = [] ;

    mode.split( /[/.\-]/ ).forEach( ( token , index , tokens ) =>
    {
        const type = token[ 0 ].toLowerCase() ;
        const cfg  = DATE_SEG[ type ] ?? DATE_SEG.y ;
        token.split( '' ).forEach( ( _ , i ) => mask.push( i === 0 ? cfg.first : /\d/ ) ) ;
        segs.push({ type , max : cfg.max , min : cfg.min }) ;
        if ( index < tokens.length - 1 )
        {
            mask.push( separator ) ;
        }
    } ) ;

    mask.push( ' ' , ampm ? /[0-1]/ : /[0-2]/ , /\d/ ) ;
    segs.push({ type : 'H' , max : ampm ? 12 : 23 , min : ampm ? 1 : 0 }) ;

    mask.push( ':' , /[0-5]/ , /\d/ ) ;
    segs.push({ type : 'M' , max : 59 , min : 0 }) ;

    if ( useSeconds )
    {
        mask.push( ':' , /[0-5]/ , /\d/ ) ;
        segs.push({ type : 'S' , max : 59 , min : 0 }) ;
    }

    const dayIdx   = segs.findIndex( ( s ) => s.type === 'd' ) ;
    const monthIdx = segs.findIndex( ( s ) => s.type === 'm' ) ;
    const yearIdx  = segs.findIndex( ( s ) => s.type === 'y' ) ;

    const clamp = ({ value , selection }) =>
    {
        // 1) per-segment static clamp (range of each field).
        const groups = ( value.match( /\d+/g ) ?? [] ).map( ( group , i ) =>
        {
            const seg = segs[ i ] ;
            if ( !seg || seg.max == null || group.length < 2 )
            {
                return group ;
            }
            let n = parseInt( group , 10 ) ;
            if ( n > seg.max ) { n = seg.max ; }
            if ( seg.min != null && n < seg.min ) { n = seg.min ; }
            return String( n ).padStart( 2 , '0' ) ;
        } ) ;

        // 2) day-within-month clamp, once day + month are complete.
        if ( dayIdx >= 0 && monthIdx >= 0 && groups[ dayIdx ]?.length === 2 && groups[ monthIdx ]?.length === 2 )
        {
            const yearGroup = yearIdx >= 0 ? groups[ yearIdx ] : '' ;
            const year      = yearGroup?.length === 4 ? parseInt( yearGroup , 10 ) : undefined ;
            const dim       = daysInMonth( parseInt( groups[ monthIdx ] , 10 ) , year ) ;
            if ( parseInt( groups[ dayIdx ] , 10 ) > dim )
            {
                groups[ dayIdx ] = String( dim ).padStart( 2 , '0' ) ;
            }
        }

        // 3) rebuild, keeping every separator in place.
        let i = 0 ;
        const fixed = value.replace( /\d+/g , () => groups[ i++ ] ) ;
        return { value : fixed , selection } ;
    } ;

    return { mask , postprocessors : [ clamp ] } ;
} ;

/** Content-based split of the field string : a token with ':' is the time, else the date. */
const splitField = ( field ) =>
{
    const out = { datePart : '' , timePart : '' } ;
    ( field ?? '' ).trim().split( /\s+/ ).filter( Boolean ).forEach( ( token ) =>
    {
        if ( token.includes( ':' ) )
        {
            out.timePart = token ;
        }
        else
        {
            out.datePart = token ;
        }
    } ) ;
    return out ;
} ;

/**
 * InputDateTimePicker — a single masked `JJ/MM/AAAA HH:MM` field paired with a popover
 * hosting a {@link module:components/dates/Calendar} and a {@link module:components/times/TimeColumns}.
 * Combines the building blocks of `InputDatePicker` and `InputTimePicker`.
 *
 * The value is the combined formatted string (e.g. `"25/12/2026 14:30"`, or with a
 * trailing `AM` / `PM` when `ampm`), with the parsed `Date` available via `onDateTime`.
 * The popover does not close on each pick — it closes on outside-click / `Escape`, or
 * via the optional Apply / Cancel **`footer`** (deferred commit).
 *
 * @module components/inputs/InputDateTimePicker
 *
 * @param {Object} props
 * @param {boolean} [props.ampm=false] - 12-hour time with an AM/PM toggle + column.
 * @param {string} [props.applyLabel='Apply'] - Footer Apply button label.
 * @param {Object} [props.calendarProps] - Extra props forwarded to the `Calendar` (shortcuts, months…).
 * @param {string} [props.cancelLabel='Cancel'] - Footer Cancel button label.
 * @param {boolean} [props.clearable=true] - Show the clear button when there is a value.
 * @param {string} [props.defaultValue=''] - Initial combined value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {'never'|'always'|'mobile'|'desktop'|boolean} [props.footer='never'] - Apply / Cancel footer (deferred commit).
 * @param {Date} [props.max] - Latest selectable date (Calendar + date bound).
 * @param {Date} [props.min] - Earliest selectable date (Calendar + date bound).
 * @param {string} [props.mode='dd/mm/yyyy'] - Date format mode (see `dateModes`).
 * @param {number} [props.minuteStep=1] - Minutes increment in the picker.
 * @param {(value: string) => void} [props.onChange] - Change handler (combined string).
 * @param {(date: Date|null) => void} [props.onDateTime] - Parsed date-time handler.
 * @param {number} [props.secondStep=1] - Seconds increment in the picker.
 * @param {string} [props.separator='/'] - Date segment separator.
 * @param {boolean} [props.showIcon=true] - Show the left icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {boolean} [props.useSeconds=false] - Add a seconds segment / column.
 * @param {string} [props.value] - Controlled combined value.
 * @param {Object} props.rest - Other props forwarded to Input (label, error, helper…).
 *
 * @example
 * ```jsx
 * const [ dt , setDt ] = useState('') ;
 * <InputDateTimePicker label="Rendez-vous" value={ dt } onChange={ setDt } onDateTime={ console.log } />
 * ```
 */
const InputDateTimePicker =
({
    ampm = false ,
    applyLabel = 'Apply' ,
    calendarProps ,
    cancelLabel = 'Cancel' ,
    clearable = true ,
    defaultValue = '' ,
    disabled = false ,
    display = 'responsive' ,
    footer = 'never' ,
    max ,
    min ,
    mode = DD_MM_YYYY ,
    minuteStep = 1 ,
    onChange : onChangeFromProps ,
    onDateTime ,
    secondStep = 1 ,
    separator = '/' ,
    showIcon = true ,
    size ,
    useSeconds = false ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const isISOMode = mode === YYYY_MM_DD ;

    // ---- Parse the combined value : field digits (no meridiem) + meridiem + parts.
    const meridiem   = ( value?.match( /(AM|PM)\s*$/i )?.[ 1 ] || '' ).toUpperCase() || undefined ;
    const fieldValue = ( value ?? '' ).replace( /\s*(AM|PM)\s*$/i , '' ) ;
    const { datePart , timePart } = splitField( fieldValue ) ;

    const withMeridiem = ( field , mer ) => ( ampm && mer ) ? `${ field } ${ mer }` : field ;

    // ---- Combined mask (date pattern + ' ' + HH:MM[:SS]) with per-segment clamping.
    const maskOptions = useMemo(
        () => buildDateTimeMask( mode , separator , useSeconds , ampm ) ,
        [ mode , separator , useSeconds , ampm ]
    ) ;

    const maskedRef   = useMaskito({ options : maskOptions }) ;
    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( maskedRef , internalRef ) ;

    const placeholder = mode.toUpperCase().replace( /[/.\-]/g , separator )
        + ' HH:MM' + ( useSeconds ? ':SS' : '' ) ;

    // ---- Parsed Date (date part only) + emit the full Date-time on change.
    const dateObj = useMemo( () =>
    {
        if ( !datePart )
        {
            return null ;
        }
        try
        {
            const d = isISOMode ? parseISO( datePart , separator ) : maskitoParseDate( datePart , { mode , min , max } ) ;
            return d && !isNaN( d.getTime() ) ? d : null ;
        }
        catch ( error )
        {
            return null ;
        }
    }
    , [ datePart , mode , separator , isISOMode , min , max ] ) ;

    const buildDateTime = ( date , t , mer ) =>
    {
        if ( !date )
        {
            return null ;
        }
        const result = new Date( date ) ;
        if ( t )
        {
            const time = new Time( ampm && mer ? `${ t } ${ mer }` : t ) ;
            const hour = time.ampm ? convertTo24Hour( time.hour , time.meridiem ) : time.hour ;
            result.setHours( hour , time.minute , time.second , time.millisecond ) ;
        }
        else
        {
            result.setHours( 0 , 0 , 0 , 0 ) ;
        }
        return result ;
    } ;

    useEffect( () =>
    {
        onDateTime?.( buildDateTime( dateObj , timePart , meridiem ) ) ;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [ dateObj , timePart , meridiem ] ) ;

    // ---- Popover + draft (deferred when a footer is active).
    const [ open , setOpen ] = useState( false ) ;
    const [ draftDate , setDraftDate ] = useState( null ) ;
    const [ draftTime , setDraftTime ] = useState( '' ) ;
    const [ draftMeridiem , setDraftMeridiem ] = useState( undefined ) ;

    const isMdUp     = useBreakpoint( 'md' ) ;
    const footerMode = footer === true ? 'always' : ( !footer ? 'never' : footer ) ;
    const footerActive = footerMode === 'always'
        || ( footerMode === 'mobile' && !isMdUp )
        || ( footerMode === 'desktop' && isMdUp ) ;

    const committedRef = useRef({ date : null , time : '' , meridiem : undefined }) ;

    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 470 ,
        panelHeight        : 380 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const toggleOpen = () =>
    {
        if ( !open )
        {
            committedRef.current = { date : dateObj , time : timePart , meridiem } ;
            setDraftDate( dateObj ) ;
            setDraftTime( timePart ) ;
            setDraftMeridiem( meridiem ) ;
            recalculate() ;
        }
        setOpen( ( previous ) => !previous ) ;
    } ;

    // ---- Field typing / AM-PM toggle.
    const handleFieldChange = ( event ) =>
    {
        const fv = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( withMeridiem( fv , meridiem ) ) ;
    } ;

    const toggleMeridiem = () => setValue( withMeridiem( fieldValue , ( meridiem ?? AM ) === AM ? PM : AM ) ) ;

    // ---- Picker → draft ; commit live only when there is no footer.
    const handlePickDate = ( d ) =>
    {
        setDraftDate( d ) ;
        if ( !footerActive )
        {
            setValue( withMeridiem( joinField( d ? formatDateForMode( d , mode , separator ) : '' , timePart ) , meridiem ) ) ;
        }
    } ;

    const handlePickTime = ( t ) =>
    {
        setDraftTime( t ) ;
        if ( !footerActive )
        {
            setValue( withMeridiem( joinField( datePart , t ) , meridiem ) ) ;
        }
    } ;

    const handlePickMeridiem = ( m ) =>
    {
        setDraftMeridiem( m ) ;
        if ( !footerActive )
        {
            setValue( withMeridiem( joinField( datePart , timePart ) , m ) ) ;
        }
    } ;

    const handleApply = () =>
    {
        const dp = draftDate ? formatDateForMode( draftDate , mode , separator ) : datePart ;
        setValue( withMeridiem( joinField( dp , draftTime ) , draftMeridiem ) ) ;
        setOpen( false ) ;
    } ;

    const revertDraft = () =>
    {
        setDraftDate( committedRef.current.date ) ;
        setDraftTime( committedRef.current.time ) ;
        setDraftMeridiem( committedRef.current.meridiem ) ;
    } ;

    const handleCancel = () =>
    {
        revertDraft() ;
        setOpen( false ) ;
    } ;

    const handlePopoverClose = () =>
    {
        if ( footerActive )
        {
            revertDraft() ;
        }
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setValue( '' ) ;
        setDraftDate( null ) ;
        setDraftTime( '' ) ;
    } ;

    // ---- Actions : AM/PM toggle (12h) + clear + trigger.
    const meridiemButton = ampm
        ? (
            <SwapButton
                key       = "meridiem"
                className = "join-item"
                checked   = { ( meridiem ?? AM ) === AM }
                disabled  = { disabled }
                on        = { AM }
                off       = { PM }
                onChange  = { toggleMeridiem }
            />
        )
        : null ;

    const clearButton = clearable && fieldValue
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = "Clear date-time"
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
            aria-label = "Open date-time picker"
            disabled   = { disabled }
            className  = { cn( getButtonClassNames({ shape : SQUARE , size }) , 'join-item' ) }
            onClick    = { toggleOpen }
        >
            <DateTimeIcon className="size-5" />
        </button>
    ) ;

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            <TimeFieldIcon />
        </div>
    ) ;

    return (
        <div ref={ anchorRef }>
            <Input
                { ...rest }
                type         = "text"
                inputMode    = "numeric"
                autoComplete = "off"
                ref          = { mergedRef }
                size         = { size }
                disabled     = { disabled }
                icon         = { iconElement }
                value        = { fieldValue }
                onChange     = { handleFieldChange }
                placeholder  = { placeholder }
                actions      = { [ meridiemButton , clearButton , trigger ] }
            />

            <Popover
                anchorRef   = { anchorRef }
                isOpen      = { open }
                onClose     = { handlePopoverClose }
                display     = { display }
                direction   = { direction }
                placement   = { placement }
                showFooter  = { footerActive }
                onApply     = { handleApply }
                onCancel    = { handleCancel }
                applyLabel  = { applyLabel }
                cancelLabel = { cancelLabel }
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <Calendar
                        value    = { draftDate }
                        onChange = { handlePickDate }
                        min      = { min }
                        max      = { max }
                        { ...calendarProps }
                    />
                    <TimeColumns
                        ampm             = { ampm }
                        useSeconds       = { useSeconds }
                        minuteStep       = { minuteStep }
                        secondStep       = { secondStep }
                        disabled         = { disabled }
                        value            = { draftTime }
                        meridiem         = { ampm ? draftMeridiem : undefined }
                        onChange         = { handlePickTime }
                        onChangeMeridiem = { handlePickMeridiem }
                    />
                </div>
            </Popover>
        </div>
    ) ;
} ;

InputDateTimePicker.displayName = 'InputDateTimePicker' ;

export default InputDateTimePicker ;
