/**
 * Status class name generator for DaisyUI 5.
 *
 * @module themes/components/status
 * @see https://daisyui.com/components/status
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

import {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

/**
 * Valid status colors.
 * @type {string[]}
 */
export const colors =
[
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
] ;

/**
 * Valid status sizes.
 * @type {string[]}
 */
export const sizes =
[
    XL ,
    LG ,
    MD ,
    SM ,
    XS ,
] ;

const colorMap =
{
    [ ACCENT    ] : 'status-accent' ,
    [ ERROR     ] : 'status-error' ,
    [ INFO      ] : 'status-info' ,
    [ NEUTRAL   ] : 'status-neutral' ,
    [ PRIMARY   ] : 'status-primary' ,
    [ SECONDARY ] : 'status-secondary' ,
    [ SUCCESS   ] : 'status-success' ,
    [ WARNING   ] : 'status-warning' ,
} ;

const sizeMap =
{
    [ XL ] : 'status-xl' ,
    [ LG ] : 'status-lg' ,
    [ MD ] : 'status-md' ,
    [ SM ] : 'status-sm' ,
    [ XS ] : 'status-xs' ,
} ;

/**
 * The text size a label takes when it is asked to follow the mark.
 *
 * 🔑 **The two scales are not the same scale.** A mark goes from two to
 * sixteen pixels, where readable text goes from eleven to sixteen : `xs` and
 * `sm` share one text size because a mark can shrink below what a sentence
 * can. Gathered from two hand-written copies of this very map, in one
 * application, which agreed on every row.
 *
 * @type {Object<string,string>}
 */
const labelSizeMap =
{
    [ XL ] : 'text-base' ,
    [ LG ] : 'text-sm' ,
    [ MD ] : 'text-sm' ,
    [ SM ] : 'text-xs' ,
    [ XS ] : 'text-xs' ,
} ;

/**
 * What a label reads at, for a given size.
 *
 * @param {string} [size] - One of the status sizes. Anything else, or nothing, keeps the component's own default.
 *
 * @returns {?string} The text class, or `undefined` when the size is not one of the five.
 *
 * @example
 * ```js
 * getStatusLabelClass( 'xs' ) ; // → 'text-xs'
 * getStatusLabelClass() ;       // → undefined
 * ```
 */
export const getStatusLabelClass = ( size ) => labelSizeMap[ size ] ;

export const STATUS = 'status' ;

/**
 * Generates status class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - Status color variant.
 * @param {string} [props.size='md'] - Status size (xs, sm, md, lg, xl).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getStatusClasses({ color: 'success', size: 'lg' }) ;
 * // → 'status status-success status-lg'
 *
 * getStatusClasses({ color: 'error' }) ;
 * // → 'status status-error status-md'
 * ```
 */
export const getStatusClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size = MD ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        [ STATUS ] : true ,

        ...!!colorMap[color] && { [ colorMap[color] ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getStatusClasses ;