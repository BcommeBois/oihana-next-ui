import { readFileSync } from 'node:fs' ;
import { createRequire } from 'node:module' ;
import { dirname , join } from 'node:path' ;

import { prepareZXingModule , readBarcodes } from 'zxing-wasm/reader' ;

// The very binary the scanner serves, read from disk : no network in a test.
const require  = createRequire( import.meta.url ) ;
const manifest = require.resolve( 'zxing-wasm/package.json' ) ;
const binary   = readFileSync( join( dirname( manifest ) , 'dist' , 'reader' , 'zxing_reader.wasm' ) ) ;

let ready = null ;

const prepare = () =>
{
    ready ??= prepareZXingModule(
    {
        fireImmediately : true ,
        overrides       : { wasmBinary : binary.buffer.slice( binary.byteOffset , binary.byteOffset + binary.byteLength ) } ,
    } ) ;
    return ready ;
} ;

/**
 * Turns a grey-level raster into a binary PGM image, the simplest format ZXing decodes.
 *
 * @param {number} width
 * @param {number} height
 * @param {(x:number,y:number)=>boolean} dark
 * @returns {Uint8Array}
 */
export const toPGM = ( width , height , dark ) =>
{
    const header = new TextEncoder().encode( `P5\n${ width } ${ height }\n255\n` ) ;
    const pixels = new Uint8Array( width * height ) ;

    for ( let y = 0 ; y < height ; y++ )
    {
        for ( let x = 0 ; x < width ; x++ )
        {
            pixels[ y * width + x ] = dark( x , y ) ? 0 : 255 ;
        }
    }

    const image = new Uint8Array( header.length + pixels.length ) ;
    image.set( header ) ;
    image.set( pixels , header.length ) ;
    return image ;
} ;

/**
 * Rasterizes a QR module grid.
 *
 * @param {boolean[][]} matrix
 * @param {number} [scale=4]
 */
export const matrixImage = ( matrix , scale = 4 ) =>
    toPGM( matrix[ 0 ].length * scale , matrix.length * scale , ( x , y ) => matrix[ Math.floor( y / scale ) ][ Math.floor( x / scale ) ] ) ;

/**
 * Rasterizes the rectangles of a laid-out linear barcode — its text left out, as a scanner leaves it.
 *
 * @param {{ width : number , height : number , rects : Array }} symbol
 * @param {number} [scale=3]
 */
export const symbolImage = ( symbol , scale = 3 ) =>
{
    const width  = Math.ceil( symbol.width * scale ) ;
    const height = Math.ceil( symbol.height * scale ) ;

    return toPGM( width , height , ( x , y ) =>
    {
        const u = x / scale ;
        const v = y / scale ;
        return symbol.rects.some( rect => u >= rect.x && u < rect.x + rect.width && v >= rect.y && v < rect.y + rect.height ) ;
    } ) ;
} ;

/**
 * Reads every code in an image with ZXing.
 *
 * @param {Uint8Array} image
 * @param {Object} [options] - Reader options, over `{ formats : [] , tryHarder : true }`. `textMode : 'Plain'` reads as the scanner does.
 * @returns {Promise<Array<{ format : string , text : string , symbologyIdentifier : string , contentType : string }>>}
 */
export const read = async ( image , options = {} ) =>
{
    await prepare() ;
    return readBarcodes( image , { formats : [] , tryHarder : true , ...options } ) ;
} ;
