/**
 * Outline color utilities for Tailwind CSS.
 *
 * @module themes/colors/outlineColor
 * @see https://tailwindcss.com/docs/outline-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} OutlineColorValue
 */

/**
 * Valid outline colors.
 * @type {OutlineColorValue[]}
 */
export const colors =
[
    ACCENT ,
    BASE_100 ,
    BASE_200 ,
    BASE_300 ,
    BASE_CONTENT ,
    BLACK ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    TRANSPARENT ,
    WARNING ,
    WHITE ,
] ;

const colorMap =
{
    [ BLACK       ] : 'outline-black' ,
    [ WHITE       ] : 'outline-white' ,
    [ TRANSPARENT ] : 'outline-transparent' ,

    [ ACCENT    ] : 'outline-accent' ,
    [ ERROR     ] : 'outline-error' ,
    [ INFO      ] : 'outline-info' ,
    [ NEUTRAL   ] : 'outline-neutral' ,
    [ PRIMARY   ] : 'outline-primary' ,
    [ SECONDARY ] : 'outline-secondary' ,
    [ SUCCESS   ] : 'outline-success' ,
    [ WARNING   ] : 'outline-warning' ,

    [ BASE_100     ] : 'outline-base-100' ,
    [ BASE_200     ] : 'outline-base-200' ,
    [ BASE_300     ] : 'outline-base-300' ,
    [ BASE_CONTENT ] : 'outline-base-content' ,
} ;

/**
 * Generates outline color class definition.
 *
 * @param {OutlineColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getOutlineColor( 'primary' ) ;
 * // → { 'outline-primary': true }
 *
 * getOutlineColor( 'transparent' ) ;
 * // → { 'outline-transparent': true }
 * ```
 */
const getOutlineColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getOutlineColor ;