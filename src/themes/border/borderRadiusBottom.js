import getBorderRadius , { BOTTOM_SIDE } from './borderRadius' ;

/**
 * Generates bottom border radius class definition (bottom-left + bottom-right).
 *
 * For responsive variants, use `className` directly.
 *
 * @param {import('./borderRadius').BorderRadiusSize | boolean} value
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/border-radius
 *
 * @example
 * ```js
 * getBorderRadiusBottom( 'lg' ) ;
 * // → { 'rounded-b-lg': true }
 * ```
 */
const getBorderRadiusBottom = ( value ) =>
    getBorderRadius( value , { direction: BOTTOM_SIDE } ) ;

export default getBorderRadiusBottom ;