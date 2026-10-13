/**
 * Which cell the keyboard goes to : from the focused one, an arrow moves
 * across the plane in its direction until it meets a cell, skipping the
 * gaps — a corridor, a missing seat ; Home and End go to the first and
 * last cell of the row.
 *
 * A cell spanning several positions is met at any of them, and counted
 * once ; the move starts from the cell's own anchor.
 *
 * @module helpers/grids/nextCell
 *
 * @param {Object} from - The focused cell : `{ id , row , col , span }`.
 * @param {string} key - `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`.
 * @param {Object} grid
 * @param {Array<{ id : string , row : number , col : number , span ?: Object , disabled ?: boolean }>} grid.cells
 * @param {number} grid.cols
 * @param {number} grid.rows
 *
 * @returns {?Object} The cell reached, or `null` when the edge is met.
 */

/** A lookup of every position a cell covers. */
export const occupancy = cells =>
{
    const map = new Map() ;

    for ( const cell of cells ?? [] )
    {
        const rows = Math.max( 1 , cell.span?.rows ?? 1 ) ;
        const cols = Math.max( 1 , cell.span?.cols ?? 1 ) ;

        for ( let r = 0 ; r < rows ; r++ )
        {
            for ( let c = 0 ; c < cols ; c++ )
            {
                map.set( `${ cell.row + r }:${ cell.col + c }` , cell ) ;
            }
        }
    }

    return map ;
} ;

const STEPS = { ArrowDown : [ 1 , 0 ] , ArrowLeft : [ 0 , -1 ] , ArrowRight : [ 0 , 1 ] , ArrowUp : [ -1 , 0 ] } ;

const nextCell = ( from , key , { cells , cols , rows } ) =>
{
    if ( !from )
    {
        return null ;
    }

    const at = occupancy( cells ) ;

    if ( key === 'Home' || key === 'End' )
    {
        const inRow = ( cells ?? [] ).filter( cell => cell.row === from.row && !cell.disabled ).sort( ( a , b ) => a.col - b.col ) ;
        const cell  = key === 'Home' ? inRow[ 0 ] : inRow[ inRow.length - 1 ] ;
        return cell && cell.id !== from.id ? cell : null ;
    }

    const step = STEPS[ key ] ;

    if ( !step )
    {
        return null ;
    }

    const spanRows = Math.max( 1 , from.span?.rows ?? 1 ) ;
    const spanCols = Math.max( 1 , from.span?.cols ?? 1 ) ;

    // Leave the cell's own footprint first, then walk until a cell is met.
    let row = from.row + ( step[ 0 ] > 0 ? spanRows : step[ 0 ] < 0 ? -1 : 0 ) ;
    let col = from.col + ( step[ 1 ] > 0 ? spanCols : step[ 1 ] < 0 ? -1 : 0 ) ;

    while ( row >= 0 && row < rows && col >= 0 && col < cols )
    {
        const cell = at.get( `${ row }:${ col }` ) ;

        if ( cell && cell.id !== from.id && !cell.disabled )
        {
            return cell ;
        }

        row += step[ 0 ] ;
        col += step[ 1 ] ;
    }

    return null ;
} ;

export default nextCell ;
