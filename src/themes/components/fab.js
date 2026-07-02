/**
 * FAB (Floating Action Button) / Speed Dial class name generator for DaisyUI 5.
 *
 * daisyUI's `.fab` is `position: fixed` by default and opens on `:focus-within`
 * / `:hover` (no JS needed). Pass `position: 'absolute'` (or `'relative'`) to
 * embed it inside a positioned container — e.g. a demo frame.
 *
 * @module themes/components/fab
 * @see https://daisyui.com/components/fab
 */

import cn from '../helpers/cn' ;

import getPosition , { FIXED } from '../layout/position' ;

/**
 * The base FAB container class.
 * @type {string}
 */
export const FAB = 'fab' ;

/**
 * Modifier opening the speed dial in a quarter-circle arrangement.
 * @type {string}
 */
export const FAB_FLOWER = 'fab-flower' ;

/**
 * Class for the close button (replaces the trigger when the FAB is open).
 * @type {string}
 */
export const FAB_CLOSE = 'fab-close' ;

/**
 * Class for the main-action button (replaces the trigger when the FAB is open).
 * @type {string}
 */
export const FAB_MAIN_ACTION = 'fab-main-action' ;

/**
 * Generates FAB container class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {boolean} [props.flower=false] - Open in a quarter circle (`fab-flower`).
 * @param {import('../layout/position').PositionValue} [props.position='fixed'] - CSS position (use 'absolute' / 'relative' to embed).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getFabClasses() ;
 * // → 'fab fixed'
 *
 * getFabClasses({ flower: true }) ;
 * // → 'fab fab-flower fixed'
 *
 * getFabClasses({ position: 'absolute' }) ;
 * // → 'fab absolute'
 * ```
 */
export const getFabClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    flower = false ,
    position = FIXED ,
}
= {} ) => cn
(
    beforeClassName ,
    FAB ,
    {
        ...before ,

        ...!!flower && { [ FAB_FLOWER ] : true } ,
        ...getPosition( position ) ,

        ...after ,
    } ,
    className ,
) ;

export default getFabClasses ;
