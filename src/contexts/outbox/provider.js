'use client' ;

import { useCallback , useEffect , useMemo , useRef , useState } from 'react' ;

import useOnline from '../../hooks/useOnline' ;

import openOfflineDb    from '../../offline/db' ;
import createOutbox     from '../../offline/outbox/createOutbox' ;
import idbRepository    from '../../offline/outbox/idbRepository' ;
import memoryRepository from '../../offline/outbox/memoryRepository' ;

import OutboxContext from './context' ;

const EMPTY_COUNTS = { blocked : 0 , conflict : 0 , done : 0 , other : 0 , pending : 0 , posting : 0 , rejected : 0 , total : 0 } ;

/**
 * A promise to resolve from outside : what `enqueue` waits on before the
 * database is open.
 *
 * @returns {{ promise : Promise , resolve : Function }}
 */
const deferred = () =>
{
    let resolve ;
    const promise = new Promise( done => { resolve = done ; } ) ;
    return { promise , resolve } ;
} ;

/**
 * OutboxProvider — the outbox of an application, mounted once near its root.
 *
 * Opens the IndexedDB database `name` in the browser (a memory queue where
 * IndexedDB is missing), and sends what is due : at mount, when the server can
 * be reached again (`useOnline`), when the page comes back to the foreground,
 * when a backed-off item comes due, every `interval` while items wait, and
 * right after an item is queued. Never offline.
 *
 * One tab sends at a time (`navigator.locks`) ; every tab sees the queue change
 * (`BroadcastChannel`). `send`, `onSettle` and `onConflict` are read at each
 * use, so inline functions are fine ; `options` are read once, when the
 * database opens.
 *
 * @module contexts/outbox/provider
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.name - The database, one per application (`'wms'`).
 * @param {Function} props.send - `( item , refs , { files , signal } ) => Promise<result>` : `httpTransport( … )`, or the app's own (a Server Action by kind).
 * @param {?string} [props.scope=null] - The signed-in account : the items of another one are kept and never sent.
 * @param {Function} [props.onSettle] - `( item ) => void` when an item is sent, refused, in conflict or blocked — where the app toasts.
 * @param {Function} [props.onConflict] - `( item , error ) => 'retry' | 'reject' | 'done' | undefined` for a 409 / 412.
 * @param {Object} [props.options] - Passed to `createOutbox` : `backoff`, `maxAttempts`, `claimTimeout`, `keepDone`, `softLimit`, `concurrency`.
 * @param {boolean} [props.online] - Forces the network state ; `useOnline` decides otherwise.
 * @param {Object} [props.onlineOptions] - Passed to `useOnline` : `url`, `interval`, `timeout`.
 * @param {number} [props.interval=60000] - Milliseconds between two rounds while items wait.
 *
 * @example
 * ```jsx
 * <OutboxProvider
 *     name    = "wms"
 *     scope   = { user.id }
 *     send    = { httpTransport( { base : API , headers : () => ( { Authorization : `Bearer ${ token() }` } ) } ) }
 *     onSettle = { item => item.status === 'rejected' && toast( item.lastError.message , 'error' ) }
 * >
 *     <App />
 * </OutboxProvider>
 * ```
 */
const OutboxProvider =
({
    children ,
    interval = 60000 ,
    name ,
    online : forced ,
    onConflict ,
    onlineOptions ,
    onSettle ,
    options ,
    scope = null ,
    send ,
}) =>
{
    const { online : reachable } = useOnline( { ...onlineOptions , enabled : forced === undefined } ) ;

    const online = forced ?? reachable ;

    const [ ready      , setReady      ] = useState( false ) ;
    const [ items      , setItems      ] = useState( [] ) ;
    const [ counts     , setCounts     ] = useState( EMPTY_COUNTS ) ;
    const [ lastSyncAt , setLastSyncAt ] = useState( null ) ;
    const [ draining   , setDraining   ] = useState( false ) ;

    const outboxRef = useRef( null ) ;
    const timer     = useRef( null ) ;
    const opened    = useRef( null ) ;
    const latest    = useRef( { onConflict , online , onSettle , options , scope , send } ) ;

    if ( opened.current === null )
    {
        opened.current = deferred() ;
    }

    useEffect( () =>
    {
        latest.current = { onConflict , online , onSettle , options , scope , send } ;
    } ) ;

    // The database and the outbox : opened in the browser, once per name.
    useEffect( () =>
    {
        let cancelled = false ;
        let channel = null ;
        let db = null ;
        let unsubscribe = null ;

        const start = async () =>
        {
            let repository ;

            try
            {
                db = await openOfflineDb( name ) ;
                repository = idbRepository( db ) ;
            }
            catch
            {
                repository = memoryRepository() ;
            }

            if ( cancelled )
            {
                db?.close() ;
                return ;
            }

            const outbox = createOutbox(
            {
                ...latest.current.options ,
                onConflict : ( item , error ) => latest.current.onConflict?.( item , error ) ,
                onSettle   : item => latest.current.onSettle?.( item ) ,
                repository ,
                scope      : latest.current.scope ,
                send       : ( item , refs , context ) => latest.current.send( item , refs , context ) ,
            }) ;

            const refresh = async () =>
            {
                const [ list , summary , last ] = await Promise.all( [ outbox.list() , outbox.counts() , outbox.getLastSyncAt() ] ) ;
                if ( !cancelled )
                {
                    setItems( list ) ;
                    setCounts( summary ) ;
                    setLastSyncAt( last ) ;
                    setDraining( outbox.isDraining() ) ;
                }
            } ;

            channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel( `oihana-outbox:${ name }` ) : null ;

            if ( channel )
            {
                channel.onmessage = () => refresh() ;
            }

            unsubscribe = outbox.subscribe( () =>
            {
                refresh() ;
                channel?.postMessage( 'changed' ) ;
            }) ;

            await outbox.recover() ;
            await refresh() ;

            if ( cancelled )
            {
                return ;
            }

            outboxRef.current = outbox ;
            setReady( true ) ;
            opened.current.resolve( outbox ) ;
        } ;

        start() ;

        return () =>
        {
            cancelled = true ;
            unsubscribe?.() ;
            channel?.close() ;
            clearTimeout( timer.current ) ;
            db?.close() ;
            outboxRef.current = null ;
            opened.current = deferred() ;
            setReady( false ) ;
        } ;
    }
    , [ name ] ) ;

    // One round : under the tab lock when the browser has one, then a wake-up
    // for the next item due — or for the tab that holds the lock to be done.
    const drain = useCallback( async () =>
    {
        const outbox = outboxRef.current ;

        if ( !outbox )
        {
            return null ;
        }

        clearTimeout( timer.current ) ;

        const run = () => outbox.drain( { online : latest.current.online } ) ;
        const locks = globalThis.navigator?.locks ;

        let skipped = false ;
        let result = null ;

        if ( locks?.request )
        {
            result = await locks.request( `oihana-outbox:${ name }` , { ifAvailable : true } , lock =>
            {
                if ( !lock )
                {
                    skipped = true ;
                    return null ;
                }
                return run() ;
            }) ;
        }
        else
        {
            result = await run() ;
        }

        if ( latest.current.online && outboxRef.current === outbox )
        {
            const nextAt = await outbox.nextWakeAt() ;
            if ( nextAt !== null )
            {
                const delay = skipped ? interval : Math.min( Math.max( nextAt - Date.now() , 1000 ) , interval ) ;
                clearTimeout( timer.current ) ;
                timer.current = setTimeout( drain , delay ) ;
            }
        }

        return result ;
    }
    , [ interval , name ] ) ;

    // At mount and each time the server can be reached again.
    useEffect( () =>
    {
        if ( ready && online )
        {
            drain() ;
        }
        else
        {
            clearTimeout( timer.current ) ;
        }
    }
    , [ drain , online , ready ] ) ;

    // Back to the foreground : a phone may have slept through the timers.
    useEffect( () =>
    {
        const wake = () =>
        {
            if ( document.visibilityState === 'visible' && latest.current.online )
            {
                drain() ;
            }
        } ;
        document.addEventListener( 'visibilitychange' , wake ) ;
        return () => document.removeEventListener( 'visibilitychange' , wake ) ;
    }
    , [ drain ] ) ;

    // The account changes : the queue shows and sends its items only.
    useEffect( () =>
    {
        const outbox = outboxRef.current ;
        if ( ready && outbox && outbox.getScope() !== ( scope ?? null ) )
        {
            outbox.setScope( scope ) ;
            drain() ;
        }
    }
    , [ drain , ready , scope ] ) ;

    const enqueue = useCallback( async init =>
    {
        const outbox = await opened.current.promise ;
        const item = await outbox.enqueue( init ) ;
        drain() ;
        return item ;
    }
    , [ drain ] ) ;

    const retry = useCallback( async id =>
    {
        const outbox = await opened.current.promise ;
        const item = await outbox.retry( id ) ;
        drain() ;
        return item ;
    }
    , [ drain ] ) ;

    const remove = useCallback( async id => ( await opened.current.promise ).remove( id ) , [] ) ;

    const clear = useCallback( async () => ( await opened.current.promise ).clear() , [] ) ;

    const value = useMemo( () => (
    {
        clear ,
        counts ,
        drain ,
        draining ,
        enqueue ,
        items ,
        lastSyncAt ,
        online ,
        ready ,
        remove ,
        retry ,
        scope : scope ?? null ,
    } )
    , [ clear , counts , drain , draining , enqueue , items , lastSyncAt , online , ready , remove , retry , scope ] ) ;

    return (
        <OutboxContext value={ value }>
            { children }
        </OutboxContext>
    ) ;
} ;

export default OutboxProvider ;
