import { describe , expect , test } from 'bun:test' ;

import frameAt , { signatureDuration } from '../../../src/helpers/signature/frameAt' ;
import isSignatureEmpty                from '../../../src/helpers/signature/isSignatureEmpty' ;
import scaleSignature   from '../../../src/helpers/signature/scaleSignature' ;
import signatureToSvg   from '../../../src/helpers/signature/signatureToSvg' ;
import strokesToPaths   from '../../../src/helpers/signature/strokesToPaths' ;

import sha256 from '../../../src/helpers/crypto/sha256' ;

/** A signature of two strokes on a 300 × 120 pad : a line and a hook. */
const signature =
{
    height  : 120 ,
    strokes :
    [
        [ [ 20 , 60 , 0.5 ] , [ 60 , 40 , 0.5 ] , [ 100 , 70 , 0.5 ] , [ 140 , 50 , 0.5 ] ] ,
        [ [ 160 , 80 , 0.3 ] , [ 180 , 30 , 0.8 ] , [ 200 , 80 , 0.4 ] ] ,
    ] ,
    width   : 300 ,
} ;

describe( 'isSignatureEmpty' , () =>
{
    test( 'nothing, no strokes, or strokes with no point, is empty' , () =>
    {
        expect( isSignatureEmpty( null ) ).toBe( true ) ;
        expect( isSignatureEmpty( { height : 1 , strokes : [] , width : 1 } ) ).toBe( true ) ;
        expect( isSignatureEmpty( { height : 1 , strokes : [ [] ] , width : 1 } ) ).toBe( true ) ;
        expect( isSignatureEmpty( signature ) ).toBe( false ) ;
    } ) ;

    test( 'with minPoints, a tap or a brush is empty too' , () =>
    {
        expect( isSignatureEmpty( signature , { minPoints : 7 } ) ).toBe( false ) ;
        expect( isSignatureEmpty( signature , { minPoints : 8 } ) ).toBe( true ) ;
        expect( isSignatureEmpty( { height : 1 , strokes : [ [ [ 1 , 1 , 0.5 ] ] ] , width : 1 } , { minPoints : 12 } ) ).toBe( true ) ;
    } ) ;
} ) ;

describe( 'frameAt' , () =>
{
    const timed =
    {
        height  : 100 ,
        strokes :
        [
            [ [ 10 , 10 , 0.5 , 0 ] , [ 20 , 10 , 0.5 , 100 ] , [ 30 , 10 , 0.5 , 200 ] ] ,
            [ [ 10 , 50 , 0.5 , 600 ] , [ 30 , 50 , 0.5 , 700 ] ] ,
        ] ,
        width   : 100 ,
    } ;

    test( 'cuts the strokes at a moment, and leaves out those not yet begun' , () =>
    {
        expect( frameAt( timed , 0 ).strokes ).toEqual( [ [ [ 10 , 10 , 0.5 , 0 ] ] ] ) ;
        expect( frameAt( timed , 150 ).strokes[ 0 ] ).toHaveLength( 2 ) ;
        expect( frameAt( timed , 150 ).strokes ).toHaveLength( 1 ) ;
        expect( frameAt( timed , 650 ).strokes ).toHaveLength( 2 ) ;
        expect( frameAt( timed , 1000 ) ).toEqual( timed ) ;
    } ) ;

    test( 'a point with no time is shown at once, and a signature with none lasts 0' , () =>
    {
        expect( frameAt( signature , 0 ) ).toEqual( signature ) ;
        expect( signatureDuration( signature ) ).toBe( 0 ) ;
        expect( signatureDuration( timed ) ).toBe( 700 ) ;
        expect( signatureDuration( null ) ).toBe( 0 ) ;
    } ) ;
} ) ;

describe( 'scaleSignature' , () =>
{
    test( 'scales the points and the height, keeps the pressure, and returns the same object for the same width' , () =>
    {
        const scaled = scaleSignature( { ...signature , strokes : [ [ [ 20 , 60 , 0.5 , 40 ] ] ] } , 150 ) ;

        expect( scaled.strokes[ 0 ][ 0 ] ).toEqual( [ 10 , 30 , 0.5 , 40 ] ) ;

        Object.assign( scaled , scaleSignature( signature , 150 ) ) ;

        expect( scaled.width ).toBe( 150 ) ;
        expect( scaled.height ).toBe( 60 ) ;
        expect( scaled.strokes[ 0 ][ 1 ] ).toEqual( [ 30 , 20 , 0.5 ] ) ;
        expect( scaled.strokes[ 1 ][ 1 ][ 2 ] ).toBe( 0.8 ) ;

        expect( scaleSignature( signature , 300 ) ).toBe( signature ) ;
        expect( scaleSignature( null , 300 ) ).toBe( null ) ;
    } ) ;
} ) ;

describe( 'strokesToPaths' , () =>
{
    test( 'one closed path per stroke, inside the pad' , () =>
    {
        const paths = strokesToPaths( signature ) ;

        expect( paths ).toHaveLength( 2 ) ;

        for ( const d of paths )
        {
            expect( d.startsWith( 'M ' ) ).toBe( true ) ;
            expect( d.endsWith( ' Z' ) ).toBe( true ) ;

            const numbers = d.match( /-?\d+(\.\d+)?/g ).map( Number ) ;
            expect( Math.min( ...numbers ) ).toBeGreaterThan( 0 ) ;
            expect( Math.max( ...numbers ) ).toBeLessThan( 300 ) ;
        }
    } ) ;

    test( 'a thicker pen gives a wider outline' , () =>
    {
        const spread = d =>
        {
            const ys = d.match( /-?\d+(\.\d+)?/g ).map( Number ).filter( ( _ , index ) => index % 2 === 1 ) ;
            return Math.max( ...ys ) - Math.min( ...ys ) ;
        } ;

        const line = { height : 50 , strokes : [ [ [ 10 , 25 , 0.5 ] , [ 50 , 25 , 0.5 ] , [ 90 , 25 , 0.5 ] ] ] , width : 100 } ;

        expect( spread( strokesToPaths( line , { size : 8 } )[ 0 ] ) ).toBeGreaterThan( spread( strokesToPaths( line , { size : 2 } )[ 0 ] ) ) ;
    } ) ;

    test( 'empty strokes give no path' , () =>
    {
        expect( strokesToPaths( null ) ).toEqual( [] ) ;
        expect( strokesToPaths( { height : 1 , strokes : [ [] ] , width : 1 } ) ).toEqual( [] ) ;
    } ) ;
} ) ;

describe( 'signatureToSvg' , () =>
{
    test( 'a standalone document with the pad as viewBox, the ink, and a size that keeps the ratio' , () =>
    {
        const svg = signatureToSvg( signature , { color : '#1f2937' , title : 'Signed' , width : 150 } ) ;

        expect( svg.startsWith( '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="60" viewBox="0 0 300 120">' ) ).toBe( true ) ;
        expect( svg ).toContain( '<title>Signed</title>' ) ;
        expect( svg ).toContain( '<g fill="#1f2937">' ) ;
        expect( svg.match( /<path /g ) ).toHaveLength( 2 ) ;
        expect( svg ).not.toContain( '<rect' ) ;
        expect( signatureToSvg( signature , { background : '#fff' } ) ).toContain( '<rect width="100%" height="100%" fill="#fff"/>' ) ;
    } ) ;

    test( 'an empty signature gives an empty string' , () =>
    {
        expect( signatureToSvg( { height : 1 , strokes : [] , width : 1 } ) ).toBe( '' ) ;
    } ) ;
} ) ;

describe( 'sha256' , () =>
{
    test( 'the known digest of « abc », from a string or bytes' , async () =>
    {
        const expected = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' ;

        expect( await sha256( 'abc' ) ).toBe( expected ) ;
        expect( await sha256( new TextEncoder().encode( 'abc' ) ) ).toBe( expected ) ;
        expect( await sha256( new Blob( [ 'abc' ] ) ) ).toBe( expected ) ;
    } ) ;
} ) ;
