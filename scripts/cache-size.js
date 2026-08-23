/**
 * Reports the weight of the Next build folder, and says so when the Turbopack
 * dev cache has gone out of proportion.
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
 * Past this, the dev cache is not housekeeping any more.
 *
 * A healthy Turbopack cache on this project sits between a few hundred
 * megabytes and a couple of gigabytes. Five leaves room for a bad week
 * without ever crying wolf, and still catches the drift long before it
 * costs a hundred and eighty.
 *
 * @type {number}
 */
const THRESHOLD = 5 * 1024 ** 3 ;

/**
 * The build folder.
 * @type {string}
 */
const ROOT = '.next' ;

/**
 * The parts worth naming, in the order they are printed.
 * @type {string[]}
 */
const PARTS = [ 'dev/cache' , 'dev/server' , 'dev/static' , 'dev/trace' ] ;

/**
 * The one whose size decides whether anything is wrong.
 * @type {string}
 */
const WATCHED = 'dev/cache' ;

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

const total   = weigh( ROOT ) ;
const watched = weigh( join( ROOT , WATCHED ) ) ;
const over    = watched > THRESHOLD ;

if ( detailed )
{
    console.log( `\n  ${ ROOT.padEnd( 14 ) } ${ human( total ) }` ) ;

    for ( const part of PARTS )
    {
        const size = weigh( join( ROOT , part ) ) ;

        if ( size > 0 )
        {
            console.log( `    ${ part.padEnd( 12 ) } ${ human( size ) }${ part === WATCHED && !over ? '   ok' : '' }` ) ;
        }
    }

    console.log( '' ) ;
}
else
{
    console.log( `  ${ ROOT } ${ human( total ) } — ${ WATCHED } ${ human( watched ) }` ) ;
}

if ( over )
{
    console.log( `  ⚠  ${ ROOT }/${ WATCHED } is ${ human( watched ) }, past the ${ human( THRESHOLD ) } that reads as normal.` ) ;
    console.log( '     bun clean:cache' ) ;
    console.log( '' ) ;
    console.log( '     It grows back : this is hygiene, not a fix. Tens of gigabytes' ) ;
    console.log( '     returning within weeks is a Turbopack defect worth reporting.' ) ;
    console.log( '' ) ;
}

// Always zero — a housekeeping note is not a reason to stop a dev server.
process.exit( 0 ) ;
