/**
 * The locale a number is formatted with when none is given.
 *
 * A fixed tag rather than the runtime's own : left to itself, `Intl` answers
 * with the SERVER's locale on the first render and the BROWSER's on the
 * second, and React reports the difference as a hydration mismatch.
 *
 * @module helpers/numbers/defaultLocale
 * @type {string}
 */
const DEFAULT_LOCALE = 'en' ;

export default DEFAULT_LOCALE ;
