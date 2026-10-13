/**
 * The bytes an editing helper returned, as a `File` : what `PdfViewer`
 * shows, `uploadPdf` sends and `forceDownload` saves.
 *
 * @module helpers/pdf/edit/toPdfFile
 *
 * @param {Uint8Array} bytes
 * @param {string} [fileName='document.pdf'] - `.pdf` is added when missing.
 * @returns {File}
 *
 * @example
 * ```js
 * const file = toPdfFile( await mergePdfs( [ a , b ] ) , 'dossier.pdf' ) ;
 * <PdfViewer source={ file } />
 * ```
 */
const toPdfFile = ( bytes , fileName = 'document.pdf' ) =>
    new File( [ bytes ] , /\.pdf$/i.test( fileName ) ? fileName : `${ fileName }.pdf` , { type : 'application/pdf' } ) ;

export default toPdfFile ;
