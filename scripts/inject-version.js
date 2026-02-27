import { readFileSync , writeFileSync } from 'fs' ;

const pkg     = JSON.parse( readFileSync( 'package.json' , 'utf-8' ) ) ;
const version = pkg.version ;
const offline = pkg.pwa?.offline ?? false ;

// Inject version module
writeFileSync
(
    'src/version.js' ,
    `const version = "${version}" ;\n\nexport default version ;\n`
) ;

// Inject service worker from the appropriate template
const template = offline ? 'sw.offline.template.js' : 'sw.minimal.template.js' ;
const source   = readFileSync( `scripts/${template}` , 'utf-8' ) ;
const sw       = source.replace( /__VERSION__/g , version ) ;

writeFileSync( 'public/sw.js' , sw ) ;

console.log( `Version ${version} injected (offline: ${offline})` ) ;