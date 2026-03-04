'use client' ;

import { use } from 'react'

import LocaleContext from './context'

/**
 * React hook to get a locale value by path.
 *
 * Shorthand for `useLocale().getLocale( path , defaultValue )`.
 *
 * @param {?string} [path] - Dot notation path to the value.
 * @param {any} [defaultValue={}] - Default value if path not found.
 * @param {boolean} [throwable=true] - Throw if used outside LocaleProvider.
 *
 * @returns {any} The locale value.
 *
 * @throws {Error} If used outside LocaleProvider.
 *
 * @example
 * ```js
 * // Get nested value
 * const title = useI18n( 'page.title' , 'Default' ) ;
 *
 * // Get section
 * const labels = useI18n( 'buttons' ) ;
 * // → { submit: 'Envoyer' , cancel: 'Annuler' }
 *
 * // Get full locale
 * const all = useI18n() ;
 * ```
 */
const useI18n = ( path = null , defaultValue = {} , throwable = true ) =>
{
    const context = use( LocaleContext ) ;

    if ( !context )
    {
        if ( throwable )
        {
            throw new Error( 'useI18n must be used within a LocaleProvider' ) ;
        }
        return defaultValue ;
    }

    return context.getLocale( path , defaultValue ) ;
} ;

export default useI18n ;