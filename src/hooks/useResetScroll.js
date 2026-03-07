import { useEffect }                     from 'react' ;
import { usePathname } from 'next/navigation' ;

/**
 * Resets scroll position when the route (pathname) changes.
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
    const pathname = usePathname() ;

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
    , [ behavior , disabled , pathname , ref , scrollClassName ] ) ;
} ;

export default useResetScroll ;