/**
 * Divide utilities for Tailwind CSS.
 *
 * @module themes/borders/divide
 * @see https://tailwindcss.com/docs/divide-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getDivide(2, { direction: 'x' }), 'md:divide-x-4')} />
 * ```
 *
 * @safelist
 * divide-x-0 divide-x-1 divide-x-2 divide-x-3 divide-x-4 divide-x-8 divide-x-px
 * divide-y-0 divide-y-1 divide-y-2 divide-y-3 divide-y-4 divide-y-8 divide-y-px
 * divide-x-reverse divide-y-reverse
 */

/**
 * @typedef {'x' | 'y'} DivideDirection
 */

export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid divide directions.
 * @type {DivideDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Valid divide width values.
 * @type {(string | number)[]}
 */
export const validWidths =
    [
        0 , 1 , 2 , 3 , 4 , 8 ,
        '0' , '1' , '2' , '3' , '4' , '8' , 'px' ,
    ] ;

/**
 * Generates divide class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number} value - Divide width value.
 * @param {Object} [options]
 * @param {DivideDirection | null} [options.direction=null] - Axis direction.
 * @param {boolean} [options.reversed=false] - Reverse child order.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getDivide( 2 , { direction: 'x' } ) ;
 * // → { 'divide-x-2': true }
 *
 * getDivide( 4 , { direction: 'y' , reversed: true } ) ;
 * // → { 'divide-y-4': true , 'divide-y-reverse': true }
 *
 * getDivide( 2 ) ;
 * // → { 'divide-2': true }
 * ```
 */
const getDivide = ( value , { direction = null , reversed = false } = {} ) =>
{
    if ( !validWidths.includes( value ) ) return {} ;

    const axis    = directions.includes( direction ) ? `-${ direction }` : '' ;
    const hasAxis = direction === HORIZONTAL || direction === VERTICAL ;

    return {
        [`divide${ axis }-${ value }`]   : true ,
        ...reversed && hasAxis && { [`divide${ axis }-reverse`] : true } ,
    } ;
} ;

export default getDivide ;