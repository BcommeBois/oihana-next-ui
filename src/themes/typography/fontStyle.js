/**
 * Font style utilities for Tailwind CSS.
 *
 * @module themes/typography/fontStyle
 * @see https://tailwindcss.com/docs/font-style
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'italic' | 'not-italic'} FontStyleValue
 */

export const ITALIC     = 'italic' ;
export const NOT_ITALIC = 'not-italic' ;

/**
 * Valid font style values.
 * @type {FontStyleValue[]}
 */
export const fontStyles = [ ITALIC , NOT_ITALIC ] ;

/**
 * Generates responsive font style class definitions.
 *
 * @param {FontStyleValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFontStyle( 'italic' ) ;
 * // → { 'italic': true }
 * ```
 */
const getFontStyle = getResponsiveDefinition( create() , value => fontStyles.includes( value ) ) ;

export default getFontStyle ;