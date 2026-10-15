'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;
import Table            from '@/components/layouts/Table' ;

import useOnline from '@/hooks/useOnline' ;

import useI18n from '@/contexts/locale/useI18n' ;

import openOfflineDb from '@/offline/db' ;
import createOutbox  from '@/offline/outbox/createOutbox' ;
import httpTransport from '@/offline/outbox/httpTransport' ;
import idbRepository from '@/offline/outbox/idbRepository' ;

const BASE = '/api/outbox' ;

const ACCOUNTS = [ { key : 'A' , label : 'A' } , { key : 'B' , label : 'B' } ] ;

const COLORS = { blocked : 'neutral' , conflict : 'warning' , done : 'success' , pending : 'info' , posting : 'primary' , rejected : 'error' } ;

const LINES = [ 'Planche pin 145×26' , 'Lambourde 45×70' , 'Vis inox 5×50' ] ;

const short = id => id.slice( 0 , 8 ) ;

const wait = ms => new Promise( resolve => setTimeout( resolve , ms ) ) ;

/**
 * A line of a quote gets the number the server gave the quote : the
 * substitution is the transport's business, never the queue's.
 *
 * @param {Object} item
 * @param {Object} refs
 * @returns {Object} The request.
 */
const prepare = ( item , refs ) =>
{
    const request = item.payload ?? {} ;
    if ( item.kind !== 'line' )
    {
        return request ;
    }
    const [ quote ] = Object.values( refs ) ;
    return { ...request , body : { ...request.body , quote : quote?.id ?? null } } ;
} ;

/**
 * The outbox, undressed : buttons that queue intentions, the network and the
 * account to play with, and the queue as it is stored.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.offline.outbox'] - Dot notation path to the demo locale.
 */
const OutboxBenchDemo = ( { path = 'demo.offline.outbox' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { online : reachable } = useOnline() ;

    const [ outbox     , setOutbox     ] = useState( null ) ;
    const [ items      , setItems      ] = useState( [] ) ;
    const [ counts     , setCounts     ] = useState( null ) ;
    const [ lastSyncAt , setLastSyncAt ] = useState( null ) ;
    const [ draining   , setDraining   ] = useState( false ) ;
    const [ simulated  , setSimulated  ] = useState( false ) ;
    const [ scope      , setScope      ] = useState( 'A' ) ;
    const [ log        , setLog        ] = useState( [] ) ;
    const [ replay     , setReplay     ] = useState( null ) ;
    const [ now        , setNow        ] = useState( 0 ) ;

    const online = reachable && !simulated ;

    const onlineRef = useRef( online ) ;
    const counter   = useRef( 0 ) ;
    const timer     = useRef( null ) ;

    useEffect( () =>
    {
        onlineRef.current = online ;
    }
    , [ online ] ) ;

    // The outbox lives in the browser only : opened after mount, closed on unmount.
    useEffect( () =>
    {
        let cancelled = false ;
        let db = null ;
        let unsubscribe = null ;

        const start = async () =>
        {
            db = await openOfflineDb( 'lab' ) ;

            if ( cancelled )
            {
                db.close() ;
                return ;
            }

            const next = createOutbox(
            {
                backoff    : { base : 5000 } ,
                onSettle   : item => setLog( previous => [ { at : Date.now() , id : item.id , kind : item.kind , status : item.status } , ...previous ].slice( 0 , 8 ) ) ,
                repository : idbRepository( db ) ,
                scope      : 'A' ,
                send       : httpTransport( { base : BASE , prepare } ) ,
            }) ;

            const refresh = async () =>
            {
                const [ list , summary , last ] = await Promise.all( [ next.list() , next.counts() , next.getLastSyncAt() ] ) ;
                if ( !cancelled )
                {
                    setItems( list ) ;
                    setCounts( summary ) ;
                    setLastSyncAt( last ) ;
                    setDraining( next.isDraining() ) ;
                }
            } ;

            unsubscribe = next.subscribe( refresh ) ;

            await next.recover() ;
            await refresh() ;

            setOutbox( next ) ;
        } ;

        start() ;

        return () =>
        {
            cancelled = true ;
            unsubscribe?.() ;
            clearTimeout( timer.current ) ;
            db?.close() ;
        } ;
    }
    , [] ) ;

    // Sends what is due ; wakes up again when the next backed-off item comes due.
    const drain = useCallback( async () =>
    {
        if ( !outbox )
        {
            return ;
        }

        clearTimeout( timer.current ) ;

        const { nextAt } = await outbox.drain( { online : onlineRef.current } ) ;

        if ( nextAt !== null && onlineRef.current )
        {
            timer.current = setTimeout( drain , Math.max( nextAt - Date.now() , 2000 ) ) ;
        }
    }
    , [ outbox ] ) ;

    useEffect( () =>
    {
        if ( online )
        {
            drain() ;
        }
    }
    , [ drain , online ] ) ;

    // The « in N s » column ticks while an item waits for its time.
    useEffect( () =>
    {
        setNow( Date.now() ) ;

        if ( !items.some( item => item.status === 'pending' && item.nextAttemptAt > Date.now() ) )
        {
            return ;
        }

        const id = setInterval( () => setNow( Date.now() ) , 1000 ) ;

        return () => clearInterval( id ) ;
    }
    , [ items ] ) ;

    const enqueue = async init =>
    {
        await outbox.enqueue( init ) ;
        drain() ;
    } ;

    const pallet = () =>
    {
        counter.current += 1 ;
        return `PAL-${ String( counter.current ).padStart( 3 , '0' ) }` ;
    } ;

    const actions =
    [
        { key : 'simple'   , run : () => enqueue( { kind : 'receipt' , payload : { body : { pallet : pallet() } } } ) } ,
        {
            key : 'photo' ,
            run : () => enqueue(
            {
                files   : [ { bytes : new Blob( [ 'Bon de livraison n° 118' ] , { type : 'text/plain' } ) , field : 'photo' , name : 'bon-118.txt' } ] ,
                kind    : 'receipt' ,
                payload : { body : { pallet : pallet() } } ,
            }) ,
        } ,
        { key : 'reject'   , run : () => enqueue( { kind : 'receipt' , payload : { body : { pallet : pallet() } , url : 'receipt?fail=422' } } ) } ,
        { key : 'conflict' , run : () => enqueue( { kind : 'receipt' , payload : { body : { pallet : pallet() } , url : 'receipt?fail=409' } } ) } ,
        { key : 'modified' , run : () => enqueue( { kind : 'receipt' , payload : { body : { pallet : pallet() } , url : 'receipt?fail=412' } } ) } ,
        { key : 'flaky'    , run : () => enqueue( { kind : 'receipt' , payload : { body : { pallet : pallet() } , url : 'receipt?fail=500&times=2' } } ) } ,
        {
            key : 'quote' ,
            run : async () =>
            {
                const quote = await outbox.enqueue( { kind : 'quote' , payload : { body : { customer : 'Dupont' } } } ) ;
                for ( const [ index , product ] of LINES.entries() )
                {
                    await outbox.enqueue( { dependsOn : [ quote.id ] , kind : 'line' , payload : { body : { product , quantity : ( index + 1 ) * 12 } } } ) ;
                }
                drain() ;
            } ,
        } ,
        { key : 'replace' , run : () => enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-118' , pallet : pallet() } } , target : 'PO-2026-118' } ) } ,
        {
            key : 'after' ,
            run : async () =>
            {
                await outbox.enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-121' , version : 1 } , url : 'receipt?delay=3000' } , target : 'PO-2026-121' } ) ;
                drain() ;
                await wait( 500 ) ;
                await enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-121' , version : 2 } } , target : 'PO-2026-121' } ) ;
            } ,
        } ,
    ] ;

    const changeScope = next =>
    {
        setScope( next ) ;
        outbox?.setScope( next ) ;
        drain() ;
    } ;

    const clear = async () =>
    {
        await outbox.clear() ;
        setLog( [] ) ;
        setReplay( null ) ;
    } ;

    const replayLast = async () =>
    {
        const done = [ ...items ].reverse().find( item => item.status === 'done' ) ;

        if ( !done )
        {
            setReplay( { text : t.controls?.replayNone } ) ;
            return ;
        }

        const request  = prepare( done , {} ) ;
        const response = await fetch( `${ BASE }/${ request.url ?? done.kind }` ,
        {
            body    : JSON.stringify( request.body ?? null ) ,
            headers : { 'Content-Type' : 'application/json' , 'Idempotency-Key' : done.id } ,
            method  : 'POST' ,
        }) ;
        const answer   = await response.json() ;
        const replayed = response.headers.get( 'Idempotent-Replayed' ) === 'true' ;

        setReplay(
        {
            text : replayed
                ? format( t.controls?.replayed ?? '{0} {1} {2}' , response.status , 'true' , answer.id )
                : format( t.controls?.created ?? '{0} {1}' , response.status , answer.id ) ,
        }) ;
    } ;

    const nextAttempt = item =>
    {
        if ( item.status !== 'pending' )
        {
            return '—' ;
        }
        const seconds = Math.ceil( ( item.nextAttemptAt - now ) / 1000 ) ;
        return seconds > 0 ? format( t.table?.in ?? '{0}' , seconds ) : t.table?.now ;
    } ;

    const ready = outbox !== null ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h2 className="text-2xl font-semibold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="grid gap-6 md:grid-cols-2">

                {/* Queue */}
                <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.queue?.title }</h3>
                    <p className="text-xs text-base-content/70">{ t.queue?.text }</p>
                    <div className="flex flex-col gap-2">
                        { actions.map( ( { key , run } ) => (
                            <div className="flex flex-col gap-0.5" key={ key }>
                                <Button className="justify-start" disabled={ !ready } onClick={ run } size="sm" style="outline">{ t.queue?.[ key ] }</Button>
                                { t.queue?.hints?.[ key ] && <span className="text-xs text-base-content/60">{ t.queue.hints[ key ] }</span> }
                            </div>
                        ) ) }
                    </div>
                </section>

                {/* The network and the account */}
                <section className="flex flex-col gap-4 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.controls?.title }</h3>

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge color={ online ? 'success' : 'warning' } style="soft">{ online ? t.controls?.online : t.controls?.away }</Badge>
                        { draining && <Badge color="primary" style="soft">{ t.controls?.draining }</Badge> }
                        <span className="text-xs text-base-content/60">
                            { lastSyncAt ? format( t.controls?.lastSync ?? '{0}' , new Date( lastSyncAt ).toLocaleTimeString() ) : t.controls?.never }
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Toggle checked={ simulated } color="warning" inline label={ t.controls?.offline } onChange={ event => setSimulated( event.target.checked ) } />
                        <span className="text-xs text-base-content/60">{ t.controls?.offlineHelp }</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">{ t.controls?.account }</span>
                            <SegmentedControl ariaLabel={ t.controls?.account } items={ ACCOUNTS } onChange={ changeScope } size="sm" value={ scope } />
                        </div>
                        <span className="text-xs text-base-content/60">{ t.controls?.accountHelp }</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button color="primary" disabled={ !ready } loading={ draining } onClick={ drain } size="sm">{ t.controls?.send }</Button>
                        <Button disabled={ !ready } onClick={ replayLast } size="sm" style="outline" tooltip={ t.controls?.replayHelp }>{ t.controls?.replay }</Button>
                        <Button color="error" disabled={ !ready || !items.length } onClick={ clear } size="sm" style="outline">{ t.controls?.clear }</Button>
                    </div>

                    { replay && <p className="text-xs text-base-content/80" role="status">{ replay.text }</p> }

                    { counts && (
                        <p className="text-xs text-base-content/70 tabular-nums">
                            { format( t.controls?.counts ?? '' , counts.pending + counts.posting , counts.rejected , counts.conflict , counts.blocked , counts.done , counts.other ) }
                        </p>
                    ) }
                </section>
            </div>

            {/* The queue as it is stored */}
            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                <Table size="sm" zebra>
                    <caption className="caption-top pb-2 text-left text-sm font-semibold">{ t.table?.caption }</caption>
                    <thead>
                        <tr>
                            <th>{ t.table?.id }</th>
                            <th>{ t.table?.kind }</th>
                            <th>{ t.table?.scope }</th>
                            <th>{ t.table?.status }</th>
                            <th className="text-right">{ t.table?.attempts }</th>
                            <th>{ t.table?.next }</th>
                            <th>{ t.table?.error }</th>
                            <th>{ t.table?.result }</th>
                            <th>{ t.table?.actions }</th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.length === 0 && (
                            <tr><td className="text-center text-base-content/60" colSpan={ 9 }>{ t.table?.empty }</td></tr>
                        ) }
                        { items.map( item => (
                            <tr className={ item.scope !== scope ? 'opacity-50' : undefined } key={ item.id }>
                                <td className="font-mono text-xs">{ short( item.id ) }</td>
                                <td>
                                    { item.kind }
                                    { item.target && <span className="block text-xs text-base-content/60">{ item.target }</span> }
                                    { item.dependsOn.map( id => <span className="block text-xs text-base-content/60" key={ id }>{ format( t.table?.needs ?? '{0}' , short( id ) ) }</span> ) }
                                    { item.after.map( id => <span className="block text-xs text-base-content/60" key={ id }>{ format( t.table?.after ?? '{0}' , short( id ) ) }</span> ) }
                                </td>
                                <td>{ item.scope }</td>
                                <td><Badge color={ COLORS[ item.status ] } size="sm" style="soft">{ t.statuses?.[ item.status ] ?? item.status }</Badge></td>
                                <td className="text-right tabular-nums">{ item.attempts }</td>
                                <td className="tabular-nums">{ nextAttempt( item ) }</td>
                                <td className="text-xs">
                                    { item.lastError
                                        ? (
                                            <>
                                                <span className="font-mono">{ [ item.lastError.status || null , item.lastError.code ].filter( Boolean ).join( ' · ' ) }</span>
                                                { item.lastError.exhausted && <span className="block text-base-content/60">{ t.table?.exhausted }</span> }
                                            </>
                                        )
                                        : '—' }
                                </td>
                                <td className="font-mono text-xs">{ item.result?.id ?? '—' }</td>
                                <td>
                                    <div className="flex gap-1">
                                        { [ 'rejected' , 'conflict' , 'blocked' ].includes( item.status ) && (
                                            <Button onClick={ async () => { await outbox.retry( item.id ) ; drain() ; } } size="xs" style="outline">{ t.table?.retry }</Button>
                                        ) }
                                        { item.status !== 'done' && (
                                            <Button color="error" onClick={ () => outbox.remove( item.id ) } size="xs" style="ghost">{ t.table?.remove }</Button>
                                        ) }
                                    </div>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </Table>
            </section>

            {/* onSettle */}
            <section className="flex flex-col gap-2 rounded-box bg-base-100 p-4 shadow-sm">
                <h3 className="font-semibold">{ t.log?.title }</h3>
                <p className="text-xs text-base-content/70">{ t.log?.text }</p>
                { log.length === 0
                    ? <p className="text-xs text-base-content/60">{ t.log?.empty }</p>
                    : (
                        <ul className="flex flex-col gap-1 text-xs">
                            { log.map( entry => (
                                <li className="flex items-center gap-2" key={ `${ entry.id }-${ entry.at }-${ entry.status }` }>
                                    <span className="tabular-nums text-base-content/60">{ new Date( entry.at ).toLocaleTimeString() }</span>
                                    <span className="font-mono">{ short( entry.id ) }</span>
                                    <span>{ entry.kind }</span>
                                    <Badge color={ COLORS[ entry.status ] } size="xs" style="soft">{ t.statuses?.[ entry.status ] ?? entry.status }</Badge>
                                </li>
                            ) ) }
                        </ul>
                    ) }
            </section>

        </Container>
    ) ;
} ;

export default OutboxBenchDemo ;
