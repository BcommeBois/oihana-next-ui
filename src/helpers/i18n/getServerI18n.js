/**
 * Server-side i18n accessor for generateMetadata and Server Components.
 *
 * Reads the language from the same cookie used by LangProvider,
 * then resolves locale values from the config passed to initServerI18n() —
 * without any React context or client-side hooks.
 *
 * @module i18n/getServerI18n
 *
 * @requires initServerI18n called before use (e.g. in layout.js)
 */

import { cookies } from 'next/headers' ;

import get from 'vegas-js-core/src/objects/get';

import { getServerI18nConfig } from './serverI18nConfig';

/**
 * Default cookie key — matches LangProvider storageKey default.
 * @type {string}
 */
export const DEFAULT_STORAGE_KEY = 'lang' ;

/**
 * Resolves the current language from the cookie.
 * Falls back to defaultLang if the cookie is absent or invalid.
 *
 * @param {string} [storageKey='lang'] - Cookie key to read from.
 *
 * @returns {Promise<string>} Resolved language code.
 *
 * @example
 * ```js
 * const lang = await getServerLang() ;
 * // → 'fr'
 *
 * // With custom cookie key
 * const lang = await getServerLang( 'my_lang_key' ) ;
 * ```
 */
export const getServerLang = async ( storageKey = DEFAULT_STORAGE_KEY ) =>
{
    const { defaultLang , languages } = getServerI18nConfig() ;

    const cookieStore = await cookies() ;
    const code        = cookieStore.get( storageKey )?.value ;

    return languages?.includes( code ) ? code : defaultLang ;
} ;

/**
 * Returns a translation function bound to the resolved language.
 *
 * @param {string} [langOverride=null]  - Optional language override (skips cookie read).
 * @param {string} [storageKey='lang']  - Cookie key to read from (ignored if langOverride is set).
 *
 * @returns {Promise<(path?: string, fallback?: any) => any>} Translation function.
 *
 * @example
 * ```js
 * // Auto-detect language from cookie
 * export async function generateMetadata()
 * {
 *     const t = await getServerI18n() ;
 *
 *     return {
 *         title       : t( 'pages.home.meta.title'       , 'Accueil' ) ,
 *         description : t( 'pages.home.meta.description' , ''        ) ,
 *     } ;
 * }
 * ```
 *
 * @example
 * ```js
 * // With explicit lang override (e.g. from route params)
 * export async function generateMetadata({ params })
 * {
 *     const { lang } = await params ;
 *     const t = await getServerI18n( lang ) ;
 *
 *     return { title : t( 'pages.products.meta.title' ) } ;
 * }
 * ```
 *
 * @example
 * ```js
 * // With custom cookie key
 * const t = await getServerI18n( null , 'my_lang_key' ) ;
 * ```
 */
const getServerI18n = async ( langOverride = null , storageKey = DEFAULT_STORAGE_KEY ) =>
{
    const { locale , defaultLang } = getServerI18nConfig() ;

    const lang     = langOverride ?? ( await getServerLang( storageKey ) ) ;
    const langData = locale?.[ lang ] ?? locale?.[ defaultLang ] ?? {} ;

    return ( path, fallback = null ) =>
    {
        if ( !path )
        {
            return langData ;
        }

        return get( langData , path , fallback ) ;
    } ;
} ;

export default getServerI18n ;