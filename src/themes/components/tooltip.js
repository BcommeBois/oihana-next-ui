/**
 * Tooltip class name generator for DaisyUI.
 *
 * @module themes/components/tooltip
 * @see https://daisyui.com/components/tooltip
 */

import cn from '../helpers/cn' ;

import {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
}
from '../colors' ;

// Colors

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} TooltipColorValue
 */

export {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

/**
 * Valid tooltip colors.
 * @type {TooltipColorValue[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

const colorMap =
{
    [ ACCENT    ] : 'tooltip-accent' ,
    [ ERROR     ] : 'tooltip-error' ,
    [ INFO      ] : 'tooltip-info' ,
    [ NEUTRAL   ] : 'tooltip-neutral' ,
    [ PRIMARY   ] : 'tooltip-primary' ,
    [ SECONDARY ] : 'tooltip-secondary' ,
    [ SUCCESS   ] : 'tooltip-success' ,
    [ WARNING   ] : 'tooltip-warning' ,
} ;

// Positions

export const BOTTOM = 'bottom' ;
export const LEFT   = 'left' ;
export const RIGHT  = 'right' ;
export const TOP    = 'top' ;

/**
 * @typedef {'bottom' | 'left' | 'right' | 'top'} TooltipPosition
 */

/**
 * Valid tooltip positions.
 * @type {TooltipPosition[]}
 */
export const positions = [ BOTTOM , LEFT , RIGHT , TOP ] ;

const positionMap =
{
    [ BOTTOM ] : 'tooltip-bottom' ,
    [ LEFT   ] : 'tooltip-left' ,
    [ RIGHT  ] : 'tooltip-right' ,
    [ TOP    ] : 'tooltip-top' ,
} ;

export const TOOLTIP         = 'tooltip' ;
export const TOOLTIP_CONTENT = 'tooltip-content' ;

/**
 * Generates a DaisyUI tooltip className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {TooltipColorValue} [props.color] - Tooltip color.
 * @param {boolean} [props.open] - Force tooltip open.
 * @param {TooltipPosition} [props.position] - Tooltip placement.
 *
 * @returns {string} The tooltip className expression.
 *
 * @example
 * ```js
 * getTooltipClassNames({ color: 'primary' }) ;
 * // → 'tooltip tooltip-primary'
 *
 * getTooltipClassNames({ position: 'bottom' , color: 'error' }) ;
 * // → 'tooltip tooltip-error tooltip-bottom'
 *
 * getTooltipClassNames({ open: true , color: 'info' , position: 'left' }) ;
 * // → 'tooltip tooltip-info tooltip-left tooltip-open'
 * ```
 */
const getTooltipClassNames =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    open ,
    position ,
}
= {} ) => cn
(
    beforeClassName ,
    TOOLTIP ,
    {
        ...before ,

        ...!!colorMap[color]         && { [colorMap[color]]         : true } ,
        ...!!positionMap[position]   && { [positionMap[position]]   : true } ,
        ...open === true             && { 'tooltip-open'            : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getTooltipClassNames ;