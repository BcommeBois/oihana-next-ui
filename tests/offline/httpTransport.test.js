import { describe , expect , test } from 'bun:test' ;

import httpTransport from '../../src/offline/outbox/httpTransport' ;

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
