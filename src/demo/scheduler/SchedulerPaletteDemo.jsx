'use client' ;

import { useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Scheduler from '@/components/scheduler/Scheduler' ;

import PalettePicker from '@/demo/PalettePicker' ;

import { libraryProgram , rooms } from './libraryProgram' ;

/** The month the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-12T00:00:00' ) ;

const getEventId = source => source._key ?? source.id ;

/** The room an event happens in — a bare reference or a resolved `Place`, both accepted. */
const getRoomKey = source => ( typeof source.location === 'object' ? source.location?.id : source.location ) ?? null ;

/**
 * Palette demo — one colour per room, and why it does not move.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.schedulerPalette'] - Dot notation path to the demo locale.
 */
const SchedulerPaletteDemo = ( { path = 'demo.scheduler.schedulerPalette' } ) =>
{
    const { description , hint , key , stable , title , wins } = useI18n( path ) ;

    const [ palette , setPalette ] = useState( 'brand' ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="scheduler-palette">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <PalettePicker value={ palette } onChange={ setPalette } hint={ hint } />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ key?.title }</h3>
                <p className="text-sm text-base-content/60">{ key?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        defaultView   = "month"
                        getEventId    = { getEventId }
                        getColorKey   = { getRoomKey }
                        palette       = { palette }
                    />
                </div>

                <ul className="flex flex-wrap gap-3 text-xs">
                    { rooms.map( room => (
                        <li key={ room.id } className="font-mono opacity-60">{ room.id }</li>
                    ) ) }
                </ul>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ wins?.title }</h3>
                <p className="text-sm text-base-content/60">{ wins?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { libraryProgram }
                        defaultDate   = { ANCHOR }
                        defaultView   = "agenda"
                        days          = { 7 }
                        getEventId    = { getEventId }
                        getColorKey   = { getRoomKey }
                        palette       = { palette }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ stable?.title }</h3>
                <p className="text-sm text-base-content/60">{ stable?.description }</p>

                {/* Same events, same accessor, the rooms declared in reverse : the
                    colours do not move, because the keys are sorted and not taken
                    in the order they arrive. */}
                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <Scheduler
                        schema
                        defaultEvents = { [ ...libraryProgram ].reverse() }
                        defaultDate   = { ANCHOR }
                        defaultView   = "month"
                        getEventId    = { getEventId }
                        getColorKey   = { getRoomKey }
                        palette       = { palette }
                    />
                </div>
            </section>

        </Container>
    ) ;
} ;

SchedulerPaletteDemo.displayName = 'SchedulerPaletteDemo' ;

export default SchedulerPaletteDemo ;
