/**
 * Receives what an outbox sends, as an API with idempotency would — and keeps
 * nothing but the keys it has seen, in the memory of the process.
 *
 * `POST /api/outbox/<kind>` takes JSON, or a multipart form (the body in
 * `payload`, the files beside), and answers `201 { id , kind , key , receivedAt ,
 * body , files }`. A known `Idempotency-Key` gets the same answer again, `200`,
 * with `Idempotent-Replayed: true` : never a second creation.
 *
 * `?fail=409|412|422|429|500` refuses the way an API would, with a readable code ;
 * `&times=N` only the first N times for a key, then accepts. `?delay=ms` (up to
 * 10 s) answers late, to catch an item on its way. The 422 comes in the other
 * shape an API may use : the status in `code`, the reason in `reason`, the
 * explanation in `details`. The 429 asks to wait 3 s (`Retry-After`).
 */

const MAX_DELAY = 10000 ;

const MAX_KEYS = 500 ;

const FAILURES =
{
    401 : { code : 'unauthenticated'    , message : 'Sign in again.' } ,
    409 : { code : 'document_not_draft' , message : 'The document is no longer a draft.' } ,
    412 : { code : 'modified_elsewhere' , message : 'It was changed elsewhere since it was read.' } ,
    422 :
    {
        status  : 'error' ,
        code    : 422 ,
        message : 'Unprocessable Entity' ,
        details : 'This unit was already shipped.' ,
        reason  : 'unit_already_consumed' ,
    } ,
    429 :
    {
        status  : 'error' ,
        code    : 429 ,
        message : 'Too Many Requests' ,
        details : 'Too many requests : retry in a few seconds.' ,
        reason  : 'rate_limited' ,
    } ,
    500 : { code : 'server_error' , message : 'The server failed.' } ,
} ;

const HEADERS =
{
    429 : { 'Retry-After' : '3' } ,
} ;

// Kept on globalThis so a hot reload of this module does not forget the keys.
if ( !globalThis.__labOutbox )
{
    globalThis.__labOutbox = { answers : new Map() , count : 0 , failures : new Map() } ;
}

const memory = globalThis.__labOutbox ;

/**
 * Reads a JSON or multipart request.
 *
 * @param {Request} request
 * @returns {Promise<{ body : * , files : Object[] }>}
 */
const readRequest = async request =>
{
    const type = request.headers.get( 'content-type' ) ?? '' ;

    if ( type.includes( 'multipart/form-data' ) )
    {
        const form  = await request.formData() ;
        const files = [] ;
        let body = null ;

        for ( const [ field , value ] of form.entries() )
        {
            if ( field === 'payload' && typeof value === 'string' )
            {
                body = JSON.parse( value ) ;
            }
            else if ( value instanceof Blob )
            {
                files.push( { field , name : value.name , size : value.size , type : value.type } ) ;
            }
        }

        return { body , files } ;
    }

    const text = await request.text() ;

    return { body : text ? JSON.parse( text ) : null , files : [] } ;
} ;

/**
 * @param {Request} request
 * @param {{ params : Promise<{ kind : string }> }} context
 * @returns {Promise<Response>}
 */
export async function POST( request , { params } )
{
    const { kind } = await params ;

    const url   = new URL( request.url ) ;
    const fail  = Number( url.searchParams.get( 'fail' ) ) ;
    const times = Number( url.searchParams.get( 'times' ) ?? Number.POSITIVE_INFINITY ) ;
    const delay = Math.min( Number( url.searchParams.get( 'delay' ) ) || 0 , MAX_DELAY ) ;
    const key   = request.headers.get( 'idempotency-key' ) ;

    if ( delay > 0 )
    {
        await new Promise( resolve => setTimeout( resolve , delay ) ) ;
    }

    if ( key && memory.answers.has( key ) )
    {
        return Response.json( memory.answers.get( key ) , { headers : { 'Idempotent-Replayed' : 'true' } , status : 200 } ) ;
    }

    if ( FAILURES[ fail ] )
    {
        const seen = memory.failures.get( key ) ?? 0 ;
        if ( seen < times )
        {
            memory.failures.set( key , seen + 1 ) ;
            return Response.json( FAILURES[ fail ] , { headers : HEADERS[ fail ] , status : fail } ) ;
        }
    }

    let received ;

    try
    {
        received = await readRequest( request ) ;
    }
    catch
    {
        return Response.json( { code : 'bad_request' , message : 'A JSON body or a multipart form is expected.' } , { status : 400 } ) ;
    }

    memory.count += 1 ;

    const answer =
    {
        id         : `srv-${ memory.count }` ,
        kind ,
        key ,
        receivedAt : new Date().toISOString() ,
        ...received ,
    } ;

    if ( key )
    {
        memory.answers.set( key , answer ) ;
        memory.failures.delete( key ) ;
        if ( memory.answers.size > MAX_KEYS )
        {
            memory.answers.delete( memory.answers.keys().next().value ) ;
        }
    }

    return Response.json( answer , { status : 201 } ) ;
}
