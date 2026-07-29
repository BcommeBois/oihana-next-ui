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

export default getChartMargin ;
