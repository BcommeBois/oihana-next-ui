import { describe , expect , test } from 'bun:test' ;

import clearStorage from '../../../src/helpers/storage/clearStorage' ;

/**
 * A `Storage` held in memory, with the methods `clearStorage` uses.
 */
const fakeStorage = entries =>
{
    const map = new Map( Object.entries( entries ) ) ;
    return {
        clear   : () => map.clear() ,
        getItem : key => ( map.has( key ) ? map.get( key ) : null ) ,
        key     : index => [ ...map.keys() ][ index ] ?? null ,
        get length() { return map.size ; } ,
        setItem : ( key , value ) => map.set( key , String( value ) ) ,
        snapshot : () => Object.fromEntries( map ) ,
    } ;
} ;

const ENTRIES =
{
    'app-version'          : '0.31.0' ,
    lang                   : 'fr' ,
    'my-app:feedback:sound'  : 'false' ,
    'my-app:feedback:volume' : '0.2' ,
    'my-app:nav:v1'        : '{"lab":true}' ,
    'other-app:feedback:sound' : 'true' ,
    theme                  : 'true' ,
} ;

describe( 'clearStorage' , () =>
{
    test( 'keeps the keys named exactly, clears the rest' , () =>
    {
        const storage = fakeStorage( ENTRIES ) ;
        clearStorage( storage , [ 'lang' , 'theme' ] ) ;
        expect( storage.snapshot() ).toEqual( { lang : 'fr' , theme : 'true' } ) ;
    } ) ;

    test( 'a pattern ending with * keeps every key under its prefix' , () =>
    {
        const storage = fakeStorage( ENTRIES ) ;
        clearStorage( storage , [ 'lang' , 'my-app:feedback:*' ] ) ;
        expect( storage.snapshot() ).toEqual( { lang : 'fr' , 'my-app:feedback:sound' : 'false' , 'my-app:feedback:volume' : '0.2' } ) ;
    } ) ;

    test( 'a prefix is matched from the start only, and no further' , () =>
    {
        const storage = fakeStorage( ENTRIES ) ;
        clearStorage( storage , [ 'my-app:*' ] ) ;
        expect( Object.keys( storage.snapshot() ).sort() ).toEqual( [ 'my-app:feedback:sound' , 'my-app:feedback:volume' , 'my-app:nav:v1' ] ) ;
    } ) ;

    test( 'a name without * is never a prefix' , () =>
    {
        const storage = fakeStorage( ENTRIES ) ;
        clearStorage( storage , [ 'my-app:feedback' ] ) ;
        expect( storage.snapshot() ).toEqual( {} ) ;
    } ) ;

    test( 'nothing to keep clears everything ; a key absent is no error' , () =>
    {
        const storage = fakeStorage( ENTRIES ) ;
        clearStorage( storage , [ 'missing' ] ) ;
        expect( storage.snapshot() ).toEqual( {} ) ;

        const other = fakeStorage( ENTRIES ) ;
        clearStorage( other ) ;
        expect( other.length ).toBe( 0 ) ;
    } ) ;
} ) ;
