/**
 * Divide color utilities for Tailwind CSS.
 *
 * @module themes/colors/divideColor
 * @see https://tailwindcss.com/docs/divide-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} DivideColorValue
 */

/**
 * Valid divide colors.
 * @type {DivideColorValue[]}
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
    [ BLACK       ] : 'divide-black' ,
    [ WHITE       ] : 'divide-white' ,
    [ TRANSPARENT ] : 'divide-transparent' ,

    [ ACCENT    ] : 'divide-accent' ,
    [ ERROR     ] : 'divide-error' ,
    [ INFO      ] : 'divide-info' ,
    [ NEUTRAL   ] : 'divide-neutral' ,
    [ PRIMARY   ] : 'divide-primary' ,
    [ SECONDARY ] : 'divide-secondary' ,
    [ SUCCESS   ] : 'divide-success' ,
    [ WARNING   ] : 'divide-warning' ,

    [ BASE_100     ] : 'divide-base-100' ,
    [ BASE_200     ] : 'divide-base-200' ,
    [ BASE_300     ] : 'divide-base-300' ,
    [ BASE_CONTENT ] : 'divide-base-content' ,
} ;

/**
 * Generates divide color class definition.
 *
 * @param {DivideColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getDivideColor( 'base-300' ) ;
 * // → { 'divide-base-300': true }
 *
 * getDivideColor( 'primary' ) ;
 * // → { 'divide-primary': true }
 * ```
 */
const getDivideColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getDivideColor ;