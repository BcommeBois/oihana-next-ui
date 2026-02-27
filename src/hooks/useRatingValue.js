import { useState } from 'react' ;

/**
 * Shared hook for rating value management (controlled/uncontrolled).
 *
 * @param {number} [defaultValue] - Default value for uncontrolled mode
 * @param {number} [controlledValue] - Controlled value
 * @param {Function} [onChange] - Change handler
 * @param {boolean} [readOnly=false] - Read-only mode
 * @param {boolean} [disabled=false] - Disabled mode
 *
 * @returns {{ currentValue: number, handleChange: Function, isControlled: boolean }}
 */
const useRatingValue =
({
    defaultValue,
    controlledValue,
    onChange,
    readOnly = false,
    disabled = false,
}) =>
{
    const isControlled = controlledValue !== undefined ;
    const [ internalValue, setInternalValue ] = useState( defaultValue ?? 0 ) ;

    const currentValue = isControlled ? controlledValue : internalValue ;

    const handleChange = ( newValue ) =>
    {
        if ( readOnly || disabled )
        {
            return ;
        }

        if ( !isControlled )
        {
            setInternalValue( newValue ) ;
        }

        onChange?.( newValue ) ;
    } ;

    return {
        currentValue,
        handleChange,
        isControlled,
    } ;
} ;

export default useRatingValue ;