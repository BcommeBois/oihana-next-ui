'use client' ;

import useScheduler from '../../hooks/useScheduler' ;

import { AGENDA , DAY , MONTH , TIMELINE , WEEK } from '../../helpers/schedule/getViewWindow' ;

import { getSchedulerClasses } from '../../themes/components/scheduler' ;

import SchedulerAgenda  from './SchedulerAgenda' ;
import SchedulerToolbar from './SchedulerToolbar' ;

export { AGENDA , DAY , MONTH , TIMELINE , WEEK } ;

/**
 * The views that are actually built, in the order they read.
 *
 * `views` is filtered against this, so asking for one that does not exist yet
 * cannot put a tab in the switcher that leads nowhere. The list grows as the
 * views land, and nothing an application wrote has to change when it does.
 */
export const builtViews = [ AGENDA ] ;

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
 * @param {Function} [props.getColor] - Reads an event's display color.
 * @param {Function} [props.getEventId] - Reads an event's identity. Required when neither `identifier`, `id` nor `url` is the real key.
 * @param {Function} [props.getResourceId] - Reads the timeline row an event belongs to.
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
    days = 7 ,
    emptyState ,
    events ,
    getColor ,
    getEventId ,
    getResourceId ,
    onChange ,
    onDateChange ,
    onViewChange ,
    path = 'components.scheduler' ,
    renderEvent ,
    schema = false ,
    showEmptyDays = false ,
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
        getColor ,
        getEventId ,
        getResourceId ,
        onChange ,
        onDateChange ,
        onViewChange ,
        schema ,
        view ,
        weekStartsOn ,
    }) ;

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

            {/* One view is built so far. The others land in their own lots, and
                the shell already knows how to size their windows. */}
            <SchedulerAgenda
                emptyState    = { emptyState }
                events        = { scheduler.events }
                path          = { path }
                renderEvent   = { renderEvent }
                showEmptyDays = { showEmptyDays }
                window        = { scheduler.window }
            />

        </div>
    ) ;
} ;

Scheduler.displayName = 'Scheduler' ;

export default Scheduler ;
