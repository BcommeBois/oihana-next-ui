/**
 * Ring width utilities for Tailwind CSS.
 *
 * @module themes/borders/ringWidth
 * @see https://tailwindcss.com/docs/ring-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getRingWidth(2), 'md:ring-4')} />
 * ```
 *
 * @safelist
 * ring ring-0 ring-1 ring-2 ring-4 ring-8 ring-inset
 */

/**
 * Valid ring width values.
 *
 * `true` generates the base `ring` class (3px).
 *
 * @type {(string | number | boolean)[]}
 */
export const validWidths = [ 0 , 1 , 2 , 4 , 8 , '0' , '1' , '2' , '4' , '8' , true ] ;

export const INSET = 'inset' ;

const widthMap =
{
    [ true  ] : 'ring' ,
    [ 0     ] : 'ring-0' ,
    [ 1     ] : 'ring-1' ,
    [ 2     ] : 'ring-2' ,
    [ 4     ] : 'ring-4' ,
    [ 8     ] : 'ring-8' ,
    [ '0'   ] : 'ring-0' ,
    [ '1'   ] : 'ring-1' ,
    [ '2'   ] : 'ring-2' ,
    [ '4'   ] : 'ring-4' ,
    [ '8'   ] : 'ring-8' ,
} ;

/**
 * Generates ring width class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number | boolean} value - Ring width. `true` for default (3px).
 * @param {Object} [options]
 * @param {boolean} [options.inset=false] - Use inset ring.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getRingWidth( true ) ;
 * // → { 'ring': true }
 *
 * getRingWidth( 2 ) ;
 * // → { 'ring-2': true }
 *
 * getRingWidth( 2 , { inset: true } ) ;
 * // → { 'ring-2': true , 'ring-inset': true }
 * ```
 */
const getRingWidth = ( value , { inset = false } = {} ) =>
{
    if ( !widthMap[value] ) return {} ;

    return {
        [widthMap[value]] : true ,
        ...inset && { 'ring-inset' : true } ,
    } ;
} ;

export default getRingWidth ;