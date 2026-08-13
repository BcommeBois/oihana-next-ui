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
 * - h-1 | h-1.5 | h-2 | h-3 | h-4
 * - sm:h-1 | sm:h-1.5 | sm:h-2 | sm:h-3 | sm:h-4
 * - md:h-1 | md:h-1.5 | md:h-2 | md:h-3 | md:h-4
 * - lg:h-1 | lg:h-1.5 | lg:h-2 | lg:h-3 | lg:h-4
 * - xl:h-1 | xl:h-1.5 | xl:h-2 | xl:h-3 | xl:h-4
 * - 2xl:h-1 | 2xl:h-1.5 | 2xl:h-2 | 2xl:h-3 | 2xl:h-4
 *
 * ## Marker height (responsive)
 * - h-2.5 | h-3 | h-4 | h-5 | h-6
 * - sm:h-2.5 | sm:h-3 | sm:h-4 | sm:h-5 | sm:h-6
 * - md:h-2.5 | md:h-3 | md:h-4 | md:h-5 | md:h-6
 * - lg:h-2.5 | lg:h-3 | lg:h-4 | lg:h-5 | lg:h-6
 * - xl:h-2.5 | xl:h-3 | xl:h-4 | xl:h-5 | xl:h-6
 * - 2xl:h-2.5 | 2xl:h-3 | 2xl:h-4 | 2xl:h-5 | 2xl:h-6
 *
 * ## Bullet tints (whole literals, listed for the record)
 * - bg-base-content/30 | bg-base-content/18 | bg-base-content/8 | bg-base-content/4
 *
 * ## Measure height (responsive)
 * - h-0.5 | h-1 | h-1.5 | h-2
 * - sm:h-0.5 | sm:h-1 | sm:h-1.5 | sm:h-2
 * - md:h-0.5 | md:h-1 | md:h-1.5 | md:h-2
 * - lg:h-0.5 | lg:h-1 | lg:h-1.5 | lg:h-2
 * - xl:h-0.5 | xl:h-1 | xl:h-1.5 | xl:h-2
 * - 2xl:h-0.5 | 2xl:h-1 | 2xl:h-1.5 | 2xl:h-2
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

import resolveBarColor from './helpers/resolveBarColor' ;

import { ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING } from '../colors' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

export { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

export { resolveBarColor } ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} CategoryBarSize
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
 *
 * `xl` exists for the bullet reading : a measure drawn inside the track needs a track
 * thick enough to hold it and still read as a band underneath.
 *
 * @type {CategoryBarSize[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

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

/**
 * Neutral bands for a bullet reading, darkest first — the qualitative ranges a measure is
 * read against.
 *
 * **Tints of `base-content`, not `base-*` surfaces.** A surface token only reads against
 * *other* surfaces : `base-200` bands vanish on a `base-200` card, which is exactly where
 * a bullet ends up. A tint of the content colour is drawn against whatever it sits on, and
 * flips with the theme on its own — no `dark:` variant, and nothing to re-tune per card.
 *
 * They are deliberately **not** the default : swapping a palette on the presence of a prop
 * is the kind of magic that makes a component impossible to predict. Pass them.
 *
 * @type {string[]}
 */
export const QUALITATIVE_COLORS = [ 'bg-base-content/30' , 'bg-base-content/18' , 'bg-base-content/8' ] ;

/**
 * Fill of the part of the domain no band covers.
 *
 * Lighter than the lightest band, and a tint for the same reason they are.
 *
 * @type {string}
 */
export const REMAINDER_COLOR = 'bg-base-content/4' ;

/**
 * Colour of the measure when the caller names none.
 *
 * `primary` rather than `base-content` : Few drew the measure in black over grey bands,
 * on paper, where black *was* the ink. On a themed screen the same bar reads as a slab —
 * it is the heaviest thing in the card and it hides the bands it is meant to be compared
 * against. Here the bands are muted tints and the measure is the data, which is the role
 * `primary` already plays for `Sparkline` and `BarList`.
 *
 * @type {string}
 */
export const DEFAULT_MEASURE_COLOR = PRIMARY ;

const trackHeightMap =
{
    [ XS ] : 'h-1' ,
    [ SM ] : 'h-1.5' ,
    [ MD ] : 'h-2' ,
    [ LG ] : 'h-3' ,
    [ XL ] : 'h-4' ,
} ;

const markerHeightMap =
{
    [ XS ] : 'h-2.5' ,
    [ SM ] : 'h-3' ,
    [ MD ] : 'h-4' ,
    [ LG ] : 'h-5' ,
    [ XL ] : 'h-6' ,
} ;

// Half the track, which is what leaves a band readable on either side of the measure.
// Below `md` there is nothing left to halve : a measure that thin is a hairline, and the
// bullet reading needs `md` at the very least.
const measureHeightMap =
{
    [ XS ] : 'h-0.5' ,
    [ SM ] : 'h-0.5' ,
    [ MD ] : 'h-1' ,
    [ LG ] : 'h-1.5' ,
    [ XL ] : 'h-2' ,
} ;

const createTrackHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + trackHeightMap[ value ] ] : true } ) ;

const createMarkerHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + markerHeightMap[ value ] ] : true } ) ;

const createMeasureHeight = ( value , { prefix = '' } = {} ) => ( { [ prefix + measureHeightMap[ value ] ] : true } ) ;

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

/**
 * Generates responsive measure height classes.
 * @type {Function}
 */
export const getCategoryBarMeasureHeight = getResponsiveDefinition(
    createMeasureHeight ,
    value => !!measureHeightMap[ value ] ,
) ;

export const CATEGORY_BAR         = 'flex w-full flex-col gap-2' ;
export const CATEGORY_BAR_TRACK   = 'relative flex w-full items-center' ;
export const CATEGORY_BAR_SEGMENT = 'h-full' ;
export const CATEGORY_BAR_MEASURE = 'rounded-full' ;
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
 * The track holds the segments and, being `relative`, positions the marker and the
 * measure.
 *
 * **`contiguous` is what makes a bullet honest.** The segments are flex items sized in
 * percentages of the whole track, so the gaps between them are taken *on top* of those
 * percentages and flex shrinks everything to compensate : a band announced at 60 % ends
 * slightly to the left of the 60 % mark, and the drift accumulates rightwards. The marker
 * and the measure are positioned on the track itself, so they land exactly where the
 * scale says. Nobody notices on a partition ; on a bullet, comparing the tip of the
 * measure to a band boundary *is* the reading.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.background=false] - Fill the track, for the part of the domain no segment covers.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.contiguous=false] - Drop the gaps between segments, so a boundary lands where the scale says.
 * @param {CategoryBarSize | ResponsiveCategoryBarSize} [props.size='md'] - Track thickness, scalar or per breakpoint.
 *
 * @returns {string} The track className expression.
 *
 * @example
 * ```js
 * getCategoryBarTrackClasses({ size: 'lg' }) ;
 * // → 'relative flex w-full items-center gap-0.5 h-3'
 *
 * getCategoryBarTrackClasses({ contiguous: true, size: 'xl' }) ;
 * // → 'relative flex w-full items-center h-4'
 * ```
 */
export const getCategoryBarTrackClasses =
({
    after ,
    background = false ,
    before ,
    beforeClassName ,
    className ,
    contiguous = false ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    CATEGORY_BAR_TRACK ,
    {
        ...before ,

        ...contiguous !== true && { 'gap-0.5' : true } ,

        ...background === true && { 'rounded-full' : true , [ REMAINDER_COLOR ] : true } ,

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
 * @param {boolean} [props.roundedEnd=true] - Round the trailing end of the last segment. Off when the domain runs past the segments.
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
    roundedEnd = true ,
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

                'first:rounded-l-full' : true ,

                ...roundedEnd === true && { 'last:rounded-r-full' : true } ,

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
 * Generates the measure className expression, and the inline style a non-token colour needs.
 *
 * The measure is the bullet's own bar : a thin, dark rule drawn over the qualitative
 * bands, from zero to the value. The ring is what keeps it visible over a dark band —
 * `ring` rather than a border, so the thickness stays outside the height the scale reads.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.animated=false] - Ease the measure to its new width on value changes.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color='primary'] - A DaisyUI colour token, a `bg-` utility class, or any CSS colour.
 * @param {boolean} [props.ring=false] - Punch a `base-100` gap between the measure and the band under it. Worth it over saturated bands, noise over muted ones.
 * @param {CategoryBarSize | ResponsiveCategoryBarSize} [props.size='md'] - Measure thickness, scalar or per breakpoint.
 *
 * @returns {{ className : string , style : Object | undefined }} The measure className and style.
 *
 * @example
 * ```js
 * getCategoryBarMeasure({ size: 'xl' }) ;
 * // → { className : 'rounded-full bg-primary h-2' , style : undefined }
 *
 * getCategoryBarMeasure({ color: '#4E79A7', ring: true }) ;
 * // → { className : 'rounded-full h-1 ring-1 ring-base-100' , style : { backgroundColor : '#4E79A7' } }
 * ```
 */
export const getCategoryBarMeasure =
({
    after ,
    animated = false ,
    before ,
    beforeClassName ,
    className ,
    color = DEFAULT_MEASURE_COLOR ,
    ring = false ,
    size = MD ,
} = {} ) =>
{
    const { definition , style } = resolveBarColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            CATEGORY_BAR_MEASURE ,
            {
                ...before ,

                ...definition ,

                ...getCategoryBarMeasureHeight( size ) ,

                ...ring === true && { 'ring-1 ring-base-100' : true } ,

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
