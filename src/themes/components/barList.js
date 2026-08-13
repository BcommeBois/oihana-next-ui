/**
 * Bar list class name generators.
 *
 * A house component : DaisyUI has no ranked bar list, so the classes below are plain
 * Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * The list is a two-column grid and every row is a **subgrid** spanning both columns.
 * That is what keeps the bars and their values on the same baseline : laid out as two
 * independent columns, the two sides drift apart as soon as a row changes height, and
 * stay aligned only through margins copied by hand on both sides.
 *
 * @module themes/components/barList
 *
 * @safelist
 * ## Row height (responsive)
 * - h-7 | h-8 | h-10
 * - sm:h-7 | sm:h-8 | sm:h-10
 * - md:h-7 | md:h-8 | md:h-10
 * - lg:h-7 | lg:h-8 | lg:h-10
 * - xl:h-7 | xl:h-8 | xl:h-10
 * - 2xl:h-7 | 2xl:h-8 | 2xl:h-10
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { LG , MD , SM } from '../sizing/sizes' ;

export { LG , MD , SM } from '../sizing/sizes' ;

/**
 * @typedef {'sm' | 'md' | 'lg'} BarListSize
 *
 * @typedef {Object} ResponsiveBarListSize
 * @property {BarListSize} [xs] - Default size (no breakpoint prefix).
 * @property {BarListSize} [sm]
 * @property {BarListSize} [md]
 * @property {BarListSize} [lg]
 * @property {BarListSize} [xl]
 * @property {BarListSize} [xxl]
 */

/**
 * Valid bar list sizes.
 *
 * The scale is about row height, which on a touch screen is also the size of the target :
 * `lg` clears the 40px mark, `sm` is for a dense table where nothing is clickable.
 *
 * @type {BarListSize[]}
 */
export const sizes = [ SM , MD , LG ] ;

const rowHeightMap =
{
    [ SM ] : 'h-7' ,
    [ MD ] : 'h-8' ,
    [ LG ] : 'h-10' ,
} ;

const createRowHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + rowHeightMap[ value ] ] : true } ) ;

/**
 * Generates responsive row height classes.
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less default.
 * Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getBarListRowHeight = getResponsiveDefinition(
    createRowHeight ,
    value => !!rowHeightMap[ value ] ,
) ;

// The row is left to stretch rather than centred : both cells then fill the row height,
// which is what lets the bar be positioned with `inset-y-0` instead of a second height.
export const BAR_LIST       = 'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1.5' ;
export const BAR_LIST_ROW   = 'col-span-2 grid grid-cols-subgrid' ;
export const BAR_LIST_TRACK = 'group relative flex h-full min-w-0 items-center rounded-sm' ;
export const BAR_LIST_BAR   = 'absolute inset-y-0 left-0 rounded-sm opacity-25' ;
export const BAR_LIST_LABEL = 'relative flex min-w-0 items-center gap-2 px-2 text-sm' ;
export const BAR_LIST_VALUE = 'flex items-center justify-end text-sm tabular-nums text-base-content' ;

/**
 * Generates the list className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The list className expression.
 *
 * @example
 * ```js
 * getBarListClasses() ;
 * // → 'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1.5'
 * ```
 */
export const getBarListClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    BAR_LIST ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a row className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {BarListSize | ResponsiveBarListSize} [props.size='md'] - Row height, scalar or per breakpoint.
 *
 * @returns {string} The row className expression.
 *
 * @example
 * ```js
 * getBarListRowClasses({ size: 'lg' }) ;
 * // → 'col-span-2 grid grid-cols-subgrid items-center h-10'
 * ```
 */
export const getBarListRowClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    BAR_LIST_ROW ,
    {
        ...before ,

        ...getBarListRowHeight( size ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the track className expression — the cell a bar and its label share.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.interactive=false] - Whether the row responds to a click.
 *
 * @returns {string} The track className expression.
 *
 * @example
 * ```js
 * getBarListTrackClasses({ interactive: true }) ;
 * // → '… cursor-pointer text-left focus-visible:outline-2 …'
 * ```
 */
export const getBarListTrackClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    interactive = false ,
} = {} ) => cn
(
    beforeClassName ,
    BAR_LIST_TRACK ,
    {
        ...before ,

        ...interactive === true && {
            'cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content/40' : true ,
        } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a bar className expression, and the inline style a non-token colour needs.
 *
 * The bar is a tint rather than a solid fill : the label sits on top of it, and a solid
 * theme colour would leave that text unreadable on half the rows. The opacity carries
 * the tint, which keeps one code path for theme tokens and raw CSS colours alike.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.animated=false] - Ease the bar to its new width on value changes.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 * @param {boolean} [props.interactive=false] - Whether the row responds to a click.
 *
 * @returns {{ className : string , style : Object | undefined }} The bar className and style.
 *
 * @example
 * ```js
 * getBarListBar({ color: 'primary' }) ;
 * // → { className : 'absolute inset-y-0 left-0 rounded-sm opacity-25 bg-primary' , style : undefined }
 * ```
 */
export const getBarListBar =
({
    after ,
    animated = false ,
    before ,
    beforeClassName ,
    className ,
    color ,
    interactive = false ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            BAR_LIST_BAR ,
            {
                ...before ,

                ...definition ,

                ...animated === true && { 'transition-[width] duration-500 ease-out' : true } ,

                ...interactive === true && { 'group-hover:opacity-40' : true } ,

                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the label className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The label className expression.
 *
 * @example
 * ```js
 * getBarListLabelClasses() ;
 * // → 'relative flex min-w-0 items-center gap-2 px-2 text-sm'
 * ```
 */
export const getBarListLabelClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    BAR_LIST_LABEL ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the value cell className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The value cell className expression.
 *
 * @example
 * ```js
 * getBarListValueClasses() ;
 * // → 'flex items-center justify-end text-sm tabular-nums text-base-content'
 * ```
 */
export const getBarListValueClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    BAR_LIST_VALUE ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export default getBarListClasses ;
