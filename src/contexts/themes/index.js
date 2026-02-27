/**
 * Themes context module.
 *
 * @module contexts/themes
 *
 * @example
 * ```js
 * // Default import (most common)
 * import useThemes from '@/contexts/themes' ;
 *
 * // With provider
 * import useThemes , { ThemesProvider } from '@/contexts/themes' ;
 *
 * // Named imports
 * import { ThemesProvider , ThemesContext , LIGHT , DARK } from '@/contexts/themes' ;
 * ```
 */

/**
 * React context for themes.
 */
export { default as ThemesContext } from './context' ;

/**
 * Provider component to wrap the app with theme support.
 */
export { default as ThemesProvider } from './provider' ;

/**
 * Light theme identifier.
 */
export { LIGHT } from './provider' ;

/**
 * Dark theme identifier.
 */
export { DARK } from './provider' ;

/**
 * Hook to access theme values and toggle.
 */
export { default } from './useThemes' ;