'use client' ;

import { useMemo , useRef } from 'react'
import { useMaskito } from '@maskito/react'
import { maskitoTimeOptionsGenerator } from '@maskito/kit'

import Input      from './Input'
import SwapButton from '../../components/buttons/SwapButton'

import { AM , PM } from '../../helpers/time/meridies'

import cn     from '../../themes/helpers/cn' ;
import styles from './styles/InputActions.module.css' ;

import useMergeRefs from '../../hooks/useMergeRefs'
import useTime      from '../../helpers/time/useTime'

import { MdAccessTime as TimeIcon } from 'react-icons/md'

/**
 * InputTime component - Time input with optional AM/PM toggle and Maskito formatting.
 *
 * @param {Object} props
 * @param {boolean} [props.ampm=false] - Use 12-hour format with AM/PM toggle
 * @param {string} [props.defaultMeridiem] - Default meridiem ('AM' or 'PM')
 * @param {string} [props.defaultValue] - Default time value (formatted string)
 * @param {string} [props.meridiem] - Controlled meridiem value
 * @param {string} [props.value] - Controlled time value (formatted string)
 * @param {Function} [props.onChange] - Change handler (receives formatted time string)
 * @param {Function} [props.onChangeMeridiem] - Meridiem change handler (receives 'AM' or 'PM')
 * @param {Function} [props.onTime] - Time object change handler (receives Time instance)
 * @param {boolean} [props.useMinutes=true] - Include minutes in format (HH:MM)
 * @param {boolean} [props.useSeconds=false] - Include seconds in format (HH:MM:SS)
 * @param {boolean} [props.useMilliseconds=false] - Include milliseconds in format (HH:MM:SS.MSS)
 * @param {React.ReactNode} [props.icon] - Custom icon component (default: MdAccessTime)
 * @param {string} [props.iconClassName] - Additional classes for the icon container
 * @param {boolean} [props.showIcon=true] - Show the clock icon
 * @param {boolean} [props.disabled=false] - Disable input and buttons
 * @param {boolean} [props.readOnly=false] - Make input read-only (hides AM/PM toggle)
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text below input
 * @param {string} [props.validatorHint] - Validation hint text (only visible when validation fails)
 * @param {string} [props.label] - Label text above input
 * @param {string} [props.legend] - Legend text (if using fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend instead of label
 * @param {boolean} [props.useValidator=false] - Enable DaisyUI validator styling
 * @param {boolean} [props.showTooltip=true] - Show tooltip on AM/PM button
 * @param {string} [props.tooltipClassName] - Tooltip classes
 * @param {string} [props.tooltipColor] - Tooltip color
 * @param {string} [props.tooltipPosition] - Tooltip position
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to Input
 *
 * @example
 * // Simple 24-hour format (HH:MM)
 * <InputTime defaultValue="14:30" />
 *
 * @example
 * // 12-hour format with AM/PM
 * <InputTime ampm defaultValue="02:30" defaultMeridiem="PM" />
 *
 * @example
 * // With seconds
 * <InputTime useSeconds defaultValue="14:30:45" />
 *
 * @example
 * // With milliseconds
 * <InputTime useSeconds useMilliseconds defaultValue="14:30:45.123" />
 *
 * @example
 * // Hours only (no minutes)
 * <InputTime useMinutes={false} defaultValue="14" />
 *
 * @example
 * // Controlled with Time object callback
 * const [time, setTime] = useState('14:30');
 * const [timeObject, setTimeObject] = useState(null);
 *
 * <InputTime
 *     value={time}
 *     onChange={setTime}
 *     onTime={setTimeObject}
 *     label="Appointment Time"
 * />
 *
 * @example
 * // With fieldset
 * <InputTime
 *     useFieldset
 *     legend="Meeting Time"
 *     helper="Select your preferred time"
 * />
 */
const InputTime =
({
    ampm = false,
    defaultMeridiem,
    defaultValue,

    meridiem: meridiemFromProps,
    value: valueFromProps,
    onChange: onChangeFromProps,
    onChangeMeridiem: onChangeMeridiemFromProps,
    onTime,

    useMinutes = true,
    useSeconds = false,
    useMilliseconds = false,

    icon,
    iconClassName,

    showIcon = true,
    disabled = false,
    readOnly = false,
    error,
    helper,
    validatorHint,
    label,
    legend,
    useFieldset = false,
    useValidator = false,

    showTooltip = true,
    tooltipClassName,
    tooltipColor,
    tooltipPosition,

    ref ,

    ...rest
}) =>
{
    // --------- Time state management

    const {
        meridiem,
        value,
        setValue,
        toggleMeridiem
    } = useTime({
        ampm,
        defaultMeridiem,
        defaultValue,
        meridiemFromProps,
        valueFromProps,
        onChangeFromProps,
        onChangeMeridiemFromProps,
        onTime,
    }) ;

    // --------- Build mode string

    const pattern = [ 'HH' ] ;

    if ( useMinutes )
    {
        pattern.push( 'MM' ) ;
    }

    if ( useSeconds || useMilliseconds )
    {
        pattern.push( 'SS' ) ;
    }

    const mode = pattern.join( ':' ) + ( useMilliseconds ? '.MSS' : '' ) ;

    // --------- Maskito options (DOIT être stable pour Maskito)

    const maskOptions = useMemo( () => maskitoTimeOptionsGenerator({
        mode,
        ...( ampm &&
        {
            timeSegmentMaxValues: { hours: 12 } ,
            timeSegmentMinValues: { hours: 1  }
        })
    }) , [ mode, ampm ] ) ;

    const maskedInputRef = useMaskito({ options : maskOptions }) ;
    const internalRef    = useRef( null ) ;
    const mergedRef      = useMergeRefs( maskedInputRef, internalRef, ref ) ;

    // --------- Build placeholder

    const placeholder = mode ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            { icon || <TimeIcon /> }
        </div>
    ) ;

    // --------- AM/PM toggle button

    const meridiemButton = ampm ? (
        <SwapButton
            className        = { cn( 'join-item' , styles.btnInput , error && styles.btnInputError ) }
            checked          = { meridiem === AM }
            disabled         = { disabled || readOnly }
            on               = { AM }
            off              = { PM }
            onChange         = { toggleMeridiem }
            title            = { meridiem }
            tooltip          = { meridiem }
            tooltipClassName = { tooltipClassName }
            tooltipColor     = { tooltipColor }
            tooltipPosition  = { tooltipPosition }
            showTooltip      = { showTooltip && !readOnly && !disabled }
        />
    ) : null ;

    // --------- Actions (AM/PM button)

    const actions = meridiemButton ? [ meridiemButton ] : null ;

    // --------- Render

    return (
        <Input
            autoComplete  = "off"
            actions       = { actions }
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "numeric"
            label         = { label }
            legend        = { legend }
            onChange      = { handleChange }
            placeholder   = { placeholder }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            type          = "text"
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            validatorHint = { validatorHint }
            value         = { value ?? '' }
            { ...rest }
        />
    ) ;
} ;

InputTime.displayName = 'InputTime' ;

export default InputTime ;

export { AM, PM } ;