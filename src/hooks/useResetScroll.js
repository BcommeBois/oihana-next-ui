import { useEffect }                     from 'react' ;
import { usePathname , useSearchParams } from 'next/navigation' ;

/**
 * Resets scroll position when the route (pathname or searchParams) changes.
 *
 * @param {React.RefObject} [ref]                       - Optional scroll container ref.
 * @param {boolean}         [disabled=false]
 * @param {string}          [scrollClassName='drawer-content'] - CSS class of the fallback scroll container.
 * @param {ScrollBehavior}  [behavior='smooth']          - Scroll behavior.
 */
const useResetScroll =
(
    ref ,
    disabled = false ,
    scrollClassName = 'drawer-content' ,
    behavior = 'smooth'
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