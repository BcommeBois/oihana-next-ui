import { loadEditor } from '../../../components/documents/engine/editor' ;

import openPdf        from './openPdf' ;
import parsePageRange from './parsePageRange' ;

/**
 * Some pages of a document, as a new one — in the order asked, so it
 * reorders as well as it extracts, and leaves out what it does not name :
 * removing a page is extracting the others.
 *
 * @module helpers/pdf/edit/extractPages
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {string|number|number[]} pages - `'1-3,5'`, `'4-'`, a number, or numbers — 1-based ; see `parsePageRange`.
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @throws {RangeError} When nothing names a page of the document.
 *
 * @example
 * ```js
 * await extractPages( file , '1-3,5' ) ;
 * await extractPages( file , [ 2 , 1 ] ) ;   // the first two pages, swapped
 * ```
 */
const extractPages = async ( source , pages , { signal } = {} ) =>
{
    const [ lib , { document } ] = await Promise.all( [ loadEditor() , openPdf( source , { signal } ) ] ) ;

    const numbers = parsePageRange( pages , document.getPageCount() ) ;

    const result = await lib.PDFDocument.create() ;
    const copied = await result.copyPages( document , numbers.map( number => number - 1 ) ) ;

    for ( const page of copied )
    {
        result.addPage( page ) ;
    }

    const title = document.getTitle() ;

    if ( title )
    {
        result.setTitle( title ) ;
    }

    return result.save() ;
} ;

export default extractPages ;
