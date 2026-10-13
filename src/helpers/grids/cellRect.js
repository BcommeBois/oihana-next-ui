/**
 * Where a cell of a `CellGrid` sits, in pixels : from its row and column,
 * the size of a cell and the gap between two.
 *
 * A cell may span several rows or columns ; its box then covers them, gaps
 * included.
 *
 * @module helpers/grids/cellRect
 *
 * @param {{ row : number , col : number , span ?: { rows ?: number , cols ?: number } }} cell - 0-based.
 * @param {Object} [options]
 * @param {number} [options.cellSize=44] - The side of a cell, in pixels.
 * @param {number} [options.gap=4] - Between two cells.
 *
 * @returns {{ height : number , width : number , x : number , y : number }}
 */
const cellRect = ( cell , { cellSize = 44 , gap = 4 } = {} ) =>
{
    const rows = Math.max( 1 , cell?.span?.rows ?? 1 ) ;
    const cols = Math.max( 1 , cell?.span?.cols ?? 1 ) ;
    const step = cellSize + gap ;

    return {
        height : rows * cellSize + ( rows - 1 ) * gap ,
        width  : cols * cellSize + ( cols - 1 ) * gap ,
        x      : ( cell?.col ?? 0 ) * step ,
        y      : ( cell?.row ?? 0 ) * step ,
    } ;
} ;

/**
 * The size of the whole plane, for `rows` × `cols`.
 *
 * @param {number} rows
 * @param {number} cols
 * @param {Object} [options]
 * @param {number} [options.cellSize=44]
 * @param {number} [options.gap=4]
 * @returns {{ height : number , width : number }}
 */
export const planeSize = ( rows , cols , { cellSize = 44 , gap = 4 } = {} ) => (
{
    height : Math.max( 0 , rows * cellSize + ( rows - 1 ) * gap ) ,
    width  : Math.max( 0 , cols * cellSize + ( cols - 1 ) * gap ) ,
} ) ;

export default cellRect ;
