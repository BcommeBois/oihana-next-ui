'use client' ;

import { useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import dayjs from '@/helpers/date/configureDayjs' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Scheduler from '@/components/scheduler/Scheduler' ;

import { libraryProgram } from './libraryProgram' ;

/** The week the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-12T00:00:00' ) ;

const getEventId = source => source._key ?? source.id ;

/** A small week of plain objects — the drag writes back into these. */
const desk =
[
    { id : 'standup'   , title : 'Point quotidien' , color : 'info'    , start : '2026-08-13T09:00' , end : '2026-08-13T09:30' } ,
    { id : 'atelier'   , title : 'Atelier'         , color : 'success' , start : '2026-08-13T10:30' , end : '2026-08-13T12:00' } ,
    { id : 'inventory' , title : 'Inventaire'      , color : 'neutral' , start : '2026-08-13T14:00' , end : '2026-08-13T16:00' } ,
    { id : 'demo'      , title : 'Démonstration'   , color : 'warning' , start : '2026-08-14T11:00' , end : '2026-08-14T12:30' } ,
] ;

/** The one event the application refuses to let go of. */
const isEventMovable = event => event.id !== 'inventory' ;

const stamp = value => ( value === null || value === undefined ? '—' : dayjs( value ).format( 'ddd DD/MM HH:mm' ) ) ;

/**
 * Time grid demo — the week, the day, and what the overlap calculation draws.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.schedulerWeek'] - Dot notation path to the demo locale.
 */
const SchedulerWeekDemo = ( { path = 'demo.scheduler.schedulerWeek' } ) =>
{
    const { day , description , move , narrow , overlap , title , week , zoom } = useI18n( path ) ;

    const [ picked , setPicked ] = useState( null ) ;

    const [ events , setEvents ] = useState( desk ) ;
    const [ change , setChange ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="scheduler-week">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ week?.title }</h3>
                <p className="text-sm text-base-content/60">{ week?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        defaultView   = "week"
                        getEventId    = { getEventId }
                        onEventClick  = { event => setPicked( event ) }
                    />
                </div>

                <p className="font-mono text-xs text-base-content/60">
                    onEventClick → { picked ? `${ picked.id } · ${ picked.title }` : '—' }
                </p>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ move?.title }</h3>
                <p className="text-sm text-base-content/60">{ move?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        movable
                        defaultDate    = { ANCHOR }
                        defaultView    = "week"
                        dayEnd         = { 20 * 60 }
                        dayStart       = { 7 * 60 }
                        events         = { events }
                        height         = "22rem"
                        isEventMovable = { isEventMovable }
                        onChange       = { ( next , report ) => { setEvents( next ) ; setChange( report ) ; } }
                        scrollTime     = "08:00"
                    />
                </div>

                <p className="text-sm text-base-content/60">{ move?.locked }</p>

                <pre className="overflow-x-auto rounded-box bg-base-100 p-3 font-mono text-xs">
{ change === null
    ? `onChange → —`
    : [
        `type  : ${ change.type }` ,
        `from  : ${ stamp( change.from?.start ) } → ${ stamp( change.from?.end ) }` ,
        `to    : ${ stamp( change.to?.start ) } → ${ stamp( change.to?.end ) }` ,
        `patch : ${ JSON.stringify( change.patch ) }` ,
    ].join( '\n' ) }
                </pre>

                <p className="text-sm text-base-content/60">{ move?.recurring }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        movable
                        schema
                        toolbar       = { false }
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        defaultView   = "week"
                        getEventId    = { getEventId }
                        height        = "20rem"
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ overlap?.title }</h3>
                <p className="text-sm text-base-content/60">{ overlap?.description }</p>

                {/* Three overlapping events on one day, and a fourth alone later —
                    the case the expansion pass exists for. */}
                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        toolbar       = { false }
                        defaultView   = "day"
                        defaultDate   = { new Date( '2026-08-13T00:00:00' ) }
                        dayStart      = { 8 * 60 }
                        dayEnd        = { 18 * 60 }
                        height        = "20rem"
                        defaultEvents = {[
                            { id : 'a' , title : 'Sprint' , color : 'success' , start : '2026-08-13T09:30' , end : '2026-08-13T11:30' } ,
                            { id : 'b' , title : 'Client' , color : 'warning' , start : '2026-08-13T10:00' , end : '2026-08-13T12:00' } ,
                            { id : 'c' , title : 'Recrutement' , color : 'error' , start : '2026-08-13T10:45' , end : '2026-08-13T11:45' } ,
                            { id : 'd' , title : 'Rétrospective' , color : 'info' , start : '2026-08-13T14:00' , end : '2026-08-13T15:00' } ,
                        ]}
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ day?.title }</h3>
                <p className="text-sm text-base-content/60">{ day?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { new Date( '2026-08-14T00:00:00' ) }
                        defaultView   = "day"
                        getEventId    = { getEventId }
                        height        = "24rem"
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ zoom?.title }</h3>
                <p className="text-sm text-base-content/60">{ zoom?.description }</p>

                <div className="grid gap-4 lg:grid-cols-2">
                    { [ { pixelsPerHour : 32 , slotDuration : 60 } , { pixelsPerHour : 64 , slotDuration : 15 } ].map( item => (
                        <div key={ item.pixelsPerHour } className="flex flex-col gap-2">
                            <p className="font-mono text-xs uppercase text-base-content/50">
                                { item.pixelsPerHour } px/h · slot { item.slotDuration }
                            </p>
                            <div className="rounded-box bg-base-100 p-2">
                                <Scheduler
                                    schema
                                    toolbar       = { false }
                                    defaultEvents = { libraryProgram }
                                    defaultDate   = { new Date( '2026-08-14T00:00:00' ) }
                                    defaultView   = "day"
                                    getEventId    = { getEventId }
                                    height        = "20rem"
                                    pixelsPerHour = { item.pixelsPerHour }
                                    slotDuration  = { item.slotDuration }
                                />
                            </div>
                        </div>
                    ) ) }
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ narrow?.title }</h3>
                <p className="text-sm text-base-content/60">{ narrow?.description }</p>

                <div className="mt-4 flex justify-center">
                    <div className="mockup-phone w-full max-w-[380px]">
                        <div className="mockup-phone-camera" />
                        <div className="mockup-phone-display bg-base-100 text-base-content">
                            <div className="h-full overflow-y-auto px-2 pb-8 pt-16">
                                <Scheduler
                                    schema
                                    defaultEvents = { libraryProgram }
                                    defaultDate   = { ANCHOR }
                                    defaultView   = "week"
                                    getEventId    = { getEventId }
                                    height        = "22rem"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Container>
    ) ;
} ;

SchedulerWeekDemo.displayName = 'SchedulerWeekDemo' ;

export default SchedulerWeekDemo ;
