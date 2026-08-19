/**
 * Grid column start utilities for Tailwind CSS.
 *
 * @module themes/layout/colStart
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13} ColStartValue
 */

export const AUTO = 'auto' ;

/**
 * Valid column start values.
 *
 * Goes to 13 where {@link module:themes/layout/gridCols} stops at 12 : a twelve column
 * grid has thirteen grid *lines*, and the thirteenth is the only way to pin a cell to
 * the right edge.
 *
 * @type {(string | number)[]}
 */
export const colStarts = [ AUTO , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 ] ;

/**
 * Creates a col-start class definition.
 *
 * @param {ColStartValue} value
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
        return { [ `${ prefix }${ imp }col-start-auto` ]: true } ;
    }

    if ( value >= 1 && value <= 13 )
    {
        return { [ `${ prefix }${ imp }col-start-${ value }` ]: true } ;
    }

    return {} ;
} ;

/**
 * Generates responsive column start class definitions.
 *
 * @param {ColStartValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-column
 *
 * @example
 * ```js
 * getColStart( 2 ) ;
 * // → { 'col-start-2': true }
 *
 * getColStart( { xs: 1 , md: 3 } ) ;
 * // → { 'col-start-1': true , 'md:col-start-3': true }
 * ```
 */
const getColStart = getResponsiveDefinition( create , value => colStarts.includes( value ) ) ;

export default getColStart ;

/* Tailwindcss safe list
| ------XS-------| --------SM--------| --------MD--------| --------LG--------| --------XL--------| --------XXL--------|
| col-start-auto | sm:col-start-auto | md:col-start-auto | lg:col-start-auto | xl:col-start-auto | 2xl:col-start-auto |
| col-start-1    | sm:col-start-1    | md:col-start-1    | lg:col-start-1    | xl:col-start-1    | 2xl:col-start-1    |
| col-start-2    | sm:col-start-2    | md:col-start-2    | lg:col-start-2    | xl:col-start-2    | 2xl:col-start-2    |
| col-start-3    | sm:col-start-3    | md:col-start-3    | lg:col-start-3    | xl:col-start-3    | 2xl:col-start-3    |
| col-start-4    | sm:col-start-4    | md:col-start-4    | lg:col-start-4    | xl:col-start-4    | 2xl:col-start-4    |
| col-start-5    | sm:col-start-5    | md:col-start-5    | lg:col-start-5    | xl:col-start-5    | 2xl:col-start-5    |
| col-start-6    | sm:col-start-6    | md:col-start-6    | lg:col-start-6    | xl:col-start-6    | 2xl:col-start-6    |
| col-start-7    | sm:col-start-7    | md:col-start-7    | lg:col-start-7    | xl:col-start-7    | 2xl:col-start-7    |
| col-start-8    | sm:col-start-8    | md:col-start-8    | lg:col-start-8    | xl:col-start-8    | 2xl:col-start-8    |
| col-start-9    | sm:col-start-9    | md:col-start-9    | lg:col-start-9    | xl:col-start-9    | 2xl:col-start-9    |
| col-start-10   | sm:col-start-10   | md:col-start-10   | lg:col-start-10   | xl:col-start-10   | 2xl:col-start-10   |
| col-start-11   | sm:col-start-11   | md:col-start-11   | lg:col-start-11   | xl:col-start-11   | 2xl:col-start-11   |
| col-start-12   | sm:col-start-12   | md:col-start-12   | lg:col-start-12   | xl:col-start-12   | 2xl:col-start-12   |
| col-start-13   | sm:col-start-13   | md:col-start-13   | lg:col-start-13   | xl:col-start-13   | 2xl:col-start-13   |
*/
