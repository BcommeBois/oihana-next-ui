'use client' ;

/**
 * Single dock entry, rendered as a link (when `href` is set) or a `<button>`.
 *
 * When `href` is provided the item renders a Next.js link and its active state
 * is auto-detected from the current pathname (override with the `active` prop);
 * otherwise it renders a `<button>` driven by `onClick`.
 *
 * @module components/menus/DockItem
 * @see https://daisyui.com/components/dock
 *
 * @example
 * ```jsx
 * <Dock>
 *     <DockItem href="/" icon={ <HomeIcon /> }>Home</DockItem>
 *     <DockItem active icon={ <InboxIcon /> }>Inbox</DockItem>
 *     <DockItem icon={ <CogIcon /> } onClick={ openSettings }>Settings</DockItem>
 * </Dock>
 * ```
 */

import NextLink from 'next/link' ;

import useActiveLink        from '../../hooks/useActiveLink' ;
import { getDockItemClasses , DOCK_LABEL } from '../../themes/components/dock' ;

/**
 * @param {Object} props
 * @param {boolean} [props.active] - Force the active state (overrides pathname auto-detection).
 * @param {import('react').ReactNode} [props.children] - Label content (used when `label` is absent).
 * @param {string} [props.className] - Additional classes for the item.
 * @param {import('next/link').LinkProps['href']} [props.href] - Destination. When omitted the item is a `<button>`.
 * @param {import('react').ReactNode} [props.icon] - Item icon.
 * @param {import('react').ReactNode} [props.label] - Item label (rendered inside `.dock-label`).
 * @param {import('react').MouseEventHandler} [props.onClick] - Click handler.
 * @param {boolean} [props.showLabel=true] - Render the label.
 */
const DockItem =
({
    active ,
    children ,
    className ,
    href ,
    icon ,
    label ,
    onClick ,
    showLabel = true ,

    ...rest
}) =>
{
    const { handleClick , isActive } = useActiveLink( href ) ;

    const resolvedActive = active ?? isActive ;

    const classes = getDockItemClasses({ active : resolvedActive , className }) ;

    const text = label ?? children ;

    const content = (
        <>
            { icon }
            { showLabel && text != null && text !== false && (
                <span className={ DOCK_LABEL }>{ text }</span>
            ) }
        </>
    ) ;

    if ( href )
    {
        return (
            <NextLink
                aria-current = { resolvedActive ? 'page' : undefined }
                className    = { classes }
                href         = { href }
                onClick      = { ( e ) => handleClick( e , onClick ) }
                { ...rest }
            >
                { content }
            </NextLink>
        ) ;
    }

    return (
        <button
            type         = "button"
            aria-current = { resolvedActive ? 'page' : undefined }
            className    = { classes }
            onClick      = { onClick }
            { ...rest }
        >
            { content }
        </button>
    ) ;
} ;

DockItem.displayName = 'DockItem' ;

export default DockItem ;
