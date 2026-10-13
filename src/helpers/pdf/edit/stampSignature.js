import strokesToPaths from '../../signature/strokesToPaths' ;

import { mm } from '../units' ;

import { hexToRgb } from './addPageNumbers' ;
import openPdf      from './openPdf' ;
import placement    from './placement' ;

/**
 * Puts the strokes of a `SignaturePad` on a page, **as vectors** : the same
 * paths the pad drew, scaled to `width` millimetres, sharp at any zoom and
 * on any printer — a quote sent back signed, a delivery note countersigned.
 *
 * Placed in millimetres from a corner, as `stampImage` is. The height
 * follows the pad's ratio.
 *
 * @module helpers/pdf/edit/stampSignature
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {import('../../signature/scaleSignature').Signature} signature - The pad's value.
 * @param {Object} [options]
 * @param {import('./placement').Anchor} [options.anchor='bottom-right']
 * @param {string} [options.color='#1f2937'] - The ink, a hex colour.
 * @param {number} [options.page=1] - The page, 1-based.
 * @param {AbortSignal} [options.signal]
 * @param {number} [options.thickness=3] - The pen's width, in the pad's units.
 * @param {number} [options.width=50] - Millimetres.
 * @param {number} [options.x=15] - Millimetres from the anchor's edge.
 * @param {number} [options.y=15]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await stampSignature( quote , pad.current.value , { anchor : 'bottom-right' , page : 2 , width : 45 } ) ;
 * ```
 */
const stampSignature = async ( source , signature , { anchor = 'bottom-right' , color = '#1f2937' , page = 1 , signal , thickness = 3 , width = 50 , x = 15 , y = 15 } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const paths = strokesToPaths( signature , { size : thickness } ) ;

    if ( paths.length === 0 || !signature?.width )
    {
        return document.save() ;
    }

    const scale = mm( width ) / signature.width ;
    const box   = { height : signature.height * scale , width : mm( width ) } ;

    const target = document.getPage( Math.min( Math.max( 1 , page ) , document.getPageCount() ) - 1 ) ;

    const spot = placement( target.getSize() , box , { anchor , x , y } ) ;
    const tint = hexToRgb( lib , color ) ;

    // An SVG path is drawn from its top-left, downwards : the top of the box, not its bottom.
    for ( const d of paths )
    {
        target.drawSvgPath( d , { borderWidth : 0 , color : tint , scale , x : spot.x , y : spot.y + box.height } ) ;
    }

    return document.save() ;
} ;

export default stampSignature ;
