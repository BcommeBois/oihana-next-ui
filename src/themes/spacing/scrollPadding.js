/**
 * Scroll padding utilities for Tailwind CSS.
 *
 * @module themes/spacing/scrollPadding
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes } from '../sizing/sizes' ;

/**
 * @typedef {'b' | 'e' | 'l' | 'r' | 's' | 't' | 'x' | 'y'} ScrollPaddingDirection
 */

export const BOTTOM     = 'b' ;
export const END        = 'e' ;
export const LEFT       = 'l' ;
export const RIGHT      = 'r' ;
export const START      = 's' ;
export const TOP        = 't' ;
export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid scroll padding directions.
 * @type {ScrollPaddingDirection[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Creates a scroll padding class definition.
 *
 * @param {string | number} value - The scroll padding value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {ScrollPaddingDirection | null} [options.direction=null] - Scroll padding direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false } = {} ) =>
{
    const dir = directions.includes( direction ) ? direction : '' ;
    const imp = important ? '!' : '' ;

    return { [ `${ prefix }${ imp }scroll-p${ dir }-${ value }` ]: true } ;
} ;

/**
 * Generates responsive scroll padding class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Scroll padding value or responsive object.
 * @param {Object} [options]
 * @param {ScrollPaddingDirection | null} [options.direction=null] - Scroll padding direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/scroll-padding
 *
 * @example
 * ```js
 * getScrollPadding( 4 ) ;
 * // → { 'scroll-p-4': true }
 *
 * getScrollPadding( 2 , { direction: 't' } ) ;
 * // → { 'scroll-pt-2': true }
 *
 * getScrollPadding( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'scroll-p-2': true , 'md:scroll-p-4': true , 'lg:scroll-p-8': true }
 *
 * getScrollPadding( 4 , { direction: 'x' , important: true } ) ;
 * // → { '!scroll-px-4': true }
 * ```
 */
const getScrollPadding = getResponsiveDefinition
(
    create ,
    ( value ) => lazyFixedSizes.includes( value )
) ;

export default getScrollPadding ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-p-px      | sm:scroll-p-px     | md:scroll-p-px     | lg:scroll-p-px     | xl:scroll-p-px     | 2xl:scroll-p-px     |
| scroll-p-0       | sm:scroll-p-0      | md:scroll-p-0      | lg:scroll-p-0      | xl:scroll-p-0      | 2xl:scroll-p-0      |
| scroll-p-0.5     | sm:scroll-p-0.5    | md:scroll-p-0.5    | lg:scroll-p-0.5    | xl:scroll-p-0.5    | 2xl:scroll-p-0.5    |
| scroll-p-1       | sm:scroll-p-1      | md:scroll-p-1      | lg:scroll-p-1      | xl:scroll-p-1      | 2xl:scroll-p-1      |
| scroll-p-1.5     | sm:scroll-p-1.5    | md:scroll-p-1.5    | lg:scroll-p-1.5    | xl:scroll-p-1.5    | 2xl:scroll-p-1.5    |
| scroll-p-2       | sm:scroll-p-2      | md:scroll-p-2      | lg:scroll-p-2      | xl:scroll-p-2      | 2xl:scroll-p-2      |
| scroll-p-2.5     | sm:scroll-p-2.5    | md:scroll-p-2.5    | lg:scroll-p-2.5    | xl:scroll-p-2.5    | 2xl:scroll-p-2.5    |
| scroll-p-3       | sm:scroll-p-3      | md:scroll-p-3      | lg:scroll-p-3      | xl:scroll-p-3      | 2xl:scroll-p-3      |
| scroll-p-3.5     | sm:scroll-p-3.5    | md:scroll-p-3.5    | lg:scroll-p-3.5    | xl:scroll-p-3.5    | 2xl:scroll-p-3.5    |
| scroll-p-4       | sm:scroll-p-4      | md:scroll-p-4      | lg:scroll-p-4      | xl:scroll-p-4      | 2xl:scroll-p-4      |
| scroll-p-5       | sm:scroll-p-5      | md:scroll-p-5      | lg:scroll-p-5      | xl:scroll-p-5      | 2xl:scroll-p-5      |
| scroll-p-6       | sm:scroll-p-6      | md:scroll-p-6      | lg:scroll-p-6      | xl:scroll-p-6      | 2xl:scroll-p-6      |
| scroll-p-7       | sm:scroll-p-7      | md:scroll-p-7      | lg:scroll-p-7      | xl:scroll-p-7      | 2xl:scroll-p-7      |
| scroll-p-8       | sm:scroll-p-8      | md:scroll-p-8      | lg:scroll-p-8      | xl:scroll-p-8      | 2xl:scroll-p-8      |
| scroll-p-9       | sm:scroll-p-9      | md:scroll-p-9      | lg:scroll-p-9      | xl:scroll-p-9      | 2xl:scroll-p-9      |
| scroll-p-10      | sm:scroll-p-10     | md:scroll-p-10     | lg:scroll-p-10     | xl:scroll-p-10     | 2xl:scroll-p-10     |
| scroll-p-11      | sm:scroll-p-11     | md:scroll-p-11     | lg:scroll-p-11     | xl:scroll-p-11     | 2xl:scroll-p-11     |
| scroll-p-12      | sm:scroll-p-12     | md:scroll-p-12     | lg:scroll-p-12     | xl:scroll-p-12     | 2xl:scroll-p-12     |
| scroll-p-14      | sm:scroll-p-14     | md:scroll-p-14     | lg:scroll-p-14     | xl:scroll-p-14     | 2xl:scroll-p-14     |
| scroll-p-16      | sm:scroll-p-16     | md:scroll-p-16     | lg:scroll-p-16     | xl:scroll-p-16     | 2xl:scroll-p-16     |
| scroll-p-20      | sm:scroll-p-20     | md:scroll-p-20     | lg:scroll-p-20     | xl:scroll-p-20     | 2xl:scroll-p-20     |
| scroll-p-24      | sm:scroll-p-24     | md:scroll-p-24     | lg:scroll-p-24     | xl:scroll-p-24     | 2xl:scroll-p-24     |
| scroll-p-28      | sm:scroll-p-28     | md:scroll-p-28     | lg:scroll-p-28     | xl:scroll-p-28     | 2xl:scroll-p-28     |
| scroll-p-32      | sm:scroll-p-32     | md:scroll-p-32     | lg:scroll-p-32     | xl:scroll-p-32     | 2xl:scroll-p-32     |
| scroll-p-36      | sm:scroll-p-36     | md:scroll-p-36     | lg:scroll-p-36     | xl:scroll-p-36     | 2xl:scroll-p-36     |
| scroll-p-40      | sm:scroll-p-40     | md:scroll-p-40     | lg:scroll-p-40     | xl:scroll-p-40     | 2xl:scroll-p-40     |
| scroll-p-44      | sm:scroll-p-44     | md:scroll-p-44     | lg:scroll-p-44     | xl:scroll-p-44     | 2xl:scroll-p-44     |
| scroll-p-48      | sm:scroll-p-48     | md:scroll-p-48     | lg:scroll-p-48     | xl:scroll-p-48     | 2xl:scroll-p-48     |
| scroll-p-52      | sm:scroll-p-52     | md:scroll-p-52     | lg:scroll-p-52     | xl:scroll-p-52     | 2xl:scroll-p-52     |
| scroll-p-56      | sm:scroll-p-56     | md:scroll-p-56     | lg:scroll-p-56     | xl:scroll-p-56     | 2xl:scroll-p-56     |
| scroll-p-60      | sm:scroll-p-60     | md:scroll-p-60     | lg:scroll-p-60     | xl:scroll-p-60     | 2xl:scroll-p-60     |
| scroll-p-64      | sm:scroll-p-64     | md:scroll-p-64     | lg:scroll-p-64     | xl:scroll-p-64     | 2xl:scroll-p-64     |
| scroll-p-72      | sm:scroll-p-72     | md:scroll-p-72     | lg:scroll-p-72     | xl:scroll-p-72     | 2xl:scroll-p-72     |
| scroll-p-80      | sm:scroll-p-80     | md:scroll-p-80     | lg:scroll-p-80     | xl:scroll-p-80     | 2xl:scroll-p-80     |
| scroll-p-96      | sm:scroll-p-96     | md:scroll-p-96     | lg:scroll-p-96     | xl:scroll-p-96     | 2xl:scroll-p-96     |
*/