import { useEffect }                     from 'react' ;
import { usePathname , useSearchParams } from 'next/navigation' ;

/**
 * Resets scroll position when the route (pathname or searchParams) changes.
 *
 * @param {React.RefObject} [ref]                              - Optional scroll container ref.
 * @param {boolean}         [disabled=false]                   - Disabled the reset scroll behavior
 * @param {string}          [scrollClassName='drawer-content'] - CSS class of the fallback scroll container.
 * @param {ScrollBehavior}  [behavior='auto']                  - Scroll behavior. Defaults to an instant jump: on a route change the outgoing (longer) page is still mounted while the incoming (shorter) RSC arrives, so a `'smooth'` animation would reveal an unpainted band below the new content mid-scroll. Pass `'smooth'` explicitly only for intra-page resets where the content height does not change.
 */
const useResetScroll =
(
    ref ,
    disabled = false ,
    scrollClassName = 'drawer-content' ,
    behavior = 'auto'
) =>
{
    const pathname     = usePathname() ;
    const searchParams = useSearchParams() ;

    useEffect( () =>
    {
        if ( disabled )
        {
            return ;
        }

        const element = ref?.current
            ?? document.querySelector( `.${ scrollClassName }` )
            ?? window ;

        element.scrollTo( { top : 0 , behavior } ) ;
    }
    , [ behavior , disabled , pathname , searchParams , ref , scrollClassName ] ) ;
} ;

export default useResetScroll ;