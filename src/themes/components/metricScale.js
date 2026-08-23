/**
 * Metric scale class name generators.
 *
 * A house component, like `MetricLegend` : DaisyUI has no scale primitive, so
 * the classes below are plain Tailwind on theme tokens rather than a port.
 *
 * **The bands are discrete on purpose, and it is not a stylistic choice.** The
 * charts this serves quantize their color scale — `HeatMapChart` hands nivo a
 * `type : 'quantize'` and an array of colors, so a cell's color is one bucket
 * among N rather than a point on a ramp. A smooth gradient would misstate how
 * the colors are handed out ; the bands say what actually happens.
 *
 * The text size is borrowed from `metricLegend` rather than restated : the two
 * legends sit in the same slot under the same charts and have to read at the
 * same size, and the responsive classes are safelisted once over there.
 *
 * @module themes/components/metricScale
 */

import cn from '../helpers/cn' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { DEFAULT_SIZE , getMetricLegendTextSize } from './metricLegend' ;

import { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

export { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

/**
 * Width the bar takes when it lies flat.
 *
 * Bounded rather than fluid : a scale stretched over a wide card reads as a
 * decoration running the width of the page, and the two figures at its ends
 * drift so far apart they stop being read as a pair.
 *
 * @type {string}
 */
export const METRIC_SCALE_LENGTH = 'w-full max-w-56' ;

/**
 * Height the bar takes when it stands up.
 * @type {string}
 */
export const METRIC_SCALE_HEIGHT = 'h-40' ;

const rootMap =
{
    [ HORIZONTAL ] : [ 'flex-col' , METRIC_SCALE_LENGTH ] ,
    [ VERTICAL ]   : [ 'flex-row' , METRIC_SCALE_HEIGHT ] ,
} ;

const barMap =
{
    // The bands are laid out in value order, lowest first.
    [ HORIZONTAL ] : [ 'h-2' , 'w-full' , 'flex-row' ] ,
    // Lowest first in the DOM too, which `flex-col-reverse` then paints at the
    // bottom — where a reader expects the small end of a vertical scale.
    [ VERTICAL ]   : [ 'w-2' , 'h-full' , 'flex-col-reverse' ] ,
} ;

const boundsMap =
{
    [ HORIZONTAL ] : [ 'flex-row' , 'justify-between' , 'w-full' ] ,
    [ VERTICAL ]   : [ 'flex-col-reverse' , 'justify-between' , 'h-full' ] ,
} ;

const ticksMap =
{
    // Absolutely placed, because the labels have unequal widths : distributing
    // them with `justify-between` would put `120` a few pixels off the band edge
    // it names, and a scale read askew is worse than one not read at all. The
    // first label stays in flow, which is what gives the row its height at any
    // text size — no spacer, no height map to keep in step with the sizes.
    [ HORIZONTAL ] : [ 'relative' , 'w-full' ] ,
    // Standing up the boxes are all one line tall, so `justify-between` is exact
    // on its own and there is nothing to place by hand.
    [ VERTICAL ]   : [ 'flex' , 'flex-col-reverse' , 'justify-between' , 'h-full' ] ,
} ;

export const METRIC_SCALE        = 'flex gap-1.5' ;
export const METRIC_SCALE_BAR    = 'flex overflow-hidden rounded-xs' ;
export const METRIC_SCALE_BAND   = 'flex-1' ;
export const METRIC_SCALE_BOUNDS = 'flex text-base-content/70 tabular-nums' ;
export const METRIC_SCALE_TICKS  = 'text-base-content/70 tabular-nums' ;

/**
 * Generates the scale className expression.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction.
 * @param {string|Object} [props.size] - Text size, scalar or per breakpoint.
 *
 * @returns {string} The scale className expression.
 *
 * @example
 * ```js
 * getMetricScaleClasses() ;
 * // → 'flex gap-1.5 flex-col w-full max-w-56 text-xs sm:text-sm'
 * ```
 */
export const getMetricScaleClasses = ( { className , orientation = HORIZONTAL , size = DEFAULT_SIZE } = {} ) => cn
(
    METRIC_SCALE ,
    rootMap[ orientation ] ?? rootMap[ HORIZONTAL ] ,
    getMetricLegendTextSize( size ) ,
    className ,
) ;

/**
 * Generates the bar className expression.
 *
 * @param {Object} [props]
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction.
 * @returns {string} The bar className expression.
 */
export const getMetricScaleBarClasses = ( { orientation = HORIZONTAL } = {} ) => cn
(
    METRIC_SCALE_BAR ,
    barMap[ orientation ] ?? barMap[ HORIZONTAL ] ,
) ;

/**
 * Generates the bounds row className expression.
 *
 * @param {Object} [props]
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction.
 * @returns {string} The bounds className expression.
 */
export const getMetricScaleBoundsClasses = ( { orientation = HORIZONTAL } = {} ) => cn
(
    METRIC_SCALE_BOUNDS ,
    boundsMap[ orientation ] ?? boundsMap[ HORIZONTAL ] ,
) ;

/**
 * Generates the ticks row className expression.
 *
 * @param {Object} [props]
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction.
 * @returns {string} The ticks className expression.
 */
export const getMetricScaleTicksClasses = ( { orientation = HORIZONTAL } = {} ) => cn
(
    METRIC_SCALE_TICKS ,
    ticksMap[ orientation ] ?? ticksMap[ HORIZONTAL ] ,
) ;

/**
 * Places one tick along the bar.
 *
 * The offset is a percentage worked out from the tick's rank, so it is an
 * inline style and not a class : Tailwind v4 scans source text, and a class
 * built from an index never appears in it.
 *
 * The two ends are pinned to the edges rather than centred on them — a label
 * centred on 100 % would hang half-way out of the frame — which is the same
 * convention the standing scale gets for free from its equal line heights.
 *
 * @param {Object} props
 * @param {number} props.index - The tick's rank, `0` first.
 * @param {number} props.total - The number of bands, so `total + 1` ticks.
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction.
 *
 * @returns {{ className : string , style : Object | undefined }} What to put on the tick.
 */
export const getMetricScaleTick = ( { index , total , orientation = HORIZONTAL } ) =>
{
    if ( orientation === VERTICAL )
    {
        return { className : '' , style : undefined } ;
    }

    if ( index === 0 )
    {
        // In flow, and therefore the one that gives the row its height.
        return { className : '' , style : undefined } ;
    }

    if ( index === total )
    {
        return { className : 'absolute right-0 top-0' , style : undefined } ;
    }

    return {
        className : 'absolute top-0 -translate-x-1/2' ,
        style     : { left : `${ ( index / total ) * 100 }%` } ,
    } ;
} ;

/**
 * Generates one band's className expression, and the inline style a non-token
 * colour needs.
 *
 * @param {Object} [props]
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 * @returns {{ className : string , style : Object | undefined }} The band className and style.
 */
export const getMetricScaleBand = ( { color } = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return { className : cn( METRIC_SCALE_BAND , definition ) , style } ;
} ;

export default getMetricScaleClasses ;
