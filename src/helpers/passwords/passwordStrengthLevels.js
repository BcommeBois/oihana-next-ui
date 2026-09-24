/**
 * The vocabulary of the password strength meter : the three buckets a score
 * falls into, the bar colour each bucket is painted with, how many rules
 * there are to satisfy, and the length a password defaults to.
 *
 * A bucket travels : {@link module:helpers/passwords/computePasswordStrength}
 * returns one, `PasswordStrengthBar` paints it, and a host may gate its
 * submit button on it. Three string literals written out in four files are
 * three chances to misspell one and paint nothing.
 *
 * @module helpers/passwords/passwordStrengthLevels
 *
 * @example
 * ```js
 * import passwordStrengthLevels , { STRONG } from 'oihana-next-ui/helpers/passwords/passwordStrengthLevels' ;
 *
 * if ( strength.level === STRONG ) { … }
 * ```
 */

/**
 * Two rules satisfied at most.
 * @type {string}
 */
export const WEAK = 'weak' ;

/**
 * Three or four rules satisfied.
 * @type {string}
 */
export const MEDIUM = 'medium' ;

/**
 * Every rule satisfied.
 * @type {string}
 */
export const STRONG = 'strong' ;

/**
 * How many characters a password needs when the host names no other length.
 *
 * Eight is what the identity providers in common use ask for, and the floor
 * the OWASP Authentication Cheat Sheet sets. A host with a stricter policy
 * passes its own `minLength` — the number is a default, never a rule.
 *
 * @type {number}
 */
export const DEFAULT_PASSWORD_MIN_LENGTH = 8 ;

/**
 * How many rules {@link module:helpers/passwords/evaluatePassword} answers,
 * hence the score a password reaches when it satisfies all of them.
 *
 * Named so a host gating a form writes `score === PASSWORD_RULES_COUNT`
 * rather than a bare `5` nobody can trace back to anything.
 *
 * @type {number}
 */
export const PASSWORD_RULES_COUNT = 5 ;

/**
 * The bar's background class, keyed by bucket.
 *
 * Whole class names, never built at runtime : Tailwind reads the source to
 * decide what to generate, and a string assembled at render time is a class
 * that ships as an empty rule.
 *
 * @type {Object.<string,string>}
 */
export const STRENGTH_BAR_COLOR =
{
    [ WEAK   ] : 'bg-error' ,
    [ MEDIUM ] : 'bg-warning' ,
    [ STRONG ] : 'bg-success' ,
} ;

/**
 * The three buckets, weakest first.
 * @type {Array.<string>}
 */
const passwordStrengthLevels = [ WEAK , MEDIUM , STRONG ] ;

export default passwordStrengthLevels ;
