/**
 * Line height (leading) utilities for Tailwind CSS.
 *
 * @module themes/typography/lineHeight
 * @see https://tailwindcss.com/docs/line-height
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
 *   | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} LineHeightValue
 */

export const NONE    = 'none' ;
export const TIGHT   = 'tight' ;
export const SNUG    = 'snug' ;
export const NORMAL  = 'normal' ;
export const RELAXED = 'relaxed' ;
export const LOOSE   = 'loose' ;

/**
 * Valid line height values.
 * @type {(string | number)[]}
 */
export const lineHeights =
[
    NONE , TIGHT , SNUG , NORMAL , RELAXED , LOOSE ,
    3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ,
] ;

/**
 * Generates responsive line height class definitions.
 *
 * @param {LineHeightValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getLineHeight( 'relaxed' ) ;
 * // → { 'leading-relaxed': true }
 *
 * getLineHeight( 7 ) ;
 * // → { 'leading-7': true }
 * ```
 */
const getLineHeight = getResponsiveDefinition( create( 'leading-' ) , value => lineHeights.includes( value ) ) ;

export default getLineHeight ;