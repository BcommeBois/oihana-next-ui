/**
 * The bytes of a PDF, from whatever names one : what every editing helper
 * starts with.
 *
 * Takes what the viewer takes — a url, `{ url , headers , credentials }` for
 * a document behind an API, a `Blob` or `File`, an `ArrayBuffer`, a
 * `Uint8Array` — and answers the bytes. A url is fetched whole : an edit
 * needs the entire file, where a viewer could ask for ranges.
 *
 * @module helpers/pdf/edit/loadPdfBytes
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal] - Aborts the fetch of a url.
 *
 * @returns {Promise<Uint8Array>}
 *
 * @throws {Error} When a url does not answer `ok`, with `status` on the error.
 */
const loadPdfBytes = async ( source , { signal } = {} ) =>
{
    if ( source instanceof Uint8Array )
    {
        return source ;
    }

    if ( source instanceof ArrayBuffer )
    {
        return new Uint8Array( source ) ;
    }

    if ( typeof Blob !== 'undefined' && source instanceof Blob )
    {
        return new Uint8Array( await source.arrayBuffer() ) ;
    }

    const url     = typeof source === 'string' || source instanceof URL ? String( source ) : source?.url ;
    const headers = source?.headers ;

    if ( !url )
    {
        throw new Error( 'A PDF is expected : a url, a Blob, a File or bytes.' ) ;
    }

    const response = await fetch( url , { credentials : source?.credentials , headers , signal } ) ;

    if ( !response.ok )
    {
        const error = new Error( `The document could not be fetched : ${ response.status }` ) ;
        error.status = response.status ;
        throw error ;
    }

    return new Uint8Array( await response.arrayBuffer() ) ;
} ;

export default loadPdfBytes ;
