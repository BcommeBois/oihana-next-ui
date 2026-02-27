import { useEffect , useState } from 'react' ;

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
 * React hook to detect if user prefers dark mode.
 *
 * Listens to the `prefers-color-scheme: dark` media query and updates
 * automatically when the user changes their system preference.
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
const usePrefersDark = () =>
{
    const [ prefersDark , setPrefersDark ] = useState( () =>
    {
        if ( typeof window === 'undefined' )
        {
            return false ;
        }
        return window.matchMedia( '(prefers-color-scheme: dark)' ).matches ;
    } ) ;

    useEffect( () =>
    {
        const query = window.matchMedia( '(prefers-color-scheme: dark)' ) ;

        const handler = e => setPrefersDark( e.matches ) ;

        query.addEventListener( CHANGE , handler ) ;

        return () => query.removeEventListener( CHANGE , handler ) ;
    }
    , [] ) ;

    return prefersDark ;
} ;

export default usePrefersDark ;