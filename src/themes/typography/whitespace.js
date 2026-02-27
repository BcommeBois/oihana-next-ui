/**
 * Whitespace utilities for Tailwind CSS.
 *
 * @module themes/typography/whitespace
 * @see https://tailwindcss.com/docs/white-space
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces'} WhitespaceValue
 */

export const NORMAL       = 'normal' ;
export const NOWRAP        = 'nowrap' ;
export const PRE           = 'pre' ;
export const PRE_LINE      = 'pre-line' ;
export const PRE_WRAP      = 'pre-wrap' ;
export const BREAK_SPACES  = 'break-spaces' ;

/**
 * Valid whitespace values.
 * @type {WhitespaceValue[]}
 */
export const whitespaces = [ NORMAL , NOWRAP , PRE , PRE_LINE , PRE_WRAP , BREAK_SPACES ] ;

/**
 * Generates responsive whitespace class definitions.
 *
 * @param {WhitespaceValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getWhitespace( 'nowrap' ) ;
 * // → { 'whitespace-nowrap': true }
 * ```
 */
const getWhitespace = getResponsiveDefinition
(
    create( 'whitespace-' ) ,
    value => whitespaces.includes( value )
) ;

export default getWhitespace ;