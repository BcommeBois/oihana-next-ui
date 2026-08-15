'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import useI18n    from '../../contexts/locale/useI18n' ;
import useLang    from '../../contexts/lang/useLang' ;
import useNow     from '../../hooks/useNow' ;
import useTimeDrag , { CREATE , MOVE , RESIZE_END , RESIZE_START } from '../../hooks/useTimeDrag' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { atTimeOfDay }     from '../../helpers/schedule/parseInstant' ;
import { createTimeScale } from '../../helpers/schedule/timeScale' ;
import { expandToDays }    from '../../helpers/schedule/expandToDays' ;
import { layoutBars }      from '../../helpers/schedule/layoutBars' ;
import { layoutOverlaps }  from '../../helpers/schedule/layoutOverlaps' ;

import
{
    MONTH_RAIL_HEIGHT ,
    SCHEDULER_NOW ,
    SCHEDULER_NOW_DOT ,
    SCHEDULER_TIMEGRID ,
    SCHEDULER_TIMEGRID_ALLDAY ,
    SCHEDULER_TIMEGRID_BODY ,
    SCHEDULER_TIMEGRID_COLUMN ,
    SCHEDULER_TIMEGRID_COLUMNS ,
    SCHEDULER_TIMEGRID_COLUMN_CREATABLE ,
    SCHEDULER_TIMEGRID_COLUMN_WEEKEND ,
    SCHEDULER_TIMEGRID_DRAFT ,
    SCHEDULER_TIMEGRID_DAY ,
    SCHEDULER_TIMEGRID_DAY_NAME ,
    SCHEDULER_TIMEGRID_DAY_NUMBER ,
    SCHEDULER_TIMEGRID_DAY_TODAY ,
    SCHEDULER_TIMEGRID_EVENT ,
    SCHEDULER_TIMEGRID_EVENT_COMPACT ,
    SCHEDULER_TIMEGRID_EVENT_DRAGGING ,
    SCHEDULER_TIMEGRID_EVENT_GHOST ,
    SCHEDULER_TIMEGRID_EVENT_LINE ,
    SCHEDULER_TIMEGRID_EVENT_MOVABLE ,
    SCHEDULER_TIMEGRID_EVENT_RESIZABLE ,
    SCHEDULER_TIMEGRID_EVENT_STACKED ,
    SCHEDULER_TIMEGRID_GUTTER ,
    SCHEDULER_TIMEGRID_HANDLE ,
    SCHEDULER_TIMEGRID_HANDLE_END ,
    SCHEDULER_TIMEGRID_HANDLE_GRIP ,
    SCHEDULER_TIMEGRID_HANDLE_START ,
    SCHEDULER_TIMEGRID_HEAD ,
    SCHEDULER_TIMEGRID_HOUR ,
    SCHEDULER_TIMEGRID_LINE ,
    SCHEDULER_TIMEGRID_LINE_HALF ,
    TIMEGRID_BOTH_HANDLES_HEIGHT ,
    TIMEGRID_STACKED_HEIGHT ,
    getSchedulerEventClasses ,
} from '../../themes/components/scheduler' ;

import SchedulerEvent from './SchedulerEvent' ;

/** Minutes in a day, the ceiling of every bound here. */
const DAY_MINUTES = 24 * 60 ;

/**
 * The time grid : days across, hours down, events as rectangles.
 *
 * The view where an event stops being a row and becomes a **placed rectangle** —
 * `top` from its start, `height` from its length, and a width shared with
 * whatever overlaps it. It serves **Day and Week alike** : the window already
 * says whether there is one column or seven, and nothing else differs.
 *
 * ### Three bands, and only one of them scrolls
 *
 * The day names and the all-day band stay put while the hours scroll under them.
 * An all-day event has no place on an hour axis — it would have to span the whole
 * of it — so it goes in a band above, laid out by
 * {@link module:helpers/schedule/layoutBars}, the very code the month grid uses.
 *
 * ### It opens where the day starts, not at midnight
 *
 * A grid covering twenty-four hours opens on 00:00, which is of use to nobody.
 * `scrollTime` decides where it lands on mount. The **bounds stay the full day**
 * by default : narrowing them would silently hide a night incident or an on-call
 * shift, and a scroll position costs nothing to correct.
 *
 * ### It can be written on, once asked
 *
 * Three gestures, each **off unless asked for** — see {@link module:hooks/useTimeDrag}.
 * With `movable` a block is dragged to another hour or another day ; with
 * `resizable` its edges are pulled ; with `creatable` a range drawn on an empty
 * column becomes a new event, and a plain click on one becomes a range of
 * `createDuration`.
 *
 * A gesture is only ever offered on an event `isEventMovable` / `isEventResizable`
 * accepts : an occurrence of a recurring rule is not one, since writing to it
 * would move the whole series.
 *
 * **Resizing and drawing are for pointers that hover.** A finger cannot aim at an
 * eight-pixel handle, and drawing a range with it would fight the page scroll ;
 * on touch, both belong to the editor. The all-day band stays read-only whatever
 * the device — it moves by the day, which is a different projection.
 *
 * @module components/scheduler/SchedulerTimeGrid
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the grid.
 * @param {boolean} [props.creatable=false] - Let a range be drawn, or clicked, on an empty column.
 * @param {number} [props.createDuration=30] - Minutes a plain click on an empty column stands for.
 * @param {number} [props.dayEnd=1440] - Minutes from midnight where the axis ends.
 * @param {number} [props.dayStart=0] - Minutes from midnight where it begins.
 * @param {Array} props.events - The normalized records to place.
 * @param {number|string} [props.height='36rem'] - Height of the scrolling area. Twenty-four hours at 48 px is 1152 px, which would swallow any page.
 * @param {(event: Object) => boolean} [props.isEventMovable] - Whether an event answers to a drag. Everything is movable when `movable` is set and this is omitted.
 * @param {(event: Object) => boolean} [props.isEventResizable] - Whether an event's edges answer to a drag.
 * @param {number} [props.maxAllDayRails=2] - Rails the all-day band shows before it counts instead ; a week of leave should not push the hours off screen.
 * @param {boolean} [props.movable=false] - Let a block be dragged to another time.
 * @param {boolean} [props.nowIndicator=true] - Draw the line across today.
 * @param {(event: Object) => void} [props.onEventClick] - Called with a record, when an event is activated.
 * @param {(range: Object) => void} [props.onEventCreate] - Called with `{ start , end }` when a range is drawn or a slot clicked.
 * @param {(event: Object, to: Object) => void} [props.onEventMove] - Called once on release, with `{ start , end }`.
 * @param {(event: Object, to: Object) => void} [props.onEventResize] - Called once on release, with `{ start , end }`.
 * @param {boolean} [props.resizable=false] - Let a block's edges be pulled.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {number} [props.pixelsPerHour=48] - Zoom.
 * @param {(event: Object, context: Object) => React.ReactNode} [props.renderEvent] - Renders an event, in place of the default block.
 * @param {string} [props.scrollTime='08:00'] - Where the grid lands on mount.
 * @param {number} [props.slotDuration=30] - Minutes between two rules. The hour is drawn stronger than the half.
 * @param {number} [props.snapMinutes=15] - Step a dragged edge lands on. Independent of `slotDuration` : a grid ruled every half hour while a drag lands on the quarter is the usual arrangement.
 * @param {{start: number, end: number, days: number}} props.window - The span being shown.
 */
const SchedulerTimeGrid =
({
    className ,
    creatable = false ,
    createDuration = 30 ,
    dayEnd = DAY_MINUTES ,
    dayStart = 0 ,
    events ,
    height = '36rem' ,
    isEventMovable ,
    isEventResizable ,
    maxAllDayRails = 2 ,
    movable = false ,
    nowIndicator = true ,
    onEventClick ,
    onEventCreate ,
    onEventMove ,
    onEventResize ,
    resizable = false ,
    path = 'components.scheduler' ,
    pixelsPerHour = 48 ,
    renderEvent ,
    scrollTime = '08:00' ,
    slotDuration = 30 ,
    snapMinutes = 15 ,
    window ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const axisRef = useRef( null ) ;
    const bodyRef = useRef( null ) ;
    const now     = useNow({ enabled : nowIndicator }) ;

    const scale = useMemo
    (
        () => createTimeScale({ dayStart , dayEnd , pixelsPerHour , snapMinutes }) ,
        [ dayStart , dayEnd , pixelsPerHour , snapMinutes ] ,
    ) ;

    const days = useMemo( () =>
    {
        const list = [] ;
        let cursor = dayjs( window.start ).startOf( 'day' ) ;

        while ( cursor.valueOf() < window.end )
        {
            list.push( cursor.valueOf() ) ;
            cursor = cursor.add( 1 , 'day' ) ;
        }

        return list ;
    }
    , [ window ] ) ;

    // All-day events go to the band ; the rest are cut per day and share their
    // column with whatever they overlap.
    const { band , columns } = useMemo( () =>
    {
        const all   = events ?? [] ;
        const timed = all.filter( event => !event.allDay ) ;

        const segments = expandToDays( timed , window ) ;
        const byDay    = new Map( days.map( day => [ day , [] ] ) ) ;

        for ( const segment of segments )
        {
            byDay.get( segment.day )?.push( segment ) ;
        }

        return {
            band    : layoutBars( all.filter( event => event.allDay ) , window , { columns : days.length , maxRails : maxAllDayRails } )[ 0 ] ,
            columns : days.map( day => layoutOverlaps( byDay.get( day ) ?? [] ) ) ,
        } ;
    }
    , [ events , window , days , maxAllDayRails ] ) ;

    const drag = useTimeDrag
    ({
        axisRef ,
        bodyRef ,
        days ,
        onCreate : onEventCreate ,
        onMove   : onEventMove ,
        onResize : onEventResize ,
        scale ,
    }) ;

    // Twenty-four hour marks, plus the half-hour rules when they are asked for.
    const marks = useMemo( () =>
    {
        const list = [] ;
        const step = Math.max( 5 , slotDuration ) ;

        for ( let minute = dayStart ; minute <= dayEnd ; minute += step )
        {
            list.push({ minute , offset : ( minute - dayStart ) * pixelsPerHour / 60 , hour : minute % 60 === 0 }) ;
        }

        return list ;
    }
    , [ dayStart , dayEnd , slotDuration , pixelsPerHour ] ) ;

    // Land on the working hours rather than on midnight, once, on mount.
    useEffect( () =>
    {
        const node = bodyRef.current ;

        if ( !node )
        {
            return ;
        }

        const at = atTimeOfDay( window.start , scrollTime ) ;

        node.scrollTop = at === null ? 0 : Math.max( 0 , scale.offsetOf( at ) ) ;
    }
    , [ scrollTime , scale , window.start ] ) ;

    const today = dayjs().startOf( 'day' ).valueOf() ;

    /**
     * One placed block — a laid-out event, or the preview following the pointer.
     *
     * The two are drawn by the same code on purpose : a preview that is not
     * *exactly* the block being moved makes the drop land somewhere the reader did
     * not aim at, and that is the class of bug nobody reports and everybody feels.
     *
     * @param {Object} block - `{ dayIndex , dragging , event , ghost , height , left , segment , top , width }`.
     */
    const renderBlock = ( block ) =>
    {
        const { dayIndex , dragging = false , event , ghost = false , height , left , segment , top , width } = block ;

        const draggable = movable && !dragging && ( isEventMovable ? isEventMovable( event ) : true ) ;
        const stretchy  = resizable && !dragging && ( isEventResizable ? isEventResizable( event ) : true ) ;

        const geometry = { dayIndex , event , height , left , segment , top , width } ;

        // An edge is only offered where it is real : the middle day of a
        // three-day event has no start to pull, and the last has no end.
        const pullStart = stretchy && !segment.continuesBefore && height >= TIMEGRID_BOTH_HANDLES_HEIGHT ;
        const pullEnd   = stretchy && !segment.continuesAfter ;

        const position =
        {
            height ,
            left : `${ left * 100 }%` ,
            top ,
            width : `${ width * 100 }%` ,
        } ;

        const onPointerDown = draggable
            ? ( look ) => drag.start( look , { ...geometry , mode : MOVE } )
            : undefined ;

        /** A strip along one edge. It takes the press before the block does. */
        const handle = ( mode ) => (
            <span
                aria-hidden   = "true"
                className     = { `${ SCHEDULER_TIMEGRID_HANDLE } ${ mode === RESIZE_START ? SCHEDULER_TIMEGRID_HANDLE_START : SCHEDULER_TIMEGRID_HANDLE_END }` }
                onPointerDown = { ( look ) =>
                {
                    look.stopPropagation() ;
                    drag.start( look , { ...geometry , mode }) ;
                } }
            >
                <span className={ SCHEDULER_TIMEGRID_HANDLE_GRIP } />
            </span>
        ) ;

        const key = dragging ? `${ event.id }-dragging` : `${ event.id }-${ segment.start }` ;

        if ( renderEvent )
        {
            const states = `${ draggable ? SCHEDULER_TIMEGRID_EVENT_MOVABLE : '' } ${ pullStart || pullEnd ? SCHEDULER_TIMEGRID_EVENT_RESIZABLE : '' } ${ ghost ? SCHEDULER_TIMEGRID_EVENT_GHOST : '' } ${ dragging ? SCHEDULER_TIMEGRID_EVENT_DRAGGING : '' }` ;

            return (
                // A custom block is the application's markup ; the gestures are the
                // grid's, so they stay on the wrapper it already had — handles
                // included, since asking for `resizable` should not mean writing
                // one's own edges.
                <div
                    key           = { key }
                    className     = { `absolute ${ states }`.replace( /\s+/g , ' ' ).trim() }
                    onPointerDown = { onPointerDown }
                    style         = { position }
                >
                    { pullStart && handle( RESIZE_START ) }
                    { pullEnd && handle( RESIZE_END ) }

                    { renderEvent( event , { segment , labels } ) }
                </div>
            ) ;
        }

        // Half an hour at the default zoom is twenty-four pixels — less than two
        // lines of text need. What does not fit is not printed at all, rather than
        // printed and cut through the middle.
        const stacked = height >= TIMEGRID_STACKED_HEIGHT ;

        const { className : eventClassName , style } = getSchedulerEventClasses
        ({
            className : `${ SCHEDULER_TIMEGRID_EVENT } ${ stacked ? SCHEDULER_TIMEGRID_EVENT_STACKED : SCHEDULER_TIMEGRID_EVENT_COMPACT } ${ pullStart || pullEnd ? SCHEDULER_TIMEGRID_EVENT_RESIZABLE : '' }` ,
            color     : event.color ,
            dragging ,
            ghost ,
            movable   : draggable ,
            past      : event.end <= Date.now() ,
            status    : event.status ,
        }) ;

        return (
            <button
                key           = { key }
                type          = "button"
                className     = { eventClassName }
                onClick       = { onEventClick ? () => onEventClick( event ) : undefined }
                onPointerDown = { onPointerDown }
                style         = {{ ...style , ...position }}
                title         = { `${ dayjs( segment.start ).format( 'HH:mm' ) } – ${ dayjs( segment.end ).format( 'HH:mm' ) } · ${ event.title }` }
            >
                { pullStart && handle( RESIZE_START ) }
                { pullEnd && handle( RESIZE_END ) }

                { stacked
                    ? (
                        <>
                            <span className="block truncate font-semibold">{ event.title }</span>
                            <span className="block truncate font-mono text-[0.9em] opacity-80">
                                { dayjs( segment.start ).format( 'HH:mm' ) } – { dayjs( segment.end ).format( 'HH:mm' ) }
                            </span>
                        </>
                    )
                    : (
                        <span className={ SCHEDULER_TIMEGRID_EVENT_LINE }>
                            <span className="truncate font-semibold">{ event.title }</span>
                            {/* The axis already says where it starts ; the hour is
                                repeated because a narrow column crops the position
                                far more readily than the eye admits. */}
                            <span className="shrink-0 font-mono text-[0.9em] opacity-80">
                                { dayjs( segment.start ).format( 'HH:mm' ) }
                            </span>
                        </span>
                    ) }
            </button>
        ) ;
    } ;

    // The indicator only means something on a day that is on screen, and only
    // while now falls inside the axis the grid actually draws.
    const nowColumn = now === null ? -1 : days.indexOf( dayjs( now ).startOf( 'day' ).valueOf() ) ;
    const nowOffset = now === null ? 0 : scale.offsetOf( now ) ;
    const showNow   = nowIndicator && nowColumn !== -1 && nowOffset >= 0 && nowOffset <= scale.size ;

    return (
        <div className={ `${ SCHEDULER_TIMEGRID } ${ className ?? '' }`.trim() } { ...rest }>

            <div className={ SCHEDULER_TIMEGRID_HEAD }>
                <div className="w-14 shrink-0 border-e border-base-300" />
                { days.map( day => (
                    <div key={ day } className={ SCHEDULER_TIMEGRID_DAY }>
                        <span className={ SCHEDULER_TIMEGRID_DAY_NAME }>{ dayjs( day ).locale( lang ).format( 'ddd' ) }</span>
                        <span className={ `${ SCHEDULER_TIMEGRID_DAY_NUMBER } ${ day === today ? SCHEDULER_TIMEGRID_DAY_TODAY : '' }`.trim() }>
                            { dayjs( day ).date() }
                        </span>
                    </div>
                ) ) }
            </div>

            { band && (
                <div className={ SCHEDULER_TIMEGRID_ALLDAY }>
                    <div className="flex w-14 shrink-0 items-start justify-end border-e border-base-300 pe-1 pt-1">
                        <span className="font-mono text-xs text-base-content/70">{ labels?.allDay }</span>
                    </div>

                    <div
                        className = "relative grid flex-1 gap-y-0.5 p-1"
                        style     = {{
                            gridTemplateColumns : `repeat( ${ days.length } , minmax(0, 1fr) )` ,
                            minHeight           : MONTH_RAIL_HEIGHT ,
                        }}
                    >
                        { band.bars.map( bar => (
                            <SchedulerEvent
                                key             = { `${ bar.event.id }-${ bar.column }` }
                                continuesAfter  = { bar.continuesAfter }
                                continuesBefore = { bar.continuesBefore }
                                event           = { bar.event }
                                onSelect        = { onEventClick }
                                style           = {{ gridColumn : `${ bar.column + 1 } / span ${ bar.span }` , gridRow : bar.rail + 1 }}
                            />
                        ) ) }
                    </div>
                </div>
            ) }

            <div ref={ bodyRef } className={ SCHEDULER_TIMEGRID_BODY } style={{ height }}>

                <div className={ SCHEDULER_TIMEGRID_GUTTER } style={{ height : scale.size }}>
                    { marks.filter( mark => mark.hour ).map( mark => (
                        <span key={ mark.minute } className={ SCHEDULER_TIMEGRID_HOUR } style={{ top : mark.offset }}>
                            { dayjs().startOf( 'day' ).add( mark.minute , 'minute' ).format( 'HH:mm' ) }
                        </span>
                    ) ) }
                </div>

                <div ref={ axisRef } className={ SCHEDULER_TIMEGRID_COLUMNS } style={{ height : scale.size }}>

                    {/* The rules span every column, so they are drawn once here rather
                        than repeated per day. */}
                    { marks.map( mark => (
                        <div
                            key       = { mark.minute }
                            className = { mark.hour ? SCHEDULER_TIMEGRID_LINE : SCHEDULER_TIMEGRID_LINE_HALF }
                            style     = {{ top : mark.offset }}
                        />
                    ) ) }

                    { days.map( ( day , index ) =>
                    {
                        const weekend = [ 0 , 6 ].includes( dayjs( day ).day() ) ;

                        // A press on a block bubbles up to its column ; only one
                        // that landed on the column *itself* is an empty slot.
                        const onEmpty = ( handler ) => ( look ) =>
                        {
                            if ( look.target === look.currentTarget )
                            {
                                handler( look ) ;
                            }
                        } ;

                        return (
                            // The keyboard answer to « create » is not a focusable
                            // column — seven tab stops a week that would have to
                            // invent an hour out of nowhere. It is a command, and it
                            // arrives with the editor. Claiming it here would be a
                            // lie the TR3 keyboard attempt already taught us to avoid.
                            // biome-ignore lint/a11y/noStaticElementInteractions: pointer affordance only ; the keyboard path is a command, at lot 9
                            // biome-ignore lint/a11y/useKeyWithClickEvents: same — a column is not the right control to focus
                            <div
                                key           = { day }
                                ref           = { drag.columnRef( index ) }
                                className     = { `${ SCHEDULER_TIMEGRID_COLUMN } ${ weekend ? SCHEDULER_TIMEGRID_COLUMN_WEEKEND : '' } ${ creatable ? SCHEDULER_TIMEGRID_COLUMN_CREATABLE : '' }`.trim() }
                                onPointerDown = { creatable ? onEmpty( look => drag.start( look , { dayIndex : index , mode : CREATE } ) ) : undefined }
                                // A click is a range of its own : the threshold has
                                // already told it apart from a drawn one, and asking
                                // for a rectangle to book eleven o'clock would be a
                                // needlessly precise gesture.
                                onClick       = { creatable ? onEmpty( ( look ) =>
                                {
                                    const start = drag.slotAt( look.clientY , index ) ;

                                    if ( start !== null )
                                    {
                                        onEventCreate?.({ end : start + createDuration * 60 * 1000 , start }) ;
                                    }
                                } ) : undefined }
                            >
                                { columns[ index ].map( item =>
                                {
                                    const { event } = item ;

                                    const top    = scale.offsetOf( item.start ) ;
                                    const bottom = scale.offsetOf( item.end - 1 ) ;

                                    if ( bottom < 0 || top > scale.size )
                                    {
                                        return null ;
                                    }

                                    return renderBlock
                                    ({
                                        dayIndex : index ,
                                        event ,
                                        // What is left behind while its copy follows the pointer.
                                        ghost    : drag.preview?.id === event.id ,
                                        // A one-minute event still has to be visible and clickable.
                                        height   : Math.max( 14 , bottom - top ) ,
                                        left     : item.left ,
                                        segment  : item ,
                                        top ,
                                        width    : item.width ,
                                    }) ;
                                } ) }

                                { drag.preview?.dayIndex === index && drag.preview.mode !== CREATE && renderBlock
                                ({
                                    dayIndex : index ,
                                    dragging : true ,
                                    event    : drag.preview.event ,
                                    height   : drag.preview.height ,
                                    left     : drag.preview.left ,
                                    segment  : { end : drag.preview.segmentEnd , start : drag.preview.segmentStart } ,
                                    top      : drag.preview.top ,
                                    width    : drag.preview.width ,
                                }) }

                                { drag.preview?.dayIndex === index && drag.preview.mode === CREATE && (
                                    <div
                                        className = { SCHEDULER_TIMEGRID_DRAFT }
                                        style     = {{ height : drag.preview.height , insetInline : 0 , top : drag.preview.top }}
                                    >
                                        <span className="truncate font-mono tabular-nums">
                                            { dayjs( drag.preview.segmentStart ).format( 'HH:mm' ) } – { dayjs( drag.preview.segmentEnd ).format( 'HH:mm' ) }
                                        </span>
                                    </div>
                                ) }

                                { showNow && index === nowColumn && (
                                    <div className={ SCHEDULER_NOW } style={{ top : nowOffset }}>
                                        <span className={ SCHEDULER_NOW_DOT } />
                                    </div>
                                ) }
                            </div>
                        ) ;
                    } ) }

                </div>
            </div>

        </div>
    ) ;
} ;

SchedulerTimeGrid.displayName = 'SchedulerTimeGrid' ;

export default SchedulerTimeGrid ;
