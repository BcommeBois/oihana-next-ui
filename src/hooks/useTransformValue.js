'use client' ;

import { useState, useEffect, useRef } from 'react'

/**
 * Hook for input value transformation, validation, and formatting.
 *
 * @param {Object} options
 * @param {string|number} [options.defaultValue=''] - Default value
 * @param {string|number} [options.value] - Controlled value
 * @param {Function} [options.onChange] - Change handler
 * @param {Function} [options.transform] - Transform input before storing
 * @param {Function} [options.validate] - Validate value before onChange
 * @param {Function} [options.format] - Format value for display only
 * @param {Function} [options.process] - Process value before sending to onChange
 * @param {Function} [options.processOnBlur] - Additional processing on blur
 * @param {Function} [options.onBlur] - Original onBlur handler
 * @param {boolean} [options.revertOnBlurIfInvalid=true] - Revert to previous value on blur if invalid
 *
 * @returns {Object} - { displayValue, handleChange, handleBlur, value, setValue }
 *
 * @example
 * const { displayValue, handleChange, handleBlur } = useTransformValue({
 *     defaultValue: '',
 *     transform: (v) => v.toUpperCase(),
 *     validate: (v) => v.length <= 10,
 *     process: (v) => v.trim()
 * });
 */
const useTransformValue =
({
     defaultValue = '',
     value: valueFromProps,
     onChange,

     format,
     transform,
     validate,

     process,
     processOnBlur,
     onBlur,
     revertOnBlurIfInvalid = true
 }) =>
{
    const normalize = v =>
    {
        if ( v === null || v === undefined ) return '' ;
        return String( v ) ;
    } ;

    const isControlled = valueFromProps !== undefined ;

    // --------- Internal state (for uncontrolled or display layer)

    const [ internalValue, setInternalValue ] = useState( () => normalize( defaultValue ) ) ;

    const lastValidValueRef = useRef( normalize( defaultValue ) ) ;

    // --------- Sync from controlled value (ONLY when parent changes)

    useEffect( () =>
    {
        if ( !isControlled )
        {
            return ;
        }

        const next = normalize( valueFromProps ) ;

        setInternalValue( prev => ( prev !== next ? next : prev ) ) ;

        lastValidValueRef.current = next ;
    }
    , [ isControlled, valueFromProps ] ) ;

    // --------- Change handler

    const handleChange = event =>
    {
        const rawValue   = event?.target ? event.target.value : event ;
        const inputValue = normalize( rawValue ) ;

        const transformed = transform ? transform( inputValue ) : inputValue ;
        const isValid     = !validate || validate( transformed ) ;

        setInternalValue( transformed ) ;

        if ( isValid )
        {
            lastValidValueRef.current = transformed ;
            onChange?.( process ? process( transformed ) : transformed ) ;
        }
    }

    // --------- Blur handler

    const handleBlur = event =>
    {
        const rawValue = event?.target ? event.target.value : event ;
        let nextValue = transform ? transform( normalize( rawValue ) ) : normalize( rawValue ) ;

        if ( processOnBlur )
        {
            nextValue = processOnBlur( nextValue ) ;
        }

        if ( validate && !validate( nextValue ) )
        {
            if ( revertOnBlurIfInvalid )
            {
                nextValue = lastValidValueRef.current ;
            }
        }
        else
        {
            lastValidValueRef.current = nextValue ;
        }

        if ( nextValue !== internalValue )
        {
            setInternalValue( nextValue ) ;
            const finalValue = process ? process( nextValue ) : nextValue ;
            onChange?.( finalValue ) ;
        }

        onBlur?.( event ) ;
    }

    // --------- Display value (format is view-only)

    const displayValue = format ? format( internalValue ) : internalValue ;

    return {
        displayValue,
        value        : internalValue,
        setValue     : setInternalValue,
        handleChange,
        handleBlur
    } ;
} ;

export default useTransformValue ;