/**
 * Button class name generator for DaisyUI.
 *
 * @module themes/components/button
 * @see https://daisyui.com/components/button
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

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Shapes (modifiers)

export const CIRCLE = 'circle' ;
export const SQUARE = 'square' ;

/**
 * @typedef {'circle' | 'square'} ButtonShape
 */

export const shapes = [ CIRCLE , SQUARE ] ;

// Styles

export const DASH    = 'dash' ;
export const GHOST   = 'ghost' ;
export const LINK    = 'link' ;
export const OUTLINE = 'outline' ;
export const SOFT    = 'soft' ;

/**
 * @typedef {'dash' | 'ghost' | 'link' | 'outline' | 'soft'} ButtonStyle
 */

export const styles = [ DASH , GHOST , LINK , OUTLINE , SOFT ] ;

/** Styles with a transparent/light background where text should use the color itself. */
const TRANSPARENT_STYLES = new Set([ DASH , GHOST , LINK , OUTLINE , SOFT ]) ;

const styleMap =
{
    [ DASH    ] : 'btn-dash' ,
    [ GHOST   ] : 'btn-ghost' ,
    [ LINK    ] : 'btn-link' ,
    [ OUTLINE ] : 'btn-outline' ,
    [ SOFT    ] : 'btn-soft' ,
} ;

const colorMap =
{
    [ ACCENT    ] : 'btn-accent' ,
    [ ERROR     ] : 'btn-error' ,
    [ INFO      ] : 'btn-info' ,
    [ NEUTRAL   ] : 'btn-neutral' ,
    [ PRIMARY   ] : 'btn-primary' ,
    [ SECONDARY ] : 'btn-secondary' ,
    [ SUCCESS   ] : 'btn-success' ,
    [ WARNING   ] : 'btn-warning' ,
} ;

/** Text color for solid buttons (colored background). */
const textContentColorMap =
{
    [ ACCENT    ] : 'text-accent-content' ,
    [ ERROR     ] : 'text-error-content' ,
    [ INFO      ] : 'text-info-content' ,
    [ NEUTRAL   ] : 'text-neutral-content' ,
    [ PRIMARY   ] : 'text-primary-content' ,
    [ SECONDARY ] : 'text-secondary-content' ,
    [ SUCCESS   ] : 'text-success-content' ,
    [ WARNING   ] : 'text-warning-content' ,
} ;

/** Text color for transparent-style buttons (ghost, outline, soft…). */
const textColorMap =
{
    [ ACCENT    ] : 'text-accent' ,
    [ ERROR     ] : 'text-error' ,
    [ INFO      ] : 'text-info' ,
    [ NEUTRAL   ] : 'text-neutral' ,
    [ PRIMARY   ] : 'text-primary' ,
    [ SECONDARY ] : 'text-secondary' ,
    [ SUCCESS   ] : 'text-success' ,
    [ WARNING   ] : 'text-warning' ,
} ;

const sizeMap =
{
    [ XS ] : 'btn-xs' ,
    [ SM ] : 'btn-sm' ,
    [ MD ] : 'btn-md' ,
    [ LG ] : 'btn-lg' ,
    [ XL ] : 'btn-xl' ,
} ;

export const BTN = 'btn' ;

/**
 * Generates a DaisyUI button className expression.
 *
 * @param {Object} [props]
 * @param {boolean} [props.active] - Force active state.
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.animation=true] - Enable click animation.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {boolean} [props.block] - Full width (btn-block).
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - Button color.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {boolean} [props.glass] - Glass effect.
 * @param {ButtonShape} [props.shape] - Button shape (circle or square).
 * @param {string} [props.size] - Button size.
 * @param {ButtonStyle} [props.style] - Button style variant.
 * @param {string} [props.textColor] - Text color override (resolved from color + style).
 * @param {boolean} [props.wide] - Extra horizontal padding.
 *
 * @returns {string} The button className expression.
 */
const getButtonClassNames =
({
    active ,
    after ,
    animation = true ,
    before ,
    beforeClassName ,
    block ,
    className ,
    color ,
    disabled ,
    glass ,
    shape ,
    size ,
    style ,
    textColor ,
    wide ,
}
= {} ) =>
{
    const resolvedTextMap = TRANSPARENT_STYLES.has( style )
        ? textColorMap
        : textContentColorMap ;

    return cn
    (
        beforeClassName ,
        BTN ,
        {
            ...before ,

            ...disabled === true && { 'btn-disabled' : true } ,

            ...shape === CIRCLE && { 'btn-circle' : true } ,
            ...shape === SQUARE && { 'btn-square' : true } ,

            ...!!styleMap[style]            && { [styleMap[style]]              : true } ,
            ...!!colorMap[color]            && { [colorMap[color]]              : true } ,
            ...!!resolvedTextMap[textColor] && { [resolvedTextMap[textColor]]   : true } ,
            ...!!sizeMap[size]              && { [sizeMap[size]]                : true } ,

            ...active    === true  && { 'btn-active'   : true } ,
            ...animation === false && { 'no-animation' : true } ,
            ...block     === true  && { 'btn-block'    : true } ,
            ...glass     === true  && { 'glass'        : true } ,
            ...wide      === true  && { 'btn-wide'     : true } ,

            ...after ,
        } ,
        className ,
    ) ;
} ;

export default getButtonClassNames ;