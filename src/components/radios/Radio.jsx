'use client' ;

import cn from '../../themes/helpers/cn' ;
import getRadioClasses from '../../themes/components/radio' ;

/**
 * Radio component for DaisyUI 5.
 *
 * @module components/Radio
 * @see https://daisyui.com/components/radio
 *
 * @example
 * ```jsx
 * // Simple (same name for group)
 * <Radio name="plan" value="free" label="Free" />
 * <Radio name="plan" value="pro" label="Pro" defaultChecked />
 *
 * // Controlled
 * <Radio
 *     name="size"
 *     value="large"
 *     label="Large"
 *     checked={size === 'large'}
 *     onChange={(e) => setSize(e.target.value)}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} props.name - Radio group name (required - must be same for related radios)
 * @param {string} [props.value] - Radio value
 * @param {string} [props.label] - Label text
 * @param {'left' | 'right'} [props.labelPosition='right'] - Label position
 * @param {string} [props.labelClassName] - Additional classes for label container
 * @param {string} [props.helper] - Helper text (always visible)
 * @param {string} [props.error] - Error message
 * @param {string} [props.color] - Radio color: 'primary', 'secondary', etc.
 * @param {string} [props.size='md'] - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {Function} [props.onChange] - Change handler: (event) => void
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.radioClassName] - Additional classes for radio input
 * @param {*} [props.radioRef] - Ref for radio input
 * @param {string} [props.id] - Input ID
 * @param {Object} [props.radioProps] - Additional props for radio input
 */
const Radio =
({
    name,
    value,
    label,
    labelPosition = 'right',
    labelClassName,
    helper,
    error,
    color,
    size = 'md',
    checked,
    defaultChecked,
    disabled = false,
    onChange,
    className,
    radioClassName,
    radioRef,
    id,
    ...radioProps
}) =>
{
    const hasError = Boolean( error ) ;

    const radioClasses = getRadioClasses({
        color: hasError ? 'error' : color,
        size,
        className: radioClassName,
    }) ;

    const radioElement = (
        <input
            type="radio"
            id={ id }
            name={ name }
            value={ value }
            className={ radioClasses }
            checked={ checked }
            defaultChecked={ defaultChecked }
            disabled={ disabled }
            onChange={ onChange }
            ref={ radioRef }
            { ...radioProps }
        />
    ) ;

    const labelText = label && (
        <span className={ cn(
            'label-text',
            disabled && 'opacity-60'
        )}>
            { label }
        </span>
    ) ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn(
            'text-xs mt-1',
            error ? 'text-error' : 'text-base-content/70'
        )}>
            { error || helper }
        </p>
    ) ;

    return (
        <div className={ cn( 'flex flex-col gap-1', className ) }>
            <label className={ cn
            (
                'label cursor-pointer justify-start gap-2',
                disabled && 'cursor-not-allowed',
                labelClassName
            )}>
                { labelPosition === 'left' && labelText }
                { radioElement }
                { labelPosition === 'right' && labelText }
            </label>
            { helperOrError }
        </div>
    ) ;
} ;

Radio.displayName = 'Radio' ;

export default Radio ;