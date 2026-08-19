/**
 * Grid row start utilities for Tailwind CSS.
 *
 * @module themes/layout/rowStart
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7} RowStartValue
 */

export const AUTO = 'auto' ;

/**
 * Valid row start values.
 *
 * Seven lines for the six rows {@link module:themes/layout/rowSpan} spans, on the same
 * reasoning : the last line is what pins a cell to the bottom edge.
 *
 * @type {(string | number)[]}
 */
export const rowStarts = [ AUTO , 1 , 2 , 3 , 4 , 5 , 6 , 7 ] ;

/**
 * Creates a row-start class definition.
 *
 * @param {RowStartValue} value
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
        return { [ `${ prefix }${ imp }row-start-auto` ]: true } ;
    }

    if ( value >= 1 && value <= 7 )
    {
        return { [ `${ prefix }${ imp }row-start-${ value }` ]: true } ;
    }

    return {} ;
} ;

/**
 * Generates responsive row start class definitions.
 *
 * @param {RowStartValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-row
 *
 * @example
 * ```js
 * getRowStart( 2 ) ;
 * // → { 'row-start-2': true }
 *
 * getRowStart( { xs: 1 , md: 2 } ) ;
 * // → { 'row-start-1': true , 'md:row-start-2': true }
 * ```
 */
const getRowStart = getResponsiveDefinition( create , value => rowStarts.includes( value ) ) ;

export default getRowStart ;

/* Tailwindcss safe list
| ------XS-------| --------SM--------| --------MD--------| --------LG--------| --------XL--------| --------XXL--------|
| row-start-auto | sm:row-start-auto | md:row-start-auto | lg:row-start-auto | xl:row-start-auto | 2xl:row-start-auto |
| row-start-1    | sm:row-start-1    | md:row-start-1    | lg:row-start-1    | xl:row-start-1    | 2xl:row-start-1    |
| row-start-2    | sm:row-start-2    | md:row-start-2    | lg:row-start-2    | xl:row-start-2    | 2xl:row-start-2    |
| row-start-3    | sm:row-start-3    | md:row-start-3    | lg:row-start-3    | xl:row-start-3    | 2xl:row-start-3    |
| row-start-4    | sm:row-start-4    | md:row-start-4    | lg:row-start-4    | xl:row-start-4    | 2xl:row-start-4    |
| row-start-5    | sm:row-start-5    | md:row-start-5    | lg:row-start-5    | xl:row-start-5    | 2xl:row-start-5    |
| row-start-6    | sm:row-start-6    | md:row-start-6    | lg:row-start-6    | xl:row-start-6    | 2xl:row-start-6    |
| row-start-7    | sm:row-start-7    | md:row-start-7    | lg:row-start-7    | xl:row-start-7    | 2xl:row-start-7    |
*/
