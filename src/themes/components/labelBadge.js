/**
 * LabelBadge class name generator.
 *
 * A two-sided badge ("shields.io" style) built on top of the DaisyUI `.badge`
 * shell : a neutral label segment on the left and a colored value segment on
 * the right. The shell keeps every theme token of `.badge` (height, radius,
 * font-size, border) while `p-0 overflow-hidden` lets the two inner segments
 * fill it and get clipped to the theme radius.
 *
 * @module themes/components/labelBadge
 * @see module:themes/components/badge
 */

import cn from '../helpers/cn' ;

import getBadgeClassNames from './badge' ;

import
{
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

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Colors

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
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} LabelBadgeColor
 */

/**
 * DaisyUI colors handled through class names. Any other string is treated as a
 * custom CSS color and applied through an inline style.
 * @type {LabelBadgeColor[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

// Full literal class names (kept static so Tailwind's scanner can pick them up).

const solidBg =
{
    [ ACCENT    ] : 'bg-accent' ,
    [ ERROR     ] : 'bg-error' ,
    [ INFO      ] : 'bg-info' ,
    [ NEUTRAL   ] : 'bg-neutral' ,
    [ PRIMARY   ] : 'bg-primary' ,
    [ SECONDARY ] : 'bg-secondary' ,
    [ SUCCESS   ] : 'bg-success' ,
    [ WARNING   ] : 'bg-warning' ,
} ;

const solidText =
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

const softBg =
{
    [ ACCENT    ] : 'bg-accent/15' ,
    [ ERROR     ] : 'bg-error/15' ,
    [ INFO      ] : 'bg-info/15' ,
    [ NEUTRAL   ] : 'bg-neutral/15' ,
    [ PRIMARY   ] : 'bg-primary/15' ,
    [ SECONDARY ] : 'bg-secondary/15' ,
    [ SUCCESS   ] : 'bg-success/15' ,
    [ WARNING   ] : 'bg-warning/15' ,
} ;

const colorText =
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

// Styles

export const OUTLINE = 'outline' ;
export const SOFT    = 'soft' ;
export const SOLID   = 'solid' ;

/**
 * @typedef {'outline' | 'soft' | 'solid'} LabelBadgeStyle
 */

export const styles = [ OUTLINE , SOFT , SOLID ] ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} LabelBadgeSize
 */

export const sizes = [ XS , SM , MD , LG , XL ] ;

const segmentPadding =
{
    [ XS ] : 'px-1.5' ,
    [ SM ] : 'px-2' ,
    [ MD ] : 'px-2.5' ,
    [ LG ] : 'px-3' ,
    [ XL ] : 'px-3.5' ,
} ;

export const LABEL_BADGE = 'label-badge' ;

/**
 * Resolves a segment color into either a class name (DaisyUI token) or an
 * inline style (custom CSS color).
 *
 * @param {Object} [props]
 * @param {LabelBadgeColor | string} [props.color] - DaisyUI token or CSS color.
 * @param {'left' | 'right'} [props.side] - Which side the segment sits on.
 * @param {LabelBadgeStyle} [props.style] - Visual variant.
 *
 * @returns {{ className: string, style?: Object }} The resolved segment.
 */
export const resolveSegment =
({
    color ,
    side = 'right' ,
    style = SOLID ,
}
= {} ) =>
{
    const isDaisy = colors.includes( color ) ;

    // Custom CSS color → inline style.
    if ( color && !isDaisy )
    {
        if ( style === SOFT )
        {
            return { className : '' , style : { backgroundColor : `color-mix(in oklab, ${color} 15%, transparent)` , color } } ;
        }

        if ( style === OUTLINE )
        {
            return { className : side === 'right' ? 'border-l border-base-300' : '' , style : { color } } ;
        }

        return { className : '' , style : { backgroundColor : color , color : '#fff' } } ; // solid
    }

    const c = color || NEUTRAL ;

    if ( style === SOFT )
    {
        return { className : cn( softBg[c] , colorText[c] ) } ;
    }

    if ( style === OUTLINE )
    {
        return { className : cn( colorText[c] , side === 'right' && 'border-l border-base-300' ) } ;
    }

    return { className : cn( solidBg[c] , solidText[c] ) } ; // solid
} ;

/**
 * Generates the LabelBadge shell className expression.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {LabelBadgeSize} [props.size] - Badge size.
 * @param {LabelBadgeStyle} [props.style] - Visual variant.
 *
 * @returns {string} The shell className expression.
 *
 * @example
 * ```js
 * getLabelBadgeClassNames({ size: 'md' }) ;
 * // → 'badge whitespace-nowrap badge-md p-0 gap-0 overflow-hidden'
 * ```
 */
export const getLabelBadgeClassNames =
({
    className ,
    size ,
    style = SOLID ,
}
= {} ) => getBadgeClassNames
({
    size ,
    className : cn
    (
        LABEL_BADGE ,
        'p-0 gap-0 overflow-hidden' ,
        style === OUTLINE && 'bg-transparent border-base-300' ,
        style === SOFT    && 'border-transparent' ,
        className ,
    ) ,
}) ;

/**
 * Generates the className and inline style for a single LabelBadge segment.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {LabelBadgeColor | string} [props.color] - DaisyUI token or CSS color.
 * @param {'left' | 'right'} [props.side] - Which side the segment sits on.
 * @param {LabelBadgeSize} [props.size] - Badge size (drives horizontal padding).
 * @param {LabelBadgeStyle} [props.style] - Visual variant.
 *
 * @returns {{ className: string, style?: Object }} The resolved segment.
 */
export const getLabelBadgeSegment =
({
    className ,
    color ,
    side = 'right' ,
    size ,
    style = SOLID ,
}
= {} ) =>
{
    const { className : colorClassName , style : inlineStyle } = resolveSegment({ color , side , style }) ;

    return {
        className : cn
        (
            'inline-flex items-center gap-1 h-full leading-none' ,
            segmentPadding[ size ] || segmentPadding[ MD ] ,
            colorClassName ,
            className ,
        ) ,
        style : inlineStyle ,
    } ;
} ;

export default getLabelBadgeClassNames ;
