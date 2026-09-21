/**
 * Hook to detect if a link matches the current page.
 *
 * Two questions, kept apart on purpose :
 *
 * - **is the link lit ?** — `isActive`, judged by {@link module:helpers/routes/isPathActive}
 *   with the `exact` option : the page only, or the page and everything below it ;
 * - **is this the very page ?** — `isCurrent`, always exact. It is what blocks
 *   the click : a section link lit from a sub-page must still take the reader
 *   back up to the section, only a link to the page already on screen does
 *   nothing.
 *
 * `ariaCurrent` follows : `'page'` on the page itself, `'true'` on a section
 * link lit from below it — the value ARIA gives to « the current item of a
 * set » — and nothing otherwise.
 *
 * @module hooks/useActiveLink
 */

import { useCallback } from 'react' ;
import { usePathname } from 'next/navigation' ;

import isPathActive from '../helpers/routes/isPathActive' ;

/**
 * Hook to detect if a link matches the current page.
 *
 * @param {string|Object} href - Destination URL or route object.
 * @param {Object}  [options]
 * @param {boolean} [options.exact=true] - Light the link on its page only, or on the page and everything below it.
 * @returns {{ ariaCurrent: ('page'|'true'|undefined), isActive: boolean, isCurrent: boolean, handleClick: (e: any, onClick?: Function) => void }}
 *
 * @example
 * ```js
 * const { isActive , handleClick } = useActiveLink( '/customers' , { exact : false } ) ;
 * ```
 */
const useActiveLink = ( href , { exact = true } = {} ) =>
{
    const pathname = usePathname() ;

    const isCurrent = isPathActive( pathname , href ) ;
    const isActive  = isCurrent || isPathActive( pathname , href , { exact } ) ;

    const ariaCurrent = isCurrent ? 'page' : ( isActive ? 'true' : undefined ) ;

    const handleClick = useCallback( ( e , onClick ) =>
    {
        if ( isCurrent )
        {
            e.preventDefault() ;
            return ;
        }
        onClick?.( e ) ;
    }
    , [ isCurrent ] ) ;

    return { ariaCurrent , handleClick , isActive , isCurrent } ;
} ;

export default useActiveLink ;
