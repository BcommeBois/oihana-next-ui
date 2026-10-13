#!/usr/bin/env node

/**
 * Copies the PDF engine's assets into `public/pdfjs/<version>/`, so that a
 * Next application serves them itself.
 *
 * ### What is copied, and why
 *
 * pdf.js (`pdfjs-dist`, brought along by `react-pdf`) does its parsing in a
 * web worker and reaches for four families of files at run time :
 *
 * - `build/pdf.worker.min.mjs` — the worker. It is self-contained, but it has
 *   to be loaded from a real URL that `GlobalWorkerOptions.workerSrc` names :
 *   inside Next's module graph, `new URL( …, import.meta.url )` does not
 *   reliably point at the file, in either bundler mode.
 * - `wasm/` — JPEG 2000 (`openjpeg`), scanned pages (`jbig2`) and colour
 *   profiles (`qcms`), compiled to WebAssembly.
 * - `standard_fonts/` — the fourteen base fonts, for the many PDFs that do not
 *   embed theirs.
 * - `cmaps/` — the character maps of the CJK encodings ; `iccs/` — the ICC
 *   profiles.
 *
 * 🚨 **By default these are fetched from a CDN, or not found at all.** Served
 * from `public/`, they come from the application's own origin, and the offline
 * service worker keeps them.
 *
 * ### Why under its version, and why resolved from `react-pdf`
 *
 * The API and the worker must be the exact same version, or pdf.js refuses to
 * start. `react-pdf` pins its own `pdfjs-dist` — which is NOT necessarily the
 * one at the root of an application that also installed `pdfjs-dist` for
 * itself. So the engine is located FROM `react-pdf`'s folder, and the files
 * land under the version found there, which `components/documents/engine`
 * reads at run time from `pdfjs.version`. Older folders are removed on every
 * run.
 *
 * ### Why at build time rather than at install time
 *
 * As for the map worker : the files are read from `node_modules`, so they
 * always match the installed version, and `postinstall` is skipped by package
 * managers whenever an install has no work to do.
 *
 * ### Why it never fails a build
 *
 * `react-pdf` is an OPTIONAL peer — most applications consuming this library
 * never open a PDF. Finding it absent is an ordinary outcome : the script says
 * so in one line and exits `0`.
 *
 * @see {@link https://github.com/mozilla/pdf.js}
 * @see {@link https://github.com/wojtekmaj/react-pdf}
 */

import { cpSync , copyFileSync , existsSync , mkdirSync , readFileSync , rmSync } from 'node:fs' ;
import { createRequire }                                                           from 'node:module' ;
import { dirname , join , resolve }                                                from 'node:path' ;

/**
 * The worker, the one file every PDF needs.
 *
 * @type {string}
 */
const WORKER = 'pdf.worker.min.mjs' ;

/**
 * The folders copied whole, as the engine's `wasmUrl`, `standardFontDataUrl`,
 * `cMapUrl` and `iccUrl` expect them.
 *
 * @type {string[]}
 */
const FOLDERS = [ 'wasm' , 'standard_fonts' , 'cmaps' , 'iccs' ] ;

/**
 * Where the files land, relative to the application's root.
 *
 * It is mirrored by `PDFJS_PATH` in `components/documents/engine` and in the
 * offline service worker — the folder and the url it is served at are one
 * decision, written once on each side because nothing can be imported across
 * them.
 *
 * @type {string}
 */
const DESTINATION = join( 'public' , 'pdfjs' ) ;

/**
 * Locates the engine `react-pdf` actually loads.
 *
 * Resolution starts from the application being built rather than from this
 * file : run as an installed binary, the script sits under
 * `node_modules/oihana-next-ui/scripts`, and a resolution from there could find
 * a copy nested under the library before the one the application installed.
 * Then `pdfjs-dist` is resolved FROM `react-pdf`, never from the root.
 *
 * @returns {{ folder : string , version : string }|null} The engine, or `null` when `react-pdf` is absent.
 */
const findEngine = () =>
{
    const require = createRequire( resolve( process.cwd() , 'package.json' ) ) ;

    let reactPdf ;

    try
    {
        reactPdf = require.resolve( 'react-pdf/package.json' ) ;
    }
    catch
    {
        return null ;
    }

    const manifest = createRequire( reactPdf ).resolve( 'pdfjs-dist/package.json' ) ;

    return {
        folder  : dirname( manifest ) ,
        version : JSON.parse( readFileSync( manifest , 'utf-8' ) ).version ,
    } ;
} ;

const engine = findEngine() ;

if ( !engine )
{
    console.log( 'react-pdf is not installed — no PDF engine to serve.' ) ;
    process.exit( 0 ) ;
}

const { folder , version } = engine ;

const root        = resolve( process.cwd() , DESTINATION ) ;
const destination = join( root , version ) ;

try
{
    rmSync( root , { force : true , recursive : true } ) ;
    mkdirSync( destination , { recursive : true } ) ;

    copyFileSync( join( folder , 'build' , WORKER ) , join( destination , WORKER ) ) ;

    for ( const name of FOLDERS )
    {
        const source = join( folder , name ) ;

        if ( existsSync( source ) )
        {
            cpSync( source , join( destination , name ) , { recursive : true } ) ;
        }
    }
}
catch ( error )
{
    console.error( `\n  Could not serve the PDF engine from ${ DESTINATION } :\n` ) ;
    console.error( `  ✗ ${ error.message }\n` ) ;
    console.error( '  No PDF will open until this is fixed : the engine starts in a worker it cannot find.\n' ) ;
    process.exit( 1 ) ;
}

console.log( `✓ ${ join( DESTINATION , version ) } — pdfjs-dist ${ version } : ${ WORKER }, ${ FOLDERS.join( ', ' ) }` ) ;
