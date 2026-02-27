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
 * Valid textarea colors.
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
 * Valid textarea sizes.
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
 * @typedef {'ghost'} TextareaStyle
 */

export const styles = [ GHOST ] ;

const colorMap =
{
    [ ACCENT    ] : 'textarea-accent',
    [ ERROR     ] : 'textarea-error',
    [ INFO      ] : 'textarea-info',
    [ NEUTRAL   ] : 'textarea-neutral',
    [ PRIMARY   ] : 'textarea-primary',
    [ SECONDARY ] : 'textarea-secondary',
    [ SUCCESS   ] : 'textarea-success',
    [ WARNING   ] : 'textarea-warning',
} ;

const styleMap =
{
    [ GHOST ] : 'textarea-ghost',
} ;

const sizeMap =
{
    [ XL ] : 'textarea-xl',
    [ LG ] : 'textarea-lg',
    [ MD ] : 'textarea-md',
    [ SM ] : 'textarea-sm',
    [ XS ] : 'textarea-xs',
} ;

export const TEXTAREA = 'textarea' ;

/**
 * Generates textarea class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Textarea color variant.
 * @param {string} [props.size='md'] - Textarea size (xs, sm, md, lg, xl).
 * @param {TextareaStyle} [props.style] - Textarea style variant (ghost).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getTextareaClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'textarea textarea-primary textarea-lg'
 *
 * getTextareaClasses({ style: 'ghost' }) ;
 * // → 'textarea textarea-ghost'
 *
 * getTextareaClasses({ size: 'xl' }) ;
 * // → 'textarea textarea-xl'
 * ```
 */
export const getTextareaClasses =
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

        [ TEXTAREA ] : true,

        ...!!styleMap[style] && { [ styleMap[style] ] : true } ,
        ...!!colorMap[color] && { [ colorMap[color] ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true } ,

        ...after,
    },
    className,
) ;

export default getTextareaClasses ;