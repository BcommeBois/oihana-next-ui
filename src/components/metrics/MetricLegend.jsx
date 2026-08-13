'use client' ;

import {
    METRIC_LEGEND_NAME ,
    METRIC_LEGEND_VALUE ,
    getMetricLegendClasses ,
    getMetricLegendItemClasses ,
    getMetricLegendMarker ,
} from '../../themes/components/metricLegend' ;

import Tooltip from '../Tooltip' ;

/**
 * The key of an entry — its own, its name, or its rank.
 *
 * @param {Object} item - The entry.
 * @param {number} index - Its position.
 * @returns {string} The React key.
 */
const keyOf = ( item , index ) => item.key ?? item.name ?? `entry-${ index }` ;

/**
 * The colour legend of a metric : a coloured mark, a name, and — when there is one — a
 * value. What sits under a `CategoryBar`, next to a `Tracker`, or below a row of
 * sparklines.
 *
 * **The value is optional, and that is the whole difference between two legends.** A
 * partition names its shares and states their size ; a set of series only names its
 * colours. An entry with no `value` renders its name alone rather than an invented zero.
 *
 * **Colours are theme tokens** (`'primary'`, `'success'`…), so the legend follows the
 * DaisyUI theme and needs no dark-mode variant. Any other CSS colour lands as an inline
 * style, which is how a legend gets aligned with the palette of a chart next to it.
 *
 * @module components/metrics/MetricLegend
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the list.
 * @param {string} [props.itemClassName] - Additional classes on every entry.
 * @param {Array<{ color : string , key : string , name : React.ReactNode , tooltip : string , value : number|string }>} [props.items] - The entries.
 * @param {import('../../themes/components/metricLegend').MetricLegendMarker} [props.marker='dot'] - Mark shape : `'dot'`, `'line'` or `'square'`.
 * @param {import('../../themes/components/metricLegend').MetricLegendOrientation|Object} [props.orientation='horizontal'] - Layout direction, scalar or per breakpoint.
 * @param {React.Ref} [props.ref] - Forwarded to the list.
 * @param {import('../../themes/components/metricLegend').MetricLegendSize|Object} [props.size] - Text size, scalar or per breakpoint. Defaults to `xs`, `sm` from the `sm` breakpoint up.
 * @param {Function} [props.valueFormatter] - Formats the values : `( value ) => string`.
 *
 * @example Under a partition
 * ```jsx
 * <MetricLegend
 *     items={[
 *         { name : 'Documents' , value : 42 , color : 'primary' } ,
 *         { name : 'Photos'    , value : 18 , color : 'secondary' } ,
 *     ]}
 *     valueFormatter={ value => `${ value } Go` }
 * />
 * ```
 *
 * @example For a set of sparklines, stacked on mobile
 * ```jsx
 * <MetricLegend
 *     items       = {[ { name : 'Visites' , color : 'primary' } , { name : 'Ventes' , color : 'accent' } ]}
 *     marker      = "line"
 *     orientation = {{ xs : 'vertical' , sm : 'horizontal' }}
 * />
 * ```
 */
const MetricLegend =
({
    className ,
    itemClassName ,
    items = [] ,
    marker ,
    orientation ,
    ref ,
    size ,
    valueFormatter = value => String( value ) ,
    ...rest
}) =>
{
    if ( items.length === 0 )
    {
        return null ;
    }

    const entryClassName = getMetricLegendItemClasses({ className : itemClassName }) ;

    return (
        <ul className={ getMetricLegendClasses({ className , orientation , size }) } ref={ ref } { ...rest }>

            { items.map( ( item , index ) =>
            {
                const { className : markClassName , style } = getMetricLegendMarker({ color : item.color , marker }) ;

                // `null` and `undefined` mean "no value" ; zero is a value like any other.
                const hasValue = item.value !== undefined && item.value !== null ;

                const content = (
                    <>
                        <span aria-hidden="true" className={ markClassName } style={ style } />
                        <span className={ METRIC_LEGEND_NAME }>{ item.name }</span>
                        { hasValue ? <span className={ METRIC_LEGEND_VALUE }>{ valueFormatter( item.value ) }</span> : null }
                    </>
                ) ;

                return item.tooltip ? (
                    <Tooltip as="li" className={ entryClassName } key={ keyOf( item , index ) } tip={ item.tooltip }>
                        { content }
                    </Tooltip>
                ) : (
                    <li className={ entryClassName } key={ keyOf( item , index ) }>
                        { content }
                    </li>
                ) ;
            } ) }

        </ul>
    ) ;
} ;

MetricLegend.displayName = 'MetricLegend' ;

export default MetricLegend ;
