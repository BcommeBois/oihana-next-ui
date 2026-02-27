'use client' ;

import { useContext } from 'react' ;

import ApplicationContext from './context'

/**
 * React hook to access application context.
 *
 * @returns {{
 *   isLocked: boolean,
 *   rootClassName: string,
 *   rootStyle: Object,
 *   setIsLocked: (value: boolean) => void,
 *   setSidebarHeight: (value: string) => void,
 *   setShowNavbar: (value: boolean) => void,
 *   setShowSidebar: (value: boolean) => void,
 *   showNavbar: boolean,
 *   showSidebar: boolean,
 *   sidebarHeight: string
 * }}
 *
 * @throws {Error} If used outside ApplicationProvider.
 *
 * @example
 * ```jsx
 * const { showSidebar , setShowSidebar } = useApplication() ;
 *
 * <button onClick={ () => setShowSidebar( !showSidebar ) }>
 *     Toggle Sidebar
 * </button>
 * ```
 *
 * @example
 * ```jsx
 * const { rootClassName , rootStyle } = useApplication() ;
 *
 * <main className={ rootClassName } style={ rootStyle }>
 *     { children }
 * </main>
 * ```
 */
const useApplication = () =>
{
    const context = useContext( ApplicationContext ) ;

    if ( !context )
    {
        throw new Error( 'useApplication must be used within an ApplicationProvider' ) ;
    }

    return context ;
} ;

export default useApplication ;