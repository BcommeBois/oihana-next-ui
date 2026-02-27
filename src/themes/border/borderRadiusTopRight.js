import getBorderRadius , { TOP_RIGHT } from './borderRadius' ;

/**
 * Generates top-right border radius class definition.
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
 * getBorderRadiusTopRight( 'lg' ) ;
 * // → { 'rounded-tr-lg': true }
 * ```
 */
const getBorderRadiusTopRight = ( value ) =>
    getBorderRadius( value , { direction: TOP_RIGHT } ) ;

export default getBorderRadiusTopRight ;