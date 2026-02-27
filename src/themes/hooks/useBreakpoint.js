import { useMedia } from 'react-use' ;

import breakpoints from '../enums/breakpoints' ;

/**
 * React hook to detect if viewport matches a breakpoint.
 *
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} breakpointKey - The breakpoint to match.
 * @returns {boolean} True if viewport width >= breakpoint.
 *
 * @example
 * ```js
 * const isDesktop = useBreakpoint( 'lg' ) ;
 * const isMobile  = !useBreakpoint( 'md' ) ;
 *
 * return isDesktop ? <DesktopNav /> : <MobileNav /> ;
 * ```
 *
 * @example
 * ```js
 * const isSm = useBreakpoint( 'sm' ) ;  // >= 640px
 * const isMd = useBreakpoint( 'md' ) ;  // >= 768px
 * const isLg = useBreakpoint( 'lg' ) ;  // >= 1024px
 * const isXl = useBreakpoint( 'xl' ) ;  // >= 1280px
 * ```
 */
const useBreakpoint = ( breakpointKey ) =>
{
    const breakpointValue = breakpoints[ breakpointKey ] ;

    if ( process.env.NODE_ENV === 'development' && !breakpointValue )
    {
        console.warn( `useBreakpoint: unknown breakpoint "${ breakpointKey }"` ) ;
    }

    return useMedia( `(min-width: ${ breakpointValue ?? '0px' })` , false ) ;
} ;

export default useBreakpoint ;