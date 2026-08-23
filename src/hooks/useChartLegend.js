'use client' ;

/**
 * Resolves a chart's HTML legend.
 *
 * @module hooks/useChartLegend
 */

import { useMemo } from 'react' ;

import { getLegendItems , resolveLegend } from '../themes/charts/legendItems' ;

/**
 * React hook returning the legend `ChartFrame` should draw, or `null`.
 *
 * **Two shapes come out of one prop.** A chart colouring categories legends
 * itself with a list of names ; one colouring a quantity legends itself with a
 * scale, which is a different component and not a list of anything. The
 * `legend` prop is the same on both, the placements are the same, and the
 * caller never has to know which of the two its chart happens to be : pass
 * `scale` and the result carries a scale, pass `names` and it carries items.
 *
 * The `legend` prop keeps the shape it always had — `false`, `true`, a
 * position, or an object — but the object's fields are now ours rather than
 * nivo's : `position`, `values`, `valueFormatter`, `marker`, `orientation`,
 * `size`, `className`, `items`. A caller who genuinely wants the old in-SVG
 * legend still has `nivoProps={{ legends : [ … ] }}`.
 *
 * **`values` is off by default.** Turning it on prints the total of each
 * series beside its name, and what that total means is not the same from one
 * chart to the next : on a partition it is the datum's own value, on a series
 * chart the sum of the key over every index, and on a line chart nothing at
 * all — summing the `y` of a curve gives no total. Charts pass `values` only
 * when they have an honest one ; `values` as a function overrides them all.
 *
 * @param {Object} [props]
 * @param {string[]} [props.colors] - The resolved palette, in series order.
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {string} [props.marker='dot'] - The chart's default mark shape ; `legend.marker` overrides it. A curve is legended by a `'line'`, a filled mark by a `'dot'`.
 * @param {Array<string|number>} [props.names] - The series names, in the same order.
 * @param {{ min : number , max : number }} [props.scale] - The value range of a quantitative chart. Present, it makes the result a scale instead of a list, `colors` being read as the ramp rather than as one colour per name. `legend.ticks` rides along to `MetricScale`.
 * @param {string[]} [props.tooltips] - Optional per-entry tooltips.
 * @param {Array<number|string>} [props.values] - The chart's natural per-series values, used when `legend.values` is `true`.
 *
 * @returns {{className:string,items:Object[],marker:string,orientation:string,position:string,scale:Object,size:string,valueFormatter:Function}|null} The legend to draw, or `null`.
 *
 * @example
 * ```jsx
 * const legendProps = useChartLegend( { legend , names : resolvedKeys , colors } ) ;
 *
 * <ChartFrame legend={ legendProps } … >
 * ```
 */
const useChartLegend = ( { colors , legend , marker , names , scale , tooltips , values } = {} ) => useMemo
(
    () =>
    {
        const resolved = resolveLegend( legend ) ;

        if ( !resolved )
        {
            return null ;
        }

        const {
            className ,
            items ,
            marker : markerOverride ,
            orientation ,
            position = 'bottom' ,
            size ,
            ticks ,
            valueFormatter ,
            values : showValues = false ,
        } = resolved ;

        // A quantitative scale has no entries : the ramp and the two ends of the
        // range are the whole legend, and `values` names nothing here.
        if ( scale )
        {
            if ( !colors?.length )
            {
                return null ;
            }

            return { className , marker , orientation , position , scale : { ...scale , colors , ticks } , size , valueFormatter } ;
        }

        let resolvedValues ;

        if ( typeof showValues === 'function' )
        {
            resolvedValues = names?.map( ( name , index ) => showValues( name , index ) ) ;
        }
        else if ( showValues )
        {
            resolvedValues = values ;
        }

        const resolvedItems = items ?? getLegendItems( { colors , names , tooltips , values : resolvedValues } ) ;

        // Nothing to name — an empty legend would still print its gap.
        if ( !resolvedItems.length )
        {
            return null ;
        }

        return { className , items : resolvedItems , marker : markerOverride ?? marker , orientation , position , size , valueFormatter } ;
    } ,
    [ colors , legend , marker , names , scale , tooltips , values ] ,
) ;

export default useChartLegend ;
