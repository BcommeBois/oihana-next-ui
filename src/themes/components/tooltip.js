/**
 * Tooltip class name generator for DaisyUI.
 *
 * @module themes/components/tooltip
 * @see https://daisyui.com/components/tooltip
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
}
from '../colors' ;

import { CENTER , END , START } from '../enums/alignments' ;

// Colors

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} TooltipColorValue
 */

export {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

/**
 * Valid tooltip colors.
 * @type {TooltipColorValue[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

const colorMap =
{
    [ ACCENT    ] : 'tooltip-accent' ,
    [ ERROR     ] : 'tooltip-error' ,
    [ INFO      ] : 'tooltip-info' ,
    [ NEUTRAL   ] : 'tooltip-neutral' ,
    [ PRIMARY   ] : 'tooltip-primary' ,
    [ SECONDARY ] : 'tooltip-secondary' ,
    [ SUCCESS   ] : 'tooltip-success' ,
    [ WARNING   ] : 'tooltip-warning' ,
} ;

// Positions

export const BOTTOM = 'bottom' ;
export const LEFT   = 'left' ;
export const RIGHT  = 'right' ;
export const TOP    = 'top' ;

/**
 * @typedef {'bottom' | 'left' | 'right' | 'top'} TooltipPosition
 */

/**
 * Valid tooltip positions.
 * @type {TooltipPosition[]}
 */
export const positions = [ BOTTOM , LEFT , RIGHT , TOP ] ;

const positionMap =
{
    [ BOTTOM ] : 'tooltip-bottom' ,
    [ LEFT   ] : 'tooltip-left' ,
    [ RIGHT  ] : 'tooltip-right' ,
    [ TOP    ] : 'tooltip-top' ,
} ;

// Alignments

export { CENTER , END , START } from '../enums/alignments' ;

/**
 * @typedef {'start' | 'center' | 'end'} TooltipAlignment
 */

/**
 * Valid tooltip alignments (independent from the position axis).
 * @type {TooltipAlignment[]}
 */
export const alignments = [ START , CENTER , END ] ;

const alignmentMap =
{
    [ START  ] : 'tooltip-start' ,
    [ CENTER ] : 'tooltip-center' ,
    [ END    ] : 'tooltip-end' ,
} ;

export const TOOLTIP         = 'tooltip' ;
export const TOOLTIP_CONTENT = 'tooltip-content' ;

/**
 * The floating bubble : the same look, drawn as a real element.
 *
 * DaisyUI's tooltip lives in a pseudo-element of its trigger, which is what
 * makes it free — and what makes it **clipped by any ancestor that hides its
 * overflow**, and blind to the edges of the window. A list that scrolls, a
 * table, a block truncating its own title : the bubble is cut off, and no prop
 * can lift that. So the floating path draws it as an element of its own, in a
 * portal, and pays for that with these classes rather than borrowing the ones
 * daisyUI scopes to `.tooltip`.
 *
 * @safelist bg-neutral text-neutral-content
 */
export const TOOLTIP_FLOATING = 'pointer-events-none fixed z-[70] w-max max-w-xs rounded-field px-2 py-1 text-center text-sm leading-tight shadow-lg' ;

/**
 * The tail, taken from daisyUI's own so the two paths are indistinguishable.
 *
 * Not a rotated square : daisyUI draws a soft ten-by-four wave, and a diamond
 * beside it reads as a different component. The mask is the one its stylesheet
 * uses, inlined here because that rule is scoped to `.tooltip` and cannot be
 * borrowed from outside it.
 */
export const TOOLTIP_ARROW = 'pointer-events-none absolute block h-1 w-2.5' ;

/** The tail's shape, as daisyUI draws it. */
export const TOOLTIP_ARROW_MASK = `url("data:image/svg+xml,%3Csvg width='10' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.500009 1C3.5 1 3.00001 4 5.00001 4C7 4 6.5 1 9.5 1C10 1 10 0.499897 10 0H0C-1.99338e-08 0.5 0 1 0.500009 1Z' fill='black'/%3E%3C/svg%3E%0A")` ;

/** The inline style that shape needs, on both engines. */
export const tooltipArrowStyle =
{
    maskImage        : TOOLTIP_ARROW_MASK ,
    maskPosition     : '-1px 0' ,
    maskRepeat       : 'no-repeat' ,
    WebkitMaskImage  : TOOLTIP_ARROW_MASK ,
    WebkitMaskPosition : '-1px 0' ,
    WebkitMaskRepeat : 'no-repeat' ,
} ;

/**
 * The fill of a floating bubble, taken from the theme's own variables.
 *
 * **Variables rather than classes.** DaisyUI writes `color:
 * var(--color-neutral-content)` in its stylesheet and never a utility, and for a
 * portaled element that is the sturdier choice : a class has to survive the
 * scanner that generates it and the merge that combines it, while a variable is
 * read at paint time and cannot be dropped by either.
 *
 * A token and its `-content` pair, never anything else — that is the only
 * contrast a theme guarantees, and it holds in both light and dark.
 *
 * @param {string} [color='neutral'] - A daisyUI token.
 * @returns {{ backgroundColor: string, color: string }}
 *
 * @example
 * getFloatingTooltipStyle( 'error' )
 * // → { backgroundColor : 'var(--color-error)' , color : 'var(--color-error-content)' }
 */
export const getFloatingTooltipStyle = ( color = 'neutral' ) => (
{
    backgroundColor : `var(--color-${ color })` ,
    color           : `var(--color-${ color }-content)` ,
}) ;

/**
 * Generates the className of a floating bubble.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 *
 * @example
 * getFloatingTooltipClassNames()
 */
export const getFloatingTooltipClassNames = ({ className } = {} ) => cn( TOOLTIP_FLOATING , className ) ;

/** The tail's className. Its fill is an inline variable, like the bubble's. */
export const getTooltipArrowClassNames = ({ className } = {} ) => cn( TOOLTIP_ARROW , className ) ;

/**
 * Generates a DaisyUI tooltip className expression.
 *
 * @param {Object} [props]
 * @param {TooltipAlignment} [props.align] - Tooltip alignment ('start' | 'center' | 'end').
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {TooltipColorValue} [props.color] - Tooltip color.
 * @param {boolean} [props.open] - Force tooltip open.
 * @param {TooltipPosition} [props.position] - Tooltip placement.
 *
 * @returns {string} The tooltip className expression.
 *
 * @example
 * ```js
 * getTooltipClassNames({ color: 'primary' }) ;
 * // -> 'tooltip tooltip-primary'
 * ```
 */
const getTooltipClassNames =
({
    align ,
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    open ,
    position ,
}
= {} ) => cn
(
    beforeClassName ,
    TOOLTIP ,
    {
        ...before ,

        ...!!colorMap[color]         && { [colorMap[color]]         : true } ,
        ...!!positionMap[position]   && { [positionMap[position]]   : true } ,
        ...!!alignmentMap[align]     && { [alignmentMap[align]]     : true } ,
        ...open === true             && { 'tooltip-open'            : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getTooltipClassNames ;
