import { describe , expect , test } from 'bun:test' ;

import encodeBarcode from '../../../src/helpers/barcodes/encodeBarcode' ;
import layoutBarcode from '../../../src/helpers/barcodes/layoutBarcode' ;
import encodeITF14 , { ITF_DIGITS , ITF_WIDTHS } from '../../../src/helpers/barcodes/encodeITF14' ;

const bits = modules => modules.map( dark => ( dark ? '1' : '0' ) ).join( '' ) ;

describe( 'ITF_DIGITS' , () =>
{
    test( 'ten digits, five elements each, exactly two of them wide' , () =>
    {
        expect( ITF_DIGITS ).toHaveLength( 10 ) ;
        expect( new Set( ITF_DIGITS ).size ).toBe( 10 ) ;
        for ( const pattern of ITF_DIGITS )
        {
            expect( pattern ).toHaveLength( 5 ) ;
            expect( Array.from( pattern ).filter( element => element === 'w' ) ).toHaveLength( 2 ) ;
        }
    } ) ;

    test( 'a wide element is 2.5 narrow ones' , () =>
    {
        expect( ITF_WIDTHS.w / ITF_WIDTHS.n ).toBe( 2.5 ) ;
    } ) ;
} ) ;

describe( 'encodeITF14' , () =>
{
    test( '13 digits : the check digit is computed (15400141288763, the usual example)' , () =>
    {
        expect( encodeITF14( '1540014128876' ).text ).toBe( '15400141288763' ) ;
    } ) ;

    test( 'starts with four narrow elements, then interleaves 1 (bars) and 5 (spaces)' , () =>
    {
        const start = '11' + '00' + '11' + '00' ;
        // 1 = w n n n w in the bars, 5 = w n w n n in the spaces.
        const pair  = '11111' + '00000' + '11' + '00' + '11' + '00000' + '11' + '00' + '11111' + '00' ;

        expect( bits( encodeITF14( '15400141288763' ).modules ).startsWith( start + pair ) ).toBe( true ) ;
    } ) ;

    test( 'ends with the stop : wide bar, narrow space, narrow bar' , () =>
    {
        expect( bits( encodeITF14( '15400141288763' ).modules ).endsWith( '11111' + '00' + '11' ) ).toBe( true ) ;
    } ) ;

    test( 'is 241 units : start 8, seven pairs of 32, stop 9' , () =>
    {
        expect( encodeITF14( '15400141288763' ).modules ).toHaveLength( 8 + 7 * 32 + 9 ) ;
    } ) ;

    test( 'a wrong check digit is refused' , () =>
    {
        expect( () => encodeITF14( '15400141288760' ) ).toThrow( 'should be 3' ) ;
    } ) ;
} ) ;

describe( 'bearer bars' , () =>
{
    const itf = () => encodeBarcode( '15400141288763' , { format : 'itf_14' } ) ;

    test( 'frame : four bars around the code and its quiet zone, by default' , () =>
    {
        const symbol = layoutBarcode( itf() , { barHeight : 50 , showText : false } ) ;
        const frame  = symbol.rects.slice( -4 ) ;

        const span = 4 + 20 + 241 + 20 + 4 ;

        expect( symbol.width ).toBe( 6 + span + 6 ) ;
        expect( frame ).toEqual(
        [
            { height : 4 , width : span , x : 6 , y : 6 } ,
            { height : 4 , width : span , x : 6 , y : 6 + 4 + 50 } ,
            { height : 58 , width : 4 , x : 6 , y : 6 } ,
            { height : 58 , width : 4 , x : 6 + span - 4 , y : 6 } ,
        ] ) ;
    } ) ;

    test( 'the bars touch the top and bottom bearers, the quiet zone sits inside the frame' , () =>
    {
        const symbol = layoutBarcode( itf() , { barHeight : 50 , showText : false } ) ;
        expect( symbol.rects[ 0 ] ).toEqual( expect.objectContaining( { height : 50 , x : 6 + 4 + 20 , y : 6 + 4 } ) ) ;
    } ) ;

    test( 'the plate keeps a margin outside the bearers, as wide as the top one' , () =>
    {
        const symbol = layoutBarcode( itf() , { showText : false , verticalMargin : 10 } ) ;
        expect( symbol.rects.at( -2 ).x ).toBe( 10 ) ;
        expect( symbol.width - ( symbol.rects.at( -1 ).x + 4 ) ).toBe( 10 ) ;
    } ) ;

    test( 'bars : top and bottom only, no side' , () =>
    {
        const symbol = layoutBarcode( itf() , { bearer : 'bars' , showText : false } ) ;
        expect( symbol.width ).toBe( 6 + 20 + 241 + 20 + 6 ) ;
        expect( symbol.rects.filter( rect => rect.width === 20 + 241 + 20 ) ).toHaveLength( 2 ) ;
    } ) ;

    test( 'none : the bars alone, and only an ITF-14 has bearers to draw' , () =>
    {
        const none  = layoutBarcode( itf() , { bearer : 'none' , showText : false } ) ;
        const other = layoutBarcode( encodeBarcode( 'ABC' ) , { bearer : 'frame' , showText : false } ) ;

        expect( none.width ).toBe( 20 + 241 + 20 ) ;
        expect( none.rects.every( rect => rect.width < none.width ) ).toBe( true ) ;
        expect( other.rects.every( rect => rect.width < other.width ) ).toBe( true ) ;
    } ) ;

    test( 'the text sits under the bottom bearer' , () =>
    {
        const symbol = layoutBarcode( itf() , { barHeight : 50 } ) ;
        expect( symbol.texts[ 0 ].y ).toBeGreaterThan( 6 + 4 + 50 + 4 ) ;
    } ) ;
} ) ;
