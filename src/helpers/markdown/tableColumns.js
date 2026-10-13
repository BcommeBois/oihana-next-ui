/**
 * The widths of a table's columns, from what they hold : a column of
 * quantities stays narrow, a column of descriptions takes the room.
 *
 * Each column weighs the length of its longest cell, held between `min` and
 * `max` characters so an empty column still shows and a paragraph does not
 * swallow the row ; the weights are returned as shares of 1.
 *
 * @module helpers/markdown/tableColumns
 *
 * @param {string[][]} rows - The cells' text, rows first, the header included.
 * @param {Object} [options]
 * @param {number} [options.max=40] - Characters past which a cell weighs no more.
 * @param {number} [options.min=3] - The weight of an empty column.
 *
 * @returns {number[]} One share per column, summing to 1 ; empty for no rows.
 *
 * @example
 * ```js
 * tableColumns( [ [ 'Description' , 'Qty' ] , [ 'A long description of the item' , '2' ] ] ) ;
 * // → [ 0.91 , 0.09 ] (about)
 * ```
 */
const tableColumns = ( rows , { max = 40 , min = 3 } = {} ) =>
{
    const count = Math.max( 0 , ...rows.map( row => row.length ) ) ;

    if ( count === 0 )
    {
        return [] ;
    }

    const weights = Array.from( { length : count } , ( _ , column ) =>
    {
        const longest = Math.max( 0 , ...rows.map( row => String( row[ column ] ?? '' ).length ) ) ;
        return Math.min( max , Math.max( min , longest ) ) ;
    } ) ;

    const total = weights.reduce( ( sum , weight ) => sum + weight , 0 ) ;

    return weights.map( weight => weight / total ) ;
} ;

export default tableColumns ;
