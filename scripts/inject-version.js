#!/usr/bin/env node

/**
 * Writes the version of the host application into the three places that have
 * to agree on it : the module its code imports, the manifest its runtime
 * fetches, and the service worker whose cache name carries it.
 *
 * Run from the root of the application (`oihana-inject-version`), so
 * `package.json`, `src/` and `public/` are read and written THERE. Only the
 * service-worker templates come from this package, beside this file.
 *
 * Reads `pwa.offline` and `pwa.cachePrefix` from the host's `package.json` :
 * an offline application gets the caching worker, any other the minimal one.
 */

import { execSync } from 'child_process' ;

import { readFileSync , writeFileSync } from 'fs' ;

const pkg     = JSON.parse( readFileSync( 'package.json' , 'utf-8' ) ) ;
const version = pkg.version ;
const offline = pkg.pwa?.offline ?? false ;
const prefix  = pkg.pwa?.cachePrefix ?? 'app' ;

// Deployed commit — stamped into version.json so a deploy healthcheck can tell
// WHICH release is actually being served (it catches a process reloaded on an
// old release, where a plain 200 would pass). Comes from `SOURCE_COMMIT` when
// the deployment exports a release without its `.git` ; falls back to git in a
// checkout, then to 'unknown'.
const commit = ( () =>
{
    if ( process.env.SOURCE_COMMIT ) { return process.env.SOURCE_COMMIT ; }
    try { return execSync( 'git rev-parse --short HEAD' , { encoding : 'utf-8' } ).trim() ; }
    catch { return 'unknown' ; }
} )() ;

// Inject version module
writeFileSync
(
    'src/version.js' ,
    `const version = "${version}" ;\n\nexport default version ;\n`
) ;

// Inject runtime version manifest — read (no-store) by useServiceWorkerUpdate to
// display the *next* version without reloading, and by a deploy healthcheck to
// verify the served release (via `commit`). Served from public/ at /version.json.
writeFileSync
(
    'public/version.json' ,
    `${ JSON.stringify( { version , commit } ) }\n`
) ;

// Inject service worker from the appropriate template. The templates ship with
// this script, so they are read beside it rather than in the host's `scripts/`.
const template = offline ? 'sw.offline.template.js' : 'sw.minimal.template.js' ;
const source   = readFileSync( new URL( template , import.meta.url ) , 'utf-8' ) ;
const sw       = source.replace( /__CACHE_PREFIX__/g , prefix  )
                       .replace( /__VERSION__/g      , version ) ;

writeFileSync( 'public/sw.js' , sw ) ;

console.log( `Version ${version} (commit ${commit}) injected (offline: ${offline} , cache: ${prefix}-v${version})` ) ;
