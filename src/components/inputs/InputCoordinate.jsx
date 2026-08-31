'use client' ;

/**
 * One half of a position, masked.
 *
 * @module components/inputs/InputCoordinate
 */

import { useCallback , useEffect , useMemo , useRef , useState } from 'react' ;

import { maskitoTransform } from '@maskito/core' ;
import { maskitoNumberOptionsGenerator } from '@maskito/kit' ;
import { useMaskito } from '@maskito/react' ;

import clamp from 'vegas-js-core/src/maths/clamp' ;

import readInputValue from '../../helpers/react/readInputValue' ;

import useMergeRefs from '../../hooks/useMergeRefs' ;
import useValue     from '../../hooks/useValue' ;

import Input from './Input' ;

/** @typedef {'latitude' | 'longitude'} CoordinateAxis */

export const LATITUDE  = 'latitude' ;
export const LONGITUDE = 'longitude' ;

/**
 * How far each axis goes.
 *
 * A latitude beyond ±90 does not exist, and a longitude beyond ±180 has wrapped
 * round the world — so the bounds are the axis, not a setting.
 *
 * @type {Object.<CoordinateAxis,{ min : number , max : number }>}
 */
const BOUNDS =
{
    [ LATITUDE  ] : { min : -90  , max : 90  } ,
    [ LONGITUDE ] : { min : -180 , max : 180 } ,
} ;

/** Six decimals is about eleven centimetres, which is finer than any address needs. */
const DEFAULT_DIGITS = 6 ;

/**
 * A masked field for one coordinate.
 *
 * **The mask is not decoration.** A coordinate is signed, has no thousand
 * separator, and its useful precision is fixed — three properties a plain
 * number field gets wrong in three different ways, the worst being a `1 234`
 * that no longer parses.
 *
 * **While the field holds focus, the mask owns the string.** Handing the model
 * back to the input on every keystroke would overwrite what is being typed :
 * `48.8` is not yet a latitude, and reformatting it mid-word makes the field
 * unusable. So the display and the model are two values, and they only meet on
 * blur — the same arrangement `InputCurrency` arrived at.
 *
 * @param {Object} props
 * @param {CoordinateAxis} [props.axis='latitude'] - Which half, and therefore which bounds.
 * @param {number} [props.defaultValue] - Initial value, uncontrolled.
 * @param {number} [props.digits=6] - Decimals kept.
 * @param {Function} [props.onBlur] - Blur handler, called after the value settles.
 * @param {Function} [props.onChange] - `( number|null ) => void`.
 * @param {Function} [props.onFocus] - Focus handler.
 * @param {*} [props.ref] - Ref on the input element.
 * @param {number} [props.value] - Controlled value.
 *
 * @example
 * ```jsx
 * <InputCoordinate axis="longitude" label="Longitude" value={ lng } onChange={ setLng } />
 * ```
 */
const InputCoordinate =
({
    axis = LATITUDE ,
    defaultValue ,
    digits = DEFAULT_DIGITS ,
    onBlur  : onBlurFromProps ,
    onChange : onChangeFromProps ,
    onFocus : onFocusFromProps ,
    ref ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const { max , min } = BOUNDS[ axis ] ?? BOUNDS[ LATITUDE ] ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const internalRef = useRef( null ) ;

    const maskOptions = useMemo( () => maskitoNumberOptionsGenerator({
        decimalSeparator      : '.' ,
        max ,
        maximumFractionDigits : digits ,
        min ,
        minimumFractionDigits : 0 ,
        thousandSeparator     : '' ,
    })
    , [ digits , max , min ] ) ;

    const maskedRef = useMaskito({ options : maskOptions }) ;
    const mergedRef = useMergeRefs( maskedRef , internalRef , ref ) ;

    const toDisplayString = useCallback( ( number ) =>
        Number.isFinite( number ) ? maskitoTransform( String( number ) , maskOptions ) : ''
    , [ maskOptions ] ) ;

    const [ displayValue , setDisplayValue ] = useState( () => toDisplayString( valueFromProps ?? defaultValue ) ) ;

    const isFocused = useRef( false ) ;

    // Out of focus the display follows the model — which is how a drag on a map
    // reaches the field without fighting whoever is typing in it.
    useEffect( () =>
    {
        if ( !isFocused.current )
        {
            setDisplayValue( toDisplayString( value ) ) ;
        }
    }
    , [ toDisplayString , value ] ) ;

    const handleFocus = ( event ) =>
    {
        isFocused.current = true ;
        onFocusFromProps?.( event ) ;
    } ;

    const handleBlur = ( event ) =>
    {
        isFocused.current = false ;

        // Only now is the value settled : out of range it is pulled back in, and
        // an unreadable field empties rather than keeping half a number.
        const settled = Number.isFinite( value ) ? clamp( value , min , max ) : null ;

        setValue( settled ) ;
        setDisplayValue( toDisplayString( settled ) ) ;

        onBlurFromProps?.( event ) ;
    } ;

    const handleChange = ( event ) =>
    {
        const text = readInputValue( event ) ;

        setDisplayValue( text ) ;

        const parsed = Number.parseFloat( text ) ;

        setValue( Number.isFinite( parsed ) ? parsed : null ) ;
    } ;

    return (
        <Input
            inputMode = "decimal"
            onBlur    = { handleBlur }
            onChange  = { handleChange }
            onFocus   = { handleFocus }
            ref       = { mergedRef }
            value     = { displayValue }
            { ...rest }
        />
    ) ;
} ;

InputCoordinate.displayName = 'InputCoordinate' ;

export default InputCoordinate ;
