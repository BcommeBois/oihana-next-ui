/**
 * Scrollbar color utilities for Tailwind CSS.
 *
 * @module themes/colors/scrollbarColor
 * @see https://adoxography.github.io/tailwind-scrollbar/examples
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
} from './index' ;

/**
 * @typedef {'accent' | 'base-100' | 'base-200' | 'base-300' | 'base-content' |
 *   'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} ScrollbarColor
 */

/**
 * Valid scrollbar colors.
 * @type {ScrollbarColor[]}
 */
export const colors =
[
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
] ;

const cornerMap =
{
    [ ACCENT       ] : 'scrollbar-corner-accent' ,
    [ BASE_100     ] : 'scrollbar-corner-base-100' ,
    [ BASE_200     ] : 'scrollbar-corner-base-200' ,
    [ BASE_300     ] : 'scrollbar-corner-base-300' ,
    [ BASE_CONTENT ] : 'scrollbar-corner-base-content' ,
    [ ERROR        ] : 'scrollbar-corner-error' ,
    [ INFO         ] : 'scrollbar-corner-info' ,
    [ NEUTRAL      ] : 'scrollbar-corner-neutral' ,
    [ PRIMARY      ] : 'scrollbar-corner-primary' ,
    [ SECONDARY    ] : 'scrollbar-corner-secondary' ,
    [ SUCCESS      ] : 'scrollbar-corner-success' ,
    [ WARNING      ] : 'scrollbar-corner-warning' ,
} ;

const thumbMap =
{
    [ ACCENT       ] : 'scrollbar-thumb-accent' ,
    [ BASE_100     ] : 'scrollbar-thumb-base-100' ,
    [ BASE_200     ] : 'scrollbar-thumb-base-200' ,
    [ BASE_300     ] : 'scrollbar-thumb-base-300' ,
    [ BASE_CONTENT ] : 'scrollbar-thumb-base-content' ,
    [ ERROR        ] : 'scrollbar-thumb-error' ,
    [ INFO         ] : 'scrollbar-thumb-info' ,
    [ NEUTRAL      ] : 'scrollbar-thumb-neutral' ,
    [ PRIMARY      ] : 'scrollbar-thumb-primary' ,
    [ SECONDARY    ] : 'scrollbar-thumb-secondary' ,
    [ SUCCESS      ] : 'scrollbar-thumb-success' ,
    [ WARNING      ] : 'scrollbar-thumb-warning' ,
} ;

const trackMap =
{
    [ ACCENT       ] : 'scrollbar-track-accent' ,
    [ BASE_100     ] : 'scrollbar-track-base-100' ,
    [ BASE_200     ] : 'scrollbar-track-base-200' ,
    [ BASE_300     ] : 'scrollbar-track-base-300' ,
    [ BASE_CONTENT ] : 'scrollbar-track-base-content' ,
    [ ERROR        ] : 'scrollbar-track-error' ,
    [ INFO         ] : 'scrollbar-track-info' ,
    [ NEUTRAL      ] : 'scrollbar-track-neutral' ,
    [ PRIMARY      ] : 'scrollbar-track-primary' ,
    [ SECONDARY    ] : 'scrollbar-track-secondary' ,
    [ SUCCESS      ] : 'scrollbar-track-success' ,
    [ WARNING      ] : 'scrollbar-track-warning' ,
} ;

/**
 * Generates scrollbar corner color class definition.
 *
 * @param {ScrollbarColor} value - Color value.
 * @returns {Object} Class definition object.
 */
export const getScrollbarCornerColor = ( value ) =>
    !!cornerMap[value] ? { [cornerMap[value]] : true } : {} ;

/**
 * Generates scrollbar thumb color class definition.
 *
 * @param {ScrollbarColor} value - Color value.
 * @returns {Object} Class definition object.
 */
export const getScrollbarThumbColor = ( value ) =>
    !!thumbMap[value] ? { [thumbMap[value]] : true } : {} ;

/**
 * Generates scrollbar track color class definition.
 *
 * @param {ScrollbarColor} value - Color value.
 * @returns {Object} Class definition object.
 */
export const getScrollbarTrackColor = ( value ) =>
    !!trackMap[value] ? { [trackMap[value]] : true } : {} ;

/**
 * Generates combined scrollbar color class definitions.
 *
 * @param {Object} props
 * @param {ScrollbarColor} [props.cornerColor] - Scrollbar corner color.
 * @param {ScrollbarColor} [props.thumbColor] - Scrollbar thumb color.
 * @param {ScrollbarColor} [props.trackColor] - Scrollbar track color.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getScrollbarColor( { thumbColor: 'base-content' , trackColor: 'base-300' } ) ;
 * // → { 'scrollbar-thumb-base-content': true , 'scrollbar-track-base-300': true }
 *
 * getScrollbarColor( { thumbColor: 'primary' , trackColor: 'base-200' , cornerColor: 'base-100' } ) ;
 * // → { 'scrollbar-thumb-primary': true , 'scrollbar-track-base-200': true , 'scrollbar-corner-base-100': true }
 * ```
 */
const getScrollbarColor = ( { cornerColor , thumbColor , trackColor } = {} ) =>
({
    ...!!cornerColor && getScrollbarCornerColor( cornerColor ) ,
    ...!!thumbColor  && getScrollbarThumbColor( thumbColor ) ,
    ...!!trackColor  && getScrollbarTrackColor( trackColor ) ,
}) ;

export default getScrollbarColor ;