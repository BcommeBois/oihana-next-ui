'use client' ;

import { useEffect, useId , useRef } from 'react'

import cn from '@/themes/helpers/cn'

import getCheckboxClasses from '@/themes/components/checkbox'

import useMergeRefs from '@/hooks/useMergeRefs'

/**
 * Checkbox component for DaisyUI 5.
 *
 * @module components/Checkbox
 * @see https://daisyui.com/components/checkbox
 *
 * @example
 * ```jsx
 * // Simple
 * <Checkbox label="Remember me" />
 *
 * // Controlled
 * <Checkbox
 *     label="Accept terms"
 *     checked={accepted}
 *     onChange={(e) => setAccepted(e.target.checked)}
 * />
 *
 * // With helper/error
 * <Checkbox
 *     label="Subscribe"
 *     helper="You can unsubscribe anytime"
 *     error="Please accept to continue"
 * />
 *
 * // Label on left
 * <Checkbox label="Enable notifications" labelPosition="left" />
 *
 * // Indeterminate
 * <Checkbox label="Select all" indeterminate />
 * ```
 */

/**
 * Checkbox component for DaisyUI 5.
 *
 * @param {Object} props
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {string} [props.checkboxClassName] - Additional classes for checkbox input
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.color] - Checkbox color: 'primary', 'secondary', etc.
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text (always visible)
 * @param {string} [props.id] - Input ID
 * @param {boolean} [props.indeterminate=false] - Indeterminate state
 * @param {string} [props.label] - Label text
 * @param {string} [props.labelClassName] - Additional classes for label container
 * @param {'left' | 'right'} [props.labelPosition='right'] - Label position
 * @param {string} [props.name] - Input name
 * @param {Function} [props.onChange] - Change handler: (event) => void
 * @param {string} [props.size='md'] - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {*} [props.value] - Input value
 * @param {Object} [props.ref] - Ref for checkbox input (React 19)
 */
const Checkbox =
({
     checked ,
     checkboxClassName ,
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
     labelPosition = 'right' ,
     name ,
     onChange ,
     size = 'md' ,
     value ,

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

    const checkboxClasses = getCheckboxClasses({
        color: hasError ? 'error' : color,
        size,
        className: checkboxClassName,
    }) ;

    // --------- Indeterminate effect

    useEffect(() =>
    {
        if ( internalRef.current )
        {
            internalRef.current.indeterminate = indeterminate ;
        }
    }, [ indeterminate ]) ;

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
                    'label cursor-pointer justify-start gap-3' ,
                    disabled && 'cursor-not-allowed' ,
                    labelClassName
                )}
                htmlFor   = { inputId }
            >
                { labelPosition === 'left' && labelText }

                <input
                    checked        = { checked }
                    className      = { checkboxClasses }
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

Checkbox.displayName = 'Checkbox' ;

export default Checkbox ;