'use client' ;

/**
 * Link component wrapping Next.js Link.
 */

import cn            from '../../themes/helpers/cn' ;
import NextLink      from 'next/link' ;
import useActiveLink from '../../hooks/useActiveLink' ;

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
        </NextLink>
    ) ;
} ;

Link.displayName = 'Link' ;

export default Link ;