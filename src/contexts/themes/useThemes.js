'use client' ;

import { use } from 'react' ;

import ThemesContext from './context' ;

/**
 * React hook to access theme context.
 *
 * @returns {{isDark: boolean, toggleIsDark: function()}}
 *
 * @throws {Error} If used outside ThemesProvider.
 *
 * @example
 * ```js
 * const { isDark , toggleIsDark } = useThemes() ;
 *
 * <button onClick={ toggleIsDark }>
 *     { isDark ? '🌙' : '☀️' }
 * </button>
 * ```
 *
 * @example
 * ```js
 * const { colors } = useThemes() ;
 *
 * <div style={{ backgroundColor: colors.primary }}>
 *     Primary background
 * </div>
 * ```
 */
const useThemes = () =>
{
    const context = use( ThemesContext ) ;

    if ( !context )
    {
        throw new Error( 'useThemes must be used within a ThemesProvider' ) ;
    }

    return context ;
} ;

export default useThemes ;