/**
 * Line clamp utilities for Tailwind CSS.
 *
 * @module themes/typography/lineClamp
 * @see https://tailwindcss.com/docs/line-clamp
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {1 | 2 | 3 | 4 | 5 | 6 | 'none'} LineClampValue
 */

export const NONE = 'none' ;

/**
 * Valid line clamp values.
 * @type {(number | string)[]}
 */
export const lineClamps = [ 1 , 2 , 3 , 4 , 5 , 6 , NONE ] ;

/**
 * Generates responsive line-clamp class definitions.
 *
 * @param {LineClampValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getLineClamp( 3 ) ;
 * // → { 'line-clamp-3': true }
 *
 * getLineClamp( 'none' ) ;
 * // → { 'line-clamp-none': true }
 *
 * getLineClamp( { xs: 2 , md: 3 , lg: 'none' } ) ;
 * // → { 'line-clamp-2': true , 'md:line-clamp-3': true , 'lg:line-clamp-none': true }
 * ```
 */
const getLineClamp = getResponsiveDefinition( create( 'line-clamp-' ) , value => lineClamps.includes( value ) ) ;

export default getLineClamp ;