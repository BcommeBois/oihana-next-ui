'use client' ;

import { useEffect } from 'react'

import clearStorage from '../helpers/storage/clearStorage'

/**
 * Checks app version and clears storage if version changed.
 *
 * @param {string} version - Current app version.
 * @param {Object} [options]
 * @param {string} [options.storageKey='app-version'] - LocalStorage key for version.
 * @param {string[]} [options.keepLocal=['lang', 'theme']] - Keys to preserve in localStorage.
 * @param {string[]} [options.keepSession=[]] - Keys to preserve in sessionStorage.
 *
 * @example
 * ```jsx
 * import { version } from '@/version' ;
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
 *     keepLocal   : [ 'lang' , 'theme' , 'user-preferences' ] ,
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