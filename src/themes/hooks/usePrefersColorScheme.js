import { useSyncExternalStore } from 'react' ;

/**
 * MediaQueryList change event type.
 * @type {string}
 */
const CHANGE = 'change' ;

/**
 * Dark color scheme value.
 * @type {string}
 */
const DARK = 'dark' ;

/**
 * Light color scheme value.
 * @type {string}
 */
const LIGHT = 'light' ;

/**
 * No preference color scheme value.
 * @type {string}
 */
const NO_PREFERENCE = 'no-preference' ;

/**
 * @typedef {'dark' | 'light' | 'no-preference'} ColorScheme
 */

/**
 * The two MediaQueryLists, created on first use.
 *
 * `getSnapshot` runs on every render, and a list can only be built in a
 * browser — so they are neither built at module scope nor rebuilt each time.
 *
 * @type {{ dark: MediaQueryList , light: MediaQueryList }|null}
 */
let mediaQueries = null ;

/**
 * @returns {{ dark: MediaQueryList , light: MediaQueryList }}
 */
const getMediaQueries = () =>
{
    if ( mediaQueries === null )
    {
        mediaQueries =
        {
            dark  : window.matchMedia( `(prefers-color-scheme: ${ DARK })`  ) ,
            light : window.matchMedia( `(prefers-color-scheme: ${ LIGHT })` ) ,
        } ;
    }

    return mediaQueries ;
} ;

/**
 * @param {() => void} callback
 * @returns {() => void}
 */
const subscribe = ( callback ) =>
{
    const { dark , light } = getMediaQueries() ;

    dark.addEventListener( CHANGE , callback ) ;
    light.addEventListener( CHANGE , callback ) ;

    return () =>
    {
        dark.removeEventListener( CHANGE , callback ) ;
        light.removeEventListener( CHANGE , callback ) ;
    } ;
} ;

/**
 * @returns {ColorScheme}
 */
const getSnapshot = () =>
{
    const { dark , light } = getMediaQueries() ;

    if ( dark.matches  ) { return DARK  ; }
    if ( light.matches ) { return LIGHT ; }

    return NO_PREFERENCE ;
} ;

/**
 * @returns {ColorScheme}
 */
const getServerSnapshot = () => NO_PREFERENCE ;

/**
 * React hook to detect user's preferred color scheme.
 *
 * Listens to the `prefers-color-scheme` media query and updates
 * automatically when the user changes their system preference.
 *
 * The server is told `no-preference` and the browser is read only once React
 * is hydrating, so the first client render matches the server markup instead
 * of contradicting it.
 *
 * @returns {ColorScheme} The preferred color scheme.
 *
 * @example
 * ```js
 * const colorScheme = usePrefersColorScheme() ;
 *
 * if ( colorScheme === 'dark' )
 * {
 *     // Apply dark theme
 * }
 * ```
 *
 * @example
 * ```jsx
 * const colorScheme = usePrefersColorScheme() ;
 *
 * return (
 *     <div className={ colorScheme === 'dark' ? 'bg-black' : 'bg-white' }>
 *         Current preference: { colorScheme }
 *     </div>
 * ) ;
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
const usePrefersColorScheme = () => useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

export default usePrefersColorScheme ;
