/**
 * Metric legend class name generators.
 *
 * A house component : DaisyUI has no legend primitive, so the classes below are plain
 * Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * **Both orientations set every layout property.** A legend told to switch at a
 * breakpoint has to undo what the other orientation had set — `flex-wrap` left over from
 * the horizontal default would keep wrapping a column — so each map holds the whole set
 * rather than the difference.
 *
 * @module themes/components/metricLegend
 *
 * @safelist
 * ## Orientation (responsive)
 * - flex-row | flex-wrap | items-center | flex-col | flex-nowrap | items-start
 * - sm:flex-row | sm:flex-wrap | sm:items-center | sm:flex-col | sm:flex-nowrap | sm:items-start
 * - md:flex-row | md:flex-wrap | md:items-center | md:flex-col | md:flex-nowrap | md:items-start
 * - lg:flex-row | lg:flex-wrap | lg:items-center | lg:flex-col | lg:flex-nowrap | lg:items-start
 * - xl:flex-row | xl:flex-wrap | xl:items-center | xl:flex-col | xl:flex-nowrap | xl:items-start
 * - 2xl:flex-row | 2xl:flex-wrap | 2xl:items-center | 2xl:flex-col | 2xl:flex-nowrap | 2xl:items-start
 *
 * ## Text size (responsive)
 * - text-xs | text-sm | text-base
 * - sm:text-xs | sm:text-sm | sm:text-base
 * - md:text-xs | md:text-sm | md:text-base
 * - lg:text-xs | lg:text-sm | lg:text-base
 * - xl:text-xs | xl:text-sm | xl:text-base
 * - 2xl:text-xs | 2xl:text-sm | 2xl:text-base
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

import { MD , SM , XS } from '../sizing/sizes' ;

export { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

export { MD , SM , XS } from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md'} MetricLegendSize
 *
 * @typedef {Object} ResponsiveMetricLegendSize
 * @property {MetricLegendSize} [xs] - Default size (no breakpoint prefix).
 * @property {MetricLegendSize} [sm]
 * @property {MetricLegendSize} [md]
 * @property {MetricLegendSize} [lg]
 * @property {MetricLegendSize} [xl]
 * @property {MetricLegendSize} [xxl]
 *
 * @typedef {'dot' | 'line' | 'square'} MetricLegendMarker
 *
 * @typedef {'horizontal' | 'vertical'} MetricLegendOrientation
 *
 * @typedef {Object} ResponsiveMetricLegendOrientation
 * @property {MetricLegendOrientation} [xs] - Default orientation (no breakpoint prefix).
 * @property {MetricLegendOrientation} [sm]
 * @property {MetricLegendOrientation} [md]
 * @property {MetricLegendOrientation} [lg]
 * @property {MetricLegendOrientation} [xl]
 * @property {MetricLegendOrientation} [xxl]
 */

/**
 * Valid legend sizes.
 * @type {MetricLegendSize[]}
 */
export const sizes = [ XS , SM , MD ] ;

/**
 * Valid legend orientations.
 * @type {MetricLegendOrientation[]}
 */
export const orientations = [ HORIZONTAL , VERTICAL ] ;

/**
 * Dot marker : the default, and what a filled mark — a bar segment, a tracker block —
 * looks like at legend scale.
 * @type {string}
 */
export const DOT = 'dot' ;

/**
 * Line marker : a short stroke, for a legend sitting under a set of sparklines.
 * @type {string}
 */
export const LINE = 'line' ;

/**
 * Square marker.
 * @type {string}
 */
export const SQUARE = 'square' ;

/**
 * Valid marker shapes.
 * @type {string[]}
 */
export const markers = [ DOT , LINE , SQUARE ] ;

/**
 * Default legend size : `xs` on mobile, `sm` from the `sm` breakpoint up.
 * @type {ResponsiveMetricLegendSize}
 */
export const DEFAULT_SIZE = { [ XS ] : XS , [ SM ] : SM } ;

const markerMap =
{
    [ DOT ]    : 'size-2.5 shrink-0 rounded-full' ,
    [ LINE ]   : 'h-0.5 w-3 shrink-0 rounded-full' ,
    [ SQUARE ] : 'size-2.5 shrink-0 rounded-xs' ,
} ;

const orientationMap =
{
    [ HORIZONTAL ] : [ 'flex-row' , 'flex-wrap'  , 'items-center' ] ,
    [ VERTICAL ]   : [ 'flex-col' , 'flex-nowrap' , 'items-start' ] ,
} ;

const textSizeMap =
{
    [ XS ] : 'text-xs' ,
    [ SM ] : 'text-sm' ,
    [ MD ] : 'text-base' ,
} ;

const createOrientation = ( value , { prefix = '' } = {} ) => Object.fromEntries
(
    orientationMap[ value ].map( name => [ prefix + name , true ] ) ,
) ;

const createTextSize = ( value , { prefix = '' } = {} ) => ( { [ prefix + textSizeMap[ value ] ] : true } ) ;

/**
 * Generates responsive orientation classes.
 *
 * Accepts a scalar orientation or a breakpoint→orientation object ; `xs` is the
 * prefix-less default. Responsive classes are built at runtime, hence the `@safelist`.
 *
 * @type {Function}
 */
export const getMetricLegendOrientation = getResponsiveDefinition(
    createOrientation ,
    value => !!orientationMap[ value ] ,
) ;

/**
 * Generates responsive text size classes.
 * @type {Function}
 */
export const getMetricLegendTextSize = getResponsiveDefinition(
    createTextSize ,
    value => !!textSizeMap[ value ] ,
) ;

export const METRIC_LEGEND       = 'flex gap-x-4 gap-y-1' ;
export const METRIC_LEGEND_ITEM  = 'flex items-center gap-1.5' ;
export const METRIC_LEGEND_NAME  = 'text-base-content/70' ;
export const METRIC_LEGEND_VALUE = 'font-medium tabular-nums' ;

/**
 * Generates the legend className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {MetricLegendOrientation | ResponsiveMetricLegendOrientation} [props.orientation='horizontal'] - Layout direction, scalar or per breakpoint.
 * @param {MetricLegendSize | ResponsiveMetricLegendSize} [props.size] - Text size, scalar or per breakpoint.
 *
 * @returns {string} The legend className expression.
 *
 * @example
 * ```js
 * getMetricLegendClasses() ;
 * // → 'flex gap-x-4 gap-y-1 flex-row flex-wrap items-center text-xs sm:text-sm'
 *
 * getMetricLegendClasses({ orientation: { xs: 'vertical', lg: 'horizontal' } }) ;
 * // → 'flex gap-x-4 gap-y-1 flex-col flex-nowrap items-start lg:flex-row lg:flex-wrap lg:items-center …'
 * ```
 */
export const getMetricLegendClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    orientation = HORIZONTAL ,
    size = DEFAULT_SIZE ,
} = {} ) => cn
(
    beforeClassName ,
    METRIC_LEGEND ,
    {
        ...before ,

        ...getMetricLegendOrientation( orientation ) ,

        ...getMetricLegendTextSize( size ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates an entry className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The entry className expression.
 *
 * @example
 * ```js
 * getMetricLegendItemClasses() ;
 * // → 'flex items-center gap-1.5'
 * ```
 */
export const getMetricLegendItemClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    METRIC_LEGEND_ITEM ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a marker className expression, and the inline style a non-token colour needs.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 * @param {string} [props.marker='dot'] - `'dot'`, `'line'` or `'square'`.
 *
 * @returns {{ className : string , style : Object | undefined }} The marker className and style.
 *
 * @example
 * ```js
 * getMetricLegendMarker({ color: 'success' }) ;
 * // → { className : 'size-2.5 shrink-0 rounded-full bg-success' , style : undefined }
 *
 * getMetricLegendMarker({ color: '#4E79A7', marker: 'line' }) ;
 * // → { className : 'h-0.5 w-3 shrink-0 rounded-full' , style : { backgroundColor : '#4E79A7' } }
 * ```
 */
export const getMetricLegendMarker =
({
    className ,
    color ,
    marker = DOT ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return {
        className : cn( markerMap[ marker ] ?? markerMap[ DOT ] , definition , className ) ,
        style ,
    } ;
} ;

export default getMetricLegendClasses ;
