/**
 * Gradient middle color utilities for Tailwind CSS.
 *
 * @module themes/colors/viaColor
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
 * Valid gradient via colors.
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
    [ BLACK       ] : 'via-black' ,
    [ WHITE       ] : 'via-white' ,
    [ TRANSPARENT ] : 'via-transparent' ,

    [ ACCENT    ] : 'via-accent' ,
    [ ERROR     ] : 'via-error' ,
    [ INFO      ] : 'via-info' ,
    [ NEUTRAL   ] : 'via-neutral' ,
    [ PRIMARY   ] : 'via-primary' ,
    [ SECONDARY ] : 'via-secondary' ,
    [ SUCCESS   ] : 'via-success' ,
    [ WARNING   ] : 'via-warning' ,

    [ BASE_100     ] : 'via-base-100' ,
    [ BASE_200     ] : 'via-base-200' ,
    [ BASE_300     ] : 'via-base-300' ,
    [ BASE_CONTENT ] : 'via-base-content' ,

    [ ACCENT_CONTENT    ] : 'via-accent-content' ,
    [ ERROR_CONTENT     ] : 'via-error-content' ,
    [ INFO_CONTENT      ] : 'via-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'via-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'via-primary-content' ,
    [ SECONDARY_CONTENT ] : 'via-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'via-success-content' ,
    [ WARNING_CONTENT   ] : 'via-warning-content' ,
} ;

/**
 * Generates gradient middle color class definition.
 *
 * @param {string} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getViaColor( 'info' ) ;
 * // → { 'via-info': true }
 *
 * getViaColor( 'accent' ) ;
 * // → { 'via-accent': true }
 * ```
 */
const getViaColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getViaColor ;