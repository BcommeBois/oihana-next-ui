/**
 * What is *free*, which is a different question from what is taken.
 *
 * Every other module of this family reads what is scheduled and places it. This
 * one reads the same two things — the hours something is open, and what already
 * sits in them — and answers with the gaps. Booking an appointment is not
 * editing an event : there is nothing to edit yet, and the whole problem is
 * finding where the new thing may go.
 *
 * ### It consumes the opening hours as they stand
 *
 * The openings come from {@link module:helpers/schedule/openingHours}, which
 * reads `OpeningHoursSpecification` unchanged. Inventing a second way to say
 * « open on Tuesdays from nine to six » would leave two of them to reconcile the
 * first time a payload said it once.
 *
 * ### Silence is not an opening
 *
 * A resource that declares no hours gets **no slots at all**. The timeline draws
 * the complement of what is declared and therefore shades nothing when nothing
 * is said ; offering an appointment needs the opposite — a *positive* statement.
 * Without one, three in the morning is bookable. `defaultAvailability` is how an
 * application says « nine to six on weekdays » once, for everything that stayed
 * silent.
 *
 * ### The clock is a parameter
 *
 * `now` is passed in and never read here. A pure function that reads the clock
 * is neither testable nor replayable, and reading the time while rendering is a
 * hydration mismatch on every load — which is why `useNow` starts at `null`.
 *
 * @module helpers/schedule/computeFreeSlots
 */

import dayjs from '../date/configureDayjs' ;

import { openRangesOf } from './openingHours' ;

const MINUTE = 60 * 1000 ;

/**
 * @typedef {Object} FreeSlot
 * @property {number} start - Inclusive, in milliseconds.
 * @property {number} end   - Exclusive, in milliseconds.
 * @property {string} [resourceId] - Which resource it belongs to, when several were given.
 */

/** The days a window covers, as local midnights. */
const daysOf = ( window ) =>
{
    const days = [] ;

    if ( !window || !Number.isFinite( window.start ) || !Number.isFinite( window.end ) )
    {
        return days ;
    }

    let cursor = dayjs( window.start ).startOf( 'day' ) ;

    while ( cursor.valueOf() < window.end )
    {
        days.push( cursor.valueOf() ) ;
        cursor = cursor.add( 1 , 'day' ) ;
    }

    return days ;
} ;

/**
 * Merges the busy spans into as few blocking ranges as possible, buffer included.
 *
 * **The buffer inflates what is taken, it never shrinks the opening.** Taking it
 * off the bounds instead would eat the first slot of the day and the last, which
 * nothing precedes and nothing follows — a quarter of an hour of cleaning after
 * a booking is not a quarter of an hour of cleaning after the doors open.
 *
 * @param {Array<{start: number, end: number}>} busy
 * @param {number} buffer - Milliseconds taken on either side of each span.
 * @returns {Array<{start: number, end: number}>}
 */
const blockersOf = ( busy , buffer ) =>
{
    const spans = ( busy ?? [] )
        .filter( item => item && Number.isFinite( item.start ) && Number.isFinite( item.end ) && item.end > item.start )
        .map( item => ({ end : item.end + buffer , start : item.start - buffer }) )
        .sort( ( a , b ) => a.start - b.start ) ;

    const merged = [] ;

    for ( const span of spans )
    {
        const last = merged[ merged.length - 1 ] ;

        if ( last && span.start <= last.end )
        {
            last.end = Math.max( last.end , span.end ) ;
            continue ;
        }

        merged.push({ ...span }) ;
    }

    return merged ;
} ;

/**
 * The free slots of one availability, over a window.
 *
 * @param {Object} props
 * @param {*} props.availability - `OpeningHoursSpecification`, one or several — or the object carrying them.
 * @param {Array<{start: number, end: number}>} [props.busy=[]] - What is already taken. Normalized records fit as they are. **Taken as given, and that is where the filtering belongs** : a cancelled booking still blocks unless you dropped it, and — the one that surprises everybody — **an all-day entry blocks the whole day**, because all-day means midnight to midnight. An exhibition running a week, handed over as an occupation, empties the picker for that week. Neither is arithmetic : whether a cancellation frees a room, and whether an all-day entry holds it, are questions only an application can answer.
 * @param {number} props.duration - Minutes the appointment lasts. Required.
 * @param {{start: number, end: number}} props.window - The span to scan.
 * @param {number} [props.granularity] - Minutes between two candidate starts. Defaults to `duration`, which gives slots that follow one another without overlapping.
 * @param {number} [props.buffer=0] - Minutes kept free on either side of everything already booked.
 * @param {number} [props.lead=0] - Minutes of notice : nothing is offered before `now + lead`.
 * @param {number|null} [props.now=null] - The present instant. Anything starting before it is dropped. `null` keeps the past — which is what a read-only preview of last week wants.
 * @param {string} [props.resourceId] - Stamped on every slot, for the caller that asked about several.
 * @returns {Array<FreeSlot>} In chronological order. Empty when nothing is open.
 *
 * @example
 * computeFreeSlots
 * ({
 *     availability : room.openingHoursSpecification ,
 *     busy         : events.filter( event => event.status !== 'cancelled' ) ,
 *     duration     : 30 ,
 *     buffer       : 10 ,
 *     window       : { start , end } ,
 * })
 * // → [ { start , end } , … ]
 */
export const computeFreeSlots = ( props = {} ) =>
{
    const {
        availability ,
        busy = [] ,
        buffer = 0 ,
        duration ,
        granularity ,
        lead = 0 ,
        now = null ,
        resourceId ,
        window ,
    } = props ;

    const length = Number( duration ) * MINUTE ;

    if ( !Number.isFinite( length ) || length <= 0 )
    {
        return [] ;
    }

    const step     = Math.max( 1 , Number( granularity ) || Number( duration ) ) * MINUTE ;
    const blockers = blockersOf( busy , Math.max( 0 , Number( buffer ) || 0 ) * MINUTE ) ;
    const earliest = now === null ? null : now + Math.max( 0 , Number( lead ) || 0 ) * MINUTE ;

    const slots = [] ;

    for ( const day of daysOf( window ) )
    {
        // Silence is not an opening : a day with no declared hours has no slots,
        // and that is the answer rather than the absence of one.
        for ( const range of openRangesOf( availability , day ) )
        {
            // A slot starts **at the opening**, not at the round hour. A room
            // opening at 09:10 offers 09:10, 09:40, 10:10 — rounding would
            // invent a rule the data never stated, and lose the first slot of
            // the day doing it.
            for ( let at = range.start ; at + length <= range.end ; at += step )
            {
                const end = at + length ;

                if ( earliest !== null && at < earliest )
                {
                    continue ;
                }

                // Only what is inside the window : a rule may open a day that the
                // window only shows half of.
                if ( at < window.start || end > window.end )
                {
                    continue ;
                }

                if ( blockers.some( blocker => at < blocker.end && end > blocker.start ) )
                {
                    continue ;
                }

                slots.push( resourceId === undefined ? { end , start : at } : { end , resourceId , start : at } ) ;
            }
        }
    }

    return slots.sort( ( a , b ) => a.start - b.start ) ;
} ;

/**
 * The same question asked of several resources at once.
 *
 * « The first room free at two » is the ordinary shape of a booking, and it is
 * this function rather than the caller's loop because the busy list has to be
 * split per resource first — which is where the mistake is otherwise made.
 *
 * Each resource is read for its **own** hours, so a workshop opening at two in
 * the afternoon simply starts later than the rest, with nothing to declare.
 *
 * @param {Object} props
 * @param {Array<Object>} props.resources - Rows, as `resolveResources` returns them : `{ id , name , source }`.
 * @param {Array<{start: number, end: number, resourceId: string}>} [props.busy=[]] - What is taken, all resources together.
 * @param {*} [props.defaultAvailability] - Hours for the resources declaring none. **Without it they have no slots**, which is the honest answer to a payload that said nothing.
 * @param {Function} [props.getAvailability] - Reads a row's hours. Defaults to `openingHoursSpecification` then `hoursAvailable`, on the row's source.
 * @returns {Array<{resource: Object, slots: Array<FreeSlot>}>} One entry per resource, in the order they were declared — **including the ones with nothing free**, since « that room is full » is an answer.
 *
 * @example
 * computeFreeSlotsByResource({ resources , busy : events , duration : 30 , window })
 */
export const computeFreeSlotsByResource = ( props = {} ) =>
{
    const { busy = [] , defaultAvailability , getAvailability , resources = [] , ...rest } = props ;

    const read = getAvailability
        ?? ( resource => resource?.source?.openingHoursSpecification ?? resource?.source?.hoursAvailable ) ;

    return resources.map( ( resource ) =>
    {
        const availability = read( resource ) ?? defaultAvailability ;

        return {
            resource ,
            slots : computeFreeSlots
            ({
                ...rest ,
                availability ,
                busy       : busy.filter( item => item?.resourceId === undefined || item.resourceId === resource.id ) ,
                resourceId : resource.id ,
            }) ,
        } ;
    } ) ;
} ;

export default computeFreeSlots ;
