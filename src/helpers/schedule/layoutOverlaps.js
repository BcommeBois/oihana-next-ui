/**
 * Shares the width of a day column between events that overlap in time.
 *
 * This is the calculation that decides whether a week view reads as an agenda or
 * as a pile of rectangles, and it is the one most consistently underestimated :
 * two overlapping meetings are trivial, five partially nested ones are not.
 *
 * It runs in three passes.
 *
 * 1. **Collision groups.** Sorted by start, a group grows while the next item
 *    begins before the furthest end reached so far. Two items in different
 *    groups can never overlap, so each group is solved on its own.
 * 2. **Columns.** Within a group, each item takes the first column whose last
 *    occupant has already ended. The number of columns a group needs is the
 *    largest number of items in flight at any instant.
 * 3. **Expansion.** An item then grows to the right for as long as the next
 *    columns are free during its own span. Without this pass every item in a
 *    group is a narrow slice, even where it is alone on screen — the difference
 *    between correct and legible.
 *
 * Positions come back as fractions of the column, so a view multiplies them by
 * whatever width it has and never needs to measure anything.
 *
 * @module helpers/schedule/layoutOverlaps
 */

/**
 * @typedef {Object} LaidOut
 * @property {number} column  - Index of the column the item was placed in.
 * @property {number} columns - Number of columns its collision group needed.
 * @property {number} left    - Left edge, as a fraction of the width (0 → 1).
 * @property {number} width   - Width, as a fraction of the width (0 → 1).
 */

/** Two spans overlap when each begins before the other ends. Touching is not overlapping. */
const overlaps = ( a , b ) => a.start < b.end && b.start < a.end ;

/**
 * @param {Array<{start: number, end: number}>} items - Anything carrying a span ;
 *        events and day segments both qualify. The array is not modified.
 * @returns {Array<Object & LaidOut>} The same items, each with its position.
 *
 * @example
 * const placed = layoutOverlaps( segments ) ;
 * placed.forEach( item => style( { left : `${ item.left * 100 }%` , width : `${ item.width * 100 }%` } ) ) ;
 */
export const layoutOverlaps = ( items ) =>
{
    if ( !Array.isArray( items ) || items.length === 0 )
    {
        return [] ;
    }

    // Longest first among items starting together : a container placed before the
    // things it contains reads better than the reverse. The items themselves are
    // never touched — they commonly come straight from React state, and the
    // column bookkeeping lives in `placed` entries alongside them.
    const sorted = [ ...items ].sort( ( a , b ) => a.start - b.start || b.end - a.end ) ;
    const result = [] ;

    let group    = [] ;
    let groupEnd = -Infinity ;

    const flush = () =>
    {
        if ( group.length === 0 )
        {
            return ;
        }

        // Pass 2 — the first column free at this item's start.
        const columns = [] ;
        const placed  = [] ;

        for ( const item of group )
        {
            let index = columns.findIndex( column => column[ column.length - 1 ].end <= item.start ) ;

            if ( index === -1 )
            {
                index = columns.length ;
                columns.push( [] ) ;
            }

            columns[ index ].push( item ) ;
            placed.push({ item , column : index }) ;
        }

        const count = columns.length ;

        // Pass 3 — grow to the right while the next columns are free for the whole
        // span of the item.
        for ( const { item , column } of placed )
        {
            let span = 1 ;

            for ( let next = column + 1 ; next < count ; next++ )
            {
                if ( columns[ next ].some( other => overlaps( other , item ) ) )
                {
                    break ;
                }
                span += 1 ;
            }

            result.push
            ({
                ...item ,
                column ,
                columns : count ,
                left    : column / count ,
                width   : span / count ,
            }) ;
        }

        group    = [] ;
        groupEnd = -Infinity ;
    } ;

    for ( const item of sorted )
    {
        // Pass 1 — a gap since the furthest end closes the group.
        if ( item.start >= groupEnd )
        {
            flush() ;
        }

        group.push( item ) ;
        groupEnd = Math.max( groupEnd , item.end ) ;
    }

    flush() ;

    return result.sort( ( a , b ) => a.start - b.start || a.column - b.column ) ;
} ;

export default layoutOverlaps ;
