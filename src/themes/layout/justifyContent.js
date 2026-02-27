/**
 * Justify content utilities for Tailwind CSS.
 *
 * @module themes/layout/justifyContent
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'} JustifyContentValue
 */

export const NORMAL  = 'normal' ;
export const START   = 'start' ;
export const END     = 'end' ;
export const CENTER  = 'center' ;
export const BETWEEN = 'between' ;
export const AROUND  = 'around' ;
export const EVENLY  = 'evenly' ;
export const STRETCH = 'stretch' ;

/**
 * Valid justify content values.
 * @type {JustifyContentValue[]}
 */
export const justifyContents = [ NORMAL , START , END , CENTER , BETWEEN , AROUND , EVENLY , STRETCH ] ;

/**
 * Generates responsive justify content class definitions.
 *
 * @param {JustifyContentValue | import('../sizing/sizes').ResponsiveSize} value - Justify content or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/justify-content
 *
 * @example
 * ```js
 * getJustifyContent( 'center' ) ;
 * // → { 'justify-center': true }
 *
 * getJustifyContent( { xs: 'start' , lg: 'between' } ) ;
 * // → { 'justify-start': true , 'lg:justify-between': true }
 * ```
 */
const getJustifyContent = getResponsiveDefinition( create( 'justify-' ) , value => justifyContents.includes( value ) ) ;

export default getJustifyContent ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| justify-normal         | sm:justify-normal        | md:justify-normal        | lg:justify-normal        | xl:justify-normal        | 2xl:justify-normal        |
| justify-start          | sm:justify-start         | md:justify-start         | lg:justify-start         | xl:justify-start         | 2xl:justify-start         |
| justify-end            | sm:justify-end           | md:justify-end           | lg:justify-end           | xl:justify-end           | 2xl:justify-end           |
| justify-center         | sm:justify-center        | md:justify-center        | lg:justify-center        | xl:justify-center        | 2xl:justify-center        |
| justify-between        | sm:justify-between       | md:justify-between       | lg:justify-between       | xl:justify-between       | 2xl:justify-between       |
| justify-around         | sm:justify-around        | md:justify-around        | lg:justify-around        | xl:justify-around        | 2xl:justify-around        |
| justify-evenly         | sm:justify-evenly        | md:justify-evenly        | lg:justify-evenly        | xl:justify-evenly        | 2xl:justify-evenly        |
| justify-stretch        | sm:justify-stretch       | md:justify-stretch       | lg:justify-stretch       | xl:justify-stretch       | 2xl:justify-stretch       |
*/