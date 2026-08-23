/**
 * Automatic chart margins.
 *
 * nivo requires explicit margins, and a chart whose margin does not account
 * for its axis titles, rotated ticks or legend simply clips them. Left to
 * the caller this becomes a hardcoded `margin={{ top : 40 , right : 80 ,
 * bottom : 80 , left : 80 }}` repeated on every chart and re-tuned by hand
 * whenever anything changes.
 *
 * Here the margin is derived from what is actually being drawn, and the
 * explicit `margin` prop stays available as an escape hatch — it is merged
 * on top, so `margin={{ left : 90 }}` overrides only the left side.
 *
 * @module themes/charts/margins
 */

import { LEGEND_SPACE , resolveLegend } from './legends' ;

/**
 * Margin before any axis, title or legend is taken into account.
 * @type {Object.<string,number>}
 */
export const BASE_MARGIN = { top : 16 , right : 24 , bottom : 36 , left : 48 } ;

/**
 * Extra room for an axis title.
 * @type {number}
 */
export const AXIS_LEGEND_SPACE = 24 ;

/**
 * Extra room for rotated tick labels.
 * @type {number}
 */
export const TICK_ROTATION_SPACE = 22 ;

/**
 * Room taken by tick labels alone, reclaimed when an axis is hidden.
 * @type {Object.<string,number>}
 */
export const AXIS_TICKS_SPACE = { bottom : 24 , left : 34 } ;

/**
 * Computes the chart margin from its axes and legend.
 *
 * @param {Object} [props]
 * @param {Object} [props.xAxis] - Bottom axis config — `{ legend , tickRotation , hide }`.
 * @param {Object} [props.yAxis] - Left axis config — `{ legend , hide }`.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - Explicit overrides, merged last.
 *
 * @returns {{top:number,right:number,bottom:number,left:number}} The resolved margin.
 *
 * @example
 * ```js
 * getChartMargin( { xAxis : { legend : 'country' } , legend : 'bottom' } ) ;
 * // → { top : 16 , right : 24 , bottom : 112 , left : 48 }
 * ```
 */
export const getChartMargin = ( { xAxis , yAxis , legend , margin } = {} ) =>
{
    const result = { ...BASE_MARGIN } ;

    if ( xAxis?.hide )
    {
        result.bottom -= AXIS_TICKS_SPACE.bottom ;
    }
    else
    {
        if ( xAxis?.legend )
        {
            result.bottom += AXIS_LEGEND_SPACE ;
        }

        if ( xAxis?.tickRotation )
        {
            result.bottom += TICK_ROTATION_SPACE ;
        }
    }

    if ( yAxis?.hide )
    {
        result.left -= AXIS_TICKS_SPACE.left ;
    }
    else if ( yAxis?.legend )
    {
        result.left += AXIS_LEGEND_SPACE ;
    }

    const resolvedLegend = resolveLegend( legend ) ;

    if ( resolvedLegend )
    {
        const side = resolvedLegend.position ?? 'bottom' ;
        result[ side ] = ( result[ side ] ?? 0 ) + ( LEGEND_SPACE[ side ] ?? LEGEND_SPACE.bottom ) ;
    }

    // Never let a reclaimed side collapse to nothing — marks would touch the edge.
    result.top    = Math.max( result.top    , 8 ) ;
    result.right  = Math.max( result.right  , 8 ) ;
    result.bottom = Math.max( result.bottom , 8 ) ;
    result.left   = Math.max( result.left   , 8 ) ;

    return { ...result , ...margin } ;
} ;

/**
 * Margin for an axisless chart, before labels and legend.
 * @type {Object.<string,number>}
 */
export const RADIAL_BASE_MARGIN = { top : 16 , right : 16 , bottom : 16 , left : 16 } ;

/**
 * Room the labels drawn outside the shape need to the left and right.
 *
 * Enough for a word, because that is what sticks out sideways — and a long
 * label on the left needs as much room as one on the right, so the two sides
 * take the same figure.
 *
 * @type {number}
 */
export const ARC_LINK_LABELS_SPACE = 56 ;

/**
 * Room those same labels need above and below.
 *
 * **Deliberately much smaller than the sideways figure.** A label at the top
 * or the bottom of a circle sticks out by its *line height*, not by its
 * width, so reserving a word's worth there buys nothing — and on a circular
 * chart the vertical margin is rarely free : the shape is sized by whichever
 * inner dimension is smaller, which in a box wider than it is tall is the
 * height. Every pixel over-reserved above and below therefore shrinks the
 * circle *and* leaves a visible band under it.
 *
 * It used to be the same figure on all four sides, which went unnoticed for
 * as long as the legend sat inside the SVG : the room reserved for it under
 * the chart swallowed the excess. Drawing the legend in HTML took that room
 * away and left the band in plain sight.
 *
 * @type {number}
 */
export const ARC_LINK_LABELS_HEIGHT = 24 ;

/**
 * Computes the margin of a chart drawn without cartesian axes — pie, radial
 * bar, radar, waffle.
 *
 * `getChartMargin` reasons about axis titles and ticks, which these do not
 * have : what eats into the box here is the labels drawn outside the shape
 * and the legend. Too small a margin does not clip a label, it shrinks the
 * plotted shape, which is easy to miss.
 *
 * @param {Object} [props]
 * @param {boolean} [props.outsideLabels=false] - Whether labels are drawn outside the plotted shape.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - Explicit overrides, merged last.
 *
 * @returns {{top:number,right:number,bottom:number,left:number}} The resolved margin.
 *
 * @example
 * ```js
 * getRadialMargin( { outsideLabels : true } ) ;
 * // → { top : 40 , right : 72 , bottom : 40 , left : 72 }
 * ```
 */
export const getRadialMargin = ( { outsideLabels = false , legend , margin } = {} ) =>
{
    const result = { ...RADIAL_BASE_MARGIN } ;

    if ( outsideLabels )
    {
        result.top    += ARC_LINK_LABELS_HEIGHT ;
        result.right  += ARC_LINK_LABELS_SPACE ;
        result.bottom += ARC_LINK_LABELS_HEIGHT ;
        result.left   += ARC_LINK_LABELS_SPACE ;
    }

    const resolvedLegend = resolveLegend( legend ) ;

    if ( resolvedLegend )
    {
        const side = resolvedLegend.position ?? 'bottom' ;
        result[ side ] = ( result[ side ] ?? 0 ) + ( LEGEND_SPACE[ side ] ?? LEGEND_SPACE.bottom ) ;
    }

    return { ...result , ...margin } ;
} ;

/**
 * Margin for a grid chart, before axes and legend.
 * @type {Object.<string,number>}
 */
export const GRID_MARGIN = { top : 34 , right : 16 , bottom : 16 , left : 42 } ;

/**
 * Room the spelled-out weekday labels need on the left.
 * @type {number}
 */
export const WEEKDAY_LABELS_SPACE = 86 ;

/**
 * Computes the margin of a grid chart — calendar, time range, heatmap.
 *
 * These label their columns *above* the grid and their rows to its *left*,
 * outside the plotted area — the mirror of `getChartMargin`, which puts them
 * bottom and left. The uniform inset {@link getRadialMargin} gives is not
 * enough either : the labels get clipped by the frame rather than shrinking
 * the grid, which is easy to miss until a label is cut in half.
 *
 * Row labels are data-driven and can be long — country names on a heatmap.
 * When they collide, widen the one side with `margin={{ left : 120 }}`.
 *
 * @param {Object} [props]
 * @param {boolean} [props.weekdayLabels=false] - Whether spelled-out weekday names are drawn on the left.
 * @param {Object} [props.xAxis] - Top axis config — `{ legend , tickRotation }`.
 * @param {Object} [props.yAxis] - Left axis config — `{ legend }`.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - Explicit overrides, merged last.
 *
 * @returns {{top:number,right:number,bottom:number,left:number}} The resolved margin.
 *
 * @example
 * ```js
 * getGridMargin( { weekdayLabels : true } ) ;
 * // → { top : 34 , right : 16 , bottom : 16 , left : 86 }
 * ```
 */
export const getGridMargin = ( { weekdayLabels = false , xAxis , yAxis , legend , margin } = {} ) =>
{
    const result = { ...GRID_MARGIN } ;

    if ( weekdayLabels )
    {
        result.left = WEEKDAY_LABELS_SPACE ;
    }

    // The column labels sit on top here, so an axis title grows the top side.
    if ( xAxis?.legend )
    {
        result.top += AXIS_LEGEND_SPACE ;
    }

    if ( xAxis?.tickRotation )
    {
        result.top += TICK_ROTATION_SPACE ;
    }

    if ( yAxis?.legend )
    {
        result.left += AXIS_LEGEND_SPACE ;
    }

    const resolvedLegend = resolveLegend( legend ) ;

    if ( resolvedLegend )
    {
        const side = resolvedLegend.position ?? 'bottom' ;
        result[ side ] = ( result[ side ] ?? 0 ) + ( LEGEND_SPACE[ side ] ?? LEGEND_SPACE.bottom ) ;
    }

    return { ...result , ...margin } ;
} ;

export default getChartMargin ;
