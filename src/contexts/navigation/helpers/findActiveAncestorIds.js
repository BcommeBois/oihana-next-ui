/**
 * Finds the ids of every collapse whose subtree contains the current
 * pathname.
 *
 * @module contexts/navigation/helpers/findActiveAncestorIds
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import { COLLAPSE } from '../types' ;
import containsActivePath from './containsActivePath' ;

/**
 * Walks the navigation tree and returns the id of every `COLLAPSE` node
 * whose subtree contains a `LINK` matching `pathname`. Order is
 * outer-first (root collapses come before their nested ones), which is
 * convenient for callers that want to open ancestors top-down.
 *
 * Pure, no React, no side effects. Safe on `null`/`undefined`.
 *
 * @param {Object[]} [items] - Navigation tree (typically the provider's
 *   internal `navigation` array).
 * @param {string} [pathname] - Current pathname.
 * @returns {string[]} Array of collapse ids; empty when nothing matches.
 *
 * @example
 * ```js
 * findActiveAncestorIds(
 *     [{ id: 'lab', type: 'collapse', items: [
 *         { id: 'navigation', type: 'collapse', items: [
 *             { type: 'link', path: '/lab/menus' }
 *         ] }
 *     ] }],
 *     '/lab/menus'
 * ) ; // → [ 'lab' , 'navigation' ]
 * ```
 */
const findActiveAncestorIds = ( items , pathname ) =>
{
    const ids = [] ;

    if ( !Array.isArray( items ) || items.length === 0 || !notEmpty( pathname ) )
    {
        return ids ;
    }

    const walk = ( list ) =>
    {
        for ( const item of list )
        {
            if ( !item || item.type !== COLLAPSE )
            {
                continue ;
            }

            if ( !containsActivePath( item , pathname ) )
            {
                continue ;
            }

            if ( notEmpty( item.id ) )
            {
                ids.push( item.id ) ;
            }

            if ( Array.isArray( item.items ) && item.items.length > 0 )
            {
                walk( item.items ) ;
            }
        }
    } ;

    walk( items ) ;

    return ids ;
} ;

export default findActiveAncestorIds ;
