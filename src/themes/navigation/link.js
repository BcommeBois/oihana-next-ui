/**
 * Link class name generator for Tailwind CSS.
 *
 * @module themes/navigation/link
 */

import cn from '@/themes/helpers/cn' ;

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

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} LinkColor
 */

/**
 * Available link colors.
 *
 * @type {LinkColor[]}
 */
export const colors =
[
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
] ;

/**
 * Link color class mapping.
 *
 * @type {Object.<LinkColor, string>}
 */
const colorClasses =
{
    [ ACCENT    ] : 'link-accent' ,
    [ ERROR     ] : 'link-error' ,
    [ INFO      ] : 'link-info' ,
    [ NEUTRAL   ] : 'link-neutral' ,
    [ PRIMARY   ] : 'link-primary' ,
    [ SECONDARY ] : 'link-secondary' ,
    [ SUCCESS   ] : 'link-success' ,
    [ WARNING   ] : 'link-warning' ,
} ;

/**
 * Generates link class names with color and hover support.
 *
 * @param {Object} [props={}] - Link properties.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {LinkColor} [props.color] - Link color (primary, secondary, etc.).
 * @param {boolean} [props.hover=false] - Enable hover effect.
 *
 * @returns {string} The composed link class name string.
 *
 * @example
 * ```js
 * getLinkClasses({ color: 'primary' , hover: true }) ;
 * // → 'link link-primary link-hover'
 *
 * getLinkClasses({ color: 'accent' }) ;
 * // → 'link link-accent'
 *
 * getLinkClasses({ className: 'font-bold' }) ;
 * // → 'link font-bold'
 * ```
 */
export const getLinkClasses =
({
    beforeClassName ,
    className ,
    color ,
    hover = false ,
}
= {} ) => cn
(
    beforeClassName ,
    'link' ,
    color && colorClasses[ color ] ,
    hover && 'link-hover' ,
    className ,
) ;

export default getLinkClasses ;