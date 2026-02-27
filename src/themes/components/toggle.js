/**
 * Toggle class name generator for DaisyUI 5.
 *
 * @module themes/components/toggle
 * @see https://daisyui.com/components/toggle
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
 * Valid toggle colors.
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
 * Valid toggle sizes.
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
    [ ACCENT    ] : 'toggle-accent',
    [ ERROR     ] : 'toggle-error',
    [ INFO      ] : 'toggle-info',
    [ NEUTRAL   ] : 'toggle-neutral',
    [ PRIMARY   ] : 'toggle-primary',
    [ SECONDARY ] : 'toggle-secondary',
    [ SUCCESS   ] : 'toggle-success',
    [ WARNING   ] : 'toggle-warning',
} ;

const sizeMap =
{
    [ XL ] : 'toggle-xl',
    [ LG ] : 'toggle-lg',
    [ MD ] : 'toggle-md',
    [ SM ] : 'toggle-sm',
    [ XS ] : 'toggle-xs',
} ;

export const TOGGLE = 'toggle' ;

/**
 * Generates toggle class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Toggle color variant.
 * @param {string} [props.size='md'] - Toggle size (xs, sm, md, lg, xl).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getToggleClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'toggle toggle-primary toggle-lg'
 *
 * getToggleClasses({ color: 'success' }) ;
 * // → 'toggle toggle-success toggle-md'
 * ```
 */
export const getToggleClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
    size = MD,
}
= {} ) => cn(
    beforeClassName,
    {
        ...before,

        [ TOGGLE ] : true,

        ...!!colorMap[color] && { [ colorMap[color] ] : true },
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true },

        ...after,
    },
    className,
) ;

export default getToggleClasses ;