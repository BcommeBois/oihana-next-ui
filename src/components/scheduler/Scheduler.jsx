'use client' ;

import useScheduler from '../../hooks/useScheduler' ;

import { AGENDA , DAY , MONTH , TIMELINE , WEEK } from '../../helpers/schedule/getViewWindow' ;

import { getSchedulerClasses } from '../../themes/components/scheduler' ;

import SchedulerAgenda  from './SchedulerAgenda' ;
import SchedulerMonth    from './SchedulerMonth' ;
import SchedulerTimeGrid from './SchedulerTimeGrid' ;
import SchedulerToolbar from './SchedulerToolbar' ;

export { AGENDA , DAY , MONTH , TIMELINE , WEEK } ;

/**
 * The views that are actually built, in the order they read.
 *
 * `views` is filtered against this, so asking for one that does not exist yet
 * cannot put a tab in the switcher that leads nowhere. The list grows as the
 * views land, and nothing an application wrote has to change when it does.
 */
export const builtViews = [ AGENDA , DAY , WEEK , MONTH ] ;

/** Keeps only the views that exist, and says so in development when one does not. */
const resolveViews = ( requested ) =>
{
    const kept = ( requested ?? builtViews ).filter( view => builtViews.includes( view ) ) ;

    if ( process.env.NODE_ENV === 'development' )
    {
        const missing = ( requested ?? [] ).filter( view => !builtViews.includes( view ) ) ;

        if ( missing.length > 0 )
        {
            console.warn( `Scheduler: these views are not built yet and were dropped — ${ missing.join( ', ' ) }.` ) ;
        }
    }

    return kept.length > 0 ? kept : builtViews ;
} ;

/**
 * A calendar of events : what is scheduled, when, and — later — where it moves to.
 *
 * The shell. It owns the three pieces of state a scheduler has — the events, the
 * view, and the date being looked at — and renders the toolbar and whichever view
 * is current. Each piece is controlled or uncontrolled on its own, so an
 * application can own the events and leave the navigation to the component,
 * which is the usual arrangement.
 *
 * ### One component, several views
 *
 * A phone does not want a week of seven columns fifty pixels wide ; it wants a
 * list. That is a different **view**, not a different component, so `views` and a
 * responsive `defaultView` are all an application has to say. The switcher hides
 * itself when there is only one view to switch to.
 *
 * ### schema.org, or plain objects
 *
 * With `schema`, the events are read as JSON-LD : `Event`, `Schedule`, and any
 * type of your own carrying their properties — the adapter reads properties and
 * never `@type`, so a house subtype needs no declaring. Without it, events are
 * expected to carry `id` / `start` / `end` directly. Either way, **`onChange`
 * hands back objects in the shape they came in.**
 *
 * @module components/scheduler/Scheduler
 *
 * @param {Object} props
 * @param {boolean}  [props.allDayEndInclusive=true] - A bare `Date` end covers its own day.
 * @param {string}   [props.className] - Extra classes for the root.
 * @param {Date}     [props.date] - Controlled anchor date.
 * @param {Date}     [props.defaultDate] - Initial anchor for uncontrolled mode.
 * @param {Array}    [props.defaultEvents] - Initial events for uncontrolled mode.
 * @param {number}   [props.defaultDuration] - Length of an event stating neither end nor duration.
 * @param {string}   [props.defaultView='agenda'] - Initial view for uncontrolled mode.
 * @param {number}   [props.days=7] - Length of the agenda window, in days.
 * @param {React.ReactNode} [props.emptyState] - Replaces a view's default empty state.
 * @param {Array}    [props.events] - Controlled events.
 * @param {Function} [props.getColor] - Reads an event's display color. Wins over the palette.
 * @param {string|string[]} [props.palette] - Colours the events whose source names none. A palette name (`'brand'`, `'theme'`, `'nivo'`) or explicit colours. Off unless given.
 * @param {Function} [props.getColorKey] - What decides an event's colour. Defaults to its resource — one colour per room, per round, per calendar.
 * @param {Array} [props.colorKeys] - The keys in the order they take colours, which freezes the mapping.
 * @param {Function} [props.getEventId] - Reads an event's identity. Required when neither `identifier`, `id` nor `url` is the real key.
 * @param {Function} [props.getResourceId] - Reads the timeline row an event belongs to.
 * @param {Function} [props.isEventMovable] - Whether an event may be dragged — a past slot, a cancelled booking, a lock of your own. The recurrence guard applies whatever it answers.
 * @param {Function} [props.isEventResizable] - Whether an event's edges may be pulled. Defaults to `isEventMovable`.
 * @param {boolean}  [props.movable=false] - Let an event be dragged to another time. Day and week views.
 * @param {boolean}  [props.resizable=false] - Let an event's edges be pulled. Pointers that hover ; on touch, resizing belongs to the editor.
 * @param {boolean}  [props.creatable=false] - Let a range be drawn, or clicked, on an empty slot.
 * @param {number}   [props.createDuration=30] - Minutes a plain click on an empty slot stands for.
 * @param {Function} [props.onEventCreate] - Called with `{ start , end }`. **Return an object and it is added** ; return nothing and the creation is yours to make — which is what opening an editor does.
 * @param {number}   [props.snapMinutes=15] - Step a dragged event lands on.
 * @param {number}   [props.maxEventsPerDay=3] - Month view : how many events a cell shows before it counts the rest.
 * @param {number}   [props.dayStart=0] - Time grid : minutes from midnight where the axis begins.
 * @param {number}   [props.dayEnd=1440] - Time grid : minutes from midnight where it ends.
 * @param {number|string} [props.height] - Time grid : height of the scrolling area.
 * @param {boolean}  [props.nowIndicator=true] - Time grid : draw the line across today.
 * @param {number}   [props.pixelsPerHour=48] - Time grid : zoom.
 * @param {string}   [props.scrollTime='08:00'] - Time grid : where it lands on mount.
 * @param {number}   [props.slotDuration=30] - Time grid : minutes between two rules.
 * @param {Function} [props.onDayClick] - Called with a day, when a cell is activated.
 * @param {Function} [props.onEventClick] - Called with a record, when an event is activated.
 * @param {Function} [props.onChange] - `( nextEvents , change ) => void|Promise`. A rejected promise reverts, in uncontrolled mode.
 * @param {Function} [props.onDateChange] - Called with the new anchor.
 * @param {Function} [props.onViewChange] - Called with the new view.
 * @param {string}   [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {Function} [props.renderEvent] - Renders an event, in place of the default card.
 * @param {boolean}  [props.schema=false] - Read the events as schema.org JSON-LD.
 * @param {boolean}  [props.showEmptyDays=false] - Keep a row for a day with nothing on it.
 * @param {boolean}  [props.toolbar=true] - Render the toolbar. `false` composes your own with `SchedulerToolbar`.
 * @param {React.ReactNode} [props.toolbarOptions] - Extra controls, placed at the end of the toolbar.
 * @param {string}   [props.view] - Controlled view.
 * @param {string[]} [props.views] - The views to offer. Defaults to those that are built.
 * @param {number|string} [props.weekStartsOn] - Force the first day of week ; defaults to the locale.
 *
 * @example Reading a JSON-LD payload
 * ```jsx
 * <Scheduler
 *     schema
 *     events     = { payload.result }
 *     getEventId = { source => source._key }
 *     onChange   = { ( next , change ) => api.save( change ) }
 * />
 * ```
 *
 * @example Plain objects, controlled
 * ```jsx
 * <Scheduler
 *     events   = { events }
 *     onChange = { setEvents }
 *     days     = { 14 }
 * />
 * ```
 */
const Scheduler =
({
    allDayEndInclusive = true ,
    className ,
    date ,
    defaultDate ,
    defaultDuration ,
    defaultEvents ,
    defaultView = AGENDA ,
    dayEnd ,
    dayStart ,
    days = 7 ,
    emptyState ,
    height ,
    nowIndicator ,
    pixelsPerHour ,
    scrollTime ,
    slotDuration ,
    events ,
    colorKeys ,
    getColor ,
    getColorKey ,
    creatable = false ,
    createDuration ,
    getEventId ,
    getResourceId ,
    isEventMovable ,
    isEventResizable ,
    movable = false ,
    resizable = false ,
    palette ,
    maxEventsPerDay = 3 ,
    onChange ,
    onDayClick ,
    onEventClick ,
    onEventCreate ,
    onDateChange ,
    onViewChange ,
    path = 'components.scheduler' ,
    renderEvent ,
    schema = false ,
    showEmptyDays = false ,
    snapMinutes ,
    toolbar = true ,
    toolbarOptions ,
    view ,
    views ,
    weekStartsOn ,
    ...rest
}) =>
{
    const offered = resolveViews( views ) ;

    const scheduler = useScheduler
    ({
        allDayEndInclusive ,
        date ,
        days ,
        defaultDate ,
        defaultDuration ,
        defaultEvents ,
        defaultView ,
        events ,
        colorKeys ,
        getColor ,
        getColorKey ,
        getEventId ,
        getResourceId ,
        palette ,
        onChange ,
        onDateChange ,
        onViewChange ,
        schema ,
        view ,
        weekStartsOn ,
    }) ;

    // Two questions, one answer for the views : the application's own rule, and
    // the one the core never gives up — an occurrence of a recurring rule cannot
    // be written through, so it is never offered as draggable in the first place.
    const canDrag   = ( event ) => scheduler.canMove( event ) && ( isEventMovable ? isEventMovable( event ) : true ) ;
    const canStretch = ( event ) => scheduler.canMove( event ) && ( ( isEventResizable ?? isEventMovable ) ? ( isEventResizable ?? isEventMovable )( event ) : true ) ;

    /**
     * What a drawn range, or a clicked slot, becomes.
     *
     * **The identity of a new event is the application's**, never this library's :
     * an invented id is an invented collision, and the real key comes from the
     * server. So the range is reported, and what comes back decides — an object
     * is added, nothing at all means the application took it from here, which is
     * exactly what opening an editor looks like.
     */
    const createEvent = ( range ) =>
    {
        if ( typeof onEventCreate !== 'function' )
        {
            if ( process.env.NODE_ENV === 'development' )
            {
                console.warn( 'Scheduler: `creatable` is set but there is no `onEventCreate`, so a drawn range has nowhere to go.' ) ;
            }
            return ;
        }

        const created = onEventCreate( range ) ;

        if ( created !== null && typeof created === 'object' )
        {
            scheduler.addEvent( created ) ;
        }
    } ;

    return (
        <div className={ getSchedulerClasses({ className }) } { ...rest }>

            { toolbar && (
                <SchedulerToolbar
                    date         = { scheduler.date }
                    onNext       = { scheduler.next }
                    onPrevious   = { scheduler.previous }
                    onToday      = { scheduler.today }
                    onViewChange = { scheduler.setView }
                    path         = { path }
                    view         = { scheduler.view }
                    views        = { offered }
                    window       = { scheduler.window }
                >
                    { toolbarOptions }
                </SchedulerToolbar>
            ) }

            { ( scheduler.view === DAY || scheduler.view === WEEK )
                ? (
                    <SchedulerTimeGrid
                        creatable        = { creatable }
                        createDuration   = { createDuration }
                        dayEnd           = { dayEnd }
                        dayStart         = { dayStart }
                        events           = { scheduler.events }
                        height           = { height }
                        isEventMovable   = { canDrag }
                        isEventResizable = { canStretch }
                        movable          = { movable }
                        nowIndicator     = { nowIndicator }
                        onEventClick     = { onEventClick }
                        onEventCreate    = { createEvent }
                        onEventMove      = { scheduler.moveEvent }
                        onEventResize    = { scheduler.resizeEvent }
                        path             = { path }
                        pixelsPerHour    = { pixelsPerHour }
                        renderEvent      = { renderEvent }
                        resizable        = { resizable }
                        scrollTime       = { scrollTime }
                        slotDuration     = { slotDuration }
                        snapMinutes      = { snapMinutes }
                        window           = { scheduler.window }
                    />
                )
                : scheduler.view === MONTH
                ? (
                    <SchedulerMonth
                        date            = { scheduler.date }
                        events          = { scheduler.events }
                        maxEventsPerDay = { maxEventsPerDay }
                        onDayClick      = { onDayClick }
                        onEventClick    = { onEventClick }
                        path            = { path }
                        renderEvent     = { renderEvent }
                        weekStartsOn    = { weekStartsOn }
                        window          = { scheduler.window }
                    />
                )
                : (
                    <SchedulerAgenda
                        emptyState    = { emptyState }
                        events        = { scheduler.events }
                        path          = { path }
                        renderEvent   = { renderEvent }
                        showEmptyDays = { showEmptyDays }
                        window        = { scheduler.window }
                    />
                ) }

        </div>
    ) ;
} ;

Scheduler.displayName = 'Scheduler' ;

export default Scheduler ;
