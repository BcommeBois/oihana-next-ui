/**
 * Builds the key function of a family of storage entries.
 *
 * A preference is stored per page — `display__products`, `search__customers` —
 * and each family used to write the same one-liner around its prefix. This
 * returns it, so a family is its prefix and nothing else.
 *
 * No `'use client'` : usable on both server and client, which a cookie key has
 * to be — the client writes it, the server reads it.
 *
 * @module helpers/storage/createStorageKey
 *
 * @param {string} prefix - The family's prefix, e.g. `'display__'`.
 * @returns {( pageKey: string ) => string} The key of that family for one page.
 *
 * @example
 * ```js
 * export const SEARCH_STORAGE_PREFIX = 'search__' ;
 * const getSearchStorageKey = createStorageKey( SEARCH_STORAGE_PREFIX ) ;
 *
 * getSearchStorageKey( 'products' ) ; // 'search__products'
 * ```
 */
const createStorageKey = prefix => pageKey => `${ prefix }${ pageKey }` ;

export default createStorageKey ;
