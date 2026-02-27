import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes } from '../sizing/sizes' ;

export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid border-spacing direction values.
 *
 * @type {(string)[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Creates a border-spacing class definition.
 *
 * @param {string|number} value - Spacing value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive breakpoint prefix.
 * @param {('x'|'y'|null)} [options.direction=null] - Axis direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false } = {} ) =>
{
    const axis = directions.includes( direction ) ? `-${ direction }` : '' ;
    const imp  = important ? '!' : '' ;

    return { [ `${ prefix }${ imp }border-spacing${ axis }-${ value }` ] : true } ;
} ;

/**
 * Generates responsive border-spacing class definitions.
 *
 * @param {string|number|Object} value - Spacing value or responsive object.
 * @param {Object} [options]
 * @param {('x'|'y'|null)} [options.direction=null] - Axis direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/border-spacing
 *
 * @example
 * ```js
 * getBorderSpacing( '4' ) ;
 * // → { 'border-spacing-4': true }
 *
 * getBorderSpacing( '2' , { direction: 'x' } ) ;
 * // → { 'border-spacing-x-2': true }
 *
 * getBorderSpacing( { xs: '2' , md: '4' , lg: '8' } ) ;
 * // → { 'border-spacing-2': true , 'md:border-spacing-4': true , 'lg:border-spacing-8': true }
 *
 * getBorderSpacing( 4 , { important: true } ) ;
 * // → { '!border-spacing-4': true }
 * ```
 */
const getBorderSpacing = getResponsiveDefinition
(
    create ,
    ( value ) => lazyFixedSizes.includes( value )
) ;

export default getBorderSpacing ;


/* Tailwindcss safe list
| ---------XS-------- | ----------SM---------- | ----------MD---------- | ----------LG---------- | ----------XL---------— | ----------XXL---------- |
| border-spacing-px   | sm:border-spacing-px   | md:border-spacing-px   | lg:border-spacing-px   | xl:border-spacing-px   | 2xl:border-spacing-px   |
| border-spacing-0    | sm:border-spacing-0    | md:border-spacing-0    | lg:border-spacing-0    | xl:border-spacing-0    | 2xl:border-spacing-0    |
| border-spacing-0.5  | sm:border-spacing-0.5  | md:border-spacing-0.5  | lg:border-spacing-0.5  | xl:border-spacing-0.5  | 2xl:border-spacing-0.5  |
| border-spacing-1    | sm:border-spacing-1    | md:border-spacing-1    | lg:border-spacing-1    | xl:border-spacing-1    | 2xl:border-spacing-1    |
| border-spacing-1.5  | sm:border-spacing-1.5  | md:border-spacing-1.5  | lg:border-spacing-1.5  | xl:border-spacing-1.5  | 2xl:border-spacing-1.5  |
| border-spacing-2    | sm:border-spacing-2    | md:border-spacing-2    | lg:border-spacing-2    | xl:border-spacing-2    | 2xl:border-spacing-2    |
| border-spacing-2.5  | sm:border-spacing-2.5  | md:border-spacing-2.5  | lg:border-spacing-2.5  | xl:border-spacing-2.5  | 2xl:border-spacing-2.5  |
| border-spacing-3    | sm:border-spacing-3    | md:border-spacing-3    | lg:border-spacing-3    | xl:border-spacing-3    | 2xl:border-spacing-3    |
| border-spacing-3.5  | sm:border-spacing-3.5  | md:border-spacing-3.5  | lg:border-spacing-3.5  | xl:border-spacing-3.5  | 2xl:border-spacing-3.5  |
| border-spacing-4    | sm:border-spacing-4    | md:border-spacing-4    | lg:border-spacing-4    | xl:border-spacing-4    | 2xl:border-spacing-4    |
| border-spacing-5    | sm:border-spacing-5    | md:border-spacing-5    | lg:border-spacing-5    | xl:border-spacing-5    | 2xl:border-spacing-5    |
| border-spacing-6    | sm:border-spacing-6    | md:border-spacing-6    | lg:border-spacing-6    | xl:border-spacing-6    | 2xl:border-spacing-6    |
| border-spacing-7    | sm:border-spacing-7    | md:border-spacing-7    | lg:border-spacing-7    | xl:border-spacing-7    | 2xl:border-spacing-7    |
| border-spacing-8    | sm:border-spacing-8    | md:border-spacing-8    | lg:border-spacing-8    | xl:border-spacing-8    | 2xl:border-spacing-8    |
| border-spacing-9    | sm:border-spacing-9    | md:border-spacing-9    | lg:border-spacing-9    | xl:border-spacing-9    | 2xl:border-spacing-9    |
| border-spacing-10   | sm:border-spacing-10   | md:border-spacing-10   | lg:border-spacing-10   | xl:border-spacing-10   | 2xl:border-spacing-10   |
| border-spacing-11   | sm:border-spacing-11   | md:border-spacing-11   | lg:border-spacing-11   | xl:border-spacing-11   | 2xl:border-spacing-11   |
| border-spacing-12   | sm:border-spacing-12   | md:border-spacing-12   | lg:border-spacing-12   | xl:border-spacing-12   | 2xl:border-spacing-12   |
| border-spacing-14   | sm:border-spacing-14   | md:border-spacing-14   | lg:border-spacing-14   | xl:border-spacing-14   | 2xl:border-spacing-14   |
| border-spacing-16   | sm:border-spacing-16   | md:border-spacing-16   | lg:border-spacing-16   | xl:border-spacing-16   | 2xl:border-spacing-16   |
| border-spacing-20   | sm:border-spacing-20   | md:border-spacing-20   | lg:border-spacing-20   | xl:border-spacing-20   | 2xl:border-spacing-20   |
| border-spacing-24   | sm:border-spacing-24   | md:border-spacing-24   | lg:border-spacing-24   | xl:border-spacing-24   | 2xl:border-spacing-24   |
| border-spacing-28   | sm:border-spacing-28   | md:border-spacing-28   | lg:border-spacing-28   | xl:border-spacing-28   | 2xl:border-spacing-28   |
| border-spacing-32   | sm:border-spacing-32   | md:border-spacing-32   | lg:border-spacing-32   | xl:border-spacing-32   | 2xl:border-spacing-32   |
| border-spacing-36   | sm:border-spacing-36   | md:border-spacing-36   | lg:border-spacing-36   | xl:border-spacing-36   | 2xl:border-spacing-36   |
| border-spacing-40   | sm:border-spacing-40   | md:border-spacing-40   | lg:border-spacing-40   | xl:border-spacing-40   | 2xl:border-spacing-40   |
| border-spacing-44   | sm:border-spacing-44   | md:border-spacing-44   | lg:border-spacing-44   | xl:border-spacing-44   | 2xl:border-spacing-44   |
| border-spacing-48   | sm:border-spacing-48   | md:border-spacing-48   | lg:border-spacing-48   | xl:border-spacing-48   | 2xl:border-spacing-48   |
| border-spacing-52   | sm:border-spacing-52   | md:border-spacing-52   | lg:border-spacing-52   | xl:border-spacing-52   | 2xl:border-spacing-52   |
| border-spacing-56   | sm:border-spacing-56   | md:border-spacing-56   | lg:border-spacing-56   | xl:border-spacing-56   | 2xl:border-spacing-56   |
| border-spacing-60   | sm:border-spacing-60   | md:border-spacing-60   | lg:border-spacing-60   | xl:border-spacing-60   | 2xl:border-spacing-60   |
| border-spacing-64   | sm:border-spacing-64   | md:border-spacing-64   | lg:border-spacing-64   | xl:border-spacing-64   | 2xl:border-spacing-64   |
| border-spacing-72   | sm:border-spacing-72   | md:border-spacing-72   | lg:border-spacing-72   | xl:border-spacing-72   | 2xl:border-spacing-72   |
| border-spacing-80   | sm:border-spacing-80   | md:border-spacing-80   | lg:border-spacing-80   | xl:border-spacing-80   | 2xl:border-spacing-80   |
| border-spacing-96   | sm:border-spacing-96   | md:border-spacing-96   | lg:border-spacing-96   | xl:border-spacing-96   | 2xl:border-spacing-96   |
*/