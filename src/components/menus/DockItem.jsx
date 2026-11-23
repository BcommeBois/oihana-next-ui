'use client' ;

/**
 * Single dock entry, rendered as a link (when `href` is set) or a `<button>`.
 *
 * When `href` is provided the item renders a Next.js link and its active state
 * is auto-detected from the current pathname (override with the `active` prop);
 * otherwise it renders a `<button>` driven by `onClick`.
 *
 * **A count** — a cart, unread messages — sits on the icon's top corner with
 * `badge`. The pill is hidden from assistive technologies : a bare number out
 * of context means nothing, so the item's name must say the count
 * (`aria-label="Cart, 3 items"`).
 *
 * **A featured item** is the screen's main action — the « + » of a bottom
 * bar — drawn as a filled round raised above the dock's top edge. It is never
 * active (an action is not a place), and its label is not printed : it names
 * the control instead, read out by screen readers.
 *
 * @module components/menus/DockItem
 * @see https://daisyui.com/components/dock
 *
 * @example
 * ```jsx
 * <Dock>
 *     <DockItem href="/" icon={ <HomeIcon /> }>Home</DockItem>
 *     <DockItem active icon={ <InboxIcon /> }>Inbox</DockItem>
 *     <DockItem featured icon={ <AddIcon /> } onClick={ create }>Create</DockItem>
 *     <DockItem aria-label="Cart, 3 items" badge={ 3 } icon={ <CartIcon /> } onClick={ openCart }>Cart</DockItem>
 *     <DockItem exact={ false } href="/contacts" icon={ <ContactsIcon /> }>Contacts</DockItem>
 * </Dock>
 * ```
 */

import NextLink from 'next/link' ;

import cn from '../../themes/helpers/cn' ;

import useActiveLink from '../../hooks/useActiveLink' ;

import Badge     from '../Badge' ;
import Indicator from '../Indicator' ;

import
{
    getDockFeaturedClasses ,
    getDockItemClasses ,
    DOCK_BADGE ,
    DOCK_LABEL ,
}
from '../../themes/components/dock' ;

/**
 * @param {Object} props
 * @param {boolean} [props.active] - Force the active state (overrides pathname auto-detection). Ignored on a featured item.
 * @param {import('react').ReactNode} [props.badge] - A pill on the icon's top corner. A number or a string is drawn in the default pill ; a node is drawn as is ; `null`, `undefined` or `false` draws nothing. A `0` passed is shown.
 * @param {string} [props.badgeClassName] - Additional classes for the default pill.
 * @param {string} [props.badgeColor='primary'] - Colour of the default pill (a daisyUI colour name).
 * @param {import('react').ReactNode} [props.children] - Label content (used when `label` is absent).
 * @param {string} [props.className] - Additional classes for the item.
 * @param {string} [props.color='primary'] - Fill of a featured item's round (a daisyUI colour name). Ignored otherwise.
 * @param {boolean} [props.exact=true] - Light the link on its page only, or — `false` — on the page and everything below it (a section link). A click is blocked only on the very page, so a section link stays usable from below.
 * @param {boolean} [props.featured=false] - The screen's main action : a filled round raised above the dock, never active, its label naming the control instead of being printed.
 * @param {import('next/link').LinkProps['href']} [props.href] - Destination. When omitted the item is a `<button>`.
 * @param {import('react').ReactNode} [props.icon] - Item icon.
 * @param {import('react').ReactNode} [props.label] - Item label (rendered inside `.dock-label`).
 * @param {import('react').MouseEventHandler} [props.onClick] - Click handler.
 * @param {boolean} [props.showLabel=true] - Render the label.
 */
const DockItem =
({
    active ,
    badge ,
    badgeClassName ,
    badgeColor = 'primary' ,
    children ,
    className ,
    color = 'primary' ,
    exact = true ,
    featured = false ,
    href ,
    icon ,
    label ,
    onClick ,
    showLabel = true ,

    ...rest
}) =>
{
    const { ariaCurrent , handleClick , isActive } = useActiveLink( href , { exact } ) ;

    const resolvedActive = featured ? false : ( active ?? isActive ) ;

    const classes = getDockItemClasses({ active : resolvedActive , className }) ;

    const text = label ?? children ;

    const printed = showLabel && !featured ;

    // Hidden, the label is still the only thing naming the control : an item
    // showing nothing but its icon is announced as « button » otherwise. Read out
    // when it is not printed, and left alone when it is — a name repeating the
    // text beside it is said twice.
    const hiddenName = !printed && typeof text === 'string' ? text : undefined ;

    const pill = badge === null || badge === undefined || badge === false
        ? null
        : ( typeof badge === 'number' || typeof badge === 'string'
            ? <Badge aria-hidden className={ cn( DOCK_BADGE , badgeClassName ) } color={ badgeColor } size="xs">{ badge }</Badge>
            : badge ) ;

    const glyph = pill
        ? <Indicator item={ pill }>{ icon }</Indicator>
        : icon ;

    const content = (
        <>
            { featured
                ? <span className={ getDockFeaturedClasses({ color }) }>{ glyph }</span>
                : glyph
            }
            { printed && text != null && text !== false && (
                <span className={ DOCK_LABEL }>{ text }</span>
            ) }
        </>
    ) ;

    if ( href )
    {
        const current = featured
            ? undefined
            : ( active === undefined ? ariaCurrent : ( active ? 'page' : undefined ) ) ;

        return (
            <NextLink
                aria-current = { current }
                aria-label   = { hiddenName }
                className    = { classes }
                href         = { href }
                onClick      = { ( e ) => handleClick( e , onClick ) }
                title        = { hiddenName }
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
            aria-label   = { hiddenName }
            className    = { classes }
            onClick      = { onClick }
            title        = { hiddenName }
            { ...rest }
        >
            { content }
        </button>
    ) ;
} ;

DockItem.displayName = 'DockItem' ;

export default DockItem ;
