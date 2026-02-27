import { useState } from 'react' ;

/**
 * React hook to manage controlled and uncontrolled component values.
 *
 * @template T
 * @param {T} [defaultValue] - The initial value for uncontrolled mode.
 * @param {T} [valueFromProps] - The controlled value from props.
 * @param {(value: T) => void} [onChangeFromProps] - The callback when value changes.
 *
 * @returns {[ T , (value: T) => void , boolean ]} A tuple with current value, setter, and controlled state.
 *
 * @example
 * ```js
 * // Uncontrolled usage
 * const [ value , setValue ] = useValue( 'default' ) ;
 *
 * // Controlled usage
 * const [ value , setValue ] = useValue( undefined , propValue , onPropChange ) ;
 * ```
 */
const useValue = ( defaultValue , valueFromProps , onChangeFromProps ) =>
{
    const isControlled = valueFromProps !== undefined ;

    const [ internalValue , setInternalValue ] = useState( defaultValue ) ;

    const value = isControlled ? valueFromProps : internalValue ;

    const setValue = ( newValue ) =>
    {
        if ( typeof onChangeFromProps === 'function' )
        {
            onChangeFromProps( newValue ) ;
        }

        if ( !isControlled )
        {
            setInternalValue( newValue ) ;
        }
    } ;

    return [ value , setValue , isControlled ] ;
} ;

export default useValue ;