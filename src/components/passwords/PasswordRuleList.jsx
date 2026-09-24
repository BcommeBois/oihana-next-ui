'use client' ;

/**
 * PasswordRuleList — the checklist under a password field : one line per
 * complexity rule, ticked as the rule is satisfied, plus an optional
 * « both passwords match » line when a confirm field is in play.
 *
 * It renders NOTHING while the field is empty, so a form stays compact until
 * a reader starts typing.
 *
 * 🔑 **It pairs with {@link module:components/passwords/PasswordStrengthBar}** :
 * the bar says how far, this says what is missing. Give them the same `path`
 * — they read the same bundle and recompute from the same string.
 *
 * 🚨 **Four of the five lines are always shown**, even to a host that does not
 * require them : the rules come from
 * {@link module:helpers/passwords/evaluatePassword}, which answers all five.
 * A host whose policy ignores symbols says so in its own copy — « Un
 * caractère spécial (recommandé) » — rather than hiding a line, because a
 * reader who satisfies a hidden rule still deserves to see it tick.
 *
 * The bundle is read leaf by leaf, each with an English fallback, so the
 * component renders on its own outside any `LocaleProvider` :
 *
 * ```jsonc
 * {
 *   "rules" : {
 *     "heading"   : "…" ,   // optional — the line is dropped when absent
 *     "length"    : "…" ,   // may carry a {0} placeholder for minLength
 *     "uppercase" : "…" , "lowercase" : "…" ,
 *     "digit"     : "…" , "symbol"    : "…" , "match" : "…"
 *   }
 * }
 * ```
 *
 * @module components/passwords/PasswordRuleList
 *
 * @example
 * ```jsx
 * <PasswordRuleList password={ password } matches={ password === confirm } />
 *
 * // Without a confirm field, omit `matches` and the line is not rendered :
 * <PasswordRuleList password={ password } minLength={ 12 } />
 * ```
 */

import { useMemo } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import evaluatePassword from '../../helpers/passwords/evaluatePassword' ;

import { DEFAULT_PASSWORD_MIN_LENGTH } from '../../helpers/passwords/passwordStrengthLevels' ;

import { PASSWORD_I18N_PATH } from './passwordI18n' ;

import cn from '../../themes/helpers/cn' ;

/**
 * What the lines read when no bundle answers.
 * @type {Object.<string,string>}
 */
const RULE_FALLBACK =
{
    length    : 'At least {0} characters' ,
    uppercase : 'One uppercase letter' ,
    lowercase : 'One lowercase letter' ,
    digit     : 'One digit' ,
    symbol    : 'One special character' ,
    match     : 'Both passwords match' ,
} ;

/**
 * One line of the checklist.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.label - What the rule asks for.
 * @param {boolean}         props.ok    - Whether it is satisfied.
 */
const RuleItem = ( { label , ok } ) =>
(
    <li className={ cn( 'flex items-center gap-2' , ok ? 'text-success' : 'text-base-content/60' ) }>
        <span aria-hidden="true">{ ok ? '✓' : '○' }</span>
        <span>{ label }</span>
    </li>
) ;

/**
 * @param {Object}  props
 * @param {string}  [props.className]    - Additional class names for the list.
 * @param {boolean} [props.matches]      - Whether the confirm field matches. Omitted, the « match » line is not rendered.
 * @param {number}  [props.minLength=8]  - Characters the length rule asks for ; fills the `{0}` of its label.
 * @param {string}  [props.password='']  - The raw value — the rules are computed here.
 * @param {string}  [props.path='components.input.password'] - i18n path holding a `rules` map.
 */
const PasswordRuleList =
({
    className ,
    matches ,
    minLength = DEFAULT_PASSWORD_MIN_LENGTH ,
    password  = '' ,
    path      = PASSWORD_I18N_PATH ,
}) =>
{
    const { rules : ruleCopy = {} } = useI18n( path , NO_LOCALE , false ) ;

    const rules = useMemo( () => evaluatePassword( password , { minLength } ) , [ password , minLength ] ) ;

    if ( password.length === 0 ) { return null ; }

    const showMatch = typeof matches === 'boolean' ;

    return (
        <ul className={ cn( 'text-sm flex flex-col gap-1' , className ) }>
            { ruleCopy.heading && (
                <li className="text-base-content/70 mb-1">{ ruleCopy.heading }</li>
            ) }
            <RuleItem ok={ rules.length    } label={ format( ruleCopy.length ?? RULE_FALLBACK.length , minLength ) } />
            <RuleItem ok={ rules.uppercase } label={ ruleCopy.uppercase ?? RULE_FALLBACK.uppercase } />
            <RuleItem ok={ rules.lowercase } label={ ruleCopy.lowercase ?? RULE_FALLBACK.lowercase } />
            <RuleItem ok={ rules.digit     } label={ ruleCopy.digit     ?? RULE_FALLBACK.digit     } />
            <RuleItem ok={ rules.symbol    } label={ ruleCopy.symbol    ?? RULE_FALLBACK.symbol    } />
            { showMatch && (
                <RuleItem ok={ matches } label={ ruleCopy.match ?? RULE_FALLBACK.match } />
            ) }
        </ul>
    ) ;
} ;

PasswordRuleList.displayName = 'PasswordRuleList' ;

export default PasswordRuleList ;
