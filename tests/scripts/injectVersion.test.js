import { describe , expect , test } from 'bun:test' ;

import { spawnSync } from 'node:child_process' ;
import { mkdirSync , mkdtempSync , readFileSync , writeFileSync } from 'node:fs' ;
import { tmpdir } from 'node:os' ;
import { join , resolve } from 'node:path' ;

const SCRIPT = resolve( import.meta.dir , '../../scripts/inject-version.js' ) ;

/**
 * Runs the injector in a throwaway application holding only what it reads and writes.
 */
const inject = pwa =>
{
    const root = mkdtempSync( join( tmpdir() , 'inject-' ) ) ;
    mkdirSync( join( root , 'src' ) ) ;
    mkdirSync( join( root , 'public' ) ) ;
    writeFileSync( join( root , 'package.json' ) , JSON.stringify( { pwa , version : '1.2.3' } ) ) ;
    const run = spawnSync( 'bun' , [ SCRIPT ] , { cwd : root , encoding : 'utf-8' , env : { ...process.env , SOURCE_COMMIT : 'abc123' } } ) ;
    return { root , run , sw : run.status === 0 ? readFileSync( join( root , 'public/sw.js' ) , 'utf-8' ) : null } ;
} ;

describe( 'oihana-inject-version' , () =>
{
    test( 'the offline worker gets the shell, its cache name and no placeholder left' , () =>
    {
        const { sw } = inject( { cachePrefix : 'wms' , offline : true , offlineShell : '/offline' } ) ;
        expect( sw ).toContain( "const CACHE_NAME = 'wms-v1.2.3' ;" ) ;
        expect( sw ).toContain( "const OFFLINE_SHELL = '/offline' ;" ) ;
        expect( sw ).not.toMatch( /__[A-Z_]+__/ ) ;
    } ) ;

    test( 'without a shell, the constant is empty and the worker writes its own page' , () =>
    {
        const { root , sw } = inject( { offline : true } ) ;
        expect( sw ).toContain( "const OFFLINE_SHELL = '' ;" ) ;
        expect( JSON.parse( readFileSync( join( root , 'public/version.json' ) , 'utf-8' ) ) ).toEqual( { commit : 'abc123' , version : '1.2.3' } ) ;
    } ) ;

    test( 'a shell that is not a path of the application is refused' , () =>
    {
        const { run } = inject( { offline : true , offlineShell : 'https://elsewhere.test/offline' } ) ;
        expect( run.status ).not.toBe( 0 ) ;
        expect( run.stderr ).toContain( 'pwa.offlineShell' ) ;
    } ) ;
} ) ;
