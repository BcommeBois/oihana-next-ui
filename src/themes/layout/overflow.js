/**
 * Overflow utilities for Tailwind CSS.
 *
 * @module themes/layout/overflow
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'x' | 'y'} OverflowDirection
 */

export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * @typedef {'auto' | 'clip' | 'hidden' | 'scroll' | 'visible'} OverflowValue
 */

export const AUTO    = 'auto' ;
export const CLIP    = 'clip' ;
export const HIDDEN  = 'hidden' ;
export const SCROLL  = 'scroll' ;
export const VISIBLE = 'visible' ;

/**
 * Valid overflow values.
 * @type {OverflowValue[]}
 */
export const overflows = [ AUTO , CLIP , HIDDEN , SCROLL , VISIBLE ] ;

/**
 * Creates an overflow class definition.
 *
 * @param {OverflowValue} value - Overflow value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {OverflowDirection | null} [options.direction=null] - Axis direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false } = {} ) =>
{
    const axis = directions.includes( direction ) ? `-${ direction }` : '' ;
    const imp  = important ? '!' : '' ;

    return { [ `${ prefix }${ imp }overflow${ axis }-${ value }` ]: true } ;
} ;

/**
 * Generates responsive overflow class definitions.
 *
 * @param {OverflowValue | import('../sizing/sizes').ResponsiveSize} value - Overflow or responsive object.
 * @param {Object} [options]
 * @param {OverflowDirection | null} [options.direction=null] - Axis direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/overflow
 *
 * @example
 * ```js
 * getOverflow( 'hidden' ) ;
 * // → { 'overflow-hidden': true }
 *
 * getOverflow( 'auto' , { direction: 'y' } ) ;
 * // → { 'overflow-y-auto': true }
 *
 * getOverflow( { xs: 'auto' , lg: 'hidden' } ) ;
 * // → { 'overflow-auto': true , 'lg:overflow-hidden': true }
 * ```
 */
const getOverflow = getResponsiveDefinition( create , value => overflows.includes( value ) ) ;

export default getOverflow ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| overflow-auto          | sm:overflow-auto         | md:overflow-auto         | lg:overflow-auto         | xl:overflow-auto         | 2xl:overflow-auto         |
| overflow-clip          | sm:overflow-clip         | md:overflow-clip         | lg:overflow-clip         | xl:overflow-clip         | 2xl:overflow-clip         |
| overflow-hidden        | sm:overflow-hidden       | md:overflow-hidden       | lg:overflow-hidden       | xl:overflow-hidden       | 2xl:overflow-hidden       |
| overflow-scroll        | sm:overflow-scroll       | md:overflow-scroll       | lg:overflow-scroll       | xl:overflow-scroll       | 2xl:overflow-scroll       |
| overflow-visible       | sm:overflow-visible      | md:overflow-visible      | lg:overflow-visible      | xl:overflow-visible      | 2xl:overflow-visible      |
*/