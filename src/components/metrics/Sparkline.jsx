'use client' ;

import { useId } from 'react' ;

import {
    DEFAULT_COLOR ,
    TREND_COLORS ,
    VIEW_HEIGHT ,
    VIEW_WIDTH ,
    getSparkline ,
} from '../../themes/components/sparkline' ;

/**
 * Reads a data entry, which may be a bare number or an object carrying one.
 *
 * Anything that is not a finite number — `null`, `undefined`, `NaN` — becomes a gap. A
 * missing measurement is not a zero, and drawing it as one is the most common way a
 * sparkline ends up lying.
 *
 * @param {number | Object} entry - The raw entry.
 * @returns {number | null} The value, or `null` for a gap.
 */
const getValue = ( entry ) =>
{
    const value = typeof entry === 'number' ? entry : entry?.value ;
    return Number.isFinite( value ) ? value : null ;
} ;

/**
 * Splits the points into the runs that can be drawn as one stroke.
 *
 * @param {Array<number|null>} points - The values, gaps included.
 * @param {boolean} connectNulls - Whether to draw across the gaps.
 * @returns {Array<Array<{ index : number , value : number }>>} The runs, in order.
 */
const getSegments = ( points , connectNulls ) =>
{
    const defined = points
        .map( ( value , index ) => ( { index , value } ) )
        .filter( point => point.value !== null ) ;

    if ( connectNulls )
    {
        return defined.length > 0 ? [ defined ] : [] ;
    }

    const segments = [] ;

    let current = [] ;

    points.forEach( ( value , index ) =>
    {
        if ( value === null )
        {
            if ( current.length > 0 )
            {
                segments.push( current ) ;
                current = [] ;
            }
            return ;
        }

        current.push( { index , value } ) ;
    } ) ;

    if ( current.length > 0 )
    {
        segments.push( current ) ;
    }

    return segments ;
} ;

/**
 * A dot, drawn as a zero-length stroke with a round cap.
 *
 * A `<circle>` would be wrong here : the viewBox is stretched to the rendered width, so a
 * circle comes out an ellipse. A zero-length path is immune, because
 * `non-scaling-stroke` keeps its cap perfectly round whatever the stretch.
 *
 * @param {number} x - Horizontal position, in viewBox units.
 * @param {number} y - Vertical position, in viewBox units.
 * @returns {string} The path data.
 */
const getDot = ( x , y ) => `M ${ x } ${ y } L ${ x } ${ y }` ;

/**
 * Shortest a bar may be drawn while still standing for a value, in viewBox units.
 * @type {number}
 */
const MIN_BAR_HEIGHT = 2 ;

/**
 * An inline chart glyph — the shape of a series, small enough to sit next to a number.
 *
 * **Not a chart.** No axes, no legend, no tooltip, no interaction : it answers "which way
 * is this going" at a glance, and nothing else. When the reader needs to know *when* or
 * *how much*, that is `LineChart` or `BarChart` in the `charts` group.
 *
 * **Nothing is measured.** The geometry is drawn in a fixed viewBox that CSS stretches to
 * the available width, so the markup renders identically on the server and on the client,
 * and a table can hold fifty of these without fifty resize observers. The line keeps its
 * thickness through `non-scaling-stroke`.
 *
 * **The domain is the data**, not zero. A sparkline exists to show a shape, and anchoring
 * the scale at zero flattens the very variation it was drawn for. `min` and `max` impose
 * a domain when several sparklines have to be read against each other.
 *
 * **Decorative by default.** Sitting beside a title and a number that are already read
 * aloud, it adds nothing a screen reader can use, so it is `aria-hidden`. Pass `ariaLabel`
 * to make it a described image instead.
 *
 * @module components/metrics/Sparkline
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative. Given one, the glyph becomes a described `role="img"` instead of being hidden.
 * @param {number} [props.barGap=0.25] - Share of a bar's slot left empty, between 0 and 1. `variant="bar"` only.
 * @param {string} [props.className] - Additional classes.
 * @param {string} [props.color='primary'] - A DaisyUI colour token, or any CSS colour.
 * @param {boolean} [props.colorByTrend=false] - Colour from the direction of travel — success rising, error falling. Overrides `color`.
 * @param {boolean} [props.connectNulls=false] - Draw across the gaps instead of breaking the line.
 * @param {Array<number|{ value : number }>} [props.data] - The series. A non-finite entry is a gap.
 * @param {import('../../themes/components/sparkline').SparklineFill} [props.fill='gradient'] - How the area under the curve is filled. `variant="area"` only.
 * @param {number} [props.max] - Top of the domain. Defaults to the largest value.
 * @param {number} [props.min] - Bottom of the domain. Defaults to the smallest value.
 * @param {React.Ref} [props.ref] - Forwarded to the `svg`.
 * @param {boolean} [props.showLast=false] - Mark the last point with a dot. `variant="line"` and `"area"` only.
 * @param {import('../../themes/components/sparkline').SparklineSize|Object} [props.size='md'] - Height, scalar or per breakpoint.
 * @param {number} [props.strokeWidth=2] - Line thickness, in pixels whatever the stretch.
 * @param {import('../../themes/components/sparkline').SparklineVariant} [props.variant='line'] - `'line'`, `'area'` or `'bar'`.
 *
 * @example Beside a number
 * ```jsx
 * <Stat
 *     title  = "Visiteurs"
 *     value  = "12 480"
 *     figure = { <Sparkline data={ last30Days } className="w-24" /> }
 * />
 * ```
 *
 * @example Filled, with the last point marked
 * ```jsx
 * <Sparkline data={ series } variant="area" showLast size="lg" />
 * ```
 *
 * @example Coloured by direction of travel
 * ```jsx
 * <Sparkline data={ series } colorByTrend showLast />
 * ```
 */
const Sparkline =
({
    ariaLabel ,
    barGap = 0.25 ,
    className ,
    color = DEFAULT_COLOR ,
    colorByTrend = false ,
    connectNulls = false ,
    data = [] ,
    fill = 'gradient' ,
    max ,
    min ,
    ref ,
    showLast = false ,
    size ,
    strokeWidth = 2 ,
    variant = 'line' ,
    ...rest
}) =>
{
    const gradientId = useId() ;

    const points = data.map( getValue ) ;
    const values = points.filter( value => value !== null ) ;

    const first = values[ 0 ] ;
    const last  = values[ values.length - 1 ] ;

    // Where that last value sits in the series, gaps included — a series ending on a gap
    // still marks its last measurement, not the empty slot after it.
    const lastIndex = points.reduce( ( found , value , index ) => value !== null ? index : found , 0 ) ;

    const trend = values.length < 2 || first === last
        ? 'flat'
        : last > first ? 'up' : 'down' ;

    const { className : svgClassName , style } = getSparkline({
        className ,
        color : colorByTrend ? TREND_COLORS[ trend ] : color ,
        size ,
    }) ;

    const lo = min ?? ( values.length > 0 ? Math.min( ...values ) : 0 ) ;
    const hi = max ?? ( values.length > 0 ? Math.max( ...values ) : 0 ) ;

    const span = hi - lo ;

    // A flat series has no ratio to take — every point sits on the mid line, which reads
    // as "constant" rather than as the blank a division by zero would leave.
    //
    // Values are pinned inside the domain first. It costs nothing when the domain is the
    // data, since everything is already inside it ; it is what keeps an imposed `min` or
    // `max` from projecting a point outside the box, where `overflow-visible` would
    // happily draw it over whatever sits next to the glyph. Pinned, the curve flattens
    // against the edge, which is how "off the scale" should read.
    const scaleY = ( value ) =>
    {
        if ( span <= 0 ) return VIEW_HEIGHT / 2 ;

        const pinned = Math.min( Math.max( value , lo ) , hi ) ;

        return VIEW_HEIGHT - ( ( pinned - lo ) / span ) * VIEW_HEIGHT ;
    } ;

    const scaleX = ( index ) => points.length > 1
        ? ( index / ( points.length - 1 ) ) * VIEW_WIDTH
        : VIEW_WIDTH / 2 ;

    // Bars and areas grow from zero when the domain crosses it, and from the floor of the
    // domain otherwise — a bar chart of temperatures should not pretend 0 °C is the bottom.
    //
    // A flat series is the exception : its floor sits on the line itself, which would
    // leave an area of no height at all. It falls back to the bottom of the box, which is
    // what the bars already do.
    const baseline = lo <= 0 && hi >= 0 ? 0 : lo ;
    const baseY    = span > 0 ? scaleY( baseline ) : VIEW_HEIGHT ;

    /**
     * Places one bar against the baseline.
     *
     * A value that differs from the baseline at all keeps a visible sliver, the rule
     * `BarList` already runs on : without it the smallest entry of a long-tailed series
     * rounds to nothing and reads as missing data. A value *on* the baseline — including
     * one pinned there by an imposed `min` — keeps no height, because that is what it is.
     *
     * @param {number} value - The raw value.
     * @returns {{ height : number , y : number }} The bar geometry, in viewBox units.
     */
    const getBar = ( value ) =>
    {
        // Flat series : half-height bars, so the strip still reads as data rather than as
        // an empty box.
        if ( span <= 0 )
        {
            return { height : VIEW_HEIGHT / 2 , y : VIEW_HEIGHT / 2 } ;
        }

        const top    = scaleY( value ) ;
        const raw    = Math.abs( top - baseY ) ;
        const height = raw > 0 ? Math.max( raw , MIN_BAR_HEIGHT ) : 0 ;

        return { height , y : top <= baseY ? baseY - height : baseY } ;
    } ;

    let marks ;

    if ( values.length === 0 )
    {
        marks = (
            <path
                d              = { `M 0 ${ VIEW_HEIGHT / 2 } L ${ VIEW_WIDTH } ${ VIEW_HEIGHT / 2 }` }
                className      = "opacity-20"
                fill           = "none"
                stroke         = "currentColor"
                strokeWidth    = { strokeWidth }
                vectorEffect   = "non-scaling-stroke"
            />
        ) ;
    }
    else if ( variant === 'bar' )
    {
        const slot  = VIEW_WIDTH / points.length ;
        const width = slot * ( 1 - Math.min( Math.max( barGap , 0 ) , 0.9 ) ) ;

        const bars = points
            .map( ( value , index ) => value === null ? null : {
                ...getBar( value ) ,
                key : `bar-${ index }` ,
                x   : index * slot + ( slot - width ) / 2 ,
            } )
            .filter( Boolean ) ;

        marks = bars.map( bar => (
            <rect
                fill   = "currentColor"
                height = { bar.height }
                key    = { bar.key }
                width  = { width }
                x      = { bar.x }
                y      = { bar.y }
            />
        ) ) ;
    }
    else
    {
        const segments = getSegments( points , connectNulls ) ;

        const stroke = segments
            .map( segment => segment.length === 1
                ? getDot( scaleX( segment[ 0 ].index ) , scaleY( segment[ 0 ].value ) )
                : segment.map( ( point , position ) =>
                    `${ position === 0 ? 'M' : 'L' } ${ scaleX( point.index ) } ${ scaleY( point.value ) }` ,
                ).join( ' ' ) ,
            )
            .join( ' ' ) ;

        const area = variant === 'area' && fill !== 'none'
            ? segments
                .filter( segment => segment.length > 1 )
                .map( segment =>
                {
                    const start = scaleX( segment[ 0 ].index ) ;
                    const end   = scaleX( segment[ segment.length - 1 ].index ) ;

                    const path = segment.map( ( point , position ) =>
                        `${ position === 0 ? 'M' : 'L' } ${ scaleX( point.index ) } ${ scaleY( point.value ) }` ,
                    ).join( ' ' ) ;

                    return `${ path } L ${ end } ${ baseY } L ${ start } ${ baseY } Z` ;
                } )
                .join( ' ' )
            : null ;

        marks = (
            <>
                { fill === 'gradient' ? (
                    <defs>
                        <linearGradient id={ gradientId } x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                ) : null }

                { area ? (
                    <path
                        d       = { area }
                        fill    = { fill === 'gradient' ? `url(#${ gradientId })` : 'currentColor' }
                        opacity = { fill === 'solid' ? 0.2 : undefined }
                        stroke  = "none"
                    />
                ) : null }

                <path
                    d              = { stroke }
                    fill           = "none"
                    stroke         = "currentColor"
                    strokeLinecap  = "round"
                    strokeLinejoin = "round"
                    strokeWidth    = { strokeWidth }
                    vectorEffect   = "non-scaling-stroke"
                />

                { showLast ? (
                    <path
                        d             = { getDot( scaleX( lastIndex ) , scaleY( last ) ) }
                        fill          = "none"
                        stroke        = "currentColor"
                        strokeLinecap = "round"
                        strokeWidth   = { strokeWidth * 2.5 }
                        vectorEffect  = "non-scaling-stroke"
                    />
                ) : null }
            </>
        ) ;
    }

    const viewBox = `0 0 ${ VIEW_WIDTH } ${ VIEW_HEIGHT }` ;

    // Two branches rather than a computed role : written as literals, the role can still
    // be checked against the ARIA attributes by static analysis.
    if ( ariaLabel )
    {
        return (
            <svg
                aria-label          = { ariaLabel }
                className           = { svgClassName }
                preserveAspectRatio = "none"
                ref                 = { ref }
                role                = "img"
                style               = { style }
                viewBox             = { viewBox }
                { ...rest }
            >
                { marks }
            </svg>
        ) ;
    }

    return (
        <svg
            aria-hidden         = "true"
            className           = { svgClassName }
            preserveAspectRatio = "none"
            ref                 = { ref }
            style               = { style }
            viewBox             = { viewBox }
            { ...rest }
        >
            { marks }
        </svg>
    ) ;
} ;

Sparkline.displayName = 'Sparkline' ;

export default Sparkline ;
