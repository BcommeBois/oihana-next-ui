/**
 * Fill color utilities for Tailwind CSS (SVG).
 *
 * @module themes/colors/fillColor
 * @see https://tailwindcss.com/docs/fill
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
 *   'transparent' | 'warning' | 'white'} FillColorValue
 */

/**
 * Valid fill colors.
 * @type {FillColorValue[]}
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
    [ BLACK       ] : 'fill-black' ,
    [ WHITE       ] : 'fill-white' ,
    [ TRANSPARENT ] : 'fill-transparent' ,
    [ NONE        ] : 'fill-none' ,

    [ ACCENT    ] : 'fill-accent' ,
    [ ERROR     ] : 'fill-error' ,
    [ INFO      ] : 'fill-info' ,
    [ NEUTRAL   ] : 'fill-neutral' ,
    [ PRIMARY   ] : 'fill-primary' ,
    [ SECONDARY ] : 'fill-secondary' ,
    [ SUCCESS   ] : 'fill-success' ,
    [ WARNING   ] : 'fill-warning' ,

    [ BASE_CONTENT ] : 'fill-base-content' ,
} ;

/**
 * Generates fill color class definition.
 *
 * @param {FillColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFillColor( 'primary' ) ;
 * // → { 'fill-primary': true }
 *
 * getFillColor( 'none' ) ;
 * // → { 'fill-none': true }
 * ```
 */
const getFillColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getFillColor ;