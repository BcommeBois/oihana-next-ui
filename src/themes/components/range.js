/**
 * Range slider class name generator for DaisyUI 5.
 *
 * @module themes/components/range
 * @see https://daisyui.com/components/range
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

import { HORIZONTAL, VERTICAL } from '../enums/orientations' ;

/**
 * Valid range colors.
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
 * Valid range sizes.
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
    [ ACCENT    ] : 'range-accent',
    [ ERROR     ] : 'range-error',
    [ INFO      ] : 'range-info',
    [ NEUTRAL   ] : 'range-neutral',
    [ PRIMARY   ] : 'range-primary',
    [ SECONDARY ] : 'range-secondary',
    [ SUCCESS   ] : 'range-success',
    [ WARNING   ] : 'range-warning',
} ;

const sizeMap =
{
    [ XL ] : 'range-xl',
    [ LG ] : 'range-lg',
    [ MD ] : 'range-md',
    [ SM ] : 'range-sm',
    [ XS ] : 'range-xs',
} ;

/**
 * Valid range orientations.
 * @type {string[]}
 */
export const orientations = [ HORIZONTAL, VERTICAL ] ;

// Horizontal is the default (no modifier class) ; only vertical adds one.
const orientationMap =
{
    [ VERTICAL ] : 'range-vertical',
} ;

export const RANGE = 'range' ;

/**
 * Generates range slider class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Range color variant.
 * @param {string} [props.orientation='horizontal'] - Range orientation ('horizontal' | 'vertical').
 * @param {string} [props.size='md'] - Range size (xs, sm, md, lg, xl).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getRangeClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'range range-primary range-lg'
 *
 * getRangeClasses({ orientation: 'vertical', color: 'success' }) ;
 * // → 'range range-vertical range-success range-md'
 * ```
 */
export const getRangeClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
    orientation = HORIZONTAL,
    size = MD,
}
= {} ) => cn
(
    beforeClassName,
    {
        ...before,

        [ RANGE ] : true,

        ...!!orientationMap[orientation] && { [ orientationMap[orientation] ] : true },
        ...!!colorMap[color]             && { [ colorMap[color] ] : true },
        ...!!sizeMap[size]               && { [ sizeMap[size]   ] : true },

        ...after,
    },
    className,
) ;

export default getRangeClasses ;