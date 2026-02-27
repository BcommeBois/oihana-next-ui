/**
 * Justify items utilities for Tailwind CSS.
 *
 * @module themes/layout/justifyItems
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'center' | 'end' | 'start' | 'stretch'} JustifyItemsValue
 */

export const CENTER  = 'center' ;
export const END     = 'end' ;
export const START   = 'start' ;
export const STRETCH = 'stretch' ;

/**
 * Valid justify items values.
 * @type {JustifyItemsValue[]}
 */
export const justifyItems = [ CENTER , END , START , STRETCH ] ;

/**
 * Generates responsive justify items class definitions.
 *
 * @param {JustifyItemsValue | import('../sizing/sizes').ResponsiveSize} value - Justify items or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/justify-items
 *
 * @example
 * ```js
 * getJustifyItems( 'center' ) ;
 * // → { 'justify-items-center': true }
 * ```
 */
const getJustifyItems = getResponsiveDefinition( create( 'justify-items-' ) , value => justifyItems.includes( value ) ) ;

export default getJustifyItems ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| justify-items-center   | sm:justify-items-center   | md:justify-items-center   | lg:justify-items-center   | xl:justify-items-center   | 2xl:justify-items-center   |
| justify-items-end      | sm:justify-items-end      | md:justify-items-end      | lg:justify-items-end      | xl:justify-items-end      | 2xl:justify-items-end      |
| justify-items-start    | sm:justify-items-start    | md:justify-items-start    | lg:justify-items-start    | xl:justify-items-start    | 2xl:justify-items-start    |
| justify-items-stretch  | sm:justify-items-stretch  | md:justify-items-stretch  | lg:justify-items-stretch  | xl:justify-items-stretch  | 2xl:justify-items-stretch  |
*/