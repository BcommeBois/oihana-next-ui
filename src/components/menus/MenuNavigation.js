'use client' ;

/**
 * Navigation menu component.
 *
 * @module components/menus/MenuNavigation
 *
 * @example
 * 'use client' ;
 *
 * import { useState } from 'react';
 *
 * import Logo           from 'oihana-next-ui/@assets/Logo';
 * import Container      from 'oihana-next-ui/display/Container';
 * import Page           from 'oihana-next-ui/display/Page';
 * import Jump           from 'oihana-next-ui/motions/Jump';
 * import LetterReveal   from 'oihana-next-ui/motions/LetterReveal';
 *
 * import FlagMenu from 'oihana-next-ui/components/menus/FlagMenu' ;
 * import MenuNavigation from 'oihana-next-ui/components/menus/MenuNavigation' ;
 *
 * import {
 *     MdHome as HomeIcon ,
 *     MdInfo as AboutIcon ,
 * }
 * from 'react-icons/md' ;
 *
 * export default function MenuTests()
 * {
 *     const [ currentLang , setCurrentLang ] = useState( "fr" );
 *
 *     return (
 *         <Page full className="justify-center gap-8 *:text-base-content pattern-topography text-base-300/20">
 *
 *             <FlagMenu
 *                 lang={ currentLang }
 *                 onChange={ setCurrentLang }
 *                 showLabel
 *                 showTooltip
 *             />
 *
 *             <MenuNavigation
 *                 items =
 *                 {[
 *                     { id: 'home' , label: 'Home' , icon: <HomeIcon /> , path: '/' } ,
 *                     { id: 'about' , label: 'About' , icon: <AboutIcon /> , path: '/about' } ,
 *                 ]}
 *                 orientation = "horizontal"
 *                 size        = "md"
 *                 showIcon
 *                 showLabel
 *             />
 *
 *         </Page>
 *     ) ;
 * }
 */

import format from 'vegas-js-core/src/strings/fastformat' ;

import { usePathname } from 'next/navigation' ;

import getMenuClasses from '../../themes/navigation/menu' ;

import MenuLink from './MenuLink' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Menu classes.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {Object} [props.formatters] - Path formatters.
 * @param {Array} props.items - Menu items ({ id, label, icon, path }).
 * @param {string} [props.linkClassName] - Link classes.
 * @param {string} [props.orientation] - Menu orientation.
 * @param {boolean} [props.showIcon] - Show icons.
 * @param {boolean} [props.showLabel] - Show labels.
 * @param {boolean} [props.showTooltip] - Show tooltips.
 * @param {string} [props.size] - Menu size.
 * @param {string} [props.tooltipClassName] - Tooltip classes.
 * @param {string} [props.tooltipColor] - Tooltip color.
 * @param {string} [props.tooltipPosition] - Tooltip position.
 * @returns {React.JSX.Element | null}
 */
const MenuNavigation =
({
    className ,
    disabled ,
    formatters ,
    items ,
    linkClassName ,
    orientation ,
    showIcon ,
    showLabel ,
    showTooltip ,
    size ,
    tooltipClassName ,
    tooltipColor ,
    tooltipPosition ,
}) =>
{
    const pathname = usePathname() ;

    const menuClasses = getMenuClasses({
        beforeClassName: 'gap-2' ,
        className ,
        orientation ,
        size ,
    }) ;

    if ( !items || items.length === 0 )
    {
        return null ;
    }

    return (
        <ul className={ menuClasses }>
        {
            items.map( ( { id , label , icon , path } = {} , index ) =>
            {
                const url = format( path , formatters ) ;

                return (
                    <MenuLink
                        key={ `item-${ index }` }
                        active={ url === pathname }
                        className={ linkClassName }
                        disabled={ disabled }
                        href={ path }
                        icon={ icon }
                        label={ label }
                        showLabel={ showLabel }
                        showIcon={ showIcon }
                        showTooltip={ showTooltip }
                        tooltipClassName={ tooltipClassName }
                        tooltipColor={ tooltipColor }
                        tooltipPosition={ tooltipPosition }
                    />
                ) ;
            } )
        }
        </ul>
    ) ;
} ;

MenuNavigation.displayName = 'MenuNavigation' ;

export default MenuNavigation ;