/**
 * Recursive matcher: tells whether a navigation item (typically a
 * `COLLAPSE`) contains a descendant `LINK` whose `path` matches the
 * current pathname.
 *
 * @module contexts/navigation/helpers/containsActivePath
 */

import notEmpty   from 'vegas-js-core/src/strings/notEmpty' ;
import startsWith from 'vegas-js-core/src/strings/startsWith' ;

/**
 * Walks the `items` tree under the given navigation node and returns
 * `true` as soon as one descendant has a `path` that matches `pathname`
 * with `startsWith`. The match semantics are intentionally identical to
 * the active-link rule used in `Link.jsx`.
 *
 * Pure, no React, no side effects. Safe on `null`/`undefined`.
 *
 * @param {Object} [item] - Navigation node (collapse or link).
 * @param {Object[]} [item.items] - Children of a collapse node.
 * @param {string} [item.path] - Path of a link node.
 * @param {string} [pathname] - Current pathname (e.g. from `usePathname`).
 * @returns {boolean}
 *
 * @example
 * ```js
 * containsActivePath(
 *     { items: [ { path: '/lab/grid' } ] } ,
 *     '/lab/grid'
 * ) ; // → true
 * ```
 */
const containsActivePath = ( item , pathname ) =>
{
    if ( !item || !notEmpty( pathname ) )
    {
        return false ;
    }

    if ( notEmpty( item.path ) && startsWith( pathname , item.path ) )
    {
        return true ;
    }

    if ( !Array.isArray( item.items ) || item.items.length === 0 )
    {
        return false ;
    }

    return item.items.some( ( child ) => containsActivePath( child , pathname ) ) ;
} ;

export default containsActivePath ;
