/**
 * Menu link component with icon, label, and tooltip support.
 *
 * @module components/menus/MenuLink
 */

import cn from '../../themes/helpers/cn' ;

import Link from 'next/link' ;

import Tooltip from '../../components/Tooltip' ;

import { BOTTOM } from '../../themes/enums/positions' ;

/**
 * @param {Object} props
 * @param {boolean} [props.active] - Active state.
 * @param {string} [props.className] - Additional classes.
 * @param {React.ReactNode} [props.children] - Custom content.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} [props.label] - Link label.
 * @param {React.ReactNode} [props.icon] - Link icon.
 * @param {string} props.href - Link URL.
 * @param {boolean} [props.showIcon=true] - Show icon.
 * @param {boolean} [props.showLabel=true] - Show label.
 * @param {boolean} [props.showTooltip=false] - Show tooltip.
 * @param {string} [props.tooltip] - Tooltip text (defaults to label).
 * @param {string} [props.tooltipClassName] - Tooltip classes.
 * @param {string} [props.tooltipColor] - Tooltip color.
 * @param {string} [props.tooltipPosition] - Tooltip position.
 * @returns {React.JSX.Element}
 */
const MenuLink =
({
    active ,
    className ,
    children ,
    disabled ,
    label ,
    icon ,
    href ,
    showIcon = true ,
    showLabel = true ,
    showTooltip = false ,
    tooltip: tooltipFromProps ,
    tooltipClassName ,
    tooltipColor ,
    tooltipPosition = BOTTOM ,
    ...props
}) =>
{
    const linkClasses = cn(
        className ,
        active && 'active' ,
        disabled && 'pointer-events-none opacity-40' ,
    ) ;

    const tooltip = tooltipFromProps ?? label ;

    const content = children ?? (
        <span className={ cn( 'relative flex flex-row items-center gap-2 font-medium' , className ) }>
            { showIcon && icon }
            { showLabel && label }
        </span>
    ) ;

    return (
        <li>
            <Link
                className={ linkClasses }
                href={ href }
                passHref
                { ...props }
            >
                <Tooltip
                    className={ tooltipClassName }
                    color={ tooltipColor }
                    label={ tooltip }
                    position={ tooltipPosition }
                    show={ showTooltip && !disabled }
                >
                    { content }
                </Tooltip>
            </Link>
        </li>
    ) ;
} ;

MenuLink.displayName = 'MenuLink' ;

export default MenuLink ;