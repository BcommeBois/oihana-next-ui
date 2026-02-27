/**
 * Align self utilities for Tailwind CSS.
 *
 * @module themes/layout/alignSelf
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'baseline' | 'center' | 'end' | 'start' | 'stretch'} AlignSelfValue
 */

export const AUTO     = 'auto' ;
export const BASELINE = 'baseline' ;
export const CENTER   = 'center' ;
export const END      = 'end' ;
export const START    = 'start' ;
export const STRETCH  = 'stretch' ;

/**
 * Valid align self values.
 * @type {AlignSelfValue[]}
 */
export const alignSelfs = [ AUTO , BASELINE , CENTER , END , START , STRETCH ] ;

/**
 * Generates responsive align self class definitions.
 *
 * @param {AlignSelfValue | import('../sizing/sizes').ResponsiveSize} value - Align self or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/align-self
 *
 * @example
 * ```js
 * getAlignSelf( 'center' ) ;
 * // → { 'self-center': true }
 *
 * getAlignSelf( { xs: 'start' , lg: 'center' } ) ;
 * // → { 'self-start': true , 'lg:self-center': true }
 * ```
 */
const getAlignSelf = getResponsiveDefinition( create( 'self-' ) , value => alignSelfs.includes( value ) ) ;

export default getAlignSelf ;

/* Tailwindcss safe list
| --------XS--------- | --------SM------------ | --------MD------------ | --------LG------------ | --------XL------------ | --------XXL------------ |
| self-auto           | sm:self-auto           | md:self-auto           | lg:self-auto           | xl:self-auto           | 2xl:self-auto           |
| self-baseline       | sm:self-baseline       | md:self-baseline       | lg:self-baseline       | xl:self-baseline       | 2xl:self-baseline       |
| self-center         | sm:self-center         | md:self-center         | lg:self-center         | xl:self-center         | 2xl:self-center         |
| self-end            | sm:self-end            | md:self-end            | lg:self-end            | xl:self-end            | 2xl:self-end            |
| self-start          | sm:self-start          | md:self-start          | lg:self-start          | xl:self-start          | 2xl:self-start          |
| self-stretch        | sm:self-stretch        | md:self-stretch        | lg:self-stretch        | xl:self-stretch        | 2xl:self-stretch        |
*/