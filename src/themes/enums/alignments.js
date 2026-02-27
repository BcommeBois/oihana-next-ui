/**
 * Alignment constants for positioning elements.
 *
 * @module themes/enums/alignments
 *
 * @example
 * ```js
 * import { CENTER , START , STRETCH } from '@/themes/enums/alignments' ;
 *
 * const justify = `justify-${ CENTER }` ;
 * // → 'justify-center'
 *
 * const align = `items-${ STRETCH }` ;
 * // → 'items-stretch'
 * ```
 */

/**
 * Baseline alignment.
 * @type {string}
 */
export const BASELINE = 'baseline' ;

/**
 * Center alignment.
 * @type {string}
 */
export const CENTER = 'center' ;

/**
 * End alignment (right in LTR, left in RTL).
 * @type {string}
 */
export const END = 'end' ;

/**
 * Start alignment (left in LTR, right in RTL).
 * @type {string}
 */
export const START = 'start' ;

/**
 * Stretch alignment (fill container).
 * @type {string}
 */
export const STRETCH = 'stretch' ;

/**
 * @typedef {'baseline' | 'center' | 'end' | 'start' | 'stretch'} Alignment
 */

/**
 * All available alignment values.
 * @type {Alignment[]}
 */
const alignments = [ BASELINE , CENTER , END , START , STRETCH ] ;

export default alignments ;