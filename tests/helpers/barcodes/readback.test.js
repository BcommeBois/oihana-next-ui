import { describe , expect , test } from 'bun:test' ;

import encodeBarcode from '../../../src/helpers/barcodes/encodeBarcode' ;
import encodeQRCode  from '../../../src/helpers/barcodes/encodeQRCode' ;
import layoutBarcode from '../../../src/helpers/barcodes/layoutBarcode' ;

import { matrixImage , read , symbolImage } from '../../support/zxing' ;

// Every code the library draws, rasterized and read back by ZXing — the reader
// the camera scanner falls back on. The encoders were checked against the
// standards' tables ; here a reader that owes them nothing has the last word.

const readBarcode = ( value , options = {} , layout = {} ) => read( symbolImage( layoutBarcode( encodeBarcode( value , options ) , layout ) ) ) ;

describe( 'QR codes read back' , () =>
{
    test.each(
    [
        [ 'a URL'             , 'https://oihana-next-ui.vercel.app' ] ,
        [ 'accents and emoji' , 'Été à Zürich — ça marche ✅' ] ,
        [ 'digits only'       , '01234567890123456789' ] ,
        [ 'alphanumeric'      , 'LOT 2026-001/A' ] ,
        [ 'a Wi-Fi access'    , 'WIFI:T:WPA;S:Atelier;P:demo-password;;' ] ,
        [ 'a long text'       , 'x'.repeat( 1200 ) ] ,
    ] )( '%s' , async ( _ , value ) =>
    {
        const [ result ] = await read( matrixImage( encodeQRCode( value ) ) ) ;

        expect( result?.format ).toBe( 'QRCode' ) ;
        expect( result?.text ).toBe( value ) ;
    } ) ;

    test.each( [ 'low' , 'medium' , 'quartile' , 'high' ] )( 'at ecc « %s »' , async ecc =>
    {
        const [ result ] = await read( matrixImage( encodeQRCode( 'ABC-1234' , { ecc } ) ) ) ;
        expect( result?.text ).toBe( 'ABC-1234' ) ;
    } ) ;
} ) ;

describe( 'Code 128 read back' , () =>
{
    test.each(
    [
        [ 'text in set B'               , 'PJJ123C' ] ,
        [ 'digits in set C'             , '12345678' ] ,
        [ 'an odd run of digits'        , '12345' ] ,
        [ 'switching B → C → B'         , 'AB12345678CD' ] ,
        [ 'lower case and punctuation'  , 'lot-2026/a_b.c' ] ,
        [ 'a control character, set A'  , 'A\tB' ] ,
        [ 'A after a control character' , '\tab' ] ,
    ] )( '%s' , async ( _ , value ) =>
    {
        const [ result ] = await readBarcode( value ) ;

        expect( result?.format ).toBe( 'Code128' ) ;
        expect( result?.text ).toBe( value ) ;
    } ) ;
} ) ;

describe( 'GS1-128 read back' , () =>
{
    test.each(
    [
        '(00)106141411234567897' ,
        '(01)09501101530003(10)ABC123' ,
        '(01)09501101530003(17)261231(10)LOT-42' ,
        '(10)AB12(17)261231' ,
        '(02)09501101530003(37)24(400)PO-2026-118' ,
    ] )( '%s', async value =>
    {
        const [ result ] = await readBarcode( value , { format : 'gs1_128' } ) ;

        // ]C1 : the reader found FNC1 right after the start symbol — a GS1-128, not a plain Code 128.
        expect( result?.symbologyIdentifier ).toBe( ']C1' ) ;
        expect( result?.text ).toBe( value ) ;
    } ) ;
} ) ;

describe( 'EAN, UPC and ITF read back' , () =>
{
    test.each(
    [
        [ 'ean_13' , '4006381333931' , 'EAN13' , '4006381333931' ] ,
        [ 'ean_13' , '5901234123457' , 'EAN13' , '5901234123457' ] ,
        [ 'ean_8'  , '96385074'      , 'EAN8'  , '96385074' ] ,
        [ 'upc_a'  , '036000291452'  , 'EAN13' , '0036000291452' ] , // a UPC-A is the EAN-13 of its number with a leading 0
        [ 'itf_14' , '15400141288763' , 'ITF'  , '15400141288763' ] ,
    ] )( '%s %s' , async ( format , value , expectedFormat , expectedText ) =>
    {
        const [ result ] = await readBarcode( value , { format } ) ;

        expect( result?.format ).toBe( expectedFormat ) ;
        expect( result?.text ).toBe( expectedText ) ;
    } ) ;

    test( 'a check digit computed by the encoder is the one the reader expects' , async () =>
    {
        const [ result ] = await readBarcode( '400638133393' , { format : 'ean_13' } ) ;
        expect( result?.text ).toBe( '4006381333931' ) ;
    } ) ;
} ) ;

describe( 'layouts read back' , () =>
{
    test.each( [ 'retail' , 'simple' ] )( 'EAN-13 in the %s layout' , async textLayout =>
    {
        const [ result ] = await readBarcode( '4006381333931' , { format : 'ean_13' } , { textLayout } ) ;
        expect( result?.text ).toBe( '4006381333931' ) ;
    } ) ;

    test.each( [ 'frame' , 'bars' , 'none' ] )( 'ITF-14 with bearer « %s »' , async bearer =>
    {
        const [ result ] = await readBarcode( '15400141288763' , { format : 'itf_14' } , { bearer } ) ;
        expect( result?.text ).toBe( '15400141288763' ) ;
    } ) ;

    test( 'no vertical margin at all' , async () =>
    {
        const [ result ] = await readBarcode( 'ABC-1234' , {} , { verticalMargin : 0 } ) ;
        expect( result?.text ).toBe( 'ABC-1234' ) ;
    } ) ;
} ) ;
