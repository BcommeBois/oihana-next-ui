/**
 * Divider class name generator for DaisyUI.
 *
 * @module themes/components/divider
 * @see https://daisyui.com/components/divider
 */

import cn from '../helpers/cn' ;

import {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

// Colors

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} DividerColorValue
 */

export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

const colorMap =
{
    [ ACCENT    ] : 'divider-accent' ,
    [ ERROR     ] : 'divider-error' ,
    [ INFO      ] : 'divider-info' ,
    [ NEUTRAL   ] : 'divider-neutral' ,
    [ PRIMARY   ] : 'divider-primary' ,
    [ SECONDARY ] : 'divider-secondary' ,
    [ SUCCESS   ] : 'divider-success' ,
    [ WARNING   ] : 'divider-warning' ,
} ;

// Alignments

export const START = 'start' ;
export const END   = 'end' ;

/**
 * @typedef {'start' | 'end'} DividerAlignment
 */

export const alignments = [ START , END ] ;

const alignmentMap =
{
    [ START ] : 'divider-start' ,
    [ END   ] : 'divider-end' ,
} ;

// Orientations

export const HORIZONTAL = 'horizontal' ;
export const VERTICAL   = 'vertical' ;

/**
 * @typedef {'horizontal' | 'vertical'} DividerOrientation
 */

export const orientations = [ HORIZONTAL , VERTICAL ] ;

const orientationMap =
{
    [ HORIZONTAL ] : 'divider-horizontal' ,
    [ VERTICAL   ] : 'divider-vertical' ,
} ;

export const DIVIDER = 'divider' ;

/**
 * Generates a DaisyUI divider className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {DividerAlignment} [props.alignment] - Content alignment (start or end).
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {DividerColorValue} [props.color] - Divider color.
 * @param {DividerOrientation} [props.orientation] - Layout orientation.
 *
 * @returns {string} The divider className expression.
 *
 * @example
 * ```js
 * getDividerClassNames() ;
 * // → 'divider'
 *
 * getDividerClassNames({ color: 'primary' }) ;
 * // → 'divider divider-primary'
 *
 * getDividerClassNames({ orientation: 'vertical' , alignment: 'start' }) ;
 * // → 'divider divider-vertical divider-start'
 * ```
 */
const getDividerClassNames =
({
     after ,
     alignment ,
     before ,
     beforeClassName ,
     className ,
     color ,
     orientation ,
}
= {} ) => cn
(
    beforeClassName ,
    DIVIDER ,
    {
        ...before ,

        ...!!colorMap[color]             && { [colorMap[color]]             : true } ,
        ...!!alignmentMap[alignment]     && { [alignmentMap[alignment]]     : true } ,
        ...!!orientationMap[orientation] && { [orientationMap[orientation]] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getDividerClassNames ;