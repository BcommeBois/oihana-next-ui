import { describe , expect , test } from 'bun:test' ;

import barcodeToSvg  from '../../../src/helpers/barcodes/barcodeToSvg' ;
import encodeBarcode from '../../../src/helpers/barcodes/encodeBarcode' ;
import symbolToPath  from '../../../src/helpers/barcodes/symbolToPath' ;

import layoutBarcode , { GUARD_EXTENSION , TEXT_SIZES , VERTICAL_MARGIN } from '../../../src/helpers/barcodes/layoutBarcode' ;

const ean13 = () => encodeBarcode( '4006381333931' , { format : 'ean_13' } ) ;

describe( 'layoutBarcode' , () =>
{
    test( 'the width is the bars plus the quiet zone of the format' , () =>
    {
        expect( layoutBarcode( encodeBarcode( '96385074' , { format : 'ean_8' } ) ).width ).toBe( 7 + 67 + 7 ) ;
        expect( layoutBarcode( ean13() ).width ).toBe( 11 + 95 + 7 ) ;
    } ) ;

    test( 'a quiet zone can be given, for both sides or each' , () =>
    {
        expect( layoutBarcode( ean13() , { quietZone : 2 } ).width ).toBe( 2 + 95 + 2 ) ;
        expect( layoutBarcode( ean13() , { quietZone : { right : 11 } } ).width ).toBe( 11 + 95 + 11 ) ;
    } ) ;

    test( 'retail : the six guard bars run longer, every digit has its place' , () =>
    {
        const symbol = layoutBarcode( ean13() , { barHeight : 50 } ) ;
        const tall   = symbol.rects.filter( rect => rect.height === 50 + GUARD_EXTENSION ) ;

        expect( tall ).toHaveLength( 6 ) ;
        expect( symbol.texts ).toHaveLength( 13 ) ;
        expect( symbol.texts[ 0 ].x ).toBe( 11 - 4 ) ;
    } ) ;

    test( 'simple : one height for every bar, one centred line' , () =>
    {
        const symbol = layoutBarcode( ean13() , { barHeight : 50 , textLayout : 'simple' } ) ;

        expect( symbol.rects.every( rect => rect.height === 50 ) ).toBe( true ) ;
        expect( symbol.texts ).toEqual( [ expect.objectContaining( { value : '4006381333931' , x : 11 + 95 / 2 } ) ] ) ;
    } ) ;

    test( 'without text, the bars alone between the two margins' , () =>
    {
        const symbol = layoutBarcode( encodeBarcode( 'ABC' ) , { barHeight : 30 , showText : false } ) ;

        expect( symbol.texts ).toHaveLength( 0 ) ;
        expect( symbol.height ).toBe( VERTICAL_MARGIN + 30 + VERTICAL_MARGIN ) ;
    } ) ;

    test( 'Code 128 has no retail layout to fall into' , () =>
    {
        const symbol = layoutBarcode( encodeBarcode( 'ABC' ) , { textLayout : 'retail' } ) ;
        expect( symbol.texts ).toEqual( [ expect.objectContaining( { value : 'ABC' } ) ] ) ;
    } ) ;

    test( 'textScale multiplies the text and the symbol grows with it' , () =>
    {
        const normal = layoutBarcode( encodeBarcode( 'ABC' ) ) ;
        const large  = layoutBarcode( encodeBarcode( 'ABC' ) , { textScale : 1.5 } ) ;

        expect( large.texts[ 0 ].size ).toBe( TEXT_SIZES.simple * 1.5 ) ;
        expect( large.height ).toBeGreaterThan( normal.height ) ;
        expect( large.rects ).toEqual( normal.rects ) ;
    } ) ;

    test( 'textScale is held in its range : 0.5 to 1.2 retail, 0.5 to 2 simple' , () =>
    {
        expect( layoutBarcode( ean13() , { textScale : 3 } ).texts[ 1 ].size ).toBeCloseTo( TEXT_SIZES.retail * 1.2 ) ;
        expect( layoutBarcode( ean13() , { textScale : 0.1 } ).texts[ 1 ].size ).toBeCloseTo( TEXT_SIZES.retail * 0.5 ) ;
        expect( layoutBarcode( encodeBarcode( 'ABC' ) , { textScale : 3 } ).texts[ 0 ].size ).toBe( TEXT_SIZES.simple * 2 ) ;
        expect( layoutBarcode( encodeBarcode( 'ABC' ) , { textScale : Number.NaN } ).texts[ 0 ].size ).toBe( TEXT_SIZES.simple ) ;
    } ) ;

    test( 'small retail digits still leave room for the longer guards' , () =>
    {
        const symbol = layoutBarcode( ean13() , { barHeight : 50 , textScale : 0.5 } ) ;
        expect( symbol.height ).toBeGreaterThanOrEqual( VERTICAL_MARGIN + 50 + GUARD_EXTENSION + VERTICAL_MARGIN ) ;
    } ) ;

    test( 'the vertical margin is one number for both, or each' , () =>
    {
        const both = layoutBarcode( encodeBarcode( 'ABC' ) , { barHeight : 30 , showText : false , verticalMargin : 10 } ) ;
        const each = layoutBarcode( encodeBarcode( 'ABC' ) , { barHeight : 30 , showText : false , verticalMargin : { bottom : 1 , top : 12 } } ) ;

        expect( both.height ).toBe( 10 + 30 + 10 ) ;
        expect( both.rects[ 0 ].y ).toBe( 10 ) ;
        expect( each.height ).toBe( 12 + 30 + 1 ) ;
        expect( each.rects[ 0 ].y ).toBe( 12 ) ;
    } ) ;

    test( 'bars cover exactly the dark modules' , () =>
    {
        const encoded = ean13() ;
        const symbol  = layoutBarcode( encoded ) ;
        const dark    = symbol.rects.reduce( ( sum , rect ) => sum + rect.width , 0 ) ;

        expect( dark ).toBe( encoded.modules.filter( Boolean ).length ) ;
    } ) ;
} ) ;

describe( 'symbolToPath' , () =>
{
    test( 'one closed sub-path per rectangle' , () =>
    {
        expect( symbolToPath( [ { height : 40 , width : 2 , x : 10 , y : 2 } , { height : 45 , width : 1 , x : 13 , y : 2 } ] ) )
            .toBe( 'M10 2h2v40h-2z M13 2h1v45h-1z' ) ;
    } ) ;
} ) ;

describe( 'barcodeToSvg' , () =>
{
    test( 'a standalone document, sized in pixels, drawn in modules' , () =>
    {
        const symbol = layoutBarcode( encodeBarcode( 'ABC' ) , { barHeight : 30 , showText : false } ) ;
        const svg    = barcodeToSvg( symbol , { scale : 3 } ) ;

        expect( svg.startsWith( '<svg xmlns="http://www.w3.org/2000/svg"' ) ).toBe( true ) ;
        expect( svg ).toContain( `width="${ symbol.width * 3 }"` ) ;
        expect( svg ).toContain( `viewBox="0 0 ${ symbol.width } ${ symbol.height }"` ) ;
        expect( svg ).toContain( '<rect width="100%" height="100%" fill="#ffffff"/>' ) ;
    } ) ;

    test( 'the text and the title are escaped' , () =>
    {
        const svg = barcodeToSvg( layoutBarcode( encodeBarcode( 'A<B&C' ) ) , { title : '"x"' } ) ;

        expect( svg ).toContain( '<title>&quot;x&quot;</title>' ) ;
        expect( svg ).toContain( '>A&lt;B&amp;C</text>' ) ;
    } ) ;

    test( 'the face, the weight and the colour of the text are the renderer’s' , () =>
    {
        const svg = barcodeToSvg( layoutBarcode( encodeBarcode( 'ABC' ) ) , { fontFamily : 'Georgia, serif' , fontWeight : 600 , foreground : '#111111' , textColor : '#64748b' } ) ;

        expect( svg ).toContain( '<path fill="#111111"' ) ;
        expect( svg ).toContain( '<g fill="#64748b" font-family="Georgia, serif" font-weight="600">' ) ;
    } ) ;

    test( 'no background when asked' , () =>
    {
        expect( barcodeToSvg( layoutBarcode( encodeBarcode( 'A' ) ) , { background : null } ) ).not.toContain( '<rect' ) ;
    } ) ;
} ) ;
