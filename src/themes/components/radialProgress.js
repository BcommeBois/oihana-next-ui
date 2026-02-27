/**
 * Radial progress class name generator for DaisyUI 5.
 *
 * @module themes/components/radialProgress
 * @see https://daisyui.com/components/radial-progress
 */

import cn from '../helpers/cn' ;

export const RADIAL_PROGRESS = 'radial-progress' ;

/**
 * Generates radial progress class names for DaisyUI 5.
 * Note: Color is controlled via text-{color} classes, not component-specific classes.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getRadialProgressClasses() ;
 * // → 'radial-progress'
 *
 * getRadialProgressClasses({ className: 'text-primary' }) ;
 * // → 'radial-progress text-primary'
 * ```
 */
export const getRadialProgressClasses = ({
    after,
    before,
    beforeClassName,
    className,
}
= {} ) => cn
(
    beforeClassName,
    {
        ...before,

        [ RADIAL_PROGRESS ] : true,

        ...after,
    },
    className,
) ;

export default getRadialProgressClasses ;