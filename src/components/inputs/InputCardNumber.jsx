'use client' ;

import { useMemo , useRef } from 'react'
import { useMaskito } from '@maskito/react'

import useValue         from '../../hooks/useValue'
import useMergeRefs     from '../../hooks/useMergeRefs'
import useFieldValidity from '../../hooks/useFieldValidity'

import useI18n   from '../../contexts/locale/useI18n'
import NO_LOCALE from '../../contexts/locale/noLocale'

import readInputValue from '../../helpers/react/readInputValue'
import getCardBrand   from '../../helpers/validators/getCardBrand'
import isCardNumber   from '../../helpers/validators/isCardNumber'

import Input from './Input'

import { FaCreditCard as CardIcon } from 'react-icons/fa' ;

/**
 * InputCardNumber component - Credit card number input with automatic formatting.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onCardTypeChange] - Callback when card type is detected (visa, mastercard, amex, discover, unknown)
 * @param {boolean} [props.validate=false] - Check the number — its length for the brand and the Luhn checksum — and say so once it is complete or the field is left. `error` wins over it.
 * @param {Function} [props.onValidChange] - `( valid ) => void`, on mount and whenever the validity changes.
 * @param {string} [props.invalidLabel] - What to say for a wrong number. Defaults to the i18n `number` key read at `path`.
 * @param {string} [props.path='components.input.card'] - i18n path the message is read from.
 * @param {React.ReactNode} [props.icon] - Icon component (default: CardIcon)
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
 * @param {string} [props.placeholder='0000 0000 0000 0000'] - Placeholder
 * @param {Object} props.rest - Other props
 *
 * @example
 * <InputCardNumber onChange={(value) => console.log(value)} />
 */
const InputCardNumber =
({
     defaultValue = '',
     invalidLabel ,
     onBlur ,
     onCardTypeChange ,
     onValidChange ,
     path = 'components.input.card' ,
     validate = false ,
     onChange : onChangeFromProps,
     value : valueFromProps,

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

     placeholder = '0000 0000 0000 0000',

     ref,

     ...rest
}) =>
{
    const [ value, setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;


    const maskOptions = useMemo( () =>
    ({
        mask : val =>
        {
            const { pattern } = getCardBrand( val ) ;

            const mask = [] ;

            pattern.forEach( ( groupSize, index ) =>
            {
                for ( let i = 0; i < groupSize; i++ )
                {
                    mask.push( /\d/ ) ;
                }
                if ( index < pattern.length - 1 )
                {
                    mask.push( ' ' ) ;
                }
            }) ;

            return mask ;
        },
    })
    , [] ) ;

    const maskedInputRef = useMaskito({ options: maskOptions }) ;
    const mergedRef      = useMergeRefs( maskedInputRef, internalRef, ref ) ;

    const handleChange = event =>
    {
        const inputValue = readInputValue( event ) ;

        setValue( inputValue ) ;

        if ( onCardTypeChange )
        {
            const { type } = getCardBrand( inputValue ) ;
            onCardTypeChange( type ) ;
        }
    } ;

    const { number : invalidFromI18n = 'This card number is not valid.' } = useI18n( path , NO_LOCALE , false ) ;

    const digits = String( value ?? '' ).replace( /\D/g , '' ) ;

    const check = useFieldValidity(
    {
        complete : digits.length >= Math.max( ...getCardBrand( digits ).lengths ) ,
        empty    : digits.length === 0 ,
        enabled  : validate ,
        message  : invalidLabel ?? invalidFromI18n ,
        onBlur ,
        onValidChange ,
        valid    : isCardNumber( digits ) ,
    } ) ;

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <CardIcon /> }
        </div>
    ) ;

    return (
        <Input
            autoComplete  = "cc-number"
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
            readOnly      = { readOnly }
            placeholder   = { placeholder }
            ref           = { mergedRef }
            type          = "text"
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            validatorHint = { validatorHint }
            value         = { value }
            { ...rest }
        />
    ) ;
} ;

InputCardNumber.displayName = 'InputCardNumber' ;

export default InputCardNumber ;