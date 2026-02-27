import getBorderRadius , { BOTTOM_LEFT } from './borderRadius' ;

/**
 * Generates bottom-left border radius class definition.
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
 * getBorderRadiusBottomLeft( 'lg' ) ;
 * // → { 'rounded-bl-lg': true }
 * ```
 */
const getBorderRadiusBottomLeft = ( value ) =>
    getBorderRadius( value , { direction: BOTTOM_LEFT } ) ;

export default getBorderRadiusBottomLeft ;