'use client' ;

import { useId } from 'react'

import cn                from '@/themes/helpers/cn'
import getActionElements from '@/components/helpers/getActionElements'
import useTransformValue from '@/hooks/useTransformValue'
import getInputClasses   from '@/themes/components/input'

/**
 * Input component with optional icon, action buttons, error states, transformations, and HTML5 validation.
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} [props.actions] - Action button(s) on the right
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.color] - DaisyUI color: 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'
 * @param {string} [props.size] - DaisyUI size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.style] - DaisyUI style: 'ghost'
 * @param {string} [props.error] - Error message (changes input/buttons color to error)
 * @param {string} [props.helper] - Helper text below the input (always visible)
 * @param {string} [props.validatorHint] - Validation hint text (only visible when validation fails)
 * @param {string} [props.label] - Label text above the input
 * @param {string} [props.legend] - Legend text (if using fieldset pattern)
 * @param {string} [props.id] - Input ID
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder] - Input placeholder
 * @param {React.ReactNode} [props.icon] - Icon component to display on the left
 * @param {string} [props.iconClassName] - Additional classes for the icon container
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend instead of label
 * @param {boolean} [props.useValidator=false] - Enable DaisyUI validator styling
 * @param {boolean} [props.required=false] - HTML5 required attribute
 * @param {string} [props.pattern] - HTML5 pattern attribute (regex)
 * @param {number} [props.minLength] - HTML5 minlength attribute
 * @param {number} [props.maxLength] - HTML5 maxlength attribute
 * @param {number} [props.min] - HTML5 min attribute (for number/date inputs)
 * @param {number} [props.max] - HTML5 max attribute (for number/date inputs)
 * @param {string} [props.title] - HTML5 title attribute (validation message)
 * @param {string|number} [props.defaultValue] - Default value
 * @param {string|number} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.transform] - Transform input before storing
 * @param {Function} [props.validate] - Validate value before onChange
 * @param {Function} [props.format] - Format value for display only
 * @param {Function} [props.process] - Process value before sending to onChange
 * @param {Function} [props.processOnBlur] - Additional processing on blur
 * @param {boolean} [props.revertOnBlurIfInvalid=true] - Revert to previous value on blur if invalid
 * @param {Object} props.inputProps - Additional props for the input element
 *
 * @example
 * // Simple input with icon
 * <InputGroup icon={<SearchIcon />} placeholder="Search..." />
 *
 * @example
 * // With transformations
 * <InputGroup
 *     transform={(v) => v.toUpperCase()}
 *     placeholder="Enter code"
 * />
 */
const Input =
({
    actions,
    className,
    color,
    size,
    style,
    label,
    legend,
    helper,
    error,
    validatorHint,
    id,
    ref,
    type = 'text',
    placeholder,
    icon,
    iconClassName,
    useFieldset = false,
    useValidator = false,
    required = false,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    title,

    defaultValue,
    value: valueFromProps,
    onChange: onChangeFromProps,
    transform,
    validate,
    format,
    process,
    processOnBlur,
    revertOnBlurIfInvalid = true,

    ...inputProps
}) =>
{
    const fallbackId = useId() ;
    const inputId    = id || fallbackId ;
    const helperId   = `${inputId}-helper` ;

    const hasError       = Boolean( error ) ;
    const validatorClass = useValidator ? 'validator' : '' ;

    const inputClasses = cn( getInputClasses({
            color: hasError ? 'error' : color,
            size,
            style
        }),
        'join-item grow',
        validatorClass
    ) ;

    // --------- Use transform hook (optimized for simple cases)

    const { displayValue, handleChange , handleBlur : handleTransformBlur } = useTransformValue({
        defaultValue,
        value: valueFromProps,
        onChange: onChangeFromProps,
        transform,
        validate,
        format,
        process,
        processOnBlur,
        onBlur: inputProps.onBlur,
        revertOnBlurIfInvalid
    }) ;

    // --------- Action buttons

    const actionElements = getActionElements( actions, hasError ) ;

    const inputGroup =
    (
        <>
            <div className="join">
                <label className={ inputClasses }>

                    { icon && (
                        <div className={ cn( 'label' , iconClassName ) }>
                            { icon }
                        </div>
                    )}

                    <input
                        aria-invalid     = { hasError }
                        aria-describedby = { error || helper ? helperId : undefined } // ⬅️ Relie le texte d'aide
                        id               = { inputId }
                        ref              = { ref }
                        type             = { type }
                        className        = "grow"
                        placeholder      = { placeholder }
                        required         = { required }
                        pattern          = { pattern }
                        minLength        = { minLength }
                        maxLength        = { maxLength }
                        min              = { min }
                        max              = { max }
                        title            = { title }
                        value            = { displayValue }
                        onChange         = { handleChange }
                        onBlur           = { handleTransformBlur }
                        { ...inputProps }
                    />
                </label>

                { actionElements }
            </div>

            {
                error ? (
                    <p id={ helperId } className="label text-xs text-error">
                        { error }
                    </p>
                ) : helper ? (
                    <p id={ helperId } className="label text-xs text-base-content/70">
                        { helper }
                    </p>
                ) : null
            }

            {
                useValidator && validatorHint && (
                    <p className="validator-hint hidden">
                        { validatorHint }
                    </p>
                )
            }
        </>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full', className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { inputGroup }
            </fieldset>
        ) ;
    }

    return (
        <div
            className = { cn( 'flex flex-col gap-2', className ) }
        >
            { label && (
                <label
                    htmlFor   = { inputId }
                    className = "label"
                >
                    { label }
                </label>
            )}
            { inputGroup }
        </div>
    ) ;
} ;

export default Input ;