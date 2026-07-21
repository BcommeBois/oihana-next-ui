'use client' ;

/**
 * Paged (drill-down) navigation menu.
 *
 * A vertical menu built on the DaisyUI `menu-paged` modifier: only one
 * level is visible at a time, and the open group's `<summary>` turns
 * into a **Back** button. Pure CSS (`:has(details[open])`) — no
 * JavaScript state.
 *
 * It reuses the data-driven navigation model (`link` / `collapse` /
 * `divider` / `title` items) and the recursive `Menu` renderer, wrapped
 * in `PagedContext` so nested `Collapse`s render as native, uncontrolled
 * `<details>` (starting closed).
 *
 * `menu-paged` is a vertical pattern; orientation is intentionally not
 * exposed.
 *
 * @module components/menus/PagedMenu
 *
 * @example
 * ```jsx
 * import PagedMenu from 'oihana-next-ui/components/menus/PagedMenu' ;
 * import { COLLAPSE , LINK } from 'oihana-next-ui/contexts/navigation/types' ;
 *
 * const items =
 * [
 *     { id: 'home' , type: LINK , label: 'Home' , path: '/' } ,
 *     {
 *         id: 'products' , type: COLLAPSE , label: 'Products' ,
 *         items:
 *         [
 *             { id: 'all' , type: LINK , label: 'All products' , path: '/products' } ,
 *         ] ,
 *     } ,
 * ] ;
 *
 * <PagedMenu items={ items } size="md" className="w-56" />
 * ```
 */

import getMenuClasses from '../../themes/navigation/menu' ;

import Menu         from '../../display/ui/navigation/Menu' ;
import PagedContext from '../../display/ui/navigation/PagedContext' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional class names appended to the menu.
 * @param {Object[]} props.items - Navigation items ({ id, type, label, path, Icon, items }).
 * @param {Function} [props.onAction] - Callback propagated to child items on click.
 * @param {import('../../themes/navigation/menu').MenuSize} [props.size] - Menu size (xs, sm, md, lg).
 *
 * @returns {React.JSX.Element | null}
 */
const PagedMenu =
({
    className ,
    items ,
    onAction ,
    size ,
}) =>
{
    if ( !items || items.length === 0 )
    {
        return null ;
    }

    const menuClasses = getMenuClasses({
        beforeClassName : 'gap-1' ,
        className ,
        paged : true ,
        size ,
    }) ;

    return (
        <PagedContext value={ true }>
            <Menu
                className = { menuClasses }
                items     = { items }
                onAction  = { onAction }
            />
        </PagedContext>
    ) ;
} ;

PagedMenu.displayName = 'PagedMenu' ;

export default PagedMenu ;
