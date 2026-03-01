'use client' ;

import { useMemo, useRef } from 'react'

import { useMaskito } from '@maskito/react'
import { maskitoDateOptionsGenerator } from '@maskito/kit'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import Input from './Input'

import { MdCalendarMonth as CalendarIcon } from 'react-icons/md'

/**
 * InputCardExpiry component - Credit card expiration date (MM/YY format).
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {React.ReactNode} [props.icon] - Icon component (default: CalendarIcon)
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
 * @param {string} [props.placeholder='MM/YY'] - Placeholder
 * @param {Object} props.rest - Other props
 *
 * @example
 * <InputCardExpiry onChange={(value) => console.log(value)} />
 */
const InputCardExpiry =
({
    defaultValue = '',
    onChange: onChangeFromProps,
    value: valueFromProps,

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

    placeholder = 'MM/YY',

    ref ,

    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;

    // --------- Maskito options (MM/YY format)

    const maskOptions = useMemo( () => maskitoDateOptionsGenerator({
        mode: 'mm/yy',
        separator: '/',
    })
    , [] ) ;

    const maskedInputRef = useMaskito({ options : maskOptions }) ;
    const mergedRef      = useMergeRefs( maskedInputRef , internalRef , ref ) ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Elements

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <CalendarIcon /> }
        </div>
    ) ;

    return (
        <Input
            autoComplete  = "cc-exp"
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

InputCardExpiry.displayName = 'InputCardExpiry' ;

export default InputCardExpiry ;