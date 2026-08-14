/**
 * The record every scheduler view and every layout function reads.
 *
 * Nine fields, all resolved, all scalar but the last one. The shape is
 * deliberately narrow : positioning an event on a time axis needs an instant, a
 * length and an identity, and nothing else. Everything richer — the place, the
 * attendees, the house properties — stays in `source`, untouched, and is read by
 * whatever renders the event rather than by what lays it out.
 *
 * `start` and `end` are **milliseconds**, not ISO strings and not dayjs objects.
 * The layout runs dozens of times per second while an event is dragged ; parsing
 * a string at each frame is not an option, and an integer subtraction is.
 *
 * `end` is always **exclusive** : an event covering the whole of the 12th ends at
 * the 13th at midnight. That is what makes `end - start` a length and two
 * adjacent events not overlap.
 *
 * @module helpers/schedule/normalizeEvent
 */

import dayjs from '../date/configureDayjs' ;

import { parseInstant } from './parseInstant' ;

/** The event happens as announced. */
export const SCHEDULED = 'scheduled' ;

/** The event will not happen. */
export const CANCELLED = 'cancelled' ;

/** The event is deferred, without a new date yet. */
export const POSTPONED = 'postponed' ;

/** The event was moved — `previousStart` holds where it used to be. */
export const RESCHEDULED = 'rescheduled' ;

/** The event still happens, online. */
export const MOVED_ONLINE = 'movedOnline' ;

/** Every value `status` can take. */
export const statuses = [ SCHEDULED , CANCELLED , POSTPONED , RESCHEDULED , MOVED_ONLINE ] ;

/** Fallback length of an event that gives neither an end nor a duration. */
export const DEFAULT_DURATION = 60 * 60 * 1000 ;

const DAY = 24 * 60 * 60 * 1000 ;

/**
 * @typedef {Object} ScheduleEvent
 * @property {string}       id            - Stable identity. Never an index.
 * @property {string|null}  title         - Display label.
 * @property {number}       start         - Inclusive start, in milliseconds.
 * @property {number}       end           - Exclusive end, in milliseconds.
 * @property {boolean}      allDay        - Belongs to the all-day band rather than to the time grid.
 * @property {string|null}  resourceId    - Timeline row it belongs to.
 * @property {string}       status        - One of {@link statuses}.
 * @property {string|null}  color         - Theme token or free CSS color.
 * @property {number|null}  previousStart - Where the event used to start, when it was rescheduled.
 * @property {*}            editable      - Whatever the source said about editability ; the components interpret it.
 * @property {*}            source        - The original object, untouched.
 */

/**
 * Resolves the end of an event from whatever it was given.
 *
 * @param {Object} options
 * @param {number}      options.start              - Resolved start, in milliseconds.
 * @param {number|null} options.end                - Explicit end, when there is one.
 * @param {boolean}     options.endDateOnly        - The explicit end came from a bare `Date`.
 * @param {number|null} options.duration           - Explicit length, in milliseconds.
 * @param {boolean}     options.allDay             - The event is an all-day one.
 * @param {boolean}     options.allDayEndInclusive - A bare `Date` end covers its own day.
 * @param {number}      options.defaultDuration    - Fallback length.
 * @returns {number} The exclusive end, never before the start.
 */
export const resolveEnd = ({ start , end , endDateOnly , duration , allDay , allDayEndInclusive , defaultDuration }) =>
{
    let resolved ;

    if ( end !== null && end !== undefined )
    {
        // A bare `Date` end names a day, not an instant. Whether that day is part
        // of the event is the one thing schema.org leaves open : iCal says no, a
        // reader of « from the 10th to the 12th » says yes. `allDayEndInclusive`
        // decides, and defaults to the human reading.
        resolved = endDateOnly && allDayEndInclusive ? dayjs( end ).add( 1 , 'day' ).valueOf() : end ;
    }
    else if ( duration !== null && duration !== undefined )
    {
        resolved = start + duration ;
    }
    else if ( allDay )
    {
        resolved = dayjs( start ).startOf( 'day' ).add( 1 , 'day' ).valueOf() ;
    }
    else
    {
        resolved = start + defaultDuration ;
    }

    // An end before its start is corrupt data, not a negative event : it would
    // give a negative height and break every overlap comparison downstream.
    return resolved > start ? resolved : start + ( allDay ? DAY : defaultDuration ) ;
} ;

/**
 * Builds the canonical record from an object already using the library's own
 * field names — the path for a consumer with no JSON-LD to feed.
 *
 * `start` accepts a `Date`, a milliseconds number or an ISO string ; a bare
 * `'2026-08-14'` marks the event all-day, exactly as it does in schema.org.
 *
 * @param {Object} source - `{ id , title , start , end , allDay , resourceId , status , color , editable }`.
 * @param {Object} [options]
 * @param {boolean}  [options.allDayEndInclusive=true] - A bare `Date` end covers its own day.
 * @param {number}   [options.defaultDuration=3600000] - Length of an event that gives neither end nor duration.
 * @param {Function} [options.getEventId]              - Reads the identity, when the defaults do not fit.
 * @param {Function} [options.getResourceId]           - Reads the timeline row.
 * @param {number}   [options.index]                   - Position in the source list, used to name an event that carries no identity.
 * @returns {ScheduleEvent|null} `null` when there is no readable start.
 *
 * @example
 * normalizeEvent({ id : 'e1' , title : 'Concert' , start : new Date() , end : new Date() })
 */
export const normalizeEvent = ( source , options = {} ) =>
{
    if ( source === null || typeof source !== 'object' )
    {
        return null ;
    }

    const {
        allDayEndInclusive = true ,
        defaultDuration    = DEFAULT_DURATION ,
        getEventId ,
        getResourceId ,
        index ,
    } = options ;

    const startInstant = parseInstant( source.start ) ;

    if ( startInstant === null )
    {
        return null ;
    }

    const endInstant = parseInstant( source.end ) ;
    const allDay     = typeof source.allDay === 'boolean' ? source.allDay : startInstant.dateOnly ;

    const end = resolveEnd
    ({
        start              : startInstant.ms ,
        end                : endInstant?.ms ?? null ,
        endDateOnly        : endInstant?.dateOnly ?? false ,
        duration           : null ,
        allDay ,
        allDayEndInclusive ,
        defaultDuration ,
    }) ;

    const id = getEventId?.( source ) ?? source.id ?? ( index === undefined ? null : `event-${ index }` ) ;

    if ( id === null || id === undefined )
    {
        return null ;
    }

    return {
        id            : String( id ) ,
        title         : source.title ?? null ,
        start         : startInstant.ms ,
        end ,
        allDay ,
        resourceId    : resolveResourceId( getResourceId?.( source ) ?? source.resourceId ) ,
        status        : statuses.includes( source.status ) ? source.status : SCHEDULED ,
        color         : source.color ?? null ,
        previousStart : parseInstant( source.previousStart )?.ms ?? null ,
        editable      : source.editable ,
        source ,
    } ;
} ;

/**
 * Reduces whatever names a resource to a string identity.
 *
 * Back offices routinely encode « no resource » as a zero rather than as an
 * absence, and a reference resolved into an object is as common as a bare one.
 * Both are handled here so no view ever grows a phantom row named `0`.
 *
 * @param {*} value - A scalar reference, a resolved object, or nothing.
 * @returns {string|null}
 */
export const resolveResourceId = ( value ) =>
{
    if ( value === null || value === undefined || value === '' || value === 0 || value === '0' )
    {
        return null ;
    }

    if ( typeof value === 'object' )
    {
        const id = value._key ?? value.identifier ?? value.id ?? value.url ?? null ;
        return id === null || id === undefined ? null : String( id ) ;
    }

    return String( value ) ;
} ;

export default normalizeEvent ;
