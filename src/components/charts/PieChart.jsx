'use client' ;

/**
 * Pie / donut chart.
 *
 * @module components/charts/PieChart
 */

import { useCallback } from 'react' ;

import { ArcLabelComponent } from '@nivo/arcs' ;

import { ResponsivePie , ResponsivePieCanvas } from '@nivo/pie' ;

import { useMedia } from 'react-use' ;

import useChartLayout  from '../../hooks/useChartLayout' ;
import usePalette from '../../hooks/usePalette' ;
import useChartTheme   from '../../hooks/useChartTheme' ;

import { RADIAL } from '../../themes/charts/layout' ;
import { NIVO }   from '../../themes/charts/palettes' ;

import { LABEL_OUTLINE_COLOR , LABEL_OUTLINE_WIDTH } from '../../themes/charts/theme' ;

import ChartFrame   from './ChartFrame' ;
import ChartTooltip from './ChartTooltip' ;

/**
 * The halo of the arc labels, written as inherited SVG paint properties.
 *
 * It cannot come from the theme : nivo styles the labels inside the arcs and
 * the ones at the end of the leader lines from the same `labels.text` node,
 * and only the first kind wants it — the second sits out on the page
 * background in `base-content`, where a light halo circles light text in
 * white and erases it in dark mode.
 *
 * `stroke`, `stroke-width`, `stroke-linejoin` and `paint-order` all inherit,
 * so a wrapper `<g>` around the arc label alone reaches its `<text>` and
 * nothing else. `paint-order` puts the stroke behind the fill, which is what
 * makes it a halo rather than a smear over the glyphs — the same thing nivo
 * does by drawing a stroked copy underneath, done in one element. The width
 * doubles for the same reason nivo doubles it : a stroke is centered on the
 * outline, so half of it lands inside the glyph.
 *
 * @type {Object}
 */
const ARC_LABEL_HALO =
{
    paintOrder     : 'stroke fill' ,
    stroke         : LABEL_OUTLINE_COLOR ,
    strokeLinejoin : 'round' ,
    strokeWidth    : LABEL_OUTLINE_WIDTH * 2 ,
} ;

/**
 * nivo's own arc label, wrapped in the halo.
 *
 * Declared at module level so its identity is stable : passed as
 * `arcLabelsComponent`, a fresh function on every render would remount the
 * whole label layer and drop its transitions.
 *
 * @param {Object} props - The `arcLabelsComponent` props — `{ datum , label , style }`.
 * @returns {React.ReactNode} The label, haloed.
 */
const HaloedArcLabel = ( props ) => (
    <g style={ ARC_LABEL_HALO }>
        <ArcLabelComponent { ...props } />
    </g>
) ;

/**
 * Default arc link label — the slice id followed by its formatted value.
 *
 * @param {Object} datum - The computed datum.
 * @returns {string} The label.
 */
const defaultArcLinkLabel = ( datum ) => `${ datum.id } (${ datum.formattedValue })` ;

/**
 * Pie chart, drawn as a donut by default.
 *
 * `innerRadius` drives the hole : `0.5` gives a donut, `0` a full pie. The
 * donut is the default because the middle of a pie carries no information
 * and the slices are compared by angle either way.
 *
 * Arc link labels (the leader lines pointing outside the circle) are on by
 * default and the margin accounts for them — turning them off reclaims that
 * room automatically and grows the circle.
 *
 * **Only the labels inside the arcs carry a halo.** The theme cannot say that
 * — nivo styles both kinds of label from a single `labels.text` node — so it
 * is said on the arc label itself, see `ARC_LABEL_HALO`. The leader labels are
 * left alone, being ordinary text on the page background, exactly like an axis
 * tick. `arcLabelOutline={ false }` removes the halo.
 *
 * The canvas renderer draws its labels itself and takes no component, so it
 * has no halo. It is the renderer for thousands of arcs, which carry no
 * readable label anyway.
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Animate transitions ; forced off under `prefers-reduced-motion`.
 * @param {boolean} [props.arcLabelOutline=true] - Halo behind the labels inside the arcs. Ignored by the canvas renderer — see above.
 * @param {boolean} [props.arcLabels=true] - Draw the value inside each arc, in the arc's own color darkened.
 * @param {Function|string} [props.arcLinkLabel] - Label accessor for the leader lines ; defaults to `id (value)`.
 * @param {boolean} [props.arcLinkLabels=true] - Draw the leader lines outside the circle.
 * @param {string} [props.ariaDescribedBy] - Id of a longer description elsewhere on the page.
 * @param {string} [props.ariaLabel] - Text alternative. Without one the chart is invisible to a screen reader.
 * @param {string} [props.ariaLabelledBy] - Id of an existing visible label, used instead of `ariaLabel`.
 * @param {string|number} [props.aspect] - CSS aspect ratio ; takes precedence over `height`.
 * @param {number} [props.borderWidth=1] - Arc border width — what separates arcs from the background.
 * @param {string} [props.className] - Additional classes for the frame.
 * @param {number} [props.cornerRadius=3] - Rounding of the arc corners.
 * @param {string} [props.emptyLabel='No data'] - Text shown when there is nothing to plot.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {number|string} [props.height=400] - Frame height.
 * @param {number} [props.innerRadius=0.5] - Hole size, `0` to `1`. `0` gives a full pie.
 * @param {boolean|string|Object} [props.legend='bottom'] - `false`, a position, or a nivo legend override.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the chart.
 * @param {Object} [props.margin] - Explicit margin overrides, merged over the computed one.
 * @param {Object} [props.nivoProps] - Escape hatch — spread last onto the nivo component.
 * @param {number} [props.padAngle=0.7] - Gap between arcs, in degrees.
 * @param {string|string[]} [props.palette='nivo'] - Series palette.
 * @param {string} [props.renderer='svg'] - `'svg'` or `'canvas'` (past ~2k arcs).
 * @param {Object} [props.theme] - Partial nivo theme, deeply merged over the DaisyUI one.
 * @param {string} [props.valueFormat] - d3-format string for values.
 *
 * @example
 * ```jsx
 * <PieChart
 *     data = { [ { id : 'python' , value : 339 } , { id : 'css' , value : 53 } ] }
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Full pie, no leader lines, legend on the right
 * <PieChart data={ data } innerRadius={ 0 } arcLinkLabels={ false } legend="right" />
 * ```
 */
const PieChart =
({
    animate = true ,
    arcLabelOutline = true ,
    arcLabels = true ,
    arcLinkLabel = defaultArcLinkLabel ,
    arcLinkLabels = true ,
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    borderWidth = 1 ,
    className ,
    cornerRadius = 3 ,
    data ,
    emptyLabel ,
    emptyState ,
    height = 400 ,
    innerRadius = 0.5 ,
    legend = 'bottom' ,
    loading ,
    margin ,
    nivoProps ,
    padAngle = 0.7 ,
    palette = NIVO ,
    renderer = 'svg' ,
    theme : themeOverrides ,
    valueFormat ,
    ...rest
}) =>
{
    // The theme halo would reach the leader labels too — the arc labels get
    // theirs from `HaloedArcLabel` instead.
    const theme = useChartTheme( { labelOutlineWidth : 0 , overrides : themeOverrides } ) ;

    const colors = usePalette( { palette , count : data?.length ?? 0 } ) ;

    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    const { margin : resolvedMargin , legends } = useChartLayout
    ({
        kind          : RADIAL ,
        legend ,
        margin ,
        outsideLabels : arcLinkLabels ,
    }) ;

    const tooltip = useCallback
    (
        ( { datum } ) => (
            <ChartTooltip
                color = { datum?.color }
                label = { datum?.label ?? datum?.id }
                value = { datum?.formattedValue ?? datum?.value }
            />
        ) ,
        [] ,
    ) ;

    const Component = renderer === 'canvas' ? ResponsivePieCanvas : ResponsivePie ;

    return (
        <ChartFrame
            ariaDescribedBy = { ariaDescribedBy }
            ariaLabel       = { ariaLabel }
            ariaLabelledBy  = { ariaLabelledBy }
            aspect          = { aspect }
            className       = { className }
            data            = { data }
            emptyLabel      = { emptyLabel }
            emptyState      = { emptyState }
            height          = { height }
            loading         = { loading }
        >
            <Component
                activeOuterRadiusOffset = { 8 }
                animate                 = { animate && !reduceMotion }
                arcLabelsComponent      = { arcLabelOutline ? HaloedArcLabel : undefined }
                arcLabelsSkipAngle      = { 10 }
                arcLabelsTextColor      = {{ from : 'color' , modifiers : [ [ 'darker' , 2 ] ] }}
                arcLinkLabel            = { arcLinkLabel }
                arcLinkLabelsColor      = {{ from : 'color' }}
                arcLinkLabelsSkipAngle  = { 10 }
                arcLinkLabelsTextColor  = {{ theme : 'labels.text.fill' }}
                arcLinkLabelsThickness  = { 2 }
                borderColor             = {{ from : 'color' , modifiers : [ [ 'darker' , 0.8 ] ] }}
                borderWidth             = { borderWidth }
                colors                  = { colors }
                cornerRadius            = { cornerRadius }
                data                    = { data }
                enableArcLabels         = { arcLabels }
                enableArcLinkLabels     = { arcLinkLabels }
                innerRadius             = { innerRadius }
                legends                 = { legends }
                margin                  = { resolvedMargin }
                padAngle                = { padAngle }
                theme                   = { theme }
                tooltip                 = { tooltip }
                valueFormat             = { valueFormat }
                { ...rest }
                { ...nivoProps }
            />
        </ChartFrame>
    ) ;
} ;

PieChart.displayName = 'PieChart' ;

export default PieChart ;
