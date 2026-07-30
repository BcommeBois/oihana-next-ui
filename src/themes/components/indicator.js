/**
 * Indicator class name generators for DaisyUI 5.
 *
 * @module themes/components/indicator
 * @see https://daisyui.com/components/indicator
 */

import cn from '../helpers/cn' ;

import { CENTER , END , START }  from '../enums/alignments' ;
import { BOTTOM , MIDDLE , TOP } from '../enums/positions' ;

export { CENTER , END , START }  from '../enums/alignments' ;
export { BOTTOM , MIDDLE , TOP } from '../enums/positions' ;

/**
 * @typedef {'start' | 'center' | 'end'} IndicatorAlign
 */

/**
 * @typedef {'top' | 'middle' | 'bottom'} IndicatorPosition
 */

/**
 * Valid horizontal alignments for an indicator item.
 * @type {IndicatorAlign[]}
 */
export const alignments = [ START , CENTER , END ] ;

/**
 * Valid vertical positions for an indicator item.
 * @type {IndicatorPosition[]}
 */
export const positions = [ TOP , MIDDLE , BOTTOM ] ;

const alignMap =
{
    [ START ]  : 'indicator-start' ,
    [ CENTER ] : 'indicator-center' ,
    [ END ]    : 'indicator-end' ,
} ;

const positionMap =
{
    [ TOP ]    : 'indicator-top' ,
    [ MIDDLE ] : 'indicator-middle' ,
    [ BOTTOM ] : 'indicator-bottom' ,
} ;

export const INDICATOR      = 'indicator' ;
export const INDICATOR_ITEM = 'indicator-item' ;

/**
 * Generates a DaisyUI `indicator` container className expression.
 *
 * The container is `inline-flex` with `width: max-content`, so it hugs the element it
 * anchors : wrapping a full-width control shrinks it back to its content unless the
 * width is restated here.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The indicator className expression.
 *
 * @example
 * ```js
 * getIndicatorClasses() ;
 * // → 'indicator'
 *
 * getIndicatorClasses({ className: 'w-full' }) ;
 * // → 'indicator w-full'
 * ```
 */
export const getIndicatorClasses =
({
    after,
    before,
    beforeClassName,
    className,
} = {} ) => cn
(
    beforeClassName,
    INDICATOR,
    {
        ...before,
        ...after,
    },
    className,
) ;

/**
 * Generates a DaisyUI `indicator-item` className expression.
 *
 * The placement modifiers belong on the **item**, not on the container : they only set
 * the CSS variables `.indicator-item` reads, which is what lets several items sit at
 * different corners of the same container.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {IndicatorAlign} [props.align='end'] - Horizontal alignment.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {IndicatorPosition} [props.position='top'] - Vertical position.
 *
 * @returns {string} The indicator-item className expression.
 *
 * @example
 * ```js
 * getIndicatorItemClasses() ;
 * // → 'indicator-item indicator-end indicator-top'
 *
 * getIndicatorItemClasses({ align: 'start', position: 'bottom' }) ;
 * // → 'indicator-item indicator-start indicator-bottom'
 * ```
 */
export const getIndicatorItemClasses =
({
    after,
    align = END,
    before,
    beforeClassName,
    className,
    position = TOP,
} = {} ) => cn
(
    beforeClassName,
    INDICATOR_ITEM,
    {
        ...before,

        ...!!alignMap[ align ]       && { [ alignMap[ align ] ] : true } ,
        ...!!positionMap[ position ] && { [ positionMap[ position ] ] : true } ,

        ...after,
    },
    className,
) ;

export default getIndicatorClasses ;
