/**
 * Chart layout — margin, legends and axes resolved together.
 *
 * These three are not three neighbouring concerns, they are **dependent** :
 * the legend is placed from the resolved margin, and each axis derives its
 * title offset from it too. That dependency is why they always appeared
 * together in every chart, and why they belong in one place.
 *
 * Grouping them also keeps the three margin strategies from leaking into
 * the components : a chart declares *what kind of thing it is* and gets the
 * right one, instead of importing the matching builder itself.
 *
 * @module themes/charts/layout
 */

import { getChartAxis }                       from './axes' ;
import { getChartLegends , getContinuousLegends } from './legends' ;
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
 * Resolves a chart's margin, legends and axes in one pass.
 *
 * **Axes are shown by default.** An omitted `xAxis` yields a plain axis with
 * ticks rather than no axis at all — matching nivo's own default, and what
 * a caller writing `<BarChart data indexBy />` expects. Hide one explicitly
 * with `xAxis={ false }` or `xAxis={{ hide : true }}`.
 *
 * @param {Object} [props]
 * @param {boolean} [props.continuousLegend=false] - Build a gradient-bar legend instead of a list of swatches.
 * @param {string} [props.kind='cartesian'] - `'cartesian'`, `'radial'` or `'grid'`.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - Explicit margin overrides, merged last.
 * @param {boolean} [props.outsideLabels=false] - Radial only — labels drawn outside the plotted shape.
 * @param {boolean} [props.weekdayLabels=false] - Grid only — spelled-out weekday names down the left.
 * @param {Object|boolean} [props.xAxis] - The x axis config.
 * @param {string} [props.xAxisPosition='bottom'] - `'bottom'` or `'top'` ; a heatmap labels its columns on top.
 * @param {string} [props.xScaleType] - Scale type ; `'time'` selects the localized tick formatter.
 * @param {Object|boolean} [props.yAxis] - The y axis config.
 *
 * @returns {{margin:Object,legends:Object[]|undefined,axisBottom:Object|null,axisTop:Object|null,axisLeft:Object|null}} The resolved layout.
 *
 * @example
 * ```js
 * getChartLayout( { kind : 'cartesian' , xAxis : { legend : 'country' } , legend : 'bottom' } ) ;
 * ```
 */
export const getChartLayout = ( {
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
} = {} ) =>
{
    let resolvedMargin ;

    if ( kind === RADIAL )
    {
        resolvedMargin = getRadialMargin( { outsideLabels , legend , margin } ) ;
    }
    else if ( kind === GRID )
    {
        resolvedMargin = getGridMargin( { weekdayLabels , xAxis , yAxis , legend , margin } ) ;
    }
    else
    {
        resolvedMargin = getChartMargin( { xAxis , yAxis , legend , margin } ) ;
    }

    const legends = ( continuousLegend ? getContinuousLegends : getChartLegends )
    ({
        legend ,
        margin : resolvedMargin ,
    }) ;

    // Nothing to draw an axis on.
    if ( kind === RADIAL )
    {
        return { margin : resolvedMargin , legends , axisBottom : null , axisTop : null , axisLeft : null } ;
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
        legends ,
        axisBottom : xAxisPosition === 'bottom' ? axisX : null ,
        axisTop    : xAxisPosition === 'top'    ? axisX : null ,
        axisLeft ,
    } ;
} ;

export default getChartLayout ;
