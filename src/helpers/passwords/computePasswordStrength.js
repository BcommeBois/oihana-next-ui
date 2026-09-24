/**
 * Turns the rules a password satisfies into a score and a bucket.
 *
 *   two rules at most → `weak`
 *   three or four     → `medium`
 *   all five          → `strong`
 *
 * The thresholds are deliberately blunt : the meter tells a reader whether
 * they are nearly there, and the checklist next to it tells them exactly
 * what is missing. An entropy estimate would be more accurate and would say
 * less — see {@link module:components/passwords/PasswordRuleList}.
 *
 * @module helpers/passwords/computePasswordStrength
 *
 * @param {PasswordRules} [rules] - What {@link module:helpers/passwords/evaluatePassword} answered.
 * @returns {PasswordStrength}
 *
 * @example
 * ```js
 * const rules = evaluatePassword( value ) ;
 * const { score , level } = computePasswordStrength( rules ) ;
 *
 * const canSubmit = score === PASSWORD_RULES_COUNT ;
 * ```
 */

import { WEAK , MEDIUM , STRONG } from './passwordStrengthLevels' ;

/**
 * @typedef {Object} PasswordStrength
 * @property {number} score - How many rules are satisfied, from 0 to 5.
 * @property {string} level - The bucket : `weak`, `medium` or `strong`.
 */

const computePasswordStrength = rules =>
{
    const score = Object.values( rules ?? {} ).filter( Boolean ).length ;

    if ( score <= 2 ) { return { score , level : WEAK   } ; }
    if ( score <= 4 ) { return { score , level : MEDIUM } ; }

    return { score , level : STRONG } ;
} ;

export default computePasswordStrength ;
