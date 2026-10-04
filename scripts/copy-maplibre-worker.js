#!/usr/bin/env node

/**
 * Copies the map engine's worker into `public/maplibre/`, so that a Next
 * application serves it itself.
 *
 * ### Why a copy is needed at all
 *
 * From version 6, `maplibre-gl` ships as ES modules only and loads its worker
 * from a real URL instead of a Blob, resolving it through `import.meta.url`.
 * Inside a bundler's module graph that does not reliably point at the file, so
 * every consumer has to name the worker once, through `setWorkerUrl`.
 *
 * 🚨 **Next is a documented exception, and it fails without saying so.**
 * Handed `new URL( 'maplibre-gl/dist/maplibre-gl-worker.mjs' , import.meta.url )`,
 * Next emits the worker as a hashed asset WITHOUT its `maplibre-gl-shared.mjs`
 * sibling. The worker imports that sibling by relative path on its first line,
 * so it dies there — and a map whose worker never started still mounts, still
 * draws its controls, and never requests a single tile. Nothing on the page
 * says why. Serving both files from `public/` is what MapLibre prescribes for
 * this case, in both of Next's bundler modes.
 *
 * Which is also why BOTH files are copied rather than the worker alone.
 *
 * ### Why at build time rather than at install time
 *
 * The files are read from `node_modules`, so they always match the installed
 * version and a lockfile bump cannot leave a stale worker behind. `postinstall`
 * would not do : package managers skip lifecycle scripts when an install has no
 * work to do, and `--ignore-scripts` skips them outright.
 *
 * ### Why it never fails a build
 *
 * `maplibre-gl` is an OPTIONAL peer — most applications consuming this library
 * never mount a map. Finding it absent is therefore an ordinary outcome, not an
 * error : the script says so in one line and exits `0`.
 *
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/#installation}
 */

import { copyFileSync , mkdirSync , readFileSync } from 'fs' ;
import { createRequire }             from 'module' ;
import { dirname , join , resolve }  from 'path' ;

/**
 * The files to serve, and the order they are named in a report.
 *
 * The shared chunk weighs around twenty-five times the worker ; it is the
 * engine's own parsing and styling code, which the worker and the main bundle
 * both import.
 *
 * @type {string[]}
 */
const FILES = [ 'maplibre-gl-worker.mjs' , 'maplibre-gl-shared.mjs' ] ;

/**
 * Where the files land, relative to the application's root.
 *
 * It is mirrored by `MAPLIBRE_WORKER_URL` in `components/maps/engine` — the
 * folder and the url it is served at are one decision, written once on each
 * side because nothing can be imported across them.
 *
 * @type {string}
 */
const DESTINATION = join( 'public' , 'maplibre' ) ;

/**
 * The first version that ships the files below, and the floor of the peer
 * range for that reason.
 * @type {number}
 */
const FIRST_MAJOR = 6 ;

/**
 * Locates the installed engine.
 *
 * Resolution starts from the application being built rather than from this
 * file : run as an installed binary, the script sits under
 * `node_modules/oihana-next-ui/scripts`, and a resolution from there would
 * find a copy nested under the library before the one the application
 * installed — the version the bundle will actually load.
 *
 * @returns {{ dist : string , version : string }|null} The engine, or `null` when it is absent.
 */
const findEngine = () =>
{
    const require = createRequire( resolve( process.cwd() , 'package.json' ) ) ;

    try
    {
        const manifest = require.resolve( 'maplibre-gl/package.json' ) ;

        return {
            dist    : join( dirname( manifest ) , 'dist' ) ,
            version : JSON.parse( readFileSync( manifest , 'utf-8' ) ).version ,
        } ;
    }
    catch
    {
        return null ;
    }
} ;

const engine = findEngine() ;

if ( !engine )
{
    console.log( 'maplibre-gl is not installed — no map worker to serve.' ) ;
    process.exit( 0 ) ;
}

const { dist , version } = engine ;

/**
 * An engine older than 6 has no worker to serve : it built one from a Blob at
 * runtime, which is why nothing had to be copied before. Saying which version
 * is installed turns an `ENOENT` on a file nobody asked for into the one
 * sentence that explains it.
 */
if ( Number.parseInt( version , 10 ) < FIRST_MAJOR )
{
    console.error( `\n  ✗ maplibre-gl ${ version } is installed, and ${ FIRST_MAJOR } or above is required.\n` ) ;
    console.error( `    Versions before ${ FIRST_MAJOR } built their worker at runtime and ship none of ${ FILES.join( ' , ' ) }.\n` ) ;
    process.exit( 1 ) ;
}

const destination = resolve( process.cwd() , DESTINATION ) ;

try
{
    mkdirSync( destination , { recursive : true } ) ;

    for ( const file of FILES )
    {
        copyFileSync( join( dist , file ) , join( destination , file ) ) ;
    }
}
catch ( error )
{
    console.error( `\n  Could not serve the map worker from ${ DESTINATION } :\n` ) ;
    console.error( `  ✗ ${ error.message }\n` ) ;
    console.error( '  A map will mount and never request a tile until this is fixed.\n' ) ;
    process.exit( 1 ) ;
}

console.log( `✓ ${ DESTINATION } — maplibre-gl ${ version } : ${ FILES.join( ' , ' ) }` ) ;
