/**
 * PdfQRCode — a QR code inside a generated PDF.
 *
 * A primitive of `@react-pdf/renderer`, not of the DOM : it lives in a
 * `<Document>` and nowhere else. The grid comes from `encodeQRCode` and is
 * drawn by `matrixToPath`, as the `QRCode` component and the SVG export
 * are — one encoder, one drawing, whatever the output. No library is added.
 *
 * ⚠️ This file imports `@react-pdf/renderer` at its top : import it from a
 * document template only, which already does, never from a page.
 *
 * A text past the capacity throws a `QRCodeCapacityError`, as the encoder
 * does : the generation fails and says why, where a missing code on an
 * invoice would be found by the customer. Measure first with
 * `measureQRCode` where the text is the user's.
 *
 * @module components/documents/pdf/PdfQRCode
 *
 * @param {Object} props
 * @param {?string} [props.background='#ffffff'] - The light colour ; `null` leaves it transparent.
 * @param {'low'|'medium'|'quartile'|'high'} [props.ecc='medium'] - The error correction level.
 * @param {string} [props.foreground='#000000'] - The colour of the modules.
 * @param {number} [props.quietZone=4] - The margin around the code, in modules.
 * @param {number} [props.size] - The side, in points. Defaults to 25 mm.
 * @param {Object} [props.style] - Style of the `<Svg>`, for its place in the layout.
 * @param {string} props.value - The content.
 *
 * @example
 * ```jsx
 * <PdfQRCode size={ mm( 30 ) } value={ `https://shop.example/orders/${ order.number }` } />
 * ```
 */

import { Path , Rect , Svg } from '@react-pdf/renderer' ;

import encodeQRCode , { QUIET_ZONE } from '../../../helpers/barcodes/encodeQRCode' ;
import matrixToPath                  from '../../../helpers/barcodes/matrixToPath' ;

import { mm } from '../../../helpers/pdf/units' ;

const PdfQRCode = ( { background = '#ffffff' , ecc = 'medium' , foreground = '#000000' , quietZone = QUIET_ZONE , size = mm( 25 ) , style , value } ) =>
{
    const matrix  = encodeQRCode( value , { ecc , quietZone } ) ;
    const modules = matrix.length ;

    return (
        <Svg height={ size } style={ style } viewBox={ `0 0 ${ modules } ${ modules }` } width={ size }>
            { background && <Rect fill={ background } height={ modules } width={ modules } x={ 0 } y={ 0 } /> }
            <Path d={ matrixToPath( matrix ) } fill={ foreground } />
        </Svg>
    ) ;
} ;

PdfQRCode.displayName = 'PdfQRCode' ;

export default PdfQRCode ;
