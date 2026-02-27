import useBreakpoint from './useBreakpoint' ;

import
{
    SM ,
    MD ,
    LG ,
    XL ,
    XXL ,
}
from '../enums/breakpoints' ;

/**
 * React hook that returns all breakpoint states.
 *
 * @returns {{ sm: boolean , md: boolean , lg: boolean , xl: boolean , '2xl': boolean }}
 *
 * @example
 * ```js
 * import useBreakpoints , { LG , XXL } from '@/themes/hooks/useBreakpoints' ;
 *
 * const breakpoints = useBreakpoints() ;
 * const { sm , md , lg , xl , [ XXL ]: xxl } = breakpoints ;
 *
 * console.log( { sm , md , lg , xl , xxl } ) ;
 * // { sm: true , md: true , lg: true , xl: false , xxl: false }
 * ```
 *
 * @example
 * ```jsx
 * const { md , lg } = useBreakpoints() ;
 *
 * if ( lg ) return <DesktopLayout /> ;
 * if ( md ) return <TabletLayout /> ;
 * return <MobileLayout /> ;
 * ```
 */
const useBreakpoints = () =>
{
    const sm  = useBreakpoint( SM  ) ;
    const md  = useBreakpoint( MD  ) ;
    const lg  = useBreakpoint( LG  ) ;
    const xl  = useBreakpoint( XL  ) ;
    const xxl = useBreakpoint( XXL ) ;

    return {
        [ SM  ] : sm ,
        [ MD  ] : md ,
        [ LG  ] : lg ,
        [ XL  ] : xl ,
        [ XXL ] : xxl
    } ;
} ;

export default useBreakpoints ;

export { SM , MD , LG , XL , XXL } from '../enums/breakpoints' ;