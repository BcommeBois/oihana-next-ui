/**
 * Server-side i18n configuration store.
 *
 * Initialized once at app startup (layout.js or Application).
 * Decouples getServerI18n from hard-coded import paths.
 *
 * @module i18n/serverI18nConfig
 */

/**
 * @typedef {Object} ServerI18nConfig
 * @property {Object} locale      - Full locale object keyed by language code.
 * @property {string} defaultLang - Fallback language code.
 * @property {string[]} languages - Available language codes.
 * @property {Object} [metadatas] - Static metadata shared across all pages (config.metadatas).
 */

/** @type {ServerI18nConfig | null} */
let _config = null ;

/**
 * Initializes the server i18n configuration.
 * Must be called before any getServerI18n / getServerLang call.
 *
 * @param {ServerI18nConfig} config
 *
 * @example
 * ```js
 * // layout.js (server component)
 * import { initServerI18n } from '@/i18n/serverI18nConfig' ;
 * import locale from '@/@locale' ;
 * import config from '@/@configs' ;
 *
 * initServerI18n({
 *     locale      : locale ,
 *     defaultLang : config.defaultLang ,
 *     languages   : config.languages ,
 * }) ;
 * ```
 */
export const initServerI18n = config =>
{
    _config = config ;
} ;

/**
 * Returns the current server i18n configuration.
 * Throws if initServerI18n has not been called.
 *
 * @returns {ServerI18nConfig}
 * @throws {Error} If not initialized.
 */
export const getServerI18nConfig = () =>
{
    if ( !_config )
    {
        throw new Error( 'Server i18n not initialized — call initServerI18n() in your layout.js.' ) ;
    }

    return _config ;
} ;