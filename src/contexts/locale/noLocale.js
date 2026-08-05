/**
 * Fallback handed to `useI18n` when no bundle is expected to answer at a given path.
 *
 * Hoisted and frozen so every component passes the *same* reference on every
 * render — a fresh `{}` literal would defeat any memoization downstream and
 * churns an allocation per render for nothing.
 *
 * @type {Object}
 *
 * @example
 * ```js
 * const { close = 'Close' } = useI18n( path , NO_LOCALE , false ) ;
 * ```
 */
const NO_LOCALE = Object.freeze( {} ) ;

export default NO_LOCALE ;
