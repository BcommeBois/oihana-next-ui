'use client' ;

import { useMemo, useRef } from 'react'

import { useMaskito } from '@maskito/react'
import { maskitoDateOptionsGenerator } from '@maskito/kit'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import readInputValue from '../../helpers/react/readInputValue'
import isCardExpiry   from '../../helpers/validators/isCardExpiry'

import useFieldValidity from '../../hooks/useFieldValidity'

import useI18n   from '../../contexts/locale/useI18n'
import NO_LOCALE from '../../contexts/locale/noLocale'

import Input from './Input'

import { MdCalendarMonth as CalendarIcon } from 'react-icons/md'

/**
 * InputCardExpiry component - Credit card expiration date (MM/YY format).
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.validate=false] - Check the date — complete, a real month, not past — and say so once it is complete or the field is left. `error` wins over it.
 * @param {Function} [props.onValidChange] - `( valid ) => void`, on mount and whenever the validity changes.
 * @param {string} [props.invalidLabel] - What to say for a wrong date. Defaults to the i18n `expiry` key read at `path`.
 * @param {string} [props.path='components.input.card'] - i18n path the message is read from.
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
    invalidLabel ,
    onBlur ,
    onChange: onChangeFromProps,
    onValidChange ,
    path = 'components.input.card' ,
    validate = false ,
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
        const inputValue = readInputValue( event ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Elements

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <CalendarIcon /> }
        </div>
    ) ;

    const { expiry : invalidFromI18n = 'This date is past or incomplete.' } = useI18n( path , NO_LOCALE , false ) ;

    const text = String( value ?? '' ) ;

    const check = useFieldValidity(
    {
        complete : text.length >= 5 ,
        empty    : text.length === 0 ,
        enabled  : validate ,
        message  : invalidLabel ?? invalidFromI18n ,
        onBlur ,
        onValidChange ,
        valid    : isCardExpiry( text ) ,
    } ) ;

    return (
        <Input
            autoComplete  = "cc-exp"
            disabled      = { disabled }
            error         = { error ?? check.error ?? undefined }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "numeric"
            label         = { label }
            legend        = { legend }
            onBlur        = { check.onBlur }
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