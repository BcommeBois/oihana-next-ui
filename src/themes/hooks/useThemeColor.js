'use client' ;

import useThemes from '../../contexts/themes/useThemes' ;

import get     from 'vegas-js-core/src/objects/get' ;
import hasPath from 'vegas-js-core/src/objects/hasPath' ;

/**
 * React hook to get a color value from the current theme.
 *
 * @param {Object} props
 * @param {string} props.color - The color key (e.g., 'primary', 'base-content/50').
 * @param {string} [props.defaultColor=null] - Fallback color if not found.
 *
 * @returns {string | null} The hex color value or default.
 *
 * @example
 * ```js
 * const primaryColor = useThemeColor( { color: 'primary' } ) ;
 * // → '#a3e635'
 *
 * const withOpacity = useThemeColor( { color: 'base-content/50' } ) ;
 * // → '#1f2937' avec 50% opacité
 *
 * const withFallback = useThemeColor( { color: 'unknown' , defaultColor: '#000000' } ) ;
 * // → '#000000'
 * ```
 */
const useThemeColor = ( { color , defaultColor = null } = {} ) =>
{
    const { colors } = useThemes() ;

    if ( hasPath( colors , color ) )
    {
        return get( colors , color ) ;
    }

    return defaultColor ;
} ;

export default useThemeColor ;