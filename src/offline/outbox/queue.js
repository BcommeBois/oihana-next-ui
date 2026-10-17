import { BLOCKED , DONE , FAILED , PENDING , POSTING , SETTLED , STATUSES } from './schema' ;

/**
 * The rules of the queue, pure : they read a list of items and say what to do,
 * the outbox writes it. Nothing here touches a repository or a clock of its own.
 */

/**
 * Whether an item belongs to the current account. Two missing scopes match.
 *
 * @param {Object} item
 * @param {?string} scope
 * @returns {boolean}
 */
export const sameScope = ( item , scope ) => ( item.scope ?? null ) === ( scope ?? null ) ;

/**
 * Indexes items by id.
 *
 * @param {Object[]} items
 * @returns {Map<string, Object>}
 */
export const byId = items => new Map( items.map( item => [ item.id , item ] ) ) ;

/**
 * Orders items the way they leave : by creation, then by id for a stable tie.
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {number}
 */
export const compareItems = ( a , b ) => ( a.createdAt - b.createdAt ) || ( a.id < b.id ? -1 : a.id > b.id ? 1 : 0 ) ;

/**
 * Whether an item may leave now : pending, of this account, its time come,
 * every `dependsOn` done and every `after` over (or gone).
 *
 * @param {Object} item
 * @param {Map<string, Object>} index - From `byId`.
 * @param {number} now
 * @param {?string} scope
 * @returns {boolean}
 */
export const isDue = ( item , index , now , scope ) =>
{
    if ( item.status !== PENDING || !sameScope( item , scope ) || item.nextAttemptAt > now )
    {
        return false ;
    }

    const dependsOn = item.dependsOn ?? [] ;
    const after     = item.after ?? [] ;

    return dependsOn.every( id => index.get( id )?.status === DONE )
        && after.every( id => !index.has( id ) || SETTLED.includes( index.get( id ).status ) ) ;
} ;

/**
 * The next item to send : the oldest due one, skipping those already claimed.
 *
 * @param {Object[]} items
 * @param {number} now
 * @param {?string} scope
 * @param {Set<string>} [claimed] - Ids taken by another sender of this outbox.
 * @returns {?Object}
 */
export const nextDue = ( items , now , scope , claimed = new Set() ) =>
{
    const index = byId( items ) ;
    return items
        .filter( item => !claimed.has( item.id ) && isDue( item , index , now , scope ) )
        .sort( compareItems )[ 0 ] ?? null ;
} ;

/**
 * When the next pending item of this account comes due — to schedule a wake-up.
 *
 * @param {Object[]} items
 * @param {?string} scope
 * @returns {?number}
 */
export const nextWakeAt = ( items , scope ) =>
{
    const times = items
        .filter( item => item.status === PENDING && sameScope( item , scope ) )
        .map( item => item.nextAttemptAt ) ;
    return times.length ? Math.min( ...times ) : null ;
} ;

/**
 * Which items change between pending and blocked : a pending item whose
 * `dependsOn` failed or is gone is blocked ; a blocked one whose dependencies
 * recovered is pending again. Follows the chains (a line blocked by a blocked
 * line). `after` never blocks.
 *
 * @param {Object[]} items
 * @returns {{ block : string[] , unblock : string[] }}
 */
export const reconcileBlocked = items =>
{
    const status = new Map( items.map( item => [ item.id , item.status ] ) ) ;

    const broken = item => ( item.dependsOn ?? [] ).some( id => !status.has( id ) || FAILED.includes( status.get( id ) ) ) ;

    let changed = true ;

    while ( changed )
    {
        changed = false ;
        for ( const item of items )
        {
            const current = status.get( item.id ) ;
            if ( current === PENDING && broken( item ) )
            {
                status.set( item.id , BLOCKED ) ;
                changed = true ;
            }
            else if ( current === BLOCKED && !broken( item ) )
            {
                status.set( item.id , PENDING ) ;
                changed = true ;
            }
        }
    }

    return {
        block   : items.filter( item => item.status === PENDING && status.get( item.id ) === BLOCKED ).map( item => item.id ) ,
        unblock : items.filter( item => item.status === BLOCKED && status.get( item.id ) === PENDING ).map( item => item.id ) ,
    } ;
} ;

/**
 * The wait before attempt `attempts + 1` : doubles from `base`, capped at
 * `max`, spread by `± jitter` so a fleet of devices does not retry in step.
 *
 * @param {number} attempts - The attempts already failed (1 after the first failure).
 * @param {Object} [options]
 * @param {number} [options.base=30000] - Milliseconds.
 * @param {number} [options.max=900000] - Milliseconds.
 * @param {number} [options.jitter=0.2] - A fraction.
 * @param {Function} [random=Math.random]
 * @returns {number} Milliseconds.
 */
export const backoffDelay = ( attempts , { base = 30000 , jitter = 0.2 , max = 900000 } = {} , random = Math.random ) =>
{
    const delay = Math.min( base * 2 ** Math.max( 0 , attempts - 1 ) , max ) ;
    return Math.round( delay * ( 1 + ( random() * 2 - 1 ) * jitter ) ) ;
} ;

/**
 * What a failure means for the queue :
 * - `network` : nothing reached the server (status 0) — wait for the network, no attempt counted ;
 * - `auth` : 401 — the app signs in again, the item waits, no attempt counted ;
 * - `retry` : 408, 425, 429, 5xx, a timeout, or an error with no status — try later, attempt counted ;
 * - `conflict` : 409, 412 — the target changed elsewhere ;
 * - `reject` : any other 4xx — refused for good.
 *
 * A timeout is the transport's (status 0) : a server answering a 4xx with a
 * `timeout` reason is classified by its status.
 *
 * @param {*} error
 * @returns {'network'|'auth'|'retry'|'conflict'|'reject'}
 */
export const classifyError = error =>
{
    const status = typeof error?.status === 'number' ? error.status : null ;

    if ( status === 0 && error?.code === 'timeout' )
    {
        return 'retry' ;
    }

    if ( status === 0 )
    {
        return 'network' ;
    }

    if ( status === null || status === 408 || status === 425 || status === 429 || status >= 500 )
    {
        return 'retry' ;
    }

    if ( status === 401 )
    {
        return 'auth' ;
    }

    if ( status === 409 || status === 412 )
    {
        return 'conflict' ;
    }

    return status >= 400 ? 'reject' : 'retry' ;
} ;

/**
 * What a new item of a `kind` and a `target` does to the queue : the pending
 * (or blocked) ones of the same kind, target and account are replaced ; the
 * ones being sent cannot be, so the new one waits for them (`after`).
 *
 * @param {Object[]} items
 * @param {Object} next - `{ kind , target , scope }`.
 * @returns {{ replaced : Object[] , posting : Object[] }}
 */
export const findReplaced = ( items , { kind , scope , target } ) =>
{
    if ( target === null || target === undefined )
    {
        return { posting : [] , replaced : [] } ;
    }

    const same = items.filter( item => item.kind === kind && item.target === target && sameScope( item , scope ) ) ;

    return {
        posting  : same.filter( item => item.status === POSTING ) ,
        replaced : same.filter( item => item.status === PENDING || item.status === BLOCKED ) ,
    } ;
} ;

/**
 * Points the links of the other items from replaced ids to the new one.
 *
 * @param {Object[]} items
 * @param {string[]} oldIds
 * @param {string} newId
 * @returns {Object[]} The items that changed, as new objects.
 */
export const rewire = ( items , oldIds , newId ) =>
{
    const swap = ids => [ ...new Set( ( ids ?? [] ).map( id => oldIds.includes( id ) ? newId : id ) ) ] ;

    return items
        .filter( item => !oldIds.includes( item.id ) && [ ...( item.dependsOn ?? [] ) , ...( item.after ?? [] ) ].some( id => oldIds.includes( id ) ) )
        .map( item => ({ ...item , after : swap( item.after ) , dependsOn : swap( item.dependsOn ) }) ) ;
} ;

/**
 * Items left `posting` longer than `claimTimeout` : a page closed or a
 * connection cut mid-send. They go back to pending ; the server's idempotency
 * absorbs the copy it may already hold.
 *
 * @param {Object[]} items
 * @param {number} now
 * @param {number} claimTimeout - Milliseconds.
 * @returns {Object[]}
 */
export const findOrphans = ( items , now , claimTimeout ) =>
    items.filter( item => item.status === POSTING && ( item.claimedAt ?? 0 ) + claimTimeout <= now ) ;

/**
 * Done items older than `keepDone`, except those a waiting item still needs
 * the result of.
 *
 * @param {Object[]} items
 * @param {number} now
 * @param {number} keepDone - Milliseconds.
 * @returns {Object[]}
 */
export const findSwept = ( items , now , keepDone ) =>
{
    const needed = new Set( items.filter( item => item.status !== DONE ).flatMap( item => item.dependsOn ?? [] ) ) ;
    return items.filter( item => item.status === DONE && !needed.has( item.id ) && item.updatedAt + keepDone <= now ) ;
} ;

/**
 * The results of an item's dependencies, by id — what `send` receives as `refs`.
 *
 * @param {Object} item
 * @param {Map<string, Object>} index - From `byId`.
 * @returns {Object<string, *>}
 */
export const collectRefs = ( item , index ) =>
    Object.fromEntries( ( item.dependsOn ?? [] ).map( id => [ id , index.get( id )?.result ?? null ] ) ) ;

/**
 * Counts the items of this account by status ; `other` counts the items of
 * other accounts, kept and never sent.
 *
 * @param {Object[]} items
 * @param {?string} scope
 * @returns {Object<string, number>} `{ pending , posting , done , rejected , conflict , blocked , other , total }`.
 */
export const summarize = ( items , scope ) =>
{
    const counts = Object.fromEntries( STATUSES.map( status => [ status , 0 ] ) ) ;
    counts.other = 0 ;

    for ( const item of items )
    {
        if ( sameScope( item , scope ) )
        {
            counts[ item.status ] += 1 ;
        }
        else
        {
            counts.other += 1 ;
        }
    }

    counts.total = items.length ;

    return counts ;
} ;
