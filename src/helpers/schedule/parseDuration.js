/**
 * Reads a schema.org `duration`, in any of the shapes the property accepts.
 *
 * `Event.duration` and `Schedule.duration` are typed `Duration | QuantitativeValue`
 * in the vocabulary, and the PHP mirror widens that to `int | float | string |
 * Duration | QuantitativeValue`. In practice four shapes reach the browser :
 *
 * - an **ISO 8601 string** — `'PT1H30M'`, the canonical form ;
 * - a **`QuantitativeValue`** — `{ value : 90 , unitCode : 'MIN' }`, with a
 *   UN/CEFACT code ;
 * - a **`Duration` object** carrying the ISO string under `value` or `iso` ;
 * - a **bare number**, which is read as milliseconds — the unit everything else
 *   in this group speaks.
 *
 * @module helpers/schedule/parseDuration
 */

import dayjs from '../date/configureDayjs' ;

const SECOND = 1000 ;
const MINUTE = 60 * SECOND ;
const HOUR   = 60 * MINUTE ;
const DAY    = 24 * HOUR ;

/** UN/CEFACT measure codes for the time units a duration realistically uses. */
const UNIT_CODES =
{
    SEC : SECOND ,
    MIN : MINUTE ,
    HUR : HOUR ,
    DAY : DAY ,
    WEE : 7 * DAY ,
} ;

/** An ISO 8601 duration, in the subset `dayjs.duration` reads back losslessly. */
const ISO_PATTERN = /^-?P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/ ;

/**
 * Parses a duration into milliseconds.
 *
 * Years and months are read through dayjs, which resolves them to their average
 * length — good enough for a duration, which is a length and not a span between
 * two dates.
 *
 * @param {string|number|Object|null|undefined} value
 * @returns {number|null} Milliseconds, or `null` when absent or unreadable.
 *          A zero-length duration returns `0`, which is not the same as `null`.
 *
 * @example
 * parseDuration( 'PT1H30M' )                      // → 5400000
 * parseDuration( { value : 90 , unitCode : 'MIN' } ) // → 5400000
 * parseDuration( 5400000 )                        // → 5400000
 */
export const parseDuration = ( value ) =>
{
    if ( value === null || value === undefined || value === '' )
    {
        return null ;
    }

    if ( typeof value === 'number' )
    {
        return Number.isFinite( value ) ? value : null ;
    }

    if ( typeof value === 'string' )
    {
        const trimmed = value.trim().toUpperCase() ;

        if ( !ISO_PATTERN.test( trimmed ) )
        {
            return null ;
        }

        const ms = dayjs.duration( trimmed ).asMilliseconds() ;
        return Number.isFinite( ms ) ? ms : null ;
    }

    if ( typeof value === 'object' )
    {
        // QuantitativeValue : a number and the unit it is counted in.
        const unit = typeof value.unitCode === 'string' ? UNIT_CODES[ value.unitCode.trim().toUpperCase() ] : undefined ;

        if ( unit !== undefined && Number.isFinite( Number( value.value ) ) )
        {
            return Number( value.value ) * unit ;
        }

        // A Duration object, which carries the ISO string one level down.
        return parseDuration( value.iso ?? value.value ?? null ) ;
    }

    return null ;
} ;

export default parseDuration ;
