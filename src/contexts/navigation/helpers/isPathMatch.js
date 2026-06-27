/**
 * Segment-aware path matcher : tells whether a navigation `path` covers
 * the current `pathname`.
 *
 * A path matches when the pathname is exactly it, or a descendant of it
 * on a segment boundary — so `/me` matches `/me` and `/me/sessions` but
 * NOT `/menu`. The root `'/'` only ever matches `'/'` (it would otherwise
 * shadow every route).
 *
 * Single source of truth shared by `findActiveLinkPath` (link highlight)
 * and `containsActivePath` (collapse open / active-ancestor), so both
 * surfaces agree on what "active" means.
 *
 * @module contexts/navigation/helpers/isPathMatch
 *
 * @param {string} [pathname] - Current pathname (e.g. from `usePathname`).
 * @param {string} [path]     - A navigation link `path`.
 * @returns {boolean}
 *
 * @example
 * ```js
 * isPathMatch( '/me/sessions' , '/me' ) ;        // → true
 * isPathMatch( '/me/customers' , '/me' ) ;       // → true  (use longest-match to disambiguate)
 * isPathMatch( '/menu' , '/me' ) ;               // → false (segment boundary)
 * isPathMatch( '/anything' , '/' ) ;             // → false (root matches only '/')
 * ```
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

const isPathMatch = ( pathname , path ) =>
{
    if ( !notEmpty( pathname ) || !notEmpty( path ) )
    {
        return false ;
    }

    if ( pathname === path )
    {
        return true ;
    }

    if ( path === '/' )
    {
        return false ;
    }

    return pathname.startsWith( path + '/' ) ;
} ;

export default isPathMatch ;