#!/usr/bin/env node

/**
 * Copies the barcode reader's WebAssembly into `public/zxing/<version>/`, so
 * that a Next application serves it itself.
 *
 * ### Why a copy is needed at all
 *
 * Where a browser has no native `BarcodeDetector` — every iPhone, Firefox,
 * Chrome on Windows — the camera scanner reads through `zxing-wasm`, ZXing
 * compiled to WebAssembly. 🚨 **By default that binary is fetched from the
 * jsDelivr CDN.** Three failures in one : no reading without
 * a network (a warehouse yard, the back of a shed), a request to a third party
 * on every first scan, and a strict Content-Security-Policy that blocks it.
 * Served from `public/`, the binary comes from the application's own origin,
 * and the offline service worker keeps it.
 *
 * ### Why under its version
 *
 * The JavaScript that loads the binary and the binary itself must match. The
 * folder is named after the installed `zxing-wasm`, and the scanner asks for
 * `/zxing/<ZXING_WASM_VERSION>/` — the version the package exports — so an
 * upgrade can never pair a new loader with a cached old binary. Older
 * folders are removed on every run.
 *
 * ### Why at build time rather than at install time
 *
 * As for the map worker : the file is read from `node_modules`, so it always
 * matches the installed version, and `postinstall` is skipped by package
 * managers whenever an install has no work to do.
 *
 * ### Why it never fails a build
 *
 * `zxing-wasm` is an OPTIONAL peer — most applications consuming this
 * library never open a camera, and many that do only target devices with a
 * native detector. Finding it absent is an ordinary outcome : the script says
 * so in one line and exits `0`.
 *
 * @see {@link https://github.com/Sec-ant/zxing-wasm}
 */

import { copyFileSync , mkdirSync , readFileSync , rmSync } from 'node:fs' ;
import { createRequire }                                    from 'node:module' ;
import { dirname , join , resolve }                         from 'node:path' ;

/**
 * The file to serve : the reader alone, the scanner never writes a code.
 *
 * @type {string}
 */
const FILE = 'zxing_reader.wasm' ;

/**
 * Where the files land, relative to the application's root.
 *
 * It is mirrored by `ZXING_PATH` in `components/barcodes/engine` — the folder
 * and the url it is served at are one decision, written once on each side
 * because nothing can be imported across them.
 *
 * @type {string}
 */
const DESTINATION = join( 'public' , 'zxing' ) ;

/**
 * Locates the installed reader.
 *
 * Resolution starts from the application being built rather than from this
 * file : run as an installed binary, the script sits under
 * `node_modules/oihana-next-ui/scripts`, and a resolution from there could find
 * a copy nested under the library before the one the application installed —
 * the version the bundle will actually load.
 *
 * @returns {{ file : string , version : string }|null} The reader, or `null` when the scanner's engine is absent.
 */
const findReader = () =>
{
    const require = createRequire( resolve( process.cwd() , 'package.json' ) ) ;

    let manifest ;

    try
    {
        manifest = require.resolve( 'zxing-wasm/package.json' ) ;
    }
    catch
    {
        return null ;
    }

    return {
        file    : join( dirname( manifest ) , 'dist' , 'reader' , FILE ) ,
        version : JSON.parse( readFileSync( manifest , 'utf-8' ) ).version ,
    } ;
} ;

const reader = findReader() ;

if ( !reader )
{
    console.log( 'zxing-wasm is not installed — no barcode reader to serve.' ) ;
    process.exit( 0 ) ;
}

const { file , version } = reader ;

const root        = resolve( process.cwd() , DESTINATION ) ;
const destination = join( root , version ) ;

try
{
    rmSync( root , { force : true , recursive : true } ) ;
    mkdirSync( destination , { recursive : true } ) ;
    copyFileSync( file , join( destination , FILE ) ) ;
}
catch ( error )
{
    console.error( `\n  Could not serve the barcode reader from ${ DESTINATION } :\n` ) ;
    console.error( `  ✗ ${ error.message }\n` ) ;
    console.error( '  Where no native BarcodeDetector exists, the camera scanner will not read a single code until this is fixed.\n' ) ;
    process.exit( 1 ) ;
}

console.log( `✓ ${ join( DESTINATION , version ) } — zxing-wasm ${ version } : ${ FILE }` ) ;
