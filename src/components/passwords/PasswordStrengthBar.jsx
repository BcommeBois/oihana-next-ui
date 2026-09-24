'use client' ;

/**
 * PasswordStrengthBar — a thin coloured bar and a word, under a password
 * field, saying how far a password is from satisfying the five complexity
 * rules.
 *
 * It renders NOTHING while the field is empty : a form that opens with a red
 * bar and « Faible » under an untouched field tells a reader they did
 * something wrong before they typed a character.
 *
 * 🔑 **It pairs with {@link module:components/passwords/PasswordRuleList}**,
 * and the pair is what makes the bar readable : the bar says how far, the
 * checklist says what is missing. A meter on its own leaves a reader adding
 * characters at random until the colour changes.
 *
 * Both read the same bundle — give them the same `path` — and both recompute
 * from the same string, so neither holds state the other could contradict.
 *
 * @module components/passwords/PasswordStrengthBar
 *
 * @example
 * ```jsx
 * const [ password , setPassword ] = useState( '' ) ;
 *
 * <InputPassword value={ password } onChange={ setPassword } />
 * <PasswordStrengthBar password={ password } />
 * ```
 */

import { useMemo } from 'react' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import computePasswordStrength from '../../helpers/passwords/computePasswordStrength' ;
import evaluatePassword        from '../../helpers/passwords/evaluatePassword' ;

import {
    DEFAULT_PASSWORD_MIN_LENGTH ,
    PASSWORD_RULES_COUNT ,
    STRENGTH_BAR_COLOR ,
} from '../../helpers/passwords/passwordStrengthLevels' ;

import { PASSWORD_I18N_PATH } from './passwordI18n' ;

import cn from '../../themes/helpers/cn' ;

/**
 * What the buckets are called when no bundle answers.
 * @type {Object.<string,string>}
 */
const STRENGTH_FALLBACK =
{
    weak   : 'Weak' ,
    medium : 'Medium' ,
    strong : 'Strong' ,
} ;

/**
 * @param {Object} props
 * @param {string} [props.className]     - Additional class names for the root.
 * @param {number} [props.minLength=8]   - Characters the length rule asks for.
 * @param {string} [props.password='']   - The raw value — the rules are computed here.
 * @param {string} [props.path='components.input.password'] - i18n path holding a `strength` map.
 */
const PasswordStrengthBar =
({
    className ,
    minLength = DEFAULT_PASSWORD_MIN_LENGTH ,
    password  = '' ,
    path      = PASSWORD_I18N_PATH ,
}) =>
{
    const { strength : strengthLabels = {} } = useI18n( path , NO_LOCALE , false ) ;

    const rules    = useMemo( () => evaluatePassword( password , { minLength } ) , [ password , minLength ] ) ;
    const strength = useMemo( () => computePasswordStrength( rules ) , [ rules ] ) ;

    if ( password.length === 0 ) { return null ; }

    const label = strengthLabels[ strength.level ] ?? STRENGTH_FALLBACK[ strength.level ] ?? '' ;

    return (
        <div className={ cn( 'flex flex-col gap-1' , className ) }>
            <div className="h-1.5 w-full rounded-full bg-base-300 overflow-hidden">
                <div
                    className = { cn( 'h-full transition-all duration-200' , STRENGTH_BAR_COLOR[ strength.level ] ) }
                    style     = { { width : `${ ( strength.score / PASSWORD_RULES_COUNT ) * 100 }%` } }
                />
            </div>
            <span className="text-xs text-base-content/70">
                { label }
            </span>
        </div>
    ) ;
} ;

PasswordStrengthBar.displayName = 'PasswordStrengthBar' ;

export default PasswordStrengthBar ;
