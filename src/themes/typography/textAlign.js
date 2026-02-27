/**
 * Text align utilities for Tailwind CSS.
 *
 * @module themes/typography/textAlign
 * @see https://tailwindcss.com/docs/text-align
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'center' | 'end' | 'justify' | 'left' | 'right' | 'start'} TextAlignValue
 */

export const CENTER  = 'center' ;
export const END     = 'end' ;
export const JUSTIFY = 'justify' ;
export const LEFT    = 'left' ;
export const RIGHT   = 'right' ;
export const START   = 'start' ;

/**
 * Valid text alignment values.
 * @type {TextAlignValue[]}
 */
export const alignments = [ CENTER , END , JUSTIFY , LEFT , RIGHT , START ] ;

/**
 * Generates responsive text alignment class definitions.
 *
 * @param {TextAlignValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextAlign( 'center' ) ;
 * // → { 'text-center': true }
 *
 * getTextAlign( { xs: 'left' , md: 'center' , lg: 'justify' } ) ;
 * // → { 'text-left': true , 'md:text-center': true , 'lg:text-justify': true }
 * ```
 */
const getTextAlign = getResponsiveDefinition( create( 'text-' ) , value => alignments.includes( value ) ) ;

export default getTextAlign ;