/**
 * Background gradient direction utilities for Tailwind CSS.
 *
 * @module themes/backgrounds/backgroundGradientDirection
 * @see https://tailwindcss.com/docs/background-image#linear-gradients
 *
 * **Responsive usage:**
 * Use `className` directly for responsive or pseudo-class variants:
 *
 * ```jsx
 * <div className={cn(getBackgroundGradientDirection('r'), 'hover:bg-linear-to-b')} />
 * ```
 *
 * @safelist
 * bg-none bg-linear-to-b bg-linear-to-bl bg-linear-to-br
 * bg-linear-to-l bg-linear-to-r bg-linear-to-t bg-linear-to-tl bg-linear-to-tr
 */

export const NONE         = 'none' ;
export const BOTTOM       = 'b' ;
export const BOTTOM_LEFT  = 'bl' ;
export const BOTTOM_RIGHT = 'br' ;
export const LEFT         = 'l' ;
export const RIGHT        = 'r' ;
export const TOP          = 't' ;
export const TOP_LEFT     = 'tl' ;
export const TOP_RIGHT    = 'tr' ;

/**
 * @typedef {'none' | 'b' | 'bl' | 'br' | 'l' | 'r' | 't' | 'tl' | 'tr'} BackgroundGradientDirection
 */

/**
 * Valid gradient directions.
 * @type {BackgroundGradientDirection[]}
 */
export const directions =
[
    NONE ,
    BOTTOM ,
    BOTTOM_LEFT ,
    BOTTOM_RIGHT ,
    LEFT ,
    RIGHT ,
    TOP ,
    TOP_LEFT ,
    TOP_RIGHT ,
] ;

const directionMap =
{
    [ NONE         ] : 'bg-none' ,
    [ BOTTOM       ] : 'bg-linear-to-b' ,
    [ BOTTOM_LEFT  ] : 'bg-linear-to-bl' ,
    [ BOTTOM_RIGHT ] : 'bg-linear-to-br' ,
    [ LEFT         ] : 'bg-linear-to-l' ,
    [ RIGHT        ] : 'bg-linear-to-r' ,
    [ TOP          ] : 'bg-linear-to-t' ,
    [ TOP_LEFT     ] : 'bg-linear-to-tl' ,
    [ TOP_RIGHT    ] : 'bg-linear-to-tr' ,
} ;

/**
 * Generates background gradient direction class definition.
 *
 * For responsive or pseudo-class variants, use `className` directly (see module doc).
 *
 * @param {BackgroundGradientDirection} value - Gradient direction.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBackgroundGradientDirection( 'r' ) ;
 * // → { 'bg-linear-to-r': true }
 *
 * getBackgroundGradientDirection( 'none' ) ;
 * // → { 'bg-none': true }
 * ```
 */
const getBackgroundGradientDirection = ( value ) =>
    !!directionMap[value] ? { [directionMap[value]] : true } : {} ;

export default getBackgroundGradientDirection ;