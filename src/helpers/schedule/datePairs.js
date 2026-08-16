/**
 * Where an object keeps its dates, when it does not keep them under `startDate`.
 *
 * `Event` is the easy case. A `Reservation` is not : the subtypes disagree on
 * where the span lives, and they disagree on purpose — a table is booked for a
 * `startTime`, a room from a `checkinTime`, a taxi at a `pickupTime` with no end
 * at all, and a flight has no dates of its own because they belong to the flight
 * it points at.
 *
 * | Type | Where the dates sit |
 * |---|---|
 * | `Event` and everything shaped like it | `startDate` / `endDate` |
 * | `FoodEstablishmentReservation` | `startTime` / `endTime` |
 * | `LodgingReservation` | `checkinTime` / `checkoutTime` |
 * | `TaxiReservation` | `pickupTime`, and nothing else |
 * | `EventReservation`, `Flight…`, `Bus…`, `Train…` | inside `reservationFor` |
 *
 * A single `unwrap` accessor cannot answer that, so the answer stays structural,
 * like the rest of the adapter : **an ordered list of property pairs, tried in
 * turn, extended by whoever has a subtype of their own**. Nothing here reads a
 * `@type` either.
 *
 * @module helpers/schedule/datePairs
 */

import { fragmentOf } from './fragmentOf' ;
import { parseInstant } from './parseInstant' ;
import { CANCELLED , SCHEDULED } from './normalizeEvent' ;

/**
 * The pairs tried in order, first match winning.
 *
 * A pair whose second member is `null` names an instant with no end — the span
 * then lasts `defaultDuration`.
 */
export const DEFAULT_DATE_PAIRS =
[
    [ 'startDate'   , 'endDate'      ] , // Event — the default
    [ 'startTime'   , 'endTime'      ] , // FoodEstablishmentReservation
    [ 'checkinTime' , 'checkoutTime' ] , // LodgingReservation
    [ 'pickupTime'  , null           ] , // TaxiReservation
] ;

/**
 * Properties that hold *another* object carrying the dates.
 *
 * A reservation is two objects on purpose : it does not carry a span, it points
 * at what was reserved. Following that link is the difference between reading a
 * booking and dropping it.
 */
export const DEFAULT_UNWRAP = [ 'reservationFor' ] ;

/**
 * `ReservationStatusType` members → the status a view can style.
 *
 * **Only what genuinely maps is mapped.** `ReservationStatusType` is a different
 * vocabulary from `EventStatusType` and the normalized `status` decides how a
 * block is *drawn* — struck through, dashed — not what it means to a business.
 * A pending booking is drawn like a scheduled one because there is no honest
 * third way to draw it ; the panel shows the real value beside it, read straight
 * off the source.
 */
export const RESERVATION_STATUS =
{
    reservationcancelled : CANCELLED ,
    reservationconfirmed : SCHEDULED ,
    reservationhold      : SCHEDULED ,
    reservationpending   : SCHEDULED ,
} ;

/**
 * Reads a `reservationStatus`, when there is one.
 *
 * @param {*} value
 * @returns {string|null} A status, or `null` when nothing readable was said —
 *          which lets the caller fall back to `eventStatus` rather than be told
 *          `scheduled` by an accident.
 */
export const readReservationStatus = ( value ) =>
{
    const member = fragmentOf( typeof value === 'object' && value !== null ? ( value.identifier ?? value.name ?? value.url ) : value ) ;

    return member ? ( RESERVATION_STATUS[ member.toLowerCase() ] ?? null ) : null ;
} ;

/**
 * Finds the span of an object, and says where it found it.
 *
 * @param {Object} source
 * @param {Object} [options]
 * @param {Array<Array<string|null>>} [options.datePairs] - Pairs to try, in order.
 * @param {Array<string>} [options.unwrap] - Properties that may hold the dated object.
 * @returns {{ start: Object, end: Object|null, host: Object, startProperty: string, endProperty: string|null }|null}
 *          The parsed instants, the object they were read on, and the properties
 *          they were read from — the last two being what lets an editor write
 *          back in the spelling it read.
 *
 * @example
 * readSpan({ '@type' : 'LodgingReservation' , checkinTime : '2026-08-14T15:00:00Z' })
 * // → { startProperty : 'checkinTime' , endProperty : 'checkoutTime' , … }
 */
export const readSpan = ( source , options = {} ) =>
{
    const { datePairs = DEFAULT_DATE_PAIRS , unwrap = DEFAULT_UNWRAP } = options ;

    if ( source === null || typeof source !== 'object' )
    {
        return null ;
    }

    // The object itself first : a reservation carrying its own `startTime` means
    // it, and following the link would answer a question nobody asked.
    for ( const [ startProperty , endProperty ] of datePairs )
    {
        const start = parseInstant( source[ startProperty ] ) ;

        if ( start !== null )
        {
            return {
                end : endProperty ? parseInstant( source[ endProperty ] ) : null ,
                endProperty ,
                host : source ,
                start ,
                startProperty ,
            } ;
        }
    }

    for ( const property of unwrap )
    {
        const nested = source[ property ] ;

        if ( nested !== null && typeof nested === 'object' )
        {
            const span = readSpan( nested , { datePairs , unwrap : [] }) ;

            if ( span !== null )
            {
                return span ;
            }
        }
    }

    return null ;
} ;

/**
 * Whether an event's dates belong to another object than the event itself.
 *
 * A reservation that points at a concert has no times of its own : the times are
 * the concert's. Moving them would reschedule the concert **for everyone who
 * booked it**, which is why a gesture and an editor both refuse — the refusal is
 * a reading of the vocabulary, not a shortcoming.
 *
 * One predicate, on purpose : the day a case genuinely needs the nested write, it
 * is an option here rather than a rewrite everywhere.
 *
 * @param {Object} event - A normalized record.
 * @returns {boolean}
 */
export const isLinkedSpan = ( event ) => !!event?.span && event.span.host !== event.source ;

export default readSpan ;
