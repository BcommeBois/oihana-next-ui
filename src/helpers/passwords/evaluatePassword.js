/**
 * Which of the five complexity rules a password satisfies : length, an
 * uppercase letter, a lowercase letter, a digit, a symbol.
 *
 * 🚨 **Visual only.** This says what to show a reader while they type ; it
 * decides nothing. The server that stores the password remains the authority
 * and may refuse one that passes every rule here — a password found in a
 * breach list, one reused from the account's own history, a policy rule this
 * function knows nothing about. A form that submits on these five booleans
 * alone still has to render what the server answers.
 *
 * `minLength` is the only rule a host can move, because it is the only one
 * that differs from one identity provider to the next. The other four are
 * either asked for or ignored, and a host that ignores one simply says so in
 * its own labels — see {@link module:components/passwords/PasswordRuleList}.
 *
 * @module helpers/passwords/evaluatePassword
 *
 * @param {*}      [value] - The raw password. Anything else is coerced, nullish reads as `''`.
 * @param {Object} [options]
 * @param {number} [options.minLength=8] - Characters the `length` rule asks for.
 * @returns {PasswordRules}
 *
 * @example
 * ```js
 * evaluatePassword( 'abc' ) ;
 * // { length : false , uppercase : false , lowercase : true , digit : false , symbol : false }
 *
 * evaluatePassword( 'Sécurité2026!' , { minLength : 12 } ) ;
 * // every rule true
 * ```
 */

import { DEFAULT_PASSWORD_MIN_LENGTH } from './passwordStrengthLevels' ;

/**
 * @typedef {Object} PasswordRules
 * @property {boolean} length    - At least `minLength` characters.
 * @property {boolean} uppercase - At least one A-Z character.
 * @property {boolean} lowercase - At least one a-z character.
 * @property {boolean} digit     - At least one 0-9 character.
 * @property {boolean} symbol    - At least one non-alphanumeric character.
 */

const evaluatePassword = ( value , { minLength = DEFAULT_PASSWORD_MIN_LENGTH } = {} ) =>
{
    const password = String( value ?? '' ) ;
    return {
        length    : password.length >= minLength ,
        uppercase : /[A-Z]/.test( password ) ,
        lowercase : /[a-z]/.test( password ) ,
        digit     : /\d/.test( password ) ,
        symbol    : /[^A-Za-z0-9]/.test( password ) ,
    } ;
} ;

export default evaluatePassword ;
