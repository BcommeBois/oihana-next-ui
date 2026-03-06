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
 * const [ display , saveDisplay , clearDisplay ] = useDisplayPreference( 'products' , 'flex' ) ;
 *
 * saveDisplay( 'masonry' ) ; // → localStorage + cookie display__products=masonry
 * clearDisplay() ;           // → removes both
 * ```
 */

import { useSyncExternalStore } from 'react' ;

import readStorage      from '../helpers/storage/readStorage' ;
import removeStorage    from '../helpers/storage/removeStorage' ;
import subscribeStorage from '../helpers/storage/subscribeStorage' ;
import writeStorage     from '../helpers/storage/writeStorage' ;

/**
 * Prefix applied to all display preference storage keys.
 * @type {string}
 */
export const DISPLAY_STORAGE_PREFIX = 'display__' ;

/**
 * Builds the full storage key from a page identifier.
 *
 * @param {string} pageKey - e.g. 'products' or 'app.products'
 * @returns {string}       - e.g. 'display__products'
 */
export const getDisplayStorageKey = pageKey => `${ DISPLAY_STORAGE_PREFIX }${ pageKey }` ;

/**
 * @param {string} pageKey       - Page identifier — use `url` or `path` prop from ThingsPage.
 * @param {string} [defaultValue='flex'] - Fallback when nothing is stored.
 * @returns {[ string , (mode: string) => void , () => void ]}
 */
const useDisplayPreference = ( pageKey , defaultValue = 'flex' ) =>
{
    const key = getDisplayStorageKey( pageKey ) ;

    const subscribe         = cb => subscribeStorage( cb ) ;
    const getSnapshot       = () => readStorage( key ) ?? defaultValue ;
    const getServerSnapshot = () => defaultValue ;

    const value = useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

    const save = mode =>
    {
        if ( mode )
        {
            writeStorage( key , mode ) ;
        }
        else
        {
            removeStorage( key ) ;
        }
    } ;

    const clear = () => removeStorage( key ) ;

    return [ value , save , clear ] ;
} ;

export default useDisplayPreference ;