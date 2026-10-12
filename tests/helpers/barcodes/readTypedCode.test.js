import { describe , expect , test } from 'bun:test' ;

import BarcodeContentError from '../../../src/helpers/barcodes/BarcodeContentError' ;
import encodeBarcode       from '../../../src/helpers/barcodes/encodeBarcode' ;
import layoutBarcode       from '../../../src/helpers/barcodes/layoutBarcode' ;
import readTypedCode       from '../../../src/helpers/barcodes/readTypedCode' ;

import normalizeScan , { GS , joinGS1 , splitGS1 } from '../../../src/helpers/barcodes/normalizeScan' ;
import { ZXING_FORMATS } from '../../../src/components/barcodes/engine' ;

import { read , symbolImage } from '../../support/zxing' ;

describe( 'joinGS1' , () =>
{
    test( 'a separator after a variable-length element that is not last, none after a fixed one' , () =>
    {
        expect( joinGS1( [ { ai : '10' , data : 'AB12' } , { ai : '17' , data : '261231' } ] ) ).toBe( `10AB12${ GS }17261231` ) ;
        expect( joinGS1( [ { ai : '01' , data : '09501101530003' } , { ai : '10' , data : 'LOT-42' } ] ) ).toBe( '0109501101530003' + '10LOT-42' ) ;
    } ) ;

    test( 'is the inverse of splitGS1' , () =>
    {
        const elements = [ { ai : '02' , data : '09501101530003' } , { ai : '37' , data : '24' } , { ai : '400' , data : 'PO-118' } ] ;
        expect( splitGS1( joinGS1( elements ) ) ).toEqual( elements ) ;
    } ) ;
} ) ;

describe( 'readTypedCode' , () =>
{
    test( 'plain text is trimmed, nothing was seen so no format' , () =>
    {
        expect( readTypedCode( '  ABC-1234 ' ) ).toEqual( { elements : null , format : null , gs1 : false , rawValue : 'ABC-1234' , symbology : null , value : 'ABC-1234' } ) ;
    } ) ;

    test( 'a GS1 element string typed as on a label' , () =>
    {
        const reading = readTypedCode( '(01)09501101530003(17)261231(10)LOT-42' ) ;

        expect( reading.gs1 ).toBe( true ) ;
        expect( reading.rawValue ).toBe( '(01)09501101530003(17)261231(10)LOT-42' ) ;
        expect( reading.elements ).toEqual( [ { ai : '01' , data : '09501101530003' } , { ai : '17' , data : '261231' } , { ai : '10' , data : 'LOT-42' } ] ) ;
    } ) ;

    test( 'a mistyped check digit is refused, with the element that is wrong' , () =>
    {
        try
        {
            readTypedCode( '(01)09501101530004' ) ;
            throw new Error( 'not refused' ) ;
        }
        catch ( error )
        {
            expect( error ).toBeInstanceOf( BarcodeContentError ) ;
            expect( error.reason ).toBe( 'checkDigit' ) ;
            expect( error.data.ai ).toBe( '01' ) ;
        }
    } ) ;

    test.each(
    [
        '(00)106141411234567897' ,
        '(01)09501101530003(10)ABC123' ,
        '(10)AB12(17)261231' ,
        '(02)09501101530003(37)24(400)PO-2026-118' ,
    ] )( 'typed or scanned, %s is the same value' , async element =>
    {
        const [ result ] = await read( symbolImage( layoutBarcode( encodeBarcode( element , { format : 'gs1_128' } ) ) ) , { textMode : 'Plain' } ) ;
        const format     = Object.keys( ZXING_FORMATS ).find( name => ZXING_FORMATS[ name ] === result.format ) ;
        const scanned    = normalizeScan( { ...result , format , rawValue : result.text } ) ;
        const typed      = readTypedCode( element ) ;

        expect( typed.value ).toBe( scanned.value ) ;
        expect( typed.elements ).toEqual( scanned.elements ) ;
    } ) ;
} ) ;
