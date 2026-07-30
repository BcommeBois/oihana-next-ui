'use client' ;

/**
 * Builds the nivo chart theme from the active DaisyUI theme.
 *
 * @module hooks/useChartTheme
 */

import { useMemo } from 'react' ;

import useThemeColors from '../themes/hooks/useThemeColors' ;

import { buildChartTheme , CHART_COLOR_KEYS } from '../themes/charts/theme' ;

/**
 * React hook returning the nivo `theme` object for the current DaisyUI theme.
 *
 * Colors are resolved to hex from the DOM, so the same theme drives the SVG
 * and canvas renderers alike, and it follows the light/dark toggle without
 * any work from the caller.
 *
 * @param {Object} [props]
 * @param {string} [props.fontFamily='inherit'] - Font family for every chart text.
 * @param {number} [props.fontSize=12] - Base font size in px.
 * @param {number|string} [props.labelFontWeight=500] - Weight of the data labels only, not the axis or legend text.
 * @param {Object} [props.overrides] - Partial nivo theme, deeply merged on top.
 * @param {number|string} [props.tickFontWeight=500] - Weight of the axis tick labels.
 * @param {number} [props.tickOutlineWidth=2] - Halo around the tick labels, in the surface color. `0` removes it.
 *
 * @returns {Object} A nivo theme object.
 *
 * @example
 * ```jsx
 * const theme = useChartTheme() ;
 *
 * <ResponsiveBar theme={ theme } ... />
 * ```
 *
 * @example
 * ```jsx
 * // Bigger axis labels, everything else untouched
 * const theme = useChartTheme( {
 *     overrides : { axis : { ticks : { text : { fontSize : 14 } } } } ,
 * } ) ;
 * ```
 */
const useChartTheme = ( {
    fontFamily = 'inherit' ,
    fontSize = 12 ,
    labelFontWeight = 500 ,
    overrides ,
    tickFontWeight = 500 ,
    tickOutlineWidth = 2 ,
} = {} ) =>
{
    const colors = useThemeColors( CHART_COLOR_KEYS ) ;

    // `useThemeColors` returns a fresh object on every render, so the
    // individual values are the dependencies, not the map itself.
    const { text , muted , grid , border , surface } = colors ?? {} ;

    return useMemo
    (
        () => buildChartTheme
        ({
            colors : { text , muted , grid , border , surface } ,
            fontFamily ,
            fontSize ,
            labelFontWeight ,
            overrides ,
            tickFontWeight ,
            tickOutlineWidth ,
        }) ,
        [ text , muted , grid , border , surface , fontFamily , fontSize , labelFontWeight , overrides , tickFontWeight , tickOutlineWidth ] ,
    ) ;
} ;

export default useChartTheme ;
