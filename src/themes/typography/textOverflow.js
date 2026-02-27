/**
 * Text overflow utilities for Tailwind CSS.
 *
 * @module themes/typography/textOverflow
 * @see https://tailwindcss.com/docs/text-overflow
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'truncate' | 'text-ellipsis' | 'text-clip'} TextOverflowValue
 */

export const TRUNCATE = 'truncate' ;
export const ELLIPSIS = 'text-ellipsis' ;
export const CLIP     = 'text-clip' ;

/**
 * Valid text overflow values.
 * @type {TextOverflowValue[]}
 */
export const overflows = [ TRUNCATE , ELLIPSIS , CLIP ] ;

/**
 * Generates responsive text overflow class definitions.
 *
 * @param {TextOverflowValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextOverflow( 'truncate' ) ;
 * // → { 'truncate': true }
 *
 * getTextOverflow( 'text-ellipsis' ) ;
 * // → { 'text-ellipsis': true }
 * ```
 */
const getTextOverflow = getResponsiveDefinition
(
    create() ,
    value => overflows.includes( value )
) ;

export default getTextOverflow ;