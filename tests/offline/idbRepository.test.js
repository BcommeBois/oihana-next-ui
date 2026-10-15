import 'fake-indexeddb/auto' ;

import { describe , expect , test } from 'bun:test' ;

import openOfflineDb , { META , OUTBOX , OUTBOX_FILES , VERSION } from '../../src/offline/db' ;
import createOutbox                                          from '../../src/offline/outbox/createOutbox' ;
import idbRepository                                         from '../../src/offline/outbox/idbRepository' ;

let counter = 0 ;

const open = () => openOfflineDb( `test-${ ++counter }` ) ;

describe( 'openOfflineDb' , () =>
{
    test( 'creates the stores and the status index at version 1' , async () =>
    {
        const db = await open() ;
        expect( db.version ).toBe( VERSION ) ;
        expect( [ ...db.objectStoreNames ].sort() ).toEqual( [ META , OUTBOX , OUTBOX_FILES ].sort() ) ;
        expect( [ ...db.transaction( OUTBOX ).store.indexNames ] ).toEqual( [ 'status' ] ) ;
        db.close() ;
    } ) ;
} ) ;

describe( 'idbRepository' , () =>
{
    test( 'keeps an item and its bytes together, and removes them together' , async () =>
    {
        const repository = idbRepository( await open() ) ;
        const bytes = new TextEncoder().encode( 'photo' ).buffer ;

        await repository.put( { id : 'a' , status : 'pending' } , [ { bytes , name : 'bon.jpg' , size : 5 , type : 'image/jpeg' } ] ) ;

        expect( await repository.get( 'a' ) ).toEqual( { id : 'a' , status : 'pending' } ) ;
        const [ file ] = await repository.getFiles( 'a' ) ;
        expect( new TextDecoder().decode( file.bytes ) ).toBe( 'photo' ) ;

        await repository.delete( 'a' ) ;
        expect( await repository.get( 'a' ) ).toBeNull() ;
        expect( await repository.getFiles( 'a' ) ).toEqual( [] ) ;
    } ) ;

    test( 'putMany, all, meta, clear (which keeps the meta)' , async () =>
    {
        const repository = idbRepository( await open() ) ;
        await repository.putMany( [ { id : 'a' } , { id : 'b' } ] ) ;
        await repository.setMeta( 'lastSyncAt' , 42 ) ;

        expect( ( await repository.all() ).map( item => item.id ).sort() ).toEqual( [ 'a' , 'b' ] ) ;
        expect( await repository.getMeta( 'lastSyncAt' ) ).toBe( 42 ) ;
        expect( await repository.getMeta( 'missing' ) ).toBeNull() ;

        await repository.clear() ;
        expect( await repository.all() ).toEqual( [] ) ;
        expect( await repository.getMeta( 'lastSyncAt' ) ).toBe( 42 ) ;
    } ) ;

    test( 'an outbox on IndexedDB survives a reopening' , async () =>
    {
        const name = `test-${ ++counter }` ;
        const settings = { estimate : async () => ( { quota : 1e9 , usage : 0 } ) , persist : async () => false } ;

        const db = await openOfflineDb( name ) ;
        const first = createOutbox( { ...settings , repository : idbRepository( db ) } ) ;
        const item = await first.enqueue( { files : [ { bytes : new Uint8Array( [ 1 , 2 , 3 ] ) , name : 'x.bin' } ] , kind : 'receipt' } ) ;
        db.close() ;

        const again = createOutbox( { ...settings , repository : idbRepository( await openOfflineDb( name ) ) , send : async ( _one , _refs , { files } ) => files[ 0 ].bytes.byteLength } ) ;
        expect( ( await again.list() ).map( one => one.id ) ).toEqual( [ item.id ] ) ;

        await again.drain() ;
        expect( await again.get( item.id ) ).toMatchObject( { result : 3 , status : 'done' } ) ;
    } ) ;
} ) ;
