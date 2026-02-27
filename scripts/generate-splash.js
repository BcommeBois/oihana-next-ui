/**
 * Script to generate placeholder splash screen images for iOS PWA.
 *
 * Usage:
 *   node scripts/generate-splash.js
 *   node scripts/generate-splash.js --landscape
 *
 * Prerequisites:
 *   bun add sharp --dev
 *
 * Customize the `LOGO_PATH`, `BG_COLOR`, and `OUTPUT_DIR` constants below.
 */

import { existsSync , mkdirSync } from 'fs' ;
import sharp from 'sharp' ;

// ------ Configuration

const bgIndex    = process.argv.indexOf( '--bg' ) ;

const LOGO_PATH  = 'public/assets/icons/logo.png' ;  // your app logo (square, 512x512+)
const BG_COLOR   = bgIndex !== -1 ? process.argv[ bgIndex + 1 ] : '#ffffff' ;                        // background color
const OUTPUT_DIR = 'public/assets/splash' ;            // output directory
const LANDSCAPE  = process.argv.includes( '--landscape' ) ;

// ------ Device definitions (same as SplashScreenLinks)

const devices =
[
    { pw : 1320 , ph : 2868 } ,
    { pw : 1260 , ph : 2736 } ,
    { pw : 1206 , ph : 2622 } ,
    { pw : 1290 , ph : 2796 } ,
    { pw : 1179 , ph : 2556 } ,
    { pw : 1170 , ph : 2532 } ,
    { pw : 1284 , ph : 2778 } ,
    { pw : 1125 , ph : 2436 } ,
    { pw : 1242 , ph : 2688 } ,
    { pw : 828  , ph : 1792 } ,
    { pw : 1242 , ph : 2208 } ,
    { pw : 750  , ph : 1334 } ,
    { pw : 640  , ph : 1136 } ,
    { pw : 2064 , ph : 2752 } ,
    { pw : 2048 , ph : 2732 } ,
    { pw : 1668 , ph : 2420 } ,
    { pw : 1668 , ph : 2388 } ,
    { pw : 1640 , ph : 2360 } ,
    { pw : 1620 , ph : 2160 } ,
    { pw : 1488 , ph : 2266 } ,
    { pw : 1536 , ph : 2048 } ,
] ;

// ------ Generator

if ( !existsSync( OUTPUT_DIR ) )
{
    mkdirSync( OUTPUT_DIR , { recursive: true } ) ;
}

/**
 * Generates a splash screen image with the logo centered on a colored background.
 *
 * @param {number} width - Image width in pixels.
 * @param {number} height - Image height in pixels.
 * @returns {Promise<void>}
 */
const generate = async ( width , height ) =>
{
    const filename = `splash-${width}x${height}.png` ;
    const filepath = `${OUTPUT_DIR}/${filename}` ;

    const FORCE = process.argv.includes( '--force' ) ;

    if ( !FORCE && existsSync( filepath ) )
    {
        console.log( `  skip ${filename} (exists)` ) ;
        return ;
    }

    const logoSize = Math.round( Math.min( width , height ) * 0.25 ) ;

    let composite = [] ;

    if ( existsSync( LOGO_PATH ) )
    {
        const logo = await sharp( LOGO_PATH )
            .resize( logoSize , logoSize , { fit: 'contain' , background: { r: 0 , g: 0 , b: 0 , alpha: 0 } } )
            .toBuffer() ;

        composite =
        [{
            input   : logo ,
            gravity : 'centre' ,
        }] ;
    }

    await sharp
    ({
        create :
        {
            width      : width ,
            height     : height ,
            channels   : 4 ,
            background : BG_COLOR ,
        }
    })
    .composite( composite )
    .png()
    .toFile( filepath ) ;

    console.log( `  ✓ ${filename}` ) ;
} ;

const run = async () =>
{
    console.log( `Generating splash screens in ${OUTPUT_DIR}...` ) ;

    for ( const { pw , ph } of devices )
    {
        await generate( pw , ph ) ;

        if ( LANDSCAPE )
        {
            await generate( ph , pw ) ;
        }
    }

    console.log( 'Done!' ) ;
} ;

run().catch( console.error ) ;