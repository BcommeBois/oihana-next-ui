import getBorderWidth , { LEFT } from './borderWidth' ;

/**
 * Generates left border width class definition.
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
 * getBorderWidthLeft( 2 ) ;
 * // → { 'border-l-2': true }
 * ```
 */
const getBorderWidthLeft = ( value ) =>
    getBorderWidth( value , { direction: LEFT } ) ;

export default getBorderWidthLeft ;