/**
 * Reads schema.org JSON-LD into the records the scheduler views consume.
 *
 * ### Why an adapter rather than reading the vocabulary directly
 *
 * schema.org types are polymorphic by design : `location` accepts a `Place`, a
 * `PostalAddress`, plain text or a `VirtualLocation` ; `duration` accepts an ISO
 * string or a `QuantitativeValue` ; and `startDate` is *either* a date *or* an
 * instant. That richness is exactly right on the wire and impossible to carry
 * into a layout engine, which recomputes positions dozens of times per second
 * while an event is dragged. So the vocabulary is read once, here, and what
 * comes out is nine resolved fields — plus `source`, the original object,
 * untouched, which is what actually gets rendered.
 *
 * ### It reads properties, never `@type`
 *
 * This is what lets a house subtype work without being declared. An object that
 * carries `byDay` is expanded as a repeating rule whether it is called
 * `Schedule` or anything else ; an object that carries `startDate` becomes a
 * dated event. Nothing here knows the name of a single house type, so extending
 * the vocabulary server-side costs nothing client-side.
 *
 * When an object carries both, the rule wins — schema.org says as much : an
 * event associated with a schedule *should not* carry its own dates.
 *
 * @module helpers/schedule/fromSchema
 */

import { DEFAULT_UNWRAP , readReservationStatus , readSpan } from './datePairs' ;
import { expandSchedule , readSchedules } from './expandSchedule' ;
import { fragmentOf } from './fragmentOf' ;
import { parseDuration } from './parseDuration' ;
import { parseInstant } from './parseInstant' ;

import
{
    CANCELLED ,
    DEFAULT_DURATION ,
    MOVED_ONLINE ,
    POSTPONED ,
    RESCHEDULED ,
    SCHEDULED ,
    resolveEnd ,
    resolveResourceId ,
} from './normalizeEvent' ;

/** `EventStatusType` members → the status a view can style. */
const STATUS_BY_MEMBER =
{
    eventscheduled   : SCHEDULED ,
    eventcancelled   : CANCELLED ,
    eventpostponed   : POSTPONED ,
    eventrescheduled : RESCHEDULED ,
    eventmovedonline : MOVED_ONLINE ,
} ;

/**
 * Reads an `eventStatus` value.
 *
 * @param {*} value
 * @returns {string} One of the statuses ; `scheduled` when nothing readable was said.
 */
export const readStatus = ( value ) =>
{
    const member = fragmentOf( typeof value === 'object' && value !== null ? ( value.identifier ?? value.name ?? value.url ) : value ) ;
    return STATUS_BY_MEMBER[ member?.toLowerCase() ] ?? SCHEDULED ;
} ;

/** What an object calls itself, under either of the two names it may use. */
const nameOf = ( object ) => ( object === null || typeof object !== 'object' ? null : ( object.name ?? object.alternateName ?? null ) ) ;

/**
 * Reads what to call an event.
 *
 * A reservation is very often nameless : what has a name is the concert, the inn
 * or the restaurant it points at. So the linked object is asked too — **even
 * when the dates were found on the reservation itself**, which is precisely the
 * case a lodging booking presents, with its own `checkinTime` and a name that
 * only exists over in `reservationFor`.
 *
 * @param {Object} source
 * @param {Object} host - Where the dates were read.
 * @param {Array<string>} unwrapList
 * @returns {string|null}
 */
export const readTitle = ( source , host , unwrapList = DEFAULT_UNWRAP ) =>
{
    const own = nameOf( source ) ?? nameOf( host ) ;

    if ( own !== null )
    {
        return own ;
    }

    for ( const property of unwrapList )
    {
        const named = nameOf( source[ property ] ) ;

        if ( named !== null )
        {
            return named ;
        }
    }

    return null ;
} ;

/**
 * Reads the identity of a source object.
 *
 * The default order is the vocabulary's own : `identifier` first, then the `id`
 * every payload carries, then the `url` that is unique by construction. It is
 * only a default — a store whose true key sits elsewhere (an ArangoDB `_key`,
 * for one) passes `getEventId` and is done.
 *
 * @param {Object} source
 * @param {Function} [getEventId]
 * @param {number} [index] - Position in the list, used to name an object that carries no identity at all.
 * @returns {string|null}
 */
export const readEventId = ( source , getEventId , index ) =>
{
    const id = getEventId?.( source ) ?? source.identifier ?? source.id ?? source.url ?? ( index === undefined ? null : `schema-${ index }` ) ;
    return id === null || id === undefined || id === '' ? null : String( id ) ;
} ;

/**
 * Reads what names the row an event belongs to on a timeline.
 *
 * No schema.org property means « resource », so this is the one place an
 * accessor is expected rather than optional. Without one, `location` is the
 * closest thing the vocabulary offers, and it is read for its identity whether
 * it arrived as a bare reference or as a resolved object.
 *
 * @param {Object} source
 * @param {Function} [getResourceId]
 * @returns {string|null}
 */
export const readResourceId = ( source , getResourceId ) =>
    resolveResourceId( getResourceId === undefined ? source.location : getResourceId( source ) ) ;

/**
 * Reads one JSON-LD object.
 *
 * @param {Object} source - An `Event`, a `Schedule`, or any type carrying their properties.
 * @param {Object} [options]
 * @param {{start: number, end: number}} [options.window]     - Visible span. **Required** to expand a repeating rule ; a dated event does not need it.
 * @param {boolean}  [options.allDayEndInclusive=true]        - A bare `Date` `endDate` covers its own day.
 * @param {number}   [options.defaultDuration=3600000]        - Length of an event stating neither end nor duration.
 * @param {Function} [options.getEventId]                     - Reads the identity.
 * @param {Function} [options.getResourceId]                  - Reads the timeline row.
 * @param {Function} [options.getColor]                       - Reads the display color.
 * @param {Function} [options.getStatus]                      - Reads the status, for a vocabulary of your own.
 * @param {Array}    [options.datePairs]                      - Where to look for a span. See {@link module:helpers/schedule/datePairs}.
 * @param {Array}    [options.unwrap]                         - Properties that may hold the dated object.
 * @param {number}   [options.index]                          - Position in the source list.
 * @returns {Array<import('./normalizeEvent').ScheduleEvent>} Zero, one, or as many
 *          records as the rule produced occurrences.
 *
 * @example
 * // A dated event
 * fromSchema({ '@type' : 'Event' , name : 'Concert' , startDate : '2026-08-14T20:00:00Z' , duration : 'PT2H' })
 *
 * // A house type carrying byDay — expanded without ever naming its @type
 * fromSchema( course , { window : { start , end } , getEventId : e => e._key } )
 */
export const fromSchema = ( source , options = {} ) =>
{
    if ( source === null || typeof source !== 'object' )
    {
        return [] ;
    }

    const {
        window ,
        allDayEndInclusive = true ,
        datePairs ,
        defaultDuration    = DEFAULT_DURATION ,
        getEventId ,
        getResourceId ,
        getColor ,
        getStatus ,
        unwrap ,
        index ,
    } = options ;

    const id = readEventId( source , getEventId , index ) ;

    if ( id === null )
    {
        return [] ;
    }

    // Where the span lives, and on which object. A reservation points at what was
    // reserved rather than carrying dates of its own, so the name to show is
    // often over there too.
    const span = readSpan( source , { datePairs , unwrap }) ;
    const host = span?.host ?? source ;

    const common =
    {
        title         : readTitle( source , host , unwrap ) ,
        resourceId    : readResourceId( source , getResourceId ) ,
        // `reservationStatus` is a vocabulary of its own, and `readStatus` would
        // answer `scheduled` to all of it — including to a cancellation.
        status        : getStatus ? getStatus( source ) : ( readReservationStatus( source.reservationStatus ) ?? readStatus( source.eventStatus ?? host.eventStatus ) ) ,
        color         : ( getColor === undefined ? source.color : getColor( source ) ) ?? null ,
        previousStart : parseInstant( source.previousStartDate )?.ms ?? null ,
        editable      : source.editable ,
        // What an editor needs to write back in the spelling it was read in.
        span          : span === null ? null : { endProperty : span.endProperty , host , startProperty : span.startProperty } ,
        source ,
    } ;

    // A repeating rule takes precedence over any dates the object may also carry —
    // schema.org states that an event bound to a schedule should not have its own.
    const schedules = readSchedules( source ) ;

    if ( schedules.length > 0 )
    {
        if ( !window )
        {
            return [] ;
        }

        const events = [] ;

        for ( const schedule of schedules )
        {
            for ( const occurrence of expandSchedule( schedule , { window , defaultDuration } ) )
            {
                events.push
                ({
                    ...common ,
                    // The occurrence's date makes each instance its own React key,
                    // while `source` still points at the one rule they all come
                    // from — which is how an editor can tell it is about to change
                    // the series rather than a single date.
                    id     : `${ id }@${ occurrence.date }` ,
                    start  : occurrence.start ,
                    end    : occurrence.end ,
                    allDay : occurrence.allDay ,
                    // A rule's `startDate` bounds its validity, it is not this
                    // occurrence's span — an editor writing there would move the
                    // whole series, which is the very thing the guard refuses.
                    span   : null ,
                }) ;
            }
        }

        return events ;
    }

    if ( span === null )
    {
        return [] ;
    }

    const { end : endInstant , start : startInstant } = span ;

    // The absence of a time component is the all-day signal. `startDate` accepts
    // both spellings on the same property, and nothing else distinguishes them.
    const allDay = typeof source.allDay === 'boolean' ? source.allDay : startInstant.dateOnly ;

    const end = resolveEnd
    ({
        start              : startInstant.ms ,
        end                : endInstant?.ms ?? null ,
        endDateOnly        : endInstant?.dateOnly ?? false ,
        duration           : parseDuration( source.duration ?? host.duration ) ,
        allDay ,
        allDayEndInclusive ,
        defaultDuration ,
    }) ;

    return [ { ...common , id , start : startInstant.ms , end , allDay } ] ;
} ;

/**
 * Reads a whole payload.
 *
 * The practical entry point : it supplies each object's position so one lacking
 * any identity can still be named, and flattens the occurrences a repeating rule
 * produces into the single list the views consume.
 *
 * @param {Array<Object>} sources
 * @param {Object} [options] - As {@link fromSchema}, minus `index`.
 * @returns {Array<import('./normalizeEvent').ScheduleEvent>} Ordered by start.
 *
 * @example
 * const events = fromSchemaList( payload.result , { window , getEventId : e => e._key } ) ;
 */
export const fromSchemaList = ( sources , options = {} ) =>
{
    if ( !Array.isArray( sources ) )
    {
        return [] ;
    }

    const events = [] ;

    sources.forEach( ( source , index ) =>
    {
        events.push( ...fromSchema( source , { ...options , index } ) ) ;
    }) ;

    return events.sort( ( a , b ) => a.start - b.start || a.end - b.end ) ;
} ;

export default fromSchemaList ;
