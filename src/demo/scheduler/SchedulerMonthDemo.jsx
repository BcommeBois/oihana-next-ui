'use client' ;

import { useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Scheduler from '@/components/scheduler/Scheduler' ;

import { libraryProgram } from './libraryProgram' ;

/** The month the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-12T00:00:00' ) ;

/** The accessor the fixture needs : its house types key on `_key`. */
const getEventId = source => source._key ?? source.id ;

/**
 * Month demo — the grid, its rails, and what does not fit in a cell.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.schedulerMonth'] - Dot notation path to the demo locale.
 */
const SchedulerMonthDemo = ( { path = 'demo.scheduler.schedulerMonth' } ) =>
{
    const { basic , description , firstDay , narrow , overflow , popover , title } = useI18n( path ) ;

    const [ picked , setPicked ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="scheduler-month">
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
                        defaultView   = "month"
                        getEventId    = { getEventId }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ firstDay?.title }</h3>
                <p className="text-sm text-base-content/60">{ firstDay?.description }</p>

                {/* The same month twice, and the only difference declared is where
                    the week begins — the columns, the headers and the six-week
                    span all follow from it. */}
                <div className="grid gap-4 xl:grid-cols-2">
                    { [ 'sunday' , 'monday' ].map( first => (
                        <div key={ first } className="flex flex-col gap-2">
                            <p className="font-mono text-xs uppercase text-base-content/50">weekStartsOn = &quot;{ first }&quot;</p>
                            <div className="rounded-box bg-base-100 p-2">
                                <Scheduler
                                    schema
                                    toolbar       = { false }
                                    defaultEvents = { libraryProgram }
                                    defaultDate   = { ANCHOR }
                                    defaultView   = "month"
                                    getEventId    = { getEventId }
                                    weekStartsOn  = { first }
                                />
                            </div>
                        </div>
                    ) ) }
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ overflow?.title }</h3>
                <p className="text-sm text-base-content/60">{ overflow?.description }</p>

                <div className="grid gap-4 lg:grid-cols-2">
                    { [ { events : 3 , label : overflow?.three } , { events : 1 , label : overflow?.one } ].map( item => (
                        <div key={ item.events } className="flex flex-col gap-2">
                            <p className="font-mono text-xs uppercase text-base-content/50">{ item.label }</p>
                            <div className="rounded-box bg-base-100 p-2">
                                <Scheduler
                                    schema
                                    toolbar         = { false }
                                    defaultEvents   = { libraryProgram }
                                    defaultDate     = { ANCHOR }
                                    defaultView     = "month"
                                    getEventId      = { getEventId }
                                    maxEventsPerDay = { item.events }
                                />
                            </div>
                        </div>
                    ) ) }
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ popover?.title }</h3>
                <p className="text-sm text-base-content/60">{ popover?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        defaultView   = "month"
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
                                    defaultView   = "month"
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

SchedulerMonthDemo.displayName = 'SchedulerMonthDemo' ;

export default SchedulerMonthDemo ;
