/**
 * Calls a function with the given value only if the value is defined (not null or undefined).
 *
 * Unlike the `!!value` check, this correctly handles falsy values
 * like `0` or `''` which may be valid inputs.
 *
 * @param {Function} fn - The function to call.
 * @param {*} value - The value to check and pass.
 * @param {...*} args - Additional arguments forwarded to the function.
 *
 * @returns {*} The function result, or null if the value is not defined.
 *
 * @example
 * ```js
 * applyIfDefined( getMargin , 4 ) ;
 * // → { 'm-4': true }
 *
 * applyIfDefined( getMargin , 0 ) ;
 * // → { 'm-0': true }
 *
 * applyIfDefined( getMargin , null ) ;
 * // → null
 *
 * applyIfDefined( getMargin , undefined ) ;
 * // → null
 *
 * applyIfDefined( getPadding , 2 , { direction: 't' } ) ;
 * // → { 'pt-2': true }
 * ```
 */
const applyIfDefined = ( fn , value , ...args ) => value != null ? fn( value , ...args ) : null ;

export default applyIfDefined ;