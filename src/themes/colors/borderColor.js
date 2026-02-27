/**
 * Border color utilities for Tailwind CSS.
 *
 * @module themes/colors/borderColor
 * @see https://tailwindcss.com/docs/border-color
 */

import {
    ACCENT ,
    BASE_100 ,
    BASE_200 ,
    BASE_300 ,
    BASE_CONTENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

import {
    BLACK ,
    TRANSPARENT ,
    WHITE ,
} from './tailwindcss' ;

/**
 * @typedef {'accent' | 'base-100' | 'base-200' | 'base-300' | 'base-content' |
 *   'black' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' |
 *   'success' | 'transparent' | 'warning' | 'white'} BorderColorValue
 */

/**
 * Valid border colors.
 * @type {BorderColorValue[]}
 */
export const colors =
[
    BLACK ,
    WHITE ,
    TRANSPARENT ,

    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,

    BASE_100 ,
    BASE_200 ,
    BASE_300 ,
    BASE_CONTENT ,
] ;

const colorMap =
{
    [ BLACK       ] : 'border-black' ,
    [ WHITE       ] : 'border-white' ,
    [ TRANSPARENT ] : 'border-transparent' ,

    [ ACCENT    ] : 'border-accent' ,
    [ ERROR     ] : 'border-error' ,
    [ INFO      ] : 'border-info' ,
    [ NEUTRAL   ] : 'border-neutral' ,
    [ PRIMARY   ] : 'border-primary' ,
    [ SECONDARY ] : 'border-secondary' ,
    [ SUCCESS   ] : 'border-success' ,
    [ WARNING   ] : 'border-warning' ,

    [ BASE_100     ] : 'border-base-100' ,
    [ BASE_200     ] : 'border-base-200' ,
    [ BASE_300     ] : 'border-base-300' ,
    [ BASE_CONTENT ] : 'border-base-content' ,
} ;

/**
 * Generates border color class definition.
 *
 * @param {BorderColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBorderColor( 'primary' ) ;
 * // → { 'border-primary': true }
 *
 * getBorderColor( 'transparent' ) ;
 * // → { 'border-transparent': true }
 * ```
 */
const getBorderColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getBorderColor ;