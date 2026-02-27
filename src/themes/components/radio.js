/**
 * Radio class name generator for DaisyUI 5.
 *
 * @module themes/components/radio
 * @see https://daisyui.com/components/radio
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
 * Valid radio colors.
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
 * Valid radio sizes.
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
    [ ACCENT    ] : 'radio-accent',
    [ ERROR     ] : 'radio-error',
    [ INFO      ] : 'radio-info',
    [ NEUTRAL   ] : 'radio-neutral',
    [ PRIMARY   ] : 'radio-primary',
    [ SECONDARY ] : 'radio-secondary',
    [ SUCCESS   ] : 'radio-success',
    [ WARNING   ] : 'radio-warning',
} ;

const sizeMap =
{
    [ XL ] : 'radio-xl',
    [ LG ] : 'radio-lg',
    [ MD ] : 'radio-md',
    [ SM ] : 'radio-sm',
    [ XS ] : 'radio-xs',
} ;

export const RADIO = 'radio' ;

/**
 * Generates radio class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Radio color variant.
 * @param {string} [props.size='md'] - Radio size (xs, sm, md, lg, xl).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getRadioClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'radio radio-primary radio-lg'
 *
 * getRadioClasses({ color: 'error' }) ;
 * // → 'radio radio-error radio-md'
 * ```
 */
export const getRadioClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
    size = MD,
}
= {} ) => cn
(
    beforeClassName,
    {
        ...before,

        [ RADIO ] : true,

        ...!!colorMap[color] && { [ colorMap[color] ] : true },
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true },

        ...after,
    },
    className,
) ;

export default getRadioClasses ;