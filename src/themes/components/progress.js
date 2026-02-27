/**
 * Progress bar class name generator for DaisyUI 5.
 *
 * @module themes/components/progress
 * @see https://daisyui.com/components/progress
 */

import cn from '../helpers/cn' ;

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
 * Valid progress colors.
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

const colorMap =
{
    [ ACCENT    ] : 'progress-accent',
    [ ERROR     ] : 'progress-error',
    [ INFO      ] : 'progress-info',
    [ NEUTRAL   ] : 'progress-neutral',
    [ PRIMARY   ] : 'progress-primary',
    [ SECONDARY ] : 'progress-secondary',
    [ SUCCESS   ] : 'progress-success',
    [ WARNING   ] : 'progress-warning',
} ;

export const PROGRESS = 'progress' ;

/**
 * Generates progress bar class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Progress color variant.
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getProgressClasses({ color: 'primary' }) ;
 * // → 'progress progress-primary'
 *
 * getProgressClasses({ color: 'success' }) ;
 * // → 'progress progress-success'
 * ```
 */
export const getProgressClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
}
= {} ) => cn
(
    beforeClassName,
    {
        ...before,

        [ PROGRESS ] : true,

        ...!!colorMap[color] && { [ colorMap[color] ] : true },

        ...after,
    },
    className,
) ;

export default getProgressClasses ;