/**
 * Chart layout — margin and axes resolved together.
 *
 * The two are dependent : each axis derives its title offset from the
 * resolved margin. That dependency is why they always appeared together in
 * every chart, and why they belong in one place.
 *
 * Grouping them also keeps the three margin strategies from leaking into
 * the components : a chart declares *what kind of thing it is* and gets the
 * right one, instead of importing the matching builder itself.
 *
 * **The legend used to be resolved here too**, and it no longer is : it is
 * drawn in HTML by `ChartFrame` from what `useChartLegend` builds, so it is
 * neither placed from the margin nor taken out of it.
 *
 * @module themes/charts/layout
 */

import { getChartAxis }                       from './axes' ;
import { getChartMargin , getGridMargin , getRadialMargin } from './margins' ;

/**
 * Axes along the bottom and left — bar, line, marimekko.
 * @type {string}
 */
export const CARTESIAN = 'cartesian' ;

/**
 * Drawn in a circle, no axes — pie, radial bar, radar, chord, polar bar, waffle.
 * @type {string}
 */
export const RADIAL = 'radial' ;

/**
 * Labels above and to the left — calendar, time range, heatmap.
 * @type {string}
 */
export const GRID = 'grid' ;

/**
 * The supported chart kinds.
 * @type {string[]}
 */
export const chartKinds = [ CARTESIAN , RADIAL , GRID ] ;

/**
 * Resolves a chart's margin and axes in one pass.
 *
 * **Axes are shown by default.** An omitted `xAxis` yields a plain axis with
 * ticks rather than no axis at all — matching nivo's own default, and what
 * a caller writing `<BarChart data indexBy />` expects. Hide one explicitly
 * with `xAxis={ false }` or `xAxis={{ hide : true }}`.
 *
 * @param {Object} [props]
 * @param {string} [props.kind='cartesian'] - `'cartesian'`, `'radial'` or `'grid'`.
 * @param {Object} [props.margin] - Explicit margin overrides, merged last.
 * @param {boolean} [props.outsideLabels=false] - Radial only — labels drawn outside the plotted shape.
 * @param {boolean} [props.weekdayLabels=false] - Grid only — spelled-out weekday names down the left.
 * @param {Object|boolean} [props.xAxis] - The x axis config.
 * @param {string} [props.xAxisPosition='bottom'] - `'bottom'` or `'top'` ; a heatmap labels its columns on top.
 * @param {string} [props.xScaleType] - Scale type ; `'time'` selects the localized tick formatter.
 * @param {Object|boolean} [props.yAxis] - The y axis config.
 *
 * @returns {{margin:Object,axisBottom:Object|null,axisTop:Object|null,axisLeft:Object|null}} The resolved layout.
 *
 * @example
 * ```js
 * getChartLayout( { kind : 'cartesian' , xAxis : { legend : 'country' } } ) ;
 * ```
 */
export const getChartLayout = ( {
    kind = CARTESIAN ,
    margin ,
    outsideLabels = false ,
    weekdayLabels = false ,
    xAxis ,
    xAxisPosition = 'bottom' ,
    xScaleType ,
    yAxis ,
} = {} ) =>
{
    let resolvedMargin ;

    if ( kind === RADIAL )
    {
        resolvedMargin = getRadialMargin( { outsideLabels , margin } ) ;
    }
    else if ( kind === GRID )
    {
        resolvedMargin = getGridMargin( { weekdayLabels , xAxis , yAxis , margin } ) ;
    }
    else
    {
        resolvedMargin = getChartMargin( { xAxis , yAxis , margin } ) ;
    }

    // Nothing to draw an axis on.
    if ( kind === RADIAL )
    {
        return { margin : resolvedMargin , axisBottom : null , axisTop : null , axisLeft : null } ;
    }

    const axisX = getChartAxis
    ({
        axis     : xAxis ?? {} ,
        margin   : resolvedMargin ,
        position : xAxisPosition ,
        scale    : xScaleType ,
    }) ;

    const axisLeft = getChartAxis( { axis : yAxis ?? {} , margin : resolvedMargin , position : 'left' } ) ;

    return {
        margin     : resolvedMargin ,
        axisBottom : xAxisPosition === 'bottom' ? axisX : null ,
        axisTop    : xAxisPosition === 'top'    ? axisX : null ,
        axisLeft ,
    } ;
} ;

export default getChartLayout ;
