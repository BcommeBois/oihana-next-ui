'use client' ;

/**
 * Persists the display mode preference for a given page key.
 *
 * Storage key pattern: `display__${pageKey}` (e.g. `display__products`)
 *
 * Priority (read):
 *   1. localStorage (client, reactive via useSyncExternalStore)
 *   2. defaultValue prop
 *
 * Priority (write):
 *   writeStorage → localStorage + cookie (for SSR read on next load)
 *
 * @module hooks/useDisplayPreference
 *
 * @example
 * ```js
 * // With persistence
 * const [ display , saveDisplay , clearDisplay ] = useDisplayPreference( 'products' , 'flex' ) ;
 *
 * // Without persistence (pageKey absent) — save/clear are no-ops
 * const [ display , saveDisplay , clearDisplay ] = useDisplayPreference( null , 'flex' ) ;
 * ```
 */

import { useSyncExternalStore } from 'react' ;

import readStorage      from '../helpers/storage/readStorage' ;
import writeStorage     from '../helpers/storage/writeStorage' ;
import removeStorage    from '../helpers/storage/removeStorage' ;
import subscribeStorage from '../helpers/storage/subscribeStorage' ;

import getDisplayStorageKey from '../helpers/storage/displayStorageKey' ;

export { getDisplayStorageKey } ;

/**
 * @param {string|null|undefined} pageKey       - Page identifier — use `url` or `path` prop from ThingsPage.
 *                                                Pass null/undefined to disable persistence entirely.
 * @param {string}                [defaultValue='flex'] - Fallback when nothing is stored.
 * @returns {[ string , (mode: string) => void , () => void ]}
 */
const useDisplayPreference = ( pageKey , defaultValue = 'flex' ) =>
{
    const key = pageKey ? getDisplayStorageKey( pageKey ) : null ;

    const subscribe         = cb => key ? subscribeStorage( cb ) : () => {} ;
    const getSnapshot       = () => key ? ( readStorage( key ) ?? defaultValue ) : defaultValue ;
    const getServerSnapshot = () => defaultValue ;

    const value = useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

    const save = mode =>
    {
        if ( !key ) return ;

        if ( mode )
        {
            writeStorage( key , mode ) ;
        }
        else
        {
            removeStorage( key ) ;
        }
    } ;

    const clear = () => key && removeStorage( key ) ;

    return [ value , save , clear ] ;
} ;

export default useDisplayPreference ;