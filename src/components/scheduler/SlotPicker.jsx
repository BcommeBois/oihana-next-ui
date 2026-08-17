'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import useNow from '../../hooks/useNow' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { computeFreeSlots , computeFreeSlotsByResource } from '../../helpers/schedule/computeFreeSlots' ;
import { describeSpan } from '../../helpers/schedule/describeEvent' ;

import
{
    SLOTPICKER ,
    SLOTPICKER_BODY ,
    SLOTPICKER_CALENDAR ,
    SLOTPICKER_COUNT ,
    SLOTPICKER_DAY ,
    SLOTPICKER_GRID ,
    SLOTPICKER_GROUP ,
    SLOTPICKER_GROUPS ,
    SLOTPICKER_GROUP_LABEL ,
    SLOTPICKER_HEAD ,
    SLOTPICKER_PANE ,
    getSlotClasses ,
} from '../../themes/components/scheduler' ;

import Calendar   from '../dates/Calendar' ;
import EmptyState from '../EmptyState' ;

const DAY = 24 * 60 * 60 * 1000 ;

/** Noon, where a morning becomes an afternoon. */
const HALF_DAY = 12 * 60 ;

/** The window of one day, which is all this component ever asks for. */
const dayWindow = ( day ) => ({ end : day + DAY , start : day }) ;

/**
 * Choosing a free slot — which is not the same problem as editing an event.
 *
 * Every other component of this family shows what is **taken** and moves it.
 * This one shows what is **free**. There is nothing to edit yet, and the whole
 * question is finding where a new thing may go : the hours something is open,
 * minus what already sits in them, cut into pieces of the length asked for.
 * {@link module:helpers/schedule/computeFreeSlots} does the arithmetic ; this
 * draws it.
 *
 * ### It reports, it does not book
 *
 * `onChange` hands back `{ start , end }` — plus `resourceId` when several
 * resources were given — and stops there. **The reservation belongs to the
 * application**, exactly as the creation of an event has since the drawing
 * gesture landed, and for the same reason : the identity of a new object comes
 * from the server, and an invented key is an invented collision.
 *
 * ### Silence is not an opening
 *
 * A resource declaring no hours offers **no slots**. The timeline shades the
 * complement of what is declared and therefore shades nothing when nothing is
 * said ; offering an appointment needs the opposite, a positive statement —
 * without one, three in the morning is bookable. `defaultAvailability` says
 * « nine to six on weekdays » once, for everything that stayed silent.
 *
 * @module components/scheduler/SlotPicker
 *
 * @param {Object} props
 * @param {*} [props.availability] - `OpeningHoursSpecification`, one or several. Ignored when `resources` is given, each row carrying its own.
 * @param {Array} [props.busy] - What is already taken : normalized records fit as they are. **Taken as given, so filter before passing.** A cancelled booking still blocks until you drop it, and **an all-day entry blocks the whole day** — midnight to midnight — so a week-long exhibition handed over as an occupation empties the picker for that week. Whether either of them really holds a slot is a question only an application can answer.
 * @param {number} [props.buffer=0] - Minutes kept free on either side of everything booked. It inflates what is taken and never the opening bounds.
 * @param {boolean} [props.calendar=true] - Show the month. `false` leaves the slots alone, for a day chosen elsewhere.
 * @param {string} [props.className] - Extra classes for the root.
 * @param {Date} [props.date] - Controlled day.
 * @param {Date} [props.defaultDate] - Initial day, uncontrolled. Defaults to today.
 * @param {*} [props.defaultAvailability] - Hours for the resources declaring none. Without it they have no slots.
 * @param {number} [props.duration=30] - Minutes an appointment lasts.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default « nothing free » state.
 * @param {Function} [props.getAvailability] - Reads a row's hours. Defaults to `openingHoursSpecification` then `hoursAvailable`, on its source.
 * @param {number} [props.granularity] - Minutes between two candidate starts. Defaults to `duration` — slots that follow one another without overlapping.
 * @param {'none'|'halfDay'} [props.groupBy='none'] - Split the list at noon. Ignored with `resources`, which groups by row.
 * @param {boolean} [props.hidePast=true] - Drop the slots that have already started. Reads the clock **after mount**, never during a render. Turn it **off** to read a period that is over — a past week is a legitimate thing to look at, and with it on such a week is entirely empty.
 * @param {number} [props.lead=0] - Minutes of notice : nothing is offered before now plus this.
 * @param {boolean} [props.markEmptyDays=false] - Strike out the days with nothing free. It costs a scan of the month shown, which is why it is asked for rather than assumed.
 * @param {Date} [props.max] - Latest selectable day.
 * @param {Date} [props.min] - Earliest selectable day.
 * @param {(slot: Object) => void} [props.onChange] - Called with `{ start , end , resourceId? }`.
 * @param {(date: Date) => void} [props.onDateChange] - Called with the day being looked at.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {(slot: Object, context: Object) => React.ReactNode} [props.renderSlot] - Renders a slot, in place of the default button.
 * @param {Array} [props.resources] - Rows, as `resolveResources` returns them. Turns on the per-resource reading : one group each, **including the ones with nothing free**, since « that room is full » is an answer.
 * @param {Object|null} [props.value] - The chosen slot, controlled.
 * @param {number|string} [props.weekStartsOn] - Force the first day of week ; defaults to the locale.
 *
 * @example A room, half-hour appointments, ten minutes of cleaning between them
 * ```jsx
 * <SlotPicker
 *     availability = { room.openingHoursSpecification }
 *     busy         = { events.filter( event => event.status !== 'cancelled' ) }
 *     buffer       = { 10 }
 *     duration     = { 30 }
 *     onChange     = { slot => book( slot ) }
 * />
 * ```
 *
 * @example The first room free at two
 * ```jsx
 * <SlotPicker resources={ rooms } busy={ bookings } duration={ 60 } onChange={ book } />
 * ```
 */
const SlotPicker =
({
    availability ,
    busy ,
    buffer = 0 ,
    calendar = true ,
    className ,
    date ,
    defaultAvailability ,
    defaultDate ,
    duration = 30 ,
    emptyState ,
    getAvailability ,
    granularity ,
    groupBy = 'none' ,
    hidePast = true ,
    lead = 0 ,
    markEmptyDays = false ,
    max ,
    min ,
    onChange ,
    onDateChange ,
    path = 'components.scheduler' ,
    renderSlot ,
    resources ,
    value ,
    weekStartsOn ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    // Ticking once a minute is enough for something printing `HH:mm`, and it is
    // `null` until mounted — a server and a browser cannot agree on the time.
    const now = useNow({ enabled : hidePast }) ;

    const [ ownDate , setOwnDate ] = useState( () => defaultDate ?? new Date() ) ;
    const [ ownSlot , setOwnSlot ] = useState( null ) ;

    const day    = dayjs( date ?? ownDate ).startOf( 'day' ).valueOf() ;
    const picked = value !== undefined ? value : ownSlot ;

    const shared = useMemo
    (
        () => ({ buffer , duration , granularity , lead , now : hidePast ? now : null }) ,
        [ buffer , duration , granularity , hidePast , lead , now ] ,
    ) ;

    /**
     * The groups drawn under the head : one per resource, one per half-day, or a
     * single unnamed one.
     */
    const groups = useMemo( () =>
    {
        const window = dayWindow( day ) ;

        if ( Array.isArray( resources ) && resources.length > 0 )
        {
            return computeFreeSlotsByResource
            ({
                ...shared ,
                busy ,
                defaultAvailability ,
                getAvailability ,
                resources ,
                window ,
            })
            // Two rooms may legitimately share a name ; their ids do not.
            .map( entry => ({ key : entry.resource.id , label : entry.resource.name ?? entry.resource.id , slots : entry.slots }) ) ;
        }

        const slots = computeFreeSlots({ ...shared , availability : availability ?? defaultAvailability , busy , window }) ;

        if ( groupBy !== 'halfDay' )
        {
            return [ { key : 'all' , label : null , slots } ] ;
        }

        // The list is chronological, so the morning is its head.
        const morning = slots.filter( slot => dayjs( slot.start ).hour() * 60 + dayjs( slot.start ).minute() < HALF_DAY ) ;

        return [
            { key : 'morning' , label : labels?.slots?.morning , slots : morning } ,
            { key : 'afternoon' , label : labels?.slots?.afternoon , slots : slots.slice( morning.length ) } ,
        ]
        .filter( group => group.slots.length > 0 ) ;
    }
    , [ availability , busy , day , defaultAvailability , getAvailability , groupBy , labels , resources , shared ] ) ;

    const total = groups.reduce( ( count , group ) => count + group.slots.length , 0 ) ;

    /**
     * Whether a day has anything at all, for the strike-through on the month.
     *
     * One slot is enough to answer, but the arithmetic runs over the whole day
     * anyway — which is why this is behind a prop rather than always on. Forty-two
     * cells is forty-two of these.
     */
    const isEmptyDay = useMemo( () =>
    {
        if ( !markEmptyDays )
        {
            return undefined ;
        }

        return ( candidate ) =>
        {
            const window = dayWindow( dayjs( candidate ).startOf( 'day' ).valueOf() ) ;

            if ( Array.isArray( resources ) && resources.length > 0 )
            {
                return computeFreeSlotsByResource({ ...shared , busy , defaultAvailability , getAvailability , resources , window })
                    .every( entry => entry.slots.length === 0 ) ;
            }

            return computeFreeSlots({ ...shared , availability : availability ?? defaultAvailability , busy , window }).length === 0 ;
        } ;
    }
    , [ availability , busy , defaultAvailability , getAvailability , markEmptyDays , resources , shared ] ) ;

    const pickDay = ( next ) =>
    {
        if ( !next )
        {
            return ;
        }

        if ( date === undefined )
        {
            setOwnDate( next ) ;
        }

        onDateChange?.( next ) ;
    } ;

    const pickSlot = ( slot ) =>
    {
        if ( value === undefined )
        {
            setOwnSlot( slot ) ;
        }

        onChange?.( slot ) ;
    } ;

    const slotButton = ( slot ) =>
    {
        const selected = !!picked && picked.start === slot.start && picked.resourceId === slot.resourceId ;

        if ( renderSlot )
        {
            return renderSlot( slot , { labels , lang , onSelect : () => pickSlot( slot ) , selected }) ;
        }

        return (
            <button
                key          = { `${ slot.resourceId ?? '' }-${ slot.start }` }
                type         = "button"
                // The visible text is a start time and nothing else. Read out, a
                // list of them says neither how long they last nor what day they
                // are on — the same sentence the rest of the family uses.
                aria-label   = { describeSpan( slot , { labels , lang } ) }
                aria-pressed = { selected }
                className    = { getSlotClasses({ selected }) }
                onClick      = { () => pickSlot( slot ) }
            >
                { dayjs( slot.start ).format( 'HH:mm' ) }
            </button>
        ) ;
    } ;

    return (
        <div className={ `${ SLOTPICKER } ${ className ?? '' }`.trim() } { ...rest }>
            <div className={ SLOTPICKER_BODY }>

                { calendar && (
                    <div className={ SLOTPICKER_CALENDAR }>
                        <Calendar
                            disabledDates = { isEmptyDay }
                            max           = { max }
                            min           = { min }
                            onChange      = { pickDay }
                            value         = { new Date( day ) }
                            weekStartsOn  = { weekStartsOn }
                        />
                    </div>
                ) }

                <div className={ SLOTPICKER_PANE }>

                    <div className={ SLOTPICKER_HEAD }>
                        <span className={ SLOTPICKER_DAY }>{ dayjs( day ).locale( lang ).format( 'dddd LL' ) }</span>
                        <span className={ SLOTPICKER_COUNT }>
                            { total > 0 ? `${ total } ${ labels?.slots?.available ?? '' }`.trim() : '' }
                        </span>
                    </div>

                    { total === 0
                        ? ( emptyState ?? <EmptyState description={ labels?.slots?.empty } /> )
                        : (
                            <div className={ SLOTPICKER_GROUPS }>
                                { groups.map( group => (
                                    <div key={ group.key } className={ SLOTPICKER_GROUP }>
                                        { group.label && <span className={ SLOTPICKER_GROUP_LABEL }>{ group.label }</span> }

                                        {/* A resource with nothing free keeps its heading : « that
                                            room is full » is an answer, and a row that vanishes
                                            makes the reader wonder whether it exists. */}
                                        { group.slots.length === 0
                                            ? <span className="text-sm text-base-content/50">{ labels?.slots?.none }</span>
                                            : <div className={ SLOTPICKER_GRID }>{ group.slots.map( slotButton ) }</div> }
                                    </div>
                                ) ) }
                            </div>
                        ) }

                </div>
            </div>
        </div>
    ) ;
} ;

SlotPicker.displayName = 'SlotPicker' ;

export default SlotPicker ;
