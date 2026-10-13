import { describe , expect , test } from 'bun:test' ;

import mostVisiblePage            from '../../../src/helpers/pdf/mostVisiblePage' ;
import nextZoom , { ZOOM_STEPS }  from '../../../src/helpers/pdf/zoomSteps' ;

describe( 'nextZoom' , () =>
{
    test( 'steps through the levels, and stops at either end' , () =>
    {
        expect( nextZoom( 1 , 1 ) ).toBe( 1.25 ) ;
        expect( nextZoom( 1 , -1 ) ).toBe( 0.75 ) ;
        expect( nextZoom( ZOOM_STEPS[ ZOOM_STEPS.length - 1 ] , 1 ) ).toBe( 3 ) ;
        expect( nextZoom( ZOOM_STEPS[ 0 ] , -1 ) ).toBe( 0.5 ) ;
    } ) ;

    test( 'a zoom between two levels lands on a level' , () =>
    {
        expect( nextZoom( 1.1 , 1 ) ).toBe( 1.25 ) ;
        expect( nextZoom( 1.1 , -1 ) ).toBe( 1 ) ;
    } ) ;

    test( 'a float that is a level, up to rounding, is treated as that level' , () =>
    {
        expect( nextZoom( 0.1 + 0.2 + 0.7 , 1 ) ).toBe( 1.25 ) ;
    } ) ;
} ) ;

describe( 'mostVisiblePage' , () =>
{
    const pages = [ { top : 0 , height : 800 } , { top : 816 , height : 800 } , { top : 1632 , height : 800 } ] ;

    test( 'the page showing the most of itself, not the first one touching the frame' , () =>
    {
        expect( mostVisiblePage( pages , 0 , 600 ) ).toBe( 0 ) ;
        expect( mostVisiblePage( pages , 600 , 600 ) ).toBe( 1 ) ;
        expect( mostVisiblePage( pages , 1500 , 600 ) ).toBe( 2 ) ;
    } ) ;

    test( 'a tie goes to the earlier page, and no page is page 0' , () =>
    {
        expect( mostVisiblePage( pages , 408 , 800 ) ).toBe( 0 ) ;
        expect( mostVisiblePage( [] , 100 , 600 ) ).toBe( 0 ) ;
    } ) ;
} ) ;
