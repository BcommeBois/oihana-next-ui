/**
 * Display preference storage key helpers.
 *
 * No 'use client' directive — usable on both server and client.
 *
 * @module helpers/storage/displayStorageKey
 */

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
const getDisplayStorageKey = pageKey => `${ DISPLAY_STORAGE_PREFIX }${ pageKey }` ;

export default getDisplayStorageKey ;