import { describe , expect , test } from 'bun:test' ;

import pageSize , { PAGE_SIZES , cm , inch , mm , toMm } from '../../../src/helpers/pdf/units' ;
import registerFonts                                    from '../../../src/helpers/pdf/registerFonts' ;
import uploadPdf                                        from '../../../src/helpers/pdf/uploadPdf' ;

describe( 'units' , () =>
{
    test( 'an inch is 72 points, and a millimetre its share of it' , () =>
    {
        expect( inch( 1 ) ).toBe( 72 ) ;
        expect( mm( 25.4 ) ).toBeCloseTo( 72 , 10 ) ;
        expect( cm( 2.54 ) ).toBeCloseTo( 72 , 10 ) ;
        expect( toMm( mm( 210 ) ) ).toBeCloseTo( 210 , 10 ) ;
    } ) ;

    test( 'a page by name, portrait or landscape, falls back to A4' , () =>
    {
        expect( pageSize( 'A4' ) ).toEqual( [ mm( 210 ) , mm( 297 ) ] ) ;
        expect( pageSize( 'letter' ) ).toEqual( [ mm( 215.9 ) , mm( 279.4 ) ] ) ;
        expect( pageSize( 'A4' , { landscape : true } ) ).toEqual( [ mm( 297 ) , mm( 210 ) ] ) ;
        expect( pageSize( 'B9' ) ).toEqual( pageSize( PAGE_SIZES.A4 ) ) ;
    } ) ;

    test( 'a label is given in millimetres, as a pair or an object' , () =>
    {
        expect( pageSize( [ 99.1 , 38.1 ] ) ).toEqual( [ mm( 99.1 ) , mm( 38.1 ) ] ) ;
        expect( pageSize( { height : 38.1 , width : 99.1 } ) ).toEqual( [ mm( 99.1 ) , mm( 38.1 ) ] ) ;
    } ) ;
} ) ;

describe( 'registerFonts' , () =>
{
    const fakeFont = () =>
    {
        const calls = [] ;
        return { calls , register : entry => calls.push( entry ) } ;
    } ;

    test( 'registers a family once, whatever the number of calls' , () =>
    {
        const Font   = fakeFont() ;
        const family = { family : 'Inter' , fonts : [ { src : '/fonts/Inter.ttf' } , { fontWeight : 700 , src : '/fonts/Inter-Bold.ttf' } ] } ;

        expect( registerFonts( Font , family ) ).toEqual( [ 'Inter' ] ) ;
        expect( registerFonts( Font , family ) ).toEqual( [] ) ;
        expect( registerFonts( Font , [ family , { family : 'Mono' , src : '/fonts/Mono.ttf' } ] ) ).toEqual( [ 'Mono' ] ) ;

        expect( Font.calls ).toHaveLength( 2 ) ;
        expect( Font.calls[ 1 ] ).toEqual( { family : 'Mono' , fonts : [ { fontStyle : undefined , fontWeight : undefined , src : '/fonts/Mono.ttf' } ] } ) ;
    } ) ;

    test( 'two Font objects are two registries' , () =>
    {
        const family = { family : 'Inter' , src : '/fonts/Inter.ttf' } ;

        expect( registerFonts( fakeFont() , family ) ).toEqual( [ 'Inter' ] ) ;
        expect( registerFonts( fakeFont() , family ) ).toEqual( [ 'Inter' ] ) ;
    } ) ;

    test( 'nothing to register, nothing registered' , () =>
    {
        const Font = fakeFont() ;

        expect( registerFonts( Font , { family : 'Empty' } ) ).toEqual( [] ) ;
        expect( registerFonts( null , { family : 'Inter' , src : 'x' } ) ).toEqual( [] ) ;
        expect( Font.calls ).toHaveLength( 0 ) ;
    } ) ;
} ) ;

describe( 'uploadPdf' , () =>
{
    const blob = new Blob( [ '%PDF-1.4' ] , { type : 'application/pdf' } ) ;

    test( 'sends the blob as a named file, the fields beside it, the headers as given' , async () =>
    {
        let received ;

        const fetch = async ( url , init ) =>
        {
            received = { init , url } ;
            return new Response( '{"id":42}' , { status : 201 } ) ;
        } ;

        const response = await uploadPdf( '/api/documents' , blob , { fetch , fields : { order : '2026-0042' } , fileName : 'facture.pdf' , headers : { Authorization : 'Bearer x' } } ) ;

        expect( received.url ).toBe( '/api/documents' ) ;
        expect( received.init.method ).toBe( 'POST' ) ;
        expect( received.init.headers ).toEqual( { Authorization : 'Bearer x' } ) ;

        const body = received.init.body ;

        expect( body ).toBeInstanceOf( FormData ) ;
        expect( body.get( 'file' ) ).toBeInstanceOf( Blob ) ;
        expect( body.get( 'file' ).name ).toBe( 'facture.pdf' ) ;
        expect( body.get( 'order' ) ).toBe( '2026-0042' ) ;

        expect( await response.json() ).toEqual( { id : 42 } ) ;
    } ) ;

    test( 'a server that says no is an error carrying its answer' , async () =>
    {
        const fetch = async () => new Response( 'nope' , { status : 413 } ) ;

        const failure = await uploadPdf( '/api/documents' , blob , { fetch } ).catch( error => error ) ;

        expect( failure ).toBeInstanceOf( Error ) ;
        expect( failure.status ).toBe( 413 ) ;
        expect( await failure.response.text() ).toBe( 'nope' ) ;
    } ) ;
} ) ;
