/**
 * Place items utilities for Tailwind CSS.
 *
 * @module themes/layout/placeItems
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'start' | 'end' | 'center' | 'baseline' | 'stretch'} PlaceItemsValue
 */

export const START    = 'start' ;
export const END      = 'end' ;
export const CENTER   = 'center' ;
export const BASELINE = 'baseline' ;
export const STRETCH  = 'stretch' ;

/**
 * Valid place items values.
 * @type {PlaceItemsValue[]}
 */
export const placeItems = [ START , END , CENTER , BASELINE , STRETCH ] ;

/**
 * Generates responsive place items class definitions.
 *
 * @param {PlaceItemsValue | import('../sizing/sizes').ResponsiveSize} value - Place items or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/place-items
 *
 * @example
 * ```js
 * getPlaceItems( 'center' ) ;
 * // → { 'place-items-center': true }
 * ```
 */
const getPlaceItems = getResponsiveDefinition( create( 'place-items-' ) , ( value ) => placeItems.includes( value ) ) ;

export default getPlaceItems ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| place-items-start      | sm:place-items-start     | md:place-items-start     | lg:place-items-start     | xl:place-items-start     | 2xl:place-items-start     |
| place-items-end        | sm:place-items-end       | md:place-items-end       | lg:place-items-end       | xl:place-items-end       | 2xl:place-items-end       |
| place-items-center     | sm:place-items-center    | md:place-items-center    | lg:place-items-center    | xl:place-items-center    | 2xl:place-items-center    |
| place-items-baseline   | sm:place-items-baseline  | md:place-items-baseline  | lg:place-items-baseline  | xl:place-items-baseline  | 2xl:place-items-baseline  |
| place-items-stretch    | sm:place-items-stretch   | md:place-items-stretch   | lg:place-items-stretch   | xl:place-items-stretch   | 2xl:place-items-stretch   |
*/