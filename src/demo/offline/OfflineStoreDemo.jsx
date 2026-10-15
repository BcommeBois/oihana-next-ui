'use client' ;

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;
import Input  from '@/components/inputs/Input' ;
import Select from '@/components/selects/Select' ;
import Toggle from '@/components/checkboxes/Toggle' ;
import Table  from '@/components/layouts/Table' ;

import useNumberFormat  from '@/hooks/useNumberFormat' ;
import useOfflineQuery  from '@/hooks/useOfflineQuery' ;
import useOfflineRecord from '@/hooks/useOfflineRecord' ;

import useI18n         from '@/contexts/locale/useI18n' ;
import useOfflineStore from '@/contexts/offlineStore/useOfflineStore' ;
import useOutbox       from '@/contexts/outbox/useOutbox' ;

import { useLabOutbox } from './LabOutbox' ;

const API = '/api/offline/parcels' ;

const KIND = 'parcel' ;

const DESCRIPTION = { sort : 'number' , text : [ 'number' , 'product' , 'essence' , 'location' , 'supplier' ] , where : [ 'essence' , 'state' ] } ;

const ESSENCES = [ 'Pin' , 'Chêne' , 'Douglas' , 'Épicéa' , 'Mélèze' , 'Châtaignier' ] ;

const STATES = [ 'intact' , 'opened' , 'reserved' ] ;

const STATE_COLORS = { intact : 'success' , opened : 'warning' , reserved : 'neutral' } ;

const PAGE = 20 ;

/**
 * The reserve : a list of parcels searched on the server online, and in the
 * device offline — the same screen, which says which one it reads. A parcel
 * opened online is kept ; a day prepared keeps them all, pinned.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.offline.store'] - Dot notation path to the demo locale.
 */
const OfflineStoreDemo = ( { path = 'demo.offline.store' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const store  = useOfflineStore() ;
    const outbox = useOutbox() ;
    const lab    = useLabOutbox() ;

    const { locale } = useNumberFormat() ;

    const online = outbox?.online ?? true ;

    const [ text      , setText      ] = useState( '' ) ;
    const [ essence   , setEssence   ] = useState( '' ) ;
    const [ state     , setState     ] = useState( '' ) ;
    const [ available , setAvailable ] = useState( false ) ;
    const [ remote    , setRemote    ] = useState( { items : [] , loading : false , total : 0 } ) ;
    const [ selected  , setSelected  ] = useState( null ) ;
    const [ fetched   , setFetched   ] = useState( null ) ;
    const [ records   , setRecords   ] = useState( [] ) ;
    const [ message   , setMessage   ] = useState( null ) ;
    const [ preparing , setPreparing ] = useState( false ) ;

    useEffect( () =>
    {
        store?.describe( KIND , DESCRIPTION ) ;
    }
    , [ store ] ) ;

    // Online : the server searches.
    useEffect( () =>
    {
        if ( !online )
        {
            return undefined ;
        }

        const params = new URLSearchParams( { limit : String( PAGE ) , q : text } ) ;
        if ( essence )
        {
            params.set( 'essence' , essence ) ;
        }
        if ( state )
        {
            params.set( 'state' , state ) ;
        }
        if ( available )
        {
            params.set( 'available' , '1' ) ;
        }

        const controller = new AbortController() ;

        const timer = setTimeout( async () =>
        {
            setRemote( previous => ( { ...previous , loading : true } ) ) ;
            try
            {
                const response = await fetch( `${ API }?${ params }` , { signal : controller.signal } ) ;
                const { items , total } = await response.json() ;
                setRemote( { items , loading : false , total } ) ;
            }
            catch
            {
                setRemote( previous => ( { ...previous , loading : false } ) ) ;
            }
        }
        , 250 ) ;

        return () =>
        {
            clearTimeout( timer ) ;
            controller.abort() ;
        } ;
    }
    , [ available , essence , online , state , text ] ) ;

    // Offline : the reserve searches.
    const local   = useOfflineQuery( KIND , { limit : PAGE , text , where : { essence : essence || undefined , state : state || undefined } } , { enabled : !online } ) ;
    const reserve = useOfflineQuery( KIND , { limit : 0 } ) ;

    // A parcel opened online is read from the server, and kept.
    useEffect( () =>
    {
        setFetched( null ) ;

        if ( !online || !selected || !store )
        {
            return undefined ;
        }

        let cancelled = false ;

        const open = async () =>
        {
            try
            {
                const response = await fetch( `${ API }/${ selected }` ) ;
                if ( !response.ok || cancelled )
                {
                    return ;
                }
                const parcel = await response.json() ;
                setFetched( parcel ) ;
                await store.remember( KIND , parcel.id , parcel ) ;
            }
            catch
            {
                // Offline after all : the reserve answers.
            }
        } ;

        open() ;

        return () =>
        {
            cancelled = true ;
        } ;
    }
    , [ online , selected , store ] ) ;

    const record = useOfflineRecord( KIND , selected ) ;

    const parcel = record.value ?? fetched ;

    // What the reserve holds, for the table under the page.
    useEffect( () =>
    {
        if ( !store )
        {
            return undefined ;
        }

        let cancelled = false ;

        const load = async () =>
        {
            const list = await store.list( KIND ) ;
            if ( !cancelled )
            {
                setRecords( list ) ;
            }
        } ;

        load() ;

        const unsubscribe = store.subscribe( change =>
        {
            if ( change.kind === undefined || change.kind === KIND )
            {
                load() ;
            }
        }) ;

        return () =>
        {
            cancelled = true ;
            unsubscribe() ;
        } ;
    }
    , [ store ] ) ;

    if ( !store || !lab )
    {
        return null ;
    }

    const prepare = async () =>
    {
        setPreparing( true ) ;
        try
        {
            const response = await fetch( `${ API }?full=1&limit=500` ) ;
            const { items } = await response.json() ;
            await store.rememberMany( KIND , items.map( value => ( { key : value.id , value } ) ) , { pinned : true } ) ;
            setMessage( format( t.prepared ?? '{0}' , items.length ) ) ;
        }
        catch
        {
            setMessage( t.prepareFailed ) ;
        }
        finally
        {
            setPreparing( false ) ;
        }
    } ;

    const sweep = async () =>
    {
        const { removed } = await store.sweep() ;
        setMessage( format( t.reserve?.swept ?? '{0}' , removed ) ) ;
    } ;

    const time = at => new Date( at ).toLocaleTimeString( locale , { hour : '2-digit' , minute : '2-digit' } ) ;
    const day  = at => new Date( at ).toLocaleDateString( locale ) ;

    const rows  = online ? remote.items : local.items ;
    const total = online ? remote.total : local.total ;

    const pinned = records.filter( one => one.pinned ).length ;

    const fields = parcel ? [
        [ t.detail?.product , parcel.product ] ,
        [ t.detail?.essence , parcel.essence ] ,
        [ t.detail?.location , parcel.location ] ,
        [ t.detail?.volume , parcel.volume !== undefined ? `${ parcel.volume } m³` : null ] ,
        [ t.detail?.pieces , parcel.pieces ] ,
        [ t.detail?.lot , parcel.lot ] ,
        [ t.detail?.supplier , parcel.supplier ] ,
        [ t.detail?.receivedAt , parcel.receivedAt ? day( parcel.receivedAt ) : null ] ,
        [ t.detail?.certification , parcel.certification ] ,
        [ t.detail?.drying , parcel.drying ] ,
    ] : [] ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h2 className="text-2xl font-semibold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* The network, the day */}
            <section className="flex flex-wrap items-center gap-4 rounded-box bg-base-100 p-4 shadow-sm">
                <Badge color={ online ? 'success' : 'warning' } style="soft">{ online ? t.online : t.away }</Badge>
                <Toggle checked={ lab.simulated } color="warning" inline label={ t.simulate } onChange={ event => lab.setSimulated( event.target.checked ) } />
                <div className="flex flex-col gap-0.5">
                    <Button color="primary" disabled={ !online } loading={ preparing } onClick={ prepare } size="sm">{ t.prepare }</Button>
                    <span className="text-xs text-base-content/60">{ t.prepareHelp }</span>
                </div>
                { message && <span className="text-xs text-base-content/80" role="status">{ message }</span> }
            </section>

            {/* The search */}
            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
                    <Input aria-label={ t.search?.label } onChange={ setText } placeholder={ t.search?.placeholder } value={ text } />
                    <Select aria-label={ t.search?.essence } onChange={ event => setEssence( event.target.value ) } value={ essence }>
                        <option value="">{ t.search?.allEssences }</option>
                        { ESSENCES.map( one => <option key={ one } value={ one }>{ one }</option> ) }
                    </Select>
                    <Select aria-label={ t.search?.state } onChange={ event => setState( event.target.value ) } value={ state }>
                        <option value="">{ t.search?.allStates }</option>
                        { STATES.map( one => <option key={ one } value={ one }>{ t.states?.[ one ] }</option> ) }
                    </Select>
                </div>
                <Toggle
                    checked  = { online && available }
                    disabled = { !online }
                    helper   = { online ? undefined : t.search?.availableOffline }
                    inline
                    label    = { t.search?.available }
                    onChange = { event => setAvailable( event.target.checked ) }
                />
                <p className="text-sm font-medium" role="status">
                    { online
                        ? format( t.mode?.online ?? '{0}' , total )
                        : reserve.total === 0 ? t.mode?.empty : format( t.mode?.offline ?? '{0}' , reserve.total ) }
                </p>
            </section>

            <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

                {/* The results */}
                <section className="rounded-box bg-base-100 p-4 shadow-sm">
                    <Table size="sm" zebra>
                        <thead>
                            <tr>
                                <th>{ t.table?.number }</th>
                                <th>{ t.table?.product }</th>
                                <th>{ t.table?.essence }</th>
                                <th>{ t.table?.location }</th>
                                <th>{ t.table?.state }</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows.length === 0 && (
                                <tr><td className="text-center text-base-content/60" colSpan={ 5 }>{ t.table?.empty }</td></tr>
                            ) }
                            { rows.map( row => (
                                <tr className={ row.id === selected ? 'bg-primary/10' : undefined } key={ row.id }>
                                    <td>
                                        <button className="link link-hover font-mono" onClick={ () => setSelected( row.id ) } type="button">{ row.number }</button>
                                    </td>
                                    <td>{ row.product }</td>
                                    <td>{ row.essence }</td>
                                    <td className="font-mono text-xs">{ row.location }</td>
                                    <td><Badge color={ STATE_COLORS[ row.state ] } size="sm" style="soft">{ t.states?.[ row.state ] }</Badge></td>
                                </tr>
                            ) ) }
                        </tbody>
                    </Table>
                </section>

                {/* The parcel */}
                <section aria-live="polite" className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.detail?.title }{ parcel && <span className="ms-2 font-mono">{ parcel.number }</span> }</h3>
                    { !selected && <p className="text-sm text-base-content/60">{ t.detail?.pick }</p> }
                    { selected && !parcel && !online && !record.loading && <p className="text-sm text-warning">{ t.detail?.missing }</p> }
                    { parcel && (
                        <>
                            { record.seenAt && (
                                <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70">
                                    <span>{ format( t.detail?.seen ?? '{0}' , time( record.seenAt ) ) }</span>
                                    { record.pinned && <Badge size="xs" style="soft">{ t.detail?.pinned }</Badge> }
                                    { record.expired && <Badge color="warning" size="xs" style="soft">{ t.detail?.expired }</Badge> }
                                </div>
                            ) }
                            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                                { fields.filter( ( [ , value ] ) => value !== null && value !== undefined ).map( ( [ label , value ] ) => (
                                    <div className="contents" key={ label }>
                                        <dt className="text-base-content/60">{ label }</dt>
                                        <dd>{ value }</dd>
                                    </div>
                                ) ) }
                            </dl>
                        </>
                    ) }
                </section>
            </div>

            {/* What the reserve keeps */}
            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                <h3 className="font-semibold">{ t.reserve?.title }</h3>
                <p className="text-xs text-base-content/70">{ t.reserve?.text }</p>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm tabular-nums">{ format( t.reserve?.count ?? '{0} {1}' , records.length , pinned ) }</span>
                    <Button onClick={ sweep } size="sm" style="outline">{ t.reserve?.sweep }</Button>
                    <Button color="error" disabled={ !records.length } onClick={ () => store.clear( KIND ) } size="sm" style="outline">{ t.reserve?.clear }</Button>
                </div>
                { records.length > 0 && (
                    <Table containerClassName="max-h-72" pinRows size="xs">
                        <thead>
                            <tr>
                                <th>{ t.table?.number }</th>
                                <th>{ t.reserve?.seenAt }</th>
                                <th>{ t.reserve?.expires }</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            { records.map( one => (
                                <tr key={ one.key }>
                                    <td className="font-mono">{ one.key }</td>
                                    <td className="tabular-nums">{ `${ day( one.seenAt ) } ${ time( one.seenAt ) }` }</td>
                                    <td>{ one.pinned ? t.reserve?.pinned : day( one.expiresAt ) }</td>
                                    <td className="text-right">
                                        <Button onClick={ () => store.forget( KIND , one.key ) } size="xs" style="ghost">{ t.reserve?.forget }</Button>
                                    </td>
                                </tr>
                            ) ) }
                        </tbody>
                    </Table>
                ) }
            </section>

        </Container>
    ) ;
} ;

export default OfflineStoreDemo ;
