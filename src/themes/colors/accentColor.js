/**
 * Accent color utilities for Tailwind CSS (form controls).
 *
 * @module themes/colors/accentColor
 * @see https://tailwindcss.com/docs/accent-color
 */

import {
    ACCENT ,
    BASE_CONTENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from './daisyui' ;

import {
    BLACK ,
    WHITE ,
} from './tailwindcss' ;

export const AUTO = 'auto' ;

/**
 * @typedef {'accent' | 'auto' | 'base-content' | 'black' | 'error' | 'info' |
 *   'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'white'} AccentColorValue
 */

/**
 * Valid accent colors.
 * @type {AccentColorValue[]}
 */
export const colors =
[
    ACCENT ,
    AUTO ,
    BASE_CONTENT ,
    BLACK ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
    WHITE ,
] ;

const colorMap =
{
    [ BLACK ] : 'accent-black' ,
    [ WHITE ] : 'accent-white' ,
    [ AUTO  ] : 'accent-auto' ,

    [ ACCENT    ] : 'accent-accent' ,
    [ ERROR     ] : 'accent-error' ,
    [ INFO      ] : 'accent-info' ,
    [ NEUTRAL   ] : 'accent-neutral' ,
    [ PRIMARY   ] : 'accent-primary' ,
    [ SECONDARY ] : 'accent-secondary' ,
    [ SUCCESS   ] : 'accent-success' ,
    [ WARNING   ] : 'accent-warning' ,

    [ BASE_CONTENT ] : 'accent-base-content' ,
} ;

/**
 * Generates accent color class definition for form controls.
 *
 * @param {AccentColorValue} value - Color value.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getAccentColor( 'primary' ) ;
 * // → { 'accent-primary': true }
 *
 * getAccentColor( 'auto' ) ;
 * // → { 'accent-auto': true }
 * ```
 */
const getAccentColor = ( value ) =>
    !!colorMap[value] ? { [colorMap[value]] : true } : {} ;

export default getAccentColor ;