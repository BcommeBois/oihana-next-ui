'use client' ;

/**
 * Back navigation link with icon.
 */

import { useRouter } from 'next/navigation' ;
import NextLink      from 'next/link' ;
import { MdKeyboardReturn as DefaultBackIcon } from 'react-icons/md' ;

import cn            from '@/themes/helpers/cn' ;
import useActiveLink from '@/hooks/useActiveLink' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} [props.disabledClassName='opacity-40'] - Class applied when disabled.
 * @param {boolean} [props.history=false] - Use browser history instead of href.
 * @param {string|Object} [props.href='/'] - Destination URL.
 * @param {any} [props.Icon=BackIcon] - Icon component.
 * @param {string} [props.label] - Link label text.
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

    ref ,
    ...rest
}) =>
{
    const router = useRouter() ;

    const { isActive , handleClick : handleHrefClick } = useActiveLink( href ) ;

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
            href         = { history ? '#' : href }
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