/**
 * What a QR code holds at most, at its largest version (40, 177 × 177 modules),
 * by error correction level and by encoding mode.
 *
 * - `numeric` : digits only, counted in digits ;
 * - `alphanumeric` : `0-9`, `A-Z` (upper case only), space and `$%*+-./:`, counted in characters ;
 * - `byte` : anything else, counted in **UTF-8 bytes** — an accented letter takes
 *   two, an emoji four.
 *
 * @type {Object.<string,{ numeric : number , alphanumeric : number , byte : number }>}
 */
export const QR_CAPACITY =
{
    low      : { numeric : 7089 , alphanumeric : 4296 , byte : 2953 } ,
    medium   : { numeric : 5596 , alphanumeric : 3391 , byte : 2331 } ,
    quartile : { numeric : 3993 , alphanumeric : 2420 , byte : 1663 } ,
    high     : { numeric : 3057 , alphanumeric : 1852 , byte : 1273 } ,
} ;

const NUMERIC      = /^[0-9]*$/ ;
const ALPHANUMERIC = /^[0-9A-Z $%*+\-./:]*$/ ;

/**
 * The mode a text is encoded in : the most compact one its characters allow.
 *
 * @param {string} value
 * @returns {'numeric'|'alphanumeric'|'byte'}
 */
export const getQRCodeMode = value =>
{
    const text = String( value ) ;

    if ( NUMERIC.test( text ) )
    {
        return 'numeric' ;
    }

    return ALPHANUMERIC.test( text ) ? 'alphanumeric' : 'byte' ;
} ;

/**
 * Measures a text against the capacity of a QR code, without encoding it.
 *
 * What a field needs to show a counter, or to refuse a content before it is
 * drawn : the mode the text falls in, its length in that mode's unit, and the
 * most that mode holds at this level.
 *
 * @module helpers/barcodes/measureQRCode
 *
 * @param {string} value - The text to measure.
 * @param {Object} [options]
 * @param {'low'|'medium'|'quartile'|'high'} [options.ecc='medium'] - The error correction level.
 *
 * @returns {{ capacity : number , ecc : string , fits : boolean , length : number , mode : string }}
 *
 * @example
 * ```js
 * measureQRCode( 'Été' ) ;
 * // → { mode : 'byte' , length : 5 , capacity : 2331 , ecc : 'medium' , fits : true }
 *
 * measureQRCode( '0123456789' , { ecc : 'high' } ) ;
 * // → { mode : 'numeric' , length : 10 , capacity : 3057 , ecc : 'high' , fits : true }
 * ```
 */
const measureQRCode = ( value , { ecc = 'medium' } = {} ) =>
{
    const level = QR_CAPACITY[ ecc ] ? ecc : 'medium' ;
    const text  = String( value ?? '' ) ;
    const mode  = getQRCodeMode( text ) ;

    const length = mode === 'byte' ? new TextEncoder().encode( text ).length : text.length ;

    const capacity = QR_CAPACITY[ level ][ mode ] ;

    return { capacity , ecc : level , fits : length <= capacity , length , mode } ;
} ;

export default measureQRCode ;
