/**
 * Badge class name generator for DaisyUI.
 *
 * @module themes/components/badge
 * @see https://daisyui.com/components/badge
 */

import cn from '../helpers/cn' ;

import
{
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

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Colors

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} BadgeColorValue
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
 * Valid badge colors.
 * @type {BadgeColorValue[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

const colorMap =
{
    [ ACCENT    ] : 'badge-accent' ,
    [ ERROR     ] : 'badge-error' ,
    [ INFO      ] : 'badge-info' ,
    [ NEUTRAL   ] : 'badge-neutral' ,
    [ PRIMARY   ] : 'badge-primary' ,
    [ SECONDARY ] : 'badge-secondary' ,
    [ SUCCESS   ] : 'badge-success' ,
    [ WARNING   ] : 'badge-warning' ,
} ;

// Styles

export const DASH    = 'dash' ;
export const GHOST   = 'ghost' ;
export const OUTLINE = 'outline' ;
export const SOFT    = 'soft' ;

/**
 * @typedef {'dash' | 'ghost' | 'outline' | 'soft'} BadgeStyle
 */

export const styles = [ DASH , GHOST , OUTLINE , SOFT ] ;

const styleMap =
{
    [ DASH    ] : 'badge-dash' ,
    [ GHOST   ] : 'badge-ghost' ,
    [ OUTLINE ] : 'badge-outline' ,
    [ SOFT    ] : 'badge-soft' ,
} ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} BadgeSize
 */

export const sizes = [ XS , SM , MD , LG , XL ] ;

const sizeMap =
{
    [ XS ] : 'badge-xs' ,
    [ SM ] : 'badge-sm' ,
    [ MD ] : 'badge-md' ,
    [ LG ] : 'badge-lg' ,
    [ XL ] : 'badge-xl' ,
} ;

export const BADGE = 'badge' ;

/**
 * Generates a DaisyUI badge className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {BadgeColorValue} [props.color] - Badge color.
 * @param {BadgeSize} [props.size] - Badge size.
 * @param {BadgeStyle} [props.style] - Badge style variant.
 *
 * @returns {string} The badge className expression.
 *
 * @example
 * ```js
 * getBadgeClassNames({ color: 'primary' }) ;
 * // → 'badge badge-primary'
 *
 * getBadgeClassNames({ color: 'error' , style: 'outline' }) ;
 * // → 'badge badge-error badge-outline'
 *
 * getBadgeClassNames({ color: 'info' , style: 'soft' , size: 'lg' }) ;
 * // → 'badge badge-info badge-soft badge-lg'
 * ```
 */
const getBadgeClassNames =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size ,
    style ,
}
= {} ) => cn
(
    beforeClassName ,
    BADGE ,
    {
        ...before ,

        ...!!colorMap[color] && { [ colorMap [ color ] ] : true } ,
        ...!!styleMap[style] && { [ styleMap [ style ] ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap  [ size  ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getBadgeClassNames ;