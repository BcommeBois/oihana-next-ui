/**
 * Checkbox class name generator for DaisyUI 5.
 *
 * @module themes/components/checkbox
 * @see https://daisyui.com/components/checkbox
 */

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
 * Valid checkbox colors.
 * @type {string[]}
 */
export const colors =
[
    ACCENT,
    ERROR,
    INFO,
    NEUTRAL,
    PRIMARY,
    SECONDARY,
    SUCCESS,
    WARNING,
] ;

/**
 * Valid checkbox sizes.
 * @type {string[]}
 */
export const sizes =
[
    XL,
    LG,
    MD,
    SM,
    XS,
] ;

const colorMap =
{
    [ ACCENT    ] : 'checkbox-accent',
    [ ERROR     ] : 'checkbox-error',
    [ INFO      ] : 'checkbox-info',
    [ NEUTRAL   ] : 'checkbox-neutral',
    [ PRIMARY   ] : 'checkbox-primary',
    [ SECONDARY ] : 'checkbox-secondary',
    [ SUCCESS   ] : 'checkbox-success',
    [ WARNING   ] : 'checkbox-warning',
} ;

const sizeMap =
{
    [ XL ] : 'checkbox-xl',
    [ LG ] : 'checkbox-lg',
    [ MD ] : 'checkbox-md',
    [ SM ] : 'checkbox-sm',
    [ XS ] : 'checkbox-xs',
} ;

export const CHECKBOX = 'checkbox' ;

/**
 * Generates checkbox class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Checkbox color variant.
 * @param {string} [props.size='md'] - Checkbox size (xs, sm, md, lg, xl).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getCheckboxClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'checkbox checkbox-primary checkbox-lg'
 *
 * getCheckboxClasses({ color: 'error' }) ;
 * // → 'checkbox checkbox-error checkbox-md'
 * ```
 */
export const getCheckboxClasses = ({
    after,
    before,
    beforeClassName,
    className,
    color,
    size = MD,
} = {} ) => cn(
    beforeClassName,
    {
        ...before,

        [ CHECKBOX ] : true,

        ...!!colorMap[color] && { [ colorMap[color] ] : true },
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true },

        ...after,
    },
    className,
) ;

export default getCheckboxClasses ;