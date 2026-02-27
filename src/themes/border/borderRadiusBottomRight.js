import getBorderRadius , { BOTTOM_RIGHT } from './borderRadius' ;

/**
 * Generates bottom-right border radius class definition.
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
 * getBorderRadiusBottomRight( 'lg' ) ;
 * // → { 'rounded-br-lg': true }
 * ```
 */
const getBorderRadiusBottomRight = ( value ) =>
    getBorderRadius( value , { direction: BOTTOM_RIGHT } ) ;

export default getBorderRadiusBottomRight ;