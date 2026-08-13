/**
 * Sparkline class name generators.
 *
 * A house component : DaisyUI has no inline chart glyph, so the classes below are plain
 * Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * **The geometry is drawn in a fixed viewBox and stretched by CSS.** With
 * `preserveAspectRatio="none"` the curve fills whatever width it is given, which is what
 * removes the need to measure anything : the same markup renders identically on the
 * server and on the client, and a table can hold fifty of these without fifty resize
 * observers. The stroke is kept honest by `vector-effect="non-scaling-stroke"`, without
 * which the stretch would thicken the line horizontally.
 *
 * The colour rides on `currentColor`, so one class drives the stroke, the fill and the
 * gradient stops at once.
 *
 * @module themes/components/sparkline
 *
 * @safelist
 * ## Height (responsive)
 * - h-4 | h-6 | h-8 | h-12
 * - sm:h-4 | sm:h-6 | sm:h-8 | sm:h-12
 * - md:h-4 | md:h-6 | md:h-8 | md:h-12
 * - lg:h-4 | lg:h-6 | lg:h-8 | lg:h-12
 * - xl:h-4 | xl:h-6 | xl:h-8 | xl:h-12
 * - 2xl:h-4 | 2xl:h-6 | 2xl:h-8 | 2xl:h-12
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveTextColor from './helpers/resolveTextColor' ;

import { BASE_CONTENT , ERROR , PRIMARY , SUCCESS } from '../colors' ;

import { LG , MD , SM , XS } from '../sizing/sizes' ;

export { LG , MD , SM , XS } from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} SparklineSize
 *
 * @typedef {Object} ResponsiveSparklineSize
 * @property {SparklineSize} [xs] - Default size (no breakpoint prefix).
 * @property {SparklineSize} [sm]
 * @property {SparklineSize} [md]
 * @property {SparklineSize} [lg]
 * @property {SparklineSize} [xl]
 * @property {SparklineSize} [xxl]
 */

/**
 * @typedef {'area' | 'bar' | 'line'} SparklineVariant
 *
 * @typedef {'gradient' | 'none' | 'solid'} SparklineFill
 */

/**
 * Valid sparkline sizes.
 * @type {SparklineSize[]}
 */
export const sizes = [ XS , SM , MD , LG ] ;

/**
 * Valid sparkline variants.
 * @type {SparklineVariant[]}
 */
export const variants = [ 'area' , 'bar' , 'line' ] ;

/**
 * Valid area fills.
 * @type {SparklineFill[]}
 */
export const fills = [ 'gradient' , 'none' , 'solid' ] ;

/**
 * Default colour.
 * @type {string}
 */
export const DEFAULT_COLOR = PRIMARY ;

/**
 * Colours used by `colorByTrend`, keyed by direction.
 *
 * A flat series takes `base-content` rather than the default colour : under
 * `colorByTrend` the colour *is* the message, and `primary` is red in some themes, where
 * "no direction" would then read as "falling".
 *
 * @type {Object}
 */
export const TREND_COLORS =
{
    down : ERROR ,
    flat : BASE_CONTENT ,
    up   : SUCCESS ,
} ;

/**
 * Width of the drawing space, in viewBox units. Arbitrary : the box is stretched to the
 * rendered width, so these units never reach the screen.
 * @type {number}
 */
export const VIEW_WIDTH = 100 ;

/**
 * Height of the drawing space, in viewBox units.
 * @type {number}
 */
export const VIEW_HEIGHT = 100 ;

const heightMap =
{
    [ XS ] : 'h-4' ,
    [ SM ] : 'h-6' ,
    [ MD ] : 'h-8' ,
    [ LG ] : 'h-12' ,
} ;

const createHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + heightMap[ value ] ] : true } ) ;

/**
 * Generates responsive height classes.
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less default.
 * Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getSparklineHeight = getResponsiveDefinition(
    createHeight ,
    value => !!heightMap[ value ] ,
) ;

// `overflow-visible` matters : the stroke keeps its pixel width whatever the stretch, so
// half of it falls outside the viewBox at the top and bottom of the curve. Padding the
// box in viewBox units could not fix that — the conversion depends on the rendered size.
export const SPARKLINE = 'w-full overflow-visible' ;

/**
 * Generates the sparkline className expression, and the inline style a non-token colour
 * needs.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 * @param {SparklineSize | ResponsiveSparklineSize} [props.size='md'] - Height, scalar or per breakpoint.
 *
 * @returns {{ className : string , style : Object | undefined }} The className and style.
 *
 * @example
 * ```js
 * getSparkline({ color: 'success', size: 'lg' }) ;
 * // → { className : 'w-full overflow-visible text-success h-12' , style : undefined }
 * ```
 */
export const getSparkline =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size = MD ,
} = {} ) =>
{
    const { definition , style } = resolveTextColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            SPARKLINE ,
            {
                ...before ,

                ...definition ,

                ...getSparklineHeight( size ) ,

                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

export default getSparkline ;
