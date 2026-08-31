/**
 * Alert class name generator for DaisyUI.
 *
 * @module themes/components/alert
 * @see https://daisyui.com/components/alert
 *
 * @safelist
 * ## Colors
 * - alert-error | alert-info | alert-success | alert-warning
 * - [--alert-color:var(--color-accent)] | [--alert-color:var(--color-neutral)]
 * - [--alert-color:var(--color-primary)] | [--alert-color:var(--color-secondary)]
 * - [--alert-border-color:var(--color-accent)] | [--alert-border-color:var(--color-neutral)]
 * - [--alert-border-color:var(--color-primary)] | [--alert-border-color:var(--color-secondary)]
 * - text-accent-content | text-neutral-content | text-primary-content | text-secondary-content
 *
 * ## Styles
 * - alert-dash | alert-outline | alert-soft
 *
 * ## Directions
 * - alert-horizontal | alert-vertical
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

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} AlertColor
 * @typedef {'dash' | 'outline' | 'soft'} AlertStyle
 * @typedef {'horizontal' | 'vertical'} AlertDirection
 */

// Colors

export { ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING } from '../colors' ;

/**
 * Valid alert colors.
 * @type {AlertColor[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

/**
 * Alert color class mapping.
 *
 * DaisyUI only ships the four semantic alerts. The other colors set the very
 * `--alert-color` variable those four are built on, so every style variant
 * derives from them for free — as do the border and the soft background.
 *
 * @type {Object.<AlertColor, string>}
 */
const colorMap =
{
    [ ERROR   ] : 'alert-error' ,
    [ INFO    ] : 'alert-info' ,
    [ SUCCESS ] : 'alert-success' ,
    [ WARNING ] : 'alert-warning' ,

    [ ACCENT    ] : '[--alert-color:var(--color-accent)] [--alert-border-color:var(--color-accent)]' ,
    [ NEUTRAL   ] : '[--alert-color:var(--color-neutral)] [--alert-border-color:var(--color-neutral)]' ,
    [ PRIMARY   ] : '[--alert-color:var(--color-primary)] [--alert-border-color:var(--color-primary)]' ,
    [ SECONDARY ] : '[--alert-color:var(--color-secondary)] [--alert-border-color:var(--color-secondary)]' ,
} ;

/**
 * Text color of the filled variant, for the colors DaisyUI has no alert class for.
 *
 * The filled alert paints its background with `--alert-color`, so the text has to
 * be the matching `-content` or it is read on its own hue. The `dash`, `outline`
 * and `soft` variants set that text color themselves — from `--alert-color` — so
 * this must not be emitted there : a Tailwind utility wins over DaisyUI's layers
 * and would repaint a pale background's text with the color meant for a solid one.
 *
 * @type {Object.<AlertColor, string>}
 */
const contentColorMap =
{
    [ ACCENT    ] : 'text-accent-content' ,
    [ NEUTRAL   ] : 'text-neutral-content' ,
    [ PRIMARY   ] : 'text-primary-content' ,
    [ SECONDARY ] : 'text-secondary-content' ,
} ;

// Styles

export const DASH    = 'dash' ;
export const OUTLINE = 'outline' ;
export const SOFT    = 'soft' ;

/**
 * Valid alert styles.
 * @type {AlertStyle[]}
 */
export const styles = [ DASH , OUTLINE , SOFT ] ;

/**
 * Alert style class mapping.
 * @type {Object.<AlertStyle, string>}
 */
const styleMap =
{
    [ DASH    ] : 'alert-dash' ,
    [ OUTLINE ] : 'alert-outline' ,
    [ SOFT    ] : 'alert-soft' ,
} ;

// Directions

export const HORIZONTAL = 'horizontal' ;
export const VERTICAL   = 'vertical' ;

/**
 * Valid alert directions.
 * @type {AlertDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Alert direction class mapping.
 * @type {Object.<AlertDirection, string>}
 */
const directionMap =
{
    [ HORIZONTAL ] : 'alert-horizontal' ,
    [ VERTICAL   ] : 'alert-vertical' ,
} ;

/**
 * Generates a DaisyUI alert className expression.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {AlertColor} [props.color] - Alert color.
 * @param {AlertDirection} [props.direction] - Layout direction.
 * @param {AlertStyle} [props.style] - Alert style variant.
 * @returns {string} The alert className expression.
 *
 * @example
 * ```js
 * getAlertClassNames({ color: 'error' }) ;
 * // → 'alert alert-error'
 *
 * getAlertClassNames({ color: 'info' , style: 'outline' }) ;
 * // → 'alert alert-info alert-outline'
 *
 * getAlertClassNames({ color: 'primary' }) ;
 * // → 'alert [--alert-color:var(--color-primary)] [--alert-border-color:var(--color-primary)] text-primary-content'
 *
 * getAlertClassNames({ color: 'success' , style: 'soft' , direction: 'vertical' }) ;
 * // → 'alert alert-success alert-soft alert-vertical'
 * ```
 *
 * @example
 * ```jsx
 * // An arbitrary color — anything CSS accepts — is the same variable, set inline.
 * <div className={ getAlertClassNames() } style={{ '--alert-color' : '#7c3aed' }} />
 * ```
 */
const getAlertClassNames =
({
    beforeClassName ,
    className ,
    color ,
    direction ,
    style ,
}
= {} ) => cn
(
    beforeClassName ,
    'alert' ,
    color && colorMap[ color ] ,
    color && !style && contentColorMap[ color ] ,
    style && styleMap[ style ] ,
    direction && directionMap[ direction ] ,
    className ,
) ;

export default getAlertClassNames ;
