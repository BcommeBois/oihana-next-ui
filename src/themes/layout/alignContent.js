/**
 * Align content utilities for Tailwind CSS.
 *
 * @module themes/layout/alignContent
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'normal' | 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch'} AlignContentValue
 */

export const NORMAL   = 'normal' ;
export const CENTER   = 'center' ;
export const START    = 'start' ;
export const END      = 'end' ;
export const BETWEEN  = 'between' ;
export const AROUND   = 'around' ;
export const EVENLY   = 'evenly' ;
export const BASELINE = 'baseline' ;
export const STRETCH  = 'stretch' ;

/**
 * Valid align content values.
 * @type {AlignContentValue[]}
 */
export const alignContents = [ NORMAL , CENTER , START , END , BETWEEN , AROUND , EVENLY , BASELINE , STRETCH ] ;

/**
 * Generates responsive align content class definitions.
 *
 * @param {AlignContentValue | import('../sizing/sizes').ResponsiveSize} value - Align content or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/align-content
 *
 * @example
 * ```js
 * getAlignContent( 'center' ) ;
 * // → { 'content-center': true }
 *
 * getAlignContent( { xs: 'start' , lg: 'center' } ) ;
 * // → { 'content-start': true , 'lg:content-center': true }
 * ```
 */
const getAlignContent = getResponsiveDefinition( create( 'content-' ) , value => alignContents.includes( value ) ) ;

export default getAlignContent ;

/* Tailwindcss safe list
| --------XS-------- | --------SM----------- | --------MD----------- | --------LG----------- | --------XL----------- | --------XXL----------- |
| content-normal     | sm:content-normal     | md:content-normal     | lg:content-normal     | xl:content-normal     | 2xl:content-normal     |
| content-center     | sm:content-center     | md:content-center     | lg:content-center     | xl:content-center     | 2xl:content-center     |
| content-start      | sm:content-start      | md:content-start      | lg:content-start      | xl:content-start      | 2xl:content-start      |
| content-end        | sm:content-end        | md:content-end        | lg:content-end        | xl:content-end        | 2xl:content-end        |
| content-between    | sm:content-between    | md:content-between    | lg:content-between    | xl:content-between    | 2xl:content-between    |
| content-around     | sm:content-around     | md:content-around     | lg:content-around     | xl:content-around     | 2xl:content-around     |
| content-evenly     | sm:content-evenly     | md:content-evenly     | lg:content-evenly     | xl:content-evenly     | 2xl:content-evenly     |
| content-baseline   | sm:content-baseline   | md:content-baseline   | lg:content-baseline   | xl:content-baseline   | 2xl:content-baseline   |
| content-stretch    | sm:content-stretch    | md:content-stretch    | lg:content-stretch    | xl:content-stretch    | 2xl:content-stretch    |
*/