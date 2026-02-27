import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;
import resolveNegative         from '../helpers/resolveNegative';

import { lazyFixedSizes } from '../sizing/sizes' ;

/**
 * @typedef {'b' | 'e' | 'l' | 'r' | 's' | 't' | 'x' | 'y'} MarginDirection
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
 * Valid margin directions.
 * @type {MarginDirection[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Creates a margin class definition.
 *
 * @param {string | number} value - The margin value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {MarginDirection | null} [options.direction=null] - Margin direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative margin.
 *
 * @returns {Object} Class definition object.
 */
const create =
(
    value ,
    {
        prefix = '' ,
        direction = null ,
        important = false ,
        negative = false
} = {}
) =>
{
    const dir = directions.includes( direction ) ? direction : '' ;
    const imp = important ? '!' : '' ;

    ( { value , negative } = resolveNegative( value , negative ) ) ;

    const neg = negative ? '-' : '' ;

    return { [ prefix + imp + neg + 'm' + dir + '-' + value ] : true } ;
} ;

/**
 * Generates responsive margin class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Margin value or responsive object.
 * @param {Object} [options]
 * @param {MarginDirection | null} [options.direction=null] - Margin direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/margin
 *
 * @example
 * ```js
 * getMargin( 4 ) ;
 * // → { 'm-4': true }
 *
 * getMargin( 2 , { direction: 't' } ) ;
 * // → { 'mt-2': true }
 *
 * getMargin( 4 , { direction: 'x' } ) ;
 * // → { 'mx-4': true }
 *
 * getMargin( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'm-2': true , 'md:m-4': true , 'lg:m-8': true }
 *
 * getMargin( { xs: 2 , md: 4 } , { direction: 'b' } ) ;
 * // → { 'mb-2': true , 'md:mb-4': true }
 *
 * // Negative margins
 *
 * getMargin( 4 , { negative: true } ) ;
 * // → { '-m-4': true }
 *
 * getMargin( -4 ) ;
 * // → { '-m-4': true }
 *
 * getMargin( '-4' ) ;
 * // → { '-m-4': true }
 *
 * getMargin( -2 , { direction: 't' } ) ;
 * // → { '-mt-2': true }
 *
 * getMargin( 4 , { negative: true , important: true } ) ;
 * // → { '!-m-4': true }
 *
 * getMargin( { xs: -2 , md: -4 } , { direction: 'x' } ) ;
 * // → { '-mx-2': true , 'md:-mx-4': true }
 * ```
 */
const getMargin = getResponsiveDefinition
(
    create ,
    value => lazyFixedSizes.includes( value )
) ;

export default getMargin ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| m-auto   | sm:m-auto  | md:m-auto  | lg:m-auto  | xl:m-auto  | 2xl:m-auto  |
| m-px     | sm:m-px    | md:m-px    | lg:m-px    | xl:m-px    | 2xl:m-px    |
| m-0      | sm:m-0     | md:m-0     | lg:m-0     | xl:m-0     | 2xl:m-0     |
| m-0.5    | sm:m-0.5   | md:m-0.5   | lg:m-0.5   | xl:m-0.5   | 2xl:m-0.5   |
| m-1      | sm:m-1     | md:m-1     | lg:m-1     | xl:m-1     | 2xl:m-1     |
| m-1.5    | sm:m-1.5   | md:m-1.5   | lg:m-1.5   | xl:m-1.5   | 2xl:m-1.5   |
| m-2      | sm:m-2     | md:m-2     | lg:m-2     | xl:m-2     | 2xl:m-2     |
| m-2.5    | sm:m-2.5   | md:m-2.5   | lg:m-2.5   | xl:m-2.5   | 2xl:m-2.5   |
| m-3      | sm:m-3     | md:m-3     | lg:m-3     | xl:m-3     | 2xl:m-3     |
| m-3.5    | sm:m-3.5   | md:m-3.5   | lg:m-3.5   | xl:m-3.5   | 2xl:m-3.5   |
| m-4      | sm:m-4     | md:m-4     | lg:m-4     | xl:m-4     | 2xl:m-4     |
| m-5      | sm:m-5     | md:m-5     | lg:m-5     | xl:m-5     | 2xl:m-5     |
| m-6      | sm:m-6     | md:m-6     | lg:m-6     | xl:m-6     | 2xl:m-6     |
| m-7      | sm:m-7     | md:m-7     | lg:m-7     | xl:m-7     | 2xl:m-7     |
| m-8      | sm:m-8     | md:m-8     | lg:m-8     | xl:m-8     | 2xl:m-8     |
| m-9      | sm:m-9     | md:m-9     | lg:m-9     | xl:m-9     | 2xl:m-9     |
| m-10     | sm:m-10    | md:m-10    | lg:m-10    | xl:m-10    | 2xl:m-10    |
| m-11     | sm:m-11    | md:m-11    | lg:m-11    | xl:m-11    | 2xl:m-11    |
| m-12     | sm:m-12    | md:m-12    | lg:m-12    | xl:m-12    | 2xl:m-12    |
| m-14     | sm:m-14    | md:m-14    | lg:m-14    | xl:m-14    | 2xl:m-14    |
| m-16     | sm:m-16    | md:m-16    | lg:m-16    | xl:m-16    | 2xl:m-16    |
| m-20     | sm:m-20    | md:m-20    | lg:m-20    | xl:m-20    | 2xl:m-20    |
| m-24     | sm:m-24    | md:m-24    | lg:m-24    | xl:m-24    | 2xl:m-24    |
| m-28     | sm:m-28    | md:m-28    | lg:m-28    | xl:m-28    | 2xl:m-28    |
| m-32     | sm:m-32    | md:m-32    | lg:m-32    | xl:m-32    | 2xl:m-32    |
| m-36     | sm:m-36    | md:m-36    | lg:m-36    | xl:m-36    | 2xl:m-36    |
| m-40     | sm:m-40    | md:m-40    | lg:m-40    | xl:m-40    | 2xl:m-40    |
| m-44     | sm:m-44    | md:m-44    | lg:m-44    | xl:m-44    | 2xl:m-44    |
| m-48     | sm:m-48    | md:m-48    | lg:m-48    | xl:m-48    | 2xl:m-48    |
| m-52     | sm:m-52    | md:m-52    | lg:m-52    | xl:m-52    | 2xl:m-52    |
| m-56     | sm:m-56    | md:m-56    | lg:m-56    | xl:m-56    | 2xl:m-56    |
| m-60     | sm:m-60    | md:m-60    | lg:m-60    | xl:m-60    | 2xl:m-60    |
| m-64     | sm:m-64    | md:m-64    | lg:m-64    | xl:m-64    | 2xl:m-64    |
| m-72     | sm:m-72    | md:m-72    | lg:m-72    | xl:m-72    | 2xl:m-72    |
| m-80     | sm:m-80    | md:m-80    | lg:m-80    | xl:m-80    | 2xl:m-80    |
| m-96     | sm:m-96    | md:m-96    | lg:m-96    | xl:m-96    | 2xl:m-96    |
*/