/**
 * Border style utilities for Tailwind CSS.
 *
 * @module themes/borders/borderStyle
 * @see https://tailwindcss.com/docs/border-style
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getBorderStyle('solid'), 'md:border-dashed')} />
 * ```
 *
 * @safelist
 * border-solid border-dashed border-dotted border-double border-hidden border-none
 */

/**
 * @typedef {'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none'} BorderStyleValue
 */

export const SOLID  = 'solid' ;
export const DASHED = 'dashed' ;
export const DOTTED = 'dotted' ;
export const DOUBLE = 'double' ;
export const HIDDEN = 'hidden' ;
export const NONE   = 'none' ;

/**
 * Valid border style values.
 * @type {BorderStyleValue[]}
 */
export const styles = [ SOLID , DASHED , DOTTED , DOUBLE , HIDDEN , NONE ] ;

const styleMap =
{
    [ SOLID  ] : 'border-solid' ,
    [ DASHED ] : 'border-dashed' ,
    [ DOTTED ] : 'border-dotted' ,
    [ DOUBLE ] : 'border-double' ,
    [ HIDDEN ] : 'border-hidden' ,
    [ NONE   ] : 'border-none' ,
} ;

/**
 * Generates border style class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {BorderStyleValue} value - Border style.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBorderStyle( 'dashed' ) ;
 * // → { 'border-dashed': true }
 *
 * getBorderStyle( 'solid' ) ;
 * // → { 'border-solid': true }
 * ```
 */
const getBorderStyle = ( value ) =>
    !!styleMap[value] ? { [styleMap[value]] : true } : {} ;

export default getBorderStyle ;