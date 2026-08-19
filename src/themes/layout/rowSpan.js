/**
 * Grid row span utilities for Tailwind CSS.
 *
 * @module themes/layout/rowSpan
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6} RowSpanValue
 */

export const AUTO = 'auto' ;
export const FULL = 'full' ;

/**
 * Valid row span values.
 *
 * Stops at 6 where {@link module:themes/layout/colSpan} goes to 12 : every class listed
 * here is emitted for the six breakpoints whether an application uses it or not, and a
 * cell spanning seven rows is not a layout anyone has asked for yet.
 *
 * @type {(string | number)[]}
 */
export const rowSpans = [ AUTO , FULL , 1 , 2 , 3 , 4 , 5 , 6 ] ;

/**
 * Creates a row-span class definition.
 *
 * @param {RowSpanValue} value
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
        return { [ `${ prefix }${ imp }row-auto` ]: true } ;
    }

    if ( value === FULL )
    {
        return { [ `${ prefix }${ imp }row-span-full` ]: true } ;
    }

    if ( value >= 1 && value <= 6 )
    {
        return { [ `${ prefix }${ imp }row-span-${ value }` ]: true } ;
    }

    return {} ;
} ;

/**
 * Generates responsive row span class definitions.
 *
 * @param {RowSpanValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/grid-row
 *
 * @example
 * ```js
 * getRowSpan( 2 ) ;
 * // → { 'row-span-2': true }
 *
 * getRowSpan( 'full' ) ;
 * // → { 'row-span-full': true }
 *
 * getRowSpan( { xs: 1 , md: 2 , lg: 3 } ) ;
 * // → { 'row-span-1': true , 'md:row-span-2': true , 'lg:row-span-3': true }
 * ```
 */
const getRowSpan = getResponsiveDefinition( create , value => rowSpans.includes( value ) ) ;

export default getRowSpan ;

/* Tailwindcss safe list
| ------XS------| -------SM--------| -------MD--------| -------LG--------| -------XL--------| -------XXL--------|
| row-auto      | sm:row-auto      | md:row-auto      | lg:row-auto      | xl:row-auto      | 2xl:row-auto      |
| row-span-1    | sm:row-span-1    | md:row-span-1    | lg:row-span-1    | xl:row-span-1    | 2xl:row-span-1    |
| row-span-2    | sm:row-span-2    | md:row-span-2    | lg:row-span-2    | xl:row-span-2    | 2xl:row-span-2    |
| row-span-3    | sm:row-span-3    | md:row-span-3    | lg:row-span-3    | xl:row-span-3    | 2xl:row-span-3    |
| row-span-4    | sm:row-span-4    | md:row-span-4    | lg:row-span-4    | xl:row-span-4    | 2xl:row-span-4    |
| row-span-5    | sm:row-span-5    | md:row-span-5    | lg:row-span-5    | xl:row-span-5    | 2xl:row-span-5    |
| row-span-6    | sm:row-span-6    | md:row-span-6    | lg:row-span-6    | xl:row-span-6    | 2xl:row-span-6    |
| row-span-full | sm:row-span-full | md:row-span-full | lg:row-span-full | xl:row-span-full | 2xl:row-span-full |
*/
