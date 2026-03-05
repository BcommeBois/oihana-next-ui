/**
 * Dashboard layout component.
 *
 * Renders a full-page layout with a responsive sidebar drawer and navbar.
 * Supports two layout modes: `aside` (default) and `top`.
 *
 * In `aside` mode, the navbar is embedded inside the drawer content area.
 * In `top` mode, the navbar sits above the drawer at full width.
 *
 * @module display/Dashboard
 *
 * @example
 * ```jsx
 * <Dashboard>
 *     <Page />
 * </Dashboard>
 * ```
 *
 * @example
 * ```jsx
 * // Top navbar layout
 * <Dashboard layout="top">
 *     <Page />
 * </Dashboard>
 * ```
 */

'use client' ;

import { useState } from 'react' ;

import { MdMenu as MenuIcon } from 'react-icons/md' ;

import Drawer  from './Drawer' ;
import Navbar  from './Navbar' ;
import Sidebar from './Sidebar' ;

import useApplication from '../../contexts/application/useApplication' ;
import useConfig      from '../../contexts/config/useConfig' ;

/**
 * @typedef {'aside' | 'top'} DashboardLayout
 */

export const ASIDE = 'aside' ;
export const TOP   = 'top' ;

/**
 * @param {Object}          props
 * @param {string}          [props.breakpoint='lg']            - Responsive breakpoint for the sidebar drawer.
 * @param {React.ReactNode} props.children                     - Page content.
 * @param {string}          [props.configPath='ui.dashboard']  - Config context path.
 * @param {DashboardLayout} [props.layout='aside']             - Navbar layout mode.
 * @param {string}          [props.titleClassName]             - Additional class names forwarded to the navbar title.
 */
const Dashboard =
({
    breakpoint: breakpointProp ,
    children ,
    configPath  = 'ui.dashboard' ,
    layout : layoutProp ,
    titleClassName  ,
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

    const navbar  = showNavbar  && <Navbar left={ openButton } titleClassName={ titleClassName } /> ;
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