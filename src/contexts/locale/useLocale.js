'use client' ;

import { useContext } from 'react'

import LocaleContext from './context'

/**
 * React hook to access locale context.
 *
 * @returns {{
 *   locale: Object,
 *   getLocale: (path?: string, defaultValue?: any) => any,
 *   setLocale: (value: Object | string) => void
 * }}
 *
 * @throws {Error} If used outside LocaleProvider.
 *
 * @example
 * ```js
 * const { locale , getLocale , setLocale } = useLocale() ;
 *
 * // Get nested value
 * const title = getLocale( 'page.title' , 'Default Title' ) ;
 *
 * // Get full locale
 * console.log( locale ) ;
 * ```
 */
const useLocale = () =>
{
    const context = useContext( LocaleContext ) ;

    if ( !context )
    {
        throw new Error( 'useLocale must be used within a LocaleProvider' ) ;
    }

    return context ;
} ;

export default useLocale ;