import DEFAULT_LOCALE from './defaultLocale' ;

/**
 * Returns an `Intl.NumberFormat`, built once per locale and options.
 *
 * Building one is expensive, and a chart axis or a long table would otherwise
 * build one per cell. The cache is keyed on the locale and the options as
 * given, so two calls asking the same thing share one formatter.
 *
 * The locale is always named : an empty one falls back to
 * {@link module:helpers/numbers/defaultLocale}, never to the runtime's own,
 * which differs between the server and the browser.
 *
 * @module helpers/numbers/getNumberFormat
 *
 * @param {?string}                  locale    - A BCP 47 tag (`fr-FR`) or a language code (`fr`).
 * @param {Intl.NumberFormatOptions} [options] - Passed to `Intl.NumberFormat` as they are.
 * @returns {Intl.NumberFormat}
 *
 * @example
 * ```js
 * getNumberFormat( 'fr-FR' , { style : 'currency' , currency : 'EUR' } ).format( 12.5 ) ; // '12,50 €'
 * ```
 */
const getNumberFormat = ( locale , options = {} ) =>
{
    const tag = locale || DEFAULT_LOCALE ;
    const key = `${ tag }|${ JSON.stringify( options ) }` ;

    let formatter = cache.get( key ) ;

    if ( !formatter )
    {
        formatter = new Intl.NumberFormat( tag , options ) ;
        cache.set( key , formatter ) ;
    }

    return formatter ;
} ;

/**
 * The formatters already built, by locale and options.
 * @type {Map<string,Intl.NumberFormat>}
 */
const cache = new Map() ;

export default getNumberFormat ;
