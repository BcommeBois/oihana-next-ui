import DEFAULT_LOCALE from './defaultLocale' ;

/**
 * Turns the application's language into the locale its numbers are formatted
 * with.
 *
 * A language code says which words to use ; it does not say how to write a
 * number — `en` alone leaves `Intl` to pick between « 1,234.5 » and the
 * conventions of any English-speaking region. The application names its choice
 * once, in its configuration, at `intl.locales` :
 *
 * ```js
 * { intl : { locales : { fr : 'fr-FR' , en : 'en-GB' } } }
 * ```
 *
 * A language missing from the table is used as it is.
 *
 * Pure, so a Server Component can call it with the language it read from the
 * cookie ; on the client, {@link module:hooks/useNumberFormat} does it for you.
 *
 * @module helpers/numbers/resolveLocale
 *
 * @param {?string}               lang      - The language code (`fr`).
 * @param {?Object<string,string>} [locales] - The language → locale table.
 * @returns {string} The locale to format with.
 *
 * @example
 * ```js
 * resolveLocale( 'en' , { en : 'en-GB' , fr : 'fr-FR' } ) ; // 'en-GB'
 * resolveLocale( 'de' , { en : 'en-GB' , fr : 'fr-FR' } ) ; // 'de'
 * resolveLocale( null ) ;                                   // 'en'
 * ```
 */
const resolveLocale = ( lang , locales ) => locales?.[ lang ] || lang || DEFAULT_LOCALE ;

export default resolveLocale ;
