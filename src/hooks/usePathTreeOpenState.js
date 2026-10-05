'use client' ;

/**
 * Which folders of a tree are open, and the three gestures that change it.
 *
 * Keyed on `path` rather than on an index or a reference : a path survives a
 * re-group, which is what happens on every keystroke of a search. Keying on
 * anything else closes every folder the moment the list is filtered.
 *
 * ### 🔑 A search OPENS the branches, and never closes them
 *
 * A match three levels down is invisible in a collapsed tree, so typing opens
 * everything. But the opening is **additive** : clearing the search leaves the
 * folders as they are rather than snapping them shut, because the reader got
 * there by typing and is now looking at what they found. And a folder they
 * close by hand while the search is still on stays closed — the effect runs on
 * the query, not on the tree.
 *
 * @module hooks/usePathTreeOpenState
 *
 * @param {Object}   [options]
 * @param {Array}    [options.tree=[]]    - The nodes, as `groupByPath` returns them. Read to collect every path.
 * @param {string}   [options.query='']   - The current search. A non-empty value opens every folder once.
 * @param {string[]} [options.initial=[]] - The paths open on the first render.
 *
 * @returns {{ openPaths : Set<string> , collapseAll : Function , expandAll : Function , toggle : Function }}
 *          `toggle( path , open )` sets one folder ; `open` omitted flips it.
 *
 * @example
 * ```jsx
 * const tree = useMemo( () => groupByPath( items , { getPath } ) , [ items ] ) ;
 * const { openPaths , collapseAll , expandAll , toggle } = usePathTreeOpenState({ query , tree }) ;
 *
 * <PathTree nodes={ tree } openPaths={ openPaths } onToggleOpen={ toggle } />
 * ```
 */

import { useCallback , useEffect , useMemo , useState } from 'react' ;

/**
 * Every folder path of a tree, depth first.
 *
 * @param {Array} nodes
 * @returns {string[]}
 */
export const collectPaths = ( nodes ) =>
    ( nodes ?? [] ).flatMap( ( node ) =>
        node?.children?.length ? [ node.path , ...collectPaths( node.children ) ] : [ node.path ] ) ;

const usePathTreeOpenState = ( { initial = [] , query = '' , tree = [] } = {} ) =>
{
    const [ openPaths , setOpenPaths ] = useState( () => new Set( initial ) ) ;

    const paths = useMemo( () => collectPaths( tree ) , [ tree ] ) ;

    const hasQuery = String( query ?? '' ).trim() !== '' ;

    // On the QUERY, not on the tree : the tree is rebuilt on every keystroke,
    // and running this on it would reopen a folder the reader just closed.
    // biome-ignore lint/correctness/useExhaustiveDependencies: see above — `paths` is read, never depended on
    useEffect( () =>
    {
        if ( !hasQuery ) { return ; }

        setOpenPaths( ( previous ) =>
        {
            const next = new Set( previous ) ;
            for ( const path of paths ) { next.add( path ) ; }
            return next ;
        }) ;
    }
    , [ hasQuery , query ] ) ;

    const toggle = useCallback( ( path , open ) =>
    {
        setOpenPaths( ( previous ) =>
        {
            const next = open ?? !previous.has( path ) ;

            if ( next === previous.has( path ) ) { return previous ; }

            const copy = new Set( previous ) ;

            if ( next ) { copy.add( path ) ; }
            else        { copy.delete( path ) ; }

            return copy ;
        }) ;
    }
    , [] ) ;

    const expandAll = useCallback( () => setOpenPaths( new Set( paths ) ) , [ paths ] ) ;

    const collapseAll = useCallback
    (
        () => setOpenPaths( ( previous ) => previous.size === 0 ? previous : new Set() ) ,
        [] ,
    ) ;

    return { collapseAll , expandAll , openPaths , toggle } ;
} ;

export default usePathTreeOpenState ;
