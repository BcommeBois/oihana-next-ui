/**
 * Flag menu item with tooltip support.
 *
 * @module components/menus/FlagItem
 */

import cn from '../../themes/helpers/cn' ;

import Flag    from '../../components/icons/Flag' ;
import Tooltip from '../../components/Tooltip' ;

import { BOTTOM } from '../../themes/enums/positions' ;

/**
 * @param {Object} props
 * @param {boolean} [props.active] - Active state.
 * @param {string} [props.className] - Additional classes.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} props.lang - Language code.
 * @param {Function} [props.onClick] - Click handler.
 * @param {boolean} [props.showIndicator] - Show indicator dot.
 * @param {boolean} [props.showTooltip=true] - Show tooltip.
 * @param {string} [props.tooltip] - Tooltip text (defaults to lang).
 * @param {import('../../themes/components/tooltip').TooltipAlignment} [props.tooltipAlign] - Tooltip alignment ('start' | 'center' | 'end').
 * @param {string} [props.tooltipClassName] - Tooltip classes.
 * @param {string} [props.tooltipColor] - Tooltip color.
 * @param {string} [props.tooltipPosition] - Tooltip position.
 * @returns {React.JSX.Element}
 */
const FlagItem =
({
    active ,
    className ,
    disabled ,
    lang ,
    onClick ,
    showIndicator ,
    showTooltip = true ,
    tooltip ,
    tooltipAlign ,
    tooltipClassName ,
    tooltipColor ,
    tooltipPosition = BOTTOM ,
}) =>
{
    const itemClasses = cn
    (
        className ,
        active && 'active !bg-opacity-60 border-b-2 border-base-content' ,
        disabled && 'pointer-events-none opacity-70 cursor-default' ,
    ) ;

    const flag = (
        <li>
            <a onClick={ onClick } className={ itemClasses }>
                <Flag lang={ lang } />
            </a>
        </li>
    ) ;

    // Always render the indicator wrapper so every flag shares the same
    // DOM structure — a conditional wrapper vertically misaligns the
    // flags with a dot against the ones without.
    const content = (
        <div className="indicator">
            { showIndicator && (
                <span className="indicator-item bg-primary rounded-full w-1.5! h-1.5!" />
            ) }
            { flag }
        </div>
    ) ;

    return (
        <Tooltip
            align={ tooltipAlign }
            className={ tooltipClassName }
            color={ tooltipColor }
            tip={ tooltip ?? lang }
            position={ tooltipPosition }
            show={ showTooltip }
        >
            { content }
        </Tooltip>
    ) ;
} ;

FlagItem.displayName = 'FlagItem' ;

export default FlagItem ;