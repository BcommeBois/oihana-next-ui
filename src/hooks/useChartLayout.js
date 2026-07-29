'use client' ;

/**
 * Resolves a chart's margin, legends and axes.
 *
 * @module hooks/useChartLayout
 */

import { useMemo } from 'react' ;

import { CARTESIAN , getChartLayout } from '../themes/charts/layout' ;

/**
 * React hook returning a chart's margin, legends and axes.
 *
 * The three are resolved together because they depend on each other — the
 * legend is placed from the resolved margin, and each axis derives its title
 * offset from it. Computing them separately meant repeating the same four
 * memos in every chart and re-deriving the coupling by hand.
 *
 * @param {Object} [props] - See {@link getChartLayout} for every option.
 * @param {boolean} [props.continuousLegend=false] - Gradient-bar legend instead of a list of swatches.
 * @param {string} [props.kind='cartesian'] - `'cartesian'`, `'radial'` or `'grid'`.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - Explicit margin overrides.
 * @param {boolean} [props.outsideLabels=false] - Radial only — labels outside the plotted shape.
 * @param {boolean} [props.weekdayLabels=false] - Grid only — spelled-out weekday names.
 * @param {Object|boolean} [props.xAxis] - The x axis config.
 * @param {string} [props.xAxisPosition='bottom'] - `'bottom'` or `'top'`.
 * @param {string} [props.xScaleType] - Scale type ; `'time'` selects the localized tick formatter.
 * @param {Object|boolean} [props.yAxis] - The y axis config.
 *
 * @returns {{margin:Object,legends:Object[]|undefined,axisBottom:Object|null,axisTop:Object|null,axisLeft:Object|null}} The resolved layout.
 *
 * @example
 * ```jsx
 * const { margin , legends , axisBottom , axisLeft } = useChartLayout
 * ({
 *     kind  : 'cartesian' ,
 *     legend , margin , xAxis , yAxis ,
 * }) ;
 * ```
 */
const useChartLayout = ( {
    continuousLegend = false ,
    kind = CARTESIAN ,
    legend ,
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
        continuousLegend ,
        kind ,
        legend ,
        margin ,
        outsideLabels ,
        weekdayLabels ,
        xAxis ,
        xAxisPosition ,
        xScaleType ,
        yAxis ,
    }) ,
    [
        continuousLegend ,
        kind ,
        legend ,
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
