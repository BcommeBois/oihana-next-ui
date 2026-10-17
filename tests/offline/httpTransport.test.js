import { describe , expect , test } from 'bun:test' ;

import httpTransport , { readError } from '../../src/offline/outbox/httpTransport' ;

const item = ( init = {} ) => ( { files : [] , id : 'item-1' , kind : 'receipts' , payload : { body : { a : 1 } } , ...init } ) ;

/**
 * A fetch that records its call and answers what it is given.
 */
const recorder = ( answer = () => Response.json( { id : 'srv-1' } , { status : 201 } ) ) =>
{
    const calls = [] ;
    const fetch = async ( url , init ) =>
    {
        calls.push( { init , url } ) ;
        return answer( url , init ) ;
    } ;
    return { calls , fetch } ;
} ;

describe( 'httpTransport' , () =>
{
    test( 'posts JSON to base/kind with the idempotency key and the headers of the moment' , async () =>
    {
        const { calls , fetch } = recorder() ;
        let token = 't1' ;
        const send = httpTransport( { base : '/api/outbox/' , fetch , headers : () => ( { Authorization : `Bearer ${ token }` } ) } ) ;

        expect( await send( item() ) ).toEqual( { id : 'srv-1' } ) ;
        token = 't2' ;
        await send( item() ) ;

        const [ first , second ] = calls ;
        expect( first.url ).toBe( '/api/outbox/receipts' ) ;
        expect( first.init.method ).toBe( 'POST' ) ;
        expect( first.init.headers ).toMatchObject( { Authorization : 'Bearer t1' , 'Content-Type' : 'application/json' , 'Idempotency-Key' : 'item-1' } ) ;
        expect( JSON.parse( first.init.body ) ).toEqual( { a : 1 } ) ;
        expect( second.init.headers.Authorization ).toBe( 'Bearer t2' ) ;
    } ) ;

    test( 'a url and a method of the payload win ; an absolute url ignores the base' , async () =>
    {
        const { calls , fetch } = recorder() ;
        const send = httpTransport( { base : '/api' , fetch } ) ;
        await send( item( { payload : { method : 'PUT' , url : '/receipts/7' } } ) ) ;
        await send( item( { payload : { url : 'https://other.test/x' } } ) ) ;
        expect( calls[ 0 ] ).toMatchObject( { init : { method : 'PUT' } , url : '/api/receipts/7' } ) ;
        expect( calls[ 1 ].url ).toBe( 'https://other.test/x' ) ;
    } ) ;

    test( 'prepare puts the result of a dependency into the request' , async () =>
    {
        const { calls , fetch } = recorder() ;
        const send = httpTransport(
        {
            fetch ,
            prepare : ( one , refs ) => ( { body : { ...one.payload.body , quote : refs.q.id } , url : 'lines' } ) ,
        }) ;
        await send( item() , { q : { id : 'D-4512' } } ) ;
        expect( JSON.parse( calls[ 0 ].init.body ) ).toEqual( { a : 1 , quote : 'D-4512' } ) ;
    } ) ;

    test( 'with files, a multipart form : the body in payload, each file under its field' , async () =>
    {
        const { calls , fetch } = recorder() ;
        const send = httpTransport( { fetch } ) ;
        const bytes = new TextEncoder().encode( 'photo' ).buffer ;
        await send( item() , {} , { files : [ { bytes , field : 'photo' , name : 'bon.jpg' , type : 'image/jpeg' } ] } ) ;

        const form = calls[ 0 ].init.body ;
        expect( form ).toBeInstanceOf( FormData ) ;
        expect( calls[ 0 ].init.headers[ 'Content-Type' ] ).toBeUndefined() ;
        expect( JSON.parse( form.get( 'payload' ) ) ).toEqual( { a : 1 } ) ;
        const file = form.get( 'photo' ) ;
        expect( file.name ).toBe( 'bon.jpg' ) ;
        expect( file.type ).toBe( 'image/jpeg' ) ;
        expect( await file.text() ).toBe( 'photo' ) ;
    } ) ;

    test( 'a refusal throws its status and the code of the API' , async () =>
    {
        const { fetch } = recorder( () => Response.json( { code : 'unit_already_consumed' , message : 'Already shipped' } , { status : 422 } ) ) ;
        await expect( httpTransport( { fetch } )( item() ) ).rejects.toMatchObject( { code : 'unit_already_consumed' , message : 'Already shipped' , status : 422 } ) ;

        const nested = recorder( () => Response.json( { error : { code : 'modified' , message : 'Changed' } } , { status : 412 } ) ) ;
        await expect( httpTransport( { fetch : nested.fetch } )( item() ) ).rejects.toMatchObject( { code : 'modified' , status : 412 } ) ;
    } ) ;

    test( 'the reason and the details win over a numeric code and the status label' , async () =>
    {
        const body =
        {
            status  : 'error' ,
            code    : 422 ,
            message : 'Unprocessable Entity' ,
            details : 'The Idempotency-Key was first sent with another body.' ,
            reason  : 'idempotency_key_reused' ,
        } ;

        expect( await readError( Response.json( body , { status : 422 } ) ) ).toEqual(
        {
            status  : 422 ,
            code    : 'idempotency_key_reused' ,
            message : 'The Idempotency-Key was first sent with another body.' ,
        }) ;

        const { fetch } = recorder( () => Response.json( body , { status : 422 } ) ) ;
        await expect( httpTransport( { fetch } )( item() ) ).rejects.toMatchObject( { code : 'idempotency_key_reused' , status : 422 } ) ;

        const nested = Response.json( { error : { code : 409 , details : 'Signed meanwhile.' , reason : 'quote_signed' } } , { status : 409 } ) ;
        expect( await readError( nested ) ).toMatchObject( { code : 'quote_signed' , message : 'Signed meanwhile.' } ) ;
    } ) ;

    test( 'a numeric code alone is no reason' , async () =>
    {
        const response = Response.json( { code : 422 , message : 'Unprocessable Entity' } , { status : 422 } ) ;
        expect( await readError( response ) ).toEqual( { status : 422 , code : null , message : 'Unprocessable Entity' } ) ;
    } ) ;

    test( 'a Problem Details body (RFC 9457) gives its detail, and its code extension' , async () =>
    {
        const problem =
        {
            type   : 'https://api.example.com/problems/quote-signed' ,
            title  : 'Conflict' ,
            status : 409 ,
            detail : 'The quote was signed meanwhile.' ,
            code   : 'quote_signed' ,
        } ;
        const response = new Response( JSON.stringify( problem ) , { headers : { 'content-type' : 'application/problem+json' } , status : 409 } ) ;
        expect( await readError( response ) ).toEqual( { status : 409 , code : 'quote_signed' , message : 'The quote was signed meanwhile.' } ) ;

        const titled = Response.json( { title : 'Conflict' } , { status : 409 } ) ;
        expect( await readError( titled ) ).toEqual( { status : 409 , code : null , message : 'Conflict' } ) ;
    } ) ;

    test( 'empty strings are skipped ; an error string, the status text, then HTTP <status>' , async () =>
    {
        const blanks = Response.json( { reason : '' , code : ' ' , details : '' , message : 'Refused' } , { status : 400 } ) ;
        expect( await readError( blanks ) ).toEqual( { status : 400 , code : null , message : 'Refused' } ) ;

        expect( await readError( Response.json( { error : 'Nope' } , { status : 403 } ) ) ).toMatchObject( { code : null , message : 'Nope' } ) ;
        expect( await readError( new Response( null , { status : 422 , statusText : 'Unprocessable Entity' } ) ) ).toMatchObject( { message : 'Unprocessable Entity' } ) ;
        expect( await readError( new Response( null , { status : 422 } ) ) ).toEqual( { status : 422 , code : null , message : 'HTTP 422' } ) ;
    } ) ;

    test( 'a network failure is status 0, code network ; a slow server is a timeout' , async () =>
    {
        const down = async () => { throw new TypeError( 'Failed to fetch' ) ; } ;
        await expect( httpTransport( { fetch : down } )( item() ) ).rejects.toMatchObject( { code : 'network' , status : 0 } ) ;

        const slow = ( _url , init ) => new Promise( ( _resolve , reject ) => init.signal.addEventListener( 'abort' , () => reject( new Error( 'aborted' ) ) ) ) ;
        await expect( httpTransport( { fetch : slow , timeout : 10 } )( item() ) ).rejects.toMatchObject( { code : 'timeout' , status : 0 } ) ;
    } ) ;

    test( 'an empty answer is null, a text answer is text' , async () =>
    {
        const empty = recorder( () => new Response( null , { status : 204 } ) ) ;
        expect( await httpTransport( { fetch : empty.fetch } )( item() ) ).toBeNull() ;

        const text = recorder( () => new Response( 'ok' , { status : 200 } ) ) ;
        expect( await httpTransport( { fetch : text.fetch } )( item() ) ).toBe( 'ok' ) ;
    } ) ;
} ) ;
