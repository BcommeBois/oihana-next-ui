'use client' ;

/**
 * I18nInput — single Input for a multi-language text field.
 *
 * The form field stores its value as a `{ [lang]: string }` map (e.g.
 * `{ fr: '...' , en: '...' }`). The component exposes a `FlagMenu`
 * above a single `Input` ; clicking a flag swaps the input content
 * to the corresponding language. Languages with non-empty content
 * carry a small dot indicator on their flag, so the user sees at a
 * glance which translations are filled and which are not.
 *
 * The input is **a single field for dirty-detection purposes** : the
 * parent form receives one value object via `onChange` and treats it
 * as a whole. Filling `fr` and clearing `en` both produce a single
 * dirty signal.
 *
 * Defaults to the languages exposed by the `useLang` context (the
 * project default is `['fr', 'en']` from `src/@configs/languages.js`)
 * and to the user's current UI language. Both can be overridden via
 * `languages` and `defaultLang` props.
 *
 * Forwards every other prop to oihana-next-ui's `Input` (icon, helper,
 * error, placeholder, color, size, actions, maxLength, transform, …).
 * Note : HTML5 validation props (`required`, `pattern`, `minLength`, …)
 * only apply to the **currently visible language** — use the flag
 * indicators to assess overall completeness.
 *
 * @module components/i18n/I18nInput
 *
 * @example
 * ```jsx
 * const [ title , setTitle ] = useState( { fr : '' , en : '' } ) ;
 *
 * <I18nInput
 *     label       = "Titre"
 *     helper      = "Le titre affiché sur la fiche"
 *     placeholder = "Mon service…"
 *     value       = { title }
 *     onChange    = { setTitle }
 * />
 * ```
 */

import FlagMenu from '../menus/FlagMenu' ;
import Input    from '../inputs/Input' ;

import useI18nField from '../../hooks/useI18nField' ;

/**
 * @typedef {Object<string,string>} I18nValue
 */

/**
 * @param {Object}        props
 * @param {I18nValue}     [props.value]               - Map of `{ lang: text }`.
 * @param {Function}      [props.onChange]            - `(I18nValue) => void`.
 * @param {string}        [props.label]               - Field label, rendered above the flag menu (so the user reads « Titre » → flags → input).
 * @param {string[]}      [props.languages]           - Override the lang list (defaults to `useLang().languages`).
 * @param {string}        [props.defaultLang]         - Initial active language (defaults to `useLang().lang`, then the first available).
 * @param {boolean}       [props.disabled=false]
 * @param {string}        [props.flagMenuClassName]   - Extra classes for the FlagMenu container.
 *
 * Other props are forwarded to oihana-next-ui's `Input`.
 */
const I18nInput =
({
    value = {} ,
    onChange ,
    label ,
    languages : languagesFromProps ,
    defaultLang ,
    disabled = false ,
    flagMenuClassName ,
    ...inputProps
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

            <Input
                disabled = { disabled }
                value    = { currentValue }
                onChange = { handleValueChange }
                { ...inputProps }
            />

        </div>
    ) ;
} ;

I18nInput.displayName = 'I18nInput' ;

export default I18nInput ;
