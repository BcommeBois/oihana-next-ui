import getBorderRadius , { TOP_SIDE } from './borderRadius' ;

/**
 * Generates top border radius class definition (top-left + top-right).
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
 * getBorderRadiusTop( 'lg' ) ;
 * // → { 'rounded-t-lg': true }
 * ```
 */
const getBorderRadiusTop = ( value ) =>
    getBorderRadius( value , { direction: TOP_SIDE } ) ;

export default getBorderRadiusTop ;