/**
 * Outline width utilities for Tailwind CSS.
 *
 * @module themes/borders/outlineWidth
 * @see https://tailwindcss.com/docs/outline-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getOutlineWidth(2), 'md:outline-4')} />
 * ```
 *
 * @safelist
 * outline-0 outline-1 outline-2 outline-4 outline-8
 */

/**
 * Valid outline width values.
 * @type {(string | number)[]}
 */
export const validWidths = [ 0 , 1 , 2 , 4 , 8 , '0' , '1' , '2' , '4' , '8' ] ;

const widthMap =
{
    [ 0   ] : 'outline-0' ,
    [ 1   ] : 'outline-1' ,
    [ 2   ] : 'outline-2' ,
    [ 4   ] : 'outline-4' ,
    [ 8   ] : 'outline-8' ,
    [ '0' ] : 'outline-0' ,
    [ '1' ] : 'outline-1' ,
    [ '2' ] : 'outline-2' ,
    [ '4' ] : 'outline-4' ,
    [ '8' ] : 'outline-8' ,
} ;

/**
 * Generates outline width class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number} value - Outline width.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getOutlineWidth( 2 ) ;
 * // → { 'outline-2': true }
 *
 * getOutlineWidth( 0 ) ;
 * // → { 'outline-0': true }
 * ```
 */
const getOutlineWidth = ( value ) =>
    !!widthMap[value] ? { [widthMap[value]] : true } : {} ;

export default getOutlineWidth ;