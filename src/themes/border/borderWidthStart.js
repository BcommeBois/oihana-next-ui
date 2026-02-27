import getBorderWidth , { START } from './borderWidth' ;

/**
 * Generates inline-start border width class definition.
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
 * getBorderWidthStart( 2 ) ;
 * // → { 'border-s-2': true }
 * ```
 */
const getBorderWidthStart = ( value ) =>
    getBorderWidth( value , { direction: START } ) ;

export default getBorderWidthStart ;