/**
 * PdfSignature — a signature inside a generated PDF, as vectors : the
 * strokes of a `SignaturePad` drawn into an `<Svg>`, sharp at any zoom and
 * on any printer, where a PNG would show its pixels.
 *
 * A primitive of `@react-pdf/renderer`, not of the DOM : it lives in a
 * `<Document>` and nowhere else. The paths are `strokesToPaths`'s — the
 * same the pad draws on screen.
 *
 * ⚠️ This file imports `@react-pdf/renderer` at its top : import it from a
 * document template only, which already does, never from a page.
 *
 * @module components/documents/pdf/PdfSignature
 *
 * @param {Object} props
 * @param {string} [props.color='#000000'] - The ink.
 * @param {?import('../../../helpers/signature/scaleSignature').Signature} props.signature - The strokes ; empty, nothing is drawn.
 * @param {Object} [props.style] - Style of the `<Svg>`, for its place in the layout.
 * @param {number} [props.thickness=3] - The pen's width, in the pad's units.
 * @param {number} [props.width] - The width, in points. Defaults to 60 mm ; the height follows the pad's ratio.
 *
 * @example
 * ```jsx
 * <PdfSignature signature={ receipt.signature } width={ mm( 50 ) } />
 * ```
 */

import { Path , Svg } from '@react-pdf/renderer' ;

import isSignatureEmpty from '../../../helpers/signature/isSignatureEmpty' ;
import strokesToPaths   from '../../../helpers/signature/strokesToPaths' ;

import { mm } from '../../../helpers/pdf/units' ;

const PdfSignature = ( { color = '#000000' , signature , style , thickness = 3 , width = mm( 60 ) } ) =>
{
    if ( isSignatureEmpty( signature ) || !signature.width )
    {
        return null ;
    }

    const height = width * signature.height / signature.width ;

    return (
        <Svg height={ height } style={ style } viewBox={ `0 0 ${ signature.width } ${ signature.height }` } width={ width }>
            { strokesToPaths( signature , { size : thickness } ).map( ( d , index ) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: a stroke has no identity but its rank.
                <Path d={ d } fill={ color } key={ index } />
            ) ) }
        </Svg>
    ) ;
} ;

PdfSignature.displayName = 'PdfSignature' ;

export default PdfSignature ;
