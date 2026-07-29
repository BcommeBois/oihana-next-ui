/**
 * Guards the marimekko accessors.
 *
 * @module helpers/charts/isMarimekkoDataValid
 */

/**
 * Whether a marimekko chart has everything it needs to draw.
 *
 * This chart reads its data through **three separate accessors** — `id`,
 * `value` and `dimensions` — and nivo dereferences them without checking
 * they were provided, so a missing one throws mid-render instead of drawing
 * nothing. Checking up front turns that into the empty state.
 *
 * @param {*} data - The raw bars.
 * @param {*} id - Accessor naming each bar.
 * @param {*} value - Accessor driving each bar's thickness.
 * @param {*} dimensions - The stacked slices.
 * @returns {boolean} `true` when all three accessors and some data are present.
 *
 * @example
 * ```js
 * isMarimekkoDataValid( data , 'statement' , 'participants' , dimensions ) ; // → true
 * isMarimekkoDataValid( data , 'statement' , undefined , dimensions ) ;      // → false
 * ```
 */
const isMarimekkoDataValid = ( data , id , value , dimensions ) =>
{
    if ( !Array.isArray( data ) || data.length === 0 )
    {
        return false ;
    }

    if ( id === undefined || id === null || value === undefined || value === null )
    {
        return false ;
    }

    return Array.isArray( dimensions ) && dimensions.length > 0 ;
} ;

export default isMarimekkoDataValid ;
