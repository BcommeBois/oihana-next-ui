import getBorderRadius , { RIGHT_SIDE } from './borderRadius' ;

/**
 * Generates right border radius class definition (top-right + bottom-right).
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
 * getBorderRadiusRight( 'lg' ) ;
 * // → { 'rounded-r-lg': true }
 * ```
 */
const getBorderRadiusRight = ( value ) =>
    getBorderRadius( value , { direction: RIGHT_SIDE } ) ;

export default getBorderRadiusRight ;