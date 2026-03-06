'use client' ;

import { useEffect , useRef } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;

/**
 * Updates document title and meta description on language change.
 * Uses a MutationObserver to re-apply the title after Next.js metadata
 * system overwrites it during hydration.
 *
 * Expects the locale at `path` to contain:
 * ```js
 * {
 *     title       : 'Page Title' ,
 *     description : 'Page description.' ,
 * }
 * ```
 *
 * @module components/i18n/I18nMetas
 *
 * @param {Object} props
 * @param {string} props.path - Dot notation path to the locale object.
 *
 * @returns {null}
 *
 * @example
 * ```jsx
 * <I18nMetas path="app.lab.buttons" />
 * // document.title → "Buttons & Links — MyApp"
 * ```
 */
const I18nMetas = ( { path } ) =>
{
    const { title , description } = useI18n( path , {} ) ;
    const appTitle                = useI18n( 'title' ) ;

    const fullTitle = title && appTitle
                    ? `${ title } — ${ appTitle }`
                    : ( title ?? appTitle ?? '' ) ;

    const fullTitleRef = useRef( fullTitle ) ;

    useEffect( () =>
    {
        fullTitleRef.current = fullTitle ;
    }
    , [ fullTitle ] ) ;

    // Watch for Next.js overwriting document.title and re-apply
    useEffect( () =>
    {
        if ( !fullTitle )
        {
            return ;
        }

        document.title = fullTitle ;

        const titleEl = document.querySelector( 'title' ) ;

        if ( !titleEl )
        {
            return ;
        }

        const observer = new MutationObserver( () =>
        {
            const current = fullTitleRef.current ;

            if ( current && document.title !== current )
            {
                document.title = current ;
            }
        }) ;

        observer.observe( titleEl , { childList : true } ) ;

        return () =>
        {
            observer.disconnect() ;
        } ;
    }
    , [ fullTitle ] ) ;

    // Sync meta description
    useEffect( () =>
    {
        if ( !description )
        {
            return ;
        }

        let meta = document.querySelector( 'meta[name="description"]' ) ;

        if ( !meta )
        {
            meta = document.createElement( 'meta' ) ;
            meta.setAttribute( 'name' , 'description' ) ;
            document.head.appendChild( meta ) ;
        }

        meta.setAttribute( 'content' , description ) ;
    }
    , [ description ] ) ;

    return null ;
} ;

I18nMetas.displayName = 'I18nMetas' ;

export default I18nMetas ;