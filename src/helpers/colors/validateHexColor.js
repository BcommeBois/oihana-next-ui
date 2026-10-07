/**
 * Is this string a hexadecimal color ?
 *
 * Three questions, which an application rarely answers the same way twice :
 * how many digits it accepts, whether an alpha channel is one of them, and
 * whether the `#` is part of what it stores.
 *
 * ### 🔑 Why the second argument takes an object
 *
 * It took a boolean — `alpha` — and that answered one of the three. Gathered
 * from an application that wrote `` /^#[a-fA-F0-9]{6}$/ `` **in sixteen files**
 * rather than call this, because it needed the other two : six digits exactly,
 * and the `#` required. A boolean could not say that, so nobody asked.
 *
 * The boolean still works and means what it always did.
 *
 * ⚠️ **`digits` given explicitly IS the answer**, and `alpha` is then not
 * consulted : a caller naming the lengths has already decided. `alpha` governs
 * the DEFAULT set, where it says whether the two lengths that carry an alpha
 * channel belong to it.
 *
 * @module helpers/colors/validateHexColor
 *
 * @param {*} color - The string to test. Anything else is false.
 * @param {boolean|Object} [options=false] - A boolean for `alpha`, as before, or the options below.
 * @param {boolean} [options.alpha=false] - Accept the two lengths that carry an alpha channel.
 * @param {number|number[]} [options.digits] - The digit counts to accept, `#` excluded. Defaults to 3 and 6, plus 4 and 8 when `alpha`.
 * @param {string} [options.hash='optional'] - Whether a leading `#` is {@link HASH_REQUIRED}, {@link HASH_FORBIDDEN}, or neither.
 *
 * @returns {boolean}
 *
 * @example
 * ```js
 * validateHexColor( 'FFF' ) ;                 // true
 * validateHexColor( '#FFFFFF' ) ;             // true
 * validateHexColor( 'FFFFFFFF' , true ) ;     // true  — the boolean still works
 * validateHexColor( 'FFFFFFFF' ) ;            // false
 * ```
 *
 * @example
 * ```js
 * // « A color exactly as this API stores it »
 * validateHexColor( color , { digits : 6 , hash : HASH_REQUIRED } ) ;
 * ```
 */

import isString from 'vegas-js-core/src/isString' ;

/** A leading `#` is accepted and not required — what this helper always did. @type {string} */
export const HASH_OPTIONAL = 'optional' ;

/** A leading `#` must be there. @type {string} */
export const HASH_REQUIRED = 'required' ;

/** A leading `#` makes it invalid — for a value stored without one. @type {string} */
export const HASH_FORBIDDEN = 'forbidden' ;

/** The digit counts accepted when nobody says, with and without an alpha channel. @type {Object<string,number[]>} */
const DEFAULT_DIGITS =
{
    opaque : [ 3 , 6 ] ,
    alpha  : [ 3 , 4 , 6 , 8 ] ,
} ;

export const validateHexColor = ( color , options = false ) =>
{
    if ( !isString( color ) )
    {
        return false ;
    }

    const { alpha = false , digits , hash = HASH_OPTIONAL } =
        typeof options === 'object' && options !== null
             ? options
             : { alpha : Boolean( options ) } ;

    const hashed = color.charAt( 0 ) === '#' ;

    if ( hashed && hash === HASH_FORBIDDEN ) { return false ; }
    if ( !hashed && hash === HASH_REQUIRED ) { return false ; }

    const body = hashed ? color.substring( 1 ) : color ;

    const accepted = digits === undefined
        ? ( alpha ? DEFAULT_DIGITS.alpha : DEFAULT_DIGITS.opaque )
        : ( Array.isArray( digits ) ? digits : [ digits ] ) ;

    return accepted.includes( body.length ) && /^[0-9A-F]+$/i.test( body ) ;
} ;

export default validateHexColor ;
