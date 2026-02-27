/**
 * Text decoration utilities for Tailwind CSS.
 *
 * @module themes/typography/textDecoration
 * @see https://tailwindcss.com/docs/text-decoration
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'underline' | 'overline' | 'line-through' | 'no-underline'} TextDecorationValue
 */

export const UNDERLINE    = 'underline' ;
export const OVERLINE     = 'overline' ;
export const LINE_THROUGH = 'line-through' ;
export const NO_UNDERLINE = 'no-underline' ;

/**
 * Valid text decoration values.
 * @type {TextDecorationValue[]}
 */
export const decorations = [ UNDERLINE , OVERLINE , LINE_THROUGH , NO_UNDERLINE ] ;

/**
 * Generates responsive text decoration class definitions.
 *
 * @param {TextDecorationValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextDecoration( 'underline' ) ;
 * // → { 'underline': true }
 *
 * getTextDecoration( 'line-through' ) ;
 * // → { 'line-through': true }
 * ```
 */
const getTextDecoration = getResponsiveDefinition( create() , value => decorations.includes( value ) ) ;

export default getTextDecoration ;