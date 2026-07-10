import { readFileSync , writeFileSync } from 'fs' ;

const pkg     = JSON.parse( readFileSync( 'package.json' , 'utf-8' ) ) ;
const version = pkg.version ;
const offline = pkg.pwa?.offline ?? false ;
const prefix  = pkg.pwa?.cachePrefix ?? 'app' ;

// Inject version module
writeFileSync
(
    'src/version.js' ,
    `const version = "${version}" ;\n\nexport default version ;\n`
) ;

// Inject runtime version manifest — read (no-store) by useServiceWorkerUpdate to
// display the *next* version without reloading. Served from public/ at /version.json.
writeFileSync
(
    'public/version.json' ,
    `${ JSON.stringify( { version } ) }\n`
) ;

// Inject service worker from the appropriate template
const template = offline ? 'sw.offline.template.js' : 'sw.minimal.template.js' ;
const source   = readFileSync( `scripts/${template}` , 'utf-8' ) ;
const sw       = source.replace( /__CACHE_PREFIX__/g , prefix  )
                       .replace( /__VERSION__/g      , version ) ;

writeFileSync( 'public/sw.js' , sw ) ;

console.log( `Version ${version} injected (offline: ${offline} , cache: ${prefix}-v${version})` ) ;