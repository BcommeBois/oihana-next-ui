/**
 * Wraps a color value with oklch() function.
 *
 * @param {string} value - OKLCH color values (e.g., '86.133% 0.141 139.549').
 * @returns {`oklch(${string})`} Formatted OKLCH string.
 *
 * @example
 * ```js
 * oklchFormatter( '86.133% 0.141 139.549' ) ;
 * // → 'oklch(86.133% 0.141 139.549)'
 * ```
 *
 * @deprecated DaisyUI v5 / Tailwind v4 stockent déjà les couleurs au format oklch().
 */
const oklchFormatter = ( value ) => `oklch(${ value })` ;

export default oklchFormatter ;