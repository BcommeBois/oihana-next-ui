'use client' ;

import { useState , useRef } from 'react'

import Input from './Input'

import cn           from '../../themes/helpers/cn' ;
import styles       from './styles/InputActions.module.css' ;
import useMergeRefs from '../../hooks/useMergeRefs'

import {
    MdLock          as PasswordIcon ,
    MdVisibility    as VisibleIcon  ,
    MdVisibilityOff as HiddenIcon   ,
}
from 'react-icons/md' ;

/**
 * InputPassword component - A password input with optional visibility toggle.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {React.ReactNode} [props.icon] - Icon component (default: PasswordIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {React.ReactNode} [props.visibleIcon] - Custom visible icon (default: VisibleIcon)
 * @param {React.ReactNode} [props.hiddenIcon] - Custom hidden icon (default: HiddenIcon)
 * @param {boolean} [props.showToggle=true] - Show visibility toggle button
 * @param {boolean} [props.showIcon=true] - Show left icon
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.validatorHint] - Validation hint text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {boolean} [props.useValidator=false] - Enable validator styling
 * @param {string} [props.placeholder='Password'] - Input placeholder
 * @param {boolean} [props.required=false] - HTML5 required
 * @param {string} [props.pattern] - HTML5 pattern (regex)
 * @param {number} [props.minLength] - HTML5 minlength
 * @param {number} [props.maxLength] - HTML5 maxlength
 * @param {string} [props.title] - HTML5 title (validation message)
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to InputPassword
 *
 * @example
 * // Simple password input
 * <InputPassword placeholder="Enter password" />
 *
 * @example
 * // Without toggle button
 * <InputPassword showToggle={false} />
 *
 * @example
 * // With validation
 * <InputPassword
 *     useValidator
 *     required
 *     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
 *     minLength={8}
 *     validatorHint="Must be 8+ chars with number, lowercase and uppercase"
 * />
 */
const InputPassword =
({
    defaultValue,
    onChange,
    value,

    icon,
    iconClassName,

    visibleIcon,
    hiddenIcon,

    showToggle = true,
    showIcon = true,

    showPasswordLabel = 'Show password',
    hidePasswordLabel = 'Hide password',

    disabled = false,
    readOnly = false,
    error,
    helper,
    validatorHint,
    label,
    legend,
    useFieldset = false,
    useValidator = false,

    placeholder = 'Password',

    required = false ,
    pattern,
    minLength,
    maxLength,
    title,

    ref,

    ...rest
}) =>
{
    const [ isVisible, setIsVisible ] = useState( false ) ;

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef , ref ) ;

    const handleToggle = event =>
    {
        event?.preventDefault() ;

        setIsVisible( prev => !prev ) ;

        requestAnimationFrame(() =>
        {
            if ( internalRef.current )
            {
                internalRef.current.focus() ;

                const length = internalRef.current.value.length; // cursor at the end of the input field

                internalRef.current.setSelectionRange(length, length);
            }
        }) ;
    } ;

    // Icon element
    const iconElement = showIcon &&
    (
        <div className="flex items-center justify-center opacity-50">
            { icon || <PasswordIcon /> }
        </div>
    ) ;

    // Toggle button
    const toggleButton = showToggle && !readOnly && !disabled ?
    (
        <button
            key          = "toggle"
            type         = "button"
            onClick      = { handleToggle }
            className    = { cn( 'btn join-item btn-square font-semibold' , styles.btnInput , error && styles.btnInputError ) }
            aria-label   = { isVisible ? hidePasswordLabel : showPasswordLabel }
            aria-pressed = { isVisible }
            title        = { isVisible ? hidePasswordLabel : showPasswordLabel }
        >
        {
            isVisible ? ( visibleIcon || <VisibleIcon /> ) : ( hiddenIcon  || <HiddenIcon  /> )
        }
        </button>
    ) : null ;

    return (
        <Input
            type          = { isVisible ? 'text' : 'password' }
            value         = { value }
            defaultValue  = { defaultValue }
            onChange      = { onChange }
            placeholder   = { placeholder }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            actions       = { toggleButton }
            disabled      = { disabled }
            readOnly      = { readOnly }
            error         = { error }
            helper        = { helper }
            validatorHint = { validatorHint }
            label         = { label }
            legend        = { legend }
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            ref           = { mergedRef }
            required      = { required }
            pattern       = { pattern }
            minLength     = { minLength }
            maxLength     = { maxLength }
            title         = { title }
            { ...rest }
        />
    ) ;
} ;

InputPassword.displayName = 'InputPassword' ;

export default InputPassword ;