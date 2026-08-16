'use client' ;

import { useMemo } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { expandToDays } from '../../helpers/schedule/expandToDays' ;

import
{
    getAgendaClasses ,
    getAgendaDayClasses ,
    getAgendaDayHeaderClasses ,
    getAgendaRowClasses ,
    getSchedulerEventClasses ,
    SCHEDULER_AGENDA_TIME ,
    SCHEDULER_EVENT_CONTINUES ,
    SCHEDULER_EVENT_INTERACTIVE ,
} from '../../themes/components/scheduler' ;

import EmptyState from '../EmptyState' ;

/**
 * The agenda : what is happening, in order, grouped by day.
 *
 * The plainest of the views and the one that survives a narrow screen. It has no
 * time axis, so an event is a row rather than a rectangle and nothing has to fit
 * in a column fifty pixels wide.
 *
 * It answers to **its own width**, not to the viewport's : the times sit in a
 * gutter when there is room across and move above the card when there is not, so
 * the same component behaves alike on a phone, in a narrow panel beside a desktop
 * layout, and in a sidebar.
 *
 * An event spanning several days appears in each of them — `expandToDays` cuts it
 * at local midnights — and the pieces that are not the real ends say so, so a
 * reader is never told that a conference starts again every morning.
 *
 * Empty days are hidden by default : an agenda lists what happens, and a column
 * of « nothing scheduled » is noise. When the **whole** period is empty, one
 * {@link module:components/EmptyState} says so instead of nothing at all.
 *
 * ### It is the view a phone gets, so it is the one that must open things
 *
 * The gestures of the other views — pulling an edge, drawing a range — are
 * pointer affordances, and this view has none of them by design. What it owes
 * instead is the plain one : **a row opens the event**. Without it there is no
 * way at all to reach a booking on a phone, since the agenda is what a phone is
 * shown. A card becomes a `<button>` where something listens, and stays a
 * paragraph where nothing does.
 *
 * @module components/scheduler/SchedulerAgenda
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the list.
 * @param {Array} props.events - The normalized records to show.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state.
 * @param {(event: Object) => void} [props.onEventClick] - Called with a record when a row is activated. Its absence leaves the rows inert, which is what a list nobody wired should be.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {(event: Object, context: Object) => React.ReactNode} [props.renderEvent] - Renders an event ; receives the record and `{ segment , labels }`.
 * @param {boolean} [props.showEmptyDays=false] - Keep a row for a day with nothing on it.
 * @param {{start: number, end: number}} props.window - The span being shown.
 */
const SchedulerAgenda =
({
    className ,
    events ,
    emptyState ,
    onEventClick ,
    path = 'components.scheduler' ,
    renderEvent ,
    showEmptyDays = false ,
    window ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const days = useMemo( () =>
    {
        const segments = expandToDays( events ?? [] , window ) ;
        const byDay    = new Map() ;

        // Every day of the window gets a bucket, so `showEmptyDays` has something
        // to show and the order never depends on what happens to be scheduled.
        let cursor = dayjs( window.start ).startOf( 'day' ) ;

        while ( cursor.valueOf() < window.end )
        {
            byDay.set( cursor.valueOf() , [] ) ;
            cursor = cursor.add( 1 , 'day' ) ;
        }

        for ( const segment of segments )
        {
            byDay.get( segment.day )?.push( segment ) ;
        }

        // All-day first within a day : it frames the ones that have an hour.
        for ( const list of byDay.values() )
        {
            list.sort( ( a , b ) =>
                Number( b.event.allDay ) - Number( a.event.allDay )
                || a.start - b.start
                || b.end - a.end ) ;
        }

        return [ ...byDay.entries() ].map( ( [ day , list ] ) => ({ day , segments : list }) ) ;
    }
    , [ events , window ] ) ;

    const total = days.reduce( ( count , day ) => count + day.segments.length , 0 ) ;

    if ( total === 0 )
    {
        return emptyState ?? <EmptyState title={ labels?.empty } /> ;
    }

    const today = dayjs().startOf( 'day' ).valueOf() ;

    const visible = showEmptyDays ? days : days.filter( day => day.segments.length > 0 ) ;

    return (
        <div className={ getAgendaClasses({ className }) } { ...rest }>
            { visible.map( ({ day , segments }) => (
                <section key={ day } className={ getAgendaDayClasses() }>

                    <h3 className={ getAgendaDayHeaderClasses({ today : day === today }) }>
                        { dayjs( day ).locale( lang ).format( 'dddd D MMMM' ) }
                    </h3>

                    {/* Kept inside the row structure rather than indented by hand, so
                        it stays aligned with the cards when the gutter narrows. */}
                    { segments.length === 0 && (
                        <div className={ getAgendaRowClasses() }>
                            <span className={ `hidden @md:block ${ SCHEDULER_AGENDA_TIME }` } aria-hidden="true" />
                            <p className="flex-1 text-sm text-base-content/40">{ labels?.emptyDay }</p>
                        </div>
                    ) }

                    { segments.map( segment =>
                    {
                        const { event } = segment ;

                        if ( renderEvent )
                        {
                            return (
                                <div key={ `${ event.id }-${ segment.day }` } className={ getAgendaRowClasses() }>
                                    { renderEvent( event , { segment , labels } ) }
                                </div>
                            ) ;
                        }

                        const { className : eventClassName , style } = getSchedulerEventClasses
                        ({
                            className : onEventClick ? SCHEDULER_EVENT_INTERACTIVE : undefined ,
                            color     : event.color ,
                            past      : event.end <= Date.now() ,
                            status    : event.status ,
                        }) ;

                        // Spans rather than paragraphs : the very same content has to
                        // sit inside a `<button>`, which only takes phrasing.
                        const card = (
                            <>
                                <span className="block truncate font-semibold">{ event.title }</span>

                                { ( segment.continuesBefore || segment.continuesAfter ) && (
                                    <span className={ `block text-xs ${ SCHEDULER_EVENT_CONTINUES }` }>
                                        { labels?.continues }
                                    </span>
                                ) }
                            </>
                        ) ;

                        return (
                            <div key={ `${ event.id }-${ segment.day }` } className={ getAgendaRowClasses() }>

                                {/* One line while stacked — « 18:00 – 20:00 » — and two of them
                                    once the gutter exists, where 64 pixels cannot hold both.
                                    The break and the dash answer to the same container query,
                                    so the text exists once and is never duplicated. */}
                                <time className={ SCHEDULER_AGENDA_TIME } dateTime={ new Date( segment.start ).toISOString() }>
                                    { event.allDay
                                        ? labels?.allDay
                                        : (
                                            <>
                                                { dayjs( segment.start ).format( 'HH:mm' ) }
                                                <span className="@md:hidden"> – </span>
                                                <br className="hidden @md:inline" />
                                                <span className="opacity-60">{ dayjs( segment.end ).format( 'HH:mm' ) }</span>
                                            </>
                                        ) }
                                </time>

                                { onEventClick
                                    ? (
                                        <button
                                            type      = "button"
                                            className = { eventClassName }
                                            style     = { style }
                                            onClick   = { () => onEventClick( event ) }
                                        >
                                            { card }
                                        </button>
                                    )
                                    : (
                                        <div className={ eventClassName } style={ style }>
                                            { card }
                                        </div>
                                    ) }

                            </div>
                        ) ;
                    } ) }

                </section>
            ) ) }
        </div>
    ) ;
} ;

SchedulerAgenda.displayName = 'SchedulerAgenda' ;

export default SchedulerAgenda ;
