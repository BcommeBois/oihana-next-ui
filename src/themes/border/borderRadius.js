/**
 * Border radius utilities for Tailwind CSS.
 *
 * @module themes/borders/borderRadius
 * @see https://tailwindcss.com/docs/border-radius
 *
 * **Responsive usage:**
 * This helper does not support responsive prefixes (`md:`, `lg:`, etc.).
 * Use `className` to add responsive border radius directly:
 *
 * ```jsx
 * <div className={cn(getBorderRadius('lg'), 'md:rounded-xl lg:rounded-2xl')} />
 * ```
 *
 * This ensures Tailwind v4 can scan the full class strings at build time.
 *
 * @safelist
 * rounded rounded-none rounded-xs rounded-sm rounded-md rounded-lg
 * rounded-xl rounded-2xl rounded-3xl rounded-4xl rounded-full
 * rounded-t-none rounded-t-sm rounded-t-md rounded-t-lg rounded-t-xl rounded-t-full
 * rounded-b-none rounded-b-sm rounded-b-md rounded-b-lg rounded-b-xl rounded-b-full
 * rounded-l-none rounded-l-sm rounded-l-md rounded-l-lg rounded-l-xl rounded-l-full
 * rounded-r-none rounded-r-sm rounded-r-md rounded-r-lg rounded-r-xl rounded-r-full
 * rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-full
 * rounded-ss-full rounded-se-full rounded-es-full rounded-ee-full
 */

/**
 * @typedef {'t' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'br' | 'bl' | 'ss' | 'se' | 'es' | 'ee'} BorderRadiusDirection
 */

// Side directions
export const TOP_SIDE    = 't' ;
export const RIGHT_SIDE  = 'r' ;
export const BOTTOM_SIDE = 'b' ;
export const LEFT_SIDE   = 'l' ;

// Corner directions
export const TOP_LEFT     = 'tl' ;
export const TOP_RIGHT    = 'tr' ;
export const BOTTOM_RIGHT = 'br' ;
export const BOTTOM_LEFT  = 'bl' ;

// Logical corners
export const START_START = 'ss' ;
export const START_END   = 'se' ;
export const END_START   = 'es' ;
export const END_END     = 'ee' ;

/**
 * Valid border radius directions.
 * @type {BorderRadiusDirection[]}
 */
export const directions =
[
    TOP_SIDE , RIGHT_SIDE , BOTTOM_SIDE , LEFT_SIDE ,
    TOP_LEFT , TOP_RIGHT , BOTTOM_RIGHT , BOTTOM_LEFT ,
    START_START , START_END , END_START , END_END ,
] ;

/**
 * @typedef {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'} BorderRadiusSize
 */

export const NONE  = 'none' ;
export const XS    = 'xs' ;
export const SM    = 'sm' ;
export const MD    = 'md' ;
export const LG    = 'lg' ;
export const XL    = 'xl' ;
export const XXL   = '2xl' ;
export const XXXL  = '3xl' ;
export const XXXXL = '4xl' ;
export const FULL  = 'full' ;

/**
 * Valid border radius values.
 *
 * `true` generates the base `rounded` class (default radius).
 *
 * @type {(string | boolean)[]}
 */
export const validRadii = [ NONE , XS , SM , MD , LG , XL , XXL , XXXL , XXXXL , FULL , true ] ;

/**
 * Generates a border radius class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {BorderRadiusSize | boolean} value - Radius value. `true` for default.
 * @param {Object} [options]
 * @param {BorderRadiusDirection | null} [options.direction=null] - Corner or side direction.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBorderRadius( true ) ;
 * // → { 'rounded': true }
 *
 * getBorderRadius( 'lg' ) ;
 * // → { 'rounded-lg': true }
 *
 * getBorderRadius( 'xl' , { direction: 't' } ) ;
 * // → { 'rounded-t-xl': true }
 *
 * getBorderRadius( 'full' , { direction: 'tl' } ) ;
 * // → { 'rounded-tl-full': true }
 * ```
 */
const getBorderRadius = ( value , { direction = null } = {} ) =>
{
    if ( !validRadii.includes( value ) ) return {} ;

    const dir = directions.includes( direction ) ? `-${ direction }` : '' ;

    return value === true
        ? { 'rounded' : true }
        : { [`rounded${ dir }-${ value }`] : true } ;
} ;

export default getBorderRadius ;