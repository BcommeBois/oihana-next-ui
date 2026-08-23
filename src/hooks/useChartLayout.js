'use client' ;

/**
 * Resolves a chart's margin and axes.
 *
 * @module hooks/useChartLayout
 */

import { useMemo } from 'react' ;

import { CARTESIAN , getChartLayout } from '../themes/charts/layout' ;

/**
 * React hook returning a chart's margin and axes.
 *
 * The two are resolved together because each axis derives its title offset
 * from the resolved margin. Computing them separately meant repeating the
 * same memos in every chart and re-deriving the coupling by hand.
 *
 * The legend is not among them : `useChartLegend` builds it and `ChartFrame`
 * draws it in HTML, so it is neither placed from the margin nor taken out of
 * it.
 *
 * @param {Object} [props] - See {@link getChartLayout} for every option.
 * @param {string} [props.kind='cartesian'] - `'cartesian'`, `'radial'` or `'grid'`.
 * @param {Object} [props.margin] - Explicit margin overrides.
 * @param {boolean} [props.outsideLabels=false] - Radial only — labels outside the plotted shape.
 * @param {boolean} [props.weekdayLabels=false] - Grid only — spelled-out weekday names.
 * @param {Object|boolean} [props.xAxis] - The x axis config.
 * @param {string} [props.xAxisPosition='bottom'] - `'bottom'` or `'top'`.
 * @param {string} [props.xScaleType] - Scale type ; `'time'` selects the localized tick formatter.
 * @param {Object|boolean} [props.yAxis] - The y axis config.
 *
 * @returns {{margin:Object,axisBottom:Object|null,axisTop:Object|null,axisLeft:Object|null}} The resolved layout.
 *
 * @example
 * ```jsx
 * const { margin , axisBottom , axisLeft } = useChartLayout
 * ({
 *     kind : 'cartesian' ,
 *     margin , xAxis , yAxis ,
 * }) ;
 * ```
 */
const useChartLayout = ( {
    kind = CARTESIAN ,
    margin ,
    outsideLabels = false ,
    weekdayLabels = false ,
    xAxis ,
    xAxisPosition = 'bottom' ,
    xScaleType ,
    yAxis ,
} = {} ) => useMemo
(
    () => getChartLayout
    ({
        kind ,
        margin ,
        outsideLabels ,
        weekdayLabels ,
        xAxis ,
        xAxisPosition ,
        xScaleType ,
        yAxis ,
    }) ,
    [
        kind ,
        margin ,
        outsideLabels ,
        weekdayLabels ,
        xAxis ,
        xAxisPosition ,
        xScaleType ,
        yAxis ,
    ] ,
) ;

export default useChartLayout ;
