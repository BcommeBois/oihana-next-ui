/**
 * Text wrap utilities for Tailwind CSS.
 *
 * @module themes/typography/textWrap
 * @see https://tailwindcss.com/docs/text-wrap
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'wrap' | 'nowrap' | 'balance' | 'pretty'} TextWrapValue
 */

export const WRAP    = 'wrap' ;
export const NOWRAP  = 'nowrap' ;
export const BALANCE = 'balance' ;
export const PRETTY  = 'pretty' ;

/**
 * Valid text wrap values.
 * @type {TextWrapValue[]}
 */
export const wraps = [ WRAP , NOWRAP , BALANCE , PRETTY ] ;

/**
 * Generates responsive text wrap class definitions.
 *
 * @param {TextWrapValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextWrap( 'balance' ) ;
 * // → { 'text-balance': true }
 *
 * getTextWrap( 'nowrap' ) ;
 * // → { 'text-nowrap': true }
 * ```
 */
const getTextWrap = getResponsiveDefinition
(
    create( 'text-' ) ,
    value => wraps.includes( value )
) ;

export default getTextWrap ;