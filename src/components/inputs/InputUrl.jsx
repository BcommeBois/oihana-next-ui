'use client' ;

import { useRef } from 'react'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import Input from './Input'

import { MdLink as LinkIcon, MdOpenInNew as OpenIcon } from 'react-icons/md' ;

/**
 * InputURL component - URL input with validation and optional open button.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.autoProtocol=true] - Auto-add https:// if missing on blur
 * @param {'both'|'https'|'http'} [props.allowedProtocols='both'] - Allowed protocols
 * @param {boolean} [props.showOpenButton=true] - Show "Open URL" button
 * @param {string} [props.openLabel='Open URL'] - A11y label for the open button
 * @param {React.ReactNode} [props.icon] - Icon component (default: LinkIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {React.ReactNode} [props.openIcon] - Custom open icon (default: OpenIcon)
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
 * @param {string} [props.placeholder='https://example.com'] - Input placeholder
 * @param {boolean} [props.required=false] - HTML5 required attribute
 * @param {string} [props.pattern] - Custom HTML5 pattern (overrides default)
 * @param {number} [props.maxLength] - Maximum length
 * @param {string} [props.title] - HTML5 title (validation message)
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to InputGroup
 *
 * @example
 * // Simple URL input (accepts http and https)
 * <InputURL placeholder="Enter website URL" />
 *
 * @example
 * // HTTPS only
 * <InputURL
 *     allowedProtocols="https"
 *     validatorHint="Only secure HTTPS URLs are allowed"
 *     label="Secure Website"
 * />
 *
 * @example
 * // HTTP only (rare use case)
 * <InputURL
 *     allowedProtocols="http"
 *     autoProtocol={false}
 *     label="Local Development URL"
 * />
 *
 * @example
 * // Without auto-protocol
 * <InputURL
 *     autoProtocol={false}
 *     placeholder="example.com"
 * />
 *
 * @example
 * // Without open button
 * <InputURL
 *     showOpenButton={false}
 *     label="Website"
 * />
 *
 * @example
 * // With validation
 * <InputURL
 *     useValidator
 *     required
 *     validatorHint="Please enter a valid URL"
 *     label="Portfolio URL"
 * />
 *
 * @example
 * // With fieldset
 * <InputURL
 *     useFieldset
 *     legend="Company Website"
 *     autoProtocol
 *     helper="URL will be auto-formatted"
 * />
 */
const InputURL =
({
    defaultValue = '',
    onChange: onChangeFromProps,
    value: valueFromProps,

    autoProtocol = true ,
    allowedProtocols = 'both' ,
    showOpenButton = true ,
    openLabel = 'Open URL' ,

    icon,
    iconClassName,
    openIcon,

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

    placeholder = 'https://example.com',
    required = false,
    pattern,
    maxLength,
    title,

     ref ,

    ...rest
}) =>
{
    const [ value, setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef, ref ) ;

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    } ;

    const handleBlur = event =>
    {
        if ( autoProtocol && value && !value.match( /^[a-z]+:\/\//i ) )
        {
            const protocol = allowedProtocols === 'http' ? 'http://' : 'https://' ;
            const urlWithProtocol = `${protocol}${value}` ;
            setValue( urlWithProtocol ) ;
        }

        rest.onBlur?.( event ) ;
    } ;

    const handleOpen = event =>
    {
        event?.preventDefault() ;

        if ( !value )
        {
            return ;
        }

        let url = value ;

        if ( !url.match( /^[a-z]+:\/\//i ) )
        {
            const protocol = allowedProtocols === 'http' ? 'http://' : 'https://' ;
            url = `${protocol}${url}` ;
        }

        window.open( url, '_blank', 'noopener,noreferrer' ) ;
    } ;

    // Icon element
    const iconElement = showIcon &&
    (
        <div className="flex items-center justify-center">
            { icon || <LinkIcon /> }
        </div>
    ) ;

    // Open button
    const openButton = showOpenButton && !readOnly && !disabled ? (
        <button
            key        = "open"
            type       = "button"
            onClick    = { handleOpen }
            disabled   = { !value || disabled }
            className  = "btn btn-input join-item btn-square font-semibold"
            aria-label = { openLabel }
            title      = { openLabel }
        >
            { openIcon || <OpenIcon /> }
        </button>
    ) : null ;

    // Build pattern based on allowedProtocols
    const buildUrlPattern = () =>
    {
        if ( pattern )
        {
            return pattern ; // Custom pattern overrides
        }

        // Domain pattern: matches domain.com, localhost, or IP address
        // Accepts: example.com, www.example.com, localhost, 192.168.1.1
        const domainPattern = '([a-zA-Z0-9]([a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}|localhost|([0-9]{1,3}\\.){3}[0-9]{1,3}' ;
        const portPattern   = '(:[0-9]+)?' ;
        const pathPattern   = '(/[^\\s]*)?' ;

        const fullDomain = `${domainPattern}${portPattern}${pathPattern}` ;

        // If autoProtocol is true, make protocol optional in pattern
        if ( autoProtocol )
        {
            switch ( allowedProtocols )
            {
                case 'https' : return `(https://)?(${fullDomain})` ;
                case 'http'  : return `(http://)?(${fullDomain})` ;
                default      : return `(https?://)?(${fullDomain})` ;
            }
        }

        // If autoProtocol is false, require protocol in pattern
        switch ( allowedProtocols )
        {
            case 'https' : return `https://${fullDomain}` ;
            case 'http'  : return `http://${fullDomain}` ;
            default      : return `https?://${fullDomain}` ;
        }
    } ;

    return (
        <Input
            actions       = { openButton }
            autoComplete  = "url"
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "url"
            label         = { label }
            legend        = { legend }
            maxLength     = { maxLength }
            onBlur        = { handleBlur }
            onChange      = { handleChange }
            pattern       = { buildUrlPattern() }
            placeholder   = { placeholder }
            readOnly      = { readOnly }
            ref           = { ref }
            required      = { required }
            title         = { title }
            type          = "url"
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            value         = { value }
            validatorHint = { validatorHint }
            { ...rest }
        />
    ) ;
} ;

InputURL.displayName = 'InputURL' ;

export default InputURL ;