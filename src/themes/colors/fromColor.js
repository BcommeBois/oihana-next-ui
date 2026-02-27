/**
 * Gradient starting color utilities for Tailwind CSS.
 *
 * @module themes/colors/fromColor
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
 * Valid gradient from colors.
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
    [ BLACK       ] : 'from-black' ,
    [ WHITE       ] : 'from-white' ,
    [ TRANSPARENT ] : 'from-transparent' ,

    [ ACCENT    ] : 'from-accent' ,
    [ ERROR     ] : 'from-error' ,
    [ INFO      ] : 'from-info' ,
    [ NEUTRAL   ] : 'from-neutral' ,
    [ PRIMARY   ] : 'from-primary' ,
    [ SECONDARY ] : 'from-secondary' ,
    [ SUCCESS   ] : 'from-success' ,
    [ WARNING   ] : 'from-warning' ,

    [ BASE_100     ] : 'from-base-100' ,
    [ BASE_200     ] : 'from-base-200' ,
    [ BASE_300     ] : 'from-base-300' ,
    [ BASE_CONTENT ] : 'from-base-content' ,

    [ ACCENT_CONTENT    ] : 'from-accent-content' ,
    [ ERROR_CONTENT     ] : 'from-error-content' ,
    [ INFO_CONTENT      ] : 'from-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'from-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'from-primary-content' ,
    [ SECONDARY_CONTENT ] : 'from-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'from-success-content' ,
    [ WARNING_CONTENT   ] : 'from-warning-content' ,
} ;

/**
 * Generates gradient starting color class definition.
 *
 * @param {string} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFromColor( 'primary' ) ;
 * // → { 'from-primary': true }
 *
 * getFromColor( 'base-content' ) ;
 * // → { 'from-base-content': true }
 * ```
 */
const getFromColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getFromColor ;