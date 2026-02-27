/**
 * Background color utilities for Tailwind CSS.
 *
 * @module themes/colors/backgroundColor
 * @see https://tailwindcss.com/docs/background-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} BackgroundColorValue
 */

/**
 * Valid background colors.
 * @type {BackgroundColorValue[]}
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
    [ BLACK       ] : 'bg-black' ,
    [ WHITE       ] : 'bg-white' ,
    [ TRANSPARENT ] : 'bg-transparent' ,

    [ ACCENT    ] : 'bg-accent' ,
    [ ERROR     ] : 'bg-error' ,
    [ INFO      ] : 'bg-info' ,
    [ NEUTRAL   ] : 'bg-neutral' ,
    [ PRIMARY   ] : 'bg-primary' ,
    [ SECONDARY ] : 'bg-secondary' ,
    [ SUCCESS   ] : 'bg-success' ,
    [ WARNING   ] : 'bg-warning' ,

    [ BASE_100     ] : 'bg-base-100' ,
    [ BASE_200     ] : 'bg-base-200' ,
    [ BASE_300     ] : 'bg-base-300' ,
    [ BASE_CONTENT ] : 'bg-base-content' ,
} ;

/**
 * Generates background color class definition.
 *
 * @param {BackgroundColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getBackgroundColor( 'primary' ) ;
 * // → { 'bg-primary': true }
 *
 * getBackgroundColor( 'base-200' ) ;
 * // → { 'bg-base-200': true }
 * ```
 */
const getBackgroundColor = value =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getBackgroundColor ;