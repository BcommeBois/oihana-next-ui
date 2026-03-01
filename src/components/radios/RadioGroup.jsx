'use client' ;

import { useState } from 'react' ;

import Radio from './Radio' ;

import cn from '../../themes/helpers/cn' ;

/**
 * RadioGroup component - Manages a group of radio buttons.
 *
 * @module components/RadioGroup
 *
 * @example
 * ```jsx
 * // Simple
 * <RadioGroup
 *     name="plan"
 *     options={[
 *         { value: 'free', label: 'Free' },
 *         { value: 'pro', label: 'Pro' },
 *         { value: 'enterprise', label: 'Enterprise' },
 *     ]}
 * />
 *
 * // Controlled
 * <RadioGroup
 *     name="size"
 *     value={size}
 *     onChange={setSize}
 *     options={[
 *         { value: 'small', label: 'Small' },
 *         { value: 'medium', label: 'Medium' },
 *         { value: 'large', label: 'Large' },
 *     ]}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} props.name - Radio group name (required)
 * @param {Array} props.options - Array of options: [{ value, label, helper?, disabled? }]
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Default value (uncontrolled)
 * @param {Function} [props.onChange] - Change handler: (value) => void
 * @param {string} [props.label] - Group label
 * @param {string} [props.legend] - Group legend (if using fieldset)
 * @param {string} [props.helper] - Group helper text
 * @param {string} [props.error] - Group error message
 * @param {string} [props.color] - Radio color for all options
 * @param {string} [props.size='md'] - Size for all radios
 * @param {'left' | 'right'} [props.labelPosition='right'] - Label position for all radios
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend wrapper
 * @param {boolean} [props.disabled=false] - Disable all radios
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.radioClassName] - Additional classes for each radio
 * @param {'vertical' | 'horizontal' | 'grid'} [props.layout='vertical'] - Layout direction
 */
const RadioGroup = ({
    name,
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    legend,
    helper,
    error,
    color,
    size = 'md',
    labelPosition = 'right',
    useFieldset = false,
    disabled = false,
    className,
    radioClassName,
    layout = 'vertical',
}) =>
{
    const isControlled = controlledValue !== undefined ;
    const [ internalValue, setInternalValue ] = useState( defaultValue ) ;

    const currentValue = isControlled ? controlledValue : internalValue ;

    const handleChange = ( e ) =>
    {
        const newValue = e.target.value ;

        if ( !isControlled )
        {
            setInternalValue( newValue ) ;
        }

        onChange?.( newValue ) ;
    } ;

    const hasError = Boolean( error ) ;

    const layoutClasses = {
        vertical   : 'flex flex-col gap-2',
        horizontal : 'flex flex-row gap-4',
        grid       : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3',
    } ;

    const radios = options.map(( option, index ) => (
        <Radio
            key={ option.value || index }
            name={ name }
            value={ option.value }
            label={ option.label }
            helper={ option.helper }
            color={ hasError ? 'error' : ( option.color || color ) }
            size={ option.size || size }
            labelPosition={ option.labelPosition || labelPosition }
            checked={ currentValue === option.value }
            disabled={ disabled || option.disabled }
            onChange={ handleChange }
            className={ radioClassName }
        />
    )) ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn(
            'text-xs mt-2',
            error ? 'text-error' : 'text-base-content/70'
        )}>
            { error || helper }
        </p>
    ) ;

    const radioGroup = (
        <>
            <div className={ layoutClasses[layout] }>
                { radios }
            </div>
            { helperOrError }
        </>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full', className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { radioGroup }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-2', className ) }>
            { label && (
                <label className="label">
                    { label }
                </label>
            )}
            { radioGroup }
        </div>
    ) ;
} ;

RadioGroup.displayName = 'RadioGroup' ;

export default RadioGroup ;