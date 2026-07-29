'use client' ;

/**
 * Resolves a chart palette into explicit series colors.
 *
 * @module hooks/useChartPalette
 */

import { useMemo } from 'react' ;

import useThemes from '../contexts/themes/useThemes' ;

import { NIVO , getChartColors } from '../themes/charts/palettes' ;

/**
 * React hook returning `count` series colors for the active theme.
 *
 * The dark flag matters : the generated ramp is pushed lighter on a dark
 * background and darker on a light one, so no series sinks into the canvas.
 *
 * @param {Object} [props]
 * @param {string|string[]} [props.palette='nivo'] - `'nivo'`, `'brand'`, `'theme'`, or explicit colors.
 * @param {number} [props.count=1] - Number of series to color.
 *
 * @returns {string[]} `count` hex colors.
 *
 * @example
 * ```jsx
 * const colors = useChartPalette( { palette : 'brand' , count : keys.length } ) ;
 *
 * <ResponsiveBar colors={ colors } ... />
 * ```
 */
const useChartPalette = ( { palette = NIVO , count = 1 } = {} ) =>
{
    const { colors , isDark } = useThemes() ?? {} ;

    // An inline array literal for `palette` defeats this memo, which is fine :
    // resolving a palette is a handful of chroma calls. The memo is here for
    // the common case, a stable palette name.
    return useMemo
    (
        () => getChartColors( { palette , colors , count , isDark } ) ,
        [ palette , colors , count , isDark ] ,
    ) ;
} ;

export default useChartPalette ;
