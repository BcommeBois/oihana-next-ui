import cn from './cn' ;

/**
 * Returns a merged class name string from an array of next/font objects and optional extra class names.
 * @param {Array} fonts - Array of next/font configuration objects.
 * @param {...string} classNames - Additional class names to merge.
 * @returns {string} Merged class name string.
 */
const getFontClassNames = ( fonts, ...classNames ) =>
    cn( fonts.map( font => font.variable ).join( ' ' ) , ...classNames ) ;

export default getFontClassNames ;