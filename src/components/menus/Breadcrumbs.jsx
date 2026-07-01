'use client' ;

/**
 * Breadcrumbs component for DaisyUI 5.
 *
 * Helps users navigate through the site hierarchy. Supports a data-driven
 * `items` array (the common case) or composable {@link BreadcrumbItem}
 * children for custom rendering.
 *
 * @module components/menus/Breadcrumbs
 * @see https://daisyui.com/components/breadcrumbs
 *
 * @example
 * ```jsx
 * // Data-driven — items without href are the current page.
 * <Breadcrumbs
 *     items={[
 *         { label: 'Home'         , href: '/'          , icon: <HomeIcon /> } ,
 *         { label: 'Documents'    , href: '/documents' } ,
 *         { label: 'Add Document' } ,
 *     ]}
 * />
 *
 * // Composable
 * <Breadcrumbs>
 *     <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *     <BreadcrumbItem>Add Document</BreadcrumbItem>
 * </Breadcrumbs>
 * ```
 */

import cn                    from '../../themes/helpers/cn' ;
import getBreadcrumbsClasses from '../../themes/components/breadcrumbs' ;

import BreadcrumbItem from './BreadcrumbItem' ;

/**
 * @param {Object} props
 * @param {import('react').ReactNode} [props.children] - Composable BreadcrumbItem children (ignored when `items` is set).
 * @param {string} [props.className] - Additional classes for the wrapper.
 * @param {import('../../themes/components/breadcrumbs').BreadcrumbsSize} [props.size] - Text size ('xs' | 'sm' | 'md' | 'lg').
 * @param {Array<{ id?: string, label: import('react').ReactNode, href?: import('next/link').LinkProps['href'], icon?: import('react').ReactNode }>} [props.items] - Data-driven breadcrumb entries.
 * @param {string} [props.itemClassName] - Additional classes applied to each item `<li>`.
 * @param {string} [props.linkClassName] - Additional classes applied to each item link / span.
 * @param {string} [props.maxWidth] - Max-width utility to enable scrolling (e.g. 'max-w-xs').
 * @returns {React.JSX.Element}
 */
const Breadcrumbs =
({
    children ,
    className ,
    items ,
    itemClassName ,
    linkClassName ,
    maxWidth ,
    size ,
}) =>
{
    const classes = getBreadcrumbsClasses({ className , maxWidth , size }) ;

    return (
        <nav className={ classes } aria-label="breadcrumb">
            <ul>
            {
                Array.isArray( items ) && items.length > 0
                    ? items.map( ( { id , label , href , icon , className : liClassName } = {} , index ) => (
                        <BreadcrumbItem
                            key           = { id ?? `item-${ index }` }
                            className     = { cn( itemClassName , liClassName ) }
                            href          = { href }
                            icon          = { icon }
                            linkClassName = { linkClassName }
                        >
                            { label }
                        </BreadcrumbItem>
                    ) )
                    : children
            }
            </ul>
        </nav>
    ) ;
} ;

Breadcrumbs.displayName = 'Breadcrumbs' ;

export default Breadcrumbs ;
