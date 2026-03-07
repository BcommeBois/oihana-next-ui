'use client' ;

import { useCallback , useEffect , useSyncExternalStore } from 'react' ;

import dayjs from 'dayjs' ;

import LangContext from './context' ;

import readStorage      from '../../helpers/storage/readStorage'
import setCookie        from '../../helpers/storage/setCookie'
import subscribeStorage from '../../helpers/storage/subscribeStorage'
import writeStorage     from '../../helpers/storage/writeStorage'

/**
 * Provides language context with locale persistence.
 *
 * Uses a cookie + `useSyncExternalStore` to avoid both hydration
 * mismatch and flash of default language: the server reads the
 * cookie via `initialLang` and renders the correct locale immediately.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} props.defaultLang - Fallback language code.
 * @param {string} props.initialLang - Language resolved server-side (from cookie).
 * @param {string[]} props.languages - Available language codes.
 * @param {string} [props.storageKey='lang'] - LocalStorage / cookie key.
 */
const LangProvider =
({
    children ,
    defaultLang ,
    initialLang ,
    languages ,
    storageKey = 'lang' ,
}) =>
{
    const isValidLang = code => languages?.includes( code ) ;

    const serverLang = isValidLang( initialLang ) ? initialLang : defaultLang ;

    const subscribe = useCallback( subscribeStorage , [] ) ;

    const getSnapshot = useCallback( () =>
    {
        const stored = readStorage( storageKey ) ;
        return isValidLang( stored ) ? stored : serverLang ;
    }
    , [ storageKey , serverLang , languages ] ) ;

    const getServerSnapshot = useCallback( () => serverLang , [ serverLang ] ) ;

    const lang = useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

    dayjs.locale( lang ) ;

    const setLang = useCallback( ( code ) =>
    {
        if ( isValidLang( code ) )
        {
            writeStorage( storageKey , code ) ;
        }
    }
    , [ storageKey , languages ] ) ;

    // Sync localStorage ↔ cookie on mount
    useEffect( () =>
    {
        const stored = readStorage( storageKey ) ;
        if ( isValidLang( stored ) )
        {
            setCookie( storageKey , stored ) ;
        }
        else
        {
            writeStorage( storageKey , serverLang ) ;
        }
    }
    , [ storageKey , serverLang , languages ] ) ;

    // Sync dayjs locale
    useEffect( () =>
    {
        dayjs.locale( lang ) ;
    }
    , [ lang ] ) ;

    return (
        <LangContext value={ { lang , languages , setLang } }>
            { children }
        </LangContext>
    ) ;
} ;

export default LangProvider ;