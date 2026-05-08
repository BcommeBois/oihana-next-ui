'use client' ;

import { useCallback } from 'react' ;

import useNavigation from './useNavigation' ;

/**
 * React hook that exposes the open/closed state and toggle helpers for a
 * single collapse, identified by `id`.
 *
 * Useful for building custom UIs on top of the navigation tree (for
 * instance an "expand all / collapse all" control, or a custom collapse
 * skin that does not reuse `<Collapse>`). Inside the standard
 * `<Collapse>` component the same wiring happens internally — you only
 * need this hook for bespoke views.
 *
 * @param {string} id - Stable item id matching the navigation config.
 * @param {Object} [item] - Optional item reference. When provided, the
 *   `auto` mode and the per-item `defaultOpen` override are honoured;
 *   when omitted, only persisted state and the global `defaultMode` are
 *   considered.
 *
 * @returns {{
 *   open: boolean,
 *   toggle: () => void,
 *   set: (open: boolean) => void
 * }}
 *
 * @throws {Error} If used outside `NavigationProvider`.
 *
 * @example
 * ```jsx
 * const { open , toggle } = useNavigationCollapse( 'lab' ) ;
 *
 * return (
 *     <button type="button" onClick={ toggle }>
 *         { open ? 'Hide lab' : 'Show lab' }
 *     </button>
 * ) ;
 * ```
 */
const useNavigationCollapse = ( id , item ) =>
{
    const { getCollapseOpen , setCollapse } = useNavigation() ;

    const open = getCollapseOpen( id , item ) ;

    const set = useCallback( ( next ) =>
    {
        setCollapse( id , Boolean( next ) ) ;
    }
    , [ id , setCollapse ] ) ;

    const toggle = useCallback( () =>
    {
        setCollapse( id , !open ) ;
    }
    , [ id , open , setCollapse ] ) ;

    return { open , toggle , set } ;
} ;

export default useNavigationCollapse ;
