import BarcodeContentError from './BarcodeContentError' ;
import encodeCode128       from './encodeCode128' ;
import encodeGS1_128       from './encodeGS1_128' ;
import encodeITF14         from './encodeITF14' ;

import { encodeEAN13 , encodeEAN8 , encodeUPCA } from './encodeEAN' ;

/**
 * The encoders, by format. The names are those of the Barcode Detection API,
 * so a code drawn here and read back by a scanner speaks the same `format` —
 * save for the two GS1 uses of a symbology, which a scanner reports by the
 * symbology : `gs1_128` comes back as `code_128`, `itf_14` as `itf`.
 *
 * @type {Object.<string,Function>}
 */
const ENCODERS =
{
    code_128 : encodeCode128 ,
    ean_13   : encodeEAN13 ,
    ean_8    : encodeEAN8 ,
    gs1_128  : encodeGS1_128 ,
    itf_14   : encodeITF14 ,
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
 *   longer and the position of every digit, for the retail layout ;
 * - `bearer` (ITF-14 only) : `{ thickness }`, the bearer bars, in modules.
 *
 * @module helpers/barcodes/encodeBarcode
 *
 * @param {string} value - The content.
 * @param {Object} [options]
 * @param {'code_128'|'gs1_128'|'ean_13'|'ean_8'|'upc_a'|'itf_14'} [options.format='code_128'] - The format.
 * @param {'spaced'|'compact'} [options.gs1Text='spaced'] - GS1-128 only : the human-readable line, `(01) 0950… (10) ABC` or as typed.
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
const encodeBarcode = ( value , { format = 'code_128' , ...options } = {} ) =>
{
    const encoder = ENCODERS[ format ] ;

    if ( !encoder )
    {
        throw new BarcodeContentError( `Unknown barcode format « ${ format } ».` , { format , reason : 'format' } ) ;
    }

    return encoder( value , options ) ;
} ;

export default encodeBarcode ;
