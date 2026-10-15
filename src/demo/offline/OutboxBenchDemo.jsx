'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import { MdOutbox } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import OutboxBanner from '@/display/OutboxBanner' ;
import OutboxList   from '@/display/OutboxList' ;

import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Indicator        from '@/components/Indicator' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;
import Table            from '@/components/layouts/Table' ;

import useI18n   from '@/contexts/locale/useI18n' ;
import useOutbox from '@/contexts/outbox/useOutbox' ;

import { BASE , prepare , useLabOutbox } from './LabOutbox' ;

const ACCOUNTS = [ { key : 'A' , label : 'A' } , { key : 'B' , label : 'B' } ] ;

const COLORS = { blocked : 'neutral' , conflict : 'warning' , done : 'success' , pending : 'info' , posting : 'primary' , rejected : 'error' } ;

const LINES = [ 'Planche pin 145×26' , 'Lambourde 45×70' , 'Vis inox 5×50' ] ;

const short = id => id.slice( 0 , 8 ) ;

const wait = ms => new Promise( resolve => setTimeout( resolve , ms ) ) ;

/**
 * The lab's outbox on a bench : buttons that queue intentions, the network
 * and the account to play with, the banner and the list an application shows,
 * and the queue as it is stored.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.offline.outbox'] - Dot notation path to the demo locale.
 */
const OutboxBenchDemo = ( { path = 'demo.offline.outbox' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const outbox = useOutbox() ;
    const lab    = useLabOutbox() ;

    const { clear , counts , drain , draining , enqueue , items , lastSyncAt , online , ready , scope } = outbox ?? {} ;

    const [ replay , setReplay ] = useState( null ) ;
    const [ now    , setNow    ] = useState( 0 ) ;

    const counter = useRef( 0 ) ;

    // The « in N s » column of the raw table ticks while an item waits for its time.
    useEffect( () =>
    {
        setNow( Date.now() ) ;

        if ( !( items ?? [] ).some( item => item.status === 'pending' && item.nextAttemptAt > Date.now() ) )
        {
            return undefined ;
        }

        const id = setInterval( () => setNow( Date.now() ) , 1000 ) ;

        return () => clearInterval( id ) ;
    }
    , [ items ] ) ;

    if ( !outbox || !lab )
    {
        return null ;
    }

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
                const quote = await enqueue( { kind : 'quote' , payload : { body : { customer : 'Dupont' } } } ) ;
                for ( const [ index , product ] of LINES.entries() )
                {
                    await enqueue( { dependsOn : [ quote.id ] , kind : 'line' , payload : { body : { product , quantity : ( index + 1 ) * 12 } } } ) ;
                }
            } ,
        } ,
        { key : 'replace' , run : () => enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-118' , pallet : pallet() } } , target : 'PO-2026-118' } ) } ,
        {
            key : 'after' ,
            run : async () =>
            {
                await enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-121' , version : 1 } , url : 'receipt?delay=3000' } , target : 'PO-2026-121' } ) ;
                await wait( 500 ) ;
                await enqueue( { kind : 'receipt' , payload : { body : { order : 'PO-2026-121' , version : 2 } } , target : 'PO-2026-121' } ) ;
            } ,
        } ,
    ] ;

    const empty = async () =>
    {
        await clear() ;
        lab.clearLog() ;
        setReplay( null ) ;
    } ;

    const replayLast = async () =>
    {
        const done = [ ...items ].reverse().find( item => item.status === 'done' ) ;

        if ( !done )
        {
            setReplay( t.controls?.replayNone ) ;
            return ;
        }

        const request  = prepare( done , {} ) ;
        const response = await fetch( `${ BASE }/${ request.url ?? done.kind }` ,
        {
            body    : JSON.stringify( request.body ?? null ) ,
            headers : { 'Content-Type' : 'application/json' , 'Idempotency-Key' : done.id } ,
            method  : 'POST' ,
        }) ;
        const answer = await response.json() ;

        setReplay( response.headers.get( 'Idempotent-Replayed' ) === 'true'
            ? format( t.controls?.replayed ?? '{0} {1} {2}' , response.status , 'true' , answer.id )
            : format( t.controls?.created ?? '{0} {1}' , response.status , answer.id ) ) ;
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

    const attention = counts.pending + counts.posting + counts.rejected + counts.conflict + counts.blocked ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h2 className="text-2xl font-semibold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <OutboxBanner showIdle />

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
                        <Toggle checked={ lab.simulated } color="warning" inline label={ t.controls?.offline } onChange={ event => lab.setSimulated( event.target.checked ) } />
                        <span className="text-xs text-base-content/60">{ t.controls?.offlineHelp }</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">{ t.controls?.account }</span>
                            <SegmentedControl ariaLabel={ t.controls?.account } items={ ACCOUNTS } onChange={ lab.setScope } size="sm" value={ scope } />
                        </div>
                        <span className="text-xs text-base-content/60">{ t.controls?.accountHelp }</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button color="primary" disabled={ !ready } loading={ draining } onClick={ drain } size="sm">{ t.controls?.send }</Button>
                        <Button disabled={ !ready } onClick={ replayLast } size="sm" style="outline" tooltip={ t.controls?.replayHelp }>{ t.controls?.replay }</Button>
                        <Button color="error" disabled={ !ready || !items.length } onClick={ empty } size="sm" style="outline">{ t.controls?.clear }</Button>
                    </div>

                    { replay && <p className="text-xs text-base-content/80" role="status">{ replay }</p> }

                    <div className="flex items-center gap-3">
                        <Indicator item={ attention > 0 && <Badge aria-hidden color="warning" size="sm">{ attention }</Badge> }>
                            <Button aria-label={ format( t.indicator?.label ?? '{0}' , attention ) } shape="square" style="ghost">
                                <MdOutbox aria-hidden="true" className="size-6" />
                            </Button>
                        </Indicator>
                        <span className="text-xs text-base-content/60">{ t.indicator?.text }</span>
                    </div>

                    <p className="text-xs text-base-content/70 tabular-nums">
                        { format( t.controls?.counts ?? '' , counts.pending + counts.posting , counts.rejected , counts.conflict , counts.blocked , counts.done , counts.other ) }
                    </p>
                </section>
            </div>

            {/* What an application shows */}
            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                <h3 className="font-semibold">{ t.list?.title }</h3>
                <p className="text-xs text-base-content/70">{ t.list?.text }</p>
                <OutboxList labels={ t.kinds } />
            </section>

            {/* The queue as it is stored */}
            <details className="rounded-box bg-base-100 p-4 shadow-sm">
                <summary className="cursor-pointer text-sm font-semibold">{ t.table?.caption }</summary>
                <Table className="mt-3" size="sm" zebra>
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
                        </tr>
                    </thead>
                    <tbody>
                        { items.length === 0 && (
                            <tr><td className="text-center text-base-content/60" colSpan={ 8 }>{ t.table?.empty }</td></tr>
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
                                <td className="font-mono text-xs">
                                    { item.lastError ? [ item.lastError.status || null , item.lastError.code ].filter( Boolean ).join( ' · ' ) : '—' }
                                </td>
                                <td className="font-mono text-xs">{ item.result?.id ?? '—' }</td>
                            </tr>
                        ) ) }
                    </tbody>
                </Table>
            </details>

            {/* onSettle */}
            <section className="flex flex-col gap-2 rounded-box bg-base-100 p-4 shadow-sm">
                <h3 className="font-semibold">{ t.log?.title }</h3>
                <p className="text-xs text-base-content/70">{ t.log?.text }</p>
                { lab.log.length === 0
                    ? <p className="text-xs text-base-content/60">{ t.log?.empty }</p>
                    : (
                        <ul className="flex flex-col gap-1 text-xs">
                            { lab.log.map( entry => (
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
