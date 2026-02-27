/**
 * Text decoration color utilities for Tailwind CSS.
 *
 * @module themes/colors/decorationColor
 * @see https://tailwindcss.com/docs/text-decoration-color
 */

import {
    ACCENT ,
    ACCENT_CONTENT ,
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
 * @typedef {'accent' | 'accent-content' | 'base-content' | 'black' | 'error' | 'error-content' |
 *   'info' | 'info-content' | 'neutral' | 'neutral-content' | 'primary' | 'primary-content' |
 *   'secondary' | 'secondary-content' | 'success' | 'success-content' |
 *   'transparent' | 'warning' | 'warning-content' | 'white'} DecorationColorValue
 */

/**
 * Valid decoration colors.
 * @type {DecorationColorValue[]}
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
    [ BLACK       ] : 'decoration-black' ,
    [ WHITE       ] : 'decoration-white' ,
    [ TRANSPARENT ] : 'decoration-transparent' ,

    [ ACCENT    ] : 'decoration-accent' ,
    [ ERROR     ] : 'decoration-error' ,
    [ INFO      ] : 'decoration-info' ,
    [ NEUTRAL   ] : 'decoration-neutral' ,
    [ PRIMARY   ] : 'decoration-primary' ,
    [ SECONDARY ] : 'decoration-secondary' ,
    [ SUCCESS   ] : 'decoration-success' ,
    [ WARNING   ] : 'decoration-warning' ,

    [ BASE_CONTENT ] : 'decoration-base-content' ,

    [ ACCENT_CONTENT    ] : 'decoration-accent-content' ,
    [ ERROR_CONTENT     ] : 'decoration-error-content' ,
    [ INFO_CONTENT      ] : 'decoration-info-content' ,
    [ NEUTRAL_CONTENT   ] : 'decoration-neutral-content' ,
    [ PRIMARY_CONTENT   ] : 'decoration-primary-content' ,
    [ SECONDARY_CONTENT ] : 'decoration-secondary-content' ,
    [ SUCCESS_CONTENT   ] : 'decoration-success-content' ,
    [ WARNING_CONTENT   ] : 'decoration-warning-content' ,
} ;

/**
 * Generates text decoration color class definition.
 *
 * @param {DecorationColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getDecorationColor( 'primary' ) ;
 * // → { 'decoration-primary': true }
 *
 * getDecorationColor( 'base-content' ) ;
 * // → { 'decoration-base-content': true }
 * ```
 */
const getDecorationColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getDecorationColor ;