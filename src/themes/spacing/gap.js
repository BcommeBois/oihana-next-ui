/**
 * Gap utilities for Tailwind CSS.
 *
 * @module themes/spacing/gap
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes } from '../sizing/sizes' ;

/**
 * @typedef {'x' | 'y'} GapDirection
 */

export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid gap directions.
 * @type {GapDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Creates a gap class definition.
 *
 * @param {string | number} value - The gap value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {GapDirection | null} [options.direction=null] - Gap direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false } = {} ) =>
{
    const axis = directions.includes( direction ) ? `-${ direction }` : '' ;
    const imp  = important ? '!' : '' ;

    return { [ `${ prefix }${ imp }gap${ axis }-${ value }` ]: true } ;
} ;

/**
 * Generates responsive gap class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Gap value or responsive object.
 * @param {Object} [options]
 * @param {GapDirection | null} [options.direction=null] - Gap direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/gap
 *
 * @example
 * ```js
 * getGap( 4 ) ;
 * // → { 'gap-4': true }
 *
 * getGap( 2 , { direction: 'x' } ) ;
 * // → { 'gap-x-2': true }
 *
 * getGap( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'gap-2': true , 'md:gap-4': true , 'lg:gap-8': true }
 *
 * getGap( 4 , { important: true } ) ;
 * // → { '!gap-4': true }
 * ```
 */
const getGap = getResponsiveDefinition
(
    create ,
    ( value ) => lazyFixedSizes.includes( value )
) ;

export default getGap ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| gap-px   | sm:gap-px  | md:gap-px  | lg:gap-px  | xl:gap-px  | 2xl:gap-px  |
| gap-0    | sm:gap-0   | md:gap-0   | lg:gap-0   | xl:gap-0   | 2xl:gap-0   |
| gap-0.5  | sm:gap-0.5 | md:gap-0.5 | lg:gap-0.5 | xl:gap-0.5 | 2xl:gap-0.5 |
| gap-1    | sm:gap-1   | md:gap-1   | lg:gap-1   | xl:gap-1   | 2xl:gap-1   |
| gap-1.5  | sm:gap-1.5 | md:gap-1.5 | lg:gap-1.5 | xl:gap-1.5 | 2xl:gap-1.5 |
| gap-2    | sm:gap-2   | md:gap-2   | lg:gap-2   | xl:gap-2   | 2xl:gap-2   |
| gap-2.5  | sm:gap-2.5 | md:gap-2.5 | lg:gap-2.5 | xl:gap-2.5 | 2xl:gap-2.5 |
| gap-3    | sm:gap-3   | md:gap-3   | lg:gap-3   | xl:gap-3   | 2xl:gap-3   |
| gap-3.5  | sm:gap-3.5 | md:gap-3.5 | lg:gap-3.5 | xl:gap-3.5 | 2xl:gap-3.5 |
| gap-4    | sm:gap-4   | md:gap-4   | lg:gap-4   | xl:gap-4   | 2xl:gap-4   |
| gap-5    | sm:gap-5   | md:gap-5   | lg:gap-5   | xl:gap-5   | 2xl:gap-5   |
| gap-6    | sm:gap-6   | md:gap-6   | lg:gap-6   | xl:gap-6   | 2xl:gap-6   |
| gap-7    | sm:gap-7   | md:gap-7   | lg:gap-7   | xl:gap-7   | 2xl:gap-7   |
| gap-8    | sm:gap-8   | md:gap-8   | lg:gap-8   | xl:gap-8   | 2xl:gap-8   |
| gap-9    | sm:gap-9   | md:gap-9   | lg:gap-9   | xl:gap-9   | 2xl:gap-9   |
| gap-10   | sm:gap-10  | md:gap-10  | lg:gap-10  | xl:gap-10  | 2xl:gap-10  |
| gap-11   | sm:gap-11  | md:gap-11  | lg:gap-11  | xl:gap-11  | 2xl:gap-11  |
| gap-12   | sm:gap-12  | md:gap-12  | lg:gap-12  | xl:gap-12  | 2xl:gap-12  |
| gap-14   | sm:gap-14  | md:gap-14  | lg:gap-14  | xl:gap-14  | 2xl:gap-14  |
| gap-16   | sm:gap-16  | md:gap-16  | lg:gap-16  | xl:gap-16  | 2xl:gap-16  |
| gap-20   | sm:gap-20  | md:gap-20  | lg:gap-20  | xl:gap-20  | 2xl:gap-20  |
| gap-24   | sm:gap-24  | md:gap-24  | lg:gap-24  | xl:gap-24  | 2xl:gap-24  |
| gap-28   | sm:gap-28  | md:gap-28  | lg:gap-28  | xl:gap-28  | 2xl:gap-28  |
| gap-32   | sm:gap-32  | md:gap-32  | lg:gap-32  | xl:gap-32  | 2xl:gap-32  |
| gap-36   | sm:gap-36  | md:gap-36  | lg:gap-36  | xl:gap-36  | 2xl:gap-36  |
| gap-40   | sm:gap-40  | md:gap-40  | lg:gap-40  | xl:gap-40  | 2xl:gap-40  |
| gap-44   | sm:gap-44  | md:gap-44  | lg:gap-44  | xl:gap-44  | 2xl:gap-44  |
| gap-48   | sm:gap-48  | md:gap-48  | lg:gap-48  | xl:gap-48  | 2xl:gap-48  |
| gap-52   | sm:gap-52  | md:gap-52  | lg:gap-52  | xl:gap-52  | 2xl:gap-52  |
| gap-56   | sm:gap-56  | md:gap-56  | lg:gap-56  | xl:gap-56  | 2xl:gap-56  |
| gap-60   | sm:gap-60  | md:gap-60  | lg:gap-60  | xl:gap-60  | 2xl:gap-60  |
| gap-64   | sm:gap-64  | md:gap-64  | lg:gap-64  | xl:gap-64  | 2xl:gap-64  |
| gap-72   | sm:gap-72  | md:gap-72  | lg:gap-72  | xl:gap-72  | 2xl:gap-72  |
| gap-80   | sm:gap-80  | md:gap-80  | lg:gap-80  | xl:gap-80  | 2xl:gap-80  |
| gap-96   | sm:gap-96  | md:gap-96  | lg:gap-96  | xl:gap-96  | 2xl:gap-96  |
*/