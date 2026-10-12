'use client' ;

import { useMemo, useRef } from 'react'

import { useMaskito } from '@maskito/react'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import readInputValue from '../../helpers/react/readInputValue'
import { CARD_BRANDS } from '../../helpers/validators/getCardBrand'

import useFieldValidity from '../../hooks/useFieldValidity'

import useI18n   from '../../contexts/locale/useI18n'
import NO_LOCALE from '../../contexts/locale/noLocale'

import Input from './Input'

import { MdLock as LockIcon } from 'react-icons/md'

/**
 * InputCardCVV component - Credit card CVV/CVC code (3-4 digits).
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.brand] - The card's brand, as `InputCardNumber`'s `onCardTypeChange` gives it : sets the length — 4 for an Amex, 3 otherwise.
 * @param {number} [props.length] - CVV length. Wins over `brand` ; 3 when neither is given.
 * @param {boolean} [props.validate=false] - Say the code is incomplete once the field is left short. `error` wins over it.
 * @param {Function} [props.onValidChange] - `( valid ) => void`, on mount and whenever the validity changes.
 * @param {string} [props.invalidLabel] - What to say for an incomplete code. Defaults to the i18n `cvv` key read at `path`.
 * @param {string} [props.path='components.input.card'] - i18n path the message is read from.
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

    brand ,
    invalidLabel ,
    length : lengthFromProps ,
    onBlur ,
    onValidChange ,
    path = 'components.input.card' ,
    validate = false ,

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

    const length = lengthFromProps ?? CARD_BRANDS.find( item => item.type === brand )?.cvvLength ?? 3 ;

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
        const inputValue = readInputValue( event ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <LockIcon /> }
        </div>
    ) ;

    const defaultPlaceholder = '0'.repeat( length ) ;

    const { cvv : invalidFromI18n = 'The security code is incomplete.' } = useI18n( path , NO_LOCALE , false ) ;

    const digits = String( value ?? '' ).replace( /\D/g , '' ) ;

    const check = useFieldValidity(
    {
        empty    : digits.length === 0 ,
        enabled  : validate ,
        message  : invalidLabel ?? invalidFromI18n ,
        onBlur ,
        onValidChange ,
        valid    : digits.length === length ,
    } ) ;

    return (
        <Input
            autoComplete  = "cc-csc"
            disabled      = { disabled }
            error         = { error ?? check.error ?? undefined }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "numeric"
            label         = { label }
            legend        = { legend }
            maxLength     = { length }
            onBlur        = { check.onBlur }
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