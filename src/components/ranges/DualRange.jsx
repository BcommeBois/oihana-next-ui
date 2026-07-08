'use client' ;

import { useEffect, useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import getRangeClasses    from '../../themes/components/range' ;
import getBackgroundColor from '../../themes/colors/backgroundColor' ;

import styles from './styles/Range.module.css' ;

/**
 * Thumb size (in rem) per DaisyUI range size. The visible track is half of it.
 * @type {Object<string, number>}
 */
const THUMB_REM = { xs : 1, sm : 1.25, md : 1.5, lg : 1.75, xl : 2 } ;

const sortPair = ([ a, b ]) => a <= b ? [ a, b ] : [ b, a ] ;

/**
 * Dual-thumb range — pick both a start and an end value with two draggable
 * handles. Renders two stacked DaisyUI range inputs (with their progress fill
 * neutralized) over a custom rail + selection bar. Horizontal only.
 *
 * The handles cannot cross : the start is clamped to the end and the end to the
 * start, so the emitted pair is always ordered `[start, end]`.
 *
 * Usable standalone, or through the {@link Range} `range` prop.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label.
 * @param {string} [props.helper] - Helper text shown below the field.
 * @param {string} [props.error] - Error text (overrides helper, forces the error color).
 * @param {string} [props.color] - DaisyUI range color (primary, secondary, accent, …).
 * @param {string} [props.size='md'] - Range size (xs, sm, md, lg, xl).
 * @param {number} [props.min=0] - Minimum bound.
 * @param {number} [props.max=100] - Maximum bound.
 * @param {number} [props.step=1] - Step increment.
 * @param {[number, number]} [props.value] - Controlled `[start, end]` tuple.
 * @param {[number, number]} [props.defaultValue] - Uncontrolled initial `[start, end]` tuple.
 * @param {(pair:[number, number]) => void} [props.onChange] - Called with the ordered `[start, end]`.
 * @param {boolean} [props.showValue=false] - Display the current « start – end » value.
 * @param {'top'|'inline'|'bottom'} [props.valuePosition='top'] - Where the value is displayed.
 * @param {(v:number) => (string|number)} [props.formatValue] - Formats each bound.
 * @param {boolean} [props.disabled=false] - Disable both handles.
 * @param {string} [props.className] - Extra classes on the wrapper.
 * @param {string} [props.rangeClassName] - Extra classes on the range inputs.
 * @param {string} [props.id] - Id applied to the start input.
 * @param {string} [props.name] - Base name ; inputs get `${name}-start` / `${name}-end`.
 *
 * @example
 * ```jsx
 * import DualRange from 'oihana-next-ui/components/ranges/DualRange' ;
 *
 * const [ range, setRange ] = useState([ 200, 750 ]) ;
 *
 * <DualRange
 *     label="Price range"
 *     min={ 0 } max={ 1000 } step={ 10 }
 *     value={ range } onChange={ setRange }
 *     showValue formatValue={ v => `€${v}` } color="primary"
 * />
 * ```
 */
const DualRange =
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
    disabled = false,
    className,
    rangeClassName,
    id,
    name,
}) =>
{
    const isControlled = controlledValue !== undefined ;

    // Internal state keeps an ordered [start, end] pair — the handles never cross.
    const [ raw, setRaw ] = useState( () => sortPair( controlledValue ?? defaultValue ?? [ min, max ] ) ) ;

    // Reconcile external (controlled) changes ; the parent echoes back the pair we
    // just emitted, so this is a no-op during an ongoing drag.
    useEffect( () =>
    {
        if ( !isControlled ) return ;

        if ( controlledValue[ 0 ] !== raw[ 0 ] || controlledValue[ 1 ] !== raw[ 1 ] )
        {
            setRaw( sortPair( controlledValue ) ) ;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ controlledValue?.[ 0 ], controlledValue?.[ 1 ] ]) ;

    const commit = ( next ) =>
    {
        // `next` is already ordered by the handlers below.
        setRaw( next ) ;
        onChange?.( next ) ;
    } ;

    // Clamp so the handles never cross : the start can't pass the end and vice versa.
    const handleLow  = ( e ) => commit([ Math.min( Number( e.target.value ), raw[ 1 ] ), raw[ 1 ] ]) ;
    const handleHigh = ( e ) => commit([ raw[ 0 ], Math.max( Number( e.target.value ), raw[ 0 ] ) ]) ;

    const hasError = Boolean( error ) ;

    const [ lo, hi ] = raw ;

    const span  = ( max - min ) || 1 ;
    const loPct = (( lo - min ) / span ) * 100 ;
    const hiPct = (( hi - min ) / span ) * 100 ;

    // When both handles jam together in the upper half, keep the start handle on
    // top so it stays grabbable (otherwise it would sit trapped under the end).
    const lowZ = lo > ( min + max ) / 2 ? 30 : 10 ;

    const thumbRem = THUMB_REM[ size ] ?? THUMB_REM.md ;
    const trackRem = thumbRem / 2 ;

    const rangeClasses = getRangeClasses({
        color : hasError ? 'error' : color,
        size,
        className : rangeClassName,
    }) ;

    const fillColor = hasError ? 'error' : ( color || 'base-content' ) ;
    const fillClass = cn( getBackgroundColor( fillColor ) ) ;

    const fmt = ( v ) => formatValue ? formatValue( v ) : v ;
    const displayValue = `${ fmt( lo ) } – ${ fmt( hi ) }` ;

    const inputProps = ( thumbValue, handler, z ) => ({
        type      : 'range',
        className : cn( rangeClasses, styles.dualRange ),
        min, max, step,
        value     : thumbValue,
        onChange  : handler,
        disabled,
        style     : { zIndex : z },
    }) ;

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

                <div
                    className={ cn( 'relative w-full', disabled && 'opacity-50' ) }
                    style={{ height : `${ thumbRem }rem` }}
                >
                    {/* Rail */}
                    <div
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-base-content/10"
                        style={{ height : `${ trackRem }rem` }}
                    />

                    {/* Selection bar */}
                    <div
                        className={ cn( 'absolute top-1/2 -translate-y-1/2 rounded-full', fillClass ) }
                        style={{
                            height : `${ trackRem }rem`,
                            left   : `${ loPct }%`,
                            width  : `${ hiPct - loPct }%`,
                        }}
                    />

                    <input id={ id } name={ name ? `${ name }-start` : undefined } { ...inputProps( lo, handleLow, lowZ ) } />
                    <input name={ name ? `${ name }-end` : undefined } { ...inputProps( hi, handleHigh, 20 ) } />
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

DualRange.displayName = 'DualRange' ;

export default DualRange ;
