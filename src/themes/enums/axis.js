/**
 * Axis constants for directional utilities.
 *
 * @module themes/enums/axis
 *
 * @example
 * ```js
 * import { X , Y } from '@/themes/enums/axis' ;
 *
 * const overflow = `overflow-${ X }-auto` ;
 * // → 'overflow-x-auto'
 *
 * const scale = `scale-${ Y }-50` ;
 * // → 'scale-y-50'
 * ```
 */

/**
 * Horizontal axis.
 * @type {string}
 */
export const X = 'x' ;

/**
 * Vertical axis.
 * @type {string}
 */
export const Y = 'y' ;

/**
 * @typedef {'x' | 'y'} Axis
 */

/**
 * All available axis values.
 * @type {Axis[]}
 */
const axis = [ X , Y ] ;

export default axis ;