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
 * File input class name generator for DaisyUI 5.
 *
 * @module themes/components/fileInput
 * @see https://daisyui.com/components/file-input
 */

/**
 * Valid file input colors.
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
 * Valid file input sizes.
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

export const GHOST = 'ghost' ;

/**
 * @typedef {'ghost'} FileInputStyle
 */

export const styles = [ GHOST ] ;

const colorMap =
{
    [ ACCENT    ] : 'file-input-accent' ,
    [ ERROR     ] : 'file-input-error' ,
    [ INFO      ] : 'file-input-info' ,
    [ NEUTRAL   ] : 'file-input-neutral' ,
    [ PRIMARY   ] : 'file-input-primary' ,
    [ SECONDARY ] : 'file-input-secondary' ,
    [ SUCCESS   ] : 'file-input-success' ,
    [ WARNING   ] : 'file-input-warning' ,
} ;

const styleMap =
{
    [ GHOST ] : 'file-input-ghost' ,
} ;

const sizeMap =
{
    [ XL ] : 'file-input-xl' ,
    [ LG ] : 'file-input-lg' ,
    [ MD ] : 'file-input-md' ,
    [ SM ] : 'file-input-sm' ,
    [ XS ] : 'file-input-xs' ,
} ;

export const FILE_INPUT = 'file-input' ;

/**
 * Generates file input class names for DaisyUI 5.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.color] - File input color variant.
 * @param {string} [props.size='md'] - File input size (xs, sm, md, lg, xl).
 * @param {FileInputStyle} [props.style] - File input style variant (ghost).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getFileInputClasses({ color: 'primary', size: 'lg' }) ;
 * // → 'file-input file-input-primary file-input-lg'
 *
 * getFileInputClasses({ style: 'ghost' }) ;
 * // → 'file-input file-input-ghost file-input-md'
 * ```
 */
export const getFileInputClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size = MD ,
    style ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        [ FILE_INPUT ] : true ,

        ...!!styleMap[ style ] && { [ styleMap[ style ] ] : true } ,
        ...!!colorMap[ color ] && { [ colorMap[ color ] ] : true } ,
        ...!!sizeMap[ size ]   && { [ sizeMap[ size ]   ] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getFileInputClasses ;
