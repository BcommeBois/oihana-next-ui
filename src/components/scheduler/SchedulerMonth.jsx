'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import useDropdownPosition from '../../themes/hooks/useDropdownPosition' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { getWeekdayLabels } from '../../helpers/date/getMonthMatrix' ;
import { eventsOfDay , layoutBars } from '../../helpers/schedule/layoutBars' ;

import
{
    MONTH_HEADER_HEIGHT ,
    MONTH_RAIL_HEIGHT ,
    SCHEDULER_MONTH ,
    SCHEDULER_MONTH_DOT ,
    SCHEDULER_MONTH_DOTS ,
    SCHEDULER_MONTH_MORE ,
    SCHEDULER_MONTH_RAILS ,
    SCHEDULER_MONTH_WEEK ,
    SCHEDULER_MONTH_WEEKDAY ,
    SCHEDULER_MONTH_WEEKDAYS ,
    getMonthCellClasses ,
    getMonthDayNumberClasses ,
    resolveDotColor ,
} from '../../themes/components/scheduler' ;

import Button  from '../Button' ;
import Popover from '../Popover' ;

import SchedulerEvent from './SchedulerEvent' ;

/** Milliseconds in a day — the exclusive end of an all-day span. */
const DAY = 24 * 60 * 60 * 1000 ;

/**
 * The dot standing in for a chip carries the event's colour and nothing else.
 *
 * At full strength : the 20 % wash a card needs behind its text is, on six
 * pixels, indistinguishable from grey — which made an event that had named a
 * colour look as though it had not.
 */
const Dot = ( { event } ) =>
{
    const { className , style } = resolveDotColor( event.color ) ;

    return <span className={ `${ SCHEDULER_MONTH_DOT } ${ className }` } style={ style } /> ;
} ;

/**
 * The month grid : six weeks, always, with events laid on rails.
 *
 * An event running from the 10th to the 16th reads as **one bar crossing the
 * week**, not as seven chips — which is the whole reason this view needs its own
 * placement (see {@link module:helpers/schedule/layoutBars}) rather than the
 * overlap columns the time grid uses.
 *
 * The bars are an overlay above the cells, and the cells **reserve** the height
 * the overlay takes. Letting the rails float over the day numbers is the classic
 * way a month grid becomes unreadable at the first busy week.
 *
 * ### Narrow, it stops naming things
 *
 * Seven columns need roughly ninety pixels each before a title is worth printing.
 * Below that — a container query, so a panel on a wide screen behaves like a
 * phone — the cells show **density dots** and the whole cell opens the day. That
 * is a better target for a finger than an eight-pixel « +2 more », and it spares
 * the reader a grid of seven forty-pixel columns.
 *
 * ### Creating happens in the day, not on the cell
 *
 * A cell opens its day — that is what a tap on a month grid means, and a day
 * carrying three bookings has to be readable before anything is added to it. So
 * the offer to create sits **in the day panel**, where it is a real target for a
 * thumb and where it reaches the keyboard for free. Making an empty cell create
 * directly and a busy one open would be two gestures wearing one costume.
 *
 * A month has no hours, so what it creates is **an all-day event on that day**.
 * Inventing nine in the morning would be a decision this view has no grounds for ;
 * the form that opens next is where an hour is chosen.
 *
 * @module components/scheduler/SchedulerMonth
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the grid.
 * @param {boolean} [props.creatable=false] - Offer to add an event to the day being looked at.
 * @param {import('dayjs').ConfigType} [props.date] - The anchor, used to tell the month's days from its neighbours'.
 * @param {Array} props.events - The normalized records to place.
 * @param {number} [props.maxEventsPerDay=3] - How many rails a cell shows before it counts instead. Computed rather than measured : measuring costs a render pass and gets the first one wrong.
 * @param {(day: number) => void} [props.onDayClick] - Called with the day, when a cell is activated.
 * @param {(range: Object) => void} [props.onEventCreate] - Called with `{ start , end , allDay }` covering the day, when the day panel's create is used.
 * @param {(event: Object) => void} [props.onEventClick] - Called with a record, when a chip is activated.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {(event: Object, context: Object) => React.ReactNode} [props.renderEvent] - Renders an event in the day popover.
 * @param {number|string} [props.weekStartsOn] - Force the first day of week ; defaults to the locale.
 * @param {{start: number, end: number}} props.window - The grid's span — six weeks.
 */
const SchedulerMonth =
({
    className ,
    creatable = false ,
    date ,
    events ,
    maxEventsPerDay = 3 ,
    onDayClick ,
    onEventClick ,
    onEventCreate ,
    path = 'components.scheduler' ,
    renderEvent ,
    weekStartsOn ,
    window ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const [ openDay , setOpenDay ] = useState( null ) ;

    // One hook for forty-two possible anchors : the returned ref is a plain one,
    // so it is pointed at whichever cell was activated just before opening.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition
    ({
        panelWidth         : 300 ,
        panelHeight        : 320 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const weeks = useMemo
    (
        () => layoutBars( events ?? [] , window , { maxRails : maxEventsPerDay } ) ,
        [ events , window , maxEventsPerDay ] ,
    ) ;

    const weekdays = useMemo( () => getWeekdayLabels( lang , weekStartsOn ) , [ lang , weekStartsOn ] ) ;

    const month = dayjs( date ?? window.start ).month() ;
    const today = dayjs().startOf( 'day' ).valueOf() ;

    const dayEvents = useMemo
    (
        () => ( openDay === null ? [] : eventsOfDay( events ?? [] , openDay ) ) ,
        [ events , openDay ] ,
    ) ;

    const dayLabel = openDay === null ? '' : dayjs( openDay ).locale( lang ).format( 'dddd D MMMM' ) ;

    const open = ( element , day ) =>
    {
        anchorRef.current = element ;
        recalculate() ;
        setOpenDay( day ) ;
        onDayClick?.( day ) ;
    } ;

    /**
     * Turns the day being read into a range to fill in.
     *
     * The panel closes first : what comes next is a modal, and a full-screen
     * popover left open behind one is a second layer nobody asked for.
     */
    const create = () =>
    {
        const day = openDay ;

        setOpenDay( null ) ;

        onEventCreate?.({ allDay : true , end : day + DAY , start : day }) ;
    } ;

    return (
        <div className={ `${ SCHEDULER_MONTH } ${ className ?? '' }`.trim() } { ...rest }>

            <div className={ SCHEDULER_MONTH_WEEKDAYS }>
                { weekdays.map( ( label , index ) => (
                    // The labels come from the locale in order ; there is no other key.
                    // biome-ignore lint/suspicious/noArrayIndexKey: seven fixed positions, never reordered
                    <span key={ index } className={ SCHEDULER_MONTH_WEEKDAY }>{ label }</span>
                ) ) }
            </div>

            { weeks.map( week => (
                <div key={ week.days[ 0 ] } className="relative">

                    <div className={ SCHEDULER_MONTH_WEEK }>
                        { week.days.map( ( day , column ) =>
                        {
                            const outside = dayjs( day ).month() !== month ;
                            const hidden  = week.hidden[ column ] ;
                            const dots    = eventsOfDay( events ?? [] , day ) ;

                            return (
                                <button
                                    key       = { day }
                                    type      = "button"
                                    className = { getMonthCellClasses({ outside , today : day === today }) }
                                    onClick   = { look => open( look.currentTarget , day ) }
                                >
                                    <span className={ getMonthDayNumberClasses({ outside , today : day === today }) }>
                                        { dayjs( day ).date() }
                                    </span>

                                    {/* The rails are an overlay ; this is the room they need. */}
                                    <span style={{ height : week.rails * MONTH_RAIL_HEIGHT }} aria-hidden="true" />

                                    { dots.length > 0 && (
                                        <span className={ SCHEDULER_MONTH_DOTS } aria-hidden="true">
                                            { dots.slice( 0 , 5 ).map( event => <Dot key={ event.id } event={ event } /> ) }
                                        </span>
                                    ) }

                                    { hidden > 0 && (
                                        <span className={ `hidden @2xl:block ${ SCHEDULER_MONTH_MORE }` }>
                                            { `+${ hidden }` } { labels?.more }
                                        </span>
                                    ) }
                                </button>
                            ) ;
                        } ) }
                    </div>

                    <div className={ SCHEDULER_MONTH_RAILS } style={{ top : MONTH_HEADER_HEIGHT }}>
                        { week.bars.map( bar => (
                            <SchedulerEvent
                                key             = { `${ bar.event.id }-${ bar.column }` }
                                className       = "hidden @2xl:flex"
                                continuesAfter  = { bar.continuesAfter }
                                continuesBefore = { bar.continuesBefore }
                                event           = { bar.event }
                                onSelect        = { onEventClick }
                                style           = {{ gridColumn : `${ bar.column + 1 } / span ${ bar.span }` , gridRow : bar.rail + 1 }}
                            />
                        ) ) }
                    </div>

                </div>
            ) ) }

            <Popover
                anchorRef  = { anchorRef }
                direction  = { direction }
                fullScreen
                isOpen     = { openDay !== null }
                onClose    = { () => setOpenDay( null ) }
                placement  = { placement }
                panelClassName = "md:w-72"
                title      = { dayLabel }
            >
                <div className="flex flex-col gap-2">
                    {/* The full-screen panel already heads itself ; the dropdown does not. */}
                    <h4 className="text-sm font-semibold first-letter:uppercase md:block">
                        { dayLabel }
                    </h4>

                    { dayEvents.length === 0
                        ? <p className="text-sm text-base-content/60">{ labels?.emptyDay }</p>
                        : (
                            <ul className="flex flex-col gap-1">
                                { dayEvents.map( event => (
                                    <li key={ event.id }>
                                        { renderEvent
                                            ? renderEvent( event , { labels } )
                                            : (
                                                <SchedulerEvent
                                                    className = "w-full"
                                                    event     = { event }
                                                    onSelect  = { onEventClick }
                                                    size      = "md"
                                                />
                                            ) }
                                    </li>
                                ) ) }
                            </ul>
                        ) }

                    {/* Under what the day already holds : one reads a day before
                        adding to it, and the last thing on screen is the closest
                        thing to a thumb. */}
                    { creatable && (
                        <Button className="mt-1 w-full" color="primary" onClick={ create } size="sm">
                            { labels?.create }
                        </Button>
                    ) }
                </div>
            </Popover>

        </div>
    ) ;
} ;

SchedulerMonth.displayName = 'SchedulerMonth' ;

export default SchedulerMonth ;
