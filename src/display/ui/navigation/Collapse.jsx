'use client' ;

/**
 * Collapse component for nested navigation menus.
 *
 * @module display/ui/navigation/Collapse
 */

import { use , useCallback , useMemo } from 'react' ;

import cn from '../../../themes/helpers/cn' ;

import NavigationContext from '../../../contexts/navigation/context' ;
import containsActivePath from '../../../contexts/navigation/helpers/containsActivePath' ;

import Menu from './Menu' ;

/**
 * Default style applied to the `<summary>` of a collapse whose subtree
 * contains the current pathname (active-ancestor marker, option A —
 * minimal). Consumers can override via `activeAncestorClassName`.
 */
const DEFAULT_ACTIVE_ANCESTOR_CLASSNAME = 'text-base-content font-semibold' ;

/**
 * Renders a collapsible navigation group with nested items.
 *
 * The component supports three usage modes:
 *
 * 1. **Legacy / uncontrolled** — when no `id`, `open`, `defaultOpen` or
 *    `onToggle` is provided, renders `<details open>` exactly as before.
 * 2. **Context-driven** — when `id` is provided and the component sits
 *    under a `NavigationProvider`, the open state is read from the
 *    provider (persisted choice → auto(pathname) → `defaultOpen` → mode)
 *    and toggle events are written back, persisting to `localStorage`
 *    when the provider received a `storageKey`.
 * 3. **Controlled** — when `open` is provided, the component is fully
 *    controlled by the parent and ignores the provider for its own
 *    open/closed state. `onToggle` is fired with the next boolean.
 *
 * @param {Object} props
 * @param {string} [props.id] - Stable item id used by the provider for
 *   persistence and for the active-ancestor calculation.
 * @param {boolean} [props.open] - Controlled open state. When provided,
 *   the component ignores the provider for its own state.
 * @param {boolean} [props.defaultOpen] - Per-item override of the
 *   provider's `defaultMode`, used when no persisted choice exists.
 * @param {(open: boolean) => void} [props.onToggle] - Called with the
 *   next open value whenever the native `<details>` toggles.
 * @param {string} [props.className] - Additional class names for the inner menu.
 * @param {string} [props.activeAncestorClassName] - Override for the
 *   default active-ancestor style applied to the `<summary>`.
 * @param {React.ComponentType<{ size?: number }>} [props.Icon] - Icon component.
 * @param {number} [props.iconSize=20] - Icon size in pixels.
 * @param {Object[]} [props.items] - Nested navigation items.
 * @param {string} [props.label] - Collapse header text.
 * @param {Function} [props.onAction] - Callback propagated to child items.
 *
 * @returns {React.ReactElement}
 */
const Collapse =
({
    id ,
    open : openProp ,
    defaultOpen ,
    onToggle ,
    activeAncestorClassName ,
    className ,
    Icon ,
    iconSize = 20 ,
    items ,
    label ,
    onAction ,
}) =>
{
    // Defensive read: a consumer may render <Collapse> without a
    // NavigationProvider (legacy / standalone usage). In that case the
    // context is null and we silently fall back to the legacy behaviour.
    const navigation = use( NavigationContext ) ;

    const isControlled       = typeof openProp === 'boolean' ;
    const isProviderManaged  = !isControlled && navigation !== null && typeof id === 'string' && id.length > 0 ;

    const item = useMemo( () => ({ id , defaultOpen , items , path : undefined })
                        , [ id , defaultOpen , items ] ) ;

    let open ;
    if ( isControlled )
    {
        open = openProp ;
    }
    else if ( isProviderManaged )
    {
        open = navigation.getCollapseOpen( id , item ) ;
    }
    else
    {
        // Legacy fallback: behave like <details open> when nothing is
        // wired up, preserving 100% backward compatibility.
        open = true ;
    }

    const pathname = navigation?.pathname ?? null ;

    const isActiveAncestor = useMemo( () =>
        containsActivePath( { items } , pathname )
    , [ items , pathname ] ) ;

    const handleToggle = useCallback( ( event ) =>
    {
        const next = Boolean( event.currentTarget.open ) ;

        if ( onToggle )
        {
            onToggle( next ) ;
        }

        if ( !isControlled && isProviderManaged )
        {
            navigation.setCollapse( id , next ) ;
        }
    }
    , [ id , isControlled , isProviderManaged , navigation , onToggle ] ) ;

    const summaryClassName = cn
    (
        isActiveAncestor && ( activeAncestorClassName ?? DEFAULT_ACTIVE_ANCESTOR_CLASSNAME ) ,
    ) ;

    return (
        <li>
            <details
                open      = { open }
                onToggle  = { handleToggle }
                data-nav-id = { id }
                data-active-ancestor = { isActiveAncestor || undefined }
            >
                <summary className={ summaryClassName }>
                    { Icon && <Icon size={ iconSize } /> }
                    { label }
                </summary>
                <Menu
                    className = { className }
                    items     = { items }
                    onAction  = { onAction }
                />
            </details>
        </li>
    ) ;
} ;

export default Collapse ;
