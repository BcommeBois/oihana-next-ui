/**
 * Chart tooltip class name generators.
 *
 * The tooltip is the one piece of chart chrome that is plain HTML rather
 * than SVG, so it can be styled with DaisyUI classes instead of restating
 * colors and shadows in a JS theme object — it then inherits the design
 * tokens for free, in both light and dark themes.
 *
 * @module themes/charts/tooltip
 */

import cn from '../helpers/cn' ;

export const CHART_TOOLTIP       = 'rounded-box border border-base-300 bg-base-100 px-3 py-2 shadow-lg text-sm text-base-content' ;
export const CHART_TOOLTIP_TITLE = 'font-semibold mb-1' ;
export const CHART_TOOLTIP_LIST  = 'flex flex-col gap-1' ;
export const CHART_TOOLTIP_ITEM  = 'flex items-center gap-2 whitespace-nowrap' ;
export const CHART_TOOLTIP_CHIP  = 'size-3 shrink-0 rounded-full' ;
export const CHART_TOOLTIP_LABEL = 'text-base-content/70' ;
export const CHART_TOOLTIP_VALUE = 'ml-auto pl-3 font-medium tabular-nums' ;

/**
 * Generates the tooltip container class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes.
 *
 * @returns {string} Combined class names.
 */
export const getChartTooltipClasses = ( { className } = {} ) => cn
(
    CHART_TOOLTIP ,
    className ,
) ;

/**
 * Generates the tooltip title class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes.
 *
 * @returns {string} Combined class names.
 */
export const getChartTooltipTitleClasses = ( { className } = {} ) => cn
(
    CHART_TOOLTIP_TITLE ,
    className ,
) ;

/**
 * Generates the tooltip item row class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes.
 *
 * @returns {string} Combined class names.
 */
export const getChartTooltipItemClasses = ( { className } = {} ) => cn
(
    CHART_TOOLTIP_ITEM ,
    className ,
) ;
