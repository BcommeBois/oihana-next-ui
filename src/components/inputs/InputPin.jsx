'use client' ;

import { useRef, useState, useEffect } from 'react'

import cn from '@/themes/helpers/cn'

/**
 * InputPin component - Multi-field input for PIN/OTP codes.
 *
 * @param {Object} props
 * @param {number} [props.length=6] - Number of input fields
 * @param {string} [props.type='text'] - Input type: 'text', 'number', or 'password'
 * @param {Function} [props.onChange] - Callback when value changes (receives complete value)
 * @param {Function} [props.onComplete] - Callback when all fields are filled
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {boolean} [props.disabled=false] - Disable all inputs
 * @param {boolean} [props.autoFocus=false] - Auto-focus first field on mount
 * @param {string} [props.align='center'] - Alignment: 'start', 'center', 'end', 'stretch'
 * @param {string} [props.className] - Container class name
 * @param {string} [props.inputClassName] - Individual input class name
 * @param {string} [props.label] - Label text above inputs
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.pattern] - Regex pattern for validation (e.g., '[0-9]' for digits only)
 * @param {Object} props.rest - Other props
 *
 * @example
 * // 6-digit OTP centered
 * <InputPin length={6} type="number" align="center" />
 *
 * @example
 * // 4-digit PIN aligned to start
 * <InputPin length={4} type="password" pattern="[0-9]" align="start" />
 */
const InputPin =
({
    length = 6 ,
    type = 'text' ,

    onChange ,
    onComplete ,
    defaultValue = '' ,
    value: controlledValue ,

    align = 'center' ,
    autoFocus = false ,
    className ,
    disabled = false ,
    error ,
    helper ,
    inputClassName ,
    label ,
    pattern = '[0-9A-Za-z]' ,
    legend ,
    useFieldset = false ,

    ...rest
}) =>
{
    const [ values, setValues ] = useState( () =>
    {
        const initial = controlledValue || defaultValue || '' ;
        return Array.from( { length }, ( _, i ) => initial[ i ] || '' ) ;
    }) ;

    const inputsRef = useRef( [] ) ;

    // Synchronize if the controlled value change (ex: form reset)
    useEffect( () =>
    {
        if ( controlledValue !== undefined )
        {
            const newValues = Array.from( { length }, ( _, i ) => String( controlledValue )[ i ] || '' ) ;
            setValues( newValues ) ;
        }
    }
    , [ controlledValue, length ]) ;

    const triggerChange = newValues =>
    {
        const completeValue = newValues.join( '' ) ;

        onChange?.( completeValue ) ;

        if ( completeValue.length === length )
        {
            onComplete?.( completeValue ) ;
        }
    } ;

    const handleChange = ( index, newValue ) =>
    {
        if ( disabled )
        {
            return ;
        }

        const char = newValue.slice( -1 ) ;

        if ( char && pattern && !new RegExp( pattern ).test( char ) )
        {
            return ;
        }

        const newValues = [ ...values ] ;

        newValues[ index ] = char ;

        setValues( newValues ) ;

        triggerChange( newValues ) ;

        if ( char && index < length - 1 )
        {
            inputsRef.current[ index + 1 ]?.focus() ;
        }
    } ;

    const handleKeyDown = ( index, event ) =>
    {
        if ( disabled )
        {
            return ;
        }

        if ( event.key === 'Backspace' )
        {
            event.preventDefault() ;

            const newValues = [ ...values ] ;

            if ( values[ index ] )
            {
                // Si la case actuelle est pleine, on l'efface
                newValues[ index ] = '' ;
            }
            else if ( index > 0 )
            {
                // Si la case est vide, on efface la précédente et on y va
                newValues[ index - 1 ] = '' ;
                inputsRef.current[ index - 1 ]?.focus() ;
            }

            setValues( newValues ) ;
            triggerChange( newValues ) ;
        }

        if ( event.key === 'ArrowLeft' && index > 0 )
        {
            event.preventDefault() ;
            inputsRef.current[ index - 1 ]?.focus() ;
        }

        if ( event.key === 'ArrowRight' && index < length - 1 )
        {
            event.preventDefault() ;
            inputsRef.current[ index + 1 ]?.focus() ;
        }
    } ;

    const handlePaste = event =>
    {
        if ( disabled )
        {
            return ;
        }

        event.preventDefault() ;
        const pastedData = event.clipboardData.getData( 'text' ).trim().slice( 0, length ) ;

        const filteredData = pattern
            ? pastedData.split( '' ).filter( char => new RegExp( pattern ).test( char ) ).join( '' )
            : pastedData ;

        const newValues = Array.from( { length }, ( _, i ) => filteredData[ i ] || '' ) ;
        setValues( newValues ) ;
        triggerChange( newValues ) ;

        const lastIndex = Math.min( filteredData.length, length - 1 ) ;

        inputsRef.current[ lastIndex ]?.focus() ;
    } ;

    // Map align prop to Tailwind classes
    const alignClass =
    {
        start   : 'justify-start',
        center  : 'justify-center',
        end     : 'justify-end',
        stretch : 'justify-stretch',
    }[ align ] || 'justify-center' ;

    // Items alignment for the vertical flow
    const itemsAlignClass =
    {
        start   : 'items-start',
        center  : 'items-center',
        end     : 'items-end',
        stretch : 'items-stretch',
    }[ align ] || 'items-center' ;

    // Text alignment for labels, legends, helpers, and errors
    const textAlignClass =
    {
        start   : 'text-left',
        center  : 'text-center',
        end     : 'text-right',
        stretch : 'text-center',
    }[ align ] || 'text-center' ;

    const classNames = cn
    (
        'input input-md w-12 h-12 text-center text-lg font-bold',
        error && 'input-error',
        inputClassName
    ) ;

    const inputsElement = (
        <div className={ cn( 'flex gap-2' , alignClass , className ) }>
            {
                values.map( ( val , index ) =>
                (
                    <input
                        aria-label     = { `Digit ${index + 1}` }
                        autoComplete   = "one-time-code"
                        autoFocus      = { autoFocus && index === 0 }
                        className      = { classNames }
                        disabled       = { disabled }
                        inputMode      = { type === 'password' ? 'text' : 'numeric' }
                        key            = { index }
                        maxLength      = { 1 }
                        onChange       = { e => handleChange( index, e.target.value ) }
                        onClick        = { e => e.currentTarget.select() }
                        onFocus        = { e => e.currentTarget.select() }
                        onKeyDown      = { e => handleKeyDown( index, e ) }
                        onPaste        = { handlePaste }
                        ref            = { el => { inputsRef.current[ index ] = el } }
                        type           = { type === 'number' ? 'text' : type } // Force text pour éviter les flèches de step
                        value          = { String( val ?? '' ) }
                        { ...rest }
                    />
                )
            )}
        </div>
    ) ;

    const content = (
        <div className={ cn( 'flex flex-col gap-2' , itemsAlignClass ) }>
            { inputsElement }

            {
                error ? (
                    <p className={ cn( 'label text-xs text-error', textAlignClass ) }>
                        { error }
                    </p>
                ) : helper ? (
                    <p className={ cn( 'label text-xs text-base-content/70', textAlignClass ) }>
                        { helper }
                    </p>
                ) : null
            }

        </div>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full flex flex-col' , itemsAlignClass ) }>
                { legend && (
                    <legend className={ cn( 'fieldset-legend', textAlignClass ) }>
                        { legend }
                    </legend>
                )}
                { content }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-1 w-full' , itemsAlignClass ) }>
            { label && (
                <label className={ cn( 'label font-medium', textAlignClass ) }>
                    { label }
                </label>
            )}
            { content }
        </div>
    ) ;
} ;

InputPin.displayName = 'InputPin' ;

export default InputPin ;