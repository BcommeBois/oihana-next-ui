import getBorderWidth , { VERTICAL } from './borderWidth' ;

/**
 * Generates vertical border width class definition.
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
 * getBorderWidthY( 2 ) ;
 * // → { 'border-y-2': true }
 * ```
 */
const getBorderWidthY = ( value ) =>
    getBorderWidth( value , { direction: VERTICAL } ) ;

export default getBorderWidthY ;