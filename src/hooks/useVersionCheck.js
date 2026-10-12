'use client' ;

import { useEffect } from 'react'

import clearStorage from '../helpers/storage/clearStorage'

/**
 * Checks app version and clears storage if version changed.
 *
 * @param {string} version - Current app version.
 * @param {Object} [options]
 * @param {string} [options.storageKey='app-version'] - LocalStorage key for version.
 * @param {string[]} [options.keepLocal=['lang', 'theme']] - Keys to preserve in localStorage : exact names, or prefixes ending with `*` (`'my-app:feedback:*'`). Anything not listed is lost on a new version — the menu's state and the device's sound settings included.
 * @param {string[]} [options.keepSession=[]] - Keys to preserve in sessionStorage, written the same way.
 *
 * @example
 * ```jsx
 * import { version } from 'oihana-next-ui/version' ;
 *
 * const Application = ( { children } ) =>
 * {
 *     useVersionCheck( version ) ;
 *
 *     return <Providers>{ children }</Providers> ;
 * } ;
 * ```
 *
 * @example
 * ```jsx
 * // With options
 * useVersionCheck( version , {
 *     storageKey  : 'my-app-version' ,
 *     keepLocal   : [ 'lang' , 'theme' , 'my-app:nav:v1' , 'my-app:feedback:*' ] ,
 *     keepSession : [ 'auth-token' ]
 * } ) ;
 * ```
 */
const useVersionCheck =
(
    version ,
    {
        storageKey  = 'app-version' ,
        keepLocal   = [ 'lang' , 'theme' ] ,
        keepSession = [] ,
    } = {}
) =>
{
    useEffect( () =>
    {
        if ( !version )
        {
            return ;
        }

        const storedVersion = localStorage.getItem( storageKey ) ;

        if ( storedVersion !== version )
        {
            clearStorage( localStorage   , keepLocal   ) ;
            clearStorage( sessionStorage , keepSession ) ;

            localStorage.setItem( storageKey , version ) ;
        }
    }
    , [] ) ;
} ;

export default useVersionCheck ;