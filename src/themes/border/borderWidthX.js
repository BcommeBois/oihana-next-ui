import getBorderWidth , { HORIZONTAL } from './borderWidth' ;

/**
 * Generates horizontal border width class definition.
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
 * getBorderWidthX( 2 ) ;
 * // → { 'border-x-2': true }
 * ```
 */
const getBorderWidthX = ( value ) =>
    getBorderWidth( value , { direction: HORIZONTAL } ) ;

export default getBorderWidthX ;