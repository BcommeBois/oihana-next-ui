/**
 * Identity formatter that returns the value unchanged.
 *
 * @template T
 * @param {T} value - Any value.
 * @returns {T} The same value unchanged.
 *
 * @example
 * ```js
 * defaultFormatter( '#ff0000' ) ;
 * // → '#ff0000'
 *
 * defaultFormatter( 'oklch(86.133% 0.141 139.549)' ) ;
 * // → 'oklch(86.133% 0.141 139.549)'
 * ```
 */
const defaultFormatter = ( value ) => value ;

export default defaultFormatter ;