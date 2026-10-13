import openPdf        from './openPdf' ;
import parsePageRange from './parsePageRange' ;

/**
 * Turns pages by quarter turns — one, some, or all — and keeps it in the
 * file : every reader opens them turned.
 *
 * The rotation adds to the page's own : a page already at 90° turned by 90°
 * is at 180°. `angle` is a multiple of 90, in either direction.
 *
 * @module helpers/pdf/edit/rotatePages
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object} [options]
 * @param {number} [options.angle=90] - Degrees, a multiple of 90 ; negative turns the other way.
 * @param {string|number|number[]} [options.pages] - Which pages, as `parsePageRange` reads them. All by default.
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await rotatePages( file , { angle : 90 , pages : 3 } ) ;
 * await rotatePages( file , { angle : -90 } ) ;
 * ```
 */
const rotatePages = async ( source , { angle = 90 , pages , signal } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const turn = ( ( Math.round( angle / 90 ) * 90 ) % 360 + 360 ) % 360 ;

    const numbers = pages === undefined ? document.getPageIndices().map( index => index + 1 ) : parsePageRange( pages , document.getPageCount() ) ;

    for ( const number of numbers )
    {
        const page = document.getPage( number - 1 ) ;

        page.setRotation( lib.degrees( ( page.getRotation().angle + turn ) % 360 ) ) ;
    }

    return document.save() ;
} ;

export default rotatePages ;
