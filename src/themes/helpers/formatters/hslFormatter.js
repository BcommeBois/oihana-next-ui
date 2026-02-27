/**
 * Wraps a color value with hsl() function.
 *
 * @param {string} value - HSL color values (e.g., '210 100% 50%').
 * @returns {`hsl(${string})`} Formatted HSL string.
 *
 * @example
 * ```js
 * hslFormatter( '210 100% 50%' ) ;
 * // → 'hsl(210 100% 50%)'
 * ```
 */
const hslFormatter = ( value ) => `hsl(${ value })` ;

export default hslFormatter ;