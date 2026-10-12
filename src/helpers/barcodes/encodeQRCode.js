import { encodeQR } from 'qr' ;

import QRCodeCapacityError from './QRCodeCapacityError' ;
import measureQRCode       from './measureQRCode' ;

/**
 * The error correction levels, from the lightest to the densest.
 *
 * Each one restores a share of damaged modules : `low` 7 %, `medium` 15 %,
 * `quartile` 25 %, `high` 30 %. The higher the level, the more modules the same
 * content needs.
 *
 * @type {string[]}
 */
export const ECC_LEVELS = [ 'low' , 'medium' , 'quartile' , 'high' ] ;

/**
 * The quiet zone the standard asks for, in modules.
 *
 * @type {number}
 */
export const QUIET_ZONE = 4 ;

/**
 * Encodes a text into the module grid of a QR code.
 *
 * The only file of the library that imports the encoder : everything else —
 * the component, the SVG and PNG exports — reads the grid this returns.
 *
 * The grid includes the quiet zone : `true` is a dark module, `false` a light
 * one, rows first. Text is encoded as UTF-8, so accents and emoji are kept ;
 * the smallest version and the best mask are picked by the encoder.
 *
 * ⚠️ **The quiet zone cannot be zero** : the encoder refuses it. Anything below
 * one module is raised to one.
 *
 * @module helpers/barcodes/encodeQRCode
 *
 * @param {string} value - The text to encode.
 * @param {Object} [options]
 * @param {'low'|'medium'|'quartile'|'high'} [options.ecc='medium'] - The error correction level.
 * @param {number} [options.quietZone=4] - The margin around the code, in modules.
 *
 * @returns {boolean[][]} The module grid, quiet zone included.
 *
 * @throws {QRCodeCapacityError} When the text does not fit in a QR code at this level :
 *         it carries `mode`, `length`, `capacity` and `ecc`. See {@link module:helpers/barcodes/measureQRCode}
 *         to check a text before encoding it.
 *
 * @example
 * ```js
 * const matrix = encodeQRCode( 'https://example.com' ) ;
 * matrix.length ; // → 33 : 25 modules + 2 × 4 of quiet zone
 * ```
 */
const encodeQRCode = ( value , { ecc = 'medium' , quietZone = QUIET_ZONE } = {} ) =>
{
    const text  = String( value ) ;
    const level = ECC_LEVELS.includes( ecc ) ? ecc : 'medium' ;

    try
    {
        return encodeQR( text , 'raw' , { border : Math.max( 1 , Math.round( quietZone ) ) , ecc : level } ) ;
    }
    catch ( error )
    {
        const measure = measureQRCode( text , { ecc : level } ) ;

        // Only a text past the capacity becomes a capacity error : anything else is rethrown as it came.
        if ( !measure.fits || /capacity/i.test( error?.message ?? '' ) )
        {
            throw new QRCodeCapacityError( measure , error ) ;
        }

        throw error ;
    }
} ;

export default encodeQRCode ;
