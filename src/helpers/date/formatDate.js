import dayjs from './configureDayjs' ;

/**
 * An ISO date, or date and time, carrying neither `Z` nor an offset.
 * @type {RegExp}
 */
const ZONELESS = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/ ;

/**
 * Writes an instant for a reader : a date, or a date and an hour, in a named
 * time zone.
 *
 * 🚨 **Name the time zone.** Without one, the instant is written in the zone of
 * the machine that renders it : the server's on the first render, the
 * browser's on the next. A server running UTC and a reader in Paris then see
 * « 08:32 » and « 10:32 » for the same instant, and React reports the
 * difference as a hydration mismatch. A zone is also a business choice — an
 * appointment at 10 h is at 10 h for every reader, wherever they read from.
 *
 * 🚨 **A string with neither `Z` nor an offset is read IN that zone.** An API
 * may serve a calendar day (`2026-05-31`) or a wall time
 * (`2026-05-31T09:00:00`) with no zone at all. Parsed as usual, dayjs takes it
 * in the zone of the machine : midnight UTC on a server running UTC, midnight
 * in Paris in a Paris browser — two hours apart, one text each, and the same
 * hydration mismatch. With a `timeZone`, such a string is read as a time OF
 * that zone (`dayjs.tz( value , timeZone )`) : the same text on both sides. A
 * value carrying its zone, a timestamp or a `Date` is an instant, and is
 * converted as before.
 *
 * Formatted by dayjs, whose patterns are plain code : the same on the server
 * and in every browser. `Intl.DateTimeFormat` reads its patterns from each
 * engine's own data, which differ between versions.
 *
 * The dayjs locale of `lang` has to be loaded by the application
 * (`import 'dayjs/locale/fr'`) ; an unknown one falls back to English.
 *
 * @module helpers/date/formatDate
 *
 * @param {string|number|Date|dayjs.Dayjs} value - The instant : an ISO-8601 string as served, a timestamp, a `Date`.
 * @param {?string} [lang]    - The dayjs locale (`fr`). Omitted, the global one.
 * @param {Object}  [options]
 * @param {string}  [options.pattern='LL'] - A dayjs pattern : `LL` a date, `LLL` a date and an hour, `DD/MM/YYYY`…
 * @param {string}  [options.timeZone]     - An IANA zone (`Europe/Paris`). Omitted, the machine's own.
 * @returns {?string} The text, or `null` on anything empty or unreadable.
 *
 * @example
 * ```js
 * formatDate( '2026-09-17T08:32:00Z' , 'fr' , { pattern : 'LLL' , timeZone : 'Europe/Paris' } ) ; // '17 septembre 2026 10:32'
 * formatDate( '2026-09-17T08:32:00Z' , 'en' , { timeZone : 'Europe/Paris' } ) ;                   // 'September 17, 2026'
 * formatDate( '2026-05-31' , 'fr' , { pattern : 'L LT' , timeZone : 'Europe/Paris' } ) ;          // '31/05/2026 00:00', on any server
 * formatDate( null , 'fr' ) ;                                                                     // null
 * ```
 */

const formatDate = ( value , lang , { pattern = 'LL' , timeZone } = {} ) =>
{
    if ( value === null || value === undefined || value === '' )
    {
        return null ;
    }

    // Checked first : `dayjs.tz` throws on a string it cannot read.
    if ( !dayjs( value ).isValid() )
    {
        return null ;
    }

    const zoneless = typeof value === 'string' && ZONELESS.test( value.trim() ) ;

    let moment ;

    if ( timeZone )
    {
        // A zoneless string is a time OF the zone ; anything else an instant
        // to convert into it. See the note above.
        moment = zoneless ? dayjs.tz( value.trim() , timeZone ) : dayjs( value ).tz( timeZone ) ;
    }
    else
    {
        moment = dayjs( value ) ;
    }

    if ( lang )
    {
        moment = moment.locale( lang ) ;
    }

    return moment.format( pattern ) ;
} ;

export default formatDate ;
