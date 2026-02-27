/**
 * Ring offset width utilities for Tailwind CSS.
 *
 * @module themes/borders/ringOffsetWidth
 * @see https://tailwindcss.com/docs/ring-offset-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getRingOffsetWidth(2), 'md:ring-offset-4')} />
 * ```
 *
 * @safelist
 * ring-offset-0 ring-offset-1 ring-offset-2 ring-offset-4 ring-offset-8
 */

/**
 * Valid ring offset width values.
 * @type {(string | number)[]}
 */
export const validWidths = [ 0 , 1 , 2 , 4 , 8 , '0' , '1' , '2' , '4' , '8' ] ;

const widthMap =
{
    [ 0   ] : 'ring-offset-0' ,
    [ 1   ] : 'ring-offset-1' ,
    [ 2   ] : 'ring-offset-2' ,
    [ 4   ] : 'ring-offset-4' ,
    [ 8   ] : 'ring-offset-8' ,
    [ '0' ] : 'ring-offset-0' ,
    [ '1' ] : 'ring-offset-1' ,
    [ '2' ] : 'ring-offset-2' ,
    [ '4' ] : 'ring-offset-4' ,
    [ '8' ] : 'ring-offset-8' ,
} ;

/**
 * Generates ring offset width class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number} value - Ring offset width.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getRingOffsetWidth( 2 ) ;
 * // → { 'ring-offset-2': true }
 *
 * getRingOffsetWidth( 0 ) ;
 * // → { 'ring-offset-0': true }
 * ```
 */
const getRingOffsetWidth = ( value ) =>
    !!widthMap[value] ? { [widthMap[value]] : true } : {} ;

export default getRingOffsetWidth ;