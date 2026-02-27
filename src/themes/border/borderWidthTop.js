import getBorderWidth , { TOP } from './borderWidth' ;

/**
 * Generates top border width class definition.
 *
 * For responsive variants, use `className` directly.
 *
 * @param {string | number | boolean} value - Border width.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/border-width
 *
 * @example
 * ```js
 * getBorderWidthTop( 2 ) ;
 * // → { 'border-t-2': true }
 * ```
 */
const getBorderWidthTop = ( value ) =>
    getBorderWidth( value , { direction: TOP } ) ;

export default getBorderWidthTop ;