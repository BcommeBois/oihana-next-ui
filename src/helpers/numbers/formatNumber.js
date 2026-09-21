import getNumberFormat from './getNumberFormat' ;

/**
 * Formats a number for a given locale.
 *
 * The locale is a parameter, never implied : a bare `toLocaleString()` formats
 * with the runtime's locale, which is the server's on the first render and the
 * browser's on the next — a hydration mismatch as soon as the two differ.
 *
 * @module helpers/numbers/formatNumber
 *
 * @param {*}                        value     - The number. Anything that is not a finite number gives `''`.
 * @param {?string}                  locale    - A BCP 47 tag (`fr-FR`) or a language code (`fr`).
 * @param {Intl.NumberFormatOptions} [options] - Passed to `Intl.NumberFormat` as they are.
 * @returns {string} The formatted number, or an empty string when there is nothing to format.
 *
 * @example
 * ```js
 * formatNumber( 1234.5 , 'fr-FR' ) ;                                          // '1 234,5'
 * formatNumber( 1234.5 , 'en-GB' , { style : 'currency' , currency : 'EUR' } ) ; // '€1,234.50'
 * formatNumber( NaN , 'fr-FR' ) ;                                             // ''
 * ```
 */
const formatNumber = ( value , locale , options = {} ) =>
    Number.isFinite( value ) ? getNumberFormat( locale , options ).format( value ) : '' ;

export default formatNumber ;
