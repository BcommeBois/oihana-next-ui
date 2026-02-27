/**
 * Position constants for placement utilities.
 *
 * @module themes/enums/positions
 *
 * @example
 * ```js
 * import { TOP , LEFT } from '@/themes/enums/positions' ;
 *
 * const placement = `${ TOP }-${ LEFT }` ;
 * // → 'top-left'
 * ```
 */

/**
 * Bottom position.
 * @type {string}
 */
export const BOTTOM = 'bottom' ;

/**
 * Left position.
 * @type {string}
 */
export const LEFT = 'left' ;

/**
 * Middle position (vertical-align).
 * @type {string}
 */
export const MIDDLE = 'middle' ;

/**
 * Right position.
 * @type {string}
 */
export const RIGHT = 'right' ;

/**
 * Top position.
 * @type {string}
 */
export const TOP = 'top' ;

/**
 * @typedef {'bottom' | 'left' | 'middle' | 'right' | 'top'} Position
 */

/**
 * All available position values.
 * @type {Position[]}
 */
const positions = [ BOTTOM , LEFT , MIDDLE , RIGHT , TOP ] ;

export default positions ;