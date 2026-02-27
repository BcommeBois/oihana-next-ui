import getBorderWidth , { RIGHT } from './borderWidth' ;

/**
 * Generates right border width class definition.
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
 * getBorderWidthRight( 2 ) ;
 * // → { 'border-r-2': true }
 * ```
 */
const getBorderWidthRight = ( value ) =>
    getBorderWidth( value , { direction: RIGHT } ) ;

export default getBorderWidthRight ;