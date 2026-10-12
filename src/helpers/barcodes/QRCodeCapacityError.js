const UNITS = { alphanumeric : 'characters' , byte : 'bytes' , numeric : 'digits' } ;

/**
 * Thrown when a text does not fit in a QR code.
 *
 * Carries what the encoder's own message (« Capacity overflow ») leaves out :
 * the mode the text was measured in, its length in that mode's unit, and the
 * most that mode holds at the requested level. The encoder's error stays
 * reachable as `cause`.
 *
 * @module helpers/barcodes/QRCodeCapacityError
 *
 * @example
 * ```js
 * try { encodeQRCode( text ) }
 * catch ( error )
 * {
 *     if ( error instanceof QRCodeCapacityError )
 *     {
 *         console.log( error.length , error.capacity , error.mode , error.ecc ) ;
 *     }
 * }
 * ```
 */
class QRCodeCapacityError extends RangeError
{
    /**
     * @param {{ capacity : number , ecc : string , length : number , mode : string }} measure
     * @param {Error} [cause] - The encoder's own error.
     */
    constructor( { capacity , ecc , length , mode } , cause )
    {
        super( `Too long for a QR code : ${ length } ${ UNITS[ mode ] ?? 'units' }, ${ capacity } at most with ecc "${ ecc }".` , { cause } ) ;

        this.name     = 'QRCodeCapacityError' ;
        this.capacity = capacity ;
        this.ecc      = ecc ;
        this.length   = length ;
        this.mode     = mode ;
    }
}

export default QRCodeCapacityError ;
