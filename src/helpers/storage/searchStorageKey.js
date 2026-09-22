/**
 * Search preference storage key helpers.
 *
 * No `'use client'` : the client writes the cookie, the server reads it back to
 * render a list that was left with a query running.
 *
 * @module helpers/storage/searchStorageKey
 */

import createStorageKey from './createStorageKey' ;

/**
 * Prefix applied to all search preference storage keys.
 * @type {string}
 */
export const SEARCH_STORAGE_PREFIX = 'search__' ;

/**
 * Builds the full storage / cookie key from a page identifier.
 *
 * @param {string} pageKey - e.g. 'articles' or 'app.articles'
 * @returns {string}       - e.g. 'search__articles'
 */
const getSearchStorageKey = createStorageKey( SEARCH_STORAGE_PREFIX ) ;

export default getSearchStorageKey ;
