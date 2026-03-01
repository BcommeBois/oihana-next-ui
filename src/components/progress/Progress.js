'use client' ;

import getProgressClasses from '../../themes/components/progress' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Progress bar component for DaisyUI 5.
 *
 * @module components/Progress
 * @see https://daisyui.com/components/progress
 *
 * @example
 * ```jsx
 * // Simple
 * <Progress value={40} />
 *
 * // With label and percentage
 * <Progress
 *     label="Loading"
 *     value={75}
 *     max={100}
 *     showValue
 *     color="primary"
 * />
 *
 * // Indeterminate (loading)
 * <Progress label="Processing..." color="primary" />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} [props.label] - Label text
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.error] - Error message
 * @param {string} [props.color] - Progress color: 'primary', 'secondary', etc.
 * @param {number} [props.value] - Current value (omit for indeterminate)
 * @param {number} [props.max=100] - Maximum value
 * @param {boolean} [props.showValue=false] - Show percentage/value
 * @param {Function} [props.formatValue] - Format displayed value: (value, max) => string
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.progressClassName] - Additional classes for progress bar
 * @param {*} [props.progressRef] - Ref for progress element
 * @param {string} [props.id] - Progress ID
 * @param {Object} [props.progressProps] - Additional props for progress element
 */
const Progress =
({
    label,
    helper,
    error,
    color,
    value,
    max = 100,
    showValue = false,
    formatValue,
    className,
    progressClassName,
    progressRef,
    id,
    ...progressProps
}) =>
{
    const hasError = Boolean( error ) ;
    const isIndeterminate = value === undefined ;

    const progressClasses = getProgressClasses({
        color: hasError ? 'error' : color,
        className: progressClassName,
    }) ;

    // Format display value
    const displayValue = formatValue
        ? formatValue( value, max )
        : isIndeterminate
            ? null
            : `${Math.round(( value / max ) * 100 )}%` ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn(
            'text-xs mt-1',
            error ? 'text-error' : 'text-base-content/70'
        )}>
            { error || helper }
        </p>
    ) ;

    return (
        <div className={ cn( 'flex flex-col gap-2 w-full', className ) }>
            { ( label || ( showValue && !isIndeterminate )) && (
                <div className="flex items-baseline gap-4">
                    { label && (
                        <label htmlFor={ id } className="text-sm font-medium">
                            { label }
                        </label>
                    )}
                    { showValue && !isIndeterminate && (
                        <span className="text-sm font-semibold tabular-nums ml-auto">
                            { displayValue }
                        </span>
                    )}
                </div>
            )}

            <progress
                id={ id }
                className={ cn( progressClasses, 'w-full' ) }
                value={ value }
                max={ max }
                ref={ progressRef }
                { ...progressProps }
            />

            { helperOrError }
        </div>
    ) ;
} ;

Progress.displayName = 'Progress' ;

export default Progress ;