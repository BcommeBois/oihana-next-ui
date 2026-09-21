/**
 * Removes a value from localStorage and its associated cookie.
 *
 * @module helpers/storage/removeStorage
 *
 * @param {string} key - Storage key.
 */

import removeCookie from './removeCookie' ;

const removeStorage = key =>
{
    localStorage.removeItem( key ) ;

    removeCookie( key ) ;

    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

export default removeStorage ;
