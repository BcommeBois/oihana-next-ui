/**
 * Display preference storage key helpers.
 *
 * No 'use client' directive — usable on both server and client.
 *
 * @module helpers/storage/displayStorageKey
 */

import createStorageKey from './createStorageKey' ;

/**
 * Prefix applied to all display preference storage keys.
 * @type {string}
 */
export const DISPLAY_STORAGE_PREFIX = 'display__' ;

/**
 * Builds the full storage / cookie key from a page identifier.
 *
 * @param {string} pageKey - e.g. 'products' or 'app.products'
 * @returns {string}       - e.g. 'display__products'
 */
const getDisplayStorageKey = createStorageKey( DISPLAY_STORAGE_PREFIX ) ;

export default getDisplayStorageKey ;