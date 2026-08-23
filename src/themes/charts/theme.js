/**
 * Chart chrome theme — texts, axes, grids, legends, tooltips.
 *
 * Produces the `theme` object consumed by the nivo components, from colors
 * already resolved to hex by the DaisyUI theme layer.
 *
 * **Why hex and not `var(--color-base-content)`** — nivo emits theme colors
 * two different ways : inline styles for texts (where `var()` resolves) but
 * *presentation attributes* for grid and axis lines (`stroke="…"`, where it
 * is not specified to). Canvas renderers cannot resolve `var()` at all.
 * Feeding resolved values keeps a single code path across SVG and canvas.
 *
 * **First paint** — the theme colors are read from the DOM in an effect, so
 * they are empty on the first render. Every color falls back to
 * `currentColor` (which inherits the surrounding text color) or
 * `transparent` rather than to nivo's default black, so the first frame is
 * neutral instead of wrong.
 *
 * @module themes/charts/theme
 */

import mergeDeep from 'vegas-js-core/src/objects/mergeDeep' ;

/**
 * Inherits the surrounding text color until the theme colors are resolved.
 * @type {string}
 */
export const FALLBACK_TEXT = 'currentColor' ;

/**
 * Keeps lines invisible rather than black on the first frame.
 * @type {string}
 */
export const FALLBACK_LINE = 'transparent' ;

/**
 * Thickness of the halo drawn around the data labels, in px.
 *
 * The same figure the tick labels spend, so the two kinds of text look
 * related rather than each treated on its own.
 *
 * @type {number}
 */
export const LABEL_OUTLINE_WIDTH = 2 ;

/**
 * Color of the halo drawn around the data labels.
 *
 * A light neutral rather than a theme token — see `buildChartTheme`. It is
 * kept slightly translucent so the mark still reads through the stroke : a
 * fully opaque outline around every glyph carves a white channel out of the
 * arc it is printed on, which is legible and ugly.
 *
 * The alpha is in the color rather than in `outlineOpacity` on purpose :
 * `drawCanvasText` only sets `strokeStyle` and `lineWidth`, so an opacity
 * spelled as a theme field would silently differ between the svg and canvas
 * renderers.
 *
 * @type {string}
 */
export const LABEL_OUTLINE_COLOR = 'rgb(255 255 255 / 0.85)' ;

/**
 * The DaisyUI color keys a chart theme needs.
 *
 * Passed straight to `useThemeColors` — see `useChartTheme`.
 *
 * @type {Object.<string,string>}
 */
export const CHART_COLOR_KEYS =
{
    text    : 'base-content' ,
    muted   : 'base-content/60' ,
    grid    : 'base-content/15' ,
    border  : 'base-content/25' ,
    // The surface behind the chart, used as the halo around tick labels.
    surface : 'base-100' ,
} ;

/**
 * Builds the nivo `theme` object from resolved DaisyUI colors.
 *
 * The tooltip container is deliberately neutralized (transparent, no
 * padding, no shadow) : nivo wraps custom tooltips in that container, and
 * the actual look is owned by `ChartTooltip`, which uses DaisyUI classes so
 * it inherits the design tokens instead of restating them.
 *
 * @param {Object} [props]
 * @param {Object} [props.colors] - Resolved colors — `{ text , muted , grid , border }`.
 * @param {string} [props.fontFamily='inherit'] - Font family ; `inherit` picks up the app font instead of nivo's `sans-serif`.
 * @param {number} [props.fontSize=12] - Base font size in px.
 * @param {number|string} [props.labelFontWeight=500] - Weight of the data labels only, not the axis or legend text.
 * @param {string} [props.labelOutlineColor='rgb(255 255 255 / 0.85)'] - Halo drawn around the data labels. Light whatever the theme — see above.
 * @param {number} [props.labelOutlineWidth=2] - Width of that halo. `0` removes it, which is what a chart writing its labels on the page background wants.
 * @param {Object} [props.overrides] - Deeply merged on top of the result.
 * @param {number|string} [props.tickFontWeight=500] - Weight of the axis tick labels.
 * @param {number} [props.tickOutlineWidth=2] - Halo drawn around the tick labels, in the surface color. `0` removes it.
 *
 * @returns {Object} A nivo theme object.
 *
 * @example
 * ```js
 * const theme = buildChartTheme( { colors : { text : '#2E3440' } } ) ;
 * ```
 */
export const buildChartTheme = ( {
    colors ,
    fontFamily = 'inherit' ,
    fontSize = 12 ,
    labelFontWeight = 500 ,
    labelOutlineColor = LABEL_OUTLINE_COLOR ,
    labelOutlineWidth = LABEL_OUTLINE_WIDTH ,
    overrides ,
    tickFontWeight = 500 ,
    tickOutlineWidth = 2 ,
} = {} ) =>
{
    const text   = colors?.text   ?? FALLBACK_TEXT ;
    const muted  = colors?.muted  ?? FALLBACK_TEXT ;
    const grid   = colors?.grid   ?? FALLBACK_LINE ;
    const border = colors?.border ?? FALLBACK_LINE ;

    // No resolved surface means no halo yet — a stroke in an unknown color
    // would outline the glyphs in whatever `currentColor` happens to be.
    const surface = colors?.surface ;
    const halo    = surface ? tickOutlineWidth : 0 ;

    const theme =
    {
        background : 'transparent' ,

        text :
        {
            fontFamily ,
            fontSize ,
            fill         : text ,
            outlineWidth : 0 ,
            outlineColor : 'transparent' ,
        } ,

        axis :
        {
            domain : { line : { stroke : border , strokeWidth : 1 } } ,
            legend :
            {
                text :
                {
                    fontFamily ,
                    fontSize     : fontSize ,
                    fill         : muted ,
                    outlineWidth : 0 ,
                    outlineColor : 'transparent' ,
                } ,
            } ,
            ticks :
            {
                line : { stroke : border , strokeWidth : 1 } ,
                // Tick labels are the one piece of chrome that sits *over* the
                // data : a polar chart's value axis crosses its own bars, and a
                // cartesian one runs along the plot edge. nivo renders
                // `outline*` as a stroked copy of the glyphs underneath
                // (`@nivo/text`), which reads as a halo in the surface color and
                // is what keeps them legible without a solid backing plate.
                text :
                {
                    fontFamily ,
                    fontSize     : fontSize - 1 ,
                    fontWeight   : tickFontWeight ,
                    fill         : text ,
                    outlineWidth : halo ,
                    outlineColor : surface ?? 'transparent' ,
                } ,
            } ,
        } ,

        grid : { line : { stroke : grid , strokeWidth : 1 } } ,

        legends :
        {
            title : { text : { fontFamily , fontSize , fill : text } } ,
            text  : { fontFamily , fontSize : fontSize - 1 , fill : text } ,
            ticks : { line : {} , text : { fontFamily , fontSize : fontSize - 2 , fill : muted } } ,
            hidden : { symbol : { fill : muted , opacity : 0.35 } , text : { fill : muted } } ,
        } ,

        // Data labels — bar labels, heatmap labels, arc labels. Heavier than
        // the rest of the chrome : they sit on top of colored marks rather
        // than on the background, so they need more weight to stay legible.
        // Note that the rendered weight depends on what the app font ships :
        // a font without a 600 face snaps this to its nearest heavier one.
        //
        // They carry a halo for the same reason the tick labels do, but NOT
        // in the same color, and that is the trap. A halo has to contrast
        // with the TEXT it surrounds, not with the page behind it — and the
        // two only coincide for the ticks. A tick is written in
        // `base-content`, which flips with the theme, so `surface` is the
        // right answer for it. A data label is written in the mark's own
        // color darkened, so it is dark in BOTH themes, sitting on a fill
        // that is light in both themes : taken from `base-100` its halo
        // would paint dark ink outlined in dark, thickening the glyphs into
        // a blot instead of detaching them. It is light, always.
        //
        // Unlike the tick halo it needs no first-paint guard : its color is
        // a literal and the text it surrounds comes from the mark, so
        // neither waits on the colors resolved from the DOM.
        //
        // `labels.text` is not scoped to labels sitting on a mark, though —
        // nivo reads it for the pie link labels and the chord labels too,
        // which are written in `base-content` out on the page background.
        // Those charts pass `labelOutlineWidth : 0`.
        labels :
        {
            text :
            {
                fontFamily ,
                fontSize ,
                fill         : text ,
                fontWeight   : labelFontWeight ,
                outlineWidth : labelOutlineWidth ,
                outlineColor : labelOutlineWidth ? labelOutlineColor : 'transparent' ,
            } ,
        } ,

        dots : { text : { fontFamily , fontSize , fill : text } } ,

        crosshair :
        {
            line :
            {
                stroke          : text ,
                strokeWidth     : 1 ,
                strokeOpacity   : 0.4 ,
                strokeDasharray : '4 4' ,
            } ,
        } ,

        annotations :
        {
            text    : { fontFamily , fontSize , fill : text , outlineWidth : 0 , outlineColor : 'transparent' } ,
            link    : { stroke : text , strokeWidth : 1 , outlineWidth : 0 , outlineColor : 'transparent' } ,
            outline : { stroke : text , strokeWidth : 1 , outlineWidth : 0 , outlineColor : 'transparent' } ,
            symbol  : { fill : text , outlineWidth : 0 , outlineColor : 'transparent' } ,
        } ,

        // Neutralized on purpose — ChartTooltip owns the look.
        tooltip :
        {
            wrapper   : {} ,
            container :
            {
                background   : 'transparent' ,
                color        : 'inherit' ,
                boxShadow    : 'none' ,
                borderRadius : 0 ,
                padding      : 0 ,
            } ,
            basic          : {} ,
            chip           : {} ,
            table          : {} ,
            tableCell      : {} ,
            tableCellValue : {} ,
        } ,
    } ;

    return overrides ? mergeDeep( theme , overrides ) : theme ;
} ;

export default buildChartTheme ;
