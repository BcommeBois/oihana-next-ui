import { useSyncExternalStore } from 'react' ;

/**
 * MediaQueryList change event type.
 * @type {string}
 */
const CHANGE = 'change' ;

/**
 * The media query the hook reports on.
 * @type {string}
 */
const QUERY = '(prefers-color-scheme: dark)' ;

/**
 * The MediaQueryList, created on first use.
 *
 * `getSnapshot` runs on every render, and the list can only be built in a
 * browser — so it is neither built at module scope nor rebuilt each time.
 *
 * @type {MediaQueryList|null}
 */
let mediaQuery = null ;

/**
 * @returns {MediaQueryList}
 */
const getMediaQuery = () =>
{
    if ( mediaQuery === null )
    {
        mediaQuery = window.matchMedia( QUERY ) ;
    }

    return mediaQuery ;
} ;

/**
 * @param {() => void} callback
 * @returns {() => void}
 */
const subscribe = ( callback ) =>
{
    const query = getMediaQuery() ;

    query.addEventListener( CHANGE , callback ) ;

    return () => query.removeEventListener( CHANGE , callback ) ;
} ;

/**
 * @returns {boolean}
 */
const getSnapshot = () => getMediaQuery().matches ;

/**
 * @returns {boolean}
 */
const getServerSnapshot = () => false ;

/**
 * React hook to detect if user prefers dark mode.
 *
 * Listens to the `prefers-color-scheme: dark` media query and updates
 * automatically when the user changes their system preference.
 *
 * The server is told `false` and the browser is read only once React is
 * hydrating, so the first client render matches the server markup instead
 * of contradicting it.
 *
 * @returns {boolean} True if dark mode is preferred.
 *
 * @example
 * ```js
 * const prefersDark = usePrefersDark() ;
 *
 * if ( prefersDark )
 * {
 *     // Apply dark theme
 * }
 * ```
 *
 * @example
 * ```jsx
 * const prefersDark = usePrefersDark() ;
 *
 * return (
 *     <div className={ prefersDark ? 'bg-gray-900 text-white' : 'bg-white text-black' }>
 *         { prefersDark ? '🌙 Dark mode' : '☀️ Light mode' }
 *     </div>
 * ) ;
 * ```
 *
 * @example
 * ```js
 * // With localStorage persistence
 * const prefersDark = usePrefersDark() ;
 * const [ isDark , setIsDark ] = useLocalStorage( 'theme' , prefersDark ) ;
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
const usePrefersDark = () => useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

export default usePrefersDark ;
