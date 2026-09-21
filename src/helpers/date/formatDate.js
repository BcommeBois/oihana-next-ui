import dayjs from './configureDayjs' ;

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
 * formatDate( null , 'fr' ) ;                                                                     // null
 * ```
 */
const formatDate = ( value , lang , { pattern = 'LL' , timeZone } = {} ) =>
{
    if ( value === null || value === undefined || value === '' )
    {
        return null ;
    }

    let moment = dayjs( value ) ;

    if ( !moment.isValid() )
    {
        return null ;
    }

    if ( timeZone )
    {
        moment = moment.tz( timeZone ) ;
    }

    if ( lang )
    {
        moment = moment.locale( lang ) ;
    }

    return moment.format( pattern ) ;
} ;

export default formatDate ;
