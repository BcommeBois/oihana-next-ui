import { describe , expect , test } from 'bun:test' ;

import { readdirSync , readFileSync } from 'node:fs' ;
import { dirname , join , relative , resolve } from 'node:path' ;

/**
 * The offline core stays free of React and of the rest of the library, so it
 * can move to a package of its own : it imports `idb` and its own files, and
 * nothing else.
 */

const ROOT = resolve( import.meta.dir , '../../src/offline' ) ;

const files = dir => readdirSync( dir , { withFileTypes : true } ).flatMap( entry =>
    entry.isDirectory() ? files( join( dir , entry.name ) ) : /\.(js|jsx|mjs)$/.test( entry.name ) ? [ join( dir , entry.name ) ] : [] ) ;

const specifiers = source =>
    [ ...source.matchAll( /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|^\s*import\s*['"]([^'"]+)['"]/gm ) ]
        .map( match => match[ 1 ] ?? match[ 2 ] ?? match[ 3 ] ) ;

describe( 'src/offline' , () =>
{
    const sources = files( ROOT ) ;

    test( 'has files to check' , () =>
    {
        expect( sources.length ).toBeGreaterThan( 5 ) ;
    } ) ;

    for ( const file of sources )
    {
        test( `${ relative( ROOT , file ) } imports only idb and src/offline` , () =>
        {
            const outside = specifiers( readFileSync( file , 'utf-8' ) ).filter( specifier =>
            {
                if ( specifier === 'idb' )
                {
                    return false ;
                }
                if ( specifier.startsWith( '.' ) )
                {
                    return !resolve( dirname( file ) , specifier ).startsWith( ROOT ) ;
                }
                return true ;
            }) ;
            expect( outside ).toEqual( [] ) ;
        } ) ;
    }
} ) ;
