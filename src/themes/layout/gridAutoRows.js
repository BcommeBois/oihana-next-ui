/**
 * Grid auto rows utilities for Tailwind CSS.
 *
 * @module themes/layout/gridAutoRows
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'min' | 'max' | 'fr'} GridAutoRowsValue
 */

export const AUTO = 'auto' ;
export const MIN  = 'min' ;
export const MAX  = 'max' ;
export const FR   = 'fr' ;

/**
 * Valid grid auto rows values.
 * @type {GridAutoRowsValue[]}
 */
export const gridAutoRows = [ AUTO , MIN , MAX , FR ] ;

/**
 * Generates responsive grid auto rows class definitions.
 *
 * @param {GridAutoRowsValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-auto-rows
 *
 * @example
 * ```js
 * getGridAutoRows( 'min' ) ;
 * // → { 'auto-rows-min': true }
 *
 * getGridAutoRows( { xs: 'auto' , lg: 'fr' } ) ;
 * // → { 'auto-rows-auto': true , 'lg:auto-rows-fr': true }
 * ```
 */
const getGridAutoRows = getResponsiveDefinition( create( 'auto-rows-' ) , value => gridAutoRows.includes( value ) ) ;

export default getGridAutoRows ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| auto-rows-auto        | sm:auto-rows-auto       | md:auto-rows-auto       | lg:auto-rows-auto       | xl:auto-rows-auto       | 2xl:auto-rows-auto       |
| auto-rows-min         | sm:auto-rows-min        | md:auto-rows-min        | lg:auto-rows-min        | xl:auto-rows-min        | 2xl:auto-rows-min        |
| auto-rows-max         | sm:auto-rows-max        | md:auto-rows-max        | lg:auto-rows-max        | xl:auto-rows-max        | 2xl:auto-rows-max        |
| auto-rows-fr          | sm:auto-rows-fr         | md:auto-rows-fr         | lg:auto-rows-fr         | xl:auto-rows-fr         | 2xl:auto-rows-fr         |
*/