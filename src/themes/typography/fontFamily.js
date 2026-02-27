/**
 * Font family utilities for Tailwind CSS.
 *
 * @module themes/typography/fontFamily
 * @see https://tailwindcss.com/docs/font-family
 */

/**
 * @typedef {'sans' | 'serif' | 'mono'} FontFamilyValue
 */

export const SANS  = 'sans' ;
export const SERIF = 'serif' ;
export const MONO  = 'mono' ;

const fontFamilyMap =
{
    [ MONO  ] : 'font-mono'  ,
    [ SANS  ] : 'font-sans'  ,
    [ SERIF ] : 'font-serif' ,
};

/**
 * Valid font family values.
 * @type {FontFamilyValue[]}
 */
export const fontFamilies = [ SANS , SERIF , MONO ] ;

/**
 * Generates responsive font family class definitions.
 *
 * @param {FontFamilyValue} value - Font family value.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFontFamily( 'mono' ) ;
 * // → { 'font-mono': true }
 *
 * getFontFamily( 'serif' ) ;
 * // → { 'font-serif': true }
 * ```
 */
const getFontFamily = value =>
    !!fontFamilyMap[value] ? { [ fontFamilyMap[value] ] : true } : {};

export default getFontFamily ;