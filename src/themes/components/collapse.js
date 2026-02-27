/**
 * Collapse class name generator for DaisyUI 5.
 *
 * @module themes/components/collapse
 * @see https://daisyui.com/components/collapse
 */

import cn from '../helpers/cn' ;

// Icon types

export const ARROW = 'arrow' ;
export const PLUS  = 'plus' ;

/**
 * @typedef {'arrow' | 'plus'} CollapseIcon
 */

export const icons = [ ARROW , PLUS ] ;

const iconMap =
{
    [ ARROW ] : 'collapse-arrow' ,
    [ PLUS  ] : 'collapse-plus' ,
} ;

// Parts

export const COLLAPSE = 'collapse' ;
export const TITLE    = 'collapse-title' ;
export const CONTENT  = 'collapse-content' ;

/**
 * Generates a DaisyUI collapse className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.disabled=false] - Disabled state.
 * @param {CollapseIcon} [props.icon] - Icon type ('arrow' or 'plus').
 * @param {boolean} [props.open] - Force open state (collapse-open).
 * @param {boolean} [props.close] - Force close state (collapse-close).
 *
 * @returns {string} The collapse className expression.
 *
 * @example
 * ```js
 * getCollapseClasses() ;
 * // → 'collapse'
 *
 * getCollapseClasses({ icon: 'arrow' }) ;
 * // → 'collapse collapse-arrow'
 *
 * getCollapseClasses({ icon: 'plus', open: true }) ;
 * // → 'collapse collapse-plus collapse-open'
 *
 * getCollapseClasses({ close: true }) ;
 * // → 'collapse collapse-close'
 * ```
 */
const getCollapseClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    close = false ,
    disabled = false ,
    icon ,
    open = false ,
}
= {} ) => cn
(
    beforeClassName ,
    COLLAPSE ,
    {
        ...before ,

        ...!!iconMap[icon] && !disabled && { [ iconMap[icon] ] : true } ,

        'collapse-open'  :  open === true && !disabled ,
        'collapse-close' : close === true && !disabled ,

        ...after ,
    } ,
    className ,
) ;

export default getCollapseClasses ;