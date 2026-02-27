/**
 * Position utilities for Tailwind CSS.
 *
 * @module themes/layout/position
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'} PositionValue
 */

export const ABSOLUTE = 'absolute' ;
export const FIXED    = 'fixed' ;
export const RELATIVE = 'relative' ;
export const STATIC   = 'static' ;
export const STICKY   = 'sticky' ;

/**
 * Valid position values.
 * @type {PositionValue[]}
 */
export const positions = [ ABSOLUTE , FIXED , RELATIVE , STATIC , STICKY ] ;

/**
 * Generates responsive position class definitions.
 *
 * @param {PositionValue | import('../sizing/sizes').ResponsiveSize} value - Position or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/position
 *
 * @example
 * ```js
 * getPosition( 'relative' ) ;
 * // → { 'relative': true }
 *
 * getPosition( { xs: 'relative' , lg: 'sticky' } ) ;
 * // → { 'relative': true , 'lg:sticky': true }
 * ```
 */
const getPosition = getResponsiveDefinition( create() , value => positions.includes( value ) ) ;

export default getPosition ;

/* Tailwindcss safe list
| --------XS------------ | ---------SM-------------- | ---------MD-------------- | ---------LG-------------- | ---------XL-------------- | ---------XXL-------------- |
| absolute               | sm:absolute               | md:absolute               | lg:absolute               | xl:absolute               | 2xl:absolute               |
| fixed                  | sm:fixed                  | md:fixed                  | lg:fixed                  | xl:fixed                  | 2xl:fixed                  |
| relative               | sm:relative               | md:relative               | lg:relative               | xl:relative               | 2xl:relative               |
| static                 | sm:static                 | md:static                 | lg:static                 | xl:static                 | 2xl:static                 |
| sticky                 | sm:sticky                 | md:sticky                 | lg:sticky                 | xl:sticky                 | 2xl:sticky                 |
*/