import { createOutboxError } from './schema' ;

/**
 * Reads what a refusing server said : `{ code , message }` from a JSON body
 * shaped `{ code , message }` or `{ error : { code , message } }`, else the
 * status text.
 *
 * @param {Response} response
 * @returns {Promise<{ status : number , code : ?string , message : string }>}
 */
export const readError = async response =>
{
    let body = null ;

    try
    {
        body = await response.clone().json() ;
    }
    catch
    {
        body = null ;
    }

    const error = body?.error && typeof body.error === 'object' ? body.error : body ;

    return {
        status  : response.status ,
        code    : error?.code ?? null ,
        message : error?.message ?? ( typeof body?.error === 'string' ? body.error : null ) ?? response.statusText ?? `HTTP ${ response.status }` ,
    } ;
} ;

/**
 * Reads what an accepting server answered : JSON when it says so, the text
 * otherwise, `null` for an empty answer.
 *
 * @param {Response} response
 * @returns {Promise<*>}
 */
const readResult = async response =>
{
    if ( response.status === 204 )
    {
        return null ;
    }

    const text = await response.text() ;

    if ( !text )
    {
        return null ;
    }

    if ( ( response.headers.get( 'content-type' ) ?? '' ).includes( 'json' ) )
    {
        try
        {
            return JSON.parse( text ) ;
        }
        catch
        {
            return text ;
        }
    }

    return text ;
} ;

/**
 * Joins a base and a path, leaving an absolute URL alone.
 *
 * @param {string} base
 * @param {string} path
 * @returns {string}
 */
const join = ( base , path ) =>
{
    if ( /^[a-z][a-z0-9+.-]*:/i.test( path ) || !base )
    {
        return path ;
    }
    return `${ base.replace( /\/+$/ , '' ) }/${ path.replace( /^\/+/ , '' ) }` ;
} ;

/**
 * The transport of an outbox talking to an HTTP API from the browser. An
 * item's payload describes its request — `{ url , method , body , headers }` —
 * and `prepare( item , refs )` may rewrite it with the results of its
 * dependencies (the server key of a quote put into its lines). The item's id
 * goes out as `Idempotency-Key` : the server answers a replay with what it
 * answered the first time.
 *
 * Without files, the body goes as JSON ; with files, as a multipart form : the
 * body in a `payload` field (JSON), each file under its `field`.
 *
 * @param {Object} [options]
 * @param {string} [options.base=''] - Prefixed to a relative `url`. Without a `url`, the item goes to `base/kind`.
 * @param {Object|Function} [options.headers] - Headers, or `( item ) => headers`, read at each send (a token changes).
 * @param {Function} [options.prepare] - `( item , refs ) => ({ url , method , body , headers })`. Defaults to the payload.
 * @param {Function} [options.fetch=globalThis.fetch]
 * @param {Function} [options.readError] - `( response ) => Promise<{ status , code , message }>`.
 * @param {number} [options.timeout=30000] - Milliseconds before a request is given up (`code : 'timeout'`).
 * @returns {Function} `( item , refs , { files , signal } ) => Promise<result>`.
 *
 * @example
 * const send = httpTransport({
 *     base    : 'https://api.example.com' ,
 *     headers : () => ( { Authorization : `Bearer ${ getToken() }` } ) ,
 * }) ;
 */
const httpTransport =
({
    base    = '' ,
    headers ,
    prepare ,
    fetch   : fetcher = ( ...args ) => globalThis.fetch( ...args ) ,
    readError : read = readError ,
    timeout = 30000 ,
} = {}) =>
async ( item , refs = {} , { files = [] , signal } = {} ) =>
{
    const request = ( prepare ? prepare( item , refs ) : item.payload ) ?? {} ;

    const url    = join( base , request.url ?? item.kind ) ;
    const method = request.method ?? 'POST' ;

    const extra = typeof headers === 'function' ? headers( item ) : headers ;

    const init =
    {
        method ,
        headers : { 'Idempotency-Key' : item.id , ...extra , ...request.headers } ,
    } ;

    if ( files.length )
    {
        const form = new FormData() ;
        if ( request.body !== undefined )
        {
            form.append( 'payload' , JSON.stringify( request.body ) ) ;
        }
        for ( const file of files )
        {
            form.append( file.field ?? 'file' , new Blob( [ file.bytes ] , { type : file.type } ) , file.name ) ;
        }
        init.body = form ;
    }
    else if ( request.body !== undefined )
    {
        init.headers[ 'Content-Type' ] = 'application/json' ;
        init.body = JSON.stringify( request.body ) ;
    }

    const controller = new AbortController() ;
    const abort      = () => controller.abort() ;

    let timedOut = false ;

    const timer = setTimeout( () =>
    {
        timedOut = true ;
        controller.abort() ;
    }
    , timeout ) ;

    signal?.addEventListener( 'abort' , abort , { once : true } ) ;

    let response ;

    try
    {
        response = await fetcher( url , { ...init , signal : controller.signal } ) ;
    }
    catch ( error )
    {
        if ( timedOut )
        {
            throw createOutboxError( { code : 'timeout' , message : `No answer after ${ timeout } ms.` } ) ;
        }
        if ( signal?.aborted )
        {
            throw createOutboxError( { code : 'aborted' , message : 'The send was cancelled.' } ) ;
        }
        throw createOutboxError( { code : 'network' , message : error?.message ?? 'The network failed.' } ) ;
    }
    finally
    {
        clearTimeout( timer ) ;
        signal?.removeEventListener( 'abort' , abort ) ;
    }

    if ( !response.ok )
    {
        throw createOutboxError( await read( response ) ) ;
    }

    return readResult( response ) ;
} ;

export default httpTransport ;
