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

import dayjs from '../../helpers/date/configureDayjs' ;

import cn from '../helpers/cn' ;

export const CHART_TOOLTIP       = 'rounded-box border border-base-300 bg-base-100 px-3 py-2 shadow-lg text-sm text-base-content' ;
export const CHART_TOOLTIP_TITLE = 'font-semibold mb-1' ;
export const CHART_TOOLTIP_LIST  = 'flex flex-col gap-1' ;
export const CHART_TOOLTIP_ITEM  = 'flex items-center gap-2 whitespace-nowrap' ;
export const CHART_TOOLTIP_CHIP  = 'size-3 shrink-0 rounded-full' ;
export const CHART_TOOLTIP_LABEL = 'text-base-content/70' ;
export const CHART_TOOLTIP_VALUE = 'ml-auto pl-3 font-medium tabular-nums' ;

/**
 * What the bubble becomes once it places itself.
 *
 * `fixed` because the placement it gets is in viewport coordinates, `w-max`
 * because out of the chart it would otherwise take the width of the body, and
 * `pointer-events-none` because a bubble that can be hovered steals the hover
 * that is keeping it open. The layer is the one the floating tooltip already
 * uses — same kind of bubble, same height in the stack.
 */
export const CHART_TOOLTIP_FLOATING = 'pointer-events-none fixed z-[70] w-max' ;

/**
 * Default formatter for the value a tooltip shows when the caller gave no format.
 *
 * nivo always fills its formatted value, and without a format its formatter is
 * `v => '' + v` : a tooltip fed that shows `1234567.89`, never `1 234 567,89`. A
 * number is therefore formatted here in the active locale — the one dayjs holds,
 * which the LangProvider keeps in sync and the time axes already follow — and
 * anything else is shown as it is. The tooltip only exists on hover, in the
 * browser, so no server render has to agree with it.
 *
 * @param {*} value - The raw value.
 * @returns {*} The formatted number, or the value unchanged.
 *
 * @example
 * ```js
 * formatTooltipValue( 1234567.89 ) ; // 'fr' → '1 234 567,89' · 'en' → '1,234,567.89'
 * ```
 */
export const formatTooltipValue = ( value ) =>
{
    if ( typeof value !== 'number' || !Number.isFinite( value ) )
    {
        return value ;
    }

    try
    {
        return new Intl.NumberFormat( dayjs.locale() ).format( value ) ;
    }
    catch
    {
        return String( value ) ;
    }
} ;

/**
 * Generates the tooltip container class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes.
 * @param {boolean} [props.floating] - The bubble places itself in the viewport rather than sitting where it was rendered.
 *
 * @returns {string} Combined class names.
 */
export const getChartTooltipClasses = ( { className , floating } = {} ) => cn
(
    CHART_TOOLTIP ,
    floating && CHART_TOOLTIP_FLOATING ,
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
