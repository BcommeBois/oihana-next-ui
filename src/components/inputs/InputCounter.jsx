'use client';

import { useRef } from 'react'

import useValue from '../../hooks/useValue'

import clamp from 'vegas-js-core/src/maths/clamp'
import round from 'vegas-js-core/src/maths/round'

import Input from './Input'

import useMergeRefs from '../../hooks/useMergeRefs'

import { MdNumbers as DefaultIcon } from 'react-icons/md'
import { MdAdd as MoreIcon, MdRemove as LessIcon } from 'react-icons/md'

/**
 * InputCounter component - A number input with increment/decrement buttons.
 *
 * InputCounter component - A number input with increment/decrement buttons.
 *
 * @param {Object} props
 * @param {number} [props.defaultValue=0] - Default value
 * @param {number|string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {number} [props.min=0] - Minimum value
 * @param {number} [props.max=999999] - Maximum value
 * @param {number} [props.step=1] - Step increment/decrement
 * @param {number} [props.precision=2] - Decimal precision
 * @param {React.ReactNode} [props.icon] - Icon component (default: NumbersIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {React.ReactNode} [props.lessIcon] - Custom less button icon (default: MdRemove)
 * @param {React.ReactNode} [props.moreIcon] - Custom more button icon (default: MdAdd)
 * @param {boolean} [props.showIcon=true] - Show icon
 * @param {boolean} [props.showStepper=true] - Show increment/decrement buttons
 * @param {string} [props.decreaseLabel='Decrease'] - A11y label for the decrease button
 * @param {string} [props.increaseLabel='Increase'] - A11y label for the increase button
 * @param {boolean} [props.disabled=false] - Disable input and buttons
 * @param {boolean} [props.readOnly=false] - Make input read-only (hides stepper)
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to InputGroup
 *
 * @example
 * // Basic counter
 * <InputCounter defaultValue={18} min={0} max={100} placeholder="Age" />
 */
const InputCounter =
({
    defaultValue = 0,
    onChange: onChangeFromProps,
    value: valueFromProps,

    min = 0,
    max = 999999,
    step = 1,
    precision = 2,

    icon,
    iconClassName,

    decreaseLabel = 'Decrease',
    increaseLabel = 'Increase',

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
    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const internalRef = useRef( null );
    const mergedRef   = useMergeRefs( internalRef , ref ) ;

    const normalizeValue = val =>
    {
        if ( val === null || val === undefined || val === '' || isNaN( val ) )
        {
            return defaultValue ;
        }
        const numVal = typeof val === 'string' ? parseFloat(val) : val ;
        return round( clamp( numVal , min , max ) , precision ) ;
    };

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? (typeof event === 'string' || typeof event === 'number' ? event : '') ;
        setValue( inputValue ) ;
    };

    const handleBlur = event =>
    {
        setValue( normalizeValue( value ) ) ;
        rest.onBlur?.( event ) ;
    };

    const handleLess = event =>
    {
        event?.preventDefault() ;

        const currentValue = value === '' || isNaN(value) ? defaultValue : parseFloat(value) ;
        setValue( normalizeValue( currentValue - step ) ) ;

        requestAnimationFrame(() => internalRef.current?.focus() ) ;
    };

    const handleMore = event =>
    {
        event?.preventDefault() ;

        const currentValue = value === '' || isNaN(value) ? defaultValue : parseFloat(value);
        setValue( normalizeValue( currentValue + step ) ) ;

        requestAnimationFrame(() => internalRef.current?.focus() ) ;
    };

    // Icon element
    const iconElement = showIcon &&
    (
        <div className="flex items-center justify-center opacity-50">
            {icon || <DefaultIcon />}
        </div>
    );

    const numericValue = value === '' || isNaN(value) ? defaultValue : parseFloat(value);

    // Action buttons (stepper)
    const actions = showStepper && !readOnly ?
    [
        <button
            key        = "less"
            type       = "button"
            onClick    = { handleLess }
            disabled   = { disabled || numericValue <= min }
            className  = "btn btn-input join-item btn-square font-semibold"
            aria-label = { decreaseLabel }
            title      = { decreaseLabel }
        >
            { lessIcon || <LessIcon /> }
        </button>,
        <button
            key        = "more"
            type       = "button"
            onClick    = { handleMore }
            disabled   = { disabled || numericValue >= max }
            className  = "btn btn-input join-item btn-square font-semibold"
            aria-label = { increaseLabel }
            title      = { increaseLabel }
        >
            { moreIcon || <MoreIcon /> }
        </button>
    ] : null;

    return (
        <Input
            actions       = { actions }
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            label         = { label }
            legend        = { legend }
            onBlur        = { handleBlur }
            onChange      = { handleChange }
            min           = { min }
            max           = { max }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            step          = { step }
            type          = "number"
            useFieldset   = { useFieldset }
            value         = { value ?? '' }
            { ...rest }
        />
    );
};

InputCounter.displayName = 'InputCounter';

export default InputCounter;