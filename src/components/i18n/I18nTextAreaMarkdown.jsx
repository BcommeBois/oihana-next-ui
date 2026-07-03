'use client' ;

/**
 * I18nTextAreaMarkdown — single Markdown editor for a multi-language
 * rich-text field.
 *
 * The form field stores its value as a `{ [lang]: string }` map (e.g.
 * `{ fr: '...' , en: '...' }`). The component exposes a `FlagMenu`
 * above a single `TextAreaMarkdown` ; clicking a flag swaps both the
 * editor content **and the Markdown preview** to the corresponding
 * language. Languages with non-empty content carry a small dot
 * indicator on their flag.
 *
 * The editor is **a single field for dirty-detection purposes** : the
 * parent form receives one value object via `onChange` and treats it
 * as a whole.
 *
 * Defaults to the languages exposed by the `useLang` context (the
 * project default is `['fr', 'en']` from `src/@configs/languages.js`)
 * and to the user's current UI language. Both can be overridden via
 * `languages` and `defaultLang` props.
 *
 * Forwards every other prop to oihana-next-ui's `TextAreaMarkdown`
 * (`showPreview`, `previewPosition`, `markdownProps`, helper, error,
 * autosize, minRows, maxRows, placeholder, …).
 *
 * @module components/i18n/I18nTextAreaMarkdown
 *
 * @example
 * ```jsx
 * const [ description , setDescription ] = useState( { fr : '' , en : '' } ) ;
 *
 * <I18nTextAreaMarkdown
 *     label       = "Description"
 *     helper      = "Décrivez votre service en markdown"
 *     value       = { description }
 *     onChange    = { setDescription }
 *     autosize
 *     minRows     = { 4 }
 *     maxRows     = { 10 }
 * />
 * ```
 */

import FlagMenu         from '../menus/FlagMenu' ;
import TextAreaMarkdown from '../inputs/TextAreaMarkdown' ;

import useI18nField from '../../hooks/useI18nField' ;

/**
 * @typedef {Object<string,string>} I18nValue
 */

/**
 * @param {Object}        props
 * @param {I18nValue}     [props.value]               - Map of `{ lang: text }`.
 * @param {Function}      [props.onChange]            - `(I18nValue) => void`.
 * @param {string}        [props.label]               - Field label, rendered above the flag menu (so the user reads « Description » → flags → editor).
 * @param {string[]}      [props.languages]           - Override the lang list (defaults to `useLang().languages`).
 * @param {string}        [props.defaultLang]         - Initial active language (defaults to `useLang().lang`, then the first available).
 * @param {boolean}       [props.disabled=false]
 * @param {string}        [props.flagMenuClassName]   - Extra classes for the FlagMenu container.
 *
 * Other props are forwarded to oihana-next-ui's `TextAreaMarkdown`.
 */
const I18nTextAreaMarkdown =
({
    value = {} ,
    onChange ,
    label ,
    languages : languagesFromProps ,
    defaultLang ,
    disabled = false ,
    flagMenuClassName ,
    ...textAreaMarkdownProps
}) =>
{
    const {
        languages ,
        activeLang ,
        setActiveLang ,
        indicators ,
        currentValue ,
        handleValueChange
    } = useI18nField( { value , onChange , languages : languagesFromProps , defaultLang } ) ;

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
                languages   = { languages }
                onChange    = { setActiveLang }
                showLabel   = { false }
            />

            <TextAreaMarkdown
                disabled = { disabled }
                value    = { currentValue }
                onChange = { handleValueChange }
                { ...textAreaMarkdownProps }
            />

        </div>
    ) ;
} ;

I18nTextAreaMarkdown.displayName = 'I18nTextAreaMarkdown' ;

export default I18nTextAreaMarkdown ;
