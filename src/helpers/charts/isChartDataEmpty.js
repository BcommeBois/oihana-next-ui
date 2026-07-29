/**
 * Tells whether a chart has anything to draw.
 *
 * The charts family carries four different data shapes, and "empty" means
 * something different in each — a series chart with entries that all hold
 * empty `data` arrays has plenty of objects and nothing to plot.
 *
 * @module helpers/charts/isChartDataEmpty
 */

/**
 * Whether a value is a series-shaped entry — `{ id , data : [ … ] }`.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} `true` when the entry carries a nested `data` array.
 */
const isSeries = ( value ) => Boolean( value ) && typeof value === 'object' && Array.isArray( value.data ) ;

/**
 * Whether a chart has nothing to draw.
 *
 * Recognizes the shapes used across the family :
 * - a flat list — `[ { id , value } ]`
 * - series with nested points — `[ { id , data : [ { x , y } ] } ]`
 * - a matrix — `[ [ 0 , 1 ] , [ 1 , 0 ] ]`
 *
 * A matrix full of zeros counts as empty : a chord diagram with no flow
 * anywhere draws nothing, so showing the empty state is more honest than
 * showing a bare circle.
 *
 * @param {*} data - The chart data.
 * @returns {boolean} `true` when there is nothing to plot.
 *
 * @example
 * ```js
 * isChartDataEmpty( undefined ) ;                              // → true
 * isChartDataEmpty( [] ) ;                                     // → true
 * isChartDataEmpty( [ { id : 'a' , data : [] } ] ) ;           // → true
 * isChartDataEmpty( [ { id : 'a' , data : [ { x : 1 } ] } ] ) ;// → false
 * isChartDataEmpty( [ [ 0 , 0 ] , [ 0 , 0 ] ] ) ;              // → true
 * ```
 */
const isChartDataEmpty = ( data ) =>
{
    if ( !Array.isArray( data ) || data.length === 0 )
    {
        return true ;
    }

    // Matrix — chord.
    if ( data.every( ( row ) => Array.isArray( row ) ) )
    {
        return data.every( ( row ) => row.every( ( cell ) => !cell ) ) ;
    }

    // Series with nested points — line, radial bar, radar, heatmap, polar bar.
    if ( data.some( isSeries ) )
    {
        return data.every( ( serie ) => !isSeries( serie ) || serie.data.length === 0 ) ;
    }

    return false ;
} ;

export default isChartDataEmpty ;
