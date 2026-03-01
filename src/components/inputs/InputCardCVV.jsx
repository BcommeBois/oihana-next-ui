'use client' ;

import { useMemo, useRef } from 'react'

import { useMaskito } from '@maskito/react'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import Input from './Input'

import { MdLock as LockIcon } from 'react-icons/md'

/**
 * InputCardCVV component - Credit card CVV/CVC code (3-4 digits).
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {number} [props.length=3] - CVV length (3 for Visa/MC, 4 for Amex)
 * @param {React.ReactNode} [props.icon] - Icon component (default: LockIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {boolean} [props.showIcon=true] - Show icon
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.validatorHint] - Validation hint
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {boolean} [props.useValidator=false] - Enable validator
 * @param {string} [props.placeholder] - Placeholder (auto-generated if not provided)
 * @param {Object} props.rest - Other props
 *
 * @example
 * <InputCardCVV onChange={(value) => console.log(value)} />
 *
 * @example
 * // For American Express (4 digits)
 * <InputCardCVV length={4} />
 */
const InputCardCVV =
({
    defaultValue = '' ,
    onChange: onChangeFromProps ,
    value: valueFromProps ,

    length = 3 ,

    icon ,
    iconClassName ,

    showIcon = true ,

    disabled = false ,
    readOnly = false ,
    error ,
    helper ,
    validatorHint ,
    label ,
    legend ,
    useFieldset = false ,
    useValidator = false ,

    placeholder ,

    ref  ,

    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;

    // --------- Maskito options (CVV digits)

    const maskOptions = useMemo( () =>
    ({
        mask : new Array( length ).fill( /\d/ ) ,
    })
    , [ length ] ) ;

    const maskedInputRef = useMaskito( { options : maskOptions } ) ;
    const mergedRef      = useMergeRefs( maskedInputRef , internalRef , ref ) ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <LockIcon /> }
        </div>
    ) ;

    const defaultPlaceholder = '0'.repeat( length ) ;

    return (
        <Input
            autoComplete  = "cc-csc"
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "numeric"
            label         = { label }
            legend        = { legend }
            maxLength     = { length }
            onChange      = { handleChange }
            placeholder   = { placeholder || defaultPlaceholder }
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

InputCardCVV.displayName = 'InputCardCVV' ;

export default InputCardCVV ;