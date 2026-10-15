import 'fake-indexeddb/auto' ;

import { describe , expect , test } from 'bun:test' ;

import { openDB } from 'idb' ;

import openOfflineDb , { OUTBOX , STORE } from '../../src/offline/db' ;
import createStore                         from '../../src/offline/store/createStore' ;
import idbStoreRepository                  from '../../src/offline/store/idbStoreRepository' ;
import memoryStoreRepository               from '../../src/offline/store/memoryStoreRepository' ;

import { compareBy , matchesCondition , normalizeText , runQuery } from '../../src/offline/store/query' ;

const PARCELS =
[
    { essence : 'Chêne'   , id : 'A-10' , location : 'H2-04-B' , state : 'intact' , volume : 1.8 } ,
    { essence : 'Épicéa'  , id : 'A-2'  , location : 'H1-01-A' , state : 'opened' , volume : 0.6 } ,
    { essence : 'Douglas' , id : 'A-3'  , location : 'H2-07-C' , state : 'intact' , volume : null } ,
    { essence : 'chêne'   , id : 'B-1'  , location : 'H3-02-A' , state : 'reserved' , volume : 2.4 } ,
] ;

describe( 'query' , () =>
{
    test( 'text without accents or case, every word found' , () =>
    {
        expect( normalizeText( 'Éléonore ÉPICÉA' ) ).toBe( 'eleonore epicea' ) ;
        expect( runQuery( PARCELS , { text : 'chene' } ).total ).toBe( 2 ) ;
        expect( runQuery( PARCELS , { text : 'chene h2' } ).items.map( one => one.id ) ).toEqual( [ 'A-10' ] ) ;
        expect( runQuery( PARCELS , { text : 'epicea' } , { text : [ 'location' ] } ).total ).toBe( 0 ) ;
    } ) ;

    test( 'where : a value, a list, operators, nothing' , () =>
    {
        expect( runQuery( PARCELS , { where : { state : 'intact' } } ).total ).toBe( 2 ) ;
        expect( runQuery( PARCELS , { where : { state : [ 'opened' , 'reserved' ] } } ).total ).toBe( 2 ) ;
        expect( runQuery( PARCELS , { where : { state : [] } } ).total ).toBe( 4 ) ;
        expect( runQuery( PARCELS , { where : { volume : { gte : 1 , lt : 2 } } } ).items.map( one => one.id ) ).toEqual( [ 'A-10' ] ) ;
        expect( runQuery( PARCELS , { where : { state : { ne : 'intact' } } } ).total ).toBe( 2 ) ;
        expect( runQuery( PARCELS , { where : { state : undefined } } ).total ).toBe( 4 ) ;
        expect( matchesCondition( [ 'FSC' , 'PEFC' ] , 'PEFC' ) ).toBe( true ) ;
        expect( runQuery( [ { address : { city : 'Lyon' } } , { address : { city : 'Nantes' } } ] , { where : { 'address.city' : 'Lyon' } } ).total ).toBe( 1 ) ;
    } ) ;

    test( 'sort : texts in the order of the language, numbers by value, missing last ; then a page' , () =>
    {
        expect( runQuery( PARCELS , { sort : 'id' } ).items.map( one => one.id ) ).toEqual( [ 'A-2' , 'A-3' , 'A-10' , 'B-1' ] ) ;
        expect( runQuery( PARCELS , { sort : '-volume' } ).items.map( one => one.id ) ).toEqual( [ 'B-1' , 'A-10' , 'A-2' , 'A-3' ] ) ;
        expect( runQuery( PARCELS , { sort : [ 'essence' , '-id' ] } ).items.map( one => one.id ) ).toEqual( [ 'B-1' , 'A-10' , 'A-3' , 'A-2' ] ) ;
        expect( runQuery( PARCELS , { limit : 2 , offset : 1 , sort : 'id' } ) ).toEqual( { items : [ PARCELS[ 2 ] , PARCELS[ 0 ] ] , total : 4 } ) ;
        expect( [ 'b' , 'a' ].sort( compareBy( 'x' ) ) ).toEqual( [ 'b' , 'a' ] ) ;
    } ) ;
} ) ;

const setup = ( options = {} ) =>
{
    const clock = { now : 1000 } ;
    const store = createStore( { estimate : async () => ( { quota : 1e9 , usage : 0 } ) , now : () => clock.now , repository : memoryStoreRepository() , ...options } ) ;
    return { clock , store } ;
} ;

describe( 'createStore' , () =>
{
    test( 'remembers, reads, ages, and tells the subscribers' , async () =>
    {
        const { clock , store } = setup( { ttl : 100 } ) ;
        const changes = [] ;
        store.subscribe( change => changes.push( change ) ) ;

        await store.remember( 'parcel' , 'A-10' , PARCELS[ 0 ] , { token : 't1' } ) ;

        expect( await store.read( 'parcel' , 'A-10' ) ).toMatchObject( { expired : false , pinned : false , seenAt : 1000 , token : 't1' , value : PARCELS[ 0 ] } ) ;
        clock.now += 100 ;
        expect( ( await store.read( 'parcel' , 'A-10' ) ).expired ).toBe( true ) ;
        expect( await store.read( 'parcel' , 'nope' ) ).toBeNull() ;
        expect( changes ).toEqual( [ { key : 'A-10' , kind : 'parcel' } ] ) ;
    } ) ;

    test( 'a pinned record stays pinned when seen again, and never expires' , async () =>
    {
        const { clock , store } = setup( { ttl : 100 } ) ;
        await store.remember( 'parcel' , 'A-10' , PARCELS[ 0 ] , { pinned : true } ) ;
        await store.remember( 'parcel' , 'A-10' , PARCELS[ 0 ] ) ;
        clock.now += 1000 ;
        expect( await store.read( 'parcel' , 'A-10' ) ).toMatchObject( { expired : false , pinned : true } ) ;
        await store.pin( 'parcel' , 'A-10' , false ) ;
        expect( ( await store.read( 'parcel' , 'A-10' ) ).expired ).toBe( true ) ;
    } ) ;

    test( 'queries a kind with its description' , async () =>
    {
        const { store } = setup() ;
        for ( const parcel of PARCELS )
        {
            await store.remember( 'parcel' , parcel.id , parcel ) ;
        }
        await store.remember( 'customer' , 'dupont' , { name : 'Chêne & fils' } ) ;
        store.describe( 'parcel' , { sort : 'id' , text : [ 'essence' ] } ) ;

        expect( ( await store.query( 'parcel' , { text : 'chene' } ) ).items.map( one => one.id ) ).toEqual( [ 'A-10' , 'B-1' ] ) ;
        expect( store.describe( 'parcel' ) ).toEqual( { sort : 'id' , text : [ 'essence' ] } ) ;
        expect( ( await store.list( 'parcel' ) ) ).toHaveLength( 4 ) ;
    } ) ;

    test( 'sweep : the expired go, never the pinned nor the ones a waiting send uses' , async () =>
    {
        const { clock , store } = setup( { ttl : 100 } ) ;
        await store.remember( 'parcel' , 'old' , {} ) ;
        await store.remember( 'parcel' , 'pinned' , {} , { pinned : true } ) ;
        await store.remember( 'customer' , 'dupont' , {} ) ;
        clock.now += 50 ;
        await store.remember( 'parcel' , 'fresh' , {} ) ;
        clock.now += 60 ;

        expect( await store.sweep( { keep : [ [ 'customer' , 'dupont' ] ] } ) ).toEqual( { removed : 1 } ) ;
        expect( await store.read( 'parcel' , 'old' ) ).toBeNull() ;
        expect( await store.read( 'parcel' , 'pinned' ) ).not.toBeNull() ;
        expect( await store.read( 'customer' , 'dupont' ) ).not.toBeNull() ;
        expect( await store.read( 'parcel' , 'fresh' ) ).not.toBeNull() ;
    } ) ;

    test( 'sweep : over the soft limit, the oldest seen go first, a tenth at a time' , async () =>
    {
        const clock = { now : 1000 } ;
        const repository = memoryStoreRepository() ;
        // Five bytes a record : twenty records are 100, over a limit of 75.
        const estimate = async () => ( { quota : 1e9 , usage : ( await repository.all() ).length * 5 } ) ;
        const store = createStore( { estimate , now : () => clock.now , repository , softLimit : 75 , ttl : 1e9 } ) ;

        for ( let index = 0 ; index < 20 ; index++ )
        {
            await store.remember( 'parcel' , `p${ index }` , {} ) ;
            clock.now += 1 ;
        }
        await store.pin( 'parcel' , 'p0' ) ;

        expect( await store.sweep() ).toEqual( { removed : 6 } ) ;
        expect( await store.read( 'parcel' , 'p0' ) ).not.toBeNull() ;
        for ( let index = 1 ; index <= 6 ; index++ )
        {
            expect( await store.read( 'parcel' , `p${ index }` ) ).toBeNull() ;
        }
        expect( await store.read( 'parcel' , 'p7' ) ).not.toBeNull() ;
    } ) ;

    test( 'rememberMany keeps a day at once, tells once, keeps a pin' , async () =>
    {
        const { store } = setup() ;
        await store.remember( 'parcel' , 'A-10' , {} , { pinned : true } ) ;
        const changes = [] ;
        store.subscribe( change => changes.push( change ) ) ;

        expect( await store.rememberMany( 'parcel' , PARCELS.map( value => ( { key : value.id , value } ) ) ) ).toBe( 4 ) ;
        expect( changes ).toEqual( [ { kind : 'parcel' } ] ) ;
        expect( ( await store.read( 'parcel' , 'A-10' ) ) ).toMatchObject( { pinned : true , value : PARCELS[ 0 ] } ) ;
        expect( ( await store.read( 'parcel' , 'A-2' ) ).pinned ).toBe( false ) ;
    } ) ;

    test( 'clear empties a kind, or everything' , async () =>
    {
        const { store } = setup() ;
        await store.remember( 'parcel' , 'a' , {} ) ;
        await store.remember( 'customer' , 'b' , {} ) ;
        await store.clear( 'parcel' ) ;
        expect( await store.list( 'parcel' ) ).toEqual( [] ) ;
        expect( await store.list( 'customer' ) ).toHaveLength( 1 ) ;
        await store.clear() ;
        expect( await store.list( 'customer' ) ).toEqual( [] ) ;
    } ) ;
} ) ;

let counter = 0 ;

describe( 'idbStoreRepository' , () =>
{
    test( 'a database kept at version 1 keeps its queue and gains the reserve' , async () =>
    {
        const name = `upgrade-${ ++counter }` ;

        const old = await openDB( name , 1 ,
        {
            upgrade( db )
            {
                db.createObjectStore( OUTBOX , { keyPath : 'id' } ).createIndex( 'status' , 'status' ) ;
                db.createObjectStore( 'outboxFiles' ) ;
                db.createObjectStore( 'meta' ) ;
            } ,
        }) ;
        await old.put( OUTBOX , { id : 'kept' , status : 'pending' } ) ;
        old.close() ;

        const db = await openOfflineDb( name ) ;
        expect( await db.get( OUTBOX , 'kept' ) ).toEqual( { id : 'kept' , status : 'pending' } ) ;
        expect( [ ...db.objectStoreNames ] ).toContain( STORE ) ;
        expect( [ ...db.transaction( STORE ).store.indexNames ].sort() ).toEqual( [ 'kind' , 'seenAt' ] ) ;
        db.close() ;
    } ) ;

    test( 'keeps records by kind and key, clears a kind' , async () =>
    {
        const repository = idbStoreRepository( await openOfflineDb( `store-${ ++counter }` ) ) ;
        const store = createStore( { estimate : async () => ( { quota : 1e9 , usage : 0 } ) , repository } ) ;

        await store.remember( 'parcel' , 'A-10' , PARCELS[ 0 ] ) ;
        await store.remember( 'parcel' , 'A-2' , PARCELS[ 1 ] ) ;
        await store.remember( 'customer' , 'A-10' , { name : 'Dupont' } ) ;
        await store.rememberMany( 'parcel' , [ { key : 'A-3' , value : PARCELS[ 2 ] } ] , { pinned : true } ) ;
        expect( ( await store.read( 'parcel' , 'A-3' ) ).pinned ).toBe( true ) ;

        expect( ( await store.read( 'parcel' , 'A-10' ) ).value ).toEqual( PARCELS[ 0 ] ) ;
        expect( ( await store.read( 'customer' , 'A-10' ) ).value ).toEqual( { name : 'Dupont' } ) ;
        expect( ( await store.query( 'parcel' , { text : 'epicea' } ) ).items ).toEqual( [ PARCELS[ 1 ] ] ) ;

        await store.clear( 'parcel' ) ;
        expect( await store.list( 'parcel' ) ).toEqual( [] ) ;
        expect( await store.list( 'customer' ) ).toHaveLength( 1 ) ;

        await store.forget( 'customer' , 'A-10' ) ;
        expect( await store.read( 'customer' , 'A-10' ) ).toBeNull() ;
    } ) ;
} ) ;
