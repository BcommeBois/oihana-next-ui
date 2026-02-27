/**
 * Place content utilities for Tailwind CSS.
 *
 * @module themes/layout/placeContent
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch'} PlaceContentValue
 */

export const CENTER   = 'center' ;
export const START    = 'start' ;
export const END      = 'end' ;
export const BETWEEN  = 'between' ;
export const AROUND   = 'around' ;
export const EVENLY   = 'evenly' ;
export const BASELINE = 'baseline' ;
export const STRETCH  = 'stretch' ;

/**
 * Valid place content values.
 * @type {PlaceContentValue[]}
 */
export const placeContents = [ CENTER , START , END , BETWEEN , AROUND , EVENLY , BASELINE , STRETCH ] ;

/**
 * Generates responsive place content class definitions.
 *
 * @param {PlaceContentValue | import('../sizing/sizes').ResponsiveSize} value - Place content or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/place-content
 *
 * @example
 * ```js
 * getPlaceContent( 'center' ) ;
 * // → { 'place-content-center': true }
 * ```
 */
const getPlaceContent = getResponsiveDefinition( create( 'place-content-' ) , value => placeContents.includes( value ) ) ;

export default getPlaceContent ;

/* Tailwindcss safe list
| --------XS------------ | --------SM--------------- | --------MD--------------- | ---------LG-------------- | ---------XL-------------- | ---------XXL-------------- |
| place-content-center   | sm:place-content-center   | md:place-content-center   | lg:place-content-center   | xl:place-content-center   | 2xl:place-content-center   |
| place-content-start    | sm:place-content-start    | md:place-content-start    | lg:place-content-start    | xl:place-content-start    | 2xl:place-content-start    |
| place-content-end      | sm:place-content-end      | md:place-content-end      | lg:place-content-end      | xl:place-content-end      | 2xl:place-content-end      |
| place-content-between  | sm:place-content-between  | md:place-content-between  | lg:place-content-between  | xl:place-content-between  | 2xl:place-content-between  |
| place-content-around   | sm:place-content-around   | md:place-content-around   | lg:place-content-around   | xl:place-content-around   | 2xl:place-content-around   |
| place-content-evenly   | sm:place-content-evenly   | md:place-content-evenly   | lg:place-content-evenly   | xl:place-content-evenly   | 2xl:place-content-evenly   |
| place-content-baseline | sm:place-content-baseline | md:place-content-baseline | lg:place-content-baseline | xl:place-content-baseline | 2xl:place-content-baseline |
| place-content-stretch  | sm:place-content-stretch  | md:place-content-stretch  | lg:place-content-stretch  | xl:place-content-stretch  | 2xl:place-content-stretch  |
*/