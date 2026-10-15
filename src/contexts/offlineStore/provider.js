'use client' ;

import { useCallback , useEffect , useMemo , useRef , useState } from 'react' ;

import openOfflineDb         from '../../offline/db' ;
import createStore           from '../../offline/store/createStore' ;
import idbStoreRepository    from '../../offline/store/idbStoreRepository' ;
import memoryStoreRepository from '../../offline/store/memoryStoreRepository' ;

import useOutbox from '../outbox/useOutbox' ;

import OfflineStoreContext from './context' ;

/**
 * A promise to resolve from outside : what the reserve's methods wait on
 * before the database is open.
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
 * OfflineStoreProvider — the reserve of an application : what it keeps on the
 * device to read without a network.
 *
 * Opens the IndexedDB database `name` — the outbox's, when there is one — in
 * the browser (a memory reserve where IndexedDB is missing). Sweeps it at mount
 * and every `interval` : the expired records first, then the oldest over the
 * soft limit, never a pinned one, and — inside an `OutboxProvider` — never one
 * a waiting send `uses`. Every tab sees a record change (`BroadcastChannel`).
 *
 * @module contexts/offlineStore/provider
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.name - The database, one per application (the outbox's).
 * @param {number} [props.interval=3600000] - Milliseconds between two sweeps.
 * @param {string} [props.locale] - The language texts are sorted in.
 * @param {Object} [props.options] - Passed to `createStore` : `ttl`, `softLimit`. Read once.
 *
 * @example
 * ```jsx
 * <OutboxProvider name="wms" send={ send }>
 *     <OfflineStoreProvider name="wms" options={ { ttl : 3 * 24 * 3600 * 1000 } }>
 *         <App />
 *     </OfflineStoreProvider>
 * </OutboxProvider>
 * ```
 */
const OfflineStoreProvider =
({
    children ,
    interval = 3600000 ,
    locale ,
    name ,
    options ,
}) =>
{
    const outbox = useOutbox() ;

    const [ ready , setReady ] = useState( false ) ;

    const storeRef     = useRef( null ) ;
    const opened       = useRef( null ) ;
    const listeners    = useRef( new Set() ) ;
    const descriptions = useRef( new Map() ) ;
    const latest       = useRef( { keep : [] , locale , options } ) ;

    if ( opened.current === null )
    {
        opened.current = deferred() ;
    }

    // The records a waiting send uses : never swept.
    const items = outbox?.items ;

    useEffect( () =>
    {
        latest.current =
        {
            keep : ( items ?? [] ).filter( item => item.status !== 'done' ).flatMap( item => item.uses ?? [] ) ,
            locale ,
            options ,
        } ;
    } ) ;

    useEffect( () =>
    {
        let cancelled = false ;
        let channel = null ;
        let db = null ;
        let timer = null ;
        let unsubscribe = null ;

        const tell = change =>
        {
            for ( const listener of listeners.current )
            {
                listener( change ) ;
            }
        } ;

        const start = async () =>
        {
            let repository ;

            try
            {
                db = await openOfflineDb( name ) ;
                repository = idbStoreRepository( db ) ;
            }
            catch
            {
                repository = memoryStoreRepository() ;
            }

            if ( cancelled )
            {
                db?.close() ;
                return ;
            }

            const store = createStore( { ...latest.current.options , locale : latest.current.locale , repository } ) ;

            for ( const [ kind , description ] of descriptions.current )
            {
                store.describe( kind , description ) ;
            }

            channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel( `oihana-store:${ name }` ) : null ;

            if ( channel )
            {
                channel.onmessage = event => tell( { ...event.data , remote : true } ) ;
            }

            unsubscribe = store.subscribe( change =>
            {
                tell( change ) ;
                channel?.postMessage( change ) ;
            }) ;

            const sweep = () => store.sweep( { keep : latest.current.keep } ).catch( () => {} ) ;

            await sweep() ;
            timer = setInterval( sweep , interval ) ;

            if ( cancelled )
            {
                return ;
            }

            storeRef.current = store ;
            setReady( true ) ;
            opened.current.resolve( store ) ;
        } ;

        start() ;

        return () =>
        {
            cancelled = true ;
            clearInterval( timer ) ;
            unsubscribe?.() ;
            channel?.close() ;
            db?.close() ;
            storeRef.current = null ;
            opened.current = deferred() ;
            setReady( false ) ;
        } ;
    }
    , [ interval , name ] ) ;

    const wait = useCallback( () => opened.current.promise , [] ) ;

    const describe = useCallback( ( kind , description ) =>
    {
        if ( description !== undefined )
        {
            descriptions.current.set( kind , description ) ;
            storeRef.current?.describe( kind , description ) ;
        }
        return descriptions.current.get( kind ) ?? {} ;
    }
    , [] ) ;

    const subscribe = useCallback( listener =>
    {
        listeners.current.add( listener ) ;
        return () => listeners.current.delete( listener ) ;
    }
    , [] ) ;

    const sweep = useCallback( async () => ( await wait() ).sweep( { keep : latest.current.keep } ) , [ wait ] ) ;

    const value = useMemo( () => (
    {
        clear    : async kind => ( await wait() ).clear( kind ) ,
        describe ,
        forget   : async ( kind , key ) => ( await wait() ).forget( kind , key ) ,
        list     : async kind => ( await wait() ).list( kind ) ,
        pin      : async ( kind , key , pinned ) => ( await wait() ).pin( kind , key , pinned ) ,
        query    : async ( kind , request ) => ( await wait() ).query( kind , request ) ,
        read     : async ( kind , key ) => ( await wait() ).read( kind , key ) ,
        ready ,
        remember : async ( kind , key , record , settings ) => ( await wait() ).remember( kind , key , record , settings ) ,
        rememberMany : async ( kind , entries , settings ) => ( await wait() ).rememberMany( kind , entries , settings ) ,
        subscribe ,
        sweep ,
    } )
    , [ describe , ready , subscribe , sweep , wait ] ) ;

    return (
        <OfflineStoreContext value={ value }>
            { children }
        </OfflineStoreContext>
    ) ;
} ;

export default OfflineStoreProvider ;
