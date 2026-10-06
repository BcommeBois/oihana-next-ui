/**
 * Color picker class generators + shared constants.
 *
 * Covers the swatch indicator and the picker panel container. The interactive
 * sub-controls (saturation / hue / alpha) carry their own structural classes.
 *
 * @module themes/components/colorPicker
 *
 * @safelist
 * ## Horizontal layout (orientation + collapse)
 * - flex-row | flex-col sm:flex-row | flex-col @md:flex-row
 * - w-40 | w-48 | w-56 | w-full sm:w-40 | w-full sm:w-48 | w-full sm:w-56
 * - w-full @md:w-40 | w-full @md:w-48 | w-full @md:w-56
 * - flex-1 min-w-[12rem] | w-full sm:flex-1 sm:min-w-[12rem] | w-full @md:flex-1 @md:min-w-[12rem]
 */

import cn from '../helpers/cn' ;

import { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

import { LG , MD , SM , XL , XS , XXS } from '../sizing/sizes' ;

/**
 * Default preset palette offered by the picker (Tailwind-ish hues + black/white).
 * @type {string[]}
 */
export const DEFAULT_PRESETS =
[
    '#EF4444' , '#F97316' , '#F59E0B' , '#EAB308' , '#22C55E' , '#10B981' , '#06B6D4' ,
    '#3B82F6' , '#6366F1' , '#8B5CF6' , '#EC4899' , '#64748B' , '#000000' , '#FFFFFF' ,
] ;

// ---------- Indicator (swatch)

/**
 * @typedef {'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'} ColorIndicatorSize
 */

/**
 * Valid swatch sizes.
 *
 * `2xs` is the mark beside a name in a dense row — eight pixels, where the
 * others are swatches one points at.
 *
 * @type {ColorIndicatorSize[]}
 */
export const indicatorSizes = [ XXS , XS , SM , MD , LG , XL ] ;

const indicatorSizeMap =
{
    [ XXS ] : 'size-2' ,
    [ XS ]  : 'size-3' ,
    [ SM ]  : 'size-4' ,
    [ MD ]  : 'size-5' ,
    [ LG ]  : 'size-6' ,
    [ XL ]  : 'size-8' ,
} ;

/**
 * The round mark.
 *
 * Declared here rather than imported : `themes/components/button` and
 * `themes/components/mask` each declare their own, because the word means a
 * different thing in each — a round BUTTON, a round MASK, a round mark.
 *
 * @type {string}
 */
export const CIRCLE = 'circle' ;

/**
 * The swatch with the field radius, which is what a picker shows.
 * @type {string}
 */
export const SQUARE = 'square' ;

/**
 * The default `empty` : the ordinary border, no fill.
 * @type {string}
 */
export const TRANSPARENT = 'transparent' ;

/**
 * @typedef {'circle' | 'square'} ColorIndicatorShape
 */

/**
 * @typedef {'dashed' | 'ring' | 'transparent'} ColorIndicatorEmpty
 */

/** What the swatch always carries. */
export const COLOR_INDICATOR = 'inline-block shrink-0' ;

/** The square swatch — the one a picker shows, with its inner shadow so a white colour reads on a white card. */
export const COLOR_INDICATOR_SQUARE = 'rounded-field shadow-inner' ;

/** The round mark — beside a name, in a row, where an inner shadow would be eight pixels of noise. */
export const COLOR_INDICATOR_CIRCLE = 'rounded-full' ;

/** The border of a swatch that HAS a colour. */
export const COLOR_INDICATOR_BORDER = 'border border-base-content/15' ;

/**
 * What a MISSING colour looks like, beyond the ordinary border.
 *
 * 🚨 Three spellings, because they say three different things. `transparent`
 * keeps the swatch's own border and shows no fill — « this swatch has no
 * colour yet », which is what a picker shows before one is chosen. `ring` draws
 * a mark that carries no border when it IS filled — « there is something here,
 * and it is empty ». `dashed` says « nobody ever gave this one a colour ».
 *
 * None of them is a fill : a grey disc would read as « its colour is grey »,
 * which is a different statement altogether.
 *
 * @type {Object<ColorIndicatorEmpty, string>}
 */
export const COLOR_INDICATOR_EMPTY =
{
    dashed : 'border border-dashed border-base-content/30' ,
    ring   : 'border border-base-content/30' ,
} ;

/**
 * Generates the className for a {@link module:components/colors/ColorIndicator} swatch.
 *
 * `bordered` governs the swatch that HAS a colour ; `empty` governs the one
 * that has none. Two questions, two answers — a mark with no border when it is
 * filled may still need a ring when it is not.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {boolean} [props.bordered=true] - Draw a border when a colour is given.
 * @param {string} [props.className] - ClassName to append.
 * @param {ColorIndicatorEmpty} [props.empty='transparent'] - What a missing colour looks like.
 * @param {boolean} [props.filled=true] - Whether a colour was given.
 * @param {ColorIndicatorShape} [props.shape='square'] - Swatch shape.
 * @param {ColorIndicatorSize} [props.size='md'] - Swatch size.
 *
 * @returns {string} The swatch className expression.
 *
 * @example
 * ```js
 * getColorIndicatorClasses({ size: 'lg' }) ;
 * // → 'inline-block shrink-0 rounded-field shadow-inner border border-base-content/15 size-6'
 *
 * getColorIndicatorClasses({ empty: 'dashed' , filled: false , shape: 'circle' , size: '2xs' }) ;
 * // → 'inline-block shrink-0 rounded-full border border-dashed border-base-content/30 size-2'
 * ```
 */
export const getColorIndicatorClasses =
({
    after ,
    before ,
    beforeClassName ,
    bordered = true ,
    className ,
    empty    = TRANSPARENT ,
    filled   = true ,
    shape    = SQUARE ,
    size     = MD ,
}
= {} ) => cn
(
    beforeClassName ,
    COLOR_INDICATOR ,
    shape === CIRCLE ? COLOR_INDICATOR_CIRCLE : COLOR_INDICATOR_SQUARE ,
    // `transparent` is the ordinary border with no fill, which is what the
    // picker has always shown for « no colour yet » — so an empty swatch keeps
    // its border unless `empty` asks for a mark of its own.
    filled || empty === TRANSPARENT
        ? ( bordered && COLOR_INDICATOR_BORDER )
        : COLOR_INDICATOR_EMPTY[ empty ] ,
    {
        ...before ,
        ...!!indicatorSizeMap[ size ] && { [ indicatorSizeMap[ size ] ] : true } ,
        ...after ,
    } ,
    className ,
) ;

// ---------- Picker panel

/**
 * @typedef {'sm' | 'md' | 'lg'} ColorPickerSize
 */

/**
 * Valid picker sizes (panel width in vertical, saturation-square edge in horizontal).
 * @type {ColorPickerSize[]}
 */
export const pickerSizes = [ SM , MD , LG ] ;

const pickerSizeMap =
{
    [ SM ] : 'w-56' ,
    [ MD ] : 'w-64' ,
    [ LG ] : 'w-72' ,
} ;

// ---------- Collapse behaviour (horizontal orientation only)

/**
 * @typedef {'viewport' | 'container' | 'never'} ColorPickerCollapse
 */

/** Collapse back to vertical below the viewport `sm` breakpoint (640px). */
export const VIEWPORT = 'viewport' ;

/** Collapse back to vertical via a container query (reacts to the picker's own width). */
export const CONTAINER = 'container' ;

/** Never collapse — stay horizontal at every width. */
export const NEVER = 'never' ;

/**
 * Valid collapse modes (only meaningful when `orientation` is horizontal).
 * @type {ColorPickerCollapse[]}
 */
export const collapseModes = [ VIEWPORT , CONTAINER , NEVER ] ;

// Flex direction of the panel in horizontal orientation, per collapse mode.
const rowDirectionMap =
{
    [ NEVER ]     : 'flex-row' ,
    [ VIEWPORT ]  : 'flex-col sm:flex-row' ,
    [ CONTAINER ] : 'flex-col @md:flex-row' ,
} ;

// Saturation-square edge per size, per collapse mode (horizontal orientation).
// Literal class strings only — Tailwind scans these at build time.
const squareHorizontalMap =
{
    [ NEVER ] :
    {
        [ SM ] : 'w-40' ,
        [ MD ] : 'w-48' ,
        [ LG ] : 'w-56' ,
    } ,
    [ VIEWPORT ] :
    {
        [ SM ] : 'w-full sm:w-40' ,
        [ MD ] : 'w-full sm:w-48' ,
        [ LG ] : 'w-full sm:w-56' ,
    } ,
    [ CONTAINER ] :
    {
        [ SM ] : 'w-full @md:w-40' ,
        [ MD ] : 'w-full @md:w-48' ,
        [ LG ] : 'w-full @md:w-56' ,
    } ,
} ;

// Right-hand column (tracks + input + presets) per collapse mode (horizontal orientation).
const columnHorizontalMap =
{
    [ NEVER ]     : 'flex-1 min-w-[12rem]' ,
    [ VIEWPORT ]  : 'w-full sm:flex-1 sm:min-w-[12rem]' ,
    [ CONTAINER ] : 'w-full @md:flex-1 @md:min-w-[12rem]' ,
} ;

/** Base classes for the picker panel (vertical orientation). */
export const COLOR_PICKER = 'flex flex-col gap-3 select-none' ;

/** Base classes for the picker panel (horizontal orientation). */
export const COLOR_PICKER_ROW = 'flex gap-3 select-none items-start' ;

/** Shared base classes for the saturation/brightness square. */
const SQUARE_BASE = 'relative aspect-square rounded-box shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]' ;

/** Base classes for the horizontal right-hand column. */
const COLUMN_BASE = 'flex flex-col gap-3' ;

/**
 * Generates the className for the {@link module:components/colors/ColorPicker} panel.
 *
 * In vertical orientation `size` drives the panel width ; in horizontal orientation
 * the panel has no fixed width (square + column are intrinsic) and `size` drives the
 * square edge instead — see {@link getColorPickerSurfaceClasses}.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {ColorPickerCollapse} [props.collapse='viewport'] - Horizontal collapse behaviour.
 * @param {import('../enums/orientations').Orientation} [props.orientation='vertical'] - Panel orientation.
 * @param {ColorPickerSize} [props.size='md'] - Panel size.
 *
 * @returns {string} The panel className expression.
 *
 * @example
 * ```js
 * getColorPickerClasses({ size: 'lg' }) ;
 * // → 'flex flex-col gap-3 select-none w-72'
 *
 * getColorPickerClasses({ orientation: 'horizontal' , collapse: 'viewport' }) ;
 * // → 'flex gap-3 select-none items-start flex-col sm:flex-row'
 * ```
 */
const getColorPickerClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    collapse = VIEWPORT ,
    orientation = VERTICAL ,
    size = MD ,
}
= {} ) =>
{
    if ( orientation === HORIZONTAL )
    {
        return cn
        (
            beforeClassName ,
            COLOR_PICKER_ROW ,
            rowDirectionMap[ collapse ] || rowDirectionMap[ VIEWPORT ] ,
            { ...before , ...after } ,
            className ,
        ) ;
    }

    return cn
    (
        beforeClassName ,
        COLOR_PICKER ,
        {
            ...before ,
            ...!!pickerSizeMap[ size ] && { [ pickerSizeMap[ size ] ] : true } ,
            ...after ,
        } ,
        className ,
    ) ;
} ;

/**
 * Generates the structural classes for the two picker surfaces : the saturation
 * `square` and the horizontal right-hand `column`.
 *
 * In vertical orientation the square is full-width (its size follows the panel) and
 * `column` is unused. In horizontal orientation the square gets a fixed edge (from
 * `size`) and the column flexes to fill the row — both collapsing back to a stacked,
 * full-width layout below the chosen breakpoint (`collapse`).
 *
 * @param {Object} [props]
 * @param {ColorPickerCollapse} [props.collapse='viewport'] - Horizontal collapse behaviour.
 * @param {import('../enums/orientations').Orientation} [props.orientation='vertical'] - Panel orientation.
 * @param {ColorPickerSize} [props.size='md'] - Panel size.
 *
 * @returns {{ square: string , column: string }} The surface className expressions.
 *
 * @example
 * ```js
 * getColorPickerSurfaceClasses({ orientation: 'horizontal' , size: 'md' }) ;
 * // → { square: '… shrink-0 w-full sm:w-48' , column: 'flex flex-col gap-3 w-full sm:flex-1 sm:min-w-[12rem]' }
 * ```
 */
export const getColorPickerSurfaceClasses =
({
    collapse = VIEWPORT ,
    orientation = VERTICAL ,
    size = MD ,
}
= {} ) =>
{
    if ( orientation === HORIZONTAL )
    {
        const byCollapse = squareHorizontalMap[ collapse ] || squareHorizontalMap[ VIEWPORT ] ;
        return {
            square : cn( SQUARE_BASE , 'shrink-0' , byCollapse[ size ] || byCollapse[ MD ] ) ,
            column : cn( COLUMN_BASE , columnHorizontalMap[ collapse ] || columnHorizontalMap[ VIEWPORT ] ) ,
        } ;
    }

    return {
        square : cn( SQUARE_BASE , 'w-full' ) ,
        column : '' ,
    } ;
} ;

export default getColorPickerClasses ;
