import '../../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import pullDistance  from '../../../src/helpers/gestures/pullDistance' ;
import swipeDecision from '../../../src/helpers/gestures/swipeDecision' ;

import addScan , { decrementScan , removeScan } from '../../../src/helpers/scan/addScan' ;

import SwipeableListItem from '../../../src/components/lists/SwipeableListItem' ;
import PullToRefresh     from '../../../src/components/lists/PullToRefresh' ;

describe( 'swipeDecision' , () =>
{
    test( 'nothing before the lock, then the axis the pointer moved most along' , () =>
    {
        expect( swipeDecision( { dx : 5 , dy : 3 , width : 300 } ).axis ).toBe( null ) ;
        expect( swipeDecision( { dx : 4 , dy : 20 , width : 300 } ).axis ).toBe( 'y' ) ;
        expect( swipeDecision( { dx : 20 , dy : 4 , width : 300 } ) ).toMatchObject( { axis : 'x' , beyond : false , direction : 'right' } ) ;
    } ) ;

    test( 'the action fires past the threshold share of the width, either way' , () =>
    {
        expect( swipeDecision( { dx : -119 , dy : 0 , width : 300 } ) ).toMatchObject( { beyond : false , direction : 'left' } ) ;
        expect( swipeDecision( { dx : -120 , dy : 0 , width : 300 } ) ).toMatchObject( { beyond : true , direction : 'left' , progress : 1 } ) ;
        expect( swipeDecision( { dx : 60 , dy : 0 , threshold : 0.2 , width : 300 } ).beyond ).toBe( true ) ;
        expect( swipeDecision( { dx : 60 , dy : 0 , width : 300 } ).progress ).toBeCloseTo( 0.5 , 5 ) ;
    } ) ;
} ) ;

describe( 'pullDistance' , () =>
{
    test( 'follows the finger with resistance and never passes the cap' , () =>
    {
        expect( pullDistance( 0 ) ).toBe( 0 ) ;
        expect( pullDistance( -50 ) ).toBe( 0 ) ;

        const near = pullDistance( 50 ) ;
        const far  = pullDistance( 100 ) ;

        expect( near ).toBeGreaterThan( 0 ) ;
        expect( near ).toBeLessThan( 50 ) ;
        expect( far ).toBeGreaterThan( near ) ;
        expect( far - near ).toBeLessThan( near ) ;
        expect( pullDistance( 100000 ) ).toBe( 120 ) ;
        expect( pullDistance( 100000 , { max : 80 } ) ).toBe( 80 ) ;
    } ) ;
} ) ;

describe( 'addScan' , () =>
{
    test( 'a new code goes on top, a known one counts one more and comes to the top' , () =>
    {
        const first = addScan( [] , 'A' , { at : 1 } ) ;

        expect( first.status ).toBe( 'added' ) ;
        expect( first.list ).toEqual( [ { at : 1 , code : 'A' , count : 1 , reading : undefined } ] ) ;

        const second = addScan( first.list , 'B' , { at : 2 } ) ;
        const again  = addScan( second.list , 'A' , { at : 3 , reading : { format : 'ean_13' } } ) ;

        expect( again.status ).toBe( 'counted' ) ;
        expect( again.list.map( line => line.code ) ).toEqual( [ 'A' , 'B' ] ) ;
        expect( again.list[ 0 ] ).toMatchObject( { at : 3 , count : 2 , reading : { format : 'ean_13' } } ) ;
        expect( second.list[ 1 ].count ).toBe( 1 ) ;
    } ) ;

    test( 'duplicates allowed make lines ; max refuses ; an empty code is refused' , () =>
    {
        const twice = addScan( addScan( [] , 'A' ).list , 'A' , { allowDuplicates : true } ) ;

        expect( twice.status ).toBe( 'added' ) ;
        expect( twice.list ).toHaveLength( 2 ) ;

        const full = addScan( addScan( [] , 'A' ).list , 'B' , { max : 1 } ) ;

        expect( full.status ).toBe( 'refused' ) ;
        expect( full.list ).toHaveLength( 1 ) ;
        expect( addScan( full.list , 'A' , { max : 1 } ).status ).toBe( 'counted' ) ;

        expect( addScan( [] , '  ' ).status ).toBe( 'refused' ) ;
    } ) ;

    test( 'one less goes to zero and away ; remove takes the line whatever its count' , () =>
    {
        const list = addScan( addScan( addScan( [] , 'A' ).list , 'A' ).list , 'B' ).list ;

        expect( decrementScan( list , 'A' ).find( line => line.code === 'A' ).count ).toBe( 1 ) ;
        expect( decrementScan( decrementScan( list , 'A' ) , 'A' ).map( line => line.code ) ).toEqual( [ 'B' ] ) ;
        expect( removeScan( list , 'A' ).map( line => line.code ) ).toEqual( [ 'B' ] ) ;
    } ) ;
} ) ;

describe( 'the gesture components' , () =>
{
    test( 'a swipeable row leaves vertical scrolling to the page and shows no ground at rest' , () =>
    {
        const markup = renderToStaticMarkup( <SwipeableListItem trailing={ { label : 'Remove' , onAction : () => {} } }><div>Row</div></SwipeableListItem> ) ;

        expect( markup ).toContain( 'touch-action:pan-y' ) ;
        expect( markup ).not.toContain( 'Remove' ) ;
        expect( markup ).toContain( 'translateX(0px)' ) ;
    } ) ;

    test( 'pull to refresh contains the overscroll and hides its indicator at rest' , () =>
    {
        const markup = renderToStaticMarkup( <PullToRefresh onRefresh={ async () => {} }><div>List</div></PullToRefresh> ) ;

        expect( markup ).toContain( 'overscroll-behavior-y:contain' ) ;
        expect( markup ).toContain( 'invisible' ) ;
        expect( markup ).toContain( 'translateY(0px)' ) ;
    } ) ;
} ) ;
