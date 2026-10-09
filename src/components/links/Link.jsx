'use client' ;

/**
 * Link component wrapping Next.js Link.
 */

import cn            from '../../themes/helpers/cn' ;
import NextLink      from 'next/link' ;
import useActiveLink from '../../hooks/useActiveLink' ;

import LinkPending , { pendingOptions } from './LinkPending' ;

/**
 * Link component wrapping Next.js Link.
 *
 * @param {Object} props
 * @param {string} [props.activeClassName] - Class applied when link matches current page.
 * @param {import('react').ReactNode} [props.children] - Link content.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.exact=true] - Light the link on its page only, or — `false` — on the page and everything below it (a section link). A click is blocked only on the very page, so a section link stays usable from below.
 * @param {import('next/link').LinkProps['href']} props.href - Destination URL or route object.
 * @param {import('react').MouseEventHandler} [props.onClick] - Click handler.
 * @param {boolean|Object} [props.pendingIndicator=false] - Show an indicator after the content while this link's navigation is pending (`LinkPending`) : `true`, or its props — `{ animation : 'dots' , color : 'neutral' }`. Off by default : on a route with a loading boundary the window is milliseconds long.
 * @param {import('react').Ref<HTMLAnchorElement>} [props.ref] - Forwarded ref.
 */
const Link =
({
    activeClassName ,
    children ,
    className ,
    exact = true ,
    href ,
    onClick ,
    pendingIndicator = false ,

    ref ,

    ...rest
}) =>
{
    const { ariaCurrent , handleClick , isActive } = useActiveLink( href , { exact } ) ;

    return (
        <NextLink
            aria-current = { ariaCurrent }
            className    = { cn( className , isActive && activeClassName ) }
            href         = { href }
            onClick      = { ( e ) => handleClick( e , onClick ) }
            ref          = { ref }

            { ...rest }
        >
            { children }
            { pendingIndicator && <LinkPending { ...pendingOptions( pendingIndicator ) } /> }
        </NextLink>
    ) ;
} ;

Link.displayName = 'Link' ;

export default Link ;