/**
 * Placeholder color utilities for Tailwind CSS.
 *
 * @module themes/colors/placeholderColor
 * @see https://tailwindcss.com/docs/placeholder-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} PlaceholderColor
 */

/**
 * Valid placeholder colors.
 * @type {PlaceholderColor[]}
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
    [ BLACK       ] : 'placeholder-black' ,
    [ WHITE       ] : 'placeholder-white' ,
    [ TRANSPARENT ] : 'placeholder-transparent' ,

    [ ACCENT    ] : 'placeholder-accent' ,
    [ ERROR     ] : 'placeholder-error' ,
    [ INFO      ] : 'placeholder-info' ,
    [ NEUTRAL   ] : 'placeholder-neutral' ,
    [ PRIMARY   ] : 'placeholder-primary' ,
    [ SECONDARY ] : 'placeholder-secondary' ,
    [ SUCCESS   ] : 'placeholder-success' ,
    [ WARNING   ] : 'placeholder-warning' ,

    [ BASE_100     ] : 'placeholder-base-100' ,
    [ BASE_200     ] : 'placeholder-base-200' ,
    [ BASE_300     ] : 'placeholder-base-300' ,
    [ BASE_CONTENT ] : 'placeholder-base-content' ,
} ;

/**
 * Generates placeholder color class definition.
 *
 * @param {PlaceholderColor} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getPlaceholderColor( 'base-content' ) ;
 * // → { 'placeholder-base-content': true }
 *
 * getPlaceholderColor( 'primary' ) ;
 * // → { 'placeholder-primary': true }
 * ```
 */
const getPlaceholderColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getPlaceholderColor ;