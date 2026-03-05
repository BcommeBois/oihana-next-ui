'use client' ;

import { useEffect , useState } from 'react' ;

import get from 'vegas-js-core/src/objects/get' ;

import useLang from '../lang/useLang' ;

import LocaleContext from './context' ;

/**
 * Split mode - separate objects per language.
 * @type {string}
 */
export const SPLIT = 'split' ;

/**
 * Merge mode - nested language keys in one object.
 * @type {string}
 */
export const MERGE = 'merge' ;

/**
 * @typedef {'split' | 'merge'} LocaleMode
 */

/**
 * Provides locale context for i18n data access.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} props.defaultLang - Default language code.
 * @param {Object} props.i18n - Internationalization data.
 * @param {LocaleMode} [props.mode='split'] - Locale data mode.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // Split mode - separate objects per language
 * const i18n =
 * {
 *     fr : { title: 'Bonjour' } ,
 *     en : { title: 'Hello' }
 * } ;
 *
 * <LocaleProvider i18n={ i18n } defaultLang="fr" mode="split">
 *     { children }
 * </LocaleProvider>
 * ```
 *
 * @example
 * ```jsx
 * // Merge mode - nested language keys
 * const i18n =
 * {
 *     title : { fr: 'Bonjour' , en: 'Hello' }
 * } ;
 *
 * <LocaleProvider i18n={ i18n } defaultLang="fr" mode="merge">
 *     { children }
 * </LocaleProvider>
 * ```
 */
const LocaleProvider =
({
    children ,
    defaultLang ,
    i18n ,
    mode = SPLIT ,
}) =>
{
    const { lang } = useLang() ;

    const getInitialLocale = () =>
    {
        if ( mode === SPLIT )
        {
            return i18n?.[ defaultLang ] ?? {} ;
        }
        return i18n ?? {} ;
    } ;

    const [ locale , _setLocale ] = useState( getInitialLocale ) ;

    // Sync locale when language changes (split mode only)
    useEffect( () =>
    {
        if ( mode === SPLIT )
        {
            _setLocale( i18n?.[ lang ?? defaultLang ] ?? {} ) ;
        }
    }
    , [ defaultLang , i18n , lang , mode ] ) ;

    const getLocale = ( path = null , defaultValue ) =>
    {
        if ( !path )
        {
            return locale ?? defaultValue ;
        }

        const value = get( locale , path , defaultValue ) ;

        if ( mode === MERGE )
        {
            return value?.[ lang ] ?? value ;
        }

        return value ;
    } ;

    const setLocale = ( value ) =>
    {
        if ( mode === SPLIT )
        {
            _setLocale( i18n?.[ value ] ?? {} ) ;
        }
        else
        {
            _setLocale( value ?? {} ) ;
        }
    } ;

    return (
        <LocaleContext value={ { locale , getLocale , setLocale } }>
            { children }
        </LocaleContext>
    ) ;
} ;

export default LocaleProvider ;