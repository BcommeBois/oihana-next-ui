/**
 * Category bar class name generators.
 *
 * A house component : DaisyUI has no stacked proportion bar, so the classes below are
 * plain Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * Segments round their own outer corners (`first:rounded-l-full` / `last:rounded-r-full`)
 * instead of being clipped by an `overflow-hidden` track. The clipping track is the
 * obvious way to do it, and it is a trap here : the DaisyUI tooltip renders through
 * `::before` / `::after`, so any tooltip attached to a segment would be cut off by that
 * very overflow.
 *
 * @module themes/components/categoryBar
 *
 * @safelist
 * ## Track height (responsive)
 * - h-1 | h-1.5 | h-2 | h-3
 * - sm:h-1 | sm:h-1.5 | sm:h-2 | sm:h-3
 * - md:h-1 | md:h-1.5 | md:h-2 | md:h-3
 * - lg:h-1 | lg:h-1.5 | lg:h-2 | lg:h-3
 * - xl:h-1 | xl:h-1.5 | xl:h-2 | xl:h-3
 * - 2xl:h-1 | 2xl:h-1.5 | 2xl:h-2 | 2xl:h-3
 *
 * ## Marker height (responsive)
 * - h-2.5 | h-3 | h-4 | h-5
 * - sm:h-2.5 | sm:h-3 | sm:h-4 | sm:h-5
 * - md:h-2.5 | md:h-3 | md:h-4 | md:h-5
 * - lg:h-2.5 | lg:h-3 | lg:h-4 | lg:h-5
 * - xl:h-2.5 | xl:h-3 | xl:h-4 | xl:h-5
 * - 2xl:h-2.5 | 2xl:h-3 | 2xl:h-4 | 2xl:h-5
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING } from '../colors' ;

import { LG , MD , SM , XS } from '../sizing/sizes' ;

export { LG , MD , SM , XS } from '../sizing/sizes' ;

export { resolveBarColor } ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} CategoryBarSize
 *
 * @typedef {Object} ResponsiveCategoryBarSize
 * @property {CategoryBarSize} [xs] - Default size (no breakpoint prefix).
 * @property {CategoryBarSize} [sm]
 * @property {CategoryBarSize} [md]
 * @property {CategoryBarSize} [lg]
 * @property {CategoryBarSize} [xl]
 * @property {CategoryBarSize} [xxl]
 */

/**
 * Valid category bar sizes.
 * @type {CategoryBarSize[]}
 */
export const sizes = [ XS , SM , MD , LG ] ;

/**
 * Default segment colors, cycled when the caller passes none.
 *
 * The order matches {@link module:themes/charts/palettes}'s `THEME_KEYS`, so a category
 * bar and a `theme`-palette chart on the same page tell the same color story.
 *
 * @type {string[]}
 */
export const DEFAULT_COLORS =
[
    PRIMARY ,
    SECONDARY ,
    ACCENT ,
    INFO ,
    SUCCESS ,
    WARNING ,
    ERROR ,
    NEUTRAL ,
] ;

const trackHeightMap =
{
    [ XS ] : 'h-1' ,
    [ SM ] : 'h-1.5' ,
    [ MD ] : 'h-2' ,
    [ LG ] : 'h-3' ,
} ;

const markerHeightMap =
{
    [ XS ] : 'h-2.5' ,
    [ SM ] : 'h-3' ,
    [ MD ] : 'h-4' ,
    [ LG ] : 'h-5' ,
} ;

const createTrackHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + trackHeightMap[ value ] ] : true } ) ;

const createMarkerHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + markerHeightMap[ value ] ] : true } ) ;

/**
 * Generates responsive track height classes.
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less default.
 * Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getCategoryBarTrackHeight = getResponsiveDefinition(
    createTrackHeight ,
    value => !!trackHeightMap[ value ] ,
) ;

/**
 * Generates responsive marker height classes.
 * @type {Function}
 */
export const getCategoryBarMarkerHeight = getResponsiveDefinition(
    createMarkerHeight ,
    value => !!markerHeightMap[ value ] ,
) ;

export const CATEGORY_BAR         = 'flex w-full flex-col gap-2' ;
export const CATEGORY_BAR_TRACK   = 'relative flex w-full items-center gap-0.5' ;
export const CATEGORY_BAR_SEGMENT = 'h-full first:rounded-l-full last:rounded-r-full' ;
// The fixed height matters : the row is made of empty spacer cells, so without it a bar
// whose labels are all hidden would collapse and drop the `0` and total anchors onto it.
export const CATEGORY_BAR_LABELS  = 'relative flex h-5 w-full items-end text-xs font-medium tabular-nums text-base-content/70 sm:text-sm' ;

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
 * getCategoryBarClasses() ;
 * // → 'flex w-full flex-col gap-2'
 * ```
 */
export const getCategoryBarClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    CATEGORY_BAR ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the track className expression.
 *
 * The track holds the segments and, being `relative`, positions the marker.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {CategoryBarSize | ResponsiveCategoryBarSize} [props.size='md'] - Track thickness, scalar or per breakpoint.
 *
 * @returns {string} The track className expression.
 *
 * @example
 * ```js
 * getCategoryBarTrackClasses({ size: 'lg' }) ;
 * // → 'relative flex w-full items-center gap-0.5 h-3'
 *
 * getCategoryBarTrackClasses({ size: { xs: 'sm', lg: 'md' } }) ;
 * // → 'relative flex w-full items-center gap-0.5 h-1.5 lg:h-2'
 * ```
 */
export const getCategoryBarTrackClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    CATEGORY_BAR_TRACK ,
    {
        ...before ,

        ...getCategoryBarTrackHeight( size ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a segment className expression, and the inline style a non-token colour needs.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 *
 * @returns {{ className : string , style : Object | undefined }} The segment className and style.
 *
 * @example
 * ```js
 * getCategoryBarSegment({ color: 'primary' }) ;
 * // → { className : 'h-full first:rounded-l-full last:rounded-r-full bg-primary' , style : undefined }
 * ```
 */
export const getCategoryBarSegment =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            CATEGORY_BAR_SEGMENT ,
            {
                ...before ,
                ...definition ,
                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the marker className expression, and the inline style a non-token colour needs.
 *
 * The ring is what keeps the marker readable whatever segment it lands on : it punches a
 * `base-100` gap between the marker and the bar underneath.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.animated=false] - Ease the marker to its new position on value changes.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI colour token, or any CSS colour.
 * @param {CategoryBarSize | ResponsiveCategoryBarSize} [props.size='md'] - Marker height, scalar or per breakpoint.
 *
 * @returns {{ className : string , style : Object | undefined }} The marker className and style.
 *
 * @example
 * ```js
 * getCategoryBarMarker({ color: 'error', size: 'md' }) ;
 * // → { className : 'mx-auto w-1 rounded-full ring-2 ring-base-100 bg-error h-4' , style : undefined }
 * ```
 */
export const getCategoryBarMarker =
({
    after ,
    animated = false ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size = MD ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            'mx-auto w-1 rounded-full ring-2 ring-base-100' ,
            {
                ...before ,

                ...definition ,

                ...getCategoryBarMarkerHeight( size ) ,

                ...animated === true && { 'transition-all duration-300 ease-in-out' : true } ,

                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the cumulative labels row className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The labels row className expression.
 *
 * @example
 * ```js
 * getCategoryBarLabelsClasses() ;
 * // → 'relative flex w-full items-end text-xs font-medium tabular-nums text-base-content/70 sm:text-sm'
 * ```
 */
export const getCategoryBarLabelsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    CATEGORY_BAR_LABELS ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export default getCategoryBarClasses ;
