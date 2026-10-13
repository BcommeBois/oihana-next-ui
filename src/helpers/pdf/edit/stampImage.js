import { mm } from '../units' ;

import openPdf   from './openPdf' ;
import placement from './placement' ;

/**
 * Puts a PNG or JPEG on a page : a logo, a « received » stamp, a scanned
 * signature.
 *
 * The image is placed in millimetres from a corner (`anchor`, `x`, `y`),
 * at `width` millimetres, its height following its ratio unless `height` is
 * given. For the strokes of a `SignaturePad`, `stampSignature` draws them
 * as vectors instead.
 *
 * @module helpers/pdf/edit/stampImage
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Blob|ArrayBuffer|Uint8Array} image - The PNG or JPEG.
 * @param {Object} [options]
 * @param {import('./placement').Anchor} [options.anchor='bottom-right']
 * @param {number} [options.height] - Millimetres ; defaults to the image's ratio.
 * @param {number} [options.opacity=1]
 * @param {number} [options.page=1] - The page, 1-based.
 * @param {number} [options.rotate=0] - Degrees, counter-clockwise.
 * @param {AbortSignal} [options.signal]
 * @param {number} [options.width=40] - Millimetres.
 * @param {number} [options.x=15] - Millimetres from the anchor's edge.
 * @param {number} [options.y=15]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await stampImage( file , logoPng , { anchor : 'top-right' , page : 1 , width : 30 } ) ;
 * ```
 */

/** The bytes of an image, and whether they are a PNG. */
export const imageBytes = async image =>
{
    const bytes = image instanceof Uint8Array ? image : new Uint8Array( image instanceof ArrayBuffer ? image : await image.arrayBuffer() ) ;
    const png   = bytes[ 0 ] === 0x89 && bytes[ 1 ] === 0x50 && bytes[ 2 ] === 0x4e && bytes[ 3 ] === 0x47 ;

    return { bytes , png } ;
} ;

const stampImage = async ( source , image , { anchor = 'bottom-right' , height , opacity = 1 , page = 1 , rotate = 0 , signal , width = 40 , x = 15 , y = 15 } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const { bytes , png } = await imageBytes( image ) ;

    const embedded = png ? await document.embedPng( bytes ) : await document.embedJpg( bytes ) ;

    const box = { height : height ? mm( height ) : mm( width ) * embedded.height / embedded.width , width : mm( width ) } ;

    const target = document.getPage( Math.min( Math.max( 1 , page ) , document.getPageCount() ) - 1 ) ;

    const spot = placement( target.getSize() , box , { anchor , x , y } ) ;

    target.drawImage( embedded , { height : box.height , opacity , rotate : lib.degrees( rotate ) , width : box.width , x : spot.x , y : spot.y } ) ;

    return document.save() ;
} ;

export default stampImage ;
