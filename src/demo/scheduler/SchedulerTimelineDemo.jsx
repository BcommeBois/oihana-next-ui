'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container    from '@/display/Container' ;
import Divider      from '@/components/Divider' ;
import MetricLegend from '@/components/metrics/MetricLegend' ;
import Scheduler    from '@/components/scheduler/Scheduler' ;

import usePalette from '@/hooks/usePalette' ;

import { assignColors } from '@/helpers/schedule/assignColors' ;

import { libraryProgram , rooms } from './libraryProgram' ;

/** The week the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-12T00:00:00' ) ;

const getEventId = source => source._key ?? source.id ;

/**
 * The rooms, with their opening hours.
 *
 * `openingHoursSpecification` is read as it stands — the same property the slot
 * picker will consume when it computes free slots. Here it only draws a shade,
 * but there is no reason for two vocabularies to say one thing.
 */
const openRooms = rooms.map( room => ( room.id === 'atelier'
    ? { ...room , openingHoursSpecification : { '@type' : 'OpeningHoursSpecification' , opens : '14:00' , closes : '19:00' } }
    : { ...room , openingHoursSpecification : { '@type' : 'OpeningHoursSpecification' , opens : '09:00' , closes : '22:00' } } ) ) ;

/**
 * Resource timeline demo — the axis pivoted, and the rows it needs.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.schedulerTimeline'] - Dot notation path to the demo locale.
 */
const SchedulerTimelineDemo = ( { path = 'demo.scheduler.schedulerTimeline' } ) =>
{
    const { day , description , derived , hours , legend , title , week } = useI18n( path ) ;

    const [ change , setChange ] = useState( null ) ;

    const colors = usePalette({ palette : 'brand' , count : openRooms.length }) ;

    // The legend and the timeline read the same list in the same order, which is
    // the whole reason `resources` is declared rather than derived.
    const legendItems = useMemo( () =>
    {
        const byKey = assignColors( openRooms.map( room => room.id ) , colors ) ;

        return openRooms.map( room => ({ color : byKey.get( room.id ) , key : room.id , name : room.name }) ) ;
    }
    , [ colors ] ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="scheduler-timeline">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ day?.title }</h3>
                <p className="text-sm text-base-content/60">{ day?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        creatable
                        movable
                        resizable
                        schema
                        defaultDate   = { new Date( '2026-08-14T00:00:00' ) }
                        defaultEvents = { libraryProgram }
                        defaultView   = "timeline"
                        getEventId    = { getEventId }
                        onChange      = { ( _next , report ) => setChange( report ) }
                        palette       = "brand"
                        resources     = { openRooms }
                        tooltipColor  = "primary"
                        views         = { [ 'timeline' , 'day' , 'week' ] }
                    />
                </div>

                <pre className="overflow-x-auto rounded-box bg-base-100 p-3 font-mono text-xs">
{ change === null ? 'onChange → —' : `${ change.type } → ${ JSON.stringify( change.to ) }` }
                </pre>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ week?.title }</h3>
                <p className="text-sm text-base-content/60">{ week?.description }</p>

                {/* The same week twice : with the labels of the short bars, and
                    without. Which one reads better depends on the density, so it
                    is a prop rather than a rule. */}
                { [ true , false ].map( labelled => (
                    <div key={ String( labelled ) } className="flex flex-col gap-2">
                        <p className="font-mono text-xs uppercase text-base-content/50">showNarrowLabels = { String( labelled ) }</p>
                        <div className="rounded-box bg-base-100 p-2 sm:p-4">
                            <Scheduler
                                details
                                schema
                                toolbar          = { false }
                                defaultDate      = { ANCHOR }
                                defaultEvents    = { libraryProgram }
                                defaultView      = "timeline"
                                getEventId       = { getEventId }
                                palette          = "brand"
                                resources        = { openRooms }
                                showNarrowLabels = { labelled }
                                timelineDays     = { 7 }
                            />
                        </div>
                    </div>
                ) ) }
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ hours?.title }</h3>
                <p className="text-sm text-base-content/60">{ hours?.description }</p>

                <h3 className="mt-4 text-xl font-semibold">{ legend?.title }</h3>
                <p className="text-sm text-base-content/60">{ legend?.description }</p>

                <div className="rounded-box bg-base-100 p-3">
                    <MetricLegend items={ legendItems } marker="square" />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ derived?.title }</h3>
                <p className="text-sm text-base-content/60">{ derived?.description }</p>

                {/* No `resources` : the rows are whatever the events mention, in
                    the order they were first seen, and a free room has no row at
                    all. Useful to look at a payload, never to plan with. */}
                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        toolbar       = { false }
                        defaultDate   = { new Date( '2026-08-14T00:00:00' ) }
                        defaultEvents = { libraryProgram }
                        defaultView   = "timeline"
                        getEventId    = { getEventId }
                    />
                </div>
            </section>

        </Container>
    ) ;
} ;

SchedulerTimelineDemo.displayName = 'SchedulerTimelineDemo' ;

export default SchedulerTimelineDemo ;
