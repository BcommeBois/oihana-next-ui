/**
 * Writes a JSON value to localStorage, sets a cookie for SSR,
 * and dispatches a storage event so other tabs stay in sync.
 *
 * The cookie carries `String( value )`, encoded by
 * {@link module:helpers/storage/setCookie} — read it on the server with
 * `cookies().get( key ).value`, which is already decoded.
 *
 * @module helpers/storage/writeStorage
 *
 * @param {string} key - Storage key.
 * @param {*} value - Value to store.
 * @param {object} [options] - Options.
 * @param {boolean} [options.cookie=true] - Also set a cookie for SSR.
 * @param {number} [options.maxAge] - Cookie max-age in seconds. Defaults to one year.
 */

import COOKIE_MAX_AGE from './cookieMaxAge' ;
import setCookie      from './setCookie' ;

const writeStorage = ( key , value , { cookie = true , maxAge = COOKIE_MAX_AGE } = {} ) =>
{
    const json = JSON.stringify( value ) ;

    localStorage.setItem( key , json ) ;

    if ( cookie )
    {
        setCookie( key , value , { maxAge } ) ;
    }

    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

export default writeStorage ;
