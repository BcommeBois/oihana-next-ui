/**
 * Word break utilities for Tailwind CSS.
 *
 * @module themes/typography/wordBreak
 * @see https://tailwindcss.com/docs/word-break
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'normal' | 'words' | 'all' | 'keep'} WordBreakValue
 */

export const NORMAL = 'normal' ;
export const WORDS  = 'words' ;
export const ALL    = 'all' ;
export const KEEP   = 'keep' ;

/**
 * Valid word break values.
 * @type {WordBreakValue[]}
 */
export const wordBreaks = [ NORMAL , WORDS , ALL , KEEP ] ;

/**
 * Generates responsive word break class definitions.
 *
 * @param {WordBreakValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getWordBreak( 'all' ) ;
 * // → { 'break-all': true }
 * ```
 */
const getWordBreak = getResponsiveDefinition
(
    create( 'break-' ) ,
    value => wordBreaks.includes( value )
) ;

export default getWordBreak ;