/**
 * Outline style utilities for Tailwind CSS.
 *
 * @module themes/borders/outlineStyle
 * @see https://tailwindcss.com/docs/outline-style
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getOutlineStyle('solid'), 'md:outline-dashed')} />
 * ```
 *
 * @safelist
 * outline-none outline-solid outline-dashed outline-dotted outline-double
 */

/**
 * @typedef {'none' | 'solid' | 'dashed' | 'dotted' | 'double'} OutlineStyleValue
 */

export const NONE   = 'none' ;
export const SOLID  = 'solid' ;
export const DASHED = 'dashed' ;
export const DOTTED = 'dotted' ;
export const DOUBLE = 'double' ;

/**
 * Valid outline style values.
 * @type {OutlineStyleValue[]}
 */
export const styles = [ NONE , SOLID , DASHED , DOTTED , DOUBLE ] ;

const styleMap =
{
    [ NONE   ] : 'outline-none' ,
    [ SOLID  ] : 'outline-solid' ,
    [ DASHED ] : 'outline-dashed' ,
    [ DOTTED ] : 'outline-dotted' ,
    [ DOUBLE ] : 'outline-double' ,
} ;

/**
 * Generates outline style class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {OutlineStyleValue} value - Outline style.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getOutlineStyle( 'dashed' ) ;
 * // → { 'outline-dashed': true }
 *
 * getOutlineStyle( 'none' ) ;
 * // → { 'outline-none': true }
 * ```
 */
const getOutlineStyle = ( value ) =>
    !!styleMap[value] ? { [styleMap[value]] : true } : {} ;

export default getOutlineStyle ;