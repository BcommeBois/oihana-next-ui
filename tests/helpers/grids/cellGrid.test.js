import '../../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import cellRect , { planeSize }                  from '../../../src/helpers/grids/cellRect' ;
import nextCell , { occupancy }                  from '../../../src/helpers/grids/nextCell' ;
import pinchScale , { clampOffset , zoomAround } from '../../../src/helpers/grids/pinchScale' ;

import CellGrid from '../../../src/components/grids/CellGrid' ;

const cells =
[
    { col : 0 , id : 'a1' , row : 0 , state : 'free' } ,
    { col : 1 , id : 'a2' , row : 0 , state : 'full' , badge : 12 } ,
    { col : 3 , id : 'a4' , row : 0 } ,
    { col : 0 , id : 'b1' , row : 1 , span : { cols : 2 } } ,
    { col : 3 , id : 'b4' , disabled : true , row : 1 } ,
    { col : 3 , id : 'c4' , row : 2 } ,
] ;

const grid = { cells , cols : 4 , rows : 3 } ;

describe( 'cellRect and planeSize' , () =>
{
    test( 'a cell at its row and column, a span covering the gaps too' , () =>
    {
        expect( cellRect( { col : 2 , row : 1 } , { cellSize : 40 , gap : 4 } ) ).toEqual( { height : 40 , width : 40 , x : 88 , y : 44 } ) ;
        expect( cellRect( { col : 0 , row : 0 , span : { cols : 3 , rows : 2 } } , { cellSize : 40 , gap : 4 } ) ).toEqual( { height : 84 , width : 128 , x : 0 , y : 0 } ) ;
        expect( planeSize( 3 , 4 , { cellSize : 40 , gap : 4 } ) ).toEqual( { height : 128 , width : 172 } ) ;
        expect( planeSize( 0 , 0 ) ).toEqual( { height : 0 , width : 0 } ) ;
    } ) ;
} ) ;

describe( 'nextCell' , () =>
{
    test( 'an arrow walks the plane and skips the gaps and the disabled ; the edge gives null' , () =>
    {
        const a2 = cells[ 1 ] ;

        expect( nextCell( a2 , 'ArrowRight' , grid ).id ).toBe( 'a4' ) ;
        expect( nextCell( a2 , 'ArrowLeft' , grid ).id ).toBe( 'a1' ) ;
        expect( nextCell( a2 , 'ArrowDown' , grid ).id ).toBe( 'b1' ) ;
        expect( nextCell( a2 , 'ArrowUp' , grid ) ).toBe( null ) ;
        expect( nextCell( cells[ 2 ] , 'ArrowDown' , grid ).id ).toBe( 'c4' ) ;
    } ) ;

    test( 'a span is left from its far edge, Home and End run along the row' , () =>
    {
        const b1 = cells[ 3 ] ;

        expect( nextCell( b1 , 'ArrowRight' , grid ) ).toBe( null ) ;
        expect( nextCell( cells[ 0 ] , 'End' , grid ).id ).toBe( 'a4' ) ;
        expect( nextCell( cells[ 2 ] , 'Home' , grid ).id ).toBe( 'a1' ) ;
        expect( nextCell( cells[ 0 ] , 'Home' , grid ) ).toBe( null ) ;
        expect( occupancy( cells ).get( '1:1' ).id ).toBe( 'b1' ) ;
    } ) ;
} ) ;

describe( 'pinch, zoom and clamp' , () =>
{
    test( 'the scale follows the fingers, within the bounds' , () =>
    {
        expect( pinchScale( 100 , 200 , 1 ) ).toBe( 2 ) ;
        expect( pinchScale( 100 , 50 , 1 ) ).toBe( 0.5 ) ;
        expect( pinchScale( 100 , 1000 , 1 ) ).toBe( 3 ) ;
        expect( pinchScale( 0 , 100 , 1.5 ) ).toBe( 1.5 ) ;
    } ) ;

    test( 'zooming around a point keeps it in place' , () =>
    {
        const offset = zoomAround( { x : -100 , y : -50 } , { x : 200 , y : 100 } , 1 , 2 ) ;

        // The plane point under (200,100) was (300,150) ; at scale 2 it must still be under (200,100).
        expect( offset.x + 300 * 2 ).toBeCloseTo( 200 , 6 ) ;
        expect( offset.y + 150 * 2 ).toBeCloseTo( 100 , 6 ) ;
    } ) ;

    test( 'a plane larger than the viewport never leaves it empty, a smaller one is centred' , () =>
    {
        const viewport = { height : 300 , width : 400 } ;

        expect( clampOffset( { x : 50 , y : 50 } , { height : 600 , width : 800 } , viewport ) ).toEqual( { x : 0 , y : 0 } ) ;
        expect( clampOffset( { x : -900 , y : -900 } , { height : 600 , width : 800 } , viewport ) ).toEqual( { x : -400 , y : -300 } ) ;
        expect( clampOffset( { x : -900 , y : 0 } , { height : 100 , width : 200 } , viewport ) ).toEqual( { x : 100 , y : 100 } ) ;
    } ) ;
} ) ;

describe( 'CellGrid' , () =>
{
    const states = { free : { color : 'success' , label : 'Free' } , full : { color : 'warning' , label : 'Full' } } ;

    test( 'a grid of rows and cells, each named by its coordinate, state and badge, one focusable' , () =>
    {
        const markup = renderToStaticMarkup( <CellGrid ariaLabel="Aisle" cells={ cells } cols={ 4 } rows={ 3 } states={ states } value={ [ 'a2' ] } /> ) ;

        expect( markup ).toContain( 'role="grid"' ) ;
        expect( markup ).toContain( 'aria-label="Aisle"' ) ;
        expect( markup.match( /role="row"/g ) ).toHaveLength( 3 ) ;
        expect( markup.match( /role="gridcell"/g ) ).toHaveLength( 6 ) ;
        expect( markup ).toContain( 'aria-label="A-02, Full, 12"' ) ;
        expect( markup ).toContain( 'aria-label="A-04"' ) ;
        expect( markup ).toContain( 'aria-selected="true"' ) ;
        expect( markup.match( /tabindex="0"/g ) ).toHaveLength( 1 ) ;
        expect( markup ).toContain( 'bg-success/20 border-success' ) ;
        expect( markup ).toContain( 'aria-disabled="true"' ) ;
        expect( markup ).toContain( '<ul' ) ;
        expect( markup ).toContain( 'bg-success"></span>Free' ) ;
    } ) ;

    test( 'the axes can be named, the legend left out, the zoom tools too' , () =>
    {
        const markup = renderToStaticMarkup( <CellGrid cells={ cells } colLabels={ [ 10 , 20 , 30 , 40 ] } cols={ 4 } legend={ false } rowLabels={ [ 'X' , 'Y' , 'Z' ] } rows={ 3 } zoomable={ false } /> ) ;

        expect( markup ).toContain( 'aria-label="X-10"' ) ;
        expect( markup ).not.toContain( 'role="toolbar"' ) ;
        expect( markup ).not.toContain( '<ul' ) ;
    } ) ;
} ) ;
