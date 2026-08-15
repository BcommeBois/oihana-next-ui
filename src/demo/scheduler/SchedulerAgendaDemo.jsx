'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Badge     from '@/components/Badge' ;
import Button    from '@/components/Button' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Scheduler from '@/components/scheduler/Scheduler' ;

import useScheduler from '@/hooks/useScheduler' ;

import dayjs from '@/helpers/date/configureDayjs' ;

import { bookings } from './bookings' ;
import { libraryProgram , rooms } from './libraryProgram' ;

/** The week the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-10T00:00:00' ) ;

/** The accessor the fixture needs : its house types key on `_key`. */
const getEventId = source => source._key ?? source.id ;

/**
 * A policy of the plainest kind : the story hour is read-only, the rest is not.
 *
 * It gates the gestures as much as the panel — one accessor, because the
 * question « what may this user do with this object » is asked once. Which is
 * why the example that carries it is a week : a policy nobody can bump into is
 * a policy nobody can check.
 */
const permissions = event => ( event.source.id === 'heure-du-conte' ? 'read' : 'edit' ) ;

const roomName = ( id ) => rooms.find( room => room.id === id )?.name ?? id ;

/**
 * Agenda demo — the shell, its toolbar and the first view.
 *
 * The controlled example is the one worth reading : it drives the same mutators
 * the drag gestures will call in lot 5, and shows what each one hands back.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.schedulerAgenda'] - Dot notation path to the demo locale.
 */
const SchedulerAgendaDemo = ( { path = 'demo.scheduler.schedulerAgenda' } ) =>
{
    const { basic , controlled , custom , description , details , emptyDays , mobile , title } = useI18n( path ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="scheduler-agenda">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ basic?.title }</h3>
                <p className="text-sm text-base-content/60">{ basic?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        getEventId    = { getEventId }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ emptyDays?.title }</h3>
                <p className="text-sm text-base-content/60">{ emptyDays?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        showEmptyDays
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        getEventId    = { getEventId }
                    />
                </div>
            </section>

            <Divider />

            <ControlledExample labels={ controlled } />

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ custom?.title }</h3>
                <p className="text-sm text-base-content/60">{ custom?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        getEventId    = { getEventId }
                        renderEvent   = { event => (
                            <div className="flex flex-1 flex-wrap items-baseline gap-2 rounded-field border border-base-300 px-3 py-2">
                                <b className="truncate">{ event.title }</b>
                                <span className="font-mono text-xs opacity-50">{ event.source[ '@type' ] }</span>
                                { event.resourceId && (
                                    <Badge size="sm" className="ms-auto">
                                        { custom?.room } { roomName( event.resourceId ) }
                                    </Badge>
                                ) }
                            </div>
                        ) }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ details?.title }</h3>
                <p className="text-sm text-base-content/60">{ details?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        details
                        movable
                        resizable
                        schema
                        defaultEvents       = { libraryProgram }
                        defaultDate         = { ANCHOR }
                        defaultView         = "week"
                        getEventId          = { getEventId }
                        getEventPermissions = { permissions }
                        height              = "22rem"
                        scrollTime          = "13:00"
                    />
                </div>

                <p className="text-sm text-base-content/60">{ details?.permissions }</p>

                <Divider />

                <p className="text-sm text-base-content/60">{ details?.bookings }</p>

                {/* Four reservations, four different places to keep a date — and one
                    adapter that finds all four without reading a single `@type`. */}
                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        details       = {{ placement : 'bottom' }}
                        schema
                        defaultEvents = { bookings }
                        defaultDate   = { ANCHOR }
                        getEventId    = { getEventId }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ mobile?.title }</h3>
                <p className="text-sm text-base-content/60">{ mobile?.description }</p>

                {/* daisyUI's phone mockup : an `inline-grid` in a 462/978 ratio whose
                    display is `overflow: hidden`, so the scrolling belongs to an inner
                    box — and the camera overlays the top of that same grid area, which
                    is what the top padding clears. Unlike the other examples it has no
                    padded background, so it takes its breathing room itself. */}
                <div className="mt-4 flex justify-center">
                    <div className="mockup-phone w-full max-w-[380px]">
                        <div className="mockup-phone-camera" />
                        <div className="mockup-phone-display bg-base-100 text-base-content">
                            <div className="h-full overflow-y-auto px-3 pb-8 pt-16">
                                <Scheduler
                                    schema
                                    defaultEvents = { libraryProgram }
                                    defaultDate   = { ANCHOR }
                                    getEventId    = { getEventId }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Container>
    ) ;
} ;

/**
 * The controlled example, driving the hook's mutators by hand.
 *
 * @param {Object} props
 * @param {Object} [props.labels] - The locale block for this section.
 */
const ControlledExample = ( { labels } ) =>
{
    const [ sources , setSources ] = useState( libraryProgram ) ;
    const [ log , setLog ]         = useState( [] ) ;
    const [ picked , setPicked ]   = useState( null ) ;

    const onChange = ( next , change ) =>
    {
        setSources( next ) ;
        setLog( entries => [ describe( change ) , ...entries ].slice( 0 , 8 ) ) ;
    } ;

    // The same hook the component uses, so the buttons reach the very mutators the
    // drag gestures will call once they exist.
    const scheduler = useScheduler
    ({
        schema     : true ,
        events     : sources ,
        onChange ,
        getEventId ,
        defaultDate : ANCHOR ,
    }) ;

    const selected = useMemo
    (
        () => scheduler.events.find( event => event.id === picked ) ?? null ,
        [ scheduler.events , picked ] ,
    ) ;

    const reset = () =>
    {
        setSources( libraryProgram ) ;
        setLog( [] ) ;
        setPicked( null ) ;
    } ;

    return (
        <section className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">{ labels?.title }</h3>
            <p className="text-sm text-base-content/60">{ labels?.description }</p>

            <div className="rounded-box bg-base-100 p-2 sm:p-4">
                <Scheduler
                    schema
                    events      = { sources }
                    onChange    = { onChange }
                    date        = { scheduler.date }
                    onDateChange = { scheduler.setDate }
                    getEventId  = { getEventId }
                    renderEvent = { event => (
                        <button
                            type      = "button"
                            className = { `flex-1 rounded-field border px-3 py-2 text-start ${ picked === event.id ? 'border-primary bg-primary/10' : 'border-base-300' }` }
                            onClick   = { () => setPicked( event.id ) }
                        >
                            <b className="truncate">{ event.title }</b>
                        </button>
                    ) }
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" disabled={ !selected } onClick={ () => scheduler.moveEvent( selected , { start : selected.start + 3600000 } ) }>
                    { labels?.move }
                </Button>
                <Button size="sm" disabled={ !selected } onClick={ () => scheduler.updateEvent( selected , { name : `${ selected.title } — ${ labels?.renamed }` } ) }>
                    { labels?.rename }
                </Button>
                <Button size="sm" color="error" disabled={ !selected } onClick={ () => { scheduler.removeEvent( selected ) ; setPicked( null ) ; } }>
                    { labels?.remove }
                </Button>
                <Button
                    size    = "sm"
                    onClick = { () => scheduler.addEvent
                    ({
                        '@type'   : 'Event' ,
                        id        : `ad-hoc-${ log.length }` ,
                        name      : labels?.newEvent ,
                        startDate : dayjs( ANCHOR ).add( 2 , 'day' ).add( 15 , 'hour' ).toISOString() ,
                        duration  : 'PT1H' ,
                        color     : 'success' ,
                    }) }
                >
                    { labels?.add }
                </Button>
                <Button size="sm" style="ghost" onClick={ reset }>{ labels?.reset }</Button>

                { !selected && <span className="text-xs opacity-60">{ labels?.pick }</span> }
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase text-base-content/50">{ labels?.log }</p>
                { log.length === 0
                    ? <p className="text-sm opacity-50">{ labels?.empty }</p>
                    : (
                        <ul className="flex flex-col gap-1 font-mono text-xs">
                            { log.map( ( entry , index ) => (
                                // The log is append-only and never reordered, so the index is stable here.
                                // biome-ignore lint/suspicious/noArrayIndexKey: append-only log, entries are never reordered
                                <li key={ index } className="truncate opacity-70">{ entry }</li>
                            ) ) }
                        </ul>
                    ) }
            </div>
        </section>
    ) ;
} ;

/**
 * One line describing a change, for the log.
 *
 * @param {Object} change - The change descriptor handed to `onChange`.
 * @returns {string}
 */
const describe = ( change ) =>
{
    const name  = change.event?.title ?? change.source?.name ?? '—' ;
    const patch = JSON.stringify( change.patch ) ;

    return `${ change.type } · ${ name } · ${ patch }` ;
} ;

SchedulerAgendaDemo.displayName = 'SchedulerAgendaDemo' ;

export default SchedulerAgendaDemo ;
