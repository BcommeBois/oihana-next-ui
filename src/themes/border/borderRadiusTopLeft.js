import getBorderRadius , { TOP_LEFT } from './borderRadius' ;

/**
 * Generates top-left border radius class definition.
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
 * getBorderRadiusTopLeft( 'lg' ) ;
 * // → { 'rounded-tl-lg': true }
 * ```
 */
const getBorderRadiusTopLeft = ( value ) =>
    getBorderRadius( value , { direction: TOP_LEFT } ) ;

export default getBorderRadiusTopLeft ;