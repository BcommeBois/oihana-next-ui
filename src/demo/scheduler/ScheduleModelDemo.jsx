'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Badge     from '@/components/Badge' ;
import Button    from '@/components/Button' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Table     from '@/components/layouts/Table' ;

import dayjs from '@/helpers/date/configureDayjs' ;

import { createTimeScale } from '@/helpers/schedule/timeScale' ;
import { expandToDays }    from '@/helpers/schedule/expandToDays' ;
import { fromSchemaList }  from '@/helpers/schedule/fromSchema' ;
import { layoutOverlaps }  from '@/helpers/schedule/layoutOverlaps' ;
import { toSchemaPatch }   from '@/helpers/schedule/toSchemaPatch' ;

import { libraryProgram , rooms } from './libraryProgram' ;

/** The week the fixture is written around, so the page opens on something to look at. */
const ANCHOR = '2026-08-10' ;

/** How each non-nominal status is tinted. `scheduled` is the silent default. */
const STATUS_COLOR =
{
    cancelled   : 'error' ,
    postponed   : 'warning' ,
    rescheduled : 'info' ,
    movedOnline : 'accent' ,
} ;

/** The identity the demo reads, and the key the locale explains each entry under. */
const sourceKey = ( source , index ) => source._key ?? source.id ?? `schema-${ index }` ;

const roomName = ( id ) => rooms.find( room => room.id === id )?.name ?? id ;

/**
 * Lot 1 of the scheduler — the calculation, with no view on top of it.
 *
 * There is nothing to drag here on purpose : this page shows what comes out of
 * `helpers/schedule`, so the numbers can be checked before anything is drawn
 * from them. Navigate the week and watch the recurring series follow, the
 * cancelled session keep its status, and the all-day exhibition keep its span.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.scheduleModel'] - Dot notation path to the demo locale.
 */
const ScheduleModelDemo = ( { path = 'demo.scheduler.scheduleModel' } ) =>
{
    const { cases , counts , description , layout , patch , produced , scale : scaleLabels , table , title , toolbar } = useI18n( path ) ;

    const [ weekStart , setWeekStart ] = useState( () => dayjs( ANCHOR ).startOf( 'week' ) ) ;
    const [ inclusive , setInclusive ] = useState( true ) ;

    const window = useMemo( () => ({
        start : weekStart.valueOf() ,
        end   : weekStart.add( 7 , 'day' ).valueOf() ,
    }) , [ weekStart ] ) ;

    // The one call an application makes. Everything below is reading its result.
    const events = useMemo( () => fromSchemaList( libraryProgram ,
    {
        window ,
        allDayEndInclusive : inclusive ,
        getEventId         : source => source._key ?? source.id ,
    }) , [ window , inclusive ] ) ;

    const segments = useMemo( () => expandToDays( events , window ) , [ events , window ] ) ;

    // Overlap columns, computed per day exactly as the week view will.
    const columnsByDay = useMemo( () =>
    {
        const byDay = new Map() ;

        for ( const segment of segments.filter( item => !item.event.allDay ) )
        {
            const list = byDay.get( segment.day ) ?? [] ;
            list.push( segment ) ;
            byDay.set( segment.day , list ) ;
        }

        return [ ...byDay.entries() ].map( ( [ day , list ] ) => ({ day , placed : layoutOverlaps( list ) }) ) ;
    }
    , [ segments ] ) ;

    const scale = useMemo( () => createTimeScale({ dayStart : 8 * 60 , dayEnd : 22 * 60 , pixelsPerHour : 48 }) , [] ) ;

    const days = Array.from( { length : 7 } , ( _ , index ) => weekStart.add( index , 'day' ) ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="schedule-model">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" onClick={ () => setWeekStart( week => week.subtract( 1 , 'week' ) ) }>{ toolbar?.previous }</Button>
                <Button size="sm" onClick={ () => setWeekStart( dayjs( ANCHOR ).startOf( 'week' ) ) }>{ toolbar?.anchor }</Button>
                <Button size="sm" onClick={ () => setWeekStart( week => week.add( 1 , 'week' ) ) }>{ toolbar?.next }</Button>

                <span className="font-mono text-sm opacity-70">
                    { weekStart.format( 'DD/MM/YYYY' ) } → { weekStart.add( 6 , 'day' ).format( 'DD/MM/YYYY' ) }
                </span>

                <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
                    <input
                        type      = "checkbox"
                        className = "toggle toggle-sm"
                        checked   = { inclusive }
                        onChange  = { event => setInclusive( event.target.checked ) }
                    />
                    <span className="font-mono">{ toolbar?.inclusive }</span>
                </label>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
                <span><b className="font-mono">{ libraryProgram.length }</b> { counts?.sources }</span>
                <span><b className="font-mono">{ events.length }</b> { counts?.occurrences }</span>
                <span><b className="font-mono">{ segments.length }</b> { counts?.segments }</span>
            </div>

            <Table size="sm" zebra pinRows containerClassName="max-h-[32rem] overflow-y-auto">
                <thead>
                    <tr>
                        <th>{ table?.id }</th>
                        <th>{ table?.title }</th>
                        <th>{ table?.start }</th>
                        <th>{ table?.end }</th>
                        <th>{ table?.allDay }</th>
                        <th>{ table?.resource }</th>
                        <th>{ table?.status }</th>
                        <th>{ table?.color }</th>
                        <th>{ table?.type }</th>
                    </tr>
                </thead>
                <tbody>
                    { events.map( event => (
                        <tr key={ event.id }>
                            <td className="font-mono text-xs">{ event.id }</td>
                            <td>{ event.title }</td>
                            <td className="whitespace-nowrap font-mono text-xs">{ dayjs( event.start ).format( 'ddd DD/MM HH:mm' ) }</td>
                            <td className="whitespace-nowrap font-mono text-xs">{ dayjs( event.end ).format( 'ddd DD/MM HH:mm' ) }</td>
                            <td>{ event.allDay ? <Badge size="sm">{ table?.allDayBadge }</Badge> : null }</td>
                            <td className="text-xs">
                                { event.resourceId === null
                                    ? <span className="opacity-40">{ table?.noResource }</span>
                                    : roomName( event.resourceId ) }
                            </td>
                            <td>
                                { event.status === 'scheduled'
                                    ? <span className="text-xs opacity-40">{ table?.scheduled }</span>
                                    : <Badge size="sm" color={ STATUS_COLOR[ event.status ] }>{ event.status }</Badge> }
                            </td>
                            <td className="text-xs">{ event.color ?? <span className="opacity-40">—</span> }</td>
                            <td className="font-mono text-xs opacity-60">{ event.source[ '@type' ] }</td>
                        </tr>
                    ) ) }
                    { events.length === 0 && (
                        <tr><td colSpan={ 9 } className="py-6 text-center opacity-60">{ table?.empty }</td></tr>
                    ) }
                </tbody>
            </Table>

            <Divider />

            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">{ produced?.title }</h2>
                <p className="text-sm text-base-content/60">{ produced?.description }</p>
            </header>

            <ul className="flex flex-col gap-2 text-sm">
                { libraryProgram.map( ( source , index ) =>
                {
                    const key   = sourceKey( source , index ) ;
                    const count = events.filter( event => event.source === source ).length ;

                    return (
                        <li key={ key } className="flex flex-wrap items-baseline gap-2">
                            <Badge size="sm" color={ count === 0 ? 'ghost' : 'success' }>{ count }</Badge>
                            <b>{ source.name ?? key }</b>
                            <span className="opacity-60">{ cases?.[ key ] }</span>
                        </li>
                    ) ;
                } ) }
            </ul>

            <Divider />

            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">{ layout?.title }</h2>
                <p className="text-sm text-base-content/60">{ layout?.description }</p>
            </header>

            <div className="flex flex-col gap-3">
                { days.map( day =>
                {
                    const entry = columnsByDay.find( item => item.day === day.startOf( 'day' ).valueOf() ) ;

                    return (
                        <div key={ day.valueOf() } className="flex items-center gap-3">
                            <span className="w-28 shrink-0 font-mono text-xs opacity-70">{ day.format( 'ddd DD/MM' ) }</span>
                            { entry === undefined
                                ? <span className="text-xs opacity-40">—</span>
                                : (
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        { entry.placed.map( item => (
                                            <span key={ `${ item.event.id }-${ item.start }` } className="rounded border border-base-300 bg-base-100 px-2 py-0.5">
                                                { item.event.title }
                                                <span className="ml-2 font-mono opacity-60">
                                                    { layout?.column } { item.column + 1 }/{ item.columns } · { Math.round( item.width * 100 ) }%
                                                </span>
                                            </span>
                                        ) ) }
                                    </div>
                                ) }
                        </div>
                    ) ;
                } ) }
            </div>

            <Divider />

            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">{ patch?.title }</h2>
                <p className="text-sm text-base-content/60">{ patch?.description }</p>
            </header>

            <Table size="sm" zebra>
                <thead>
                    <tr><th>{ patch?.occurrence }</th><th>startDate</th><th>endDate</th></tr>
                </thead>
                <tbody>
                    { events.slice( 0 , 6 ).map( event =>
                    {
                        const fragment = toSchemaPatch( event , { allDayEndInclusive : inclusive } ) ;

                        return (
                            <tr key={ event.id }>
                                <td className="text-xs">{ event.title }</td>
                                <td className="font-mono text-xs">{ fragment.startDate }</td>
                                <td className="font-mono text-xs">{ fragment.endDate }</td>
                            </tr>
                        ) ;
                    } ) }
                </tbody>
            </Table>

            <Divider />

            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">{ scaleLabels?.title }</h2>
                <p className="text-sm text-base-content/60">{ scaleLabels?.description }</p>
            </header>

            <div className="flex flex-wrap gap-6 font-mono text-xs">
                <span>{ scaleLabels?.size } <b>{ scale.size }px</b></span>
                <span>08:00 → <b>{ scale.offsetOf( weekStart.add( 8 , 'hour' ).valueOf() ) }px</b></span>
                <span>09:15 → <b>{ scale.offsetOf( weekStart.add( 9 , 'hour' ).add( 15 , 'minute' ).valueOf() ) }px</b></span>
                <span>{ scaleLabels?.length } → <b>{ scale.lengthOf( 0 , 90 * 60000 ) }px</b></span>
                <span>{ scaleLabels?.snap } → <b>{ dayjs( scale.snap( weekStart.add( 9 , 'hour' ).add( 22 , 'minute' ).valueOf() ) ).format( 'HH:mm' ) }</b></span>
            </div>

        </Container>
    ) ;
} ;

ScheduleModelDemo.displayName = 'ScheduleModelDemo' ;

export default ScheduleModelDemo ;
