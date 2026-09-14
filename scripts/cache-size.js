/**
 * Reports the weight of the Next build folder, and says so when one of the
 * Turbopack caches has gone out of proportion.
 *
 * **It measures and warns, it never deletes.** A cache at a hundred gigabytes
 * is information — it says the bundler is misbehaving — and a script that
 * quietly emptied it would hide the defect for good, turning a bug worth
 * reporting into a chore that comes back every fortnight. Emptying it is one
 * command away and stays a decision.
 *
 * Run on its own it prints the whole breakdown ; run as `predev` it prints one
 * line, so it does not become noise nobody reads. Either way it exits `0` :
 * a housekeeping note must never be what stops a dev server from starting.
 *
 * The walk costs one pass over the entries, so it scales with the number of
 * files rather than with their weight.
 */

import { existsSync , lstatSync , readdirSync } from 'fs' ;
import { join }                                 from 'path' ;

/**
 * The build folder.
 * @type {string}
 */
const ROOT = '.next' ;

/**
 * The parts worth naming, in the order they are printed.
 * @type {string[]}
 */
const PARTS = [ 'cache' , 'dev/cache' , 'dev/server' , 'dev/static' , 'dev/trace' ] ;

/**
 * The ones whose size decides whether anything is wrong, each with its own
 * limit rather than one limit over their sum.
 *
 * **Turbopack writes two caches, and they do not mean the same thing.**
 * `next dev` caches into `dev/cache` and `next build` into `cache` — the
 * second enabled by default from Next 16.3, which is when it started
 * appearing here at all. The dev one accumulates across weeks of sessions,
 * so a large figure there is the drift this script was written to catch ;
 * the build one is rewritten by every build, so the same figure can be
 * perfectly ordinary. Summing them would sound the alarm on a healthy build
 * cache and drown a dev cache going wrong — and the report has to say which
 * folder to empty, since they are emptied separately.
 *
 * A healthy dev cache on this project sits between a few hundred megabytes
 * and a couple of gigabytes ; five leaves room for a bad week without ever
 * crying wolf, and still catches the drift long before it costs a hundred
 * and eighty. **The build limit is provisional** : that folder does not
 * exist here yet, so five is borrowed from its neighbour rather than
 * measured, and is worth revisiting once a few builds have filled it.
 *
 * @type {{ path : string , threshold : number , clean : string }[]}
 */
const WATCHED =
[
    {
        path      : 'cache' ,
        threshold : 5 * 1024 ** 3 ,
        clean     : 'rm -rf .next/cache'
    } ,
    {
        path      : 'dev/cache' ,
        threshold : 5 * 1024 ** 3 ,
        clean     : 'rm -rf .next/dev/cache'
    }
] ;

/**
 * Total size of a path, following no symlink.
 *
 * @param {string} path - The file or directory.
 * @returns {number} Its size in bytes, `0` when it cannot be read.
 */
const weigh = ( path ) =>
{
    let stats ;

    try
    {
        stats = lstatSync( path ) ;
    }
    catch
    {
        return 0 ;
    }

    if ( stats.isFile() )
    {
        return stats.size ;
    }

    if ( !stats.isDirectory() )
    {
        // A symlink is counted as nothing rather than followed : its target is
        // either inside the tree and already counted, or outside and not ours.
        return 0 ;
    }

    let total = 0 ;

    try
    {
        for ( const entry of readdirSync( path , { withFileTypes : true } ) )
        {
            total += weigh( join( path , entry.name ) ) ;
        }
    }
    catch
    {
        return total ;
    }

    return total ;
} ;

/**
 * Formats a byte count the way a human reads one.
 *
 * @param {number} bytes - The count.
 * @returns {string} e.g. `'1.2 GB'`.
 */
const human = ( bytes ) =>
{
    const units = [ 'B' , 'KB' , 'MB' , 'GB' , 'TB' ] ;

    let value = bytes ;
    let unit  = 0 ;

    while ( value >= 1024 && unit < units.length - 1 )
    {
        value /= 1024 ;
        unit  += 1 ;
    }

    return `${ value < 10 && unit > 0 ? value.toFixed( 1 ) : Math.round( value ) } ${ units[ unit ] }` ;
} ;

if ( !existsSync( ROOT ) )
{
    console.log( `${ ROOT } — nothing built yet.` ) ;
    process.exit( 0 ) ;
}

const detailed = process.argv.includes( '--all' ) ;

const total = weigh( ROOT ) ;
const sizes = Object.fromEntries( PARTS.map( part => [ part , weigh( join( ROOT , part ) ) ] ) ) ;

// A cache that does not exist is not a cache that is fine : it is left out of
// the report entirely, so nothing new is printed until Next writes it.
const present = WATCHED.filter( ( { path } ) => sizes[ path ] > 0 ) ;
const over    = present.filter( ( { path , threshold } ) => sizes[ path ] > threshold ) ;

if ( detailed )
{
    console.log( `\n  ${ ROOT.padEnd( 14 ) } ${ human( total ) }` ) ;

    for ( const part of PARTS )
    {
        const size = sizes[ part ] ;

        if ( size > 0 )
        {
            const watched = WATCHED.find( entry => entry.path === part ) ;
            const mark    = watched && size <= watched.threshold ? '   ok' : '' ;

            console.log( `    ${ part.padEnd( 12 ) } ${ human( size ) }${ mark }` ) ;
        }
    }

    console.log( '' ) ;
}
else
{
    const summary = present.map( ( { path } ) => `${ path } ${ human( sizes[ path ] ) }` ).join( ' , ' ) ;

    console.log( `  ${ ROOT } ${ human( total ) }${ summary ? ` — ${ summary }` : '' }` ) ;
}

if ( over.length > 0 )
{
    for ( const { path , threshold , clean } of over )
    {
        console.log( `  ⚠  ${ ROOT }/${ path } is ${ human( sizes[ path ] ) }, past the ${ human( threshold ) } that reads as normal.` ) ;
        console.log( `     ${ clean }` ) ;
        console.log( '' ) ;
    }

    if ( over.length > 1 )
    {
        console.log( '     bun clean:cache empties both.' ) ;
        console.log( '' ) ;
    }

    console.log( '     It grows back : this is hygiene, not a fix. Tens of gigabytes' ) ;
    console.log( '     returning within weeks is a Turbopack defect worth reporting.' ) ;
    console.log( '' ) ;
}

// Always zero — a housekeeping note is not a reason to stop a dev server.
process.exit( 0 ) ;
