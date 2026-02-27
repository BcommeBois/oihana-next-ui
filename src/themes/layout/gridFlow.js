/**
 * Grid auto flow utilities for Tailwind CSS.
 *
 * @module themes/layout/gridFlow
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'} GridFlowValue
 */

export const ROW       = 'row' ;
export const COL       = 'col' ;
export const DENSE     = 'dense' ;
export const ROW_DENSE = 'row-dense' ;
export const COL_DENSE = 'col-dense' ;

/**
 * Valid grid auto flow values.
 * @type {GridFlowValue[]}
 */
export const flows = [ ROW , COL , DENSE , ROW_DENSE , COL_DENSE ] ;

/**
 * Generates responsive grid auto flow class definitions.
 *
 * @param {GridFlowValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-auto-flow
 *
 * @example
 * ```js
 * getGridFlow( 'dense' ) ;
 * // → { 'grid-flow-dense': true }
 *
 * getGridFlow( { xs: 'row' , lg: 'col' } ) ;
 * // → { 'grid-flow-row': true , 'lg:grid-flow-col': true }
 * ```
 */
const getGridFlow = getResponsiveDefinition( create( 'grid-flow-' ) ,  value => flows.includes( value ) ) ;

export default getGridFlow ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| grid-flow-col         | sm:grid-flow-col        | md:grid-flow-col        | lg:grid-flow-col        | xl:grid-flow-col        | 2xl:grid-flow-col        |
| grid-flow-col-dense   | sm:grid-flow-col-dense  | md:grid-flow-col-dense  | lg:grid-flow-col-dense  | xl:grid-flow-col-dense  | 2xl:grid-flow-col-dense  |
| grid-flow-dense       | sm:grid-flow-dense      | md:grid-flow-dense      | lg:grid-flow-dense      | xl:grid-flow-dense      | 2xl:grid-flow-dense      |
| grid-flow-row         | sm:grid-flow-row        | md:grid-flow-row        | lg:grid-flow-row        | xl:grid-flow-row        | 2xl:grid-flow-row        |
| grid-flow-row-dense   | sm:grid-flow-row-dense  | md:grid-flow-row-dense  | lg:grid-flow-row-dense  | xl:grid-flow-row-dense  | 2xl:grid-flow-row-dense  |
*/