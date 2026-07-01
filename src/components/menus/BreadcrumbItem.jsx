'use client' ;

/**
 * Single breadcrumb entry rendered as a `<li>`.
 *
 * When `href` is provided the label is rendered as a clickable {@link Link};
 * otherwise it is rendered as a plain `<span>` (the current page).
 *
 * @module components/menus/BreadcrumbItem
 * @see https://daisyui.com/components/breadcrumbs
 *
 * @example
 * ```jsx
 * <Breadcrumbs>
 *     <BreadcrumbItem href="/" icon={ <HomeIcon /> }>Home</BreadcrumbItem>
 *     <BreadcrumbItem>Add Document</BreadcrumbItem>
 * </Breadcrumbs>
 * ```
 */

import cn   from '../../themes/helpers/cn' ;
import Link from '../links/Link' ;

const CONTENT = 'inline-flex items-center gap-2' ;

/**
 * @param {Object} props
 * @param {import('react').ReactNode} [props.children] - Item label / content.
 * @param {string} [props.className] - Additional classes for the `<li>`.
 * @param {import('next/link').LinkProps['href']} [props.href] - Destination. When omitted the item is the current page.
 * @param {import('react').ReactNode} [props.icon] - Optional leading icon.
 * @param {string} [props.linkClassName] - Additional classes for the inner link / span.
 */
const BreadcrumbItem =
({
    children ,
    className ,
    href ,
    icon ,
    linkClassName ,

    ...rest
}) =>
{
    const content = icon
        ? ( <>{ icon }{ children }</> )
        : children ;

    return (
        <li className={ className }>
        {
            href
                ? (
                    <Link
                        className = { cn( CONTENT , 'hover:underline' , linkClassName ) }
                        href      = { href }
                        { ...rest }
                    >
                        { content }
                    </Link>
                )
                : (
                    <span className={ cn( CONTENT , linkClassName ) } { ...rest }>
                        { content }
                    </span>
                )
        }
        </li>
    ) ;
} ;

BreadcrumbItem.displayName = 'BreadcrumbItem' ;

export default BreadcrumbItem ;
