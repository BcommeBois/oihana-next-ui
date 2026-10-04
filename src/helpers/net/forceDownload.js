/**
 * Hands a blob to the browser as a file to save.
 *
 * ⚠️ **The anchor is attached to the document before the click, then removed.**
 * A detached link is not reliably clickable everywhere — older Firefox builds
 * ignored the click and downloaded nothing, silently. The two extra lines are
 * the whole reason this helper exists rather than being written inline.
 *
 * `revoke` releases the blob url once the click has been dispatched. Pass it
 * for a url created for this download alone ; leave it out for one the caller
 * keeps using.
 *
 * @module helpers/net/forceDownload
 *
 * @param {string}  fileName        - The name the file is saved under.
 * @param {string}  blobUrl         - The url to download, typically from `URL.createObjectURL`.
 * @param {boolean} [revoke=false]  - Release `blobUrl` once the click is dispatched.
 *
 * @example
 * ```js
 * const blob = new Blob( [ 'Hello world' ] , { type : 'text/plain' } ) ;
 *
 * forceDownload( 'hello.txt' , URL.createObjectURL( blob ) , true ) ;
 * ```
 */
const forceDownload = ( fileName , blobUrl , revoke = false ) =>
{
    const anchor = document.createElement( 'a' ) ;

    anchor.href     = blobUrl ;
    anchor.download = fileName ;

    document.body.appendChild( anchor ) ;

    anchor.click() ;

    anchor.remove() ;

    if ( revoke )
    {
        URL.revokeObjectURL( blobUrl ) ;
    }
} ;

export default forceDownload ;
