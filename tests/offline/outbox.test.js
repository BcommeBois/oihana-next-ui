import { describe , expect , test } from 'bun:test' ;

import createOutbox     from '../../src/offline/outbox/createOutbox' ;
import memoryRepository from '../../src/offline/outbox/memoryRepository' ;

/**
 * An outbox on a memory repository, a clock moved by hand, and a `send`
 * answering from a script : `answers[ kind ]` is a function of the item.
 */
const setup = ( { answers = {} , ...options } = {} ) =>
{
    const clock = { now : 1000 } ;
    const sent  = [] ;
    const settled = [] ;

    const send = async ( item , refs , { files } ) =>
    {
        sent.push( { files , id : item.id , kind : item.kind , refs } ) ;
        const answer = answers[ item.kind ] ;
        return answer ? answer( item , refs ) : { ok : item.kind } ;
    } ;

    const outbox = createOutbox(
    {
        estimate   : async () => ( { quota : 1e9 , usage : 0 } ) ,
        now        : () => clock.now ,
        onSettle   : item => settled.push( [ item.kind , item.status ] ) ,
        persist    : async () => true ,
        random     : () => 0.5 ,
        repository : memoryRepository() ,
        send ,
        ...options ,
    }) ;

    return { clock , outbox , sent , settled } ;
} ;

const fail = ( status , code = null ) => () =>
{
    const error = new Error( code ?? `HTTP ${ status }` ) ;
    error.status = status ;
    error.code = code ;
    throw error ;
} ;

describe( 'createOutbox' , () =>
{
    test( 'queues, sends in order, keeps the results, tells the subscribers' , async () =>
    {
        const { clock , outbox , sent } = setup() ;
        let calls = 0 ;
        outbox.subscribe( () => { calls += 1 ; } ) ;

        await outbox.enqueue( { kind : 'a' } ) ;
        clock.now += 1 ;
        await outbox.enqueue( { kind : 'b' } ) ;

        expect( ( await outbox.counts() ).pending ).toBe( 2 ) ;

        const round = await outbox.drain() ;

        expect( round ).toMatchObject( { failed : 0 , sent : 2 , stopped : false } ) ;
        expect( sent.map( one => one.kind ) ).toEqual( [ 'a' , 'b' ] ) ;
        expect( ( await outbox.list() ).map( one => [ one.kind , one.status , one.result ] ) ).toEqual(
        [
            [ 'a' , 'done' , { ok : 'a' } ] ,
            [ 'b' , 'done' , { ok : 'b' } ] ,
        ] ) ;
        expect( await outbox.getLastSyncAt() ).toBe( clock.now ) ;
        expect( calls ).toBeGreaterThan( 2 ) ;
    } ) ;

    test( 'nothing leaves offline' , async () =>
    {
        const { outbox , sent } = setup() ;
        await outbox.enqueue( { kind : 'a' } ) ;
        const round = await outbox.drain( { online : false } ) ;
        expect( round.stopped ).toBe( true ) ;
        expect( sent ).toEqual( [] ) ;
    } ) ;

    test( 'a network failure stops the round, the item waits without an attempt counted' , async () =>
    {
        const { clock , outbox , sent } = setup( { answers : { a : fail( 0 , 'network' ) } } ) ;
        await outbox.enqueue( { kind : 'a' } ) ;
        clock.now += 1 ;
        await outbox.enqueue( { kind : 'b' } ) ;

        const round = await outbox.drain() ;

        expect( round.stopped ).toBe( true ) ;
        expect( sent.map( one => one.kind ) ).toEqual( [ 'a' ] ) ;
        const [ a ] = await outbox.list() ;
        expect( a ).toMatchObject( { attempts : 0 , status : 'pending' } ) ;
    } ) ;

    test( 'a 422 is rejected with its code, the next items still go ; retry sends it again' , async () =>
    {
        let refuse = true ;
        const { clock , outbox , settled } = setup( { answers : { a : item => refuse ? fail( 422 , 'location_unknown' )() : { ok : item.kind } } } ) ;
        await outbox.enqueue( { kind : 'a' } ) ;
        clock.now += 1 ;
        await outbox.enqueue( { kind : 'b' } ) ;

        await outbox.drain() ;

        const [ a , b ] = await outbox.list() ;
        expect( a.status ).toBe( 'rejected' ) ;
        expect( a.lastError ).toMatchObject( { code : 'location_unknown' , status : 422 } ) ;
        expect( b.status ).toBe( 'done' ) ;
        expect( settled ).toEqual( [ [ 'a' , 'rejected' ] , [ 'b' , 'done' ] ] ) ;

        refuse = false ;
        await outbox.retry( a.id ) ;
        await outbox.drain() ;
        expect( ( await outbox.get( a.id ) ).status ).toBe( 'done' ) ;
    } ) ;

    test( 'a 500 backs off : not due again before its time' , async () =>
    {
        const { clock , outbox , sent } = setup( { answers : { a : fail( 500 ) } , backoff : { base : 5000 } } ) ;
        const item = await outbox.enqueue( { kind : 'a' } ) ;

        await outbox.drain() ;
        expect( await outbox.get( item.id ) ).toMatchObject( { attempts : 1 , nextAttemptAt : clock.now + 5000 , status : 'pending' } ) ;

        await outbox.drain() ;
        expect( sent ).toHaveLength( 1 ) ;

        clock.now += 5000 ;
        await outbox.drain() ;
        expect( sent ).toHaveLength( 2 ) ;
    } ) ;

    test( 'a quote and its lines : the lines wait, then receive its key in refs' , async () =>
    {
        const { clock , outbox , sent } = setup( { answers : { quote : () => ( { id : 'D-4512' } ) } } ) ;
        const quote = await outbox.enqueue( { kind : 'quote' } ) ;
        for ( let index = 0 ; index < 3 ; index++ )
        {
            clock.now += 1 ;
            await outbox.enqueue( { dependsOn : [ quote.id ] , kind : 'line' } ) ;
        }

        await outbox.drain() ;

        expect( sent.map( one => one.kind ) ).toEqual( [ 'quote' , 'line' , 'line' , 'line' ] ) ;
        expect( sent[ 1 ].refs ).toEqual( { [ quote.id ] : { id : 'D-4512' } } ) ;
    } ) ;

    test( 'a refused quote blocks its lines ; retried, it unblocks them' , async () =>
    {
        let refuse = true ;
        const { clock , outbox , settled } = setup( { answers : { quote : () => refuse ? fail( 422 )() : { id : 'D-1' } } } ) ;
        const quote = await outbox.enqueue( { kind : 'quote' } ) ;
        clock.now += 1 ;
        const line = await outbox.enqueue( { dependsOn : [ quote.id ] , kind : 'line' } ) ;

        await outbox.drain() ;
        expect( ( await outbox.get( line.id ) ).status ).toBe( 'blocked' ) ;
        expect( settled ).toContainEqual( [ 'line' , 'blocked' ] ) ;

        refuse = false ;
        await outbox.retry( quote.id ) ;
        expect( ( await outbox.get( line.id ) ).status ).toBe( 'pending' ) ;

        await outbox.drain() ;
        expect( ( await outbox.get( line.id ) ).status ).toBe( 'done' ) ;
    } ) ;

    test( 'a new pending item of the same target replaces the old one, links follow' , async () =>
    {
        const { clock , outbox } = setup() ;
        const first = await outbox.enqueue( { kind : 'receipt' , payload : { v : 1 } , target : 'PO-1' } ) ;
        clock.now += 1 ;
        const follower = await outbox.enqueue( { dependsOn : [ first.id ] , kind : 'note' } ) ;
        clock.now += 1 ;
        const second = await outbox.enqueue( { kind : 'receipt' , payload : { v : 2 } , target : 'PO-1' } ) ;

        const items = await outbox.list() ;
        expect( items.map( one => one.id ).sort() ).toEqual( [ follower.id , second.id ].sort() ) ;
        expect( ( await outbox.get( follower.id ) ).dependsOn ).toEqual( [ second.id ] ) ;
        expect( second.id ).not.toBe( first.id ) ;
    } ) ;

    test( 'a correction of an item on its way waits for it (after), even when it is refused' , async () =>
    {
        let release ;
        const gate = new Promise( resolve => { release = resolve ; } ) ;
        const { clock , outbox , sent } = setup(
        {
            answers : { receipt : async item => { if ( item.payload.v === 1 ) { await gate ; fail( 422 )() ; } return { ok : item.payload.v } ; } } ,
        }) ;

        const first = await outbox.enqueue( { kind : 'receipt' , payload : { v : 1 } , target : 'PO-1' } ) ;
        const running = outbox.drain() ;
        await new Promise( resolve => setTimeout( resolve , 0 ) ) ;

        expect( ( await outbox.get( first.id ) ).status ).toBe( 'posting' ) ;
        clock.now += 1 ;
        const fix = await outbox.enqueue( { kind : 'receipt' , payload : { v : 2 } , target : 'PO-1' } ) ;
        expect( fix.after ).toEqual( [ first.id ] ) ;

        release() ;
        await running ;
        await outbox.drain() ;

        expect( ( await outbox.get( first.id ) ).status ).toBe( 'rejected' ) ;
        expect( ( await outbox.get( fix.id ) ).status ).toBe( 'done' ) ;
        expect( sent.map( one => one.id ) ).toEqual( [ first.id , fix.id ] ) ;
    } ) ;

    test( 'the items of another account are kept and never sent' , async () =>
    {
        const { outbox , sent } = setup( { scope : 'A' } ) ;
        await outbox.enqueue( { kind : 'a' } ) ;
        outbox.setScope( 'B' ) ;
        await outbox.drain() ;
        expect( sent ).toEqual( [] ) ;
        expect( await outbox.counts() ).toMatchObject( { other : 1 , pending : 0 } ) ;

        outbox.setScope( 'A' ) ;
        await outbox.drain() ;
        expect( sent ).toHaveLength( 1 ) ;
    } ) ;

    test( 'a 409 asks the app : retry sends it again' , async () =>
    {
        let first = true ;
        const { outbox , sent } = setup(
        {
            answers    : { a : () => { if ( first ) { first = false ; fail( 409 )() ; } return { ok : 1 } ; } } ,
            onConflict : () => 'retry' ,
        }) ;
        const item = await outbox.enqueue( { kind : 'a' } ) ;
        await outbox.drain() ;
        expect( sent ).toHaveLength( 2 ) ;
        expect( ( await outbox.get( item.id ) ).status ).toBe( 'done' ) ;
    } ) ;

    test( 'files are stored as bytes apart and handed to send' , async () =>
    {
        const { outbox , sent } = setup() ;
        const blob = new Blob( [ 'photo' ] , { type : 'image/jpeg' } ) ;
        const item = await outbox.enqueue( { files : [ { bytes : blob , field : 'photo' , name : 'bon.jpg' } ] , kind : 'receipt' } ) ;

        expect( item.files ).toEqual( [ { field : 'photo' , name : 'bon.jpg' , size : 5 , type : 'image/jpeg' } ] ) ;

        await outbox.drain() ;
        const [ file ] = sent[ 0 ].files ;
        expect( file.bytes ).toBeInstanceOf( ArrayBuffer ) ;
        expect( new TextDecoder().decode( file.bytes ) ).toBe( 'photo' ) ;
    } ) ;

    test( 'beyond the soft limit, files are refused, JSON is not' , async () =>
    {
        const { outbox } = setup( { estimate : async () => ( { quota : 1e9 , usage : 100 } ) , softLimit : 102 } ) ;
        await expect( outbox.enqueue( { files : [ { bytes : new Uint8Array( 5 ) , name : 'x' } ] , kind : 'a' } ) ).rejects.toMatchObject( { code : 'quota' } ) ;
        await expect( outbox.enqueue( { kind : 'a' } ) ).resolves.toMatchObject( { status : 'pending' } ) ;
    } ) ;

    test( 'storage persistence is asked once, at the first item' , async () =>
    {
        let asked = 0 ;
        const { outbox } = setup( { persist : async () => { asked += 1 ; return true ; } } ) ;
        await outbox.enqueue( { kind : 'a' } ) ;
        await outbox.enqueue( { kind : 'b' } ) ;
        expect( asked ).toBe( 1 ) ;
    } ) ;

    test( 'an orphan goes back to pending ; old done items are swept' , async () =>
    {
        const repository = memoryRepository() ;
        const { clock , outbox } = setup( { claimTimeout : 100 , keepDone : 500 , repository } ) ;
        const a = await outbox.enqueue( { kind : 'a' } ) ;
        const b = await outbox.enqueue( { kind : 'b' } ) ;
        await repository.put( { ...( await repository.get( a.id ) ) , claimedAt : clock.now , status : 'posting' } ) ;
        await repository.put( { ...( await repository.get( b.id ) ) , status : 'done' , updatedAt : clock.now } ) ;

        clock.now += 600 ;
        await outbox.recover() ;

        expect( ( await outbox.get( a.id ) ).status ).toBe( 'pending' ) ;
        expect( await outbox.get( b.id ) ).toBeNull() ;
    } ) ;

    test( 'two drains at once share one round' , async () =>
    {
        const { outbox , sent } = setup() ;
        await outbox.enqueue( { kind : 'a' } ) ;
        const [ one , two ] = await Promise.all( [ outbox.drain() , outbox.drain() ] ) ;
        expect( one ).toBe( two ) ;
        expect( sent ).toHaveLength( 1 ) ;
    } ) ;

    test( 'remove abandons an item and its dependents block' , async () =>
    {
        const { outbox } = setup() ;
        const quote = await outbox.enqueue( { kind : 'quote' } ) ;
        const line  = await outbox.enqueue( { dependsOn : [ quote.id ] , kind : 'line' } ) ;
        await outbox.remove( quote.id ) ;
        expect( ( await outbox.get( line.id ) ).status ).toBe( 'blocked' ) ;
    } ) ;
} ) ;
