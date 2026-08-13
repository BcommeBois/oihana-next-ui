/**
 * Tracker class name generators.
 *
 * A house component : DaisyUI has no status-strip primitive, so the classes below are
 * plain Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * **Nothing here clips.** The blocks are flex items that always fit, so the track needs
 * no `overflow-hidden` — which is what leaves the DaisyUI tooltip, rendered through
 * `::before` / `::after`, free to appear above a block. Dropping the blocks that will
 * not fit is the component's job, not the stylesheet's.
 *
 * @module themes/components/tracker
 *
 * @safelist
 * ## Block height (responsive)
 * - h-4 | h-6 | h-8 | h-10
 * - sm:h-4 | sm:h-6 | sm:h-8 | sm:h-10
 * - md:h-4 | md:h-6 | md:h-8 | md:h-10
 * - lg:h-4 | lg:h-6 | lg:h-8 | lg:h-10
 * - xl:h-4 | xl:h-6 | xl:h-8 | xl:h-10
 * - 2xl:h-4 | 2xl:h-6 | 2xl:h-8 | 2xl:h-10
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { BASE_300 } from '../colors' ;

import { LG , MD , SM , XS } from '../sizing/sizes' ;

export { LG , MD , SM , XS } from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} TrackerSize
 *
 * @typedef {Object} ResponsiveTrackerSize
 * @property {TrackerSize} [xs] - Default size (no breakpoint prefix).
 * @property {TrackerSize} [sm]
 * @property {TrackerSize} [md]
 * @property {TrackerSize} [lg]
 * @property {TrackerSize} [xl]
 * @property {TrackerSize} [xxl]
 */

/**
 * Valid tracker sizes.
 * @type {TrackerSize[]}
 */
export const sizes = [ XS , SM , MD , LG ] ;

/**
 * Status of a block nothing has been said about.
 * @type {string}
 */
export const DEFAULT_STATUS = BASE_300 ;

/**
 * Narrowest a block may get before the track drops one, in pixels.
 *
 * Below roughly this, a block stops reading as a block : it is a hairline, it carries no
 * colour the eye can name, and it is impossible to hover or tap.
 *
 * @type {number}
 */
export const MIN_BLOCK_WIDTH = 6 ;

/**
 * Gap between two blocks, in pixels. Kept in sync with `gap-px` on the track — the count
 * of blocks that fit is arithmetic, and the gaps are part of it.
 * @type {number}
 */
export const BLOCK_GAP = 1 ;

const blockHeightMap =
{
    [ XS ] : 'h-4' ,
    [ SM ] : 'h-6' ,
    [ MD ] : 'h-8' ,
    [ LG ] : 'h-10' ,
} ;

const createBlockHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + blockHeightMap[ value ] ] : true } ) ;

/**
 * Generates responsive block height classes.
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less default.
 * Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getTrackerBlockHeight = getResponsiveDefinition(
    createBlockHeight ,
    value => !!blockHeightMap[ value ] ,
) ;

export const TRACKER        = 'flex w-full flex-col gap-2' ;
export const TRACKER_TRACK  = 'flex w-full items-stretch gap-px' ;
export const TRACKER_BLOCK  = 'min-w-0 flex-1 rounded-xs first:rounded-l-sm last:rounded-r-sm' ;
export const TRACKER_LABELS = 'flex items-center justify-between gap-4 text-xs text-base-content/60' ;

/**
 * Generates the container className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The container className expression.
 *
 * @example
 * ```js
 * getTrackerClasses() ;
 * // → 'flex w-full flex-col gap-2'
 * ```
 */
export const getTrackerClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    TRACKER ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the track className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {TrackerSize | ResponsiveTrackerSize} [props.size='md'] - Block height, scalar or per breakpoint.
 *
 * @returns {string} The track className expression.
 *
 * @example
 * ```js
 * getTrackerTrackClasses({ size: 'lg' }) ;
 * // → 'flex w-full items-stretch gap-px h-10'
 * ```
 */
export const getTrackerTrackClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    TRACKER_TRACK ,
    {
        ...before ,

        ...getTrackerBlockHeight( size ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a block className expression, and the inline style a non-token colour needs.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.hoverEffect=false] - Fade the block on hover.
 * @param {string} [props.status] - A DaisyUI colour token, or any CSS colour.
 *
 * @returns {{ className : string , style : Object | undefined }} The block className and style.
 *
 * @example
 * ```js
 * getTrackerBlock({ status: 'success' }) ;
 * // → { className : 'min-w-0 flex-1 rounded-xs … bg-success' , style : undefined }
 * ```
 */
export const getTrackerBlock =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    hoverEffect = false ,
    status ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( status ) ;

    return {
        className : cn
        (
            beforeClassName ,
            TRACKER_BLOCK ,
            {
                ...before ,

                ...definition ,

                ...hoverEffect === true && { 'transition-opacity hover:opacity-60' : true } ,

                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the bounds row className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The bounds row className expression.
 *
 * @example
 * ```js
 * getTrackerLabelsClasses() ;
 * // → 'flex items-center justify-between gap-4 text-xs text-base-content/60'
 * ```
 */
export const getTrackerLabelsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    TRACKER_LABELS ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export default getTrackerClasses ;
