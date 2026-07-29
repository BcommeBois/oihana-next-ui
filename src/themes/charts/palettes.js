/**
 * Chart series palette generators.
 *
 * Series colors are **not** the same problem as chrome colors (texts, axes,
 * grids). The chrome must follow the DaisyUI theme ; the series must stay
 * mutually distinguishable, which is measured by the perceptual distance
 * (ΔE) between every pair.
 *
 * Both goals conflict past a certain number of series : distinguishability
 * comes from hue spread, and hue spread is exactly what walks away from the
 * brand hues. Measurements on the `oihana-ui-light` / `oihana-ui-dark`
 * themes give, for the minimum ΔE across all pairs :
 *
 * | series | `brand` | `nivo` | hand-tuned |
 * |--------|---------|--------|------------|
 * | 5      | 23.9    | 15.7   | 22.9       |
 * | 6      | 10.0    | 7.4    | 22.1       |
 * | 8      | 10.4    | 7.4    | 18.1       |
 *
 * A ΔE below ~15 means two series read as the same color. So `brand` is used
 * up to {@link BRAND_MAX_SERIES} and falls back to a hand-tuned palette
 * beyond — no generator holds at 8, including nivo's own scheme.
 *
 * Contrast against the background is deliberately *not* handled here : none
 * of these palettes reaches the WCAG 3:1 non-text ratio (nivo sits at 1.25:1
 * on a light background). What separates a mark from the background is its
 * border — see `borderColor` in the chart components.
 *
 * @module themes/charts/palettes
 */

import chroma from 'chroma-js' ;

/**
 * Palette derived from the theme's `primary` color.
 * @type {string}
 */
export const BRAND = 'brand' ;

/**
 * Palette built from the DaisyUI semantic colors.
 * @type {string}
 */
export const THEME = 'theme' ;

/**
 * The historical nivo scheme.
 * @type {string}
 */
export const NIVO = 'nivo' ;

/**
 * The available palette names.
 * @type {string[]}
 */
export const palettes = [ BRAND , THEME , NIVO ] ;

/**
 * Number of series past which {@link BRAND} stops being distinguishable
 * and {@link FALLBACK_COLORS} takes over.
 * @type {number}
 */
export const BRAND_MAX_SERIES = 6 ;

/**
 * Hand-tuned categorical colors, used when a generated palette would no
 * longer be readable. Holds ΔE ≥ 18 up to 10 series.
 * @type {string[]}
 */
export const FALLBACK_COLORS =
[
    '#4E79A7' , '#F28E2C' , '#E15759' , '#76B7B2' , '#59A14F' ,
    '#EDC949' , '#AF7AA1' , '#FF9DA7' , '#9C755F' , '#BAB0AC' ,
] ;

/**
 * The nivo scheme colors, for consumers who want the historical look.
 * @type {string[]}
 */
export const NIVO_COLORS =
[
    '#E8C1A0' , '#F47560' , '#F1E15B' , '#E8A838' , '#61CDBB' , '#97E3D5' ,
] ;

/**
 * The DaisyUI semantic color keys, in series order.
 * @type {string[]}
 */
export const THEME_KEYS =
[
    'primary' , 'secondary' , 'accent' , 'info' ,
    'success' , 'warning' , 'error' , 'neutral' ,
] ;

/**
 * Builds `count` colors from a seed color, by rotating the hue and
 * modulating lightness and chroma.
 *
 * Interpolating `primary → secondary → accent` was measured at ΔE 5 for 8
 * series (indistinguishable) : a smooth gradient is the right answer for
 * *sequential* data, and the wrong one for *categorical* data. Hue rotation
 * around the seed scores far better.
 *
 * Lightness is clamped away from the background — brighter in dark mode,
 * darker in light mode — so no series disappears into the canvas.
 *
 * @param {Object} [props]
 * @param {string} [props.seed] - The seed color (usually the theme `primary`).
 * @param {number} [props.count=1] - How many colors to produce.
 * @param {boolean} [props.isDark=false] - Whether the dark theme is active.
 *
 * @returns {string[]} `count` hex colors.
 *
 * @example
 * ```js
 * getBrandColors( { seed : '#E12A27' , count : 4 } ) ;
 * // → [ '#c40012' , '#647f00' , '#00a74b' , '#0073b4' ]
 * ```
 */
export const getBrandColors = ( { seed , count = 1 , isDark = false } = {} ) =>
{
    if ( !seed || count < 1 )
    {
        return FALLBACK_COLORS.slice( 0 , Math.max( count , 0 ) ) ;
    }

    let lightness , chromaValue , hue ;

    try
    {
        [ lightness , chromaValue , hue ] = chroma( seed ).lch() ;
    }
    catch
    {
        return FALLBACK_COLORS.slice( 0 , count ) ;
    }

    // Keep the ramp away from the background rather than centered on the seed.
    const base = isDark ? Math.max( lightness , 62 ) : Math.min( lightness , 58 ) ;
    const step = 360 / count ;

    return Array.from( { length : count } , ( _ , index ) =>
    {
        // The +18° offset on odd indices breaks up regular hue spacing,
        // which otherwise pairs opposite series too closely.
        const h = ( hue + index * step + ( index % 2 ) * 18 ) % 360 ;
        const l = base + ( ( index % 3 ) - 1 ) * ( isDark ? 11 : 9 ) ;
        const c = chromaValue * ( index % 2 ? 0.78 : 1 ) ;

        return chroma.lch( l , c , h ).hex() ;
    } ) ;
} ;

/**
 * Builds a palette from the DaisyUI semantic colors, in {@link THEME_KEYS}
 * order. Capped at 8 colors — beyond that the list wraps onto
 * {@link FALLBACK_COLORS}.
 *
 * Meant for series that actually *carry* the semantics (a success rate, an
 * error count). For arbitrary series it reads as noise — prefer
 * {@link BRAND}.
 *
 * @param {Object} [props]
 * @param {Object} [props.colors] - Resolved theme colors, keyed by DaisyUI name.
 * @param {number} [props.count=1] - How many colors to produce.
 *
 * @returns {string[]} `count` hex colors.
 */
export const getThemeColors = ( { colors , count = 1 } = {} ) =>
{
    const available = THEME_KEYS
        .map( ( key ) => colors?.[ key ] )
        .filter( Boolean ) ;

    if ( available.length === 0 )
    {
        return FALLBACK_COLORS.slice( 0 , Math.max( count , 0 ) ) ;
    }

    return Array.from( { length : count } , ( _ , index ) =>
        index < available.length
            ? available[ index ]
            : FALLBACK_COLORS[ ( index - available.length ) % FALLBACK_COLORS.length ] ,
    ) ;
} ;

/**
 * Resolves a palette into an explicit list of colors.
 *
 * Passing an array short-circuits everything : it is returned as-is (cycled
 * if shorter than `count`), which is the escape hatch for a chart that must
 * match colors imposed elsewhere.
 *
 * @param {Object} [props]
 * @param {string|string[]} [props.palette='brand'] - A palette name or explicit colors.
 * @param {Object} [props.colors] - Resolved theme colors, keyed by DaisyUI name.
 * @param {number} [props.count=1] - Number of series to color.
 * @param {boolean} [props.isDark=false] - Whether the dark theme is active.
 *
 * @returns {string[]} `count` hex colors.
 *
 * @example
 * ```js
 * getChartColors( { palette : 'brand' , colors , count : 5 , isDark } ) ;
 * getChartColors( { palette : [ '#f00' , '#0f0' ] , count : 4 } ) ; // cycles
 * ```
 */
export const getChartColors = ( { palette = BRAND , colors , count = 1 , isDark = false } = {} ) =>
{
    const total = Math.max( count , 0 ) ;

    if ( Array.isArray( palette ) )
    {
        if ( palette.length === 0 )
        {
            return FALLBACK_COLORS.slice( 0 , total ) ;
        }

        return Array.from( { length : total } , ( _ , index ) => palette[ index % palette.length ] ) ;
    }

    if ( palette === NIVO )
    {
        return Array.from( { length : total } , ( _ , index ) =>
            index < NIVO_COLORS.length
                ? NIVO_COLORS[ index ]
                : FALLBACK_COLORS[ ( index - NIVO_COLORS.length ) % FALLBACK_COLORS.length ] ,
        ) ;
    }

    if ( palette === THEME )
    {
        return getThemeColors( { colors , count : total } ) ;
    }

    if ( total > BRAND_MAX_SERIES )
    {
        if ( process.env.NODE_ENV === 'development' )
        {
            console.warn(
                `[charts] The 'brand' palette is only distinguishable up to ${ BRAND_MAX_SERIES } series ` +
                `(${ total } requested) — falling back to the hand-tuned palette. ` +
                `Pass an explicit color array to palette={} to override.` ,
            ) ;
        }

        return Array.from( { length : total } , ( _ , index ) =>
            FALLBACK_COLORS[ index % FALLBACK_COLORS.length ] ,
        ) ;
    }

    return getBrandColors( { seed : colors?.primary , count : total , isDark } ) ;
} ;
