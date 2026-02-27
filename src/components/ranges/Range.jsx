'use client' ;

import { useState } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import getRangeClasses from '@/themes/components/range' ;

const Range =
({
    label,
    helper,
    error,
    color,
    size = 'md',
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
        size,
        className: rangeClassName,
    }) ;

    // Generate markers
    const markers = showMarkers ? (() =>
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

    // Generate marker labels
    const labels = markerLabels ? markerLabels.map(( label, i ) => (
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

                <div className="flex-1 max-w-full">
                    <input
                        type="range"
                        id={ id }
                        name={ name }
                        className={ cn( rangeClasses, 'w-full' ) }
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