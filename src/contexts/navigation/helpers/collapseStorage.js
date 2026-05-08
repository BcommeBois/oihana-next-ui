/**
 * localStorage helpers for the navigation collapse state.
 *
 * @module contexts/navigation/helpers/collapseStorage
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import {
    COLLAPSE_STATE_ITEMS_KEY ,
    COLLAPSE_STATE_VERSION ,
    COLLAPSE_STATE_VERSION_KEY ,
} from './constants' ;

/**
 * Returns true when `window.localStorage` can be read or written.
 * Catches SSR (no `window`), Safari private mode, disabled storage,
 * and any other host-thrown error.
 *
 * @returns {boolean}
 */
const isStorageAvailable = () =>
{
    try
    {
        return typeof window !== 'undefined'
            && typeof window.localStorage !== 'undefined' ;
    }
    catch
    {
        return false ;
    }
} ;

/**
 * Reads the persisted collapse state for a given storage key.
 *
 * Returns an empty object when the key is missing/empty, when storage is
 * unavailable (SSR, private mode, quota errors), when the payload is not
 * JSON, or when the schema version does not match the current one.
 *
 * Never throws.
 *
 * @param {string} [key] - Opaque storage key chosen by the consumer.
 * @returns {Record<string, boolean>} Per-id open/closed map (may be empty).
 *
 * @example
 * ```js
 * const state = loadCollapseState( 'my-app:nav:v1' ) ;
 * // → { lab: true, layouts: false }
 * ```
 */
export const loadCollapseState = ( key ) =>
{
    if ( !notEmpty( key ) || !isStorageAvailable() )
    {
        return {} ;
    }

    try
    {
        const raw = window.localStorage.getItem( key ) ;

        if ( !raw )
        {
            return {} ;
        }

        const parsed = JSON.parse( raw ) ;

        if ( !parsed || typeof parsed !== 'object' )
        {
            return {} ;
        }

        if ( parsed[ COLLAPSE_STATE_VERSION_KEY ] !== COLLAPSE_STATE_VERSION )
        {
            return {} ;
        }

        const items = parsed[ COLLAPSE_STATE_ITEMS_KEY ] ;

        return ( items && typeof items === 'object' ) ? items : {} ;
    }
    catch
    {
        return {} ;
    }
} ;

/**
 * Persists the per-id open/closed map under the given storage key.
 *
 * Silently no-ops when the key is empty, when storage is unavailable, or
 * when the write fails (quota, locked storage, etc.). Never throws.
 *
 * @param {string} [key] - Opaque storage key chosen by the consumer.
 * @param {Record<string, boolean>} [state] - Per-id open/closed map.
 * @returns {boolean} `true` when the write succeeded, `false` otherwise.
 *
 * @example
 * ```js
 * persistCollapseState( 'my-app:nav:v1' , { lab: true } ) ;
 * ```
 */
export const persistCollapseState = ( key , state ) =>
{
    if ( !notEmpty( key ) || !isStorageAvailable() )
    {
        return false ;
    }

    try
    {
        const payload =
        {
            [ COLLAPSE_STATE_VERSION_KEY ] : COLLAPSE_STATE_VERSION ,
            [ COLLAPSE_STATE_ITEMS_KEY   ] : state ?? {} ,
        } ;

        window.localStorage.setItem( key , JSON.stringify( payload ) ) ;

        return true ;
    }
    catch
    {
        return false ;
    }
} ;
