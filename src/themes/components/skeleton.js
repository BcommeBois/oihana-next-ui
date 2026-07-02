/**
 * Skeleton class name generator for DaisyUI 5.
 *
 * @module themes/components/skeleton
 * @see https://daisyui.com/components/skeleton
 */

import cn from '../helpers/cn' ;

/**
 * The base skeleton class.
 * @type {string}
 */
export const SKELETON = 'skeleton' ;

/**
 * The modifier animating the text color instead of the background.
 * @type {string}
 */
export const SKELETON_TEXT = 'skeleton-text' ;

/**
 * Generates skeleton class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {boolean} [props.text=false] - Animate the text color instead of the background (`skeleton-text`).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getSkeletonClasses() ;
 * // → 'skeleton'
 *
 * getSkeletonClasses({ className: 'h-32 w-32' }) ;
 * // → 'skeleton h-32 w-32'
 *
 * getSkeletonClasses({ text: true }) ;
 * // → 'skeleton skeleton-text'
 * ```
 */
export const getSkeletonClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    text = false ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        [ SKELETON ] : true ,

        ...!!text && { [ SKELETON_TEXT ] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getSkeletonClasses ;
