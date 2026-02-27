/**
 * Scroll margin utilities for Tailwind CSS.
 *
 * @module themes/spacing/scrollMargin
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;
import resolveNegative         from '../helpers/resolveNegative' ;

import { lazyFixedSizes } from '../sizing/sizes' ;

/**
 * @typedef {'b' | 'e' | 'l' | 'r' | 's' | 't' | 'x' | 'y'} ScrollMarginDirection
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
 * Valid scroll margin directions.
 * @type {ScrollMarginDirection[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Creates a scroll margin class definition.
 *
 * @param {string | number} value - The scroll margin value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {ScrollMarginDirection | null} [options.direction=null] - Scroll margin direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative scroll margin.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false , negative = false } = {} ) =>
{
    const dir = directions.includes( direction ) ? direction : '' ;
    const imp = important ? '!' : '' ;

    ( { value , negative } = resolveNegative( value , negative ) ) ;

    const neg = negative ? '-' : '' ;

    return { [ `${ prefix }${ imp }${ neg }scroll-m${ dir }-${ value }` ]: true } ;
} ;

/**
 * Generates responsive scroll margin class definitions.
 *
 * Supports negative values either via the `negative` option
 * or by passing a negative numeric value directly.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Scroll margin value or responsive object.
 * @param {Object} [options]
 * @param {ScrollMarginDirection | null} [options.direction=null] - Scroll margin direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative scroll margin.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/scroll-margin
 *
 * @example
 * ```js
 * getScrollMargin( 4 ) ;
 * // → { 'scroll-m-4': true }
 *
 * getScrollMargin( 2 , { direction: 't' } ) ;
 * // → { 'scroll-mt-2': true }
 *
 * getScrollMargin( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'scroll-m-2': true , 'md:scroll-m-4': true , 'lg:scroll-m-8': true }
 *
 * getScrollMargin( -4 ) ;
 * // → { '-scroll-m-4': true }
 *
 * getScrollMargin( -2 , { direction: 'x' , important: true } ) ;
 * // → { '!-scroll-mx-2': true }
 * ```
 */
const getScrollMargin = getResponsiveDefinition
(
    create ,
    ( value ) =>
    {
        if ( typeof value === 'number' )
        {
            return lazyFixedSizes.includes( Math.abs( value ) ) ;
        }
        if ( typeof value === 'string' && value.startsWith( '-' ) )
        {
            return lazyFixedSizes.includes( value.slice( 1 ) ) ;
        }
        return lazyFixedSizes.includes( value ) ;
    }
) ;

export default getScrollMargin ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-m-px        | sm:scroll-m-px       | md:scroll-m-px       | lg:scroll-m-px       | xl:scroll-m-px       | 2xl:scroll-m-px       |
| scroll-m-0         | sm:scroll-m-0        | md:scroll-m-0        | lg:scroll-m-0        | xl:scroll-m-0        | 2xl:scroll-m-0        |
| scroll-m-0.5       | sm:scroll-m-0.5      | md:scroll-m-0.5      | lg:scroll-m-0.5      | xl:scroll-m-0.5      | 2xl:scroll-m-0.5      |
| scroll-m-1         | sm:scroll-m-1        | md:scroll-m-1        | lg:scroll-m-1        | xl:scroll-m-1        | 2xl:scroll-m-1        |
| scroll-m-1.5       | sm:scroll-m-1.5      | md:scroll-m-1.5      | lg:scroll-m-1.5      | xl:scroll-m-1.5      | 2xl:scroll-m-1.5      |
| scroll-m-2         | sm:scroll-m-2        | md:scroll-m-2        | lg:scroll-m-2        | xl:scroll-m-2        | 2xl:scroll-m-2        |
| scroll-m-2.5       | sm:scroll-m-2.5      | md:scroll-m-2.5      | lg:scroll-m-2.5      | xl:scroll-m-2.5      | 2xl:scroll-m-2.5      |
| scroll-m-3         | sm:scroll-m-3        | md:scroll-m-3        | lg:scroll-m-3        | xl:scroll-m-3        | 2xl:scroll-m-3        |
| scroll-m-3.5       | sm:scroll-m-3.5      | md:scroll-m-3.5      | lg:scroll-m-3.5      | xl:scroll-m-3.5      | 2xl:scroll-m-3.5      |
| scroll-m-4         | sm:scroll-m-4        | md:scroll-m-4        | lg:scroll-m-4        | xl:scroll-m-4        | 2xl:scroll-m-4        |
| scroll-m-5         | sm:scroll-m-5        | md:scroll-m-5        | lg:scroll-m-5        | xl:scroll-m-5        | 2xl:scroll-m-5        |
| scroll-m-6         | sm:scroll-m-6        | md:scroll-m-6        | lg:scroll-m-6        | xl:scroll-m-6        | 2xl:scroll-m-6        |
| scroll-m-7         | sm:scroll-m-7        | md:scroll-m-7        | lg:scroll-m-7        | xl:scroll-m-7        | 2xl:scroll-m-7        |
| scroll-m-8         | sm:scroll-m-8        | md:scroll-m-8        | lg:scroll-m-8        | xl:scroll-m-8        | 2xl:scroll-m-8        |
| scroll-m-9         | sm:scroll-m-9        | md:scroll-m-9        | lg:scroll-m-9        | xl:scroll-m-9        | 2xl:scroll-m-9        |
| scroll-m-10        | sm:scroll-m-10       | md:scroll-m-10       | lg:scroll-m-10       | xl:scroll-m-10       | 2xl:scroll-m-10       |
| scroll-m-11        | sm:scroll-m-11       | md:scroll-m-11       | lg:scroll-m-11       | xl:scroll-m-11       | 2xl:scroll-m-11       |
| scroll-m-12        | sm:scroll-m-12       | md:scroll-m-12       | lg:scroll-m-12       | xl:scroll-m-12       | 2xl:scroll-m-12       |
| scroll-m-14        | sm:scroll-m-14       | md:scroll-m-14       | lg:scroll-m-14       | xl:scroll-m-14       | 2xl:scroll-m-14       |
| scroll-m-16        | sm:scroll-m-16       | md:scroll-m-16       | lg:scroll-m-16       | xl:scroll-m-16       | 2xl:scroll-m-16       |
| scroll-m-20        | sm:scroll-m-20       | md:scroll-m-20       | lg:scroll-m-20       | xl:scroll-m-20       | 2xl:scroll-m-20       |
| scroll-m-24        | sm:scroll-m-24       | md:scroll-m-24       | lg:scroll-m-24       | xl:scroll-m-24       | 2xl:scroll-m-24       |
| scroll-m-28        | sm:scroll-m-28       | md:scroll-m-28       | lg:scroll-m-28       | xl:scroll-m-28       | 2xl:scroll-m-28       |
| scroll-m-32        | sm:scroll-m-32       | md:scroll-m-32       | lg:scroll-m-32       | xl:scroll-m-32       | 2xl:scroll-m-32       |
| scroll-m-36        | sm:scroll-m-36       | md:scroll-m-36       | lg:scroll-m-36       | xl:scroll-m-36       | 2xl:scroll-m-36       |
| scroll-m-40        | sm:scroll-m-40       | md:scroll-m-40       | lg:scroll-m-40       | xl:scroll-m-40       | 2xl:scroll-m-40       |
| scroll-m-44        | sm:scroll-m-44       | md:scroll-m-44       | lg:scroll-m-44       | xl:scroll-m-44       | 2xl:scroll-m-44       |
| scroll-m-48        | sm:scroll-m-48       | md:scroll-m-48       | lg:scroll-m-48       | xl:scroll-m-48       | 2xl:scroll-m-48       |
| scroll-m-52        | sm:scroll-m-52       | md:scroll-m-52       | lg:scroll-m-52       | xl:scroll-m-52       | 2xl:scroll-m-52       |
| scroll-m-56        | sm:scroll-m-56       | md:scroll-m-56       | lg:scroll-m-56       | xl:scroll-m-56       | 2xl:scroll-m-56       |
| scroll-m-60        | sm:scroll-m-60       | md:scroll-m-60       | lg:scroll-m-60       | xl:scroll-m-60       | 2xl:scroll-m-60       |
| scroll-m-64        | sm:scroll-m-64       | md:scroll-m-64       | lg:scroll-m-64       | xl:scroll-m-64       | 2xl:scroll-m-64       |
| scroll-m-72        | sm:scroll-m-72       | md:scroll-m-72       | lg:scroll-m-72       | xl:scroll-m-72       | 2xl:scroll-m-72       |
| scroll-m-80        | sm:scroll-m-80       | md:scroll-m-80       | lg:scroll-m-80       | xl:scroll-m-80       | 2xl:scroll-m-80       |
| scroll-m-96        | sm:scroll-m-96       | md:scroll-m-96       | lg:scroll-m-96       | xl:scroll-m-96       | 2xl:scroll-m-96       |
| -scroll-m-px       | sm:-scroll-m-px      | md:-scroll-m-px      | lg:-scroll-m-px      | xl:-scroll-m-px      | 2xl:-scroll-m-px      |
| -scroll-m-0.5      | sm:-scroll-m-0.5     | md:-scroll-m-0.5     | lg:-scroll-m-0.5     | xl:-scroll-m-0.5     | 2xl:-scroll-m-0.5     |
| -scroll-m-1        | sm:-scroll-m-1       | md:-scroll-m-1       | lg:-scroll-m-1       | xl:-scroll-m-1       | 2xl:-scroll-m-1       |
| -scroll-m-1.5      | sm:-scroll-m-1.5     | md:-scroll-m-1.5     | lg:-scroll-m-1.5     | xl:-scroll-m-1.5     | 2xl:-scroll-m-1.5     |
| -scroll-m-2        | sm:-scroll-m-2       | md:-scroll-m-2       | lg:-scroll-m-2       | xl:-scroll-m-2       | 2xl:-scroll-m-2       |
| -scroll-m-2.5      | sm:-scroll-m-2.5     | md:-scroll-m-2.5     | lg:-scroll-m-2.5     | xl:-scroll-m-2.5     | 2xl:-scroll-m-2.5     |
| -scroll-m-3        | sm:-scroll-m-3       | md:-scroll-m-3       | lg:-scroll-m-3       | xl:-scroll-m-3       | 2xl:-scroll-m-3       |
| -scroll-m-3.5      | sm:-scroll-m-3.5     | md:-scroll-m-3.5     | lg:-scroll-m-3.5     | xl:-scroll-m-3.5     | 2xl:-scroll-m-3.5     |
| -scroll-m-4        | sm:-scroll-m-4       | md:-scroll-m-4       | lg:-scroll-m-4       | xl:-scroll-m-4       | 2xl:-scroll-m-4       |
| -scroll-m-5        | sm:-scroll-m-5       | md:-scroll-m-5       | lg:-scroll-m-5       | xl:-scroll-m-5       | 2xl:-scroll-m-5       |
| -scroll-m-6        | sm:-scroll-m-6       | md:-scroll-m-6       | lg:-scroll-m-6       | xl:-scroll-m-6       | 2xl:-scroll-m-6       |
| -scroll-m-7        | sm:-scroll-m-7       | md:-scroll-m-7       | lg:-scroll-m-7       | xl:-scroll-m-7       | 2xl:-scroll-m-7       |
| -scroll-m-8        | sm:-scroll-m-8       | md:-scroll-m-8       | lg:-scroll-m-8       | xl:-scroll-m-8       | 2xl:-scroll-m-8       |
| -scroll-m-9        | sm:-scroll-m-9       | md:-scroll-m-9       | lg:-scroll-m-9       | xl:-scroll-m-9       | 2xl:-scroll-m-9       |
| -scroll-m-10       | sm:-scroll-m-10      | md:-scroll-m-10      | lg:-scroll-m-10      | xl:-scroll-m-10      | 2xl:-scroll-m-10      |
| -scroll-m-11       | sm:-scroll-m-11      | md:-scroll-m-11      | lg:-scroll-m-11      | xl:-scroll-m-11      | 2xl:-scroll-m-11      |
| -scroll-m-12       | sm:-scroll-m-12      | md:-scroll-m-12      | lg:-scroll-m-12      | xl:-scroll-m-12      | 2xl:-scroll-m-12      |
| -scroll-m-14       | sm:-scroll-m-14      | md:-scroll-m-14      | lg:-scroll-m-14      | xl:-scroll-m-14      | 2xl:-scroll-m-14      |
| -scroll-m-16       | sm:-scroll-m-16      | md:-scroll-m-16      | lg:-scroll-m-16      | xl:-scroll-m-16      | 2xl:-scroll-m-16      |
| -scroll-m-20       | sm:-scroll-m-20      | md:-scroll-m-20      | lg:-scroll-m-20      | xl:-scroll-m-20      | 2xl:-scroll-m-20      |
| -scroll-m-24       | sm:-scroll-m-24      | md:-scroll-m-24      | lg:-scroll-m-24      | xl:-scroll-m-24      | 2xl:-scroll-m-24      |
| -scroll-m-28       | sm:-scroll-m-28      | md:-scroll-m-28      | lg:-scroll-m-28      | xl:-scroll-m-28      | 2xl:-scroll-m-28      |
| -scroll-m-32       | sm:-scroll-m-32      | md:-scroll-m-32      | lg:-scroll-m-32      | xl:-scroll-m-32      | 2xl:-scroll-m-32      |
| -scroll-m-36       | sm:-scroll-m-36      | md:-scroll-m-36      | lg:-scroll-m-36      | xl:-scroll-m-36      | 2xl:-scroll-m-36      |
| -scroll-m-40       | sm:-scroll-m-40      | md:-scroll-m-40      | lg:-scroll-m-40      | xl:-scroll-m-40      | 2xl:-scroll-m-40      |
| -scroll-m-44       | sm:-scroll-m-44      | md:-scroll-m-44      | lg:-scroll-m-44      | xl:-scroll-m-44      | 2xl:-scroll-m-44      |
| -scroll-m-48       | sm:-scroll-m-48      | md:-scroll-m-48      | lg:-scroll-m-48      | xl:-scroll-m-48      | 2xl:-scroll-m-48      |
| -scroll-m-52       | sm:-scroll-m-52      | md:-scroll-m-52      | lg:-scroll-m-52      | xl:-scroll-m-52      | 2xl:-scroll-m-52      |
| -scroll-m-56       | sm:-scroll-m-56      | md:-scroll-m-56      | lg:-scroll-m-56      | xl:-scroll-m-56      | 2xl:-scroll-m-56      |
| -scroll-m-60       | sm:-scroll-m-60      | md:-scroll-m-60      | lg:-scroll-m-60      | xl:-scroll-m-60      | 2xl:-scroll-m-60      |
| -scroll-m-64       | sm:-scroll-m-64      | md:-scroll-m-64      | lg:-scroll-m-64      | xl:-scroll-m-64      | 2xl:-scroll-m-64      |
| -scroll-m-72       | sm:-scroll-m-72      | md:-scroll-m-72      | lg:-scroll-m-72      | xl:-scroll-m-72      | 2xl:-scroll-m-72      |
| -scroll-m-80       | sm:-scroll-m-80      | md:-scroll-m-80      | lg:-scroll-m-80      | xl:-scroll-m-80      | 2xl:-scroll-m-80      |
| -scroll-m-96       | sm:-scroll-m-96      | md:-scroll-m-96      | lg:-scroll-m-96      | xl:-scroll-m-96      | 2xl:-scroll-m-96      |
*/