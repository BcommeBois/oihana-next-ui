import { loadEditor } from '../../../components/documents/engine/editor' ;

import loadPdfBytes from './loadPdfBytes' ;

/**
 * Opens a document with the editing engine : the bytes read, the engine
 * loaded, the `PDFDocument` returned with the module beside it — what every
 * editing helper does first.
 *
 * @module helpers/pdf/edit/openPdf
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<{ document : Object , lib : Object }>} The open document, and the `@cantoo/pdf-lib` module.
 */
const openPdf = async ( source , { signal } = {} ) =>
{
    const [ lib , bytes ] = await Promise.all( [ loadEditor() , loadPdfBytes( source , { signal } ) ] ) ;

    const document = await lib.PDFDocument.load( bytes , { ignoreEncryption : true } ) ;

    return { document , lib } ;
} ;

export default openPdf ;
