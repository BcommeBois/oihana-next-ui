/**
 * Place self utilities for Tailwind CSS.
 *
 * @module themes/layout/placeSelf
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'start' | 'end' | 'center' | 'stretch'} PlaceSelfValue
 */

export const AUTO    = 'auto' ;
export const START   = 'start' ;
export const END     = 'end' ;
export const CENTER  = 'center' ;
export const STRETCH = 'stretch' ;

/**
 * Valid place self values.
 * @type {PlaceSelfValue[]}
 */
export const placeSelfs = [ AUTO , START , END , CENTER , STRETCH ] ;

/**
 * Generates responsive place self class definitions.
 *
 * @param {PlaceSelfValue | import('../sizing/sizes').ResponsiveSize} value - Place self or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/place-self
 *
 * @example
 * ```js
 * getPlaceSelf( 'center' ) ;
 * // → { 'place-self-center': true }
 * ```
 */
const getPlaceSelf = getResponsiveDefinition( create( 'place-self-' ) , value => placeSelfs.includes( value ) ) ;

export default getPlaceSelf ;

/* Tailwindcss safe list
| --------XS------------ | ---------SM-------------- | ---------MD-------------- | ---------LG-------------- | ---------XL-------------- | ---------XXL-------------- |
| place-self-auto        | sm:place-self-auto        | md:place-self-auto        | lg:place-self-auto        | xl:place-self-auto        | 2xl:place-self-auto        |
| place-self-start       | sm:place-self-start       | md:place-self-start       | lg:place-self-start       | xl:place-self-start       | 2xl:place-self-start       |
| place-self-end         | sm:place-self-end         | md:place-self-end         | lg:place-self-end         | xl:place-self-end         | 2xl:place-self-end         |
| place-self-center      | sm:place-self-center      | md:place-self-center      | lg:place-self-center      | xl:place-self-center      | 2xl:place-self-center      |
| place-self-stretch     | sm:place-self-stretch     | md:place-self-stretch     | lg:place-self-stretch     | xl:place-self-stretch     | 2xl:place-self-stretch     |
*/