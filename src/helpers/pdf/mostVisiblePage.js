/**
 * Which page a reader is on : the one showing the most of itself in the
 * frame — not the first one touching it, which would name the previous page
 * while its last line is still in sight.
 *
 * @module helpers/pdf/mostVisiblePage
 *
 * @param {Array<{ top : number , height : number }>} pages - Each page's offset and height inside the scrolled content.
 * @param {number} scrollTop - How far the content is scrolled.
 * @param {number} viewportHeight - The height of the frame.
 * @returns {number} The index of the page (0-based), `0` when there is none.
 *
 * @example
 * ```js
 * mostVisiblePage( [ { top : 0 , height : 800 } , { top : 816 , height : 800 } ] , 500 , 600 ) ; // 1
 * ```
 */
const mostVisiblePage = ( pages , scrollTop , viewportHeight ) =>
{
    let best    = 0 ;
    let overlap = -1 ;

    const bottom = scrollTop + viewportHeight ;

    pages.forEach( ( { top , height } , index ) =>
    {
        const visible = Math.min( top + height , bottom ) - Math.max( top , scrollTop ) ;

        if ( visible > overlap )
        {
            overlap = visible ;
            best    = index ;
        }
    } ) ;

    return best ;
} ;

export default mostVisiblePage ;
