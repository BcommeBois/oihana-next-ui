'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;
import useNow  from '../../hooks/useNow' ;
import useTimeDrag , { CREATE , HORIZONTAL , MOVE , RESIZE_END , RESIZE_START } from '../../hooks/useTimeDrag' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { atTimeOfDay }     from '../../helpers/schedule/parseInstant' ;
import { closedRangesOf }  from '../../helpers/schedule/openingHours' ;
import { createSpanScale } from '../../helpers/schedule/timeScale' ;
import { describeEvent , describeSpan } from '../../helpers/schedule/describeEvent' ;
import { groupByResource } from '../../helpers/schedule/resources' ;
import { layoutOverlaps }  from '../../helpers/schedule/layoutOverlaps' ;

import
{
    SCHEDULER_TIMELINE ,
    SCHEDULER_TIMELINE_ASIDE ,
    SCHEDULER_TIMELINE_BODY ,
    SCHEDULER_TIMELINE_CLOSED ,
    SCHEDULER_TIMELINE_DRAFT ,
    SCHEDULER_TIMELINE_EVENT ,
    SCHEDULER_TIMELINE_EVENT_NARROW ,
    SCHEDULER_TIMELINE_HEAD ,
    SCHEDULER_TIMELINE_NOW ,
    SCHEDULER_TIMELINE_RESOURCE ,
    SCHEDULER_TIMELINE_ROW ,
    SCHEDULER_TIMELINE_RULE ,
    SCHEDULER_TIMELINE_TICK ,
    SCHEDULER_TIMELINE_TRACK ,
    TIMELINE_LANE_HEIGHT ,
    TIMELINE_NARROW ,
    getSchedulerEventClasses ,
} from '../../themes/components/scheduler' ;

import EmptyState from '../EmptyState' ;
import Tooltip    from '../Tooltip' ;

/** Minutes in a day, the ceiling of every bound here. */
const DAY_MINUTES = 24 * 60 ;

const MINUTE = 60 * 1000 ;

/**
 * The resource timeline : time across, resources down.
 *
 * The week grid with its axis pivoted — which is the whole reason it exists as a
 * view rather than as a component. `createSpanScale` replaces `createTimeScale`
 * because a timeline has **one continuous axis** rather than a day repeated per
 * column, and `layoutOverlaps` comes back unchanged : what it returns as columns
 * sharing a width becomes **lanes sharing a row's height**. Two bookings of the
 * same room at the same hour cannot share the width — the width is the time.
 *
 * ### Two scales, and the window decides
 *
 * A day of hours, or a week of days. Nothing in this component chooses : it
 * reads how many days the window covers, exactly as the time grid reads whether
 * it holds one column or seven. An event crossing midnight is **one bar** here,
 * never cut per day — that is what a timeline is for.
 *
 * ### The rows come from a list, not from the events
 *
 * See {@link module:helpers/schedule/resources} : a room free all day is an
 * answer, and deriving the rows from the bookings is what makes that answer
 * disappear.
 *
 * @module components/scheduler/SchedulerTimeline
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Names the region — the period being looked at.
 * @param {string} [props.className] - Extra classes for the root.
 * @param {(text: string) => void} [props.onAnnounce] - Called with what a screen reader should hear — a keyboard step, an abandoned adjustment.
 * @param {boolean} [props.creatable=false] - Let a range be drawn, or clicked, on an empty row.
 * @param {number} [props.createDuration=30] - Minutes a plain click stands for.
 * @param {number} [props.dayEnd=1440] - Minutes from midnight where a one-day axis ends.
 * @param {number} [props.dayStart=0] - Minutes from midnight where it begins.
 * @param {Array} props.events - The normalized records to place.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default « no resources » state.
 * @param {(event: Object) => boolean} [props.isEventMovable] - Whether an event answers to a drag.
 * @param {(event: Object) => boolean} [props.isEventResizable] - Whether its edges do.
 * @param {boolean} [props.movable=false] - Let a block be dragged to another time, or another resource.
 * @param {boolean} [props.nowIndicator=true] - Draw the line down today.
 * @param {(event: Object) => void} [props.onEventClick] - Called with a record, when a block is activated.
 * @param {(range: Object) => void} [props.onEventCreate] - Called with `{ start , end , resourceId }`.
 * @param {(event: Object, to: Object) => void} [props.onEventMove] - Called once on release, with `{ start , end , resourceId }`.
 * @param {(event: Object, to: Object) => void} [props.onEventResize] - Called once on release, with `{ start , end }`.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {number} [props.pixelsPerDay=160] - Zoom of a multi-day axis.
 * @param {number} [props.pixelsPerHour=60] - Zoom of a one-day axis.
 * @param {(event: Object, context: Object) => React.ReactNode} [props.renderEvent] - Renders a block, in place of the default.
 * @param {(resource: Object) => React.ReactNode} [props.renderResource] - Renders a row's head, in place of its name.
 * @param {boolean} [props.resizable=false] - Let a block's edges be pulled.
 * @param {Array} props.resources - The rows, resolved and in order.
 * @param {number} [props.rowHeight] - Height of a lane. A row of N overlapping bookings is N lanes tall.
 * @param {string} [props.scrollTime='08:00'] - Where a one-day axis lands on mount. The bounds stay whole ; only the scroll moves.
 * @param {boolean} [props.showNarrowLabels=true] - Write the title beside a bar too small to hold it, the way a Gantt chart labels a task. Turn it off for a dense plan, where the labels of neighbouring bars would run into one another and say less than the bars alone.
 * @param {number} [props.slotDuration=60] - Minutes between two rules on a one-day axis.
 * @param {number} [props.snapMinutes=15] - Step a dragged edge lands on.
 * @param {string} [props.tooltipColor='neutral'] - Fill of that bubble. **One colour for the whole view, never one per event** : an event's colour is a free CSS value as often as a token, and nothing guarantees a text is legible on it — only a token and its `-content` pair are a contrast the theme promises.
 * @param {boolean|Function} [props.tooltip=true] - What a block says on hover. `false` removes it, a function `( event ) => string` writes it. Themed and floating — the bubble is drawn in a portal, so neither the block's own clipping nor the scrolling area can cut it.
 * @param {{start: number, end: number, days: number}} props.window - The span being shown.
 */
const SchedulerTimeline =
({
    ariaLabel ,
    className ,
    creatable = false ,
    createDuration = 30 ,
    dayEnd = DAY_MINUTES ,
    dayStart = 0 ,
    events ,
    emptyState ,
    isEventMovable ,
    isEventResizable ,
    movable = false ,
    nowIndicator = true ,
    onAnnounce ,
    onEventClick ,
    onEventCreate ,
    onEventMove ,
    onEventResize ,
    path = 'components.scheduler' ,
    pixelsPerDay = 160 ,
    pixelsPerHour = 60 ,
    renderEvent ,
    renderResource ,
    resizable = false ,
    resources ,
    rowHeight = TIMELINE_LANE_HEIGHT ,
    scrollTime = '08:00' ,
    showNarrowLabels = true ,
    slotDuration = 60 ,
    tooltip = true ,
    tooltipColor = 'neutral' ,
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

    const single = days.length === 1 ;

    // One day reads its hours between the bounds ; several read their days end to
    // end. Both are one continuous axis — which is what makes a booking crossing
    // midnight a single bar rather than two.
    const scale = useMemo( () =>
    {
        const start = single ? days[ 0 ] + dayStart * MINUTE : window.start ;
        const end   = single ? days[ 0 ] + dayEnd * MINUTE : window.end ;
        const size  = single ? ( dayEnd - dayStart ) / 60 * pixelsPerHour : days.length * pixelsPerDay ;

        return createSpanScale({ end , size , snapMinutes , start }) ;
    }
    , [ days , dayEnd , dayStart , pixelsPerDay , pixelsPerHour , single , snapMinutes , window ] ) ;

    /** The marks along the head : hours of a day, or the days themselves. */
    const ticks = useMemo( () =>
    {
        // A day names a *span* and belongs in the middle of it ; an hour names an
        // instant and belongs on it. Centring both the same way is what put
        // « mar. 11 » on the boundary between Monday and Tuesday.
        if ( !single )
        {
            return days.map( day => (
            {
                centred : true ,
                key     : day ,
                label   : dayjs( day ).locale( lang ).format( 'ddd D' ) ,
                offset  : scale.offsetOf( day ) + scale.lengthOf( day , dayjs( day ).add( 1 , 'day' ).valueOf() ) / 2 ,
            }) ) ;
        }

        const list = [] ;
        const step = Math.max( 15 , slotDuration ) ;

        for ( let minute = dayStart ; minute < dayEnd ; minute += step )
        {
            const at = days[ 0 ] + minute * MINUTE ;

            list.push
            ({
                // The first mark would lose its left half off the edge of the
                // axis, so it hangs from the start instead of straddling it.
                centred : minute > dayStart ,
                key     : minute ,
                label   : dayjs( at ).format( 'HH:mm' ) ,
                offset  : scale.offsetOf( at ) ,
            }) ;
        }

        return list ;
    }
    , [ dayEnd , dayStart , days , lang , scale , single , slotDuration ] ) ;

    const rows = resources ?? [] ;

    const byResource = useMemo( () => groupByResource( events ?? [] , rows ) , [ events , rows ] ) ;

    /**
     * Clips an event to the drawn axis and keeps the record beside it.
     *
     * `layoutOverlaps` spreads what it is given, so handing it raw records would
     * hand them back *copied* — and `onEventClick` would report a copy carrying
     * layout properties rather than the record the application knows.
     */
    const segmentsOf = ( list ) => ( list ?? [] ).map( event => (
    {
        end   : Math.min( event.end , scale.end ) ,
        event ,
        start : Math.max( event.start , scale.start ) ,
    } ) ).filter( segment => segment.end > segment.start ) ;

    const drag = useTimeDrag
    ({
        axisRef ,
        bodyRef ,
        createDuration ,
        lanes       : rows.length ,
        // What an arrow key changed. **The row is named every time**, not only when
        // it changes : a lane on a timeline is a resource, and moving between two
        // of them leaves the hours untouched — an announcement of the span alone
        // would be the same sentence twice, which a screen reader reads once.
        onAdjust    : ( next ) => onAnnounce?.( next === null
            ? labels?.announce?.reverted
            : [ describeSpan( { end : next.segmentEnd , start : next.segmentStart } , { labels , lang } ) , rows[ next.lane ]?.name ]
                .filter( Boolean )
                .join( ' · ' ) ) ,
        onCreate    : ({ end , lane , start }) => onEventCreate?.({ end , resourceId : rows[ lane ]?.id ?? null , start }) ,
        onMove      : ( event , to ) => onEventMove?.( event , { end : to.end , resourceId : rows[ to.lane ]?.id ?? event.resourceId , start : to.start }) ,
        onResize    : ( event , to ) => onEventResize?.( event , { end : to.end , start : to.start }) ,
        orientation : HORIZONTAL ,
        scale ,
    }) ;

    // The same lesson the time grid learned : an axis covering the whole day
    // opens on 00:00, which is of use to nobody. The **bounds stay full** —
    // narrowing them would hide a night shift — and only the scroll position
    // moves, which costs nothing to correct and everything to miss.
    useEffect( () =>
    {
        const node = bodyRef.current ;

        if ( !node || !single )
        {
            return ;
        }

        const at = atTimeOfDay( days[ 0 ] , scrollTime ) ;

        node.scrollLeft = at === null ? 0 : Math.max( 0 , scale.offsetOf( at ) ) ;
    }
    , [ days , scale , scrollTime , single ] ) ;

    if ( rows.length === 0 )
    {
        return emptyState ?? <EmptyState description={ labels?.noResources } /> ;
    }

    /**
     * What a block says when the pointer rests on it.
     *
     * Themed and floating rather than native : `<Tooltip float>` draws the bubble
     * in a portal, so neither the block's own `overflow-hidden` nor the scrolling
     * area can cut it — the very reason this was the browser's tooltip until the
     * floating path existed.
     */
    const hint = ( event ) =>
    {
        if ( tooltip === false )
        {
            return undefined ;
        }

        if ( typeof tooltip === 'function' )
        {
            return tooltip( event ) ;
        }

        return `${ dayjs( event.start ).format( 'HH:mm' ) } – ${ dayjs( event.end ).format( 'HH:mm' ) } · ${ event.title }` ;
    } ;

    /**
     * One placed block — a laid-out event, or the preview following the pointer.
     *
     * `lead` and `span` are fractions of the row's height here, where the grid
     * reads them as fractions of a column's width. Same numbers, pivoted.
     */
    const renderBlock = ( block ) =>
    {
        const { dragging = false , event , ghost = false , lane , lead , offset , segment , size , span } = block ;

        const draggable = movable && !dragging && ( isEventMovable ? isEventMovable( event ) : true ) ;
        const stretchy  = resizable && !dragging && ( isEventResizable ? isEventResizable( event ) : true ) ;

        const geometry = { event , lane , lead , offset , segment , size , span } ;

        const position =
        {
            height : `${ span * 100 }%` ,
            insetInlineStart : offset ,
            top : `${ lead * 100 }%` ,
            width : Math.max( 8 , size ) ,
        } ;

        const { className : eventClassName , style } = getSchedulerEventClasses
        ({
            // Below a couple of dozen pixels there is no room for a padding, a
            // radius and a rule : kept, they make a legitimate sliver look like a
            // rendering fault.
            className : `${ SCHEDULER_TIMELINE_EVENT } ${ size < TIMELINE_NARROW ? SCHEDULER_TIMELINE_EVENT_NARROW : '' } ${ stretchy ? 'group' : '' }` ,
            color     : event.color ,
            dragging ,
            ghost ,
            movable   : draggable ,
            past      : event.end <= Date.now() ,
            status    : event.status ,
        }) ;

        if ( renderEvent )
        {
            return [
                <div key={ `${ event.id }-${ dragging ? 'dragging' : segment.start }-custom` } className="absolute" style={ position }>
                    { renderEvent( event , { labels , segment }) }
                </div> ,
            ] ;
        }

        const key = `${ event.id }-${ dragging ? 'dragging' : segment.start }` ;

        // Too small to hold a word, the title goes **beside** the bar rather than
        // inside it — the way a Gantt chart labels a task. It is a sibling and
        // not a child, since the block clips its own overflow, and it takes no
        // pointer events so it never stands between the reader and the bar.
        const aside = showNarrowLabels && size < TIMELINE_NARROW && !dragging
            ? (
                <span
                    key       = { `${ key }-label` }
                    className = { SCHEDULER_TIMELINE_ASIDE }
                    style     = {{ height : `${ span * 100 }%` , insetInlineStart : offset + size + 4 , top : `${ lead * 100 }%` }}
                >
                    { event.title }
                </span>
            )
            : null ;

        return [
            // The tooltip **is** the block rather than a wrapper around it : a
            // wrapper would be a static element of no size — its absolutely
            // placed child takes none — and an element of no size is never
            // hovered.
            <Tooltip
                key           = { key }
                float
                as            = "button"
                color         = { tooltipColor }
                tip           = { hint( event ) }
                type          = "button"
                // Under twenty-six pixels a block prints nothing at all : without
                // this it is a button with no name whatsoever.
                aria-label    = { describeEvent( event , { labels , lang } ) }
                aria-hidden   = { dragging ? 'true' : undefined }
                className     = { eventClassName }
                onClick       = { onEventClick ? () => onEventClick( event ) : undefined }
                onKeyDown     = { ( draggable || stretchy ) && !dragging
                    ? ( look ) =>
                    {
                        if ( drag.adjust( look , { ...geometry , movable : draggable , resizable : stretchy } ) )
                        {
                            look.preventDefault() ;
                            look.stopPropagation() ;
                        }
                    }
                    : undefined }
                onPointerDown = { draggable ? ( look ) => drag.start( look , { ...geometry , mode : MOVE }) : undefined }
                style         = {{ ...style , ...position }}
                tabIndex      = { dragging ? -1 : undefined }
            >
                { stretchy && (
                    <>
                        <span
                            aria-hidden   = "true"
                            className     = { `${ SCHEDULER_TIMELINE_RULE } start-0 cursor-ew-resize` }
                            onPointerDown = { look => { look.stopPropagation() ; drag.start( look , { ...geometry , mode : RESIZE_START }) ; } }
                        />
                        <span
                            aria-hidden   = "true"
                            className     = { `${ SCHEDULER_TIMELINE_RULE } end-0 cursor-ew-resize` }
                            onPointerDown = { look => { look.stopPropagation() ; drag.start( look , { ...geometry , mode : RESIZE_END }) ; } }
                        />
                    </>
                ) }

                { size >= TIMELINE_NARROW && <span className="truncate">{ event.title }</span> }
            </Tooltip> ,
            aside ,
        ] ;
    } ;

    const nowOffset = now === null ? 0 : scale.offsetOf( now ) ;
    const showNow   = nowIndicator && now !== null && nowOffset >= 0 && nowOffset <= scale.size ;

    return (
        // A named region, and no `role="grid"` : see the same refusal in the time
        // grid. Rows are groups ; what is focusable inside them says what it is.
        <div
            className = { `${ SCHEDULER_TIMELINE } ${ className ?? '' }`.trim() }
            // Name and role together, or neither : see the time grid.
            { ...( ariaLabel ? { 'aria-label' : ariaLabel , role : 'region' } : {} ) }
            { ...rest }
        >

            <div ref={ bodyRef } className={ SCHEDULER_TIMELINE_BODY }>

                {/* The content is as wide as the resource column plus the axis ;
                    `min-w-max` lets it be, and the column stays put by being
                    sticky rather than by being outside the scroll — two scrollers
                    kept in step is a synchronisation nobody wins. */}
                <div className="min-w-max">

                    <div className={ SCHEDULER_TIMELINE_HEAD }>
                        <div className={ SCHEDULER_TIMELINE_RESOURCE } />
                        {/* The ruler *is* the axis : its inline start is the zero
                            every row measures from, and every track below shares
                            that edge by construction. */}
                        {/* A row of hours or of dates, and every block already says
                            its own : read out, the ruler is a wall of numbers. */}
                        <div ref={ axisRef } aria-hidden="true" className="relative h-7" style={{ width : scale.size }}>
                            { ticks.map( tick => (
                                <span
                                    key       = { tick.key }
                                    className = { `${ SCHEDULER_TIMELINE_TICK } ${ tick.centred ? '-translate-x-1/2' : '' }` }
                                    style     = {{ insetInlineStart : tick.offset }}
                                >
                                    { tick.label }
                                </span>
                            ) ) }
                        </div>
                    </div>

                    <div className="relative">

                        { rows.map( ( resource , index ) =>
                        {
                            const placed = layoutOverlaps( segmentsOf( byResource.get( resource.id ) ) ) ;
                            const lanes  = placed.reduce( ( most , item ) => Math.max( most , item.columns ) , 1 ) ;

                            // A press on a block bubbles up ; only one that landed
                            // on the track itself is an empty slot.
                            const onEmpty = ( handler ) => ( look ) =>
                            {
                                if ( look.target === look.currentTarget )
                                {
                                    handler( look ) ;
                                }
                            } ;

                            return (
                                // biome-ignore lint/a11y/useSemanticElements: a `<fieldset>` is a form control ; this is a named group of blocks
                                <div
                                    key        = { resource.id }
                                    aria-label = { resource.name }
                                    className  = { SCHEDULER_TIMELINE_ROW }
                                    role       = "group"
                                    style      = {{ height : lanes * rowHeight }}
                                >

                                    <div className={ SCHEDULER_TIMELINE_RESOURCE }>
                                        { renderResource ? renderResource( resource ) : <span className="truncate text-sm font-medium">{ resource.name }</span> }
                                    </div>

                                    {/* The keyboard answer to « create » is a command in the
                                        toolbar, not a focusable row — see the same refusal in
                                        the time grid. */}
                                    {/* biome-ignore lint/a11y/noStaticElementInteractions: pointer affordance only ; the keyboard path is the toolbar's create command */}
                                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: same — a row is not the right control to focus */}
                                    <div
                                        ref           = { drag.laneRef( index ) }
                                        className     = { SCHEDULER_TIMELINE_TRACK }
                                        style         = {{ width : scale.size }}
                                        onPointerDown = { creatable ? onEmpty( look => drag.start( look , { lane : index , mode : CREATE } ) ) : undefined }
                                        onClick       = { creatable ? onEmpty( ( look ) =>
                                        {
                                            const start = drag.slotAt( look.clientX , index ) ;

                                            if ( start !== null )
                                            {
                                                onEventCreate?.({ end : start + createDuration * MINUTE , resourceId : resource.id , start }) ;
                                            }
                                        } ) : undefined }
                                    >
                                        { days.map( day => closedRangesOf( resource.source?.openingHoursSpecification ?? resource.source?.hoursAvailable , day ).map( range => (
                                            <span
                                                key         = { `${ day }-${ range.start }` }
                                                aria-hidden = "true"
                                                className   = { SCHEDULER_TIMELINE_CLOSED }
                                                style       = {{ insetInlineStart : scale.offsetOf( range.start ) , width : scale.lengthOf( range.start , range.end ) }}
                                            />
                                        ) ) ) }

                                        { placed.map( item => renderBlock
                                        ({
                                            event   : item.event ,
                                            ghost   : drag.preview?.id === item.event.id ,
                                            lane    : index ,
                                            lead    : item.left ,
                                            offset  : scale.offsetOf( item.start ) ,
                                            segment : item ,
                                            size    : scale.lengthOf( item.start , item.end ) ,
                                            span    : item.width ,
                                        }) ) }

                                        { drag.preview?.lane === index && drag.preview.mode !== CREATE && renderBlock
                                        ({
                                            dragging : true ,
                                            event    : drag.preview.event ,
                                            lane     : index ,
                                            lead     : drag.preview.lead ,
                                            offset   : drag.preview.offset ,
                                            segment  : { end : drag.preview.segmentEnd , start : drag.preview.segmentStart } ,
                                            size     : drag.preview.size ,
                                            span     : drag.preview.span ,
                                        }) }

                                        { drag.preview?.lane === index && drag.preview.mode === CREATE && (
                                            <div
                                                aria-hidden = "true"
                                                className = { SCHEDULER_TIMELINE_DRAFT }
                                                style     = {{ insetInlineStart : drag.preview.offset , width : Math.max( 8 , drag.preview.size ) }}
                                            >
                                                <span className="truncate px-1 font-mono text-[0.7rem] tabular-nums">
                                                    { dayjs( drag.preview.segmentStart ).format( 'HH:mm' ) } – { dayjs( drag.preview.segmentEnd ).format( 'HH:mm' ) }
                                                </span>
                                            </div>
                                        ) }
                                    </div>
                                </div>
                            ) ;
                        } ) }

                        { showNow && (
                            <div aria-hidden="true" className={ SCHEDULER_TIMELINE_NOW } style={{ insetInlineStart : nowOffset }} />
                        ) }

                    </div>
                </div>
            </div>
        </div>
    ) ;
} ;

SchedulerTimeline.displayName = 'SchedulerTimeline' ;

export default SchedulerTimeline ;
