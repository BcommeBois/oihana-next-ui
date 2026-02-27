'use client' ;

import { useEffect , useRef } from 'react'

import Input from './Input'

import useMergeRefs from '@/hooks/useMergeRefs'
import useValue     from '@/hooks/useValue'

import { MdEmail as EmailIcon } from 'react-icons/md'

/**
 * InputEmail component - Email input with HTML5 validation.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {React.ReactNode} [props.icon] - Icon component (default: EmailIcon)
 * @param {string} [props.iconClassName] - Icon container classes
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
 * @param {string} [props.placeholder='email@example.com'] - Input placeholder
 * @param {boolean} [props.required=false] - HTML5 required attribute
 * @param {string} [props.pattern] - Custom HTML5 pattern (overrides default)
 * @param {number} [props.maxLength] - Maximum length
 * @param {string} [props.title] - HTML5 title (validation message)
 * @param {boolean} [props.multiple=false] - Allow multiple emails (comma-separated)
 * @param {boolean} [props.useNativeValidation=true] - Use HTML5 native email validation (no custom pattern)
 * @param {Object} props.rest - Other props passed to InputEmail
 *
 * @example
 * // Simple email input (native HTML5 validation)
 * <InputEmail placeholder="Enter your email" />
 *
 * @example
 * // With custom pattern for stricter validation (single email only)
 * <InputEmail
 *     useNativeValidation={false}
 *     pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}"
 *     label="Email"
 * />
 *
 * @example
 * // With validation
 * <InputEmail
 *     useValidator
 *     required
 *     validatorHint="Please enter a valid email address"
 *     label="Email"
 * />
 *
 * @example
 * // Multiple emails (validates each email individually)
 * <InputEmail
 *     multiple
 *     placeholder="email1@example.com, email2@example.com"
 *     helper="Separate multiple emails with commas"
 * />
 *
 * @example
 * // With fieldset
 * <InputEmail
 *     useFieldset
 *     legend="Contact Email"
 *     required
 *     validatorHint="Valid email required"
 * />
 */
const InputEmail =
({
    defaultValue = '',
    onChange: onChangeFromProps,
    value: valueFromProps,

    id ,
    ref ,

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

    placeholder = 'email@example.com',
    required = false,
    pattern,
    maxLength,
    title,
    multiple = false,
    useNativeValidation = false ,

    ...rest
}) =>
{
    const [ value, setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef , ref ) ;

    // --------- Email validation regex

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/ ;

    // --------- Validate multiple emails

    const validateMultipleEmails = ( emailString ) =>
    {
        if ( !emailString || !emailString.trim() )
        {
            return required ? 'Email is required' : '' ;
        }

        const emails = emailString.split( ',' ).map( e => e.trim() ) ;

        for ( const email of emails )
        {
            if ( !email )
            {
                return 'Empty email found' ;
            }

            if ( !emailRegex.test( email ) )
            {
                return `Invalid email: ${email}` ;
            }
        }

        return '' ; // All valid
    } ;

    // --------- Apply custom validation for multiple emails

    useEffect( () =>
    {
        if ( !multiple || !internalRef?.current )
        {
            return ;
        }

        const inputElement      = internalRef.current ;
        const validationMessage = validateMultipleEmails( value ) ;

        inputElement.setCustomValidity( validationMessage ) ;

        if ( validationMessage )
        {
            inputElement.reportValidity() ;
        }
    }
    , [ value, multiple, required ]) ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? (typeof event === 'string' ? event : '') ;
        setValue( inputValue ) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            { icon || <EmailIcon /> }
        </div>
    ) ;

    // --------- Pattern logic

    const getEmailPattern = () =>
    {
        // Multiple emails: custom JS validation (no pattern)
        if ( multiple )
        {
            return undefined ;
        }

        // Single email: use pattern if provided or if strict validation requested
        if ( useNativeValidation )
        {
            return pattern ; // Only use if explicitly provided
        }

        // Strict validation: use pattern (provided or default)
        return pattern || '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}' ;
    } ;

    const emailPattern = getEmailPattern() ;

    return (
        <Input
            autoComplete  = "email"
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "email"
            label         = { label }
            legend        = { legend }
            maxLength     = { maxLength }
            multiple      = { multiple }
            onChange      = { handleChange }
            pattern       = { emailPattern }
            placeholder   = { placeholder }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            required      = { required }
            title         = { title }
            type          = "email"
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            validatorHint = { validatorHint }
            value         = { value }
            { ...rest }
        />
    ) ;
} ;

InputEmail.displayName = 'InputEmail' ;

export default InputEmail ;