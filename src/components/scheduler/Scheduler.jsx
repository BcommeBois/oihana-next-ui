'use client' ;

import { useState } from 'react' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import useScheduler from '../../hooks/useScheduler' ;

import { AGENDA , DAY , MONTH , TIMELINE , WEEK } from '../../helpers/schedule/getViewWindow' ;

import { getSchedulerClasses } from '../../themes/components/scheduler' ;

import SchedulerAgenda     from './SchedulerAgenda' ;
import SchedulerEventPanel from './SchedulerEventPanel' ;
import SchedulerMonth      from './SchedulerMonth' ;
import SchedulerTimeGrid   from './SchedulerTimeGrid' ;
import SchedulerTimeline   from './SchedulerTimeline' ;
import SchedulerToolbar    from './SchedulerToolbar' ;

export { AGENDA , DAY , MONTH , TIMELINE , WEEK } ;

/**
 * The views that are actually built, in the order they read.
 *
 * `views` is filtered against this, so asking for one that does not exist yet
 * cannot put a tab in the switcher that leads nowhere. The list grows as the
 * views land, and nothing an application wrote has to change when it does.
 */
export const builtViews = [ AGENDA , DAY , WEEK , MONTH , TIMELINE ] ;

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
 * ### One prop for « the reader may change this »
 *
 * `interactive` turns on the four things that answer to that sentence : moving,
 * stretching, creating and the panel. The four rather than three — without the
 * panel, `resizable` promises a finger a gesture it cannot make, since the
 * handles are eight pixels of hover and a phone has neither. Each of the four
 * still wins when it is passed on its own, so `interactive` with
 * `resizable={ false }` is a calendar one may move things around in but not
 * stretch.
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
 * @param {boolean|Object} [props.details] - Open a panel when an event is activated. `true` for the defaults, or an object of props forwarded to `SchedulerEventPanel` (`placement`, `fields`, `renderField`, `maxWidth`…). Defaults to `interactive`.
 * @param {boolean} [props.interactive=false] - Let the reader change things : turns on `movable`, `resizable`, `creatable` and `details` at once. Any of the four passed explicitly wins over it.
 * @param {Function} [props.getEventPermissions] - What a user may do with an event : `'read'` / `'edit'`, or `{ read , edit , move , resize , remove }`. **It does not hide anything** — what is not to be shown is not to be sent.
 * @param {Function} [props.getStatus] - Reads the status, for a vocabulary of your own — `ReservationStatusType`, for one.
 * @param {Array} [props.datePairs] - Where to look for a span, for the types that do not use `startDate`. See `helpers/schedule/datePairs`.
 * @param {Array} [props.unwrap] - Properties that may hold the dated object — `reservationFor` by default.
 * @param {Function} [props.isEventMovable] - Whether an event may be dragged — a past slot, a cancelled booking, a lock of your own. The recurrence guard and the permissions apply whatever it answers.
 * @param {Function} [props.isEventResizable] - Whether an event's edges may be pulled. Defaults to `isEventMovable`.
 * @param {boolean}  [props.movable] - Let an event be dragged to another time. Day, week and timeline views. Defaults to `interactive`.
 * @param {boolean}  [props.resizable] - Let an event's edges be pulled. Pointers that hover ; on touch, the end is corrected in the panel. Defaults to `interactive`.
 * @param {boolean}  [props.creatable] - Let a range be drawn on an empty slot, a slot be tapped, a day be filled in, and a create command sit in the toolbar. Defaults to `interactive`.
 * @param {number}   [props.createDuration=30] - Minutes a plain click on an empty slot stands for. A tap that dwells long enough to become a gesture and never travels counts as one.
 * @param {boolean}  [props.showCreateButton=true] - Keep the create command in the toolbar when `creatable`. Off for an application placing its own — `toolbarOptions` and `useScheduler` are how.
 * @param {Function} [props.onEventCreate] - Called with `{ start , end }`, plus `allDay` from a month and `resourceId` from a timeline. **Return an object and it is added** ; return nothing and the creation is yours to make — which is what opening an editor does.
 * @param {number}   [props.snapMinutes=15] - Step a dragged event lands on.
 * @param {Array}    [props.resources] - Timeline : the rows, in order. Without it they are derived from the events — a first look at a payload, never a plan.
 * @param {Function} [props.getResourceName] - Timeline : reads a row's label off its declared source.
 * @param {Function} [props.setResourceId] - Timeline : builds the patch that moves an event to another row. Without it, schema mode reports the change and writes nothing.
 * @param {Function} [props.renderResource] - Timeline : renders a row's head, in place of its name.
 * @param {number}   [props.rowHeight=34] - Timeline : height of one lane. A row of three overlapping bookings is three lanes tall.
 * @param {boolean}  [props.showNarrowLabels=true] - Timeline : write the title beside a bar too small to hold it. Off for a dense plan, where neighbouring labels would run into one another.
 * @param {boolean|Function} [props.tooltip=true] - What a card or block says on hover. `false` removes it, `( event ) => string` writes it.
 * @param {string} [props.tooltipColor='neutral'] - Fill of that bubble, for the whole scheduler. A daisyUI token — its `-content` pair is the only contrast a theme guarantees.
 * @param {number}   [props.pixelsPerDay=160] - Timeline : zoom of a multi-day axis.
 * @param {number}   [props.timelineDays=1] - Timeline : a day of hours, or a week of days. **The window decides the rest.**
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
 *
 * @example A calendar one may change, on a pointer as on a finger
 * ```jsx
 * <Scheduler
 *     interactive
 *     defaultEvents = { events }
 *     defaultView   = "week"
 *     onChange      = { ( next , change ) => api.save( change ) }
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
    creatable ,
    createDuration = 30 ,
    datePairs ,
    resources ,
    getResourceName ,
    setResourceId ,
    renderResource ,
    rowHeight ,
    showNarrowLabels ,
    tooltip ,
    tooltipColor ,
    pixelsPerDay ,
    timelineDays ,
    details ,
    getEventId ,
    getEventPermissions ,
    getResourceId ,
    getStatus ,
    interactive = false ,
    isEventMovable ,
    isEventResizable ,
    unwrap ,
    movable ,
    resizable ,
    showCreateButton = true ,
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

    // `interactive` is a default, never an override : a calendar one may move
    // things around in but not stretch is a legitimate thing to ask for, and it
    // is `interactive` with `resizable={ false }`.
    const mayCreate = creatable ?? interactive ;
    const mayMove   = movable   ?? interactive ;
    const mayResize = resizable ?? interactive ;
    const panel     = details   ?? interactive ;

    const scheduler = useScheduler
    ({
        allDayEndInclusive ,
        date ,
        days ,
        defaultDate ,
        defaultDuration ,
        defaultEvents ,
        datePairs ,
        defaultView ,
        resources ,
        getResourceName ,
        setResourceId ,
        timelineDays ,
        events ,
        colorKeys ,
        getColor ,
        getColorKey ,
        getEventId ,
        getEventPermissions ,
        getResourceId ,
        getStatus ,
        palette ,
        unwrap ,
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
    const canDrag    = ( event ) => scheduler.canMove( event ) && ( isEventMovable ? isEventMovable( event ) : true ) ;
    const canStretch = ( event ) => scheduler.canResize( event ) && ( ( isEventResizable ?? isEventMovable ) ? ( isEventResizable ?? isEventMovable )( event ) : true ) ;

    // The panel is opened here when `details` asks for it, and by the application
    // otherwise — `onEventClick` keeps firing either way, so composing one's own
    // window never means giving up the built-in one's wiring.
    const [ picked , setPicked ] = useState( null ) ;

    // A range being drawn into an event : the panel opens on it, in editing, and
    // the save is what creates. `onEventCreate` still speaks first — returning an
    // object from it keeps the one-line path of lot 6 intact.
    const [ drawn , setDrawn ] = useState( null ) ;

    const openDetails = ( event ) =>
    {
        onEventClick?.( event ) ;

        if ( panel && scheduler.permissionsOf( event ).read )
        {
            setPicked( event ) ;
        }
    } ;

    const closePanel = () =>
    {
        setPicked( null ) ;
        setDrawn( null ) ;
    } ;

    // The record is re-read from the current list : an event edited or moved
    // while its panel is open would otherwise go on showing what it used to be.
    const shown = picked === null ? null : ( scheduler.events.find( event => event.id === picked.id ) ?? picked ) ;

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
        const created = typeof onEventCreate === 'function' ? onEventCreate( range ) : undefined ;

        if ( created !== null && created !== undefined && typeof created === 'object' )
        {
            scheduler.addEvent( created ) ;
            return ;
        }

        // Nothing came back and there is a panel to fill : the range becomes a
        // form rather than an event, which is the honest answer to « the
        // application will make this one itself ».
        if ( panel )
        {
            setDrawn( range ) ;
            return ;
        }

        if ( process.env.NODE_ENV === 'development' )
        {
            console.warn( 'Scheduler: a range was drawn, but `onEventCreate` returned nothing and `details` is off — so it has nowhere to go.' ) ;
        }
    } ;

    /**
     * Creating without a pointer to point with.
     *
     * The command has no slot under a finger to read, so it takes **the next
     * whole hour, on the day being looked at** — near enough to be a starting
     * point, and handed straight to a form that can correct it. The clock is read
     * in the handler and never during a render : reading it while rendering is a
     * hydration mismatch on every load, which is the lesson `useNow` carries.
     */
    const createCommand = () =>
    {
        const at = dayjs( scheduler.date ).startOf( 'day' ).add( dayjs().hour() + 1 , 'hour' ) ;

        createEvent({ end : at.add( createDuration , 'minute' ).valueOf() , start : at.valueOf() }) ;
    } ;

    return (
        <div className={ getSchedulerClasses({ className }) } { ...rest }>

            { toolbar && (
                <SchedulerToolbar
                    date         = { scheduler.date }
                    onCreate     = { mayCreate && showCreateButton ? createCommand : undefined }
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

            { scheduler.view === TIMELINE
                ? (
                    <SchedulerTimeline
                        creatable        = { mayCreate }
                        createDuration   = { createDuration }
                        dayEnd           = { dayEnd }
                        dayStart         = { dayStart }
                        emptyState       = { emptyState }
                        events           = { scheduler.events }
                        isEventMovable   = { canDrag }
                        isEventResizable = { canStretch }
                        movable          = { mayMove }
                        nowIndicator     = { nowIndicator }
                        onEventClick     = { openDetails }
                        onEventCreate    = { createEvent }
                        onEventMove      = { scheduler.moveEvent }
                        onEventResize    = { scheduler.resizeEvent }
                        path             = { path }
                        pixelsPerDay     = { pixelsPerDay }
                        pixelsPerHour    = { pixelsPerHour }
                        renderEvent      = { renderEvent }
                        renderResource   = { renderResource }
                        resizable        = { mayResize }
                        resources        = { scheduler.resources }
                        rowHeight        = { rowHeight }
                        scrollTime       = { scrollTime }
                        showNarrowLabels = { showNarrowLabels }
                        slotDuration     = { slotDuration }
                        snapMinutes      = { snapMinutes }
                        tooltip          = { tooltip }
                        tooltipColor     = { tooltipColor }
                        window           = { scheduler.window }
                    />
                )
                : ( scheduler.view === DAY || scheduler.view === WEEK )
                ? (
                    <SchedulerTimeGrid
                        creatable        = { mayCreate }
                        createDuration   = { createDuration }
                        dayEnd           = { dayEnd }
                        dayStart         = { dayStart }
                        events           = { scheduler.events }
                        height           = { height }
                        isEventMovable   = { canDrag }
                        isEventResizable = { canStretch }
                        movable          = { mayMove }
                        nowIndicator     = { nowIndicator }
                        onEventClick     = { openDetails }
                        onEventCreate    = { createEvent }
                        onEventMove      = { scheduler.moveEvent }
                        onEventResize    = { scheduler.resizeEvent }
                        path             = { path }
                        pixelsPerHour    = { pixelsPerHour }
                        renderEvent      = { renderEvent }
                        resizable        = { mayResize }
                        scrollTime       = { scrollTime }
                        slotDuration     = { slotDuration }
                        snapMinutes      = { snapMinutes }
                        tooltip          = { tooltip }
                        tooltipColor     = { tooltipColor }
                        window           = { scheduler.window }
                    />
                )
                : scheduler.view === MONTH
                ? (
                    <SchedulerMonth
                        creatable       = { mayCreate }
                        date            = { scheduler.date }
                        events          = { scheduler.events }
                        maxEventsPerDay = { maxEventsPerDay }
                        onDayClick      = { onDayClick }
                        onEventClick    = { openDetails }
                        onEventCreate   = { createEvent }
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
                        // A row is a control only where something listens. The
                        // agenda is what a phone is shown, so this is the whole of
                        // its reach : no axis to draw on, no edge to pull.
                        onEventClick  = { ( onEventClick || panel ) ? openDetails : undefined }
                        path          = { path }
                        renderEvent   = { renderEvent }
                        showEmptyDays = { showEmptyDays }
                        window        = { scheduler.window }
                    />
                ) }

            { panel && (
                <SchedulerEventPanel
                    defaultMode = { drawn ? 'edit' : 'read' }
                    deletable   = { shown ? scheduler.permissionsOf( shown ).remove : false }
                    editable    = { shown ? scheduler.permissionsOf( shown ).edit : true }
                    event       = { shown }
                    onClose     = { closePanel }
                    onCommit    = { ( patch , { isNew } ) => ( isNew ? scheduler.addEvent( patch ) : scheduler.updateEvent( shown , patch ) ) }
                    onDelete    = { record => scheduler.removeEvent( record ) }
                    path        = { path }
                    range       = { drawn }
                    schema      = { schema }
                    { ...( panel === true ? {} : panel ) }
                />
            ) }

        </div>
    ) ;
} ;

Scheduler.displayName = 'Scheduler' ;

export default Scheduler ;
