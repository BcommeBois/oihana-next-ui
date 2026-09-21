/**
 * Sets a cookie (without localStorage), its value ENCODED.
 *
 * The value goes through `encodeURIComponent`, the mirror of what the server
 * does on the way back : Next's `cookies().get( key ).value` returns it DECODED
 * already. A raw value holding a space, a `;` or a `%` would otherwise write a
 * malformed pair, which the server's cookie parser drops without a word.
 *
 * 🚨 **Server side, never decode a second time.** `cookies().get( key ).value`
 * is the value as written : decoding it again breaks on any `%` it contains
 * (`100%` would come back empty).
 *
 * @module helpers/storage/setCookie
 *
 * @param {string}        key               - Cookie name.
 * @param {*}             value             - Cookie value, stringified then encoded.
 * @param {Object|number} [options]         - Options — or, the pre-0.21 form, the max-age itself.
 * @param {number}        [options.maxAge]  - Max-age in seconds. Defaults to {@link module:helpers/storage/cookieMaxAge} (one year).
 * @returns {void}
 *
 * @example
 * ```js
 * setCookie( 'search__products' , 'planche 2%' ) ; // search__products=planche%202%25
 * ```
 */

import COOKIE_MAX_AGE from './cookieMaxAge' ;

const setCookie = ( key , value , options ) =>
{
    const maxAge = typeof options === 'number'
        ? options
        : options?.maxAge ?? COOKIE_MAX_AGE ;

    document.cookie = `${ key }=${ encodeURIComponent( String( value ?? '' ) ) };path=/;max-age=${ maxAge };SameSite=Lax` ;
} ;

export default setCookie ;
