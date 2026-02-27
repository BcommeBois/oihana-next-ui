/**
 * Letter spacing (tracking) utilities for Tailwind CSS.
 *
 * @module themes/typography/letterSpacing
 * @see https://tailwindcss.com/docs/letter-spacing
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'} LetterSpacingValue
 */

export const TIGHTER = 'tighter' ;
export const TIGHT   = 'tight' ;
export const NORMAL  = 'normal' ;
export const WIDE    = 'wide' ;
export const WIDER   = 'wider' ;
export const WIDEST  = 'widest' ;

/**
 * Valid letter spacing values.
 * @type {LetterSpacingValue[]}
 */
export const letterSpacings = [ TIGHTER , TIGHT , NORMAL , WIDE , WIDER , WIDEST ] ;

/**
 * Generates responsive letter spacing class definitions.
 *
 * @param {LetterSpacingValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getLetterSpacing( 'wide' ) ;
 * // → { 'tracking-wide': true }
 * ```
 */
const getLetterSpacing = getResponsiveDefinition( create( 'tracking-' ) , value => letterSpacings.includes( value ) ) ;

export default getLetterSpacing ;