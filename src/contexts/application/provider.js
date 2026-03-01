'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import ApplicationContext from './context' ;

const DEFAULT_CLASSNAME = 'flex flex-col py-4 px-3 lg:p-8 space-y-2 lg:space-y-4 scroll-smooth overflow-y-scroll' ;

/**
 * Provides application-level context for layout and UI state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.className] - Additional root className.
 * @param {string} [props.sidebarHeight='4rem'] - Initial sidebar height.
 * @param {boolean} [props.showNavbar=true] - Initial navbar visibility.
 * @param {boolean} [props.showSidebar=true] - Initial sidebar visibility.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // In layout.js
 * import { ApplicationProvider } from '@/contexts/application' ;
 *
 * <ApplicationProvider
 *     showNavbar    = { true }
 *     showSidebar   = { true }
 *     sidebarHeight = "4rem"
 * >
 *     { children }
 * </ApplicationProvider>
 * ```
 */
const ApplicationProvider =
({
  children ,
  className    ,
  sidebarHeight       : initialSidebarHeight = '4rem' ,
  showNavbar          : initialShowNavbar    = true ,
  showSidebar         : initialShowSidebar   = true ,
}) =>
{
    const [ isLocked      , setIsLocked      ] = useState( true       ) ;
    const [ showNavbar    , setShowNavbar    ] = useState( initialShowNavbar    ) ;
    const [ showSidebar   , setShowSidebar   ] = useState( initialShowSidebar   ) ;
    const [ sidebarHeight , setSidebarHeight ] = useState( initialSidebarHeight ) ;

    const rootClassName = cn( DEFAULT_CLASSNAME , className ) ;

    const rootStyle =
    {
        minHeight: showNavbar ? `calc( 100vh - ${ sidebarHeight } )` : '100vh'
    } ;

    return (
        <ApplicationContext value=
        {{
            isLocked ,
            rootClassName ,
            rootStyle ,
            setIsLocked ,
            setSidebarHeight ,
            setShowNavbar ,
            setShowSidebar ,
            showNavbar ,
            showSidebar ,
            sidebarHeight ,
        }}>
            { children }
        </ApplicationContext>
    ) ;
} ;

export default ApplicationProvider ;