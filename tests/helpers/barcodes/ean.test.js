import { describe , expect , test } from 'bun:test' ;

import encodeBarcode , { BARCODE_FORMATS } from '../../../src/helpers/barcodes/encodeBarcode' ;
import gs1CheckDigit                       from '../../../src/helpers/barcodes/gs1CheckDigit' ;

import { encodeEAN13 , encodeEAN8 , encodeUPCA } from '../../../src/helpers/barcodes/encodeEAN' ;

const bits = modules => modules.map( dark => ( dark ? '1' : '0' ) ).join( '' ) ;

describe( 'gs1CheckDigit' , () =>
{
    // Published numbers whose check digit is known.
    test.each(
    [
        [ '400638133393' , 1 ] , // EAN-13 4006381333931
        [ '590123412345' , 7 ] , // EAN-13 5901234123457
        [ '9638507'      , 4 ] , // EAN-8  96385074
        [ '03600029145'  , 2 ] , // UPC-A  036000291452
        [ '01234567890'  , 5 ] , // UPC-A  012345678905
    ] )( '%s → %d' , ( digits , expected ) =>
    {
        expect( gs1CheckDigit( digits ) ).toBe( expected ) ;
    } ) ;
} ) ;

describe( 'encodeEAN13' , () =>
{
    test( '4006381333931 : first digit 4, so the left half reads L G L L G G' , () =>
    {
        const expected =
            '101' +
            '0001101' + '0100111' + '0101111' + '0111101' + '0001001' + '0110011' + // 0 L · 0 G · 6 L · 3 L · 8 G · 1 G
            '01010' +
            '1000010' + '1000010' + '1000010' + '1110100' + '1000010' + '1100110' + // 3 3 3 9 3 1, all R
            '101' ;

        expect( bits( encodeEAN13( '4006381333931' ).modules ) ).toBe( expected ) ;
    } ) ;

    test( 'is 95 modules wide' , () =>
    {
        expect( encodeEAN13( '5901234123457' ).modules ).toHaveLength( 95 ) ;
    } ) ;

    test( '12 digits : the check digit is computed' , () =>
    {
        expect( encodeEAN13( '400638133393' ).text ).toBe( '4006381333931' ) ;
    } ) ;

    test( 'a wrong check digit is refused, with the right one' , () =>
    {
        try
        {
            encodeEAN13( '4006381333930' ) ;
            throw new Error( 'not refused' ) ;
        }
        catch ( error )
        {
            expect( error.reason ).toBe( 'checkDigit' ) ;
            expect( error.data ).toEqual( { expected : 1 , given : 0 } ) ;
        }
    } ) ;

    test( 'letters and wrong lengths are refused' , () =>
    {
        expect( () => encodeEAN13( '40063813339A' ) ).toThrow( 'carries digits only' ) ;
        expect( () => encodeEAN13( '40063813' ) ).toThrow( '12 digits, or 13' ) ;
    } ) ;

    test( 'the retail layout places the first digit outside, on the left' , () =>
    {
        const { retail } = encodeEAN13( '4006381333931' ) ;
        expect( retail.digits ).toHaveLength( 13 ) ;
        expect( retail.digits[ 0 ] ).toEqual( { value : '4' , x : -4 } ) ;
        expect( retail.digits[ 1 ].x ).toBe( 6.5 ) ;
        expect( retail.digits[ 7 ].x ).toBe( 53.5 ) ;
    } ) ;
} ) ;

describe( 'encodeEAN8' , () =>
{
    test( '96385074 : four L digits, then four R' , () =>
    {
        const expected =
            '101' +
            '0001011' + '0101111' + '0111101' + '0110111' + // 9 6 3 8, L
            '01010' +
            '1001110' + '1110010' + '1000100' + '1011100' + // 5 0 7 4, R
            '101' ;

        expect( bits( encodeEAN8( '96385074' ).modules ) ).toBe( expected ) ;
    } ) ;

    test( '7 digits : the check digit is computed' , () =>
    {
        expect( encodeEAN8( '9638507' ).text ).toBe( '96385074' ) ;
    } ) ;
} ) ;

describe( 'encodeUPCA' , () =>
{
    test( 'draws the bars of the EAN-13 with a leading 0' , () =>
    {
        expect( encodeUPCA( '036000291452' ).modules ).toEqual( encodeEAN13( '0036000291452' ).modules ) ;
    } ) ;

    test( 'prints its outer digits small, outside the bars' , () =>
    {
        const { digits } = encodeUPCA( '036000291452' ).retail ;
        expect( digits[ 0 ] ).toEqual( { value : '0' , x : -4.5 , small : true } ) ;
        expect( digits.at( -1 ) ).toEqual( { value : '2' , x : 99.5 , small : true } ) ;
    } ) ;
} ) ;

describe( 'encodeBarcode' , () =>
{
    test( 'speaks the names of the Barcode Detection API' , () =>
    {
        expect( BARCODE_FORMATS ).toEqual( [ 'code_128' , 'ean_13' , 'ean_8' , 'gs1_128' , 'itf_14' , 'upc_a' ] ) ;
    } ) ;

    test( 'refuses an unknown format' , () =>
    {
        expect( () => encodeBarcode( '123' , { format : 'qr' } ) ).toThrow( 'Unknown barcode format' ) ;
    } ) ;
} ) ;
