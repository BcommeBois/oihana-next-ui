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
 * React hook to detect user's preferred color scheme.
 *
 * Listens to the `prefers-color-scheme` media query and updates
 * automatically when the user changes their system preference.
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
const usePrefersColorScheme = () =>
{
    const [ preferredColorScheme , setPreferredColorScheme ] = useState( () =>
    {
        if ( typeof window === 'undefined' || typeof window.matchMedia !== 'function' )
        {
            return NO_PREFERENCE ;
        }

        if ( window.matchMedia( '(prefers-color-scheme: dark)' ).matches )
        {
            return DARK ;
        }

        if ( window.matchMedia( '(prefers-color-scheme: light)' ).matches )
        {
            return LIGHT ;
        }

        return NO_PREFERENCE ;
    } ) ;

    useEffect( () =>
    {
        if ( typeof window === 'undefined' || typeof window.matchMedia !== 'function' )
        {
            return ;
        }

        const darkQuery  = window.matchMedia( '(prefers-color-scheme: dark)' ) ;
        const lightQuery = window.matchMedia( '(prefers-color-scheme: light)' ) ;

        if ( typeof darkQuery.addEventListener !== 'function' )
        {
            console.warn( 'usePrefersColorScheme: addEventListener not supported' ) ;
            return ;
        }

        const handleDarkChange = ( e ) =>
        {
            if ( e.matches )
            {
                setPreferredColorScheme( DARK ) ;
            }
        } ;

        const handleLightChange = ( e ) =>
        {
            if ( e.matches )
            {
                setPreferredColorScheme( LIGHT ) ;
            }
        } ;

        darkQuery.addEventListener( CHANGE , handleDarkChange ) ;
        lightQuery.addEventListener( CHANGE , handleLightChange ) ;

        return () =>
        {
            darkQuery.removeEventListener( CHANGE , handleDarkChange ) ;
            lightQuery.removeEventListener( CHANGE , handleLightChange ) ;
        } ;
    }
    , [] ) ;

    return preferredColorScheme ;
} ;

export default usePrefersColorScheme ;