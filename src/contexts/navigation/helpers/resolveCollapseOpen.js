/**
 * Pure resolver for the open/closed state of a single collapse node.
 *
 * @module contexts/navigation/helpers/resolveCollapseOpen
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import { COLLAPSE_MODES , DEFAULT_COLLAPSE_MODE } from './constants' ;
import containsActivePath from './containsActivePath' ;

/**
 * Resolves the effective open state for a collapse, in this priority
 * order:
 *
 * 1. Persisted user choice (`persisted[id]`) — explicit win.
 * 2. Auto-mode pathname match — only when `defaultMode === 'auto'`.
 * 3. Per-item `defaultOpen` — author override on the item.
 * 4. Global `defaultMode` — `'open'` truthy, anything else falsy.
 *
 * Pure: no React, no DOM, no storage access. Safe to call during render.
 *
 * @param {Object} params
 * @param {string} [params.id] - Item id (used to look up `persisted`).
 * @param {Object} [params.item] - The collapse item itself (read for
 *   `defaultOpen` and walked for the auto-mode pathname match).
 * @param {Record<string, boolean>} [params.persisted] - Map loaded from
 *   storage; missing keys mean "no user choice yet".
 * @param {string} [params.pathname] - Current pathname. Only consulted
 *   in `auto` mode.
 * @param {'open' | 'closed' | 'auto'} [params.defaultMode] - Global
 *   provider mode. Defaults to `'open'`.
 * @returns {boolean} Effective open state.
 */
const resolveCollapseOpen = (
{
    id ,
    item ,
    persisted ,
    pathname ,
    defaultMode = DEFAULT_COLLAPSE_MODE ,
} = {} ) =>
{
    if ( notEmpty( id ) && persisted && Object.hasOwn( persisted , id ) )
    {
        return Boolean( persisted[ id ] ) ;
    }

    if ( defaultMode === COLLAPSE_MODES.AUTO && containsActivePath( item , pathname ) )
    {
        return true ;
    }

    if ( item && typeof item.defaultOpen === 'boolean' )
    {
        return item.defaultOpen ;
    }

    return defaultMode === COLLAPSE_MODES.OPEN ;
} ;

export default resolveCollapseOpen ;
