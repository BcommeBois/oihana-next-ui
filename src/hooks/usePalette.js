'use client' ;

/**
 * Resolves a palette name into explicit colors, for the active theme.
 *
 * @module hooks/usePalette
 */

import { useMemo } from 'react' ;

import useThemes from '../contexts/themes/useThemes' ;

import { NIVO , getChartColors , getSequentialColors } from '../themes/charts/palettes' ;

/**
 * React hook returning `count` colors for the active theme.
 *
 * Nothing here is specific to a chart : it turns a palette name into a set of
 * colors that read against the current background. A chart uses it for its
 * series, a scheduler for its resources, and anything colouring a set of
 * categories has the same need — which is why it is no longer called
 * `useChartPalette`.
 *
 * The dark flag matters : the generated ramp is pushed lighter on a dark
 * background and darker on a light one, so nothing sinks into the canvas.
 *
 * @param {Object} [props]
 * @param {string|string[]} [props.palette='nivo'] - `'nivo'`, `'brand'`, `'theme'`, or explicit colors.
 * @param {number} [props.count=1] - How many colors are needed.
 * @param {boolean} [props.sequential=false] - Build a quantitative ramp instead of categorical colors — a calendar, a time range, a heatmap. Wrong for categories, where what is wanted is the greatest distance between neighbours rather than an order.
 *
 * @returns {string[]} `count` hex colors.
 *
 * @example
 * ```jsx
 * // A chart's series
 * const colors = usePalette( { palette : 'brand' , count : keys.length } ) ;
 *
 * // A scheduler's rooms
 * const colors = usePalette( { palette : 'brand' , count : rooms.length } ) ;
 * ```
 */
const usePalette = ( { palette = NIVO , count = 1 , sequential = false } = {} ) =>
{
    const { colors , isDark } = useThemes() ?? {} ;

    // An inline array literal for `palette` defeats this memo, which is fine :
    // resolving a palette is a handful of chroma calls. The memo is here for
    // the common case, a stable palette name.
    return useMemo
    (
        () => ( sequential ? getSequentialColors : getChartColors )( { palette , colors , count , isDark } ) ,
        [ palette , colors , count , isDark , sequential ] ,
    ) ;
} ;

export default usePalette ;
