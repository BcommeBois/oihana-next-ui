import { describe , expect , test } from 'bun:test' ;

import BarcodeContentError from '../../../src/helpers/barcodes/BarcodeContentError' ;
import encodeCode128 , { CODE128_PATTERNS , STOP } from '../../../src/helpers/barcodes/encodeCode128' ;

// Expected values are worked out by hand from the Code 128 tables (set B :
// ASCII − 32 ; set A control characters : ASCII + 64 ; set C : the pair itself),
// and the check symbol as start + Σ value × position, modulo 103.

describe( 'CODE128_PATTERNS' , () =>
{
    test( 'holds the 107 symbols' , () =>
    {
        expect( CODE128_PATTERNS ).toHaveLength( 107 ) ;
    } ) ;

    test( 'every symbol is 11 modules wide, the stop 13' , () =>
    {
        CODE128_PATTERNS.forEach( ( pattern , value ) =>
        {
            const width = Array.from( pattern , Number ).reduce( ( sum , item ) => sum + item , 0 ) ;
            expect( width ).toBe( value === STOP ? 13 : 11 ) ;
        } ) ;
    } ) ;

    test( 'no two symbols share a pattern' , () =>
    {
        expect( new Set( CODE128_PATTERNS ).size ).toBe( 107 ) ;
    } ) ;
} ) ;

describe( 'encodeCode128' , () =>
{
    test( 'text stays in set B' , () =>
    {
        expect( encodeCode128( 'PJJ123C' ).values ).toEqual( [ 104 , 48 , 42 , 42 , 17 , 18 , 19 , 35 , 55 , 106 ] ) ;
    } ) ;

    test( 'an even run of digits alone starts in set C' , () =>
    {
        expect( encodeCode128( '1234' ).values ).toEqual( [ 105 , 12 , 34 , 82 , 106 ] ) ;
    } ) ;

    test( 'three digits are not worth set C' , () =>
    {
        expect( encodeCode128( '123' ).values ).toEqual( [ 104 , 17 , 18 , 19 , 8 , 106 ] ) ;
    } ) ;

    test( 'an odd run starts in C and finishes its last digit in B' , () =>
    {
        expect( encodeCode128( '12345' ).values ).toEqual( [ 105 , 12 , 34 , 100 , 21 , 54 , 106 ] ) ;
    } ) ;

    test( 'six digits in the middle switch to C and back' , () =>
    {
        expect( encodeCode128( 'AB12345678CD' ).values ).toEqual( [ 104 , 33 , 34 , 99 , 12 , 34 , 56 , 78 , 100 , 35 , 36 , 90 , 106 ] ) ;
    } ) ;

    test( 'a control character met first starts in set A' , () =>
    {
        expect( encodeCode128( 'A\tB' ).values ).toEqual( [ 103 , 33 , 73 , 34 , 75 , 106 ] ) ;
    } ) ;

    test( 'lower case after a control character switches from A to B' , () =>
    {
        expect( encodeCode128( '\tab' ).values ).toEqual( [ 103 , 73 , 100 , 65 , 66 , 11 , 106 ] ) ;
    } ) ;

    test( 'modules : 11 per symbol, 13 for the stop, bar first and last' , () =>
    {
        const { modules , values } = encodeCode128( 'ABC-1234' ) ;
        expect( modules ).toHaveLength( ( values.length - 1 ) * 11 + 13 ) ;
        expect( modules[ 0 ] ).toBe( true ) ;
        expect( modules.at( -1 ) ).toBe( true ) ;
    } ) ;

    test( 'the text leaves the control characters out' , () =>
    {
        expect( encodeCode128( 'A\tB' ).text ).toBe( 'AB' ) ;
    } ) ;

    test( 'a character outside ASCII is refused' , () =>
    {
        expect( () => encodeCode128( 'café' ) ).toThrow( BarcodeContentError ) ;

        try
        {
            encodeCode128( 'café' ) ;
        }
        catch ( error )
        {
            expect( error.reason ).toBe( 'characters' ) ;
            expect( error.data ).toEqual( { character : 'é' , position : 3 } ) ;
        }
    } ) ;

    test( 'an empty value is refused' , () =>
    {
        expect( () => encodeCode128( '' ) ).toThrow( 'Nothing to encode.' ) ;
    } ) ;
} ) ;
