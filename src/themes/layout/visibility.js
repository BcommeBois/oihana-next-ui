/**
 * Visibility utilities for Tailwind CSS.
 *
 * @module themes/layout/visibility
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'visible' | 'invisible' | 'collapse'} VisibilityValue
 */

export const VISIBLE   = 'visible' ;
export const INVISIBLE = 'invisible' ;
export const COLLAPSE  = 'collapse' ;

/**
 * Valid visibility values.
 * @type {VisibilityValue[]}
 */
export const visibilities = [ VISIBLE , INVISIBLE , COLLAPSE ] ;

/**
 * Generates responsive visibility class definitions.
 *
 * @param {VisibilityValue | import('../sizing/sizes').ResponsiveSize} value - Visibility or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/visibility
 *
 * @example
 * ```js
 * getVisibility( 'invisible' ) ;
 * // → { 'invisible': true }
 *
 * getVisibility( { xs: 'invisible' , md: 'visible' } ) ;
 * // → { 'invisible': true , 'md:visible': true }
 * ```
 */
const getVisibility = getResponsiveDefinition( create() , value => visibilities.includes( value ) ) ;

export default getVisibility ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| visible                | sm:visible               | md:visible               | lg:visible               | xl:visible               | 2xl:visible               |
| invisible              | sm:invisible             | md:invisible             | lg:invisible             | xl:invisible             | 2xl:invisible             |
| collapse               | sm:collapse              | md:collapse              | lg:collapse              | xl:collapse              | 2xl:collapse              |
*/