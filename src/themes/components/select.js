/**
 * Select class name generator for DaisyUI 5.
 *
 * @module themes/components/select
 * @see https://daisyui.com/components/select
 */

import cn from '../helpers/cn' ;

import {
    ACCENT,
    ERROR,
    INFO,
    NEUTRAL,
    PRIMARY,
    SECONDARY,
    SUCCESS,
    WARNING,
} from '../colors' ;

import { LG, MD, SM, XL, XS } from '../sizing/sizes' ;

// Styles

export const GHOST = 'ghost' ;

/**
 * @typedef {'ghost'} SelectStyle
 */

export const styles = [ GHOST ] ;

const styleMap =
{
    [ GHOST ] : 'select-ghost',
} ;

// Colors

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} SelectColorValue
 */

export const colors = [ ACCENT, ERROR, INFO, NEUTRAL, PRIMARY, SECONDARY, SUCCESS, WARNING ] ;

const colorMap =
{
    [ ACCENT    ] : 'select-accent',
    [ ERROR     ] : 'select-error',
    [ INFO      ] : 'select-info',
    [ NEUTRAL   ] : 'select-neutral',
    [ PRIMARY   ] : 'select-primary',
    [ SECONDARY ] : 'select-secondary',
    [ SUCCESS   ] : 'select-success',
    [ WARNING   ] : 'select-warning',
} ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} SelectSize
 */

export const sizes = [ XS, SM, MD, LG, XL ] ;

const sizeMap =
{
    [ XS ] : 'select-xs',
    [ SM ] : 'select-sm',
    [ MD ] : 'select-md',
    [ LG ] : 'select-lg',
    [ XL ] : 'select-xl',
} ;

export const SELECT = 'select' ;

/**
 * Generates a DaisyUI select className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {SelectColorValue} [props.color] - Select color.
 * @param {SelectSize} [props.size='md'] - Select size.
 * @param {SelectStyle} [props.style] - Select style variant.
 *
 * @returns {string} The select className expression.
 *
 * @example
 * ```js
 * getSelectClasses({ color: 'primary' }) ;
 * // → 'select select-primary'
 *
 * getSelectClasses({ color: 'error', style: 'ghost' }) ;
 * // → 'select select-error select-ghost'
 *
 * getSelectClasses({ color: 'info', style: 'ghost', size: 'lg' }) ;
 * // → 'select select-info select-ghost select-lg'
 * ```
 */
const getSelectClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
    size = MD,
    style,
} = {} ) => cn
(
    beforeClassName ,
    SELECT,
    {
        ...before,

        ...!!styleMap[style] && { [ styleMap[style] ] : true } ,
        ...!!colorMap[color] && { [ colorMap[color] ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true } ,

        ...after,
    },
    className,
) ;

export default getSelectClasses ;