/**
 * The twelve-month names of a locale, January first.
 *
 * Taken from `Intl` rather than from a translation bundle : twenty-four strings
 * every platform already knows, correctly accented, are not worth maintaining
 * by hand — and an axis needs the SHORT form where a sentence needs the long
 * one, which would double the count again.
 *
 * ### ⚠️ A LOCALE, not a language
 *
 * The region is not decoration here : `en-GB` writes **Sept** where `en` and
 * `en-US` write `Sep`, and `fr-CA` writes **juill.** where `fr-FR` writes
 * `juil.`. An application that names its locales — `{ fr : 'fr-FR' , en :
 * 'en-GB' }` is a common table — must hand the resolved locale over, or its
 * axes change spelling. {@link module:helpers/numbers/resolveLocale} does that
 * resolution.
 *
 * ### 🚨 Formatted on a FIXED date, never on today
 *
 * Each name is read from day 15 of a month of a fixed, non-leap year in UTC.
 * Formatting « now » would make the result depend on when the page renders, and
 * a server and a browser disagreeing on a month name hydrate as a mismatch. Day
 * 15 also never rolls into a neighboring month, whatever time zone the runtime
 * carries.
 *
 * @module helpers/date/monthNames
 *
 * @param {string} [locale='en'] - A BCP 47 tag. A bare language works, and takes whatever region `Intl` picks for it.
 * @param {'long'|'short'|'narrow'|'numeric'|'2-digit'} [style='long'] - What `Intl.DateTimeFormat` calls `month`.
 *
 * @returns {string[]} Twelve names, january first.
 *
 * @example
 * ```js
 * monthNames( 'fr-FR' )            [ 0 ] ; // 'janvier'
 * monthNames( 'fr-FR' , 'short'  ) [ 6 ] ; // 'juil.'
 * monthNames( 'en-GB' , 'short'  ) [ 8 ] ; // 'Sept'
 * monthNames( 'en-US' , 'short'  ) [ 8 ] ; // 'Sep'
 * monthNames( 'en'    , 'narrow' ) [ 0 ] ; // 'J'
 * ```
 */

/**
 * Memoized per `locale:style` : one-page asks for the same list many times. @type {Map<string,string[]>}
 */
const cache = new Map() ;

/**
 * The year the names are read from : fixed, non-leap, and long past. @type {number}
 */
const REFERENCE_YEAR = 2021 ;

/**
 *  The day of the month they are read on : far from either edge. @type {number}
 */
const REFERENCE_DAY = 15 ;

const monthNames = ( locale = 'en' , style = 'long' ) =>
{
    const key = `${ locale }:${ style }` ;

    let names = cache.get( key ) ;

    if ( !names )
    {
        const formatter = new Intl.DateTimeFormat( locale , { month : style , timeZone : 'UTC' } ) ;

        names = Array.from( { length : 12 } , ( _ , index ) =>
            formatter.format( new Date( Date.UTC( REFERENCE_YEAR , index , REFERENCE_DAY ) ) ) ) ;

        cache.set( key , names ) ;
    }

    return names ;
} ;

export default monthNames ;
