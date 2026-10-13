import { describe , expect , test } from 'bun:test' ;

import toPdfSource , { toDocumentFile } from '../../../src/helpers/pdf/toPdfSource' ;

const BYTES = new Uint8Array( [ 0x25 , 0x50 , 0x44 , 0x46 ] ) ; // « %PDF »

describe( 'toPdfSource' , () =>
{
    test( 'a url, as a string or a URL, is handed over as a url' , async () =>
    {
        expect( await toPdfSource( '/documents/sample.pdf' ) ).toEqual( { url : '/documents/sample.pdf' } ) ;
        expect( await toPdfSource( new URL( 'https://example.com/a.pdf' ) ) ).toEqual( { url : 'https://example.com/a.pdf' } ) ;
    } ) ;

    test( 'a url with headers keeps its headers, and credentials only when asked for' , async () =>
    {
        const headers = { Authorization : 'Bearer x' } ;
        expect( await toPdfSource( { url : '/api/doc' , headers } ) ).toEqual( { url : '/api/doc' , httpHeaders : headers } ) ;
        expect( await toPdfSource( { url : '/api/doc' , credentials : 'include' } ) ).toEqual( { url : '/api/doc' , withCredentials : true } ) ;
        expect( await toPdfSource( { url : '/api/doc' , credentials : 'omit' } ) ).toEqual( { url : '/api/doc' } ) ;
    } ) ;

    test( 'bytes become data, whatever their container' , async () =>
    {
        expect( await toPdfSource( BYTES ) ).toEqual( { data : BYTES } ) ;
        expect( ( await toPdfSource( BYTES.buffer ) ).data ).toEqual( BYTES ) ;
        expect( ( await toPdfSource( new Blob( [ BYTES ] , { type : 'application/pdf' } ) ) ).data ).toEqual( BYTES ) ;
        expect( ( await toPdfSource( new File( [ BYTES ] , 'a.pdf' , { type : 'application/pdf' } ) ) ).data ).toEqual( BYTES ) ;
    } ) ;

    test( 'anything else is refused' , async () =>
    {
        await expect( toPdfSource( null ) ).rejects.toBeInstanceOf( TypeError ) ;
        await expect( toPdfSource( 42 ) ).rejects.toBeInstanceOf( TypeError ) ;
        await expect( toPdfSource( { data : BYTES } ) ).rejects.toBeInstanceOf( TypeError ) ;
    } ) ;
} ) ;

describe( 'toDocumentFile' , () =>
{
    test( 'bytes and blobs go through untouched, a URL becomes a string, nothing stays nothing' , () =>
    {
        const blob = new Blob( [ BYTES ] ) ;
        expect( toDocumentFile( BYTES ) ).toBe( BYTES ) ;
        expect( toDocumentFile( blob ) ).toBe( blob ) ;
        expect( toDocumentFile( '/a.pdf' ) ).toBe( '/a.pdf' ) ;
        expect( toDocumentFile( new URL( 'https://example.com/a.pdf' ) ) ).toBe( 'https://example.com/a.pdf' ) ;
        expect( toDocumentFile( null ) ).toBeNull() ;
    } ) ;

    test( 'a url with headers is translated for the component' , () =>
    {
        expect( toDocumentFile( { url : '/api/doc' , headers : { A : 'b' } , credentials : 'include' } ) ).toEqual( { url : '/api/doc' , httpHeaders : { A : 'b' } , withCredentials : true } ) ;
    } ) ;
} ) ;
