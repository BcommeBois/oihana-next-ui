/**
 * Alert class name generator for DaisyUI.
 *
 * @module themes/components/alert
 * @see https://daisyui.com/components/alert
 *
 * @safelist
 * ## Colors
 * - alert-error | alert-info | alert-success | alert-warning
 *
 * ## Styles
 * - alert-dash | alert-outline | alert-soft
 *
 * ## Directions
 * - alert-horizontal | alert-vertical
 */

import cn from '../helpers/cn' ;

import {
    ERROR ,
    INFO ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

/**
 * @typedef {'error' | 'info' | 'success' | 'warning'} AlertColor
 * @typedef {'dash' | 'outline' | 'soft'} AlertStyle
 * @typedef {'horizontal' | 'vertical'} AlertDirection
 */

// Colors

export { ERROR , INFO , SUCCESS , WARNING } from '../colors' ;

/**
 * Valid alert colors.
 * @type {AlertColor[]}
 */
export const colors = [ ERROR , INFO , SUCCESS , WARNING ] ;

/**
 * Alert color class mapping.
 * @type {Object.<AlertColor, string>}
 */
const colorMap =
{
    [ ERROR   ] : 'alert-error' ,
    [ INFO    ] : 'alert-info' ,
    [ SUCCESS ] : 'alert-success' ,
    [ WARNING ] : 'alert-warning' ,
} ;

// Styles

export const DASH    = 'dash' ;
export const OUTLINE = 'outline' ;
export const SOFT    = 'soft' ;

/**
 * Valid alert styles.
 * @type {AlertStyle[]}
 */
export const styles = [ DASH , OUTLINE , SOFT ] ;

/**
 * Alert style class mapping.
 * @type {Object.<AlertStyle, string>}
 */
const styleMap =
{
    [ DASH    ] : 'alert-dash' ,
    [ OUTLINE ] : 'alert-outline' ,
    [ SOFT    ] : 'alert-soft' ,
} ;

// Directions

export const HORIZONTAL = 'horizontal' ;
export const VERTICAL   = 'vertical' ;

/**
 * Valid alert directions.
 * @type {AlertDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Alert direction class mapping.
 * @type {Object.<AlertDirection, string>}
 */
const directionMap =
{
    [ HORIZONTAL ] : 'alert-horizontal' ,
    [ VERTICAL   ] : 'alert-vertical' ,
} ;

/**
 * Generates a DaisyUI alert className expression.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {AlertColor} [props.color] - Alert color.
 * @param {AlertDirection} [props.direction] - Layout direction.
 * @param {AlertStyle} [props.style] - Alert style variant.
 * @returns {string} The alert className expression.
 *
 * @example
 * ```js
 * getAlertClassNames({ color: 'error' }) ;
 * // → 'alert alert-error'
 *
 * getAlertClassNames({ color: 'info' , style: 'outline' }) ;
 * // → 'alert alert-info alert-outline'
 *
 * getAlertClassNames({ color: 'success' , style: 'soft' , direction: 'vertical' }) ;
 * // → 'alert alert-success alert-soft alert-vertical'
 * ```
 */
const getAlertClassNames =
({
    beforeClassName ,
    className ,
    color ,
    direction ,
    style ,
}
= {} ) => cn
(
    beforeClassName ,
    'alert' ,
    color && colorMap[ color ] ,
    style && styleMap[ style ] ,
    direction && directionMap[ direction ] ,
    className ,
) ;

export default getAlertClassNames ;