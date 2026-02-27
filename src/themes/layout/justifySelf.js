/**
 * Justify self utilities for Tailwind CSS.
 *
 * @module themes/layout/justifySelf
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'center' | 'end' | 'start' | 'stretch'} JustifySelfValue
 */

export const AUTO    = 'auto' ;
export const CENTER  = 'center' ;
export const END     = 'end' ;
export const START   = 'start' ;
export const STRETCH = 'stretch' ;

/**
 * Valid justify self values.
 * @type {JustifySelfValue[]}
 */
export const justifySelfs = [ AUTO , CENTER , END , START , STRETCH ] ;

/**
 * Generates responsive justify self class definitions.
 *
 * @param {JustifySelfValue | import('../sizing/sizes').ResponsiveSize} value - Justify self or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/justify-self
 *
 * @example
 * ```js
 * getJustifySelf( 'center' ) ;
 * // → { 'justify-self-center': true }
 * ```
 */
const getJustifySelf = getResponsiveDefinition( create( 'justify-self-' ) , value => justifySelfs.includes( value ) ) ;

export default getJustifySelf ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| justify-self-auto      | sm:justify-self-auto     | md:justify-self-auto     | lg:justify-self-auto     | xl:justify-self-auto     | 2xl:justify-self-auto     |
| justify-self-center    | sm:justify-self-center   | md:justify-self-center   | lg:justify-self-center   | xl:justify-self-center   | 2xl:justify-self-center   |
| justify-self-end       | sm:justify-self-end      | md:justify-self-end      | lg:justify-self-end      | xl:justify-self-end      | 2xl:justify-self-end      |
| justify-self-start     | sm:justify-self-start    | md:justify-self-start    | lg:justify-self-start    | xl:justify-self-start    | 2xl:justify-self-start    |
| justify-self-stretch   | sm:justify-self-stretch  | md:justify-self-stretch  | lg:justify-self-stretch  | xl:justify-self-stretch  | 2xl:justify-self-stretch  |
*/