/**
 * Text transform utilities for Tailwind CSS.
 *
 * @module themes/typography/textTransform
 * @see https://tailwindcss.com/docs/text-transform
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'} TextTransformValue
 */

export const UPPERCASE   = 'uppercase' ;
export const LOWERCASE   = 'lowercase' ;
export const CAPITALIZE  = 'capitalize' ;
export const NORMAL_CASE = 'normal-case' ;

/**
 * Valid text transform values.
 * @type {TextTransformValue[]}
 */
export const transforms = [ UPPERCASE , LOWERCASE , CAPITALIZE , NORMAL_CASE ] ;

/**
 * Generates responsive text transform class definitions.
 *
 * @param {TextTransformValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextTransform( 'uppercase' ) ;
 * // → { 'uppercase': true }
 * ```
 */
const getTextTransform = getResponsiveDefinition
(
    create() ,
    value => transforms.includes( value )
) ;

export default getTextTransform ;