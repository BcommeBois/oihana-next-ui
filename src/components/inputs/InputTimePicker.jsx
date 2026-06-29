'use client' ;

import { useRef , useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;
import useValue from '../../hooks/useValue' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import InputTime from './InputTime' ;
import TimeColumns from '../times/TimeColumns' ;
import Popover from '../Popover' ;

import { MdAccessTime as ClockIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputTimePicker — the masked {@link module:components/inputs/InputTime} paired with
 * the visual {@link module:components/times/TimeColumns} in a responsive popover. The
 * time mirror of {@link module:components/inputs/InputDatePicker}.
 *
 * The field and the columns share one value (typing updates the columns; picking
 * updates the field). Unlike the date picker the popover does **not** close on each
 * pick (time needs several taps) — it closes on outside-click / `Escape`, or via the
 * optional Apply / Cancel **footer** (deferred commit, like `InputDateRangePicker`).
 *
 * @module components/inputs/InputTimePicker
 *
 * @param {Object} props
 * @param {boolean} [props.ampm=false] - 12-hour field + an AM/PM column.
 * @param {string} [props.applyLabel='Apply'] - Footer Apply button label.
 * @param {string} [props.cancelLabel='Cancel'] - Footer Cancel button label.
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.defaultMeridiem] - Initial meridiem (uncontrolled, AM/PM).
 * @param {string} [props.defaultValue=''] - Initial time string (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {'never'|'always'|'mobile'|'desktop'|boolean} [props.footer='never'] - Apply / Cancel footer (deferred commit).
 * @param {Date|string} [props.max] - Latest selectable time (24-hour, picker bound).
 * @param {string} [props.meridiem] - Controlled meridiem (AM/PM).
 * @param {Date|string} [props.min] - Earliest selectable time (24-hour, picker bound).
 * @param {number} [props.minuteStep=1] - Minutes increment in the picker.
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(meridiem: string) => void} [props.onChangeMeridiem] - Meridiem change handler.
 * @param {(time: import('../../helpers/time/Time').default|null) => void} [props.onTime] - Time-object handler.
 * @param {number} [props.secondStep=1] - Seconds increment in the picker.
 * @param {boolean} [props.showIcon=false] - Show the left clock icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {boolean} [props.useMinutes=true] - Include minutes in the field format.
 * @param {boolean} [props.useSeconds=false] - Add a seconds column / field segment.
 * @param {string} [props.value] - Controlled time string.
 * @param {Object} props.rest - Other props forwarded to InputTime (label, error, helper…).
 *
 * @example
 * ```jsx
 * const [ time , setTime ] = useState('') ;
 * <InputTimePicker label="Time" value={ time } onChange={ setTime } minuteStep={ 5 } />
 * ```
 */
const InputTimePicker =
({
    ampm = false ,
    applyLabel = 'Apply' ,
    cancelLabel = 'Cancel' ,
    clearable = true ,
    defaultMeridiem ,
    defaultValue = '' ,
    disabled = false ,
    display = 'responsive' ,
    footer = 'never' ,
    max ,
    meridiem : meridiemFromProps ,
    min ,
    minuteStep = 1 ,
    onChange : onChangeFromProps ,
    onChangeMeridiem : onChangeMeridiemFromProps ,
    onTime ,
    secondStep = 1 ,
    showIcon = false ,
    size ,
    useMinutes = true ,
    useSeconds = false ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const [ meridiem , setMeridiem ] = useValue( defaultMeridiem , meridiemFromProps , onChangeMeridiemFromProps ) ;

    // Draft = the picker's working value (the columns). Without a footer it tracks the
    // committed value live; with one, it diverges until Apply.
    const [ draftValue , setDraftValue ] = useState( defaultValue ) ;
    const [ draftMeridiem , setDraftMeridiem ] = useState( defaultMeridiem ) ;

    const [ open , setOpen ] = useState( false ) ;

    // Footer (deferred commit) : whether it is active for the current viewport.
    const isMdUp     = useBreakpoint( 'md' ) ;
    const footerMode = footer === true ? 'always' : ( !footer ? 'never' : footer ) ;
    const footerActive = footerMode === 'always'
        || ( footerMode === 'mobile' && !isMdUp )
        || ( footerMode === 'desktop' && isMdUp ) ;

    // Snapshot of the committed value, taken when the popover opens, so Cancel /
    // dismiss can revert the draft.
    const committedRef = useRef({ value : defaultValue , meridiem : defaultMeridiem }) ;

    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 280 ,
        panelHeight        : 320 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const toggleOpen = () =>
    {
        if ( !open )
        {
            committedRef.current = { value , meridiem } ; // snapshot for Cancel / dismiss
            setDraftValue( value ) ;
            setDraftMeridiem( meridiem ) ;
            recalculate() ;
        }
        setOpen( ( previous ) => !previous ) ;
    } ;

    // Field typing : commit live and keep the columns in sync.
    const handleFieldChange = ( v ) =>
    {
        setValue( v ) ;
        setDraftValue( v ) ;
    } ;

    const handleFieldMeridiem = ( m ) =>
    {
        setMeridiem( m ) ;
        setDraftMeridiem( m ) ;
    } ;

    // Columns → draft ; commit live only when there is no footer (no auto-close).
    const handleColumnsChange = ( v ) =>
    {
        setDraftValue( v ) ;
        if ( !footerActive )
        {
            setValue( v ) ;
        }
    } ;

    const handleColumnsMeridiem = ( m ) =>
    {
        setDraftMeridiem( m ) ;
        if ( !footerActive )
        {
            setMeridiem( m ) ;
        }
    } ;

    const handleApply = () =>
    {
        setValue( draftValue ) ;
        setMeridiem( draftMeridiem ) ;
        setOpen( false ) ;
    } ;

    const revertDraft = () =>
    {
        setDraftValue( committedRef.current.value ) ;
        setDraftMeridiem( committedRef.current.meridiem ) ;
    } ;

    const handleCancel = () =>
    {
        revertDraft() ;
        setOpen( false ) ;
    } ;

    // Escape / outside click / backdrop : revert the draft when a footer is active.
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
        setDraftValue( '' ) ;
    } ;

    const clearButton = clearable && value
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = "Clear time"
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
            aria-label = "Open time picker"
            disabled   = { disabled }
            className  = { cn( getButtonClassNames({ shape : SQUARE , size }) , 'join-item' ) }
            onClick    = { toggleOpen }
        >
            <ClockIcon className="size-5" />
        </button>
    ) ;

    return (
        <div ref={ anchorRef }>
            <InputTime
                { ...rest }
                ampm             = { ampm }
                useMinutes       = { useMinutes }
                useSeconds       = { useSeconds }
                showIcon         = { showIcon }
                size             = { size }
                disabled         = { disabled }
                value            = { value }
                meridiem         = { ampm ? meridiem : undefined }
                onChange         = { handleFieldChange }
                onChangeMeridiem = { handleFieldMeridiem }
                onTime           = { onTime }
                actions          = { [ clearButton , trigger ] }
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
                <TimeColumns
                    ampm             = { ampm }
                    useSeconds       = { useSeconds }
                    minuteStep       = { minuteStep }
                    secondStep       = { secondStep }
                    min              = { min }
                    max              = { max }
                    disabled         = { disabled }
                    value            = { draftValue }
                    meridiem         = { ampm ? draftMeridiem : undefined }
                    onChange         = { handleColumnsChange }
                    onChangeMeridiem = { handleColumnsMeridiem }
                />
            </Popover>
        </div>
    ) ;
} ;

InputTimePicker.displayName = 'InputTimePicker' ;

export default InputTimePicker ;
