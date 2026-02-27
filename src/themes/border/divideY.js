import getDivide , { VERTICAL } from './divide' ;

/**
 * Generates vertical divide class definition.
 *
 * For responsive variants, use `className` directly.
 *
 * @param {string | number} value - Divide width.
 * @param {Object} [options]
 * @param {boolean} [options.reversed=false] - Reverse child order (for flex-col-reverse).
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/divide-width
 *
 * @example
 * ```js
 * getDivideY( 2 ) ;
 * // → { 'divide-y-2': true }
 *
 * getDivideY( 4 , { reversed: true } ) ;
 * // → { 'divide-y-4': true , 'divide-y-reverse': true }
 * ```
 */
const getDivideY = ( value , { reversed = false } = {} ) =>
    getDivide( value , { direction: VERTICAL , reversed } ) ;

export default getDivideY ;