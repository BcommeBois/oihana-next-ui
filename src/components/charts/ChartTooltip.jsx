'use client' ;

/**
 * Chart tooltip built on DaisyUI classes.
 *
 * @module components/charts/ChartTooltip
 */

import
{
    CHART_TOOLTIP_CHIP ,
    CHART_TOOLTIP_LABEL ,
    CHART_TOOLTIP_LIST ,
    CHART_TOOLTIP_VALUE ,
    getChartTooltipClasses ,
    getChartTooltipItemClasses ,
    getChartTooltipTitleClasses ,
} from '../../themes/charts/tooltip' ;

/**
 * Tooltip shown on chart hover.
 *
 * nivo's own tooltip is styled through inline styles in the theme object,
 * which means restating background, border, radius and shadow instead of
 * reusing the design tokens. This one is plain HTML with DaisyUI classes, so
 * it follows the theme — including the dark variant — on its own. The nivo
 * `theme.tooltip.container` is neutralized in `buildChartTheme` so this
 * component owns the whole look.
 *
 * Accepts either a single row (`label` / `value` / `color`) or several
 * through `items`, which is what a stacked bar or a line slice needs.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the container.
 * @param {string} [props.color] - Series color, shown as a chip. Single-row form.
 * @param {Array<{color?:string,label?:React.ReactNode,value?:React.ReactNode}>} [props.items] - Several rows.
 * @param {React.ReactNode} [props.label] - Series label. Single-row form.
 * @param {React.ReactNode} [props.title] - Optional heading (usually the hovered index).
 * @param {React.ReactNode} [props.value] - Formatted value. Single-row form.
 *
 * @example
 * ```jsx
 * <ChartTooltip title="FR" color="#E12A27" label="burger" value={ 12 } />
 * ```
 *
 * @example
 * ```jsx
 * <ChartTooltip
 *     title = "2024-03"
 *     items = {[
 *         { color : '#E12A27' , label : 'france' , value : 120 } ,
 *         { color : '#F9BF05' , label : 'norway' , value : 98  } ,
 *     ]}
 * />
 * ```
 */
const ChartTooltip =
({
    className ,
    color ,
    items ,
    label ,
    title ,
    value ,
}) =>
{
    const rows = items ?? [ { color , label , value } ] ;

    return (
        <div className={ getChartTooltipClasses( { className } ) }>

            { title !== undefined && title !== null && (
                <div className={ getChartTooltipTitleClasses() }>
                    { title }
                </div>
            ) }

            <div className={ CHART_TOOLTIP_LIST }>
                { rows.map( ( row , index ) => (
                    <div
                        key       = { `${ row?.label ?? '' }-${ index }` }
                        className = { getChartTooltipItemClasses() }
                    >
                        { row?.color && (
                            <span
                                className = { CHART_TOOLTIP_CHIP }
                                style     = {{ backgroundColor : row.color }}
                            />
                        ) }

                        { row?.label !== undefined && row?.label !== null && (
                            <span className={ CHART_TOOLTIP_LABEL }>
                                { row.label }
                            </span>
                        ) }

                        { row?.value !== undefined && row?.value !== null && (
                            <span className={ CHART_TOOLTIP_VALUE }>
                                { row.value }
                            </span>
                        ) }
                    </div>
                ) ) }
            </div>

        </div>
    ) ;
} ;

ChartTooltip.displayName = 'ChartTooltip' ;

export default ChartTooltip ;
