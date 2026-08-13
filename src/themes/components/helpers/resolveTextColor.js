import getTextColor from '../../colors/textColor' ;

import resolveColor from './resolveColor' ;

/**
 * Resolves a color into a class definition, or an inline `color` when the value is not a
 * theme token.
 *
 * The `currentColor` half of {@link module:themes/components/helpers/resolveColor} — used
 * by marks that paint themselves through `currentColor` rather than through a background,
 * which is how an SVG gets a single color to drive its stroke, its fill and its gradient
 * stops at once.
 *
 * @param {string} [value] - A DaisyUI color token or any CSS color.
 *
 * @returns {{ definition : Object , style : Object | undefined }} The class definition and the inline style.
 *
 * @example
 * ```js
 * resolveTextColor( 'primary' ) ;
 * // → { definition : { 'text-primary' : true } , style : undefined }
 *
 * resolveTextColor( '#4E79A7' ) ;
 * // → { definition : {} , style : { color : '#4E79A7' } }
 * ```
 */
export const resolveTextColor = value => resolveColor( value , {
    getter    : getTextColor ,
    styleProp : 'color' ,
} ) ;

export default resolveTextColor ;
