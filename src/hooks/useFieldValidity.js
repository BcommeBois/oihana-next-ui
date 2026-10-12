'use client' ;

import { useEffect , useRef , useState } from 'react' ;

/**
 * When a field should say it is wrong, and who to tell when that changes.
 *
 * 🔑 **Never while typing.** A card number is « invalid » at its third digit ;
 * saying so then is noise. The error shows once the value is **complete** —
 * as long as it can be — or once the reader **left the field**, and stays
 * until it is fixed. An empty field says nothing : « required » is the form's
 * business.
 *
 * `onValidChange( valid )` is called on mount and each time the validity
 * changes — not on every keystroke — for a button that waits for a valid card.
 * The latest callback is always the one called, so an inline function does not
 * fire it on every render.
 *
 * @module hooks/useFieldValidity
 *
 * @param {Object} options
 * @param {boolean} [options.complete=false] - The value is as long as it can be.
 * @param {boolean} [options.empty=false] - Nothing is typed.
 * @param {boolean} [options.enabled=false] - Check at all ; off, no error is ever shown.
 * @param {string} [options.message] - What to say when the value is wrong.
 * @param {Function} [options.onBlur] - The field's own blur handler, called after.
 * @param {Function} [options.onValidChange] - `( valid ) => void`.
 * @param {boolean} options.valid - Whether the value is right.
 *
 * @returns {{ error : ?string , onBlur : Function }} The error to show, and the blur handler to put on the field.
 */
const useFieldValidity = ( { complete = false , empty = false , enabled = false , message , onBlur , onValidChange , valid } ) =>
{
    const [ left , setLeft ] = useState( false ) ;

    const callback = useRef( onValidChange ) ;
    useEffect( () =>
    {
        callback.current = onValidChange ;
    } ) ;

    useEffect( () =>
    {
        callback.current?.( valid ) ;
    }
    , [ valid ] ) ;

    const shown = enabled && !empty && !valid && ( complete || left ) ;

    return {
        error  : shown ? message : null ,
        onBlur : event =>
        {
            setLeft( true ) ;
            onBlur?.( event ) ;
        } ,
    } ;
} ;

export default useFieldValidity ;
