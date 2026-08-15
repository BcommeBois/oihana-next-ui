'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;
import useNow  from '../../hooks/useNow' ;

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
    SCHEDULER_TIMEGRID_COLUMN_WEEKEND ,
    SCHEDULER_TIMEGRID_DAY ,
    SCHEDULER_TIMEGRID_DAY_NAME ,
    SCHEDULER_TIMEGRID_DAY_NUMBER ,
    SCHEDULER_TIMEGRID_DAY_TODAY ,
    SCHEDULER_TIMEGRID_EVENT ,
    SCHEDULER_TIMEGRID_GUTTER ,
    SCHEDULER_TIMEGRID_HEAD ,
    SCHEDULER_TIMEGRID_HOUR ,
    SCHEDULER_TIMEGRID_LINE ,
    SCHEDULER_TIMEGRID_LINE_HALF ,
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
 * @module components/scheduler/SchedulerTimeGrid
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the grid.
 * @param {number} [props.dayEnd=1440] - Minutes from midnight where the axis ends.
 * @param {number} [props.dayStart=0] - Minutes from midnight where it begins.
 * @param {Array} props.events - The normalized records to place.
 * @param {number|string} [props.height='36rem'] - Height of the scrolling area. Twenty-four hours at 48 px is 1152 px, which would swallow any page.
 * @param {number} [props.maxAllDayRails=2] - Rails the all-day band shows before it counts instead ; a week of leave should not push the hours off screen.
 * @param {boolean} [props.nowIndicator=true] - Draw the line across today.
 * @param {(event: Object) => void} [props.onEventClick] - Called with a record, when an event is activated.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {number} [props.pixelsPerHour=48] - Zoom.
 * @param {(event: Object, context: Object) => React.ReactNode} [props.renderEvent] - Renders an event, in place of the default block.
 * @param {string} [props.scrollTime='08:00'] - Where the grid lands on mount.
 * @param {number} [props.slotDuration=30] - Minutes between two rules. The hour is drawn stronger than the half.
 * @param {{start: number, end: number, days: number}} props.window - The span being shown.
 */
const SchedulerTimeGrid =
({
    className ,
    dayEnd = DAY_MINUTES ,
    dayStart = 0 ,
    events ,
    height = '36rem' ,
    maxAllDayRails = 2 ,
    nowIndicator = true ,
    onEventClick ,
    path = 'components.scheduler' ,
    pixelsPerHour = 48 ,
    renderEvent ,
    scrollTime = '08:00' ,
    slotDuration = 30 ,
    window ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const bodyRef = useRef( null ) ;
    const now     = useNow({ enabled : nowIndicator }) ;

    const scale = useMemo
    (
        () => createTimeScale({ dayStart , dayEnd , pixelsPerHour }) ,
        [ dayStart , dayEnd , pixelsPerHour ] ,
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

                <div className={ SCHEDULER_TIMEGRID_COLUMNS } style={{ height : scale.size }}>

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

                        return (
                            <div
                                key       = { day }
                                className = { `${ SCHEDULER_TIMEGRID_COLUMN } ${ weekend ? SCHEDULER_TIMEGRID_COLUMN_WEEKEND : '' }`.trim() }
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

                                    if ( renderEvent )
                                    {
                                        return (
                                            <div
                                                key   = { `${ event.id }-${ item.start }` }
                                                className = "absolute"
                                                style = {{ top , height : Math.max( 14 , bottom - top ) , left : `${ item.left * 100 }%` , width : `${ item.width * 100 }%` }}
                                            >
                                                { renderEvent( event , { segment : item , labels } ) }
                                            </div>
                                        ) ;
                                    }

                                    const { className : eventClassName , style } = getSchedulerEventClasses
                                    ({
                                        className : SCHEDULER_TIMEGRID_EVENT ,
                                        color     : event.color ,
                                        past      : event.end <= Date.now() ,
                                        status    : event.status ,
                                    }) ;

                                    return (
                                        <button
                                            key       = { `${ event.id }-${ item.start }` }
                                            type      = "button"
                                            className = { eventClassName }
                                            onClick   = { onEventClick ? () => onEventClick( event ) : undefined }
                                            style     = {{
                                                ...style ,
                                                top ,
                                                // A one-minute event still has to be visible and clickable.
                                                height : Math.max( 14 , bottom - top ) ,
                                                left   : `${ item.left * 100 }%` ,
                                                width  : `${ item.width * 100 }%` ,
                                            }}
                                        >
                                            <span className="block truncate font-semibold">{ event.title }</span>
                                            <span className="block truncate font-mono text-[0.9em] opacity-80">
                                                { dayjs( item.start ).format( 'HH:mm' ) } – { dayjs( item.end ).format( 'HH:mm' ) }
                                            </span>
                                        </button>
                                    ) ;
                                } ) }

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
