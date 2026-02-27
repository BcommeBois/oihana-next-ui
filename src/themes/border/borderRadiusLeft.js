import getBorderRadius , { LEFT_SIDE } from './borderRadius' ;

/**
 * Generates left border radius class definition (top-left + bottom-left).
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
 * getBorderRadiusLeft( 'lg' ) ;
 * // → { 'rounded-l-lg': true }
 * ```
 */
const getBorderRadiusLeft = ( value ) =>
    getBorderRadius( value , { direction: LEFT_SIDE } ) ;

export default getBorderRadiusLeft ;