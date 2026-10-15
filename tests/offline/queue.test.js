import { describe , expect , test } from 'bun:test' ;

import
{
    backoffDelay ,
    byId ,
    classifyError ,
    collectRefs ,
    findOrphans ,
    findReplaced ,
    findSwept ,
    isDue ,
    nextDue ,
    nextWakeAt ,
    reconcileBlocked ,
    rewire ,
    summarize ,
}
from '../../src/offline/outbox/queue' ;

import { applyConflictDecision , applyFailure } from '../../src/offline/outbox/drain' ;

const item = ( id , init = {} ) =>
({
    after         : [] ,
    attempts      : 0 ,
    claimedAt     : null ,
    createdAt     : 0 ,
    dependsOn     : [] ,
    id ,
    kind          : 'k' ,
    lastError     : null ,
    nextAttemptAt : 0 ,
    result        : null ,
    scope         : null ,
    status        : 'pending' ,
    target        : null ,
    updatedAt     : 0 ,
    ...init ,
}) ;

describe( 'Which item leaves' , () =>
{
    test( 'the oldest due one, ties broken by id' , () =>
    {
        const items = [ item( 'b' , { createdAt : 2 } ) , item( 'a' , { createdAt : 1 } ) , item( 'c' , { createdAt : 1 } ) ] ;
        expect( nextDue( items , 10 , null ).id ).toBe( 'a' ) ;
    } ) ;

    test( 'not before its time, not when claimed, not from another account' , () =>
    {
        const items = [ item( 'a' , { nextAttemptAt : 50 } ) , item( 'b' , { createdAt : 1 } ) , item( 'c' , { createdAt : 2 , scope : 'B' } ) ] ;
        expect( nextDue( items , 10 , null , new Set( [ 'b' ] ) ) ).toBeNull() ;
        expect( nextDue( items , 60 , null ).id ).toBe( 'a' ) ;
        expect( nextDue( items , 60 , 'B' ).id ).toBe( 'c' ) ;
    } ) ;

    test( 'dependsOn waits for done ; after waits for any end, or for nothing when gone' , () =>
    {
        const quote = item( 'q' , { status : 'posting' } ) ;
        const line  = item( 'l' , { createdAt : 1 , dependsOn : [ 'q' ] } ) ;
        const fix   = item( 'f' , { after : [ 'q' ] , createdAt : 2 } ) ;
        const late  = item( 'g' , { after : [ 'gone' ] , createdAt : 3 } ) ;

        let index = byId( [ quote , line , fix , late ] ) ;
        expect( isDue( line , index , 10 , null ) ).toBe( false ) ;
        expect( isDue( fix  , index , 10 , null ) ).toBe( false ) ;
        expect( isDue( late , index , 10 , null ) ).toBe( true ) ;

        index = byId( [ { ...quote , status : 'rejected' } , line , fix ] ) ;
        expect( isDue( line , index , 10 , null ) ).toBe( false ) ;
        expect( isDue( fix  , index , 10 , null ) ).toBe( true ) ;

        index = byId( [ { ...quote , status : 'done' } , line , fix ] ) ;
        expect( isDue( line , index , 10 , null ) ).toBe( true ) ;
    } ) ;

    test( 'the next wake-up is the earliest pending time of the account' , () =>
    {
        const items = [ item( 'a' , { nextAttemptAt : 90 } ) , item( 'b' , { nextAttemptAt : 40 } ) , item( 'c' , { nextAttemptAt : 10 , status : 'done' } ) ] ;
        expect( nextWakeAt( items , null ) ).toBe( 40 ) ;
        expect( nextWakeAt( items , 'X' ) ).toBeNull() ;
    } ) ;
} ) ;

describe( 'Blocked chains' , () =>
{
    test( 'a failed or missing dependency blocks, along the chain ; after never blocks' , () =>
    {
        const items =
        [
            item( 'q' , { status : 'rejected' } ) ,
            item( 'l1' , { dependsOn : [ 'q' ] } ) ,
            item( 'l2' , { dependsOn : [ 'l1' ] } ) ,
            item( 'm' , { dependsOn : [ 'missing' ] } ) ,
            item( 'f' , { after : [ 'q' ] } ) ,
        ] ;
        const { block , unblock } = reconcileBlocked( items ) ;
        expect( block.sort() ).toEqual( [ 'l1' , 'l2' , 'm' ] ) ;
        expect( unblock ).toEqual( [] ) ;
    } ) ;

    test( 'a dependency retried unblocks the chain' , () =>
    {
        const items =
        [
            item( 'q' ) ,
            item( 'l1' , { dependsOn : [ 'q' ] , status : 'blocked' } ) ,
            item( 'l2' , { dependsOn : [ 'l1' ] , status : 'blocked' } ) ,
        ] ;
        expect( reconcileBlocked( items ).unblock.sort() ).toEqual( [ 'l1' , 'l2' ] ) ;
    } ) ;
} ) ;

describe( 'Failures' , () =>
{
    test( 'classified by status and code' , () =>
    {
        expect( classifyError( { status : 0 , code : 'network' } ) ).toBe( 'network' ) ;
        expect( classifyError( { status : 0 , code : 'timeout' } ) ).toBe( 'retry' ) ;
        expect( classifyError( { status : 401 } ) ).toBe( 'auth' ) ;
        expect( classifyError( { status : 409 } ) ).toBe( 'conflict' ) ;
        expect( classifyError( { status : 412 } ) ).toBe( 'conflict' ) ;
        expect( classifyError( { status : 422 } ) ).toBe( 'reject' ) ;
        expect( classifyError( { status : 404 } ) ).toBe( 'reject' ) ;
        for ( const status of [ 408 , 425 , 429 , 500 , 503 ] )
        {
            expect( classifyError( { status } ) ).toBe( 'retry' ) ;
        }
        expect( classifyError( new Error( 'a bug' ) ) ).toBe( 'retry' ) ;
    } ) ;

    test( 'the backoff doubles, caps, and spreads' , () =>
    {
        const half = () => 0.5 ;
        expect( backoffDelay( 1 , {} , half ) ).toBe( 30000 ) ;
        expect( backoffDelay( 2 , {} , half ) ).toBe( 60000 ) ;
        expect( backoffDelay( 10 , {} , half ) ).toBe( 900000 ) ;
        expect( backoffDelay( 1 , { base : 5000 } , () => 0 ) ).toBe( 4000 ) ;
        expect( backoffDelay( 1 , { base : 5000 } , () => 1 ) ).toBe( 6000 ) ;
    } ) ;

    test( 'a network failure stops the round and counts nothing' , () =>
    {
        const out = applyFailure( item( 'a' , { status : 'posting' } ) , { code : 'network' , status : 0 } , { now : 5 } ) ;
        expect( out.stop ).toBe( true ) ;
        expect( out.item.status ).toBe( 'pending' ) ;
        expect( out.item.attempts ).toBe( 0 ) ;
        expect( out.item.lastError.code ).toBe( 'network' ) ;
    } ) ;

    test( 'a 5xx backs off, then rejects as exhausted' , () =>
    {
        const out = applyFailure( item( 'a' , { attempts : 1 } ) , { status : 500 } , { backoff : { base : 1000 } , now : 100 , random : () => 0.5 } ) ;
        expect( out.item.status ).toBe( 'pending' ) ;
        expect( out.item.attempts ).toBe( 2 ) ;
        expect( out.item.nextAttemptAt ).toBe( 2100 ) ;

        const last = applyFailure( item( 'a' , { attempts : 9 } ) , { status : 500 } , { maxAttempts : 10 , now : 100 } ) ;
        expect( last.item.status ).toBe( 'rejected' ) ;
        expect( last.item.lastError ).toMatchObject( { code : 'exhausted' , exhausted : true , status : 500 } ) ;
    } ) ;

    test( 'a 422 rejects with its code ; a 409 conflicts, and the app may decide' , () =>
    {
        const rejected = applyFailure( item( 'a' ) , { code : 'unit_already_consumed' , message : 'Used' , status : 422 } , { now : 1 } ) ;
        expect( rejected.item.status ).toBe( 'rejected' ) ;
        expect( rejected.item.lastError ).toEqual( { code : 'unit_already_consumed' , message : 'Used' , status : 422 } ) ;

        const conflict = applyFailure( item( 'a' ) , { status : 409 } , { now : 1 } ).item ;
        expect( conflict.status ).toBe( 'conflict' ) ;
        expect( applyConflictDecision( conflict , 'retry' , 7 ) ).toMatchObject( { nextAttemptAt : 7 , status : 'pending' } ) ;
        expect( applyConflictDecision( conflict , 'done' , 7 ).status ).toBe( 'done' ) ;
        expect( applyConflictDecision( conflict , undefined , 7 ).status ).toBe( 'conflict' ) ;
    } ) ;
} ) ;

describe( 'Replacement, orphans, sweeping' , () =>
{
    test( 'a pending item of the same kind, target and account is replaced ; a posting one is waited for' , () =>
    {
        const items =
        [
            item( 'p' , { target : 'PO-1' } ) ,
            item( 's' , { status : 'posting' , target : 'PO-1' } ) ,
            item( 'o' , { scope : 'B' , target : 'PO-1' } ) ,
            item( 'x' , { kind : 'other' , target : 'PO-1' } ) ,
        ] ;
        const { posting , replaced } = findReplaced( items , { kind : 'k' , scope : null , target : 'PO-1' } ) ;
        expect( replaced.map( one => one.id ) ).toEqual( [ 'p' ] ) ;
        expect( posting.map( one => one.id ) ).toEqual( [ 's' ] ) ;
        expect( findReplaced( items , { kind : 'k' , scope : null , target : null } ).replaced ).toEqual( [] ) ;
    } ) ;

    test( 'links to a replaced item move to the new one' , () =>
    {
        const items = [ item( 'old' ) , item( 'line' , { dependsOn : [ 'old' ] } ) , item( 'fix' , { after : [ 'old' , 'z' ] } ) ] ;
        const changed = rewire( items , [ 'old' ] , 'new' ) ;
        expect( changed.map( one => [ one.id , one.dependsOn , one.after ] ) ).toEqual(
        [
            [ 'line' , [ 'new' ] , [] ] ,
            [ 'fix' , [] , [ 'new' , 'z' ] ] ,
        ] ) ;
    } ) ;

    test( 'a posting item older than the claim timeout is an orphan' , () =>
    {
        const items = [ item( 'a' , { claimedAt : 0 , status : 'posting' } ) , item( 'b' , { claimedAt : 90 , status : 'posting' } ) ] ;
        expect( findOrphans( items , 100 , 50 ).map( one => one.id ) ).toEqual( [ 'a' ] ) ;
    } ) ;

    test( 'old done items go, unless a waiting item needs their result' , () =>
    {
        const items =
        [
            item( 'a' , { status : 'done' , updatedAt : 0 } ) ,
            item( 'b' , { status : 'done' , updatedAt : 0 } ) ,
            item( 'c' , { status : 'done' , updatedAt : 90 } ) ,
            item( 'l' , { dependsOn : [ 'b' ] } ) ,
        ] ;
        expect( findSwept( items , 100 , 50 ).map( one => one.id ) ).toEqual( [ 'a' ] ) ;
    } ) ;
} ) ;

describe( 'Reading the queue' , () =>
{
    test( 'refs are the results of the dependencies' , () =>
    {
        const quote = item( 'q' , { result : { id : 'D-4512' } , status : 'done' } ) ;
        expect( collectRefs( item( 'l' , { dependsOn : [ 'q' ] } ) , byId( [ quote ] ) ) ).toEqual( { q : { id : 'D-4512' } } ) ;
    } ) ;

    test( 'counts by status for the account, the others apart' , () =>
    {
        const items = [ item( 'a' ) , item( 'b' , { status : 'rejected' } ) , item( 'c' , { scope : 'B' } ) ] ;
        expect( summarize( items , null ) ).toMatchObject( { other : 1 , pending : 1 , rejected : 1 , total : 3 } ) ;
    } ) ;
} ) ;
