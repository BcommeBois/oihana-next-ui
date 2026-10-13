/**
 * Asks the network whether it is really there : a small `HEAD` of a file
 * the application serves, with a deadline.
 *
 * `navigator.onLine` says whether the device has an interface up — a Wi-Fi
 * portal that answers nothing, a 4G with no data, both say « online ». One
 * request settles it. The answer's status does not matter, only that one
 * came : a `404` is a server that answered.
 *
 * @module helpers/net/checkConnection
 *
 * @param {Object} [options]
 * @param {Function} [options.fetch] - The `fetch` to use. Defaults to the global one.
 * @param {number} [options.timeout=5000] - Milliseconds before giving up.
 * @param {string} [options.url='/version.json'] - What to ask for : something small the application serves. `oihana-inject-version` writes this one.
 *
 * @returns {Promise<boolean>} Whether the server answered in time.
 */
const checkConnection = async ( { fetch : request = globalThis.fetch , timeout = 5000 , url = '/version.json' } = {} ) =>
{
    if ( typeof request !== 'function' )
    {
        return false ;
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null ;
    const timer      = controller ? setTimeout( () => controller.abort() , timeout ) : null ;

    try
    {
        // A query string the browser has never seen : no cache, no service worker hit.
        await request( `${ url }${ url.includes( '?' ) ? '&' : '?' }ping=${ Date.now() }` , { cache : 'no-store' , method : 'HEAD' , signal : controller?.signal } ) ;
        return true ;
    }
    catch
    {
        return false ;
    }
    finally
    {
        if ( timer ) clearTimeout( timer ) ;
    }
} ;

export default checkConnection ;
