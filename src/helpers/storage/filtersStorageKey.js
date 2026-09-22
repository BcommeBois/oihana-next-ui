/**
 * Filter-disclosure storage key helpers — whether a list's filter bar is
 * unfolded, remembered per page.
 *
 * The stored value is `'1'` (open) or `'0'` (folded), and `decodeFiltersOpen`
 * reads it back. It answers `null` when the cookie is absent, which is NOT
 * `false` : the caller then falls back on its own default — a bar holding an
 * applied criterion opens whatever the preference says.
 *
 * No `'use client'` : the client writes the cookie, the server reads it back
 * while rendering the list.
 *
 * @module helpers/storage/filtersStorageKey
 */

import createStorageKey from './createStorageKey' ;

/**
 * Prefix applied to all filter-disclosure storage keys.
 * @type {string}
 */
export const FILTERS_STORAGE_PREFIX = 'filters__' ;

/**
 * The value stored for an unfolded bar.
 * @type {string}
 */
export const FILTERS_OPEN = '1' ;

/**
 * The value stored for a folded bar.
 * @type {string}
 */
export const FILTERS_CLOSED = '0' ;

/**
 * Builds the full storage / cookie key from a page identifier.
 *
 * @param {string} pageKey - e.g. 'articles' or 'app.articles'
 * @returns {string}       - e.g. 'filters__articles'
 */
const getFiltersStorageKey = createStorageKey( FILTERS_STORAGE_PREFIX ) ;

/**
 * Reads a stored disclosure preference into a boolean.
 *
 * @param {string} [value] - Raw cookie value.
 * @returns {?boolean} `null` when nothing is stored — the caller's own default wins.
 */
export const decodeFiltersOpen = value =>
{
    if ( value === FILTERS_OPEN   ) { return true  ; }
    if ( value === FILTERS_CLOSED ) { return false ; }

    return null ;
} ;

export default getFiltersStorageKey ;
