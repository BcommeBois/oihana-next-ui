'use client' ;

/**
 * Link component wrapping Next.js Link.
 */

import NextLink from 'next/link' ;
import cn       from '@/themes/helpers/cn' ;
import useActiveLink from '@/hooks/useActiveLink' ;

/**
 * Link component wrapping Next.js Link.
 *
 * @param {Object} props
 * @param {string} [props.activeClassName] - Class applied when link matches current page.
 * @param {import('react').ReactNode} [props.children] - Link content.
 * @param {string} [props.className] - Additional class names.
 * @param {import('next/link').LinkProps['href']} props.href - Destination URL or route object.
 * @param {import('react').MouseEventHandler} [props.onClick] - Click handler.
 * @param {import('react').Ref<HTMLAnchorElement>} [props.ref] - Forwarded ref.
 */
const Link =
({
    activeClassName ,
    children ,
    className ,
    href ,
    onClick ,

    ref ,

    ...rest
}) =>
{
    const { handleClick , isActive } = useActiveLink( href ) ;

    return (
        <NextLink
            aria-current = { isActive ? 'page' : undefined }
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