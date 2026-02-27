import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes } from '../sizing/sizes' ;

export const BOTTOM     = 'b' ;
export const END        = 'e' ;
export const LEFT       = 'l' ;
export const RIGHT      = 'r' ;
export const START      = 's' ;
export const TOP        = 't' ;
export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid padding direction values.
 * @type {(string)[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Creates a padding class definition.
 *
 * @param {string|number} value - Padding value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive breakpoint prefix.
 * @param {('b'|'e'|'l'|'r'|'s'|'t'|'x'|'y'|null)} [options.direction=null] - Side direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false } = {} ) =>
{
    const dir = directions.includes( direction ) ? direction : '' ;
    const imp = important ? '!' : '' ;

    return { [ `${ prefix }${ imp }p${ dir }-${ value }` ] : true } ;
} ;

/**
 * Generates responsive padding class definitions.
 *
 * @param {string|number|Object} value - Padding value or responsive object.
 * @param {Object} [options]
 * @param {('b'|'e'|'l'|'r'|'s'|'t'|'x'|'y'|null)} [options.direction=null] - Side direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/padding
 *
 * @example
 * ```js
 * getPadding( 4 ) ;
 * // → { 'p-4': true }
 *
 * getPadding( 2 , { direction: 't' } ) ;
 * // → { 'pt-2': true }
 *
 * getPadding( 4 , { direction: 'x' } ) ;
 * // → { 'px-4': true }
 *
 * getPadding( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'p-2': true , 'md:p-4': true , 'lg:p-8': true }
 *
 * getPadding( { xs: 2 , md: 4 } , { direction: 'b' } ) ;
 * // → { 'pb-2': true , 'md:pb-4': true }
 *
 * getPadding( 4 , { important: true } ) ;
 * // → { '!p-4': true }
 *
 * getPadding( 2 , { direction: 'e' , important: true } ) ;
 * // → { '!pe-2': true }
 * ```
 */
const getPadding = getResponsiveDefinition
(
    create ,
    value => lazyFixedSizes.includes( value )
) ;

export default getPadding ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| p-px     | sm:p-px    | md:p-px    | lg:p-px    | xl:p-px    | 2xl:p-px    |
| p-0      | sm:p-0     | md:p-0     | lg:p-0     | xl:p-0     | 2xl:p-0     |
| p-0.5    | sm:p-0.5   | md:p-0.5   | lg:p-0.5   | xl:p-0.5   | 2xl:p-0.5   |
| p-1      | sm:p-1     | md:p-1     | lg:p-1     | xl:p-1     | 2xl:p-1     |
| p-1.5    | sm:p-1.5   | md:p-1.5   | lg:p-1.5   | xl:p-1.5   | 2xl:p-1.5   |
| p-2      | sm:p-2     | md:p-2     | lg:p-2     | xl:p-2     | 2xl:p-2     |
| p-2.5    | sm:p-2.5   | md:p-2.5   | lg:p-2.5   | xl:p-2.5   | 2xl:p-2.5   |
| p-3      | sm:p-3     | md:p-3     | lg:p-3     | xl:p-3     | 2xl:p-3     |
| p-3.5    | sm:p-3.5   | md:p-3.5   | lg:p-3.5   | xl:p-3.5   | 2xl:p-3.5   |
| p-4      | sm:p-4     | md:p-4     | lg:p-4     | xl:p-4     | 2xl:p-4     |
| p-5      | sm:p-5     | md:p-5     | lg:p-5     | xl:p-5     | 2xl:p-5     |
| p-6      | sm:p-6     | md:p-6     | lg:p-6     | xl:p-6     | 2xl:p-6     |
| p-7      | sm:p-7     | md:p-7     | lg:p-7     | xl:p-7     | 2xl:p-7     |
| p-8      | sm:p-8     | md:p-8     | lg:p-8     | xl:p-8     | 2xl:p-8     |
| p-9      | sm:p-9     | md:p-9     | lg:p-9     | xl:p-9     | 2xl:p-9     |
| p-10     | sm:p-10    | md:p-10    | lg:p-10    | xl:p-10    | 2xl:p-10    |
| p-11     | sm:p-11    | md:p-11    | lg:p-11    | xl:p-11    | 2xl:p-11    |
| p-12     | sm:p-12    | md:p-12    | lg:p-12    | xl:p-12    | 2xl:p-12    |
| p-14     | sm:p-14    | md:p-14    | lg:p-14    | xl:p-14    | 2xl:p-14    |
| p-16     | sm:p-16    | md:p-16    | lg:p-16    | xl:p-16    | 2xl:p-16    |
| p-20     | sm:p-20    | md:p-20    | lg:p-20    | xl:p-20    | 2xl:p-20    |
| p-24     | sm:p-24    | md:p-24    | lg:p-24    | xl:p-24    | 2xl:p-24    |
| p-28     | sm:p-28    | md:p-28    | lg:p-28    | xl:p-28    | 2xl:p-28    |
| p-32     | sm:p-32    | md:p-32    | lg:p-32    | xl:p-32    | 2xl:p-32    |
| p-36     | sm:p-36    | md:p-36    | lg:p-36    | xl:p-36    | 2xl:p-36    |
| p-40     | sm:p-40    | md:p-40    | lg:p-40    | xl:p-40    | 2xl:p-40    |
| p-44     | sm:p-44    | md:p-44    | lg:p-44    | xl:p-44    | 2xl:p-44    |
| p-48     | sm:p-48    | md:p-48    | lg:p-48    | xl:p-48    | 2xl:p-48    |
| p-52     | sm:p-52    | md:p-52    | lg:p-52    | xl:p-52    | 2xl:p-52    |
| p-56     | sm:p-56    | md:p-56    | lg:p-56    | xl:p-56    | 2xl:p-56    |
| p-60     | sm:p-60    | md:p-60    | lg:p-60    | xl:p-60    | 2xl:p-60    |
| p-64     | sm:p-64    | md:p-64    | lg:p-64    | xl:p-64    | 2xl:p-64    |
| p-72     | sm:p-72    | md:p-72    | lg:p-72    | xl:p-72    | 2xl:p-72    |
| p-80     | sm:p-80    | md:p-80    | lg:p-80    | xl:p-80    | 2xl:p-80    |
| p-96     | sm:p-96    | md:p-96    | lg:p-96    | xl:p-96    | 2xl:p-96    |
*/