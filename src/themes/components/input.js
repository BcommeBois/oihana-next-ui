import cn from '../helpers/cn' ;

import { LG, MD, SM, XL, XS } from '../sizing/sizes' ;

import {
    ACCENT,
    ERROR,
    INFO,
    NEUTRAL,
    PRIMARY,
    SECONDARY,
    SUCCESS,
    WARNING,
} from '../colors' ;

/**
 * Valid input colors.
 * @type {string[]}
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
 * Valid input sizes.
 * @type {string[]}
 */
export const sizes =
[
    XL ,
    LG ,
    MD ,
    SM ,
    XS ,
] ;

// Styles

export const GHOST = 'ghost' ;

/**
 * @typedef {'ghost'} InputStyle
 */

export const styles = [ GHOST ] ;

const colorMap =
{
    [ ACCENT    ] : 'input-accent',
    [ ERROR     ] : 'input-error',
    [ INFO      ] : 'input-info',
    [ NEUTRAL   ] : 'input-neutral',
    [ PRIMARY   ] : 'input-primary',
    [ SECONDARY ] : 'input-secondary',
    [ SUCCESS   ] : 'input-success',
    [ WARNING   ] : 'input-warning',
} ;

const styleMap =
{
    [ GHOST ] : 'input-ghost',
} ;

const sizeMap =
{
    [ XL ] : 'input-xl',
    [ LG ] : 'input-lg',
    [ MD ] : 'input-md',
    [ SM ] : 'input-sm',
    [ XS ] : 'input-xs',
} ;

export const INPUT = 'input' ;

/**
 * Generates input class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Input color variant.
 * @param {string} [props.size='md'] - Input size (xs, sm, md, lg, xl).
 * @param {InputStyle} [props.style] - Input style variant (ghost).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getInputClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'input input-primary input-lg'
 *
 * getInputClasses({ style: 'ghost' }) ;
 * // → 'input input-ghost'
 *
 * getInputClasses({ size: 'xl' }) ;
 * // → 'input input-xl'
 * ```
 */
export const getInputClasses =
({
     after,
     before,
     beforeClassName,
     className,
     color,
     size = MD ,
     style,
}
= {} ) => cn
(
    beforeClassName,
    {
        ...before,

        [ INPUT ] : true,

        ...!!styleMap[style] && { [ styleMap[style] ] : true } ,
        ...!!colorMap[color] && { [ colorMap[color] ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true } ,

        ...after,
    },
    className,
) ;

export default getInputClasses ;