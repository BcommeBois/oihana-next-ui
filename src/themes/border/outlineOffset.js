/**
 * Outline offset utilities for Tailwind CSS.
 *
 * @module themes/borders/outlineOffset
 * @see https://tailwindcss.com/docs/outline-offset
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getOutlineOffset(2), 'md:outline-offset-4')} />
 * ```
 *
 * @safelist
 * outline-offset-0 outline-offset-1 outline-offset-2 outline-offset-4 outline-offset-8
 * -outline-offset-0 -outline-offset-1 -outline-offset-2 -outline-offset-4 -outline-offset-8
 */

import resolveNegative from '../helpers/resolveNegative' ;

/**
 * Valid outline offset values.
 * @type {(string | number)[]}
 */
export const validOffsets = [ 0 , 1 , 2 , 4 , 8 , '0' , '1' , '2' , '4' , '8' ] ;

/**
 * Generates outline offset class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number} value - Offset value. Negative values supported.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getOutlineOffset( 2 ) ;
 * // → { 'outline-offset-2': true }
 *
 * getOutlineOffset( -4 ) ;
 * // → { '-outline-offset-4': true }
 * ```
 */
const getOutlineOffset = ( value ) =>
{
    let negative = false ;

    ( { value , negative } = resolveNegative( value , negative ) ) ;

    if ( !validOffsets.includes( value ) ) return {} ;

    const neg = negative ? '-' : '' ;

    return { [`${ neg }outline-offset-${ value }`] : true } ;
} ;

export default getOutlineOffset ;