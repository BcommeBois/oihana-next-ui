/**
 * Sends a PDF to a server as a multipart form — the file the application's
 * API stores.
 *
 * The blob goes in `field` under `fileName`, the other `fields` beside it,
 * and the browser sets the multipart boundary itself : no `Content-Type`
 * header is to be written. A response that is not `ok` is thrown as an
 * `Error` carrying `status` and `response`, so a caller reads the body
 * when it wants to.
 *
 * @module helpers/pdf/uploadPdf
 *
 * @param {string} url - Where to send it.
 * @param {Blob} blob - The PDF, from `usePdfDocument`, `renderToBlob` or a viewer.
 * @param {Object} [options]
 * @param {string} [options.field='file'] - The form field the file goes in.
 * @param {Object.<string,string|Blob>} [options.fields] - Other fields sent beside it.
 * @param {string} [options.fileName='document.pdf'] - The name the file is sent under.
 * @param {Object.<string,string>} [options.headers] - Headers, an `Authorization` typically.
 * @param {string} [options.method='POST']
 * @param {AbortSignal} [options.signal]
 * @param {Function} [options.fetch] - The `fetch` to use. Defaults to the global one.
 *
 * @returns {Promise<Response>} The server's answer.
 *
 * @throws {Error} When the server does not answer `ok` : `error.status`, `error.response`.
 *
 * @example
 * ```js
 * const response = await uploadPdf( `${ API }/documents` , blob ,
 * {
 *     fileName : 'facture-2026-0042.pdf' ,
 *     fields   : { order : '2026-0042' } ,
 *     headers  : { Authorization : `Bearer ${ token }` } ,
 * } ) ;
 *
 * const { id } = await response.json() ;
 * ```
 */
const uploadPdf = async ( url , blob , { fetch : request = globalThis.fetch , field = 'file' , fields , fileName = 'document.pdf' , headers , method = 'POST' , signal } = {} ) =>
{
    const body = new FormData() ;

    body.append( field , blob , fileName ) ;

    for ( const [ name , value ] of Object.entries( fields ?? {} ) )
    {
        body.append( name , value ) ;
    }

    const response = await request( url , { body , headers , method , signal } ) ;

    if ( !response.ok )
    {
        const error = new Error( `The upload of ${ fileName } failed : ${ response.status }` ) ;

        error.response = response ;
        error.status   = response.status ;

        throw error ;
    }

    return response ;
} ;

export default uploadPdf ;
