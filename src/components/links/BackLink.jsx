'use client' ;

/**
 * BackLink — the way back out of a page, as a link.
 *
 * Three ways to say where « back » is :
 *
 *  - **an `href`** (default) — a fixed destination, known while rendering ;
 *  - **`smart`** — the same `href`, unless the page that was left IS that page,
 *    in which case its own URL is used, query included : the list comes back on
 *    the page, the sort and the criteria it was read with
 *    ({@link module:helpers/routes/resolveSmartHref}). It needs a
 *    {@link module:contexts/previousPath/provider} ancestor ; without one it
 *    quietly stays on `href` ;
 *  - **`history`** — pops the browser history instead of linking.
 *
 * ⚠️ **`history` is the weakest of the three, and `smart` replaces it.** « The
 * page rendered before » and « the previous entry of the browser history » are
 * two different things, and they part company as soon as a navigation replaces
 * an entry rather than adding one, or a `back()` has already moved the cursor.
 * When they part, the link shows one destination on hover and goes to another
 * on click — and it can leave the application altogether. A destination that
 * cannot be written into an `href` has no business being a link.
 *
 * @module components/links/BackLink
 *
 * @example
 * ```jsx
 * // A fixed destination
 * <BackLink href="/articles" label="Back to articles" />
 *
 * // The list as it was left — page, sort and criteria included
 * <BackLink smart href="/articles" label="Back to articles" />
 * ```
 */

import { useRouter } from 'next/navigation' ;
import NextLink      from 'next/link' ;
import { MdKeyboardReturn as DefaultBackIcon } from 'react-icons/md' ;

import cn                from '../../themes/helpers/cn' ;
import resolveSmartHref  from '../../helpers/routes/resolveSmartHref' ;
import useActiveLink     from '../../hooks/useActiveLink' ;
import usePreviousPath   from '../../contexts/previousPath/usePreviousPath' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} [props.disabledClassName='opacity-40'] - Class applied when disabled.
 * @param {boolean} [props.history=false] - Pop the browser history instead of linking. Prefer `smart`.
 * @param {string|Object} [props.href='/'] - Destination URL.
 * @param {any} [props.Icon=BackIcon] - Icon component.
 * @param {string} [props.label] - Link label text.
 * @param {boolean} [props.smart=false] - Go back to the previous page's own URL when it is the page `href` names.
 * @param {any} [props.ref] - Forwarded ref.
 */
const BackLink =
({
    className ,
    disabled ,
    disabledClassName = 'opacity-40' ,
    history           = false ,
    href              = '/' ,
    Icon              = DefaultBackIcon ,
    label ,
    smart             = false ,

    ref ,
    ...rest
}) =>
{
    const router = useRouter() ;

    const { previousUrl } = usePreviousPath() ;

    const target = smart ? resolveSmartHref( previousUrl , href ) : href ;

    const { isActive , handleClick : handleHrefClick } = useActiveLink( target ) ;

    const handleNavigation = e =>
    {
        if ( disabled )
        {
            e.preventDefault() ;
            return ;
        }

        if ( history )
        {
            e.preventDefault() ;
            router.back() ;
            return ;
        }

        handleHrefClick( e , rest.onClick ) ;
    } ;

    const classNames = cn
    (
        'inline-flex items-center gap-2 text-sm hover:text-primary font-medium transition-colors' ,
        disabled && 'pointer-events-none' ,
        disabled && disabledClassName ,
        className ,
    ) ;

    return (
        <NextLink
            aria-current = { !history && isActive ? 'page' : undefined }
            className    = { classNames }
            href         = { history ? '#' : target }
            onClick      = { handleNavigation }
            ref          = { ref }
            { ...rest }
        >
            <Icon className="size-5 shrink-0" />
            { label && <span>{ label }</span> }
        </NextLink>
    ) ;
} ;

BackLink.displayName = 'BackLink' ;

export default BackLink ;
