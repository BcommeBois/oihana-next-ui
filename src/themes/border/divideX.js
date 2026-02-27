import getDivide , { HORIZONTAL } from './divide' ;

/**
 * Generates horizontal divide class definition.
 *
 * For responsive variants, use `className` directly.
 *
 * @param {string | number} value - Divide width.
 * @param {Object} [options]
 * @param {boolean} [options.reversed=false] - Reverse child order (for flex-row-reverse).
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/divide-width
 *
 * @example
 * ```js
 * getDivideX( 2 ) ;
 * // → { 'divide-x-2': true }
 *
 * getDivideX( 4 , { reversed: true } ) ;
 * // → { 'divide-x-4': true , 'divide-x-reverse': true }
 * ```
 */
const getDivideX = ( value , { reversed = false } = {} ) =>
    getDivide( value , { direction: HORIZONTAL , reversed } ) ;

export default getDivideX ;