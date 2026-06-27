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

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

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
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} ColorIndicatorSize
 */

/**
 * Valid swatch sizes.
 * @type {ColorIndicatorSize[]}
 */
export const indicatorSizes = [ XS , SM , MD , LG , XL ] ;

const indicatorSizeMap =
{
    [ XS ] : 'size-3' ,
    [ SM ] : 'size-4' ,
    [ MD ] : 'size-5' ,
    [ LG ] : 'size-6' ,
    [ XL ] : 'size-8' ,
} ;

/** Base classes for the color swatch. */
export const COLOR_INDICATOR = 'inline-block shrink-0 rounded-field border border-base-content/15 shadow-inner' ;

/**
 * Generates the className for a {@link module:components/colors/ColorIndicator} swatch.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {ColorIndicatorSize} [props.size='md'] - Swatch size.
 *
 * @returns {string} The swatch className expression.
 *
 * @example
 * ```js
 * getColorIndicatorClasses({ size: 'lg' }) ;
 * // → 'inline-block shrink-0 rounded-field border border-base-content/15 shadow-inner size-6'
 * ```
 */
export const getColorIndicatorClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
}
= {} ) => cn
(
    beforeClassName ,
    COLOR_INDICATOR ,
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
