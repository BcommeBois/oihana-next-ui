'use client' ;

import { use } from 'react' ;

import NavigationContext from './context' ;

/**
 * React hook to access navigation context.
 *
 * @returns {{
 *   navigation: Object[] | null,
 *   setNavigation: (value: Object[]) => void
 * }}
 *
 * @throws {Error} If used outside NavigationProvider.
 *
 * @example
 * ```jsx
 * const { navigation , setNavigation } = useNavigation() ;
 *
 * // Render navigation items
 * navigation?.map( ( item ) => (
 *     <NavItem key={ item.id } { ...item } />
 * ) )
 *
 * // Update navigation
 * setNavigation( newItems ) ;
 * ```
 */
const useNavigation = () =>
{
    const context = use( NavigationContext ) ;

    if ( !context )
    {
        throw new Error( 'useNavigation must be used within a NavigationProvider' ) ;
    }

    return context ;
} ;

export default useNavigation ;