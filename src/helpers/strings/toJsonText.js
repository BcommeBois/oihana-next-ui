/**
 * Pretty-prints a value, and never throws.
 *
 * 🔑 **It degrades rather than failing.** A cyclic object, a `BigInt`, a proxy
 * that throws on read — `JSON.stringify` raises on all three, and the places
 * this is used are places opened to LOOK at a value that is already suspect : a
 * payload inspector, a secret about to be saved. Throwing there would take down
 * the one screen able to explain what is wrong, so the value falls back to its
 * `String()` form instead.
 *
 * A string is returned untouched, so a caller holding an already-formatted
 * payload hands it straight over.
 *
 * @module helpers/strings/toJsonText
 *
 * @param {*} value - Any value.
 * @returns {string} The indented JSON, the string as given, or the `String()` form.
 *
 * @example
 * ```js
 * toJsonText( { a : 1 } ) ;      // '{\n  "a": 1\n}'
 * toJsonText( 'already text' ) ; // 'already text'
 * ```
 */
const toJsonText = ( value ) =>
{
    if ( typeof value === 'string' ) { return value ; }

    try
    {
        return JSON.stringify( value , null , 2 ) ;
    }
    catch
    {
        return String( value ) ;
    }
} ;

export default toJsonText ;
