'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import getRangeClasses from '../../themes/components/range' ;

import DualRange from './DualRange' ;

/**
 * Range slider — a single-thumb DaisyUI range with label / helper / error,
 * value display, markers and vertical orientation.
 *
 * Set the **`range`** prop to switch to a **dual-thumb** range (pick a start and
 * an end value) ; it delegates to {@link DualRange}, where `value` /
 * `defaultValue` are `[start, end]` tuples and `onChange` receives a sorted
 * `[start, end]`. `DualRange` can also be imported and used on its own.
 *
 * @param {Object} props
 * @param {boolean} [props.range=false] - Enable the dual-thumb (start + end) mode.
 */
const Range =
({
    range = false,
    label,
    helper,
    error,
    color,
    size = 'md',
    orientation = 'horizontal',
    height = 'h-64',
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue,
    onChange,
    showValue = false,
    valuePosition = 'top',
    formatValue,
    showMarkers = false,
    markerLabels,
    disabled = false,
    className,
    rangeClassName,
    rangeRef,
    id,
    name,
    ...rangeProps
}) =>
{
    // Dual-thumb mode (start + end). Horizontal only for now.
    if ( range )
    {
        return (
            <DualRange
                label={ label }
                helper={ helper }
                error={ error }
                color={ color }
                size={ size }
                min={ min }
                max={ max }
                step={ step }
                value={ controlledValue }
                defaultValue={ defaultValue }
                onChange={ onChange }
                showValue={ showValue }
                valuePosition={ valuePosition }
                formatValue={ formatValue }
                disabled={ disabled }
                className={ className }
                rangeClassName={ rangeClassName }
                id={ id }
                name={ name }
            />
        ) ;
    }

    const isVertical = orientation === 'vertical' ;

    const isControlled = controlledValue !== undefined ;
    const [ internalValue, setInternalValue ] = useState( defaultValue ?? min ) ;

    const currentValue = isControlled ? controlledValue : internalValue ;

    const handleChange = ( e ) =>
    {
        const newValue = Number( e.target.value ) ;

        if ( !isControlled )
        {
            setInternalValue( newValue ) ;
        }

        onChange?.( newValue ) ;
    } ;

    const hasError = Boolean( error ) ;

    const rangeClasses = getRangeClasses({
        color: hasError ? 'error' : color,
        orientation,
        size,
        className: rangeClassName,
    }) ;

    // Generate markers (horizontal only — vertical markers are not supported yet)
    const markers = ( showMarkers && !isVertical ) ? (() =>
    {
        const count = Math.floor(( max - min ) / step ) + 1 ;
        const items = [] ;

        for ( let i = 0 ; i < count ; i++ )
        {
            items.push(
                <span key={ i } className="text-xs">|</span>
            ) ;
        }

        return items ;
    })() : null ;

    // Generate marker labels (horizontal only)
    const labels = ( markerLabels && !isVertical ) ? markerLabels.map(( label, i ) => (
        <span key={ i } className="text-xs">{ label }</span>
    )) : null ;

    // Format display value
    const displayValue = formatValue
        ? formatValue( currentValue )
        : currentValue ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn(
            'text-xs mt-1',
            error ? 'text-error' : 'text-base-content/70'
        )}>
            { error || helper }
        </p>
    ) ;

    return (
        <div className={ cn( 'flex flex-col gap-2', className ) }>
            { label && (
                <div className="flex items-baseline gap-4">
                    <label htmlFor={ id } className="text-sm font-medium">
                        { label }
                    </label>
                    { showValue && valuePosition === 'top' && (
                        <span className="text-sm font-semibold tabular-nums ml-auto">
                            { displayValue }
                        </span>
                    )}
                </div>
            )}

            <div className={ cn
            (
                'flex',
                valuePosition === 'inline' ? 'items-center gap-4' : 'flex-col'
            )}>
                { valuePosition === 'inline' && showValue && (
                    <span className="text-sm font-semibold tabular-nums shrink-0">
                        { displayValue }
                    </span>
                )}

                <div className={ cn( isVertical ? height : 'flex-1 max-w-full' ) }>
                    <input
                        type="range"
                        id={ id }
                        name={ name }
                        className={ cn( rangeClasses, !isVertical && 'w-full' ) }
                        min={ min }
                        max={ max }
                        step={ step }
                        value={ currentValue }
                        onChange={ handleChange }
                        disabled={ disabled }
                        ref={ rangeRef }
                        { ...rangeProps }
                    />

                    { showMarkers && markers && (
                        <div className="flex justify-between px-2 mt-2 w-full">
                            { markers }
                        </div>
                    )}

                    { labels && (
                        <div className="flex justify-between px-2 mt-2 w-full">
                            { labels }
                        </div>
                    )}
                </div>
            </div>

            { showValue && valuePosition === 'bottom' && (
                <div className="flex justify-center">
                    <span className="text-sm font-semibold tabular-nums">{ displayValue }</span>
                </div>
            )}

            { helperOrError }
        </div>
    ) ;
} ;

Range.displayName = 'Range' ;

export default Range ;
