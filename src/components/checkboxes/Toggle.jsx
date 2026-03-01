'use client' ;

import { useEffect, useRef, useId } from 'react'

import cn from '@/themes/helpers/cn'

import getToggleClasses from '../../themes/components/toggle'
import useMergeRefs     from '../../hooks/useMergeRefs'

/**
 * Toggle (switch) component for DaisyUI 5.
 *
 * @param {Object} props
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.color] - Toggle color: 'primary', 'secondary', etc.
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text (always visible)
 * @param {string} [props.id] - Input ID
 * @param {boolean} [props.indeterminate=false] - Indeterminate state
 * @param {string} [props.label] - Label text
 * @param {string} [props.labelClassName] - Additional classes for label container
 * @param {'left' | 'right'} [props.labelPosition='left'] - Label position
 * @param {string} [props.name] - Input name
 * @param {Function} [props.onChange] - Change handler: (event) => void
 * @param {string} [props.size='md'] - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.toggleClassName] - Additional classes for toggle input
 * @param {*} [props.value] - Input value
 * @param {Object} [props.ref] - Ref for toggle input (React 19)
 */
const Toggle =
({
    checked ,
    className ,
    color ,
    defaultChecked ,
    disabled = false ,
    error ,
    helper ,
    id ,
    indeterminate = false ,
    label ,
    labelClassName ,
    labelPosition = 'left' ,
    name ,
    onChange ,
    size = 'md' ,
    toggleClassName ,
    value ,

    toggleRef : _ignore , // Extraction pour protection DOM
    ref ,

    ...rest
}) =>
{
    const fallbackId = useId() ;
    const inputId    = id || fallbackId ;
    const hasError   = Boolean( error ) ;

    // --------- Refs management

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef, ref ) ;

    // --------- Styles

    const toggleClasses = getToggleClasses({
        className : toggleClassName ,
        color     : hasError ? 'error' : color ,
        size      : size ,
    }) ;

    // --------- Indeterminate effect

    useEffect( () =>
    {
        if ( internalRef.current )
        {
            internalRef.current.indeterminate = indeterminate ;
        }
    }
    , [ indeterminate ]) ;

    const labelText = label && (
        <span className={ cn( 'label-text' , disabled && 'opacity-60' ) }>
            { label }
        </span>
    ) ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn( 'text-xs mt-1' , error ? 'text-error' : 'text-base-content/70' ) }>
            { error || helper }
        </p>
    ) ;

    return (
        <div className={ cn( 'flex flex-col' , className ) }>
            <label
                className = { cn(
                    'label cursor-pointer justify-between gap-4' ,
                    disabled && 'cursor-not-allowed' ,
                    labelClassName
                )}
                htmlFor   = { inputId }
            >
                { labelPosition === 'left' && labelText }

                <input
                    checked        = { checked }
                    className      = { toggleClasses }
                    defaultChecked = { defaultChecked }
                    disabled       = { disabled }
                    id             = { inputId }
                    name           = { name }
                    onChange       = { onChange }
                    ref            = { mergedRef }
                    type           = "checkbox"
                    value          = { value }
                    { ...rest }
                />

                { labelPosition === 'right' && labelText }
            </label>

            { helperOrError }
        </div>
    ) ;
} ;

Toggle.displayName = 'Toggle' ;

export default Toggle ;