/**
 * Toast class name generator for DaisyUI toasts.
 *
 * @module themes/components/toast
 *
 * @safelist
 * ## Horizontal Alignments
 * - toast-start
 * - toast-center
 * - toast-end
 *
 * ## Vertical Alignments
 * - toast-top
 * - toast-middle
 * - toast-bottom
 */

import cn from '@/themes/helpers/cn' ;

/**
 * @typedef {'start' | 'center' | 'end'} HorizontalAlignment
 * @typedef {'top' | 'middle' | 'bottom'} VerticalAlignment
 */

export const CENTER = 'center' ;
export const BOTTOM = 'bottom' ;
export const END    = 'end' ;
export const MIDDLE = 'middle' ;
export const START  = 'start' ;
export const TOP    = 'top' ;

/**
 * Available horizontal alignments.
 *
 * @type {HorizontalAlignment[]}
 */
export const horizontalAlignments = [ START , CENTER , END ] ;

/**
 * Available vertical alignments.
 *
 * @type {VerticalAlignment[]}
 */
export const verticalAlignments = [ TOP , MIDDLE , BOTTOM ] ;

/**
 * Horizontal alignment class mapping.
 *
 * @type {Object.<HorizontalAlignment, string>}
 */
const horizontalClasses =
{
    [ START ]  : 'toast-start' ,
    [ CENTER ] : 'toast-center' ,
    [ END ]    : 'toast-end' ,
} ;

/**
 * Vertical alignment class mapping.
 *
 * @type {Object.<VerticalAlignment, string>}
 */
const verticalClasses =
{
    [ TOP ]    : 'toast-top' ,
    [ MIDDLE ] : 'toast-middle' ,
    [ BOTTOM ] : 'toast-bottom' ,
} ;

/**
 * Generates toast class names with horizontal and vertical alignment support.
 *
 * @param {Object} [props={}] - Toast properties.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {HorizontalAlignment} [props.hAlign] - Horizontal alignment (start, center, end).
 * @param {VerticalAlignment} [props.vAlign] - Vertical alignment (top, middle, bottom).
 *
 * @returns {string} The composed toast class name string.
 *
 * @example
 * ```js
 * getToastClasses({ hAlign: 'end' , vAlign: 'top' }) ;
 * // → 'toast toast-end toast-top'
 *
 * getToastClasses({ hAlign: 'center' , vAlign: 'bottom' }) ;
 * // → 'toast toast-center toast-bottom'
 *
 * getToastClasses({ vAlign: 'middle' , className: 'z-50' }) ;
 * // → 'toast toast-middle z-50'
 * ```
 */
export const getToastClasses =
({
    beforeClassName ,
    className ,
    hAlign ,
    vAlign ,
}
= {} ) => cn
(
    beforeClassName ,
    'toast' ,
    hAlign && horizontalClasses[ hAlign ] ,
    vAlign && verticalClasses[ vAlign ] ,
    className ,
) ;

export default getToastClasses ;