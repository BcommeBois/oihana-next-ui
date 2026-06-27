/**
 * Color picker class generators + shared constants.
 *
 * Covers the swatch indicator and the picker panel container. The interactive
 * sub-controls (saturation / hue / alpha) carry their own structural classes.
 *
 * @module themes/components/colorPicker
 */

import cn from '../helpers/cn' ;

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
 * Valid picker sizes (panel width).
 * @type {ColorPickerSize[]}
 */
export const pickerSizes = [ SM , MD , LG ] ;

const pickerSizeMap =
{
    [ SM ] : 'w-56' ,
    [ MD ] : 'w-64' ,
    [ LG ] : 'w-72' ,
} ;

/** Base classes for the picker panel. */
export const COLOR_PICKER = 'flex flex-col gap-3 select-none' ;

/**
 * Generates the className for the {@link module:components/colors/ColorPicker} panel.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {ColorPickerSize} [props.size='md'] - Panel size.
 *
 * @returns {string} The panel className expression.
 *
 * @example
 * ```js
 * getColorPickerClasses({ size: 'lg' }) ;
 * // → 'flex flex-col gap-3 select-none w-72'
 * ```
 */
const getColorPickerClasses =
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
    COLOR_PICKER ,
    {
        ...before ,
        ...!!pickerSizeMap[ size ] && { [ pickerSizeMap[ size ] ] : true } ,
        ...after ,
    } ,
    className ,
) ;

export default getColorPickerClasses ;
