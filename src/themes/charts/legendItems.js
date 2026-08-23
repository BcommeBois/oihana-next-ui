/**
 * Legend entries for a chart.
 *
 * A legend is a list of names and the colors they were drawn in, and every
 * chart already holds both halves side by side : the series names it hands to
 * nivo, and the palette `usePalette` resolved for them, in the same order.
 * The builders here only zip the two, which is why they are plain functions
 * rather than a hook — see `useChartLegend` for the memoized wrapper.
 *
 * **Why the legend left the SVG.** nivo places its own from three fixed
 * numbers — the room reserved in the margin, the width of an item, and the
 * absence of any wrapping — none of which can know how long the text is. A
 * short name wasted a third of the plot, a long one collided with its
 * neighbour, and a narrow screen clipped the row. Drawn in HTML the placement
 * is flex rather than arithmetic, the text wraps, and the legend leaves the
 * `role="img"` that was hiding it from screen readers.
 *
 * @module themes/charts/legendItems
 */

/**
 * Reads a nivo-style accessor — a field name or a function.
 *
 * @param {Object} datum - The datum to read.
 * @param {string|Function} accessor - A key, or `( datum ) => value`.
 * @returns {*} The read value.
 */
const read = ( datum , accessor ) =>
    typeof accessor === 'function' ? accessor( datum ) : datum?.[ accessor ] ;

/**
 * Totals one accessor over a set of data, skipping what is not a number.
 *
 * **This is what a legend value means on a series chart**, where a key spans
 * every index rather than naming a single datum : the total of that key. It
 * is the right reading for a stack or a partition, and the caller states
 * something else through the `values` function when it is not.
 *
 * @param {Object[]} [data] - The rows.
 * @param {string|Function} accessor - The field, or `( datum ) => number`.
 * @returns {number|undefined} The total, or `undefined` when nothing summed.
 *
 * @example
 * ```js
 * sumBy( [ { fr : 12 } , { fr : 30 } ] , 'fr' ) ; // → 42
 * ```
 */
export const sumBy = ( data , accessor ) =>
{
    let total = 0 ;
    let found = false ;

    data?.forEach( ( datum ) =>
    {
        const value = read( datum , accessor ) ;

        if ( typeof value === 'number' && Number.isFinite( value ) )
        {
            total += value ;
            found  = true ;
        }
    } ) ;

    return found ? total : undefined ;
} ;

/**
 * The lowest and highest finite number in a set.
 *
 * **What a quantitative chart's scale needs, and what nivo does not hand
 * back.** These charts let nivo work the domain out from the data unless
 * `minValue` / `maxValue` say otherwise, and it keeps the result to itself —
 * so a legend drawn outside the SVG has to read the data again.
 *
 * @param {Array<number>} [values] - The values, holes and non-numbers included.
 * @returns {{ min : number , max : number }|undefined} The bounds, or `undefined` when nothing is numeric.
 *
 * @example
 * ```js
 * getValueBounds( [ 3 , null , 12 , 'x' ] ) ; // → { min : 3 , max : 12 }
 * ```
 */
export const getValueBounds = ( values ) =>
{
    let min ;
    let max ;

    values?.forEach( ( value ) =>
    {
        if ( typeof value !== 'number' || !Number.isFinite( value ) )
        {
            return ;
        }

        if ( min === undefined || value < min )
        {
            min = value ;
        }

        if ( max === undefined || value > max )
        {
            max = value ;
        }
    } ) ;

    return min === undefined ? undefined : { min , max } ;
} ;

/**
 * Builds the `MetricLegend` entries of a chart.
 *
 * Colors are read positionally : `usePalette` returns them in the order the
 * names were counted, which is the same order nivo assigns them, so index `i`
 * of one belongs with index `i` of the other.
 *
 * @param {Object} [props]
 * @param {string[]} [props.colors] - The resolved palette, in series order.
 * @param {Array<string|number>} [props.names] - The series names, in the same order.
 * @param {string[]} [props.tooltips] - Optional per-entry tooltips.
 * @param {Array<number|string>} [props.values] - Optional per-entry values.
 *
 * @returns {Array<{ color : string , key : string , name : string , tooltip : string , value : number|string }>} The entries.
 *
 * @example
 * ```js
 * getLegendItems( { names : [ 'fr' , 'us' ] , colors : [ '#e8c1a0' , '#f47560' ] } ) ;
 * ```
 */
export const getLegendItems = ( { colors , names , tooltips , values } = {} ) =>
{
    if ( !names?.length )
    {
        return [] ;
    }

    return names.map( ( name , index ) =>
    {
        const item =
        {
            color : colors?.[ index ] ,
            key   : String( name ) ,
            name  ,
        } ;

        // `MetricLegend` reads a missing value as "name alone" and zero as a
        // value like any other, so the key is left off rather than set null.
        const value = values?.[ index ] ;

        if ( value !== undefined && value !== null )
        {
            item.value = value ;
        }

        const tooltip = tooltips?.[ index ] ;

        if ( tooltip )
        {
            item.tooltip = tooltip ;
        }

        return item ;
    } ) ;
} ;

export default getLegendItems ;
