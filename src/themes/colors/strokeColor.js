/**
 * Stroke color utilities for Tailwind CSS (SVG).
 *
 * @module themes/colors/strokeColor
 * @see https://tailwindcss.com/docs/stroke
 */

import {
    ACCENT ,
    BASE_CONTENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    NONE ,
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
 * @typedef {'accent' | 'base-content' | 'black' | 'error' | 'info' |
 *   'neutral' | 'none' | 'primary' | 'secondary' | 'success' |
 *   'transparent' | 'warning' | 'white'} StrokeColorValue
 */

/**
 * Valid stroke colors.
 * @type {StrokeColorValue[]}
 */
export const colors =
[
    BLACK ,
    WHITE ,
    TRANSPARENT ,
    NONE ,

    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,

    BASE_CONTENT ,
] ;

const colorMap =
{
    [ BLACK       ] : 'stroke-black' ,
    [ WHITE       ] : 'stroke-white' ,
    [ TRANSPARENT ] : 'stroke-transparent' ,
    [ NONE        ] : 'stroke-none' ,

    [ ACCENT    ] : 'stroke-accent' ,
    [ ERROR     ] : 'stroke-error' ,
    [ INFO      ] : 'stroke-info' ,
    [ NEUTRAL   ] : 'stroke-neutral' ,
    [ PRIMARY   ] : 'stroke-primary' ,
    [ SECONDARY ] : 'stroke-secondary' ,
    [ SUCCESS   ] : 'stroke-success' ,
    [ WARNING   ] : 'stroke-warning' ,

    [ BASE_CONTENT ] : 'stroke-base-content' ,
} ;

/**
 * Generates stroke color class definition.
 *
 * @param {StrokeColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getStrokeColor( 'primary' ) ;
 * // → { 'stroke-primary': true }
 *
 * getStrokeColor( 'none' ) ;
 * // → { 'stroke-none': true }
 * ```
 */
const getStrokeColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getStrokeColor ;