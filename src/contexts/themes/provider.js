'use client' ;

import { useEffect , useState } from 'react' ;

import { useLocalStorage } from 'react-use' ;

import useThemeColor from './useThemeColor';

import extractThemeColorsFromDOM from '@/themes/helpers/extractThemeColorsFromDom' ;
import useConfig                 from '@/contexts/config' ;
import usePrefersDark            from '@/themes/hooks/usePrefersDark';

import ThemesContext from './context' ;

/**
 * Light theme identifier.
 * @type {string}
 */
export const LIGHT = 'light' ;

/**
 * Dark theme identifier.
 * @type {string}
 */
export const DARK = 'dark' ;

/**
 * Checks that the `theme-dark:` CSS custom variant is registered.
 *
 * Creates a temporary DOM element with `theme-dark:hidden` inside a
 * `[data-dark="true"]` container and verifies that `display: none` applies.
 *
 * Logs a warning in development if the variant is missing.
 *
 * @returns {void}
 */
const checkThemeDarkVariant = () =>
{
    const container = document.createElement( 'div' ) ;
    container.setAttribute( 'data-dark' , 'true' ) ;
    container.style.position = 'absolute' ;
    container.style.opacity  = '0' ;
    container.style.pointerEvents = 'none' ;

    const probe = document.createElement( 'div' ) ;
    probe.className = 'theme-dark:hidden' ;
    container.appendChild( probe ) ;

    document.body.appendChild( container ) ;

    const display = getComputedStyle( probe ).display ;

    document.body.removeChild( container ) ;

    if ( display !== 'none' )
    {
        console.warn(
            '[ThemesProvider] The CSS custom variant `theme-dark:` is not active.\n' +
            'Add the following to your global stylesheet:\n\n' +
            '  @custom-variant theme-dark (&:is([data-dark="true"] *));\n'
        ) ;
    }
} ;

/**
 * @typedef {Object} ThemeColors
 * @property {string} [primary] - Primary color in hex.
 * @property {string} [secondary] - Secondary color in hex.
 * @property {string} [accent] - Accent color in hex.
 * @property {string} [neutral] - Neutral color in hex.
 * @property {string} [base-100] - Base 100 color in hex.
 * @property {string} [base-200] - Base 200 color in hex.
 * @property {string} [base-300] - Base 300 color in hex.
 * @property {string} [base-content] - Base content color in hex.
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {ThemeColors} colors - Extracted theme colors from CSS variables.
 * @property {boolean} isDark - Whether dark mode is active.
 * @property {() => void} toggleIsDark - Function to toggle dark mode.
 */

/**
 * Provides theme context with dark mode toggle and color extraction.
 *
 * Manages two HTML attributes on the target element:
 * - `data-theme` — the DaisyUI theme name (e.g. `'light'`, `'dark'`).
 * - `data-dark`  — `'true'` | `'false'`, used for flash-free CSS-only dark mode switching.
 *
 * The `data-dark` attribute is set both here (on toggle) and in the inline blocking script
 * (`@/contexts/themes/script`) to guarantee the correct value **before first paint**.
 *
 * Components like `ThemedImage` rely on the Tailwind `theme-dark:` variant to swap
 * light/dark assets without any hydration flash.
 *
 * **Prerequisites:**
 *
 * 1. A custom variant must be declared in the global stylesheet:
 *    ```css
 *    @custom-variant theme-dark (&:is([data-dark="true"] *));
 *    ```
 *
 * 2. The inline blocking script (`@/contexts/themes/script`) must set both
 *    `data-theme` and `data-dark` on `<html>` before first paint.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.attribute='data-theme'] - HTML attribute for the DaisyUI theme name.
 * @param {string} [props.storageKey='theme'] - LocalStorage key for dark mode persistence.
 * @param {boolean} [props.syncThemeColor=true] - Whether to sync the PWA `<meta name="theme-color">`.
 * @param {string} [props.themeColorKey='base-100'] - Theme color key used for the status bar (e.g. 'base-100', 'primary', 'neutral').
 * @param {string} [props.tag='html'] - CSS selector for the target element receiving theme attributes.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // In layout.js
 * import { ThemesProvider } from '@/contexts/themes' ;
 *
 * export default function RootLayout( { children } )
 * {
 *     return (
 *         <html lang="fr">
 *             <body>
 *                 <ThemesProvider>
 *                     { children }
 *                 </ThemesProvider>
 *             </body>
 *         </html>
 *     ) ;
 * }
 * ```
 *
 * @example
 * ```jsx
 * // Custom configuration
 * <ThemesProvider
 *     attribute     = "data-mode"
 *     storageKey    = "app-theme"
 *     themeColorKey = "primary"
 *     syncThemeColor = { true }
 *     tag           = "body"
 * >
 *     { children }
 * </ThemesProvider>
 * ```
 *
 * @see {@link script} — Inline blocking script setting `data-theme` and `data-dark`.
 * @see {@link ThemedImage} — Uses `theme-dark:` variant for flash-free image switching.
 */
const ThemesProvider =
( {
     children ,
     attribute = 'data-theme' ,
     storageKey = 'theme' ,
     syncThemeColor = true ,
     themeColorKey  = 'base-100' ,
     tag = 'html'
} ) =>
{
    const prefersDark = usePrefersDark() ;
    const { light = LIGHT , dark = DARK } = useConfig() ?? {} ;

    const [ isDark , setIsDark ] = useLocalStorage( storageKey , prefersDark ) ;
    const [ colors , setColors ] = useState( {} ) ;

    const toggleIsDark = () =>
    {
        const newIsDark = !isDark ;
        setIsDark( newIsDark ) ;

        const element = document.querySelector( tag ) ;
        if ( element )
        {
            element.setAttribute( attribute , newIsDark ? dark : light ) ;
            element.setAttribute( 'data-dark' , newIsDark ? 'true' : 'false' ) ;
        }
    } ;

    useEffect( () =>
    {
        if ( process.env.NODE_ENV === 'development' )
        {
            checkThemeDarkVariant() ;
        }
    }
    , [] ) ;

    useEffect( () =>
    {
        setColors( extractThemeColorsFromDOM() ) ;
    }
    , [ isDark ] ) ;

    useThemeColor( colors[ themeColorKey ] ?? 'base-100' , syncThemeColor ) ;

    return (
        <ThemesContext value={ { colors , isDark , toggleIsDark } }>
            { children }
        </ThemesContext>
    ) ;
} ;

export default ThemesProvider ;