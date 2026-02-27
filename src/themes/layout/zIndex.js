/**
 * Z-index utilities for Tailwind CSS.
 *
 * @module themes/layout/zIndex
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | '0' | '10' | '20' | '30' | '40' | '50' | 0 | 10 | 20 | 30 | 40 | 50} ZIndexValue
 */

export const AUTO = 'auto' ;

/**
 * Valid z-index values.
 * @type {(string | number)[]}
 */
export const zIndexes = [ AUTO , 0 , 10 , 20 , 30 , 40 , 50 , '0' , '10' , '20' , '30' , '40' , '50' ] ;

/**
 * Generates responsive z-index class definitions.
 *
 * @param {ZIndexValue | import('../sizing/sizes').ResponsiveSize} value - Z-index or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/z-index
 *
 * @example
 * ```js
 * getZIndex( 10 ) ;
 * // → { 'z-10': true }
 *
 * getZIndex( 'auto' ) ;
 * // → { 'z-auto': true }
 *
 * getZIndex( { xs: 0 , md: 10 , lg: 50 } ) ;
 * // → { 'z-0': true , 'md:z-10': true , 'lg:z-50': true }
 * ```
 */
const getZIndex = getResponsiveDefinition( create( 'z-' ) , value => zIndexes.includes( value ) ) ;

export default getZIndex ;

/* Tailwindcss safe list
| --------XS----- | --------SM------ | --------MD----- | --------LG----- | --------XL------ | --------XXL------ |
| z-auto          | sm:z-auto        | md:z-auto       | lg:z-auto       | xl:z-auto        | 2xl:z-auto        |
| z-0             | sm:z-0           | md:z-0          | lg:z-0          | xl:z-0           | 2xl:z-0           |
| z-10            | sm:z-10          | md:z-10         | lg:z-10         | xl:z-10          | 2xl:z-10          |
| z-20            | sm:z-20          | md:z-20         | lg:z-20         | xl:z-20          | 2xl:z-20          |
| z-30            | sm:z-30          | md:z-30         | lg:z-30         | xl:z-30          | 2xl:z-30          |
| z-40            | sm:z-40          | md:z-40         | lg:z-40         | xl:z-40          | 2xl:z-40          |
| z-50            | sm:z-50          | md:z-50         | lg:z-50         | xl:z-50          | 2xl:z-50          |
*/