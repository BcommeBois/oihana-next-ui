'use client' ;

import { useRef , useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;
import useValue from '../../hooks/useValue' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;
import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import formatDateForMode from '../../helpers/date/formatDateForMode' ;
import { DD_MM_YYYY } from '../../helpers/date/dateModes' ;

import InputDateRange from './InputDateRange' ;
import Calendar from '../dates/Calendar' ;
import CalendarPopover from '../dates/CalendarPopover' ;

import { MdCalendarToday as CalendarIcon , MdClose as ClearIcon } from 'react-icons/md' ;

const EMPTY_RANGE = { from : null , to : null } ;

/**
 * InputDateRangePicker — the masked {@link module:components/inputs/InputDateRange}
 * paired with a visual {@link module:components/dates/Calendar} (range mode) in a
 * responsive popover. The range mirror of {@link module:components/inputs/InputDatePicker}.
 *
 * The text field and the calendar share one range : typing a full range updates the
 * calendar, picking two endpoints fills the field and closes the popover. The popover
 * only closes once the range is **complete** (both endpoints picked). A clear `×`
 * button appears in the field when there is a value.
 *
 * The popover is a **dropdown** anchored under the field on `md`+ screens (wide enough
 * for the dual-month view) and a **modal** on mobile (single month) — force either
 * with `display`.
 *
 * @module components/inputs/InputDateRangePicker
 *
 * When a **footer** is active (see `footer`), picking dates only updates a draft —
 * the field commits on **Apply** and reverts on **Cancel** / dismiss.
 *
 * @param {Object} props
 * @param {boolean} [props.allowReversedRange=false] - Allow the end date before the start (forwarded to the field).
 * @param {string} [props.applyLabel='Apply'] - Footer Apply button label.
 * @param {Object} [props.calendarProps] - Extra props forwarded to the `Calendar` (shortcuts, months…).
 * @param {string} [props.cancelLabel='Cancel'] - Footer Cancel button label.
 * @param {boolean} [props.clearable=true] - Show the clear button when the field has a value.
 * @param {string} [props.dateSeparator='/'] - Date segments separator.
 * @param {string} [props.defaultValue=''] - Initial formatted value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and buttons.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {'never'|'always'|'mobile'|'desktop'|boolean} [props.footer='never'] - Show an Apply / Cancel footer (deferred commit) — everywhere, only below `md`, only at `md`+, or never.
 * @param {Date} [props.max] - Latest selectable date.
 * @param {Date} [props.min] - Earliest selectable date.
 * @param {Object} [props.maxLength] - Maximal range length {day, month, year}.
 * @param {Object} [props.minLength] - Minimal range length {day, month, year}.
 * @param {string} [props.mode='dd/mm/yyyy'] - Date format mode (see `dateModes`).
 * @param {(value: string) => void} [props.onChange] - Change handler (formatted string).
 * @param {(range: {start: Date, end: Date}|null) => void} [props.onDateRange] - Parsed-range handler.
 * @param {string} [props.rangeSeparator=' – '] - Separator between the two dates.
 * @param {boolean} [props.showIcon=false] - Show the left calendar icon of the field.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + button size.
 * @param {string} [props.value] - Controlled formatted value.
 * @param {Object} props.rest - Other props forwarded to InputDateRange (label, error, helper…).
 *
 * @example
 * ```jsx
 * const [ range , setRange ] = useState('') ;
 * <InputDateRangePicker label="Period" value={ range } onChange={ setRange } min={ new Date() } />
 * ```
 */
const InputDateRangePicker =
({
    allowReversedRange = false ,
    applyLabel = 'Apply' ,
    calendarProps ,
    cancelLabel = 'Cancel' ,
    clearable = true ,
    dateSeparator = '/' ,
    defaultValue = '' ,
    disabled = false ,
    display = 'responsive' ,
    footer = 'never' ,
    max ,
    maxLength ,
    min ,
    minLength ,
    mode = DD_MM_YYYY ,
    onChange : onChangeFromProps ,
    onDateRange ,
    rangeSeparator = ' – ' ,
    showIcon = false ,
    size ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ strValue , setStrValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;
    const [ rangeValue , setRangeValue ] = useState( EMPTY_RANGE ) ;
    const [ open , setOpen ] = useState( false ) ;

    // Footer (deferred commit) : whether it is active for the current viewport.
    const isMdUp     = useBreakpoint( 'md' ) ;
    const footerMode = footer === true ? 'always' : ( !footer ? 'never' : footer ) ;
    const footerActive = footerMode === 'always'
        || ( footerMode === 'mobile' && !isMdUp )
        || ( footerMode === 'desktop' && isMdUp ) ;

    // Snapshot of the committed range, taken when the popover opens, so Cancel /
    // dismiss can revert the draft.
    const committedRef = useRef( EMPTY_RANGE ) ;

    // Viewport-aware positioning : the dropdown flips (top/bottom) and aligns
    // (start/center/end) based on where the field sits. The panel is wide to fit
    // the dual-month range view.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        panelWidth         : 620 ,
        panelHeight        : 380 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const toggleOpen = () =>
    {
        if ( !open )
        {
            committedRef.current = rangeValue ; // snapshot for Cancel / dismiss
            recalculate() ;
        }
        setOpen( ( previous ) => !previous ) ;
    } ;

    // Field → calendar : the masked field emits { start , end } | null.
    const handleDateRange = ( dr ) =>
    {
        setRangeValue( dr ? { from : dr.start , to : dr.end } : EMPTY_RANGE ) ;
        onDateRange?.( dr ) ;
    } ;

    // Commit a complete range to the field and close.
    const commitRange = ( range ) =>
    {
        const str = formatDateForMode( range.from , mode , dateSeparator )
                  + rangeSeparator
                  + formatDateForMode( range.to , mode , dateSeparator ) ;
        setStrValue( str ) ;
        onDateRange?.( { start : range.from , end : range.to } ) ;
        setOpen( false ) ;
    } ;

    // Calendar → field : keep the calendar in sync on every click. With a footer the
    // pick only updates the draft (commit waits for Apply); without one, a complete
    // range commits and closes immediately. Pushing a partial range would be
    // re-parsed as null by the field and wipe the in-progress selection.
    const handlePick = ( next ) =>
    {
        setRangeValue( next ?? EMPTY_RANGE ) ;

        if ( !footerActive && next?.from && next?.to )
        {
            commitRange( next ) ;
        }
    } ;

    const handleApply = () =>
    {
        if ( rangeValue?.from && rangeValue?.to )
        {
            commitRange( rangeValue ) ;
        }
    } ;

    const handleCancel = () =>
    {
        setRangeValue( committedRef.current ) ;
        setOpen( false ) ;
    } ;

    // Escape / outside click / backdrop : revert the draft when a footer is active.
    const handlePopoverClose = () =>
    {
        if ( footerActive )
        {
            setRangeValue( committedRef.current ) ;
        }
        setOpen( false ) ;
    } ;

    const handleClear = () =>
    {
        setStrValue( '' ) ;
        setRangeValue( EMPTY_RANGE ) ;
        onDateRange?.( null ) ;
    } ;

    const clearButton = clearable && strValue
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = "Clear date range"
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
            <InputDateRange
                { ...rest }
                showIcon           = { showIcon }
                mode               = { mode }
                dateSeparator      = { dateSeparator }
                rangeSeparator     = { rangeSeparator }
                min                = { min }
                max                = { max }
                minLength          = { minLength }
                maxLength          = { maxLength }
                allowReversedRange = { allowReversedRange }
                size               = { size }
                disabled           = { disabled }
                value              = { strValue }
                onChange           = { setStrValue }
                onDateRange        = { handleDateRange }
                actions            = { [ clearButton , trigger ] }
            />

            <CalendarPopover
                anchorRef = { anchorRef }
                isOpen    = { open }
                onClose   = { handlePopoverClose }
                display   = { display }
                direction = { direction }
                placement = { placement }
                showFooter    = { footerActive }
                onApply       = { handleApply }
                onCancel      = { handleCancel }
                applyDisabled = { !( rangeValue?.from && rangeValue?.to ) }
                applyLabel    = { applyLabel }
                cancelLabel   = { cancelLabel }
            >
                <Calendar
                    mode     = "range"
                    months   = "auto"
                    value    = { rangeValue }
                    onChange = { handlePick }
                    min      = { min }
                    max      = { max }
                    { ...calendarProps }
                />
            </CalendarPopover>
        </div>
    ) ;
} ;

InputDateRangePicker.displayName = 'InputDateRangePicker' ;

export default InputDateRangePicker ;
