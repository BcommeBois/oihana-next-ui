'use client' ;

import { useContext } from 'react' ;

import LangContext from './context' ;

/**
 * React hook to access language context.
 *
 * @returns {{
 *   lang: string,
 *   languages: string[],
 *   setLang: (lang: string) => void
 * }}
 *
 * @throws {Error} If used outside LangProvider.
 *
 * @example
 * ```js
 * const { lang , setLang , languages } = useLang() ;
 *
 * // Change language
 * setLang( 'fr' ) ;
 *
 * // Display current
 * <span>{ lang }</span>
 * ```
 */
const useLang = () =>
{
    const context = useContext( LangContext ) ;

    if ( !context )
    {
        throw new Error( 'useLang must be used within a LangProvider' ) ;
    }

    return context ;
} ;

export default useLang ;