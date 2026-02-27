/**
 * Align items utilities for Tailwind CSS.
 *
 * @module themes/layout/alignItems
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'baseline' | 'center' | 'end' | 'start' | 'stretch'} AlignItemsValue
 */

export const BASELINE = 'baseline' ;
export const CENTER   = 'center' ;
export const END      = 'end' ;
export const START    = 'start' ;
export const STRETCH  = 'stretch' ;

/**
 * Valid align items values.
 * @type {AlignItemsValue[]}
 */
export const alignItems = [ BASELINE , CENTER , END , START , STRETCH ] ;

/**
 * Generates responsive align items class definitions.
 *
 * @param {AlignItemsValue | import('../sizing/sizes').ResponsiveSize} value - Align items or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/align-items
 *
 * @example
 * ```js
 * getAlignItems( 'center' ) ;
 * // → { 'items-center': true }
 *
 * getAlignItems( { xs: 'start' , lg: 'center' } ) ;
 * // → { 'items-start': true , 'lg:items-center': true }
 * ```
 */
const getAlignItems = getResponsiveDefinition( create( 'items-' ) , value => alignItems.includes( value ) ) ;

export default getAlignItems ;

/* Tailwindcss safe list
| --------XS--------- | --------SM------------ | --------MD------------ | --------LG------------ | --------XL------------ | --------XXL------------ |
| items-baseline      | sm:items-baseline      | md:items-baseline      | lg:items-baseline      | xl:items-baseline      | 2xl:items-baseline      |
| items-center        | sm:items-center        | md:items-center        | lg:items-center        | xl:items-center        | 2xl:items-center        |
| items-end           | sm:items-end           | md:items-end           | lg:items-end           | xl:items-end           | 2xl:items-end           |
| items-start         | sm:items-start         | md:items-start         | lg:items-start         | xl:items-start         | 2xl:items-start         |
| items-stretch       | sm:items-stretch       | md:items-stretch       | lg:items-stretch       | xl:items-stretch       | 2xl:items-stretch       |
*/