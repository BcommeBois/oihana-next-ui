import getBorderWidth , { END } from './borderWidth' ;

/**
 * Generates inline-end border width class definition.
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
 * getBorderWidthEnd( 2 ) ;
 * // → { 'border-e-2': true }
 * ```
 */
const getBorderWidthEnd = ( value ) =>
    getBorderWidth( value , { direction: END } ) ;

export default getBorderWidthEnd ;