'use client' ;

import { useCallback , useEffect , useMemo , useRef , useState } from 'react' ;

import { usePathname } from 'next/navigation' ;

import useI18n from '../locale/useI18n' ;

import
{
    loadCollapseState ,
    persistCollapseState ,
}
from './helpers/collapseStorage' ;

import {
    COLLAPSE_MODES        ,
    COLLAPSE_MODE_VALUES  ,
    DEFAULT_COLLAPSE_MODE ,
}
from './helpers/constants' ;

import findActiveAncestorIds from './helpers/findActiveAncestorIds' ;
import findActiveLinkPath    from './helpers/findActiveLinkPath' ;
import mapI18nItem           from './helpers/mapI18nItem' ;
import resolveCollapseOpen   from './helpers/resolveCollapseOpen' ;

import NavigationContext from './context' ;

/**
 * Provides navigation context with i18n support and optional collapse
 * state persistence.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {Object[]} props.defaultNavigation - Default navigation items.
 * @param {string} [props.i18nPath='navigation'] - Locale path for navigation labels.
 * @param {'open' | 'closed' | 'auto'} [props.defaultMode='open'] - Open/closed
 *   default applied to collapse items. `'auto'` opens collapses whose
 *   subtree contains the current pathname.
 * @param {string} [props.storageKey] - Opt-in localStorage key. When
 *   omitted, collapse state lives only in memory and resets on reload.
 *   Choose a namespaced, versioned key in your app (e.g. `'my-app:nav:v1'`)
 *   to avoid cross-app collisions and to allow future schema bumps.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * <NavigationProvider
 *     defaultNavigation = { navigation }
 *     defaultMode       = "auto"
 *     storageKey        = "my-app:nav:v1"
 * >
 *     { children }
 * </NavigationProvider>
 * ```
 */
const NavigationProvider =
({
    children ,
    defaultNavigation ,
    i18nPath = 'navigation' ,
    defaultMode : defaultModeProp = DEFAULT_COLLAPSE_MODE ,
    storageKey ,
} ) =>
{
    const defaultMode = COLLAPSE_MODE_VALUES.includes( defaultModeProp )
                      ? defaultModeProp
                      : DEFAULT_COLLAPSE_MODE ;

    const locale   = useI18n( i18nPath ) ;
    const pathname = usePathname() ;

    const [ _navigation , setNavigation ] = useState( defaultNavigation ) ;

    const navigation = Array.isArray( _navigation ) && _navigation.length > 0
                     ? _navigation.map( ( item ) => mapI18nItem( item , locale ) )
                     : null ;

    // The single active link path: longest LINK path matching the
    // current route. Drives the active-link highlight (see Link.jsx) so
    // a nested destination (/me/customers) deactivates its parent (/me).
    const activePath = useMemo
    (
        () => findActiveLinkPath( _navigation , pathname ) ,
        [ _navigation , pathname ] ,
    ) ;

    // Collapse state is initialised empty so the first server render is
    // deterministic (no localStorage on the server). Hydration happens in
    // the effect below, after mount, which never causes a hydration
    // mismatch because `<details>` is forgiving of an `open` flip.
    const [ collapses , setCollapses ] = useState( {} ) ;

    const hydratedRef = useRef( false ) ;

    useEffect( () =>
    {
        if ( hydratedRef.current )
        {
            return ;
        }

        hydratedRef.current = true ;

        const loaded = loadCollapseState( storageKey ) ;

        if ( loaded && Object.keys( loaded ).length > 0 )
        {
            setCollapses( loaded ) ;
        }
    }
    , [ storageKey ] ) ;

    // Auto-mode "follow the route" behaviour: on every real pathname
    // transition (not on the initial mount, not on reload), force-open
    // every collapse whose subtree contains the new pathname and
    // persist the change. This mirrors what VS Code / GitHub sidebars
    // do — navigating into a nested page reveals the hosting branch
    // even if the user had collapsed it earlier. The user can still
    // collapse it back; the override only kicks in on the next real
    // pathname change. The initial mount is skipped on purpose so that
    // a refresh on the current page respects the persisted choice.
    const previousPathnameRef = useRef( null ) ;

    useEffect( () =>
    {
        const previous = previousPathnameRef.current ;
        previousPathnameRef.current = pathname ;

        if ( defaultMode !== COLLAPSE_MODES.AUTO || !pathname || previous === null || previous === pathname )
        {
            return ;
        }

        const ancestorIds = findActiveAncestorIds( _navigation , pathname ) ;

        if ( ancestorIds.length === 0 )
        {
            return ;
        }

        setCollapses( ( previous ) =>
        {
            let changed = false ;
            const next = { ...previous } ;

            for ( const id of ancestorIds )
            {
                if ( next[ id ] !== true )
                {
                    next[ id ] = true ;
                    changed    = true ;
                }
            }

            if ( !changed )
            {
                return previous ;
            }

            persistCollapseState( storageKey , next ) ;

            return next ;
        } ) ;
    }
    , [ pathname , defaultMode , storageKey , _navigation ] ) ;

    const setCollapse = useCallback( ( id , open ) =>
    {
        if ( !id )
        {
            return ;
        }

        setCollapses( ( previous ) =>
        {
            if ( previous[ id ] === open )
            {
                return previous ;
            }

            const next = { ...previous , [ id ] : open } ;

            persistCollapseState( storageKey , next ) ;

            return next ;
        } ) ;
    }
    , [ storageKey ] ) ;

    const getCollapseOpen = useCallback( ( id , item ) =>
        resolveCollapseOpen
        ({
            id ,
            item ,
            persisted : collapses ,
            pathname ,
            defaultMode ,
        })
    , [ collapses , pathname , defaultMode ] ) ;

    const value = useMemo( () =>
    ({
        activePath ,
        collapses ,
        defaultMode ,
        getCollapseOpen ,
        navigation ,
        pathname ,
        setNavigation ,
        setCollapse ,
    })
    , [ activePath , defaultMode , collapses , getCollapseOpen , navigation , pathname , setCollapse ] ) ;

    return (
        <NavigationContext value={ value }>
            { children }
        </NavigationContext>
    ) ;
} ;

export default NavigationProvider ;
