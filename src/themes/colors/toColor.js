/**
 * Gradient ending color utilities for Tailwind CSS.
 *
 * @module themes/colors/toColor
 * @see https://tailwindcss.com/docs/background-color#gradient-color-stops
 */

import {
    ACCENT ,
    ACCENT_CONTENT ,
    BASE_100 ,
    BASE_200 ,
    BASE_300 ,
    BASE_CONTENT ,
    ERROR ,
    ERROR_CONTENT ,
    INFO ,
    INFO_CONTENT ,
    NEUTRAL ,
    NEUTRAL_CONTENT ,
    PRIMARY ,
    PRIMARY_CONTENT ,
    SECONDARY ,
    SECONDARY_CONTENT ,
    SUCCESS ,
    SUCCESS_CONTENT ,
    WARNING ,
    WARNING_CONTENT ,
} from '../colors' ;

import {
    BLACK ,
    TRANSPARENT ,
    WHITE ,
} from './tailwindcss' ;

/**
 * Valid gradient to colors.
 * @type {string[]}
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

    ACCENT_CONTENT ,
    ERROR_CONTENT ,
    INFO_CONTENT ,
    NEUTRAL_CONTENT ,
    PRIMARY_CONTENT ,
    SECONDARY_CONTENT ,
    SUCCESS_CONTENT ,
    WARNING_CONTENT ,
] ;

const colorMap =
{
    [ BLACK       ] : 'to-black' ,
    [ WHITE       ] : 'to-white' ,
    [ TRANSPARENT ] : 'to-transparent' ,

    [ ACCENT    ] : 'to-accent' ,
    [ ERROR     ] : 'to-error' ,
    [ INFO      ] : 'to-info' ,
    [ NEUTRAL   ] : 'to-neutral' ,
    [ PRIMARY   ] : 'to-primary' ,
    [ SECONDARY ] : 'to-secondary' ,
    [ SUCCESS   ] : 'to-success' ,
    [ WARNING   ] : 'to-warning' ,

    [ BASE_100     ] : 'to-base-100' ,
    [ BASE_200     ] : 'to-base-200' ,
    [ BASE_300     ] : 'to-base-300' ,
    [ BASE_CONTENT ] : 'to-base-content' ,

    [ ACCENT_CONTENT    ] : 'to-accent-content' ,
    [ ERROR_CONTENT     ] : 'to-error-content' ,
    [ INFO_CONTENT      ] : 'to-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'to-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'to-primary-content' ,
    [ SECONDARY_CONTENT ] : 'to-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'to-success-content' ,
    [ WARNING_CONTENT   ] : 'to-warning-content' ,
} ;

/**
 * Generates gradient ending color class definition.
 *
 * @param {string} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getToColor( 'secondary' ) ;
 * // → { 'to-secondary': true }
 *
 * getToColor( 'base-content' ) ;
 * // → { 'to-base-content': true }
 * ```
 */
const getToColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getToColor ;