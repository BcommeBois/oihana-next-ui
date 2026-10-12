import BarcodeContentError from './BarcodeContentError' ;
import encodeCode128       from './encodeCode128' ;

import { encodeEAN13 , encodeEAN8 , encodeUPCA } from './encodeEAN' ;

/**
 * The encoders, by format. The names are those of the Barcode Detection API,
 * so a code drawn here and read back by a scanner speaks the same `format`.
 *
 * @type {Object.<string,Function>}
 */
const ENCODERS =
{
    code_128 : encodeCode128 ,
    ean_13   : encodeEAN13 ,
    ean_8    : encodeEAN8 ,
    upc_a    : encodeUPCA ,
} ;

/**
 * The linear formats this library draws.
 *
 * @type {string[]}
 */
export const BARCODE_FORMATS = Object.keys( ENCODERS ) ;

/**
 * The formats whose digits can be laid out the retail way : guards running
 * longer than the bars, digits in groups under each half.
 *
 * @type {string[]}
 */
export const RETAIL_FORMATS = [ 'ean_13' , 'ean_8' , 'upc_a' ] ;

/**
 * Encodes a content as a linear barcode.
 *
 * Returns the encoded symbol, not a drawing : hand it to
 * {@link module:helpers/barcodes/layoutBarcode}, then to
 * {@link module:helpers/barcodes/barcodeToSvg} or
 * {@link module:helpers/barcodes/barcodeToPng}.
 *
 * The encoded symbol :
 *
 * - `format` : the format ;
 * - `modules` : the bars and spaces, one boolean per module, `true` for a bar, quiet zone NOT included ;
 * - `quietZone` : `{ left , right }`, the margins the standard asks for, in modules ;
 * - `text` : the human-readable line ;
 * - `retail` (EAN and UPC only) : `{ extended , digits }`, the module ranges drawn
 *   longer and the position of every digit, for the retail layout.
 *
 * @module helpers/barcodes/encodeBarcode
 *
 * @param {string} value - The content.
 * @param {Object} [options]
 * @param {'code_128'|'ean_13'|'ean_8'|'upc_a'} [options.format='code_128'] - The format.
 *
 * @returns {Object} The encoded symbol.
 *
 * @throws {BarcodeContentError} When the content does not fit the format — `reason` says why.
 *
 * @example
 * ```js
 * const svg = barcodeToSvg( layoutBarcode( encodeBarcode( '4006381333931' , { format : 'ean_13' } ) ) ) ;
 * ```
 */
const encodeBarcode = ( value , { format = 'code_128' } = {} ) =>
{
    const encoder = ENCODERS[ format ] ;

    if ( !encoder )
    {
        throw new BarcodeContentError( `Unknown barcode format « ${ format } ».` , { format , reason : 'format' } ) ;
    }

    return encoder( value ) ;
} ;

export default encodeBarcode ;
