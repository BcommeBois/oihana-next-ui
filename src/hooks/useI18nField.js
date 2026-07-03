'use client' ;

/**
 * useI18nField — shared logic for multi-language form fields.
 *
 * A multi-language field stores its value as a `{ [lang]: string }` map
 * (e.g. `{ fr : '...' , en : '...' }`) and exposes a `FlagMenu` to swap
 * the visible language. This hook centralises the common plumbing used
 * by `I18nInput`, `I18nTextArea`, … :
 *
 *  - resolves the language list (props → `useLang` context → `['fr','en']`) ;
 *  - resolves the initial active language (`defaultLang` → current UI lang → first) ;
 *  - computes the per-language "filled" indicators for the `FlagMenu` ;
 *  - extracts the text of the active language from the value map ;
 *  - merges an edit back into the map (`{ ...value , [activeLang] : text }`).
 *
 * The change handler accepts either a raw value or a DOM change event, so
 * it can be plugged directly on any field component (`Input` emits raw
 * values via `useTransformValue`, a native `<textarea>` emits events).
 *
 * @module hooks/useI18nField
 *
 * @param {Object}                 options
 * @param {Object<string,string>}  [options.value]       - Map of `{ lang: text }`.
 * @param {Function}               [options.onChange]    - `(nextValue) => void`, receives the whole updated map.
 * @param {string[]}               [options.languages]   - Override the lang list (defaults to `useLang().languages`).
 * @param {string}                 [options.defaultLang] - Initial active language (defaults to `useLang().lang`, then the first available).
 *
 * @returns {{
 *     languages         : string[] ,
 *     activeLang        : string ,
 *     setActiveLang     : Function ,
 *     indicators        : Object<string,boolean> ,
 *     currentValue      : string ,
 *     handleValueChange : Function
 * }}
 *
 * @example
 * ```jsx
 * const { languages , activeLang , setActiveLang , indicators , currentValue , handleValueChange }
 *     = useI18nField( { value , onChange , languages : languagesFromProps , defaultLang } ) ;
 * ```
 */

import { useMemo , useState } from 'react' ;

import useLang from '../contexts/lang/useLang' ;

const useI18nField =
({
    value = {} ,
    onChange ,
    languages : languagesFromProps ,
    defaultLang
}) =>
{
    const { lang : uiLang , languages : ctxLanguages } = useLang() ?? {} ;

    const languages = ( languagesFromProps && languagesFromProps.length > 0 )
                    ? languagesFromProps
                    : ( Array.isArray( ctxLanguages ) && ctxLanguages.length > 0 ? ctxLanguages : [ 'fr' , 'en' ] ) ;

    const initialLang = useMemo( () =>
    {
        if ( defaultLang && languages.includes( defaultLang ) ) { return defaultLang ; }

        if ( uiLang && languages.includes( uiLang ) )
        {
            return uiLang ;
        }

        return languages[ 0 ] ;
    }
    , [ defaultLang , uiLang , languages ] ) ;

    const [ activeLang , setActiveLang ] = useState( initialLang ) ;

    const indicators = useMemo( () =>
    {
        const map = {} ;
        for ( const code of languages )
        {
            map[ code ] = ( value?.[ code ] ?? '' ).trim().length > 0 ;
        }
        return map ;
    } , [ value , languages ] ) ;

    const currentValue = value?.[ activeLang ] ?? '' ;

    const handleValueChange = next =>
    {
        const event = next?.target ;
        const text  = event ? event.value : next ;
        onChange?.( { ...value , [ activeLang ] : text ?? '' } ) ;
    } ;

    return { languages , activeLang , setActiveLang , indicators , currentValue , handleValueChange } ;
} ;

export default useI18nField ;
