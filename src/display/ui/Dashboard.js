/**
 * Dashboard layout component.
 *
 * @module display/Dashboard
 */

'use client' ;

import { useState } from 'react' ;

import { MdMenu as MenuIcon } from 'react-icons/md' ;

import Drawer from '@/display/ui/Drawer' ;

import Navbar  from '@/display/ui/Navbar' ;
import Sidebar from '@/display/ui/Sidebar' ;

import useApplication from '@/contexts/application' ;
import useConfig      from '@/contexts/config' ;

/**
 * @typedef {'aside' | 'top'} DashboardLayout
 */

export const ASIDE = 'aside' ;
export const TOP   = 'top' ;

/**
 * @param {Object} props
 * @param {string} [props.breakpoint] - Responsive breakpoint.
 * @param {React.ReactNode} props.children - Page content.
 * @param {string} [props.configPath='ui.dashboard'] - Config context path.
 * @param {DashboardLayout} [props.layout] - Navbar layout mode.
 * @param {string} [props.titleClassName] - The additional title class names.
 */
const Dashboard =
({
    breakpoint: breakpointProp ,
    children ,
    configPath  = 'ui.dashboard' ,
    layout : layoutProp ,
    titleClassName : titleClassNameProp ,
}) =>
{
    const {
        breakpoint = breakpointProp ,
        layout     = layoutProp ,
    }
    = useConfig( configPath ) ?? {} ;

    const { showNavbar , showSidebar } = useApplication() ;

    const [ drawerOpen , setDrawerOpen ] = useState( false ) ;

    const openDrawer  = () => setDrawerOpen( true ) ;
    const closeDrawer = () => setDrawerOpen( false ) ;

    const bp = breakpoint ?? 'lg' ;

    const openButton = showSidebar &&
    (
        <button
            className  = { `btn btn-square btn-ghost ${ bp }:hidden` }
            aria-label = "open sidebar"
            onClick    = { openDrawer }
        >
            <MenuIcon className="size-8" />
        </button>
    ) ;

    const navbar  = showNavbar  && <Navbar left={ openButton } /> ;
    const sidebar = showSidebar && <Sidebar onAction = { closeDrawer } /> ;

    if ( layout === TOP ) // navbar full-width on the top
    {
        return (
            <div className="flex flex-col h-dvh">
                { navbar }
                <Drawer
                    breakpoint       = { bp }
                    className        = "flex-1 min-h-0"
                    contentClassName = "!h-full"
                    sideBarClassName = "!h-full"
                    open             = { drawerOpen }
                    onClose          = { closeDrawer }
                    sideBar          = { sidebar }
                >
                    { children }
                </Drawer>
            </div>
        ) ;
    }

    // Mode "aside" (default) : navbar in the drawer-content
    return (
        <Drawer
            breakpoint = { bp }
            open       = { drawerOpen }
            onClose    = { closeDrawer }
            navBar     = { navbar }
            sideBar    = { sidebar }
        >
            { children }
        </Drawer>
    ) ;
} ;

export default Dashboard ;