/**
 * Grid column span utilities for Tailwind CSS.
 *
 * @module themes/layout/colSpan
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12} ColSpanValue
 */

export const AUTO = 'auto' ;
export const FULL = 'full' ;

/**
 * Valid column span values.
 * @type {(string | number)[]}
 */
export const colSpans = [ AUTO , FULL , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ] ;

/**
 * Creates a col-span class definition.
 *
 * @param {ColSpanValue} value
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const imp = important ? '!' : '' ;

    if ( value === AUTO )
    {
        return { [ `${ prefix }${ imp }col-auto` ]: true } ;
    }

    if ( value === FULL )
    {
        return { [ `${ prefix }${ imp }col-span-full` ]: true } ;
    }

    if ( value >= 1 && value <= 12 )
    {
        return { [ `${ prefix }${ imp }col-span-${ value }` ]: true } ;
    }

    return {} ;
} ;

/**
 * Generates responsive column span class definitions.
 *
 * @param {ColSpanValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-column
 *
 * @example
 * ```js
 * getColSpan( 6 ) ;
 * // → { 'col-span-6': true }
 *
 * getColSpan( 'full' ) ;
 * // → { 'col-span-full': true }
 *
 * getColSpan( { xs: 12 , md: 6 , lg: 4 } ) ;
 * // → { 'col-span-12': true , 'md:col-span-6': true , 'lg:col-span-4': true }
 * ```
 */
const getColSpan = getResponsiveDefinition( create , value => colSpans.includes( value ) ) ;

export default getColSpan ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| col-auto              | sm:col-auto             | md:col-auto             | lg:col-auto             | xl:col-auto             | 2xl:col-auto             |
| col-span-1            | sm:col-span-1           | md:col-span-1           | lg:col-span-1           | xl:col-span-1           | 2xl:col-span-1           |
| col-span-2            | sm:col-span-2           | md:col-span-2           | lg:col-span-2           | xl:col-span-2           | 2xl:col-span-2           |
| col-span-3            | sm:col-span-3           | md:col-span-3           | lg:col-span-3           | xl:col-span-3           | 2xl:col-span-3           |
| col-span-4            | sm:col-span-4           | md:col-span-4           | lg:col-span-4           | xl:col-span-4           | 2xl:col-span-4           |
| col-span-5            | sm:col-span-5           | md:col-span-5           | lg:col-span-5           | xl:col-span-5           | 2xl:col-span-5           |
| col-span-6            | sm:col-span-6           | md:col-span-6           | lg:col-span-6           | xl:col-span-6           | 2xl:col-span-6           |
| col-span-7            | sm:col-span-7           | md:col-span-7           | lg:col-span-7           | xl:col-span-7           | 2xl:col-span-7           |
| col-span-8            | sm:col-span-8           | md:col-span-8           | lg:col-span-8           | xl:col-span-8           | 2xl:col-span-8           |
| col-span-9            | sm:col-span-9           | md:col-span-9           | lg:col-span-9           | xl:col-span-9           | 2xl:col-span-9           |
| col-span-10           | sm:col-span-10          | md:col-span-10          | lg:col-span-10          | xl:col-span-10          | 2xl:col-span-10          |
| col-span-11           | sm:col-span-11          | md:col-span-11          | lg:col-span-11          | xl:col-span-11          | 2xl:col-span-11          |
| col-span-12           | sm:col-span-12          | md:col-span-12          | lg:col-span-12          | xl:col-span-12          | 2xl:col-span-12          |
| col-span-full         | sm:col-span-full        | md:col-span-full        | lg:col-span-full        | xl:col-span-full        | 2xl:col-span-full        |
*/