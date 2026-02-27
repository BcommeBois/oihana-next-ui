/**
 * Border width utilities for Tailwind CSS.
 *
 * @module themes/borders/borderWidth
 * @see https://tailwindcss.com/docs/border-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getBorderWidth(2), 'md:border-4')} />
 * ```
 *
 * @safelist
 * border border-0 border-1 border-2 border-4 border-8
 * border-t border-t-0 border-t-1 border-t-2 border-t-4 border-t-8
 * border-b border-b-0 border-b-1 border-b-2 border-b-4 border-b-8
 * border-l border-l-0 border-l-1 border-l-2 border-l-4 border-l-8
 * border-r border-r-0 border-r-1 border-r-2 border-r-4 border-r-8
 * border-x border-x-0 border-x-1 border-x-2 border-x-4 border-x-8
 * border-y border-y-0 border-y-1 border-y-2 border-y-4 border-y-8
 * border-s border-s-0 border-s-1 border-s-2 border-s-4 border-s-8
 * border-e border-e-0 border-e-1 border-e-2 border-e-4 border-e-8
 */

/**
 * @typedef {'b' | 'e' | 'l' | 'r' | 's' | 't' | 'x' | 'y'} BorderWidthDirection
 */

export const BOTTOM     = 'b' ;
export const END        = 'e' ;
export const LEFT       = 'l' ;
export const RIGHT      = 'r' ;
export const START      = 's' ;
export const TOP        = 't' ;
export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid border width directions.
 * @type {BorderWidthDirection[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Valid border width values.
 *
 * `true` generates the base `border` class (1px).
 *
 * @type {(string | number | boolean)[]}
 */
export const validWidths = [ 0 , 1 , 2 , 4 , 8 , '0' , '1' , '2' , '4' , '8' , true ] ;

/**
 * Generates border width class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {string | number | boolean} value - Border width. `true` for default 1px.
 * @param {Object} [options]
 * @param {BorderWidthDirection | null} [options.direction=null] - Border direction.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBorderWidth( true ) ;
 * // → { 'border': true }
 *
 * getBorderWidth( 2 ) ;
 * // → { 'border-2': true }
 *
 * getBorderWidth( 2 , { direction: 't' } ) ;
 * // → { 'border-t-2': true }
 *
 * getBorderWidth( true , { direction: 'x' } ) ;
 * // → { 'border-x': true }
 * ```
 */
const getBorderWidth = ( value , { direction = null } = {} ) =>
{
    if ( !validWidths.includes( value ) ) return {} ;

    const dir = directions.includes( direction ) ? `-${ direction }` : '' ;

    return value === true
        ? { [`border${ dir }`] : true }
        : { [`border${ dir }-${ value }`] : true } ;
} ;

export default getBorderWidth ;