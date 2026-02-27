/**
 * Flex wrap utilities for Tailwind CSS.
 *
 * @module themes/layout/flexWrap
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'wrap' | 'wrap-reverse' | 'nowrap'} FlexWrapValue
 */

export const WRAP         = 'wrap' ;
export const WRAP_REVERSE = 'wrap-reverse' ;
export const NOWRAP       = 'nowrap' ;

/**
 * Valid flex wrap values.
 * @type {FlexWrapValue[]}
 */
export const wraps = [ WRAP , WRAP_REVERSE , NOWRAP ] ;

/**
 * Generates responsive flex wrap class definitions.
 *
 * @param {FlexWrapValue | import('../sizing/sizes').ResponsiveSize} value - Wrap or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/flex-wrap
 *
 * @example
 * ```js
 * getFlexWrap( 'wrap' ) ;
 * // → { 'flex-wrap': true }
 *
 * getFlexWrap( { xs: 'wrap' , lg: 'nowrap' } ) ;
 * // → { 'flex-wrap': true , 'lg:flex-nowrap': true }
 * ```
 */
const getFlexWrap = getResponsiveDefinition( create( 'flex-' ) , value => wraps.includes( value ) ) ;

export default getFlexWrap ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| flex-wrap              | sm:flex-wrap             | md:flex-wrap             | lg:flex-wrap             | xl:flex-wrap             | 2xl:flex-wrap             |
| flex-wrap-reverse      | sm:flex-wrap-reverse     | md:flex-wrap-reverse     | lg:flex-wrap-reverse     | xl:flex-wrap-reverse     | 2xl:flex-wrap-reverse     |
| flex-nowrap            | sm:flex-nowrap           | md:flex-nowrap           | lg:flex-nowrap           | xl:flex-nowrap           | 2xl:flex-nowrap           |
*/