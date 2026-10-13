import { loadEditor } from '../../../components/documents/engine/editor' ;

import openPdf from './openPdf' ;

/**
 * Several documents, end to end, as one.
 *
 * The pages are copied in the order given, with their size, rotation and
 * content ; form fields and links inside the pages come along, bookmarks
 * do not. The result's properties are the first document's, unless `title`
 * says otherwise.
 *
 * @module helpers/pdf/edit/mergePdfs
 *
 * @param {Array<import('../toPdfSource').PdfSource|Uint8Array>} sources - The documents, in order.
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 * @param {string} [options.title] - The result's title.
 *
 * @returns {Promise<Uint8Array>} The merged document.
 *
 * @example
 * ```js
 * const bytes = await mergePdfs( [ quote , terms , { url , headers } ] , { title : 'Dossier' } ) ;
 * ```
 */
const mergePdfs = async ( sources , { signal , title } = {} ) =>
{
    const lib    = await loadEditor() ;
    const merged = await lib.PDFDocument.create() ;

    let first = true ;

    for ( const source of sources )
    {
        const { document } = await openPdf( source , { signal } ) ;

        const pages = await merged.copyPages( document , document.getPageIndices() ) ;

        for ( const page of pages )
        {
            merged.addPage( page ) ;
        }

        if ( first )
        {
            const name = document.getTitle() ;
            if ( name ) merged.setTitle( name ) ;
            const author = document.getAuthor() ;
            if ( author ) merged.setAuthor( author ) ;
            first = false ;
        }
    }

    if ( title )
    {
        merged.setTitle( title ) ;
    }

    return merged.save() ;
} ;

export default mergePdfs ;
