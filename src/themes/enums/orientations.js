/**
 * Orientation constants for directional layouts.
 *
 * @module themes/enums/orientations
 *
 * @example
 * ```js
 * import { HORIZONTAL , VERTICAL } from '@/themes/enums/orientations' ;
 *
 * const divider = `divider-${ HORIZONTAL }` ;
 * // → 'divider-horizontal'
 * ```
 */

/**
 * Horizontal orientation.
 * @type {string}
 */
export const HORIZONTAL = 'horizontal' ;

/**
 * Vertical orientation.
 * @type {string}
 */
export const VERTICAL = 'vertical' ;

/**
 * @typedef {'horizontal' | 'vertical'} Orientation
 */

/**
 * All available orientation values.
 * @type {Orientation[]}
 */
const orientations =
[
    HORIZONTAL ,
    VERTICAL ,
] ;

export default orientations ;