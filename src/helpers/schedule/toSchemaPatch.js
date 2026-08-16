/**
 * Turns a move or a resize back into something an API can be sent.
 *
 * The adapter has to work in both directions or it is only half of one : a view
 * that reads JSON-LD and emits milliseconds leaves every application to write
 * the same conversion back by hand, and to get the all-day rule wrong in the
 * process.
 *
 * What comes out is a **patch** — the properties that changed, and nothing else.
 * Never a rebuilt object : an object rebuilt from nine normalized fields would
 * silently drop everything the vocabulary carried and the adapter did not need.
 *
 * The formats are the ones the PHP side pins : `Y-m-d` for a whole day,
 * `Y-m-d\TH:i:s.v\Z` for an instant.
 *
 * @module helpers/schedule/toSchemaPatch
 */

import dayjs from '../date/configureDayjs' ;

/** `Iso8601Format::DATE` — a whole day. */
export const DATE_FORMAT = 'YYYY-MM-DD' ;

/** `Iso8601Format::DATE_TIME_MILLI_ZULU` — an instant, to the millisecond, in UTC. */
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' ;

/**
 * Formats one instant the way its event spells time.
 *
 * A whole day is written in **local** time — that is what a day is. An instant
 * is written in UTC, through `toISOString`, which emits exactly the millisecond
 * Zulu form the PHP catalogue pins and spares this group the `utc` plugin.
 *
 * @param {number} ms
 * @param {boolean} allDay
 * @returns {string}
 */
export const toSchemaDate = ( ms , allDay ) =>
    allDay ? dayjs( ms ).format( DATE_FORMAT ) : new Date( ms ).toISOString() ;

/**
 * Builds the patch for a new span.
 *
 * @param {Object} change
 * @param {number}  change.start          - New start, in milliseconds.
 * @param {number}  change.end            - New exclusive end, in milliseconds.
 * @param {boolean} [change.allDay=false] - The event lives in the all-day band.
 * @param {Object} [options]
 * @param {boolean} [options.allDayEndInclusive=true] - Must match what was used to read the payload.
 * @param {string} [options.startProperty='startDate'] - The property the start was read from.
 * @param {string|null} [options.endProperty='endDate'] - The property the end was read from ; `null` for the types that name an instant and no end.
 * @returns {Object} The changed properties, spelled the way they were read.
 *
 * @example
 * // A timed event
 * toSchemaPatch({ start , end })
 * // → { startDate : '2026-08-14T13:15:00.000Z' , endDate : '2026-08-14T15:15:00.000Z' }
 *
 * // An all-day event covering the 10th to the 12th : the exclusive end held
 * // internally is walked back to the day a reader expects.
 * toSchemaPatch({ start , end , allDay : true })
 * // → { startDate : '2026-08-10' , endDate : '2026-08-12' }
 */
export const toSchemaPatch = ( change , options = {} ) =>
{
    // A span is written back **under the properties it was read from**. A lodging
    // booking keeps `checkinTime` / `checkoutTime` ; writing `startDate` onto it
    // would leave two spans in the same object, and the reader would then follow
    // the wrong one — silently, since both are legal.
    const { allDayEndInclusive = true , endProperty = 'endDate' , startProperty = 'startDate' } = options ;
    const { start , end , allDay = false } = change ?? {} ;

    if ( !Number.isFinite( start ) || !Number.isFinite( end ) )
    {
        return {} ;
    }

    // Internally `end` is always exclusive. Under the inclusive reading, the day
    // written back is the last one actually covered — the exact inverse of what
    // `resolveEnd` did on the way in, so a read-then-write round trip is a no-op.
    const writtenEnd = allDay && allDayEndInclusive ? dayjs( end ).subtract( 1 , 'day' ).valueOf() : end ;

    const patch = { [ startProperty ]: toSchemaDate( start , allDay ) } ;

    // A `TaxiReservation` names a pickup and no end : there is no property to
    // write the end to, and inventing one would invent a vocabulary.
    if ( endProperty )
    {
        patch[ endProperty ] = toSchemaDate( Math.max( writtenEnd , start ) , allDay ) ;
    }

    return patch ;
} ;

export default toSchemaPatch ;
