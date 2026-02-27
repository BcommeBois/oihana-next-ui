/**
 * Caret color utilities for Tailwind CSS.
 *
 * @module themes/colors/caretColor
 * @see https://tailwindcss.com/docs/caret-color
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
 * @typedef {'accent' | 'accent-content' | 'base-100' | 'base-200' | 'base-300' | 'base-content' |
 *   'black' | 'error' | 'error-content' | 'info' | 'info-content' |
 *   'neutral' | 'neutral-content' | 'primary' | 'primary-content' |
 *   'secondary' | 'secondary-content' | 'success' | 'success-content' |
 *   'transparent' | 'warning' | 'warning-content' | 'white'} CaretColorValue
 */

/**
 * Valid caret colors.
 * @type {CaretColorValue[]}
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
    [ BLACK       ] : 'caret-black' ,
    [ WHITE       ] : 'caret-white' ,
    [ TRANSPARENT ] : 'caret-transparent' ,

    [ ACCENT    ] : 'caret-accent' ,
    [ ERROR     ] : 'caret-error' ,
    [ INFO      ] : 'caret-info' ,
    [ NEUTRAL   ] : 'caret-neutral' ,
    [ PRIMARY   ] : 'caret-primary' ,
    [ SECONDARY ] : 'caret-secondary' ,
    [ SUCCESS   ] : 'caret-success' ,
    [ WARNING   ] : 'caret-warning' ,

    [ BASE_100     ] : 'caret-base-100' ,
    [ BASE_200     ] : 'caret-base-200' ,
    [ BASE_300     ] : 'caret-base-300' ,
    [ BASE_CONTENT ] : 'caret-base-content' ,

    [ ACCENT_CONTENT    ] : 'caret-accent-content' ,
    [ ERROR_CONTENT     ] : 'caret-error-content' ,
    [ INFO_CONTENT      ] : 'caret-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'caret-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'caret-primary-content' ,
    [ SECONDARY_CONTENT ] : 'caret-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'caret-success-content' ,
    [ WARNING_CONTENT   ] : 'caret-warning-content' ,
} ;

/**
 * Generates caret color class definition.
 *
 * @param {CaretColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getCaretColor( 'primary' ) ;
 * // → { 'caret-primary': true }
 *
 * getCaretColor( 'base-content' ) ;
 * // → { 'caret-base-content': true }
 * ```
 */
const getCaretColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getCaretColor ;