import getBackgroundColor from '../../colors/backgroundColor' ;

import resolveColor from './resolveColor' ;

/**
 * Resolves a bar color into a class definition, or an inline `backgroundColor` when the
 * value is not a theme token.
 *
 * The background half of {@link module:themes/components/helpers/resolveColor} — used by
 * every filled mark of the `metrics` group : the segments of a category bar, the bars of
 * a bar list, the blocks of a tracker.
 *
 * @param {string} [value] - A DaisyUI color token, a `bg-` utility class, or any CSS color.
 *
 * @returns {{ definition : Object , style : Object | undefined }} The class definition and the inline style.
 *
 * @example
 * ```js
 * resolveBarColor( 'primary' ) ;
 * // → { definition : { 'bg-primary' : true } , style : undefined }
 *
 * resolveBarColor( 'bg-base-content/20' ) ;
 * // → { definition : { 'bg-base-content/20' : true } , style : undefined }
 *
 * resolveBarColor( '#4E79A7' ) ;
 * // → { definition : {} , style : { backgroundColor : '#4E79A7' } }
 * ```
 */
export const resolveBarColor = value => resolveColor( value , {
    getter    : getBackgroundColor ,
    prefix    : 'bg-' ,
    styleProp : 'backgroundColor' ,
} ) ;

export default resolveBarColor ;
