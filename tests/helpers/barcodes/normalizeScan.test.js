import { describe , expect , test } from 'bun:test' ;

import encodeBarcode from '../../../src/helpers/barcodes/encodeBarcode' ;
import layoutBarcode from '../../../src/helpers/barcodes/layoutBarcode' ;

import normalizeScan , { GS , splitGS1 } from '../../../src/helpers/barcodes/normalizeScan' ;
import { ZXING_FORMATS } from '../../../src/components/barcodes/engine' ;

import { read , symbolImage } from '../../support/zxing' ;

describe( 'splitGS1' , () =>
{
    test( 'fixed-length elements need no separator' , () =>
    {
        expect( splitGS1( '0109501101530003' + '17261231' ) ).toEqual( [ { ai : '01' , data : '09501101530003' } , { ai : '17' , data : '261231' } ] ) ;
    } ) ;

    test( 'a variable-length element runs to the separator, or to the end' , () =>
    {
        expect( splitGS1( '10AB12' + GS + '17261231' ) ).toEqual( [ { ai : '10' , data : 'AB12' } , { ai : '17' , data : '261231' } ] ) ;
        expect( splitGS1( '0109501101530003' + '10ABC123' ) ).toEqual( [ { ai : '01' , data : '09501101530003' } , { ai : '10' , data : 'ABC123' } ] ) ;
    } ) ;

    test( 'AIs of three and four digits are read by their first two' , () =>
    {
        expect( splitGS1( '3103001250' + '400PO-118' ) ).toEqual( [ { ai : '3103' , data : '001250' } , { ai : '400' , data : 'PO-118' } ] ) ;
    } ) ;

    test( 'an SSCC alone' , () =>
    {
        expect( splitGS1( '00106141411234567897' ) ).toEqual( [ { ai : '00' , data : '106141411234567897' } ] ) ;
    } ) ;

    test( 'what cannot be split gives null' , () =>
    {
        expect( splitGS1( 'X00241QHIZ' ) ).toBeNull() ;          // not an AI
        expect( splitGS1( '0109501101' ) ).toBeNull() ;          // a GTIN cut short
        expect( splitGS1( '10' + GS + '17261231' ) ).toBeNull() ; // an empty element
        expect( splitGS1( '' ) ).toBeNull() ;
    } ) ;
} ) ;

describe( 'normalizeScan' , () =>
{
    test( 'Android puts ]C1 in the text : taken off, kept as the symbology, GS1 known' , () =>
    {
        expect( normalizeScan( { format : 'code_128' , rawValue : ']C100106141411234567897' } ) ).toEqual(
        {
            elements  : [ { ai : '00' , data : '106141411234567897' } ] ,
            format    : 'code_128' ,
            gs1       : true ,
            rawValue  : ']C100106141411234567897' ,
            symbology : ']C1' ,
            value     : '00106141411234567897' ,
        } ) ;
    } ) ;

    test( 'ZXing keeps it apart : the same reading' , () =>
    {
        const reading = normalizeScan( { contentType : 'GS1' , format : 'code_128' , rawValue : '00106141411234567897' , symbologyIdentifier : ']C1' } ) ;

        expect( reading.value ).toBe( '00106141411234567897' ) ;
        expect( reading.symbology ).toBe( ']C1' ) ;
        expect( reading.gs1 ).toBe( true ) ;
        expect( reading.elements ).toEqual( [ { ai : '00' , data : '106141411234567897' } ] ) ;
    } ) ;

    test( 'a GS1 identifier with data that is not an element string : GS1, elements unknown' , () =>
    {
        const reading = normalizeScan( { format : 'code_128' , rawValue : ']C1X00241QHIZ' } ) ;

        expect( reading.value ).toBe( 'X00241QHIZ' ) ;
        expect( reading.gs1 ).toBe( true ) ;
        expect( reading.elements ).toBeNull() ;
    } ) ;

    test( 'a separator inside a Code 128 means GS1 even without an identifier' , () =>
    {
        const reading = normalizeScan( { format : 'code_128' , rawValue : '10AB12' + GS + '17261231' } ) ;

        expect( reading.gs1 ).toBe( true ) ;
        expect( reading.elements ).toHaveLength( 2 ) ;
    } ) ;

    test( 'a leading separator stands for the FNC1 : taken off, GS1 known' , () =>
    {
        const reading = normalizeScan( { format : 'code_128' , rawValue : GS + '0109501101530003' } ) ;

        expect( reading.value ).toBe( '0109501101530003' ) ;
        expect( reading.gs1 ).toBe( true ) ;
    } ) ;

    test( 'a plain Code 128 is left alone' , () =>
    {
        expect( normalizeScan( { format : 'code_128' , rawValue : 'ABC-1234' , symbologyIdentifier : ']C0' } ) ).toEqual(
        {
            elements  : null ,
            format    : 'code_128' ,
            gs1       : false ,
            rawValue  : 'ABC-1234' ,
            symbology : ']C0' ,
            value     : 'ABC-1234' ,
        } ) ;
    } ) ;

    test( 'an identifier is only taken off when it names the format read' , () =>
    {
        expect( normalizeScan( { format : 'qr_code' , rawValue : ']C1 is just text' } ).value ).toBe( ']C1 is just text' ) ;
        expect( normalizeScan( { format : 'ean_13' , rawValue : ']E04006381333931' } ).value ).toBe( '4006381333931' ) ;
    } ) ;

    test( 'nothing read, nothing broken' , () =>
    {
        expect( normalizeScan( { format : 'qr_code' } ) ).toEqual( { elements : null , format : 'qr_code' , gs1 : false , rawValue : '' , symbology : null , value : '' } ) ;
    } ) ;
} ) ;

describe( 'the ZXing engine and normalizeScan, on the library\'s own codes' , () =>
{
    // Read as the engine reads : « Plain » text, the symbology identifier and the content type kept.
    const scan = async ( value , options ) =>
    {
        const [ result ] = await read( symbolImage( layoutBarcode( encodeBarcode( value , options ) ) ) , { textMode : 'Plain' } ) ;
        const format = Object.keys( ZXING_FORMATS ).find( name => ZXING_FORMATS[ name ] === result.format ) ;
        return normalizeScan( { ...result , format , rawValue : result.text } ) ;
    } ;

    test.each(
    [
        '(00)106141411234567897' ,
        '(01)09501101530003(10)ABC123' ,
        '(01)09501101530003(17)261231(10)LOT-42' ,
        '(10)AB12(17)261231' ,
        '(02)09501101530003(37)24(400)PO-2026-118' ,
    ] )( 'GS1-128 %s : gs1, and the elements it was drawn from' , async element =>
    {
        const reading = await scan( element , { format : 'gs1_128' } ) ;

        expect( reading.gs1 ).toBe( true ) ;
        expect( reading.symbology ).toBe( ']C1' ) ;
        expect( reading.elements ).toEqual( encodeBarcode( element , { format : 'gs1_128' } ).elements ) ;
    } ) ;

    test( 'a plain Code 128 of digits is not taken for GS1' , async () =>
    {
        const reading = await scan( '0109501101530003' ) ;

        expect( reading.gs1 ).toBe( false ) ;
        expect( reading.symbology ).toBe( ']C0' ) ;
        expect( reading.value ).toBe( '0109501101530003' ) ;
    } ) ;
} ) ;
