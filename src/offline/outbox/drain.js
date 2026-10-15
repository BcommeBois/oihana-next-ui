import { backoffDelay , byId , classifyError , collectRefs , nextDue , nextWakeAt } from './queue' ;
import { CONFLICT , DONE , EXHAUSTED , PENDING , POSTING , REJECTED , toLastError } from './schema' ;

/**
 * What a failed send makes of an item, and whether the round stops : a
 * network or auth failure stops it (the next items would fail the same way)
 * and counts no attempt ; a retry backs off until `maxAttempts`, then rejects.
 *
 * @param {Object} item - The item as it was sent.
 * @param {*} error - What `send` threw.
 * @param {Object} options
 * @param {number} options.now
 * @param {Object} [options.backoff] - `{ base , max , jitter }`.
 * @param {number} [options.maxAttempts=10]
 * @param {Function} [options.random=Math.random]
 * @returns {{ item : Object , kind : string , stop : boolean }}
 */
export const applyFailure = ( item , error , { backoff , maxAttempts = 10 , now , random = Math.random } ) =>
{
    const kind      = classifyError( error ) ;
    const lastError = toLastError( error ) ;
    const base      = { ...item , claimedAt : null , lastError , updatedAt : now } ;

    if ( kind === 'network' || kind === 'auth' )
    {
        return { item : { ...base , status : PENDING } , kind , stop : true } ;
    }

    const attempts = ( item.attempts ?? 0 ) + 1 ;

    if ( kind === 'retry' )
    {
        if ( attempts >= maxAttempts )
        {
            return {
                item : { ...base , attempts , lastError : { ...lastError , code : lastError.code ?? EXHAUSTED , exhausted : true } , status : REJECTED } ,
                kind : 'reject' ,
                stop : false ,
            } ;
        }
        return {
            item : { ...base , attempts , nextAttemptAt : now + backoffDelay( attempts , backoff , random ) , status : PENDING } ,
            kind ,
            stop : false ,
        } ;
    }

    return { item : { ...base , attempts , status : kind === 'conflict' ? CONFLICT : REJECTED } , kind , stop : false } ;
} ;

/**
 * What the app's `onConflict` answer makes of a conflicting item.
 *
 * @param {Object} item - In `conflict`.
 * @param {*} decision - `'retry'` (send it again now), `'reject'`, `'done'`, anything else keeps the conflict.
 * @param {number} now
 * @returns {Object}
 */
export const applyConflictDecision = ( item , decision , now ) =>
{
    switch ( decision )
    {
        case 'retry'  : return { ...item , nextAttemptAt : now , status : PENDING } ;
        case 'reject' : return { ...item , status : REJECTED } ;
        case 'done'   : return { ...item , status : DONE } ;
        default       : return item ;
    }
} ;

/**
 * Sends the due items, oldest first, `concurrency` at a time, until none is
 * due, the network goes, or `signal` aborts. Used by `createOutbox`, which
 * owns the shared state handed in `context`.
 *
 * @param {Object} context
 * @param {Object} context.repository
 * @param {Function} context.send - `( item , refs , { files , signal } ) => Promise<result>`.
 * @param {Function} context.getScope
 * @param {Set<string>} context.claimed - The ids being sent by this outbox.
 * @param {Function} context.emit - Tells the subscribers the queue changed.
 * @param {Function} context.reconcile - Applies the blocked / unblocked changes.
 * @param {Function} context.settle - `( item ) => void`, for an item reaching a final status.
 * @param {Function} context.now
 * @param {Function} context.random
 * @param {Object} context.backoff
 * @param {number} context.maxAttempts
 * @param {number} context.concurrency
 * @param {Function} [context.onConflict]
 * @param {AbortSignal} [signal]
 * @returns {Promise<{ sent : number , failed : number , stopped : boolean , nextAt : ?number }>}
 */
const drain = async ( context , signal ) =>
{
    const { backoff , claimed , concurrency , emit , getScope , maxAttempts , now , onConflict , random , reconcile , repository , send , settle } = context ;

    const state = { failed : 0 , sent : 0 , stopped : false } ;

    const sendOne = async item =>
    {
        const items  = await repository.all() ;
        const posted = { ...item , claimedAt : now() , status : POSTING , updatedAt : now() } ;

        await repository.put( posted ) ;
        emit() ;

        const refs  = collectRefs( item , byId( items ) ) ;
        const files = item.files?.length ? await repository.getFiles( item.id ) : [] ;

        let next ;

        try
        {
            const result = await send( posted , refs , { files , signal } ) ;
            next = { ...posted , claimedAt : null , lastError : null , result : result ?? null , status : DONE , updatedAt : now() } ;
            state.sent += 1 ;
            await repository.setMeta( 'lastSyncAt' , next.updatedAt ) ;
        }
        catch ( error )
        {
            const outcome = applyFailure( posted , error , { backoff , maxAttempts , now : now() , random } ) ;

            next = outcome.item ;

            if ( outcome.kind === 'conflict' && onConflict )
            {
                next = applyConflictDecision( next , await onConflict( next , error ) , now() ) ;
            }

            state.failed += 1 ;
            state.stopped = state.stopped || outcome.stop ;
        }

        // Abandoned while it was on its way : nothing to write back.
        if ( await repository.get( item.id ) )
        {
            await repository.put( next ) ;
            if ( next.status !== PENDING )
            {
                settle( next ) ;
            }
        }

        await reconcile() ;
        emit() ;
    } ;

    const worker = async () =>
    {
        while ( !state.stopped && !signal?.aborted )
        {
            const item = nextDue( await repository.all() , now() , getScope() , claimed ) ;

            if ( !item )
            {
                return ;
            }

            claimed.add( item.id ) ;

            try
            {
                await sendOne( item ) ;
            }
            finally
            {
                claimed.delete( item.id ) ;
            }
        }
    } ;

    await Promise.all( Array.from( { length : Math.max( 1 , concurrency ) } , worker ) ) ;

    return { ...state , nextAt : nextWakeAt( await repository.all() , getScope() ) } ;
} ;

export default drain ;
