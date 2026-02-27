/**
 * Hook to detect if a link matches the current page.
 *
 * @module hooks/useActiveLink
 */

import { useCallback } from 'react' ;

import { usePathname } from 'next/navigation' ;

/**
 * Hook to detect if a link matches the current page.
 *
 * @param {string|Object} href - Destination URL or route object.
 * @returns {{ isActive: boolean, handleClick: (e: any, onClick?: Function) => void }}
 */
const useActiveLink = href =>
{
    const pathname = usePathname() ;

    const targetPath = typeof href === 'object' && href !== null
        ? href.pathname
        : href ;

    const isActive = pathname === targetPath ;

    const handleClick = useCallback( ( e , onClick ) =>
    {
        if ( isActive )
        {
            e.preventDefault() ;
            return ;
        }

        onClick?.( e ) ;
    }
    , [ isActive ] ) ;

    return { handleClick , isActive } ;
} ;

export default useActiveLink ;