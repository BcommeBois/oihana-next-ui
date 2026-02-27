import getBorderWidth , { BOTTOM } from './borderWidth' ;

/**
 * Generates bottom border width class definition.
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
 * getBorderWidthBottom( 2 ) ;
 * // → { 'border-b-2': true }
 *
 * getBorderWidthBottom( true ) ;
 * // → { 'border-b': true }
 * ```
 */
const getBorderWidthBottom = ( value ) =>
    getBorderWidth( value , { direction: BOTTOM } ) ;

export default getBorderWidthBottom ;