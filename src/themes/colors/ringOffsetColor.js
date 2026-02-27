/**
 * Ring offset color utilities for Tailwind CSS.
 *
 * @module themes/colors/ringOffsetColor
 * @see https://tailwindcss.com/docs/ring-offset-color
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
 *   'success' | 'transparent' | 'warning' | 'white'} RingOffsetColor
 */

/**
 * Valid ring offset colors.
 * @type {RingOffsetColor[]}
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
    [ BLACK       ] : 'ring-offset-black' ,
    [ WHITE       ] : 'ring-offset-white' ,
    [ TRANSPARENT ] : 'ring-offset-transparent' ,

    [ ACCENT    ] : 'ring-offset-accent' ,
    [ ERROR     ] : 'ring-offset-error' ,
    [ INFO      ] : 'ring-offset-info' ,
    [ NEUTRAL   ] : 'ring-offset-neutral' ,
    [ PRIMARY   ] : 'ring-offset-primary' ,
    [ SECONDARY ] : 'ring-offset-secondary' ,
    [ SUCCESS   ] : 'ring-offset-success' ,
    [ WARNING   ] : 'ring-offset-warning' ,

    [ BASE_100     ] : 'ring-offset-base-100' ,
    [ BASE_200     ] : 'ring-offset-base-200' ,
    [ BASE_300     ] : 'ring-offset-base-300' ,
    [ BASE_CONTENT ] : 'ring-offset-base-content' ,
} ;

/**
 * Generates ring offset color class definition.
 *
 * @param {RingOffsetColor} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getRingOffsetColor( 'base-100' ) ;
 * // → { 'ring-offset-base-100': true }
 *
 * getRingOffsetColor( 'white' ) ;
 * // → { 'ring-offset-white': true }
 * ```
 */
const getRingOffsetColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getRingOffsetColor ;