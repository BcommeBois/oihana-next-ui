'use client' ;

import useThemes from '@/contexts/themes/useThemes' ;

import clean   from 'vegas-js-core/src/objects/clean'   ;
import get     from 'vegas-js-core/src/objects/get'     ;
import hasPath from 'vegas-js-core/src/objects/hasPath' ;
import map     from 'vegas-js-core/src/objects/map'     ;

/**
 * Gets a color value from theme definitions.
 *
 * @param {string} name - The color key.
 * @param {Object} definitions - The theme colors object.
 * @returns {string | undefined} The color value or undefined.
 */
const getColor = ( name , definitions ) => hasPath( definitions , name ) ? get( definitions , name ) : undefined ;

/**
 * React hook to transform color definitions into theme color values.
 *
 * @param {Object.<string, string | string[]>} colors - Color definitions to transform.
 * @returns {*} Transformed colors with theme values.
 *
 * @example
 * ```js
 * // Single colors
 * const colors = useThemeColors( {
 *     background : 'base-100' ,
 *     text       : 'base-content' ,
 *     accent     : 'primary'
 * } ) ;
 * // → { background: '#ffffff' , text: '#1f2937' , accent: '#a3e635' }
 * ```
 *
 * @example
 * ```js
 * // Array of colors (for gradients, etc.)
 * const colors = useThemeColors
 * ( {
 *     gradient : [ 'primary' , 'secondary' , 'accent' ]
 * } ) ;
 * // → { gradient: [ '#a3e635' , '#f472b6' , '#facc15' ] }
 * ```
 */
const useThemeColors = ( colors ) =>
{
    const { colors : themeColors } = useThemes() ;

    if ( !colors )
    {
        return {} ;
    }

    return clean( map( colors , ( color ) =>
    {
        if ( Array.isArray( color ) )
        {
            return color.map( c => getColor( c , themeColors ) ).filter( c => c !== undefined ) ;
        }

        return getColor( color , themeColors ) ;
    } ) ) ;
} ;

export default useThemeColors ;