'use client' ;

/**
 * Dock component for DaisyUI 5 (a.k.a. bottom navigation / bottom bar).
 *
 * Sticks to the bottom of the screen (`position: 'fixed'` by default). Supports
 * a data-driven `items` array (the common case) or composable {@link DockItem}
 * children. Items with an `href` render as links (active auto-detected from the
 * pathname); items with only an `onClick` render as buttons.
 *
 * On iOS, add `<meta name="viewport" content="viewport-fit=cover">` to the root
 * layout, and pad the page bottom so content is not hidden behind the dock.
 *
 * @module components/menus/Dock
 * @see https://daisyui.com/components/dock
 *
 * @example
 * ```jsx
 * // Data-driven
 * <Dock
 *     items={[
 *         { id: 'home',     label: 'Home',     href: '/',        icon: <HomeIcon /> } ,
 *         { id: 'inbox',    label: 'Inbox',    href: '/inbox',   icon: <InboxIcon /> } ,
 *         { id: 'settings', label: 'Settings', onClick: openMe,  icon: <CogIcon /> } ,
 *     ]}
 * />
 *
 * // Composable, embedded (not fixed)
 * <Dock position="relative">
 *     <DockItem href="/" icon={ <HomeIcon /> }>Home</DockItem>
 *     <DockItem active icon={ <InboxIcon /> }>Inbox</DockItem>
 * </Dock>
 * ```
 */

import cn              from '../../themes/helpers/cn' ;
import getDockClasses  from '../../themes/components/dock' ;

import DockItem from './DockItem' ;

/**
 * @param {Object} props
 * @param {import('react').ReactNode} [props.children] - Composable DockItem children (ignored when `items` is set).
 * @param {string} [props.className] - Additional classes for the dock wrapper.
 * @param {Array<{ id?: string, active?: boolean, label?: import('react').ReactNode, href?: import('next/link').LinkProps['href'], icon?: import('react').ReactNode, onClick?: import('react').MouseEventHandler, className?: string }>} [props.items] - Data-driven dock entries.
 * @param {string} [props.itemClassName] - Additional classes applied to each item.
 * @param {import('../../themes/layout/position').PositionValue} [props.position] - CSS position (default 'fixed'; use 'relative' to embed).
 * @param {boolean} [props.showLabel=true] - Render item labels.
 * @param {import('../../themes/components/dock').DockSize | Object.<string, import('../../themes/components/dock').DockSize>} [props.size] - Dock size (xs, sm, md, lg, xl).
 * @returns {React.JSX.Element}
 */
const Dock =
({
    children ,
    className ,
    items ,
    itemClassName ,
    position ,
    showLabel = true ,
    size ,
}) =>
{
    const classes = getDockClasses({ className , position , size }) ;

    return (
        <div className={ classes }>
        {
            Array.isArray( items ) && items.length > 0
                ? items.map( ( { id , active , label , href , icon , onClick , className : itemCls } = {} , index ) => (
                    <DockItem
                        key       = { id ?? `item-${ index }` }
                        active    = { active }
                        className = { cn( itemClassName , itemCls ) }
                        href      = { href }
                        icon      = { icon }
                        label     = { label }
                        onClick   = { onClick }
                        showLabel = { showLabel }
                    />
                ) )
                : children
        }
        </div>
    ) ;
} ;

Dock.displayName = 'Dock' ;

export default Dock ;
