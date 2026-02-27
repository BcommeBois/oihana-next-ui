import { useEffect, useRef } from 'react';

import { useDrag } from '@use-gesture/react' ;

import { usePathname } from 'next/navigation';

import getBackgroundColor from '@/themes/colors/backgroundColor';
import getShadow          from '@/themes/effects/shadow';

import Logo       from '@/display/ui/Logo';
import Navigation from '@/display/ui/Navigation' ;
import Version    from '@/display/ui/Version';

import useConfig  from '@/contexts/config' ;

import cn from '@/themes/helpers/cn' ;

/**
 * @typedef {Object} LogoConfig
 * @property {boolean} [show] - Whether to display the logo.
 * @property {string} light - Light mode logo source.
 * @property {string} [dark] - Dark mode logo source.
 * @property {string} [className] - CSS classes for logo container (default: 'size-24').
 */

/**
 * @typedef {Object} NavigationConfig
 * @property {boolean} [show] - Whether to display the navigation.
 * @property {string} [className] - CSS classes for Navigation component.
 */

/**
 * @typedef {Object} VersionConfig
 * @property {boolean} [show] - Whether to display the version footer.
 * @property {string} [className] - CSS classes for version footer.
 */

/**
 * @typedef {LogoConfig | React.ComponentType<{className?: string}>} LogoProp
 */

/**
 * @typedef {Object} SwipeConfig
 * @property {number} [threshold=80] - Minimum distance in pixels to trigger close.
 * @property {number} [velocityThreshold=0.5] - Minimum velocity to trigger close.
 */

/**
 * Sidebar component with logo, navigation, and version display.
 * Supports swipe-to-close gesture on mobile.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.configPath='ui.sidebar'] - Config context path.
 * @param {string} [props.homePath='/'] - Home route for logo link.
 * @param {LogoProp} [props.logo] - Logo configuration object or component.
 * @param {NavigationConfig} [props.navigation] - Navigation configuration.
 * @param {Function} [props.onAction] - Called on route change (closes mobile drawer).
 * @param {SwipeConfig} [props.swipe] - Swipe gesture configuration.
 *
 * @example
 * ```jsx
 * // Hide logo and version
 * <Sidebar
 *     logo={{ show: false }}
 *     version={{ show: false }}
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Custom swipe configuration
 * <Sidebar
 *     swipe={{
 *         threshold: 100,
 *         velocityThreshold: 0.8
 *     }}
 *     onAction={closeDrawer}
 * />
 * ```
 */
const Sidebar =
({
     configPath= 'ui.sidebar' ,
     className       : classNameProp ,
     homePath        : homePathProp = '/' ,
     navigation      : navigationProp ,
     logo            : logoProp ,
     swipe           : swipeProp ,
     onAction ,
 }) =>
{
    const {
        homePath        = homePathProp,
        className       = classNameProp,
        logo            = logoProp,
        navigation      = navigationProp,
        swipe           = swipeProp,
    }
    = useConfig( configPath ) ?? {} ;

    const pathname   = usePathname() ;
    const sidebarRef = useRef( null ) ;

    const
    {
        threshold         = 80 ,
        velocityThreshold = 0.5 ,
    }
    = swipe ?? {} ;

    // Close the drawer on every route change (mobile)
    useEffect( () =>
    {
        onAction?.() ;
    }
    , [ pathname , onAction ] ) ;

    /**
     * Swipe gesture handler to close drawer on left swipe.
     */
    useDrag
    (
        ( { movement: [ mx ] , velocity: [ vx ] , direction: [ dx ] , last } = {} ) =>
        {
            // Check if it's a left swipe (negative direction)
            const isLeftSwipe = dx < 0 ;

            // Check if swipe meets threshold or velocity requirements
            const meetsDistance = Math.abs( mx ) > threshold ;
            const meetsVelocity = Math.abs( vx ) > velocityThreshold ;

            // Close drawer on left swipe with sufficient distance or velocity
            if ( last && isLeftSwipe && ( meetsDistance || meetsVelocity ) )
            {
                onAction?.() ;
            }
        } ,
        {
            target        : sidebarRef ,
            filterTaps    : true ,
            axis          : 'x' ,
            preventScroll : false ,
            pointer       : { touch : true , mouse : false } ,
            eventOptions  : { passive : false } ,
        }
    ) ;

    const classNames = cn
    (
        'h-full flex flex-col items-center p-0 touch-pan-y' ,
        className ,
    ) ;

    const {
        className : navigationClassName ,
        show      : showNavigation ,
    }
    = navigation ;

    const navigationElement = showNavigation && (
        <Navigation
            className = { cn( 'p-1 touch-pan-y' , navigationClassName ) }
            onAction  = { onAction }
        />
    )

    return (
        <aside ref={ sidebarRef } className={ classNames }>

            <Logo onClick = { onAction } />

            <div className="flex-1 overflow-y-auto min-h-0 w-full touch-pan-y">
                { navigationElement }
            </div>

            <Version />

        </aside>
    ) ;
} ;

export default Sidebar ;