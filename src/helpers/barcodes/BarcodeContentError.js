/**
 * Thrown when a content cannot be drawn in the requested linear barcode format.
 *
 * `reason` says why, so a screen can word it in its own language :
 *
 * - `empty` : nothing to encode ;
 * - `characters` : a character the format does not carry (a letter in an EAN, an `é` in Code 128) ;
 * - `length` : the wrong number of digits for the format ;
 * - `checkDigit` : the last digit is not the check digit of the others ;
 * - `format` : the format itself is unknown.
 *
 * @module helpers/barcodes/BarcodeContentError
 *
 * @example
 * ```js
 * try { encodeBarcode( '4006381333930' , { format : 'ean_13' } ) }
 * catch ( error )
 * {
 *     error.reason ; // → 'checkDigit'
 *     error.format ; // → 'ean_13'
 * }
 * ```
 */
class BarcodeContentError extends RangeError
{
    /**
     * @param {string} message
     * @param {Object} details
     * @param {string} details.format - The requested format.
     * @param {'empty'|'characters'|'length'|'checkDigit'|'format'} details.reason - Why the content was refused.
     * @param {Object} [details.data] - Anything that helps saying more (the expected check digit, the offending character…).
     */
    constructor( message , { data = {} , format , reason } )
    {
        super( message ) ;

        this.name   = 'BarcodeContentError' ;
        this.data   = data ;
        this.format = format ;
        this.reason = reason ;
    }
}

export default BarcodeContentError ;
