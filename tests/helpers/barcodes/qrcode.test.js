import { describe , expect , test } from 'bun:test' ;

import QRCodeCapacityError from '../../../src/helpers/barcodes/QRCodeCapacityError' ;
import encodeQRCode        from '../../../src/helpers/barcodes/encodeQRCode' ;
import matrixToPath        from '../../../src/helpers/barcodes/matrixToPath' ;
import matrixToSvg         from '../../../src/helpers/barcodes/matrixToSvg' ;

import measureQRCode , { QR_CAPACITY , getQRCodeMode } from '../../../src/helpers/barcodes/measureQRCode' ;

describe( 'encodeQRCode' , () =>
{
    test( 'a version-1 code is 21 modules, plus 4 of quiet zone on each side' , () =>
    {
        const matrix = encodeQRCode( 'HELLO' ) ;

        expect( matrix ).toHaveLength( 29 ) ;
        expect( matrix.every( row => row.length === 29 ) ).toBe( true ) ;
        expect( matrix[ 0 ].every( dark => !dark ) ).toBe( true ) ;
    } ) ;

    test( 'a quiet zone of 0 is raised to 1, the least the encoder takes' , () =>
    {
        expect( encodeQRCode( 'HELLO' , { quietZone : 0 } ) ).toHaveLength( 23 ) ;
    } ) ;

    test( 'an unknown level falls back to medium' , () =>
    {
        expect( encodeQRCode( 'HELLO' , { ecc : 'max' } ) ).toEqual( encodeQRCode( 'HELLO' , { ecc : 'medium' } ) ) ;
    } ) ;
} ) ;

describe( 'QR_CAPACITY' , () =>
{
    // Each limit checked against the encoder at its exact boundary : the limit fits, one more does not.
    const SAMPLE = { alphanumeric : 'A' , byte : 'a' , numeric : '7' } ;

    for ( const [ ecc , limits ] of Object.entries( QR_CAPACITY ) )
    {
        for ( const [ mode , capacity ] of Object.entries( limits ) )
        {
            test( `${ ecc } · ${ mode } holds ${ capacity }` , () =>
            {
                expect( () => encodeQRCode( SAMPLE[ mode ].repeat( capacity ) , { ecc } ) ).not.toThrow() ;
                expect( () => encodeQRCode( SAMPLE[ mode ].repeat( capacity + 1 ) , { ecc } ) ).toThrow( QRCodeCapacityError ) ;
            } ) ;
        }
    }
} ) ;

describe( 'measureQRCode' , () =>
{
    test.each(
    [
        [ '0123456789' , 'numeric' ] ,
        [ 'ABC 123'    , 'alphanumeric' ] ,
        [ 'abc'        , 'byte' ] ,
    ] )( '%s is measured in %s mode' , ( value , mode ) =>
    {
        expect( getQRCodeMode( value ) ).toBe( mode ) ;
    } ) ;

    test( 'byte mode counts UTF-8 bytes : two for an accent, four for an emoji' , () =>
    {
        expect( measureQRCode( 'été' ).length ).toBe( 5 ) ;
        expect( measureQRCode( '😀' ).length ).toBe( 4 ) ;
    } ) ;

    test( 'the capacity follows the level' , () =>
    {
        expect( measureQRCode( 'été' , { ecc : 'high' } ) ).toEqual( { capacity : 1273 , ecc : 'high' , fits : true , length : 5 , mode : 'byte' } ) ;
    } ) ;
} ) ;

describe( 'QRCodeCapacityError' , () =>
{
    test( 'names the mode, the length and the limit' , () =>
    {
        try
        {
            encodeQRCode( 'x'.repeat( 5000 ) ) ;
            throw new Error( 'not refused' ) ;
        }
        catch ( error )
        {
            expect( error ).toBeInstanceOf( QRCodeCapacityError ) ;
            expect( error.message ).toBe( 'Too long for a QR code : 5000 bytes, 2331 at most with ecc "medium".' ) ;
            expect( [ error.mode , error.length , error.capacity , error.ecc ] ).toEqual( [ 'byte' , 5000 , 2331 , 'medium' ] ) ;
            expect( error.cause?.message ).toBe( 'Capacity overflow' ) ;
        }
    } ) ;
} ) ;

describe( 'matrixToPath and matrixToSvg' , () =>
{
    test( 'neighbouring dark modules of a row merge into one rectangle' , () =>
    {
        expect( matrixToPath( [ [ true , true , false , true ] ] ) ).toBe( 'M0 0h2v1h-2z M3 0h1v1h-1z' ) ;
    } ) ;

    test( 'the SVG is sized by scale and drawn in modules' , () =>
    {
        const svg = matrixToSvg( encodeQRCode( 'HELLO' ) , { scale : 4 } ) ;

        expect( svg ).toContain( 'width="116" height="116" viewBox="0 0 29 29"' ) ;
    } ) ;
} ) ;
