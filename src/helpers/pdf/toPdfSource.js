/**
 * What a PDF may be given as, turned into what pdf.js opens.
 *
 * A document comes as a url, a `Blob` or `File` (dropped, picked, generated),
 * a buffer (fetched by hand, received from an API), or a url with the headers
 * an API wants — `{ url , headers }`, which pdf.js sends itself, keeping its
 * range requests : a long document starts showing before it is fully
 * downloaded, where a `fetch` by hand would wait for the last byte.
 *
 * 🔑 **A buffer is handed to the worker, not copied** : pdf.js transfers it,
 * and the caller's `ArrayBuffer` is empty afterwards. Pass a copy
 * (`buffer.slice( 0 )`) to a document whose bytes are needed again.
 *
 * @module helpers/pdf/toPdfSource
 *
 * @typedef {string|URL|Blob|File|ArrayBuffer|Uint8Array|{ url : string , headers ?: Object<string,string> , credentials ?: 'include'|'omit'|'same-origin' }} PdfSource
 *
 * @param {PdfSource} source - The document.
 * @returns {Promise<{ url : string , httpHeaders ?: Object , withCredentials ?: boolean }|{ data : Uint8Array }>} A `getDocument` parameter.
 * @throws {TypeError} When the source is none of the forms above.
 *
 * @example
 * ```js
 * await toPdfSource( '/documents/invoice.pdf' ) ;                 // { url }
 * await toPdfSource( { url , headers : { Authorization } } ) ;     // { url , httpHeaders }
 * await toPdfSource( file ) ;                                      // { data }
 * ```
 */
const toPdfSource = async source =>
{
    if ( typeof source === 'string' || source instanceof URL )
    {
        return { url : String( source ) } ;
    }

    if ( source instanceof Uint8Array )
    {
        return { data : source } ;
    }

    if ( source instanceof ArrayBuffer )
    {
        return { data : new Uint8Array( source ) } ;
    }

    if ( typeof Blob !== 'undefined' && source instanceof Blob )
    {
        return { data : new Uint8Array( await source.arrayBuffer() ) } ;
    }

    if ( source && typeof source === 'object' && typeof source.url === 'string' )
    {
        const { credentials , headers , url } = source ;

        return {
            url ,
            ...headers && { httpHeaders : headers } ,
            ...credentials === 'include' && { withCredentials : true } ,
        } ;
    }

    throw new TypeError( 'A PDF source is a url, a Blob, a File, a buffer, or { url , headers }.' ) ;
} ;

export default toPdfSource ;
