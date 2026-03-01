'use client' ;

import { useMemo , useRef } from 'react'

import { useMaskito } from '@maskito/react'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'

import useMergeRefs from '../../hooks/useMergeRefs'
import useValue     from '../../hooks/useValue'

import clamp from 'vegas-js-core/src/maths/clamp'
import round from 'vegas-js-core/src/maths/round'

import Input from './Input'

import {
    MdEuro   as EuroIcon ,
    MdAdd    as MoreIcon ,
    MdRemove as LessIcon
}
from 'react-icons/md'

/**
 * InputCurrency component - A formatted currency input with optional stepper buttons.
 *
 * @param {Object} props
 * @param {number} [props.defaultValue=0] - Default value
 * @param {number} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler (receives raw number)
 * @param {number} [props.min=0] - Minimum value
 * @param {number} [props.max=999999] - Maximum value
 * @param {number} [props.step=1] - Step increment/decrement
 * @param {number} [props.precision=2] - Decimal precision
 * @param {string} [props.decimalSeparator='.'] - Decimal separator ('.' or ',')
 * @param {string} [props.thousandSeparator=' '] - Thousand separator
 * @param {string} [props.prefix=''] - Prefix before number (e.g., '$')
 * @param {string} [props.postfix=' €'] - Postfix after number (e.g., ' €')
 * @param {boolean} [props.decimalZeroPadding=true] - Pad decimals with zeros
 * @param {string} [props.decreaseLabel='Decrease'] - A11y label for less button
 * @param {string} [props.increaseLabel='Increase'] - A11y label for more button
 * @param {React.ReactNode} [props.icon] - Icon component (default: EuroIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {React.ReactNode} [props.lessIcon] - Custom less button icon
 * @param {React.ReactNode} [props.moreIcon] - Custom more button icon
 * @param {boolean} [props.showIcon=true] - Show icon
 * @param {boolean} [props.showStepper=true] - Show increment/decrement buttons
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to Input
 *
 * @example
 * // Simple Euro currency
 * <InputCurrency defaultValue={100} min={0} max={10000} />
 *
 * @example
 * // US Dollar with custom separators
 * <InputCurrency
 *     defaultValue={1000}
 *     prefix="$ "
 *     postfix=""
 *     decimalSeparator="."
 *     thousandSeparator=","
 * />
 */
const InputCurrency =
({
     defaultValue = 0,
     onChange: onChangeFromProps,
     value: valueFromProps,

     min = 0,
     max = 999999,
     step = 1,
     precision = 2,

     decimalSeparator = '.',
     thousandSeparator = ' ',
     prefix = '',
     postfix = ' €',
     decimalZeroPadding = true,

     decreaseLabel = 'Decrease',
     increaseLabel = 'Increase',

     icon,
     iconClassName,

     lessIcon,
     moreIcon,

     showIcon = true,
     showStepper = true,

     disabled = false,
     readOnly = false,
     error,
     helper,
     label,
     legend,
     useFieldset = false,

     ref,

     ...rest
}) =>
{
    const [ value, setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;

    // --------- Maskito configuration

    const maskOptions = useMemo( () => maskitoNumberOptionsGenerator({
        decimalSeparator ,
        max ,
        min ,
        prefix ,
        postfix ,
        thousandSeparator ,
        maximumFractionDigits : precision,
        minimumFractionDigits : decimalZeroPadding ? precision : 0 ,
    })
    , [ decimalSeparator, decimalZeroPadding, max, min, precision, prefix, postfix, thousandSeparator ]) ;

    const maskedInputRef = useMaskito({ options: maskOptions }) ;
    const mergedRef      = useMergeRefs( maskedInputRef, internalRef, ref ) ;

    // --------- Helpers de validation

    const isValueEmpty = val => val === null || val === undefined || String( val ) === '' ;

    const normalizeValue = value =>
    {
        if ( value === null || value === undefined || value === '' || isNaN( value ) )
        {
            return defaultValue ;
        }
        const numVal = typeof value === 'string' ? parseFloat( value ) : value ;
        return round( clamp( numVal, min, max ) , precision ) ;
    } ;

    const handleBlur = event =>
    {
        setValue( normalizeValue( value ) ) ;
        rest.onBlur?.( event ) ;
    } ;

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? '' ;

        let rawValue = inputValue
                     .replace ( prefix  , '' )
                     .replace ( postfix , '' )
                     .split   ( thousandSeparator ).join( '' )
                     .replace ( decimalSeparator , '.' ) ;

        const numValue = parseFloat( rawValue ) ;

        setValue( isNaN( numValue ) ? '' : numValue ) ;
    } ;

    const handleLess = event =>
    {
        event?.preventDefault() ;
        const currentValue = isValueEmpty( value ) || isNaN( value ) ? defaultValue : Number( value ) ;
        setValue( normalizeValue( currentValue - step ) ) ;
        requestAnimationFrame( () => internalRef.current?.focus() ) ;
    } ;

    const handleMore = ( event ) =>
    {
        event?.preventDefault() ;
        const currentValue = isValueEmpty( value ) || isNaN( value ) ? defaultValue : Number( value ) ;
        setValue( normalizeValue( currentValue + step ) ) ;
        requestAnimationFrame( () => internalRef.current?.focus() ) ;
    } ;

    // --------- Elements

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            { icon || <EuroIcon /> }
        </div>
    ) ;

    const currentNum = isValueEmpty( value ) || isNaN( value ) ? defaultValue : Number( value ) ;

    const actions = showStepper && !readOnly ?
    [
        <button
            aria-label = { decreaseLabel }
            className  = "btn btn-input join-item btn-square font-semibold"
            disabled   = { disabled || currentNum <= min }
            key        = "less"
            onClick    = { handleLess }
            title      = { decreaseLabel }
            type       = "button"
        >
            { lessIcon || <LessIcon /> }
        </button>,
        <button
            aria-label = { increaseLabel }
            key        = "more"
            className  = "btn btn-input join-item btn-square font-semibold"
            disabled   = { disabled || currentNum >= max }
            onClick    = { handleMore }
            title      = { increaseLabel }
            type       = "button"
        >
            { moreIcon || <MoreIcon /> }
        </button>
    ] : null ;

    return (
        <Input
            actions       = { actions }
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            inputMode     = "decimal"
            label         = { label }
            legend        = { legend }
            onChange      = { handleChange }
            onBlur        = { handleBlur }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            type          = "text"
            useFieldset   = { useFieldset }
            value         = { value ?? '' }
            { ...rest }
        />
    ) ;
} ;

InputCurrency.displayName = 'InputCurrency' ;

export default InputCurrency ;