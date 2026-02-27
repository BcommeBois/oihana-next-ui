/**
 * Grid template rows utilities for Tailwind CSS.
 *
 * @module themes/layout/gridRows
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'none' | 'subgrid' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12} GridRowsValue
 */

export const NONE    = 'none' ;
export const SUBGRID = 'subgrid' ;

/**
 * Valid grid rows values.
 * @type {(string | number)[]}
 */
export const gridRows = [ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , NONE , SUBGRID ] ;

/**
 * Creates a grid-rows class definition.
 *
 * @param {GridRowsValue} value
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const imp = important ? '!' : '' ;

    if ( value > 0 && value <= 12 )
    {
        return { [ `${ prefix }${ imp }grid-rows-${ value }` ]: true } ;
    }

    if ( value === NONE || value === 0 )
    {
        return { [ `${ prefix }${ imp }grid-rows-none` ]: true } ;
    }

    if ( value === SUBGRID )
    {
        return { [ `${ prefix }${ imp }grid-rows-subgrid` ]: true } ;
    }
} ;

/**
 * Generates responsive grid template rows class definitions.
 *
 * @param {GridRowsValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-template-rows
 *
 * @example
 * ```js
 * getGridRows( 6 ) ;
 * // → { 'grid-rows-6': true }
 *
 * getGridRows( { xs: 2 , lg: 4 } ) ;
 * // → { 'grid-rows-2': true , 'lg:grid-rows-4': true }
 * ```
 */
const getGridRows = getResponsiveDefinition( create , value => gridRows.includes( value ) ) ;

export default getGridRows ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| grid-rows-1           | sm:grid-rows-1          | md:grid-rows-1          | lg:grid-rows-1          | xl:grid-rows-1          | 2xl:grid-rows-1          |
| grid-rows-2           | sm:grid-rows-2          | md:grid-rows-2          | lg:grid-rows-2          | xl:grid-rows-2          | 2xl:grid-rows-2          |
| grid-rows-3           | sm:grid-rows-3          | md:grid-rows-3          | lg:grid-rows-3          | xl:grid-rows-3          | 2xl:grid-rows-3          |
| grid-rows-4           | sm:grid-rows-4          | md:grid-rows-4          | lg:grid-rows-4          | xl:grid-rows-4          | 2xl:grid-rows-4          |
| grid-rows-5           | sm:grid-rows-5          | md:grid-rows-5          | lg:grid-rows-5          | xl:grid-rows-5          | 2xl:grid-rows-5          |
| grid-rows-6           | sm:grid-rows-6          | md:grid-rows-6          | lg:grid-rows-6          | xl:grid-rows-6          | 2xl:grid-rows-6          |
| grid-rows-7           | sm:grid-rows-7          | md:grid-rows-7          | lg:grid-rows-7          | xl:grid-rows-7          | 2xl:grid-rows-7          |
| grid-rows-8           | sm:grid-rows-8          | md:grid-rows-8          | lg:grid-rows-8          | xl:grid-rows-8          | 2xl:grid-rows-8          |
| grid-rows-9           | sm:grid-rows-9          | md:grid-rows-9          | lg:grid-rows-9          | xl:grid-rows-9          | 2xl:grid-rows-9          |
| grid-rows-10          | sm:grid-rows-10         | md:grid-rows-10         | lg:grid-rows-10         | xl:grid-rows-10         | 2xl:grid-rows-10         |
| grid-rows-11          | sm:grid-rows-11         | md:grid-rows-11         | lg:grid-rows-11         | xl:grid-rows-11         | 2xl:grid-rows-11         |
| grid-rows-12          | sm:grid-rows-12         | md:grid-rows-12         | lg:grid-rows-12         | xl:grid-rows-12         | 2xl:grid-rows-12         |
| grid-rows-none        | sm:grid-rows-none       | md:grid-rows-none       | lg:grid-rows-none       | xl:grid-rows-none       | 2xl:grid-rows-none       |
| grid-rows-subgrid     | sm:grid-rows-subgrid    | md:grid-rows-subgrid    | lg:grid-rows-subgrid    | xl:grid-rows-subgrid    | 2xl:grid-rows-subgrid    |
*/