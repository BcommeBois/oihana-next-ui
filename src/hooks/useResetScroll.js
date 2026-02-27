import { useEffect } from 'react' ;

import { usePathname } from 'next/navigation' ;

/**
 * React hook that resets scroll position when the route changes.
 *
 * @param {React.RefObject<HTMLElement>} [ref] - Optional element reference. Defaults to window.
 * @param {boolean} [disabled=false] - Whether to disable the scroll reset.
 * @param {ScrollBehavior} [behavior='instant'] - Scroll behavior: 'instant' or 'smooth'.
 *
 * @example
 * ```js
 * // Reset window scroll on route change
 * useResetScroll() ;
 *
 * // Reset a specific container
 * const containerRef = useRef( null ) ;
 * useResetScroll( containerRef ) ;
 *
 * // With smooth scroll
 * useResetScroll( null , false , 'smooth' ) ;
 * ```
 */
const useResetScroll = ( ref , disabled = false , behavior = 'instant' ) =>
{
    const pathname = usePathname() ;

    useEffect( () =>
    {
        if ( disabled )
        {
            return ;
        }

        const element = ref?.current ?? window ;

        element.scrollTo( { top: 0 , left: 0 , behavior } ) ;
    }
    , [ pathname , disabled , behavior ] ) ;
} ;

export default useResetScroll ;