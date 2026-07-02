'use client' ;

/**
 * I18nTextArea — single TextArea for a multi-language text field.
 *
 * The form field stores its value as a `{ [lang]: string }` map (e.g.
 * `{ fr: '...' , en: '...' }`). The component exposes a `FlagMenu`
 * above a single `TextArea` ; clicking a flag swaps the textarea
 * content to the corresponding language. Languages with non-empty
 * content carry a small dot indicator on their flag, so the user
 * sees at a glance which translations are filled and which are not.
 *
 * The textarea is **a single field for dirty-detection purposes** :
 * the parent form receives one value object via `onChange` and treats
 * it as a whole. Filling `fr` and clearing `en` both produce a single
 * dirty signal.
 *
 * Defaults to the languages exposed by the `useLang` context (the
 * project default is `['fr', 'en']` from `src/@configs/languages.js`)
 * and to the user's current UI language. Both can be overridden via
 * `languages` and `defaultLang` props.
 *
 * Forwards every other prop to oihana-next-ui's `TextArea` (label,
 * helper, error, autosize, minRows, maxRows, placeholder, disabled,
 * required, …).
 *
 * @example
 * ```jsx
 * const [ description , setDescription ] = useState( { fr : '' , en : '' } ) ;
 *
 * <I18nTextArea
 *     label    = "Description"
 *     helper   = "Décrivez votre service"
 *     value    = { description }
 *     onChange = { setDescription }
 *     autosize
 *     minRows  = { 2 }
 *     maxRows  = { 5 }
 * />
 * ```
 */

import { useMemo , useState } from 'react' ;

import FlagMenu from '../menus/FlagMenu' ;
import TextArea from '../inputs/TextArea' ;

import useLang from '../../contexts/lang/useLang' ;

/**
 * @typedef {Object<string,string>} I18nValue
 */

/**
 * @param {Object}        props
 * @param {I18nValue}     [props.value]               - Map of `{ lang: text }`.
 * @param {Function}      [props.onChange]            - `(I18nValue) => void`.
 * @param {string}        [props.label]               - Field label, rendered above the flag menu (so the user reads « Description » → flags → textarea).
 * @param {string[]}      [props.languages]           - Override the lang list (defaults to `useLang().languages`).
 * @param {string}        [props.defaultLang]         - Initial active language (defaults to `useLang().lang`, then the first available).
 * @param {boolean}       [props.disabled=false]
 * @param {string}        [props.flagMenuClassName]   - Extra classes for the FlagMenu container.
 *
 * Other props are forwarded to oihana-next-ui's `TextArea`.
 */
const I18nTextArea =
({
    value = {} ,
    onChange ,
    label ,
    languages : languagesFromProps ,
    defaultLang ,
    disabled = false ,
    flagMenuClassName ,
    ...textAreaProps
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

    const currentText = value?.[ activeLang ] ?? '' ;

    const handleTextChange = next =>
    {
        const event = next?.target ;
        const text  = event ? event.value : next ;
        onChange?.( { ...value , [ activeLang ] : text ?? '' } ) ;
    } ;

    return (
        <div className="flex flex-col gap-1.5">

            { label && (
                <span className="label py-1 px-0 text-sm font-medium">
                    { label }
                </span>
            ) }

            <FlagMenu
                className   = { flagMenuClassName }
                disabled    = { disabled }
                indicators  = { indicators }
                lang        = { activeLang }
                onChange    = { setActiveLang }
                showLabel   = { false }
            />

            <TextArea
                disabled = { disabled }
                value    = { currentText }
                onChange = { handleTextChange }
                { ...textAreaProps }
            />

        </div>
    ) ;
} ;

I18nTextArea.displayName = 'I18nTextArea' ;

export default I18nTextArea ;
