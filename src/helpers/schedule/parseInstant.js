/**
 * Reads a schema.org date value, and says whether it carried a time.
 *
 * `startDate`, `endDate`, `exceptDate` and `previousStartDate` all accept
 * `Date` **or** `DateTime` on the *same* property. The two mean very different
 * things — `"2026-08-14"` is a day, `"2026-08-14T09:00:00Z"` is an instant —
 * and nothing but the shape of the string tells them apart. That distinction is
 * the whole all-day signal, so it is reported rather than flattened.
 *
 * The parsing is deliberately not `new Date( value )` : that constructor reads a
 * bare `"2026-08-14"` as **UTC** midnight and a `"2026-08-14T09:00"` as **local**
 * time, so a mixed payload would drift by the timezone offset on half its rows.
 * dayjs reads both in local time, which is what a calendar grid draws.
 *
 * @module helpers/schedule/parseInstant
 */

import dayjs from '../date/configureDayjs' ;

/** A calendar date with no time component — the all-day spelling. */
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/ ;

/**
 * @typedef {Object} Instant
 * @property {number}  ms       - Milliseconds since the epoch.
 * @property {boolean} dateOnly - The source carried no time component.
 */

/**
 * Parses a schema.org `Date` or `DateTime` value.
 *
 * @param {string|number|Date|null|undefined} value
 * @returns {Instant|null} `null` when the value is absent or unreadable.
 *
 * @example
 * parseInstant( '2026-08-14' )            // → { ms : … , dateOnly : true  }
 * parseInstant( '2026-08-14T09:00:00Z' )  // → { ms : … , dateOnly : false }
 * parseInstant( new Date() )              // → { ms : … , dateOnly : false }
 */
export const parseInstant = ( value ) =>
{
    if ( value === null || value === undefined || value === '' )
    {
        return null ;
    }

    if ( value instanceof Date )
    {
        const ms = value.getTime() ;
        return Number.isNaN( ms ) ? null : { ms , dateOnly : false } ;
    }

    if ( typeof value === 'number' )
    {
        return Number.isFinite( value ) ? { ms : value , dateOnly : false } : null ;
    }

    if ( typeof value !== 'string' )
    {
        return null ;
    }

    const trimmed  = value.trim() ;
    const dateOnly = DATE_ONLY_PATTERN.test( trimmed ) ;
    const parsed   = dayjs( trimmed ) ;

    return parsed.isValid() ? { ms : parsed.valueOf() , dateOnly } : null ;
} ;

/**
 * Milliseconds of the local midnight opening the day a given instant falls in.
 *
 * @param {number} ms
 * @returns {number}
 */
export const startOfDay = ( ms ) => dayjs( ms ).startOf( 'day' ).valueOf() ;

/**
 * Adds a `HH:MM` / `HH:MM:SS` time of day to a day.
 *
 * `Schedule.startTime` and `Schedule.endTime` carry the time of each occurrence,
 * while `startDate` / `endDate` bound the validity of the rule itself.
 *
 * @param {number} dayMs - Any instant within the target day.
 * @param {string|null|undefined} time - `'08:00'`, `'08:00:00'` — or absent.
 * @returns {number|null} The instant, or `null` when no time was given.
 *
 * @example
 * atTimeOfDay( day , '18:30' ) // → the day at 18:30, local
 */
export const atTimeOfDay = ( dayMs , time ) =>
{
    if ( typeof time !== 'string' )
    {
        return null ;
    }

    const parts = time.trim().split( ':' ) ;

    if ( parts.length < 2 )
    {
        return null ;
    }

    const hour   = Number( parts[ 0 ] ) ;
    const minute = Number( parts[ 1 ] ) ;
    const second = parts.length > 2 ? Number( parts[ 2 ] ) : 0 ;

    if ( !Number.isFinite( hour ) || !Number.isFinite( minute ) || !Number.isFinite( second ) )
    {
        return null ;
    }

    return dayjs( dayMs ).startOf( 'day' ).add( hour , 'hour' ).add( minute , 'minute' ).add( second , 'second' ).valueOf() ;
} ;

export default parseInstant ;
