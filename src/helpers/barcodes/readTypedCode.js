import encodeGS1_128 from './encodeGS1_128' ;
import normalizeScan , { joinGS1 } from './normalizeScan' ;

const GS1_TYPED = /^\(\d{2,4}\)/ ;

/**
 * Reads a code typed by hand into the same reading a camera would give.
 *
 * - Plain text is trimmed and passed through {@link module:helpers/barcodes/normalizeScan} :
 *   `format` and `symbology` are `null`, nothing was seen.
 * - A GS1 element string written as on a label — `(01)09501101530003(10)LOT-42`
 *   — is checked like a GS1-128 to be drawn (fixed lengths, check digits, GS1
 *   character set) and becomes `gs1 : true` with its `elements`. Its `value` is
 *   the element string a reader returns for the same label, separators
 *   included : the label typed and the label scanned are the same value.
 *
 * @module helpers/barcodes/readTypedCode
 *
 * @param {string} text - What was typed.
 * @returns {{ elements : ?Array<{ ai : string , data : string }> , format : null , gs1 : boolean , rawValue : string , symbology : null , value : string }}
 * @throws {BarcodeContentError} A GS1 element string that GS1 refuses — `reason` says why, `data.ai` which element.
 *
 * @example
 * ```js
 * readTypedCode( ' ABC-1234 ' ).value ;                 // → 'ABC-1234'
 * readTypedCode( '(00)106141411234567897' ).elements ;  // → [ { ai : '00' , data : '106141411234567897' } ]
 * ```
 */
const readTypedCode = text =>
{
    const typed = String( text ?? '' ).trim() ;

    if ( GS1_TYPED.test( typed ) )
    {
        const { elements } = encodeGS1_128( typed ) ;

        return {
            elements ,
            format    : null ,
            gs1       : true ,
            rawValue  : typed ,
            symbology : null ,
            value     : joinGS1( elements ) ,
        } ;
    }

    return { ...normalizeScan( { format : null , rawValue : typed } ) , format : null } ;
} ;

export default readTypedCode ;
