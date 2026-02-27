/**
 * Ring color utilities for Tailwind CSS.
 *
 * @module themes/colors/ringColor
 * @see https://tailwindcss.com/docs/ring-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} RingColor
 */

/**
 * Valid ring colors.
 * @type {RingColor[]}
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
    [ BLACK       ] : 'ring-black' ,
    [ WHITE       ] : 'ring-white' ,
    [ TRANSPARENT ] : 'ring-transparent' ,

    [ ACCENT    ] : 'ring-accent' ,
    [ ERROR     ] : 'ring-error' ,
    [ INFO      ] : 'ring-info' ,
    [ NEUTRAL   ] : 'ring-neutral' ,
    [ PRIMARY   ] : 'ring-primary' ,
    [ SECONDARY ] : 'ring-secondary' ,
    [ SUCCESS   ] : 'ring-success' ,
    [ WARNING   ] : 'ring-warning' ,

    [ BASE_100     ] : 'ring-base-100' ,
    [ BASE_200     ] : 'ring-base-200' ,
    [ BASE_300     ] : 'ring-base-300' ,
    [ BASE_CONTENT ] : 'ring-base-content' ,
} ;

/**
 * Generates ring color class definition.
 *
 * @param {RingColor} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getRingColor( 'primary' ) ;
 * // → { 'ring-primary': true }
 *
 * getRingColor( 'base-content' ) ;
 * // → { 'ring-base-content': true }
 * ```
 */
const getRingColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getRingColor ;