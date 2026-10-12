import { describe , expect , test } from 'bun:test' ;

import fitWithin from '../../../src/helpers/images/fitWithin' ;

import { hasExif , readGpsLocation } from '../../../src/helpers/images/exif' ;

/**
 * Builds a JPEG start : SOI, an optional APP0, an `Exif` APP1 holding a GPS
 * directory, then SOS. Rationals are given as [ numerator , denominator ].
 */
const jpeg = (
{
    altitude ,
    altitudeRef = 0 ,
    app0        = false ,
    gps         = true ,
    latitude    = [ [ 43 , 1 ] , [ 17 , 1 ] , [ 4512 , 100 ] ] ,
    latitudeRef = 'N' ,
    little      = true ,
    longitude   = [ [ 5 , 1 ] , [ 22 , 1 ] , [ 3036 , 100 ] ] ,
    longitudeRef = 'E' ,
} = {} ) =>
{
    const tiff = new DataView( new ArrayBuffer( 160 ) ) ;
    const u16 = ( at , value ) => tiff.setUint16( at , value , little ) ;
    const u32 = ( at , value ) => tiff.setUint32( at , value , little ) ;

    tiff.setUint16( 0 , little ? 0x4949 : 0x4d4d ) ;
    u16( 2 , 42 ) ;
    u32( 4 , 8 ) ;

    // IFD0 : the GPS pointer, or an unrelated tag.
    u16( 8 , 1 ) ;
    u16( 10 , gps ? 0x8825 : 0x010f ) ;
    u16( 12 , 4 ) ;
    u32( 14 , 1 ) ;
    u32( 18 , 26 ) ;
    u32( 22 , 0 ) ;

    const entries =
    [
        [ 0x0001 , 2 , 2 , latitudeRef ] ,
        [ 0x0002 , 5 , 3 , 104 ] ,
        [ 0x0003 , 2 , 2 , longitudeRef ] ,
        [ 0x0004 , 5 , 3 , 128 ] ,
        ...altitude ? [ [ 0x0005 , 1 , 1 , altitudeRef ] , [ 0x0006 , 5 , 1 , 152 ] ] : [] ,
    ] ;

    u16( 26 , entries.length ) ;
    entries.forEach( ( [ tag , type , count , value ] , index ) =>
    {
        const at = 28 + index * 12 ;
        u16( at , tag ) ;
        u16( at + 2 , type ) ;
        u32( at + 4 , count ) ;
        if ( type === 2 )
        {
            tiff.setUint8( at + 8 , value.charCodeAt( 0 ) ) ;
        }
        else if ( type === 1 )
        {
            tiff.setUint8( at + 8 , value ) ;
        }
        else
        {
            u32( at + 8 , value ) ;
        }
    } ) ;

    const rationals = ( at , list ) => list.forEach( ( [ numerator , denominator ] , index ) =>
    {
        u32( at + index * 8 , numerator ) ;
        u32( at + index * 8 + 4 , denominator ) ;
    } ) ;

    rationals( 104 , latitude ) ;
    rationals( 128 , longitude ) ;
    if ( altitude )
    {
        rationals( 152 , [ altitude ] ) ;
    }

    const tiffBytes = new Uint8Array( tiff.buffer ) ;
    const exif      = [ ...'Exif\0\0' ].map( character => character.charCodeAt( 0 ) ) ;
    const length    = 2 + exif.length + tiffBytes.length ;

    return new Uint8Array(
    [
        0xff , 0xd8 ,
        ...app0 ? [ 0xff , 0xe0 , 0x00 , 0x07 , 0x4a , 0x46 , 0x49 , 0x46 , 0x00 ] : [] ,
        0xff , 0xe1 , length >> 8 , length & 0xff , ...exif , ...tiffBytes ,
        0xff , 0xda , 0x00 , 0x02 ,
    ] ) ;
} ;

/** A JPEG with no metadata at all, as a canvas writes it. */
const bare = new Uint8Array( [ 0xff , 0xd8 , 0xff , 0xe0 , 0x00 , 0x07 , 0x4a , 0x46 , 0x49 , 0x46 , 0x00 , 0xff , 0xda , 0x00 , 0x02 ] ) ;

describe( 'fitWithin' , () =>
{
    test( 'brings the longest side to the bound, proportions kept' , () =>
    {
        expect( fitWithin( 4000 , 3000 , 1600 ) ).toEqual( { height : 1200 , width : 1600 } ) ;
        expect( fitWithin( 3000 , 4000 , 1600 ) ).toEqual( { height : 1600 , width : 1200 } ) ;
        expect( fitWithin( 4032 , 3024 , 1000 ) ).toEqual( { height : 750 , width : 1000 } ) ;
    } ) ;

    test( 'never enlarges, and no bound keeps the size' , () =>
    {
        expect( fitWithin( 800 , 600 , 1600 ) ).toEqual( { height : 600 , width : 800 } ) ;
        expect( fitWithin( 4000 , 3000 ) ).toEqual( { height : 3000 , width : 4000 } ) ;
        expect( fitWithin( 4000 , 3000 , 0 ) ).toEqual( { height : 3000 , width : 4000 } ) ;
        expect( fitWithin( 4000 , 3000 , Number.POSITIVE_INFINITY ) ).toEqual( { height : 3000 , width : 4000 } ) ;
    } ) ;

    test( 'never under one pixel' , () =>
    {
        expect( fitWithin( 10000 , 2 , 100 ) ).toEqual( { height : 1 , width : 100 } ) ;
    } ) ;
} ) ;

describe( 'hasExif' , () =>
{
    test( 'finds the Exif segment, after an APP0 too' , () =>
    {
        expect( hasExif( jpeg() ) ).toBe( true ) ;
        expect( hasExif( jpeg( { app0 : true } ) ) ).toBe( true ) ;
        expect( hasExif( jpeg().buffer ) ).toBe( true ) ;
    } ) ;

    test( 'a JPEG as a canvas writes it has none' , () =>
    {
        expect( hasExif( bare ) ).toBe( false ) ;
    } ) ;

    test( 'anything that is not a JPEG has none, and nothing throws' , () =>
    {
        expect( hasExif( new Uint8Array( [ 0x89 , 0x50 , 0x4e , 0x47 ] ) ) ).toBe( false ) ;
        expect( hasExif( new Uint8Array( 0 ) ) ).toBe( false ) ;
        expect( hasExif( undefined ) ).toBe( false ) ;
        expect( hasExif( jpeg().subarray( 0 , 12 ) ) ).toBe( false ) ;
    } ) ;
} ) ;

describe( 'readGpsLocation' , () =>
{
    test( 'degrees, minutes, seconds → decimal degrees' , () =>
    {
        // 43° 17′ 45.12″ N , 5° 22′ 30.36″ E
        expect( readGpsLocation( jpeg() ) ).toEqual( { latitude : 43.2958667 , longitude : 5.3751 } ) ;
    } ) ;

    test( 'both byte orders' , () =>
    {
        expect( readGpsLocation( jpeg( { little : false } ) ) ).toEqual( readGpsLocation( jpeg() ) ) ;
    } ) ;

    test( 'south and west are negative' , () =>
    {
        const location = readGpsLocation( jpeg( { latitudeRef : 'S' , longitudeRef : 'W' } ) ) ;
        expect( location.latitude ).toBeCloseTo( -43.2958667 , 6 ) ;
        expect( location.longitude ).toBeCloseTo( -5.3751 , 6 ) ;
    } ) ;

    test( 'elevation, in the schema.org name, negative below sea level' , () =>
    {
        expect( readGpsLocation( jpeg( { altitude : [ 15275 , 100 ] } ) ).elevation ).toBe( 152.75 ) ;
        expect( readGpsLocation( jpeg( { altitude : [ 28 , 1 ] , altitudeRef : 1 } ) ).elevation ).toBe( -28 ) ;
        expect( readGpsLocation( jpeg() ) ).not.toHaveProperty( 'elevation' ) ;
    } ) ;

    test( 'no position : no GPS directory, no EXIF, not a JPEG' , () =>
    {
        expect( readGpsLocation( jpeg( { gps : false } ) ) ).toBeNull() ;
        expect( readGpsLocation( bare ) ).toBeNull() ;
        expect( readGpsLocation( new Uint8Array( [ 1 , 2 , 3 ] ) ) ).toBeNull() ;
    } ) ;

    test( 'nonsense reads as nothing : a zero denominator, a latitude past 90°' , () =>
    {
        expect( readGpsLocation( jpeg( { latitude : [ [ 43 , 0 ] , [ 17 , 1 ] , [ 0 , 1 ] ] } ) ) ).toBeNull() ;
        expect( readGpsLocation( jpeg( { latitude : [ [ 95 , 1 ] , [ 0 , 1 ] , [ 0 , 1 ] ] } ) ) ).toBeNull() ;
    } ) ;
} ) ;
