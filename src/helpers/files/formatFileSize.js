import getNumberFormat from '../numbers/getNumberFormat' ;

const UNITS = [ 'byte' , 'kilobyte' , 'megabyte' , 'gigabyte' ] ;

/**
 * A weight in bytes, written the way the locale writes it : `7,2 Mo` in
 * French, `7.2 MB` in English.
 *
 * Steps of 1024 — the way a system counts a file. Bytes and kilobytes whole,
 * a decimal from megabytes on.
 *
 * @module helpers/files/formatFileSize
 *
 * @param {number} bytes
 * @param {string} [locale] - A BCP 47 tag.
 * @returns {string}
 *
 * @example
 * ```js
 * formatFileSize( 7549747 , 'en-US' ) ; // '7.2 MB'
 * formatFileSize( 2048 , 'fr-FR' ) ;    // '2 ko'
 * ```
 */
const formatFileSize = ( bytes , locale ) =>
{
    let value = Math.max( 0 , Number( bytes ) || 0 ) ;
    let unit  = 0 ;

    while ( value >= 1024 && unit < UNITS.length - 1 )
    {
        value /= 1024 ;
        unit++ ;
    }

    return getNumberFormat( locale , { maximumFractionDigits : unit >= 2 ? 1 : 0 , style : 'unit' , unit : UNITS[ unit ] , unitDisplay : 'short' } ).format( value ) ;
} ;

export default formatFileSize ;
