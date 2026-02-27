/**
 * Grid template columns utilities for Tailwind CSS.
 *
 * @module themes/layout/gridCols
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'none' | 'subgrid' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12} GridColsValue
 */

export const NONE    = 'none' ;
export const SUBGRID = 'subgrid' ;

/**
 * Valid grid columns values.
 * @type {(string | number)[]}
 */
export const gridCols = [ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , NONE , SUBGRID ] ;

/**
 * Creates a grid-cols class definition.
 *
 * @param {GridColsValue} value
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
        return { [ `${ prefix }${ imp }grid-cols-${ value }` ]: true } ;
    }

    if ( value === NONE || value === 0 )
    {
        return { [ `${ prefix }${ imp }grid-cols-none` ]: true } ;
    }

    if ( value === SUBGRID )
    {
        return { [ `${ prefix }${ imp }grid-cols-subgrid` ]: true } ;
    }
} ;

/**
 * Generates responsive grid template columns class definitions.
 *
 * @param {GridColsValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-template-columns
 *
 * @example
 * ```js
 * getGridCols( 3 ) ;
 * // → { 'grid-cols-3': true }
 *
 * getGridCols( 'none' ) ;
 * // → { 'grid-cols-none': true }
 *
 * getGridCols( { xs: 1 , md: 2 , lg: 4 } ) ;
 * // → { 'grid-cols-1': true , 'md:grid-cols-2': true , 'lg:grid-cols-4': true }
 * ```
 */
const getGridCols = getResponsiveDefinition( create , value => gridCols.includes( value ) ) ;

export default getGridCols ;

/* Tailwindcss safe list
| --------XS----------- | --------SM------------- | --------MD------------- | --------LG------------- | --------XL------------- | --------XXL------------- |
| grid-cols-1           | sm:grid-cols-1          | md:grid-cols-1          | lg:grid-cols-1          | xl:grid-cols-1          | 2xl:grid-cols-1          |
| grid-cols-2           | sm:grid-cols-2          | md:grid-cols-2          | lg:grid-cols-2          | xl:grid-cols-2          | 2xl:grid-cols-2          |
| grid-cols-3           | sm:grid-cols-3          | md:grid-cols-3          | lg:grid-cols-3          | xl:grid-cols-3          | 2xl:grid-cols-3          |
| grid-cols-4           | sm:grid-cols-4          | md:grid-cols-4          | lg:grid-cols-4          | xl:grid-cols-4          | 2xl:grid-cols-4          |
| grid-cols-5           | sm:grid-cols-5          | md:grid-cols-5          | lg:grid-cols-5          | xl:grid-cols-5          | 2xl:grid-cols-5          |
| grid-cols-6           | sm:grid-cols-6          | md:grid-cols-6          | lg:grid-cols-6          | xl:grid-cols-6          | 2xl:grid-cols-6          |
| grid-cols-7           | sm:grid-cols-7          | md:grid-cols-7          | lg:grid-cols-7          | xl:grid-cols-7          | 2xl:grid-cols-7          |
| grid-cols-8           | sm:grid-cols-8          | md:grid-cols-8          | lg:grid-cols-8          | xl:grid-cols-8          | 2xl:grid-cols-8          |
| grid-cols-9           | sm:grid-cols-9          | md:grid-cols-9          | lg:grid-cols-9          | xl:grid-cols-9          | 2xl:grid-cols-9          |
| grid-cols-10          | sm:grid-cols-10         | md:grid-cols-10         | lg:grid-cols-10         | xl:grid-cols-10         | 2xl:grid-cols-10         |
| grid-cols-11          | sm:grid-cols-11         | md:grid-cols-11         | lg:grid-cols-11         | xl:grid-cols-11         | 2xl:grid-cols-11         |
| grid-cols-12          | sm:grid-cols-12         | md:grid-cols-12         | lg:grid-cols-12         | xl:grid-cols-12         | 2xl:grid-cols-12         |
| grid-cols-none        | sm:grid-cols-none       | md:grid-cols-none       | lg:grid-cols-none       | xl:grid-cols-none       | 2xl:grid-cols-none       |
| grid-cols-subgrid     | sm:grid-cols-subgrid    | md:grid-cols-subgrid    | lg:grid-cols-subgrid    | xl:grid-cols-subgrid    | 2xl:grid-cols-subgrid    |
*/