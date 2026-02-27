/**
 * Divide style utilities for Tailwind CSS.
 *
 * @module themes/borders/divideStyle
 * @see https://tailwindcss.com/docs/divide-style
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={cn(getDivideStyle('solid'), 'md:divide-dashed')} />
 * ```
 *
 * @safelist
 * divide-solid divide-dashed divide-dotted divide-double divide-none
 */

/**
 * @typedef {'solid' | 'dashed' | 'dotted' | 'double' | 'none'} DivideStyleValue
 */

export const SOLID  = 'solid' ;
export const DASHED = 'dashed' ;
export const DOTTED = 'dotted' ;
export const DOUBLE = 'double' ;
export const NONE   = 'none' ;

/**
 * Valid divide style values.
 * @type {DivideStyleValue[]}
 */
export const styles = [ SOLID , DASHED , DOTTED , DOUBLE , NONE ] ;

const styleMap =
    {
        [ SOLID  ] : 'divide-solid' ,
        [ DASHED ] : 'divide-dashed' ,
        [ DOTTED ] : 'divide-dotted' ,
        [ DOUBLE ] : 'divide-double' ,
        [ NONE   ] : 'divide-none' ,
    } ;

/**
 * Generates divide style class definition.
 *
 * For responsive variants, use `className` directly (see module doc).
 *
 * @param {DivideStyleValue} value - Divide style.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getDivideStyle( 'dashed' ) ;
 * // → { 'divide-dashed': true }
 *
 * getDivideStyle( 'solid' ) ;
 * // → { 'divide-solid': true }
 * ```
 */
const getDivideStyle = ( value ) =>
    !!styleMap[value] ? { [styleMap[value]] : true } : {} ;

export default getDivideStyle ;