/**
 * Text color utilities for Tailwind CSS.
 *
 * @module themes/colors/textColor
 * @see https://tailwindcss.com/docs/color
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
} from './daisyui' ;

import {
    BLACK ,
    TRANSPARENT ,
    WHITE ,
} from './tailwindcss' ;

/**
 * @typedef {'accent' | 'accent-content' | 'base-100' | 'base-200' | 'base-300' | 'base-content' |
 *   'black' | 'error' | 'error-content' | 'info' | 'info-content' | 'neutral' | 'neutral-content' |
 *   'primary' | 'primary-content' | 'secondary' | 'secondary-content' |
 *   'success' | 'success-content' | 'transparent' |
 *   'warning' | 'warning-content' | 'white'} TextColorValue
 */

/**
 * Valid text color values.
 * @type {TextColorValue[]}
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
    [ BLACK       ] : 'text-black' ,
    [ WHITE       ] : 'text-white' ,
    [ TRANSPARENT ] : 'text-transparent' ,

    [ ACCENT    ] : 'text-accent' ,
    [ ERROR     ] : 'text-error' ,
    [ INFO      ] : 'text-info' ,
    [ NEUTRAL   ] : 'text-neutral' ,
    [ PRIMARY   ] : 'text-primary' ,
    [ SECONDARY ] : 'text-secondary' ,
    [ SUCCESS   ] : 'text-success' ,
    [ WARNING   ] : 'text-warning' ,

    [ BASE_100     ] : 'text-base-100' ,
    [ BASE_200     ] : 'text-base-200' ,
    [ BASE_300     ] : 'text-base-300' ,
    [ BASE_CONTENT ] : 'text-base-content' ,

    [ ACCENT_CONTENT    ] : 'text-accent-content' ,
    [ ERROR_CONTENT     ] : 'text-error-content' ,
    [ INFO_CONTENT      ] : 'text-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'text-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'text-primary-content' ,
    [ SECONDARY_CONTENT ] : 'text-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'text-success-content' ,
    [ WARNING_CONTENT   ] : 'text-warning-content' ,
} ;

/**
 * Generates text color class definition.
 *
 * @param {TextColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextColor( 'primary' ) ;
 * // → { 'text-primary': true }
 *
 * getTextColor( 'base-content' ) ;
 * // → { 'text-base-content': true }
 * ```
 */
const getTextColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getTextColor ;