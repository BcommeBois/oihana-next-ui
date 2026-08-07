/**
 * Reads the value carried by a change notification, whether it arrives as a DOM
 * event or as the bare value.
 *
 * `Input` and `TextArea` never hand their `onChange` the DOM event: both route it
 * through `useTransformValue`, which emits the transformed value alone. A handler
 * written as `event => event.target.value` therefore reads `undefined` on every
 * keystroke. This helper accepts both shapes so a component can be wired to either
 * `Input` or a raw `<input>` without its handler caring which.
 *
 * Numbers pass through untouched: a `process` prop may legitimately turn the value
 * into one before `onChange` sees it.
 *
 * @param {Event|string|number|null} [source] - A DOM change event, or the value itself.
 * @param {*} [fallback=''] - Returned when `source` carries no usable value.
 *
 * @returns {string|number|*} The value, or `fallback`.
 *
 * @example
 * ```js
 * readInputValue( domEvent ) ;  // → domEvent.target.value
 * readInputValue( '12,50' ) ;   // → '12,50'
 * readInputValue( 42 ) ;        // → 42
 * readInputValue( null ) ;      // → ''
 * readInputValue( null , 0 ) ;  // → 0
 * ```
 */
const readInputValue = ( source , fallback = '' ) =>
{
    if ( source?.target )
    {
        return source.target.value ?? fallback ;
    }

    const type = typeof source ;

    return type === 'string' || type === 'number' ? source : fallback ;
} ;

export default readInputValue ;
