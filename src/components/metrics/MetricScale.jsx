'use client' ;

import {
    getMetricScaleBand ,
    getMetricScaleBarClasses ,
    getMetricScaleBoundsClasses ,
    getMetricScaleClasses ,
    getMetricScaleTick ,
    getMetricScaleTicksClasses ,
} from '../../themes/components/metricScale' ;

/**
 * The key of a band — its colour and its rank.
 *
 * A ramp is ordered and never reordered, so the rank is the identity ; the
 * colour is in there because a caller's explicit ramp may repeat one, and two
 * bands keyed alike would warn.
 *
 * @param {string} color - The band's colour.
 * @param {number} index - Its position in the ramp.
 * @returns {string} The React key.
 */
const keyOf = ( color , index ) => `${ color }-${ index }` ;

/**
 * The boundaries between the buckets, lowest first — one more than there are
 * bands.
 *
 * 🚨 **Thinning takes one boundary in `k`, never an interpolation.** Printing
 * evenly spaced round figures under a quantized scale would say the colour
 * changes where it does not : every number shown here is a real edge, and the
 * last interval is allowed to be shorter than the others rather than have the
 * last figure be a lie.
 *
 * @param {number} min - Bottom of the range.
 * @param {number} max - Top of the range.
 * @param {number} bands - How many buckets the ramp has.
 * @param {boolean|number} ticks - `true` for every boundary, a number for at most that many.
 * @returns {Array<{ index : number , value : number }>} The boundaries to print, each with its rank — which is what places it, since thinning makes the last interval shorter than the others.
 */
const boundariesOf = ( min , max , bands , ticks ) =>
{
    const step = typeof ticks === 'number' && ticks >= 2
        ? Math.max( 1 , Math.ceil( bands / ( ticks - 1 ) ) )
        : 1 ;

    const indexes = [] ;

    for ( let index = 0 ; index < bands ; index += step )
    {
        indexes.push( index ) ;
    }

    indexes.push( bands ) ;

    return indexes.map( ( index ) =>
    {
        const raw = min + ( ( index * ( max - min ) ) / bands ) ;

        // Floating point turns a clean 60 into 60.000000000000004 ; twelve
        // significant digits drop the noise without touching the value.
        return { index , value : Number.isFinite( raw ) ? Number( raw.toPrecision( 12 ) ) : raw } ;
    } ) ;
} ;

/**
 * The colour scale of a quantitative chart : a band per bucket, and the two
 * ends of the range written under them. What sits below a heat map, a
 * calendar or a time range — where `MetricLegend` sits below a partition.
 *
 * **The bands are discrete because the scale is.** These charts hand nivo a
 * `type : 'quantize'` and an array of colours, so a cell's colour is one
 * bucket among N rather than a point on a ramp. A smooth gradient would be
 * prettier and would misstate how the colours are handed out.
 *
 * **Only the two ends are written, unless `ticks` asks for more.** Five buckets
 * have six boundaries, and printing them all turns a 224 px bar into a line of
 * unreadable figures — fine for `240`, not for `1 250 €`. The ends give the bar
 * its direction, which is what a reader usually needs ; `ticks` is there for
 * when they need to read a value off it.
 *
 * **Colours are theme tokens** (`'primary'`, `'success'`…) or any CSS colour,
 * the latter landing as an inline style — which is how a scale gets aligned
 * with the ramp of the chart above it.
 *
 * @module components/metrics/MetricScale
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative. Without one the two figures are read on their own, which says little ; with one the scale becomes a single labelled image.
 * @param {string} [props.className] - Additional classes on the root.
 * @param {string[]} [props.colors] - The ramp, lowest bucket first. An empty ramp renders nothing.
 * @param {number|string} [props.max] - Top of the range.
 * @param {number|string} [props.min] - Bottom of the range.
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout direction. Standing up, the low end is at the bottom.
 * @param {React.Ref} [props.ref] - Forwarded to the root.
 * @param {import('../../themes/components/metricLegend').MetricLegendSize|Object} [props.size] - Text size, scalar or per breakpoint. Defaults to `xs`, `sm` from the `sm` breakpoint up.
 * @param {boolean|number} [props.ticks=false] - Print the bucket boundaries instead of the two ends alone. `true` prints them all, a number prints at most that many — thinned one boundary in `k`, never interpolated. Needs `min` and `max`.
 * @param {Function} [props.valueFormatter] - Formats the two figures : `( value ) => string`.
 *
 * @example
 * ```jsx
 * <MetricScale colors={ [ '#61CDBB' , '#97E3D5' , '#E8C1A0' , '#F47560' ] } min={ 0 } max={ 240 } />
 * ```
 */
const MetricScale =
({
    ariaLabel ,
    className ,
    colors = [] ,
    max ,
    min ,
    orientation ,
    ref ,
    size ,
    ticks = false ,
    valueFormatter = value => String( value ) ,
    ...rest
}) =>
{
    if ( !colors.length )
    {
        return null ;
    }

    // `null` and `undefined` mean "unknown" ; zero is a bound like any other.
    const hasBounds = min !== undefined && min !== null && max !== undefined && max !== null ;

    // Boundaries are worked out from the range, so there is nothing to print
    // without one — `ticks` on an unbounded scale falls back to no figures.
    const boundaries = ticks && hasBounds ? boundariesOf( min , max , colors.length , ticks ) : null ;

    const content = (
        <>
            <div aria-hidden="true" className={ getMetricScaleBarClasses( { orientation } ) }>
                { colors.map( ( color , index ) =>
                {
                    const band = getMetricScaleBand( { color } ) ;

                    return <span className={ band.className } key={ keyOf( color , index ) } style={ band.style } /> ;
                } ) }
            </div>

            { boundaries ? (
                <div className={ getMetricScaleTicksClasses( { orientation } ) }>
                    { boundaries.map( ( { index , value } ) =>
                    {
                        const tick = getMetricScaleTick( { index , orientation , total : colors.length } ) ;

                        return (
                            <span className={ tick.className } key={ index } style={ tick.style }>
                                { valueFormatter( value ) }
                            </span>
                        ) ;
                    } ) }
                </div>
            ) : hasBounds ? (
                <div className={ getMetricScaleBoundsClasses( { orientation } ) }>
                    <span>{ valueFormatter( min ) }</span>
                    <span>{ valueFormatter( max ) }</span>
                </div>
            ) : null }
        </>
    ) ;

    const rootClassName = getMetricScaleClasses( { className , orientation , size } ) ;

    // Two branches rather than a computed `role`, the way `ChartFrame` writes it :
    // a conditional role blinds the ARIA lint rule to the label beside it.
    if ( !ariaLabel )
    {
        return (
            <div className={ rootClassName } ref={ ref } { ...rest }>
                { content }
            </div>
        ) ;
    }

    return (
        <div aria-label={ ariaLabel } className={ rootClassName } ref={ ref } role="img" { ...rest }>
            { content }
        </div>
    ) ;
} ;

MetricScale.displayName = 'MetricScale' ;

export default MetricScale ;
