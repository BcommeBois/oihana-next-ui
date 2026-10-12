import { describe , expect , test } from 'bun:test' ;

import encodeBarcode from '../../../src/helpers/barcodes/encodeBarcode' ;
import encodeGS1_128 , { parseGS1 } from '../../../src/helpers/barcodes/encodeGS1_128' ;

// Expected values worked out by hand : FNC1 (102) after the start symbol, set C
// (the pair itself) for digits, set B (ASCII − 32) for the rest, the check
// symbol as start + Σ value × position, modulo 103. The GTIN 09501101530003 and
// the SSCC 106141411234567897 are GS1's own examples.

const refusal = run =>
{
    try
    {
        run() ;
    }
    catch ( error )
    {
        return error ;
    }
    throw new Error( 'not refused' ) ;
} ;

describe( 'parseGS1' , () =>
{
    test( 'splits the element string into AIs and data' , () =>
    {
        expect( parseGS1( '(01)09501101530003(10)ABC123' ) ).toEqual( [ { ai : '01' , data : '09501101530003' } , { ai : '10' , data : 'ABC123' } ] ) ;
    } ) ;

    test( 'refuses what is not (AI)data' , () =>
    {
        expect( refusal( () => parseGS1( '01)0950' ) ).reason ).toBe( 'syntax' ) ;
        expect( refusal( () => parseGS1( '(1)0950' ) ).reason ).toBe( 'syntax' ) ;
        expect( refusal( () => parseGS1( '(10)' ) ).data ).toEqual( { ai : '10' } ) ;
    } ) ;
} ) ;

describe( 'encodeGS1_128' , () =>
{
    test( 'a GTIN then a lot : FNC1 first, set C, no separator after the fixed-length (01)' , () =>
    {
        expect( encodeGS1_128( '(01)09501101530003(10)ABC123' ).values )
            .toEqual( [ 105 , 102 , 1 , 9 , 50 , 11 , 1 , 53 , 0 , 3 , 10 , 100 , 33 , 34 , 35 , 17 , 18 , 19 , 66 , 106 ] ) ;
    } ) ;

    test( 'a variable AI that is not last is closed by a FNC1, and set C resumes after it' , () =>
    {
        expect( encodeGS1_128( '(10)AB12(17)261231' ).values )
            .toEqual( [ 104 , 102 , 17 , 16 , 33 , 34 , 17 , 18 , 102 , 99 , 17 , 26 , 12 , 31 , 26 , 106 ] ) ;
    } ) ;

    test( 'an SSCC, all in set C' , () =>
    {
        expect( encodeGS1_128( '(00)106141411234567897' ).values )
            .toEqual( [ 105 , 102 , 0 , 10 , 61 , 41 , 41 , 12 , 34 , 56 , 78 , 97 , 34 , 106 ] ) ;
    } ) ;

    test( 'the text is spaced by default, compact on request' , () =>
    {
        expect( encodeGS1_128( '(01)09501101530003(10)ABC123' ).text ).toBe( '(01) 09501101530003 (10) ABC123' ) ;
        expect( encodeGS1_128( '(01)09501101530003(10)ABC123' , { gs1Text : 'compact' } ).text ).toBe( '(01)09501101530003(10)ABC123' ) ;
        expect( encodeBarcode( '(10)A' , { format : 'gs1_128' , gs1Text : 'compact' } ).text ).toBe( '(10)A' ) ;
    } ) ;

    test( 'a wrong check digit in a GTIN or an SSCC is refused' , () =>
    {
        expect( refusal( () => encodeGS1_128( '(01)09501101530004' ) ).data ).toEqual( { ai : '01' , expected : 3 , given : 4 } ) ;
        expect( refusal( () => encodeGS1_128( '(00)106141411234567890' ) ).reason ).toBe( 'checkDigit' ) ;
    } ) ;

    test( 'a fixed-length AI with the wrong length or letters is refused' , () =>
    {
        expect( refusal( () => encodeGS1_128( '(01)0950110153000' ) ).data ).toEqual( { ai : '01' , expected : 14 , length : 13 } ) ;
        expect( refusal( () => encodeGS1_128( '(17)26123A' ) ).reason ).toBe( 'characters' ) ;
        expect( refusal( () => encodeGS1_128( '(310)123456' ) ).reason ).toBe( 'syntax' ) ;
    } ) ;

    test( 'a known variable AI is held to its length and kind' , () =>
    {
        expect( refusal( () => encodeGS1_128( `(10)${ 'A'.repeat( 21 ) }` ) ).data ).toEqual( { ai : '10' , expected : 20 , length : 21 } ) ;
        expect( refusal( () => encodeGS1_128( '(37)12A' ) ).reason ).toBe( 'characters' ) ;
    } ) ;

    test( 'an unknown AI is accepted, held to the GS1 character set' , () =>
    {
        expect( encodeGS1_128( '(7003)2612311200' ).text ).toBe( '(7003) 2612311200' ) ;
        expect( refusal( () => encodeGS1_128( '(99)café' ) ).data ).toEqual( { ai : '99' , character : 'é' } ) ;
    } ) ;

    test( 'no more than 48 data characters, AIs included' , () =>
    {
        expect( refusal( () => encodeGS1_128( `(10)${ 'A'.repeat( 20 ) }(21)${ 'B'.repeat( 20 ) }(91)ABCD` ) ).data ).toEqual( { expected : 48 , length : 50 } ) ;
    } ) ;

    test( 'an empty content is refused' , () =>
    {
        expect( refusal( () => encodeGS1_128( '' ) ).reason ).toBe( 'empty' ) ;
    } ) ;
} ) ;
