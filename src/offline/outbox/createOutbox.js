import drain from './drain' ;

import estimateStorage from '../estimateStorage' ;
import persistStorage  from '../persistStorage' ;

import { compareItems , findOrphans , findReplaced , findSwept , nextWakeAt , reconcileBlocked , rewire , summarize } from './queue' ;
import { BLOCKED , FAILED , PENDING , QUOTA , createItem , createOutboxError } from './schema' ;

/**
 * Reads a queued file into storable bytes : IndexedDB keeps an `ArrayBuffer`
 * across page and worker, where WebKit may invalidate a `Blob`.
 *
 * @param {Object|Blob} file - `{ name , type , field , bytes }` (bytes : ArrayBuffer, typed array or Blob), or a `Blob` / `File`.
 * @returns {Promise<{ name : string , type : string , field : string , size : number , bytes : ArrayBuffer }>}
 */
const toStoredFile = async file =>
{
    const source = file?.bytes ?? file ;

    let bytes ;

    if ( source instanceof ArrayBuffer )
    {
        bytes = source ;
    }
    else if ( ArrayBuffer.isView( source ) )
    {
        bytes = source.buffer.slice( source.byteOffset , source.byteOffset + source.byteLength ) ;
    }
    else if ( typeof source?.arrayBuffer === 'function' )
    {
        bytes = await source.arrayBuffer() ;
    }
    else
    {
        throw new TypeError( 'A queued file needs its bytes : an ArrayBuffer, a typed array or a Blob.' ) ;
    }

    return {
        name  : file.name  ?? source.name ?? 'file' ,
        type  : file.type  || source.type || 'application/octet-stream' ,
        field : file.field ?? 'file' ,
        size  : bytes.byteLength ,
        bytes ,
    } ;
} ;

/**
 * Creates an outbox : a queue of intentions kept on the device, sent in order
 * when the server can be reached, each with an id born here that the server
 * uses to never apply it twice. No React, no UI : the app (or `OutboxProvider`)
 * decides when to `drain`, and shows what `list` and `counts` return.
 *
 * @param {Object} options
 * @param {Object} options.repository - `idbRepository( db )` in a browser, `memoryRepository()` elsewhere.
 * @param {Function} [options.send] - `( item , refs , { files , signal } ) => Promise<result>` ; throws `{ status , code , message }` on failure. `httpTransport( … )` for an HTTP API.
 * @param {?string} [options.scope=null] - The account : items of another scope are kept and never sent.
 * @param {Function} [options.onSettle] - `( item ) => void` when an item reaches `done`, `rejected`, `conflict` or `blocked` — where the app toasts.
 * @param {Function} [options.onConflict] - `( item , error ) => 'retry' | 'reject' | 'done' | undefined` for a 409 / 412.
 * @param {Object} [options.backoff] - `{ base = 30000 , max = 900000 , jitter = 0.2 }`, milliseconds.
 * @param {number} [options.maxAttempts=10] - Retries before an item is rejected as `exhausted`.
 * @param {number} [options.claimTimeout=120000] - A `posting` item older than this goes back to pending.
 * @param {number} [options.keepDone=86400000] - How long a done item keeps its result.
 * @param {number} [options.softLimit=209715200] - Bytes : beyond, queuing files throws a `quota` error (JSON items always pass).
 * @param {number} [options.concurrency=1] - Items sent at once.
 * @param {Function} [options.now=Date.now]
 * @param {Function} [options.random=Math.random]
 * @param {Function} [options.estimate] - `() => Promise<{ usage , quota }>`.
 * @param {Function} [options.persist] - `() => Promise<boolean>`, asked once, at the first item queued.
 * @returns {Object} `{ enqueue , list , get , counts , retry , remove , clear , drain , recover , subscribe , getScope , setScope , getLastSyncAt , isDraining , nextWakeAt }`.
 *
 * @example
 * const outbox = createOutbox({
 *     repository : idbRepository( await openOfflineDb( 'wms' ) ) ,
 *     send       : httpTransport( { base : '/api' , headers : () => ( { Authorization : `Bearer ${ token }` } ) } ) ,
 * }) ;
 * await outbox.enqueue( { kind : 'receipts' , target : 'PO-118' , payload : { body : receipt } } ) ;
 * await outbox.drain( { online : true } ) ;
 */
const createOutbox =
({
    repository ,
    send ,
    scope : initialScope = null ,
    onSettle ,
    onConflict ,
    backoff ,
    maxAttempts  = 10 ,
    claimTimeout = 120000 ,
    keepDone     = 86400000 ,
    softLimit    = 200 * 1024 * 1024 ,
    concurrency  = 1 ,
    now          = Date.now ,
    random       = Math.random ,
    estimate     = estimateStorage ,
    persist      = persistStorage ,
} = {}) =>
{
    if ( !repository )
    {
        throw new TypeError( 'An outbox needs a repository.' ) ;
    }

    let scope = initialScope ?? null ;
    let running = null ;
    let persistAsked = false ;

    const listeners = new Set() ;
    const claimed   = new Set() ;

    const emit = () =>
    {
        for ( const listener of listeners )
        {
            try
            {
                listener() ;
            }
            catch ( error )
            {
                console.error( error ) ;
            }
        }
    } ;

    const settle = item =>
    {
        try
        {
            onSettle?.( item ) ;
        }
        catch ( error )
        {
            console.error( error ) ;
        }
    } ;

    const reconcile = async () =>
    {
        const items = await repository.all() ;
        const { block , unblock } = reconcileBlocked( items ) ;

        if ( !block.length && !unblock.length )
        {
            return false ;
        }

        const changed = items
            .filter( item => block.includes( item.id ) || unblock.includes( item.id ) )
            .map( item => ({ ...item , status : block.includes( item.id ) ? BLOCKED : PENDING , updatedAt : now() }) ) ;

        await repository.putMany( changed ) ;

        for ( const item of changed )
        {
            if ( item.status === BLOCKED )
            {
                settle( item ) ;
            }
        }

        return true ;
    } ;

    const list = async () => ( await repository.all() ).sort( compareItems ) ;

    const recover = async () =>
    {
        const items   = await repository.all() ;
        const orphans = findOrphans( items , now() , claimTimeout ).filter( item => !claimed.has( item.id ) ) ;
        const swept   = findSwept( items , now() , keepDone ) ;

        if ( orphans.length )
        {
            await repository.putMany( orphans.map( item => ({ ...item , claimedAt : null , status : PENDING , updatedAt : now() }) ) ) ;
        }

        for ( const item of swept )
        {
            await repository.delete( item.id ) ;
        }

        const reconciled = await reconcile() ;

        if ( orphans.length || swept.length || reconciled )
        {
            emit() ;
        }
    } ;

    const enqueue = async init =>
    {
        const stored = await Promise.all( ( init?.files ?? [] ).map( toStoredFile ) ) ;

        if ( stored.length )
        {
            const size = stored.reduce( ( sum , file ) => sum + file.size , 0 ) ;
            const { usage } = await estimate() ;
            if ( usage + size > softLimit )
            {
                throw createOutboxError( { code : QUOTA , message : 'The device storage is too full to queue these files.' } ) ;
            }
        }

        const items = await repository.all() ;
        const { posting , replaced } = findReplaced( items , { kind : init?.kind , scope , target : init?.target ?? null } ) ;

        const item = createItem(
        {
            ...init ,
            after : [ ...( init?.after ?? [] ) , ...posting.map( other => other.id ) ] ,
            files : stored.map( ( { bytes , ...meta } ) => meta ) ,
            scope ,
        }
        , now() ) ;

        for ( const old of replaced )
        {
            await repository.delete( old.id ) ;
        }

        const rewired = rewire( items , replaced.map( old => old.id ) , item.id ) ;

        if ( rewired.length )
        {
            await repository.putMany( rewired ) ;
        }

        await repository.put( item , stored.length ? stored : undefined ) ;

        if ( !persistAsked )
        {
            persistAsked = true ;
            if ( !( await repository.getMeta( 'persisted' ) ) )
            {
                await repository.setMeta( 'persisted' , await persist() ) ;
            }
        }

        await reconcile() ;
        emit() ;

        return item ;
    } ;

    const retry = async id =>
    {
        const item = await repository.get( id ) ;

        if ( !item || !FAILED.includes( item.status ) )
        {
            return item ;
        }

        const next = { ...item , attempts : 0 , lastError : null , nextAttemptAt : now() , status : PENDING , updatedAt : now() } ;

        await repository.put( next ) ;
        await reconcile() ;
        emit() ;

        return repository.get( id ) ;
    } ;

    const remove = async id =>
    {
        await repository.delete( id ) ;
        await reconcile() ;
        emit() ;
    } ;

    const clear = async () =>
    {
        await repository.clear() ;
        emit() ;
    } ;

    const run = ( { online = true , signal } = {} ) =>
    {
        if ( !online || !send )
        {
            return list().then( items => ({ failed : 0 , nextAt : nextWakeAt( items , scope ) , sent : 0 , stopped : true }) ) ;
        }

        if ( running )
        {
            return running ;
        }

        running = ( async () =>
        {
            try
            {
                await recover() ;
                return await drain(
                {
                    backoff , claimed , concurrency , emit , maxAttempts , now , onConflict , random , reconcile , repository , send , settle ,
                    getScope : () => scope ,
                }
                , signal ) ;
            }
            finally
            {
                running = null ;
                emit() ;
            }
        })() ;

        emit() ;

        return running ;
    } ;

    return {
        enqueue ,
        list ,
        get           : id => repository.get( id ) ,
        counts        : async () => summarize( await repository.all() , scope ) ,
        retry ,
        remove ,
        clear ,
        drain         : run ,
        recover ,
        subscribe     : listener =>
        {
            listeners.add( listener ) ;
            return () => listeners.delete( listener ) ;
        } ,
        getScope      : () => scope ,
        setScope      : next =>
        {
            scope = next ?? null ;
            emit() ;
        } ,
        getLastSyncAt : () => repository.getMeta( 'lastSyncAt' ) ,
        isDraining    : () => running !== null ,
        nextWakeAt    : async () => nextWakeAt( await repository.all() , scope ) ,
    } ;
} ;

export default createOutbox ;
