'use client' ;

import { useMemo , useRef } from 'react'
import { useMaskito } from '@maskito/react'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import Input from './Input'

import { FaCreditCard as CardIcon } from 'react-icons/fa' ;

/**
 * InputCardNumber component - Credit card number input with automatic formatting.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onCardTypeChange] - Callback when card type is detected (visa, mastercard, etc.)
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
     onCardTypeChange ,
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

    const getCardType = cardNumber =>
    {
        const cleaned = String( cardNumber ?? '' ).replace( /\s/g, '' ) ;

        if ( /^4/.test          ( cleaned ) ) return { type: 'visa'       , pattern: [ 4 , 4 , 4 , 4 ] } ;
        if ( /^5[1-5]/.test     ( cleaned ) ) return { type: 'mastercard' , pattern: [ 4 , 4 , 4 , 4 ] } ;
        if ( /^3[47]/.test      ( cleaned ) ) return { type: 'amex'       , pattern: [ 4 , 6 , 5 ] } ;
        if ( /^6(?:011|5)/.test ( cleaned ) ) return { type: 'discover'   , pattern: [ 4 , 4 , 4 , 4 ] } ;

        return { type: 'unknown' , pattern: [ 4 , 4 , 4 , 4 ] } ;
    } ;

    const maskOptions = useMemo( () =>
    ({
        mask : val =>
        {
            const { pattern } = getCardType( val ) ;

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
        const inputValue = event?.target?.value ?? '' ;

        setValue( inputValue ) ;

        if ( onCardTypeChange )
        {
            const { type } = getCardType( inputValue ) ;
            onCardTypeChange( type ) ;
        }
    } ;

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <CardIcon /> }
        </div>
    ) ;

    return (
        <Input
            autoComplete  = "cc-number"
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "numeric"
            label         = { label }
            legend        = { legend }
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