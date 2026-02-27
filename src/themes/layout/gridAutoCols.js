/**
 * Grid auto columns utilities for Tailwind CSS.
 *
 * @module themes/layout/gridAutoCols
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'min' | 'max' | 'fr'} GridAutoColsValue
 */

export const AUTO = 'auto' ;
export const MIN  = 'min' ;
export const MAX  = 'max' ;
export const FR   = 'fr' ;

/**
 * Valid grid auto columns values.
 * @type {GridAutoColsValue[]}
 */
export const gridAutoCols = [ AUTO , MIN , MAX , FR ] ;

/**
 * Generates responsive grid auto columns class definitions.
 *
 * @param {GridAutoColsValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-auto-columns
 *
 * @example
 * ```js
 * getGridAutoCols( 'fr' ) ;
 * // → { 'auto-cols-fr': true }
 *
 * getGridAutoCols( { xs: 'min' , lg: 'fr' } ) ;
 * // → { 'auto-cols-min': true , 'lg:auto-cols-fr': true }
 * ```
 */
const getGridAutoCols = getResponsiveDefinition( create( 'auto-cols-' ) , value => gridAutoCols.includes( value ) ) ;

export default getGridAutoCols ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| auto-cols-auto        | sm:auto-cols-auto       | md:auto-cols-auto       | lg:auto-cols-auto       | xl:auto-cols-auto       | 2xl:auto-cols-auto       |
| auto-cols-fr          | sm:auto-cols-fr         | md:auto-cols-fr         | lg:auto-cols-fr         | xl:auto-cols-fr         | 2xl:auto-cols-fr         |
| auto-cols-max         | sm:auto-cols-max        | md:auto-cols-max        | lg:auto-cols-max        | xl:auto-cols-max        | 2xl:auto-cols-max        |
| auto-cols-min         | sm:auto-cols-min        | md:auto-cols-min        | lg:auto-cols-min        | xl:auto-cols-min        | 2xl:auto-cols-min        |
*/