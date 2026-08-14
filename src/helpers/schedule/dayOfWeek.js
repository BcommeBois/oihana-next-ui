/**
 * The `DayOfWeek` vocabulary of schema.org, reduced to plain weekday numbers.
 *
 * A day of the week is spelled three ways in the wild, and a payload commonly
 * mixes them :
 *
 * - a **GoodRelations URI** — `http://purl.org/goodrelations/v1#Tuesday`, the
 *   historical form, still the one schema.org documents and the one the PHP
 *   `DayOfWeek` enumeration emits ;
 * - a **schema.org URI** — `https://schema.org/Tuesday` ;
 * - **iCal text** — `TU`, or `2TU` for the second Tuesday of the month, which
 *   `Schedule.byDay` explicitly allows.
 *
 * All three reduce to the same thing here : a dayjs weekday number (0 = Sunday)
 * and, for the iCal form only, an ordinal. The final conversion is delegated to
 * {@link module:helpers/date/weekdays.normalizeWeekday} — the URI fragment
 * (`'Tuesday'`) already matches the three-letter prefix it expects, so the
 * vocabulary stays here and the weekday arithmetic stays there.
 *
 * `PublicHolidays` is the trap : it is a perfectly legal `DayOfWeek` value in
 * both vocabularies, and it is **not** a weekday. It is reported by
 * {@link isPublicHolidays} rather than silently mapped to a number.
 *
 * @module helpers/schedule/dayOfWeek
 */

import { normalizeWeekday } from '../date/weekdays' ;

import { fragmentOf } from './fragmentOf' ;

/** The `DayOfWeek` member that designates public holidays rather than a weekday. */
export const PUBLIC_HOLIDAYS = 'PublicHolidays' ;

/** iCal two-letter weekday codes → dayjs weekday number. */
const ICAL_DAYS = { su : 0 , mo : 1 , tu : 2 , we : 3 , th : 4 , fr : 5 , sa : 6 } ;

/** An iCal `byDay` token : an optional signed ordinal followed by a two-letter code. */
const ICAL_PATTERN = /^([+-]?\d{1,2})?([A-Za-z]{2})$/ ;

/** Values already reported as unusable, so a re-render does not warn twice. */
const warned = new Set() ;

const warnOnce = ( value , message ) =>
{
    if ( process.env.NODE_ENV !== 'development' || warned.has( value ) )
    {
        return ;
    }
    warned.add( value ) ;
    console.warn( `helpers/schedule/dayOfWeek: ${ message }` , value ) ;
} ;

/**
 * Whether a value designates public holidays rather than a day of the week.
 *
 * @param {*} value - A `DayOfWeek` value, in any of the three spellings.
 * @returns {boolean}
 *
 * @example
 * isPublicHolidays( 'http://purl.org/goodrelations/v1#PublicHolidays' ) // → true
 * isPublicHolidays( 'https://schema.org/Tuesday' )                      // → false
 */
export const isPublicHolidays = ( value ) => fragmentOf( value )?.toLowerCase() === PUBLIC_HOLIDAYS.toLowerCase() ;

/**
 * Parses one `DayOfWeek` value.
 *
 * @param {*} value - A URI, a day name or an iCal token.
 * @returns {{ day: number, ordinal: number|null }|null} The weekday number
 *          (0 = Sunday) and the iCal ordinal when there is one, or `null` when
 *          the value is not a weekday — public holidays included.
 *
 * @example
 * parseDayOfWeek( 'http://purl.org/goodrelations/v1#Tuesday' ) // → { day : 2 , ordinal : null }
 * parseDayOfWeek( '2TU' )                                      // → { day : 2 , ordinal : 2 }
 * parseDayOfWeek( 'https://schema.org/PublicHolidays' )         // → null
 */
export const parseDayOfWeek = ( value ) =>
{
    if ( typeof value === 'number' )
    {
        const day = normalizeWeekday( value ) ;
        return day === null ? null : { day , ordinal : null } ;
    }

    const fragment = fragmentOf( value ) ;

    if ( fragment === null || isPublicHolidays( value ) )
    {
        return null ;
    }

    // Day names, from either vocabulary : 'Tuesday' → 'tue' → 2.
    const named = normalizeWeekday( fragment ) ;

    if ( named !== null )
    {
        return { day : named , ordinal : null } ;
    }

    // iCal text : 'TU', '2TU', '-1FR'.
    const match = ICAL_PATTERN.exec( fragment ) ;
    const code  = match?.[ 2 ]?.toLowerCase() ;

    if ( code !== undefined && code in ICAL_DAYS )
    {
        const ordinal = match[ 1 ] === undefined ? null : Number( match[ 1 ] ) ;
        return { day : ICAL_DAYS[ code ] , ordinal : ordinal === 0 ? null : ordinal } ;
    }

    return null ;
} ;

/**
 * Parses a whole `byDay` value — a scalar or an array, mixing spellings.
 *
 * Unrecognised entries are dropped rather than throwing, so one typo never
 * blocks a whole schedule. Public holidays are dropped too, but they warn in
 * development : a schedule that runs on holidays is saying something the
 * component cannot render on its own, and it should not disappear in silence.
 *
 * An **empty array is meaningful** and is returned as such : a series that is
 * defined but scheduled on no day at all is not the same thing as a series
 * whose days were never stated (`null` / `undefined`), which returns `null`.
 *
 * @param {*} value - The `byDay` property.
 * @returns {Array<{day: number, ordinal: number|null}>|null} The parsed days,
 *          or `null` when nothing was said.
 *
 * @example
 * normalizeDaysOfWeek([ '…#Tuesday' , '…#Thursday' ]) // → [ { day : 2 , … } , { day : 4 , … } ]
 * normalizeDaysOfWeek([])                             // → []   (defined, runs no day)
 * normalizeDaysOfWeek( undefined )                    // → null (nothing was said)
 */
export const normalizeDaysOfWeek = ( value ) =>
{
    if ( value === null || value === undefined )
    {
        return null ;
    }

    const items = Array.isArray( value ) ? value : [ value ] ;
    const days  = [] ;

    for ( const item of items )
    {
        const parsed = parseDayOfWeek( item ) ;

        if ( parsed !== null )
        {
            days.push( parsed ) ;
            continue ;
        }

        if ( isPublicHolidays( item ) )
        {
            warnOnce( item , 'PublicHolidays is a DayOfWeek member but not a weekday — the occurrence was dropped. Resolve it against a holiday calendar before expanding.' ) ;
        }
        else
        {
            warnOnce( item , 'unrecognised DayOfWeek value — dropped.' ) ;
        }
    }

    return days ;
} ;

export default parseDayOfWeek ;
