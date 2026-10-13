/**
 * The SHA-256 digest of a text, a blob or bytes, as a lowercase hex string.
 *
 * On `crypto.subtle`, which every browser and Node have : no dependency. What
 * a signature is bound to — the digest of the document as it was when it
 * was signed, stored beside the signature and the time, so a later change
 * of the document shows.
 *
 * ⚠️ `crypto.subtle` exists on secure origins only : `https`, and
 * `localhost`. On a plain `http` address it is undefined, and this throws.
 *
 * @module helpers/crypto/sha256
 *
 * @param {string|Blob|ArrayBuffer|Uint8Array} input
 * @returns {Promise<string>} 64 hex characters.
 *
 * @example
 * ```js
 * await sha256( 'abc' ) ; // → 'ba7816bf…f20015ad'
 * await sha256( pdfBlob ) ;
 * ```
 */
const sha256 = async input =>
{
    let bytes ;

    if ( typeof input === 'string' )
    {
        bytes = new TextEncoder().encode( input ) ;
    }
    else if ( typeof Blob !== 'undefined' && input instanceof Blob )
    {
        bytes = new Uint8Array( await input.arrayBuffer() ) ;
    }
    else
    {
        bytes = input instanceof Uint8Array ? input : new Uint8Array( input ) ;
    }

    const digest = await crypto.subtle.digest( 'SHA-256' , bytes ) ;

    return [ ...new Uint8Array( digest ) ].map( byte => byte.toString( 16 ).padStart( 2 , '0' ) ).join( '' ) ;
} ;

export default sha256 ;
