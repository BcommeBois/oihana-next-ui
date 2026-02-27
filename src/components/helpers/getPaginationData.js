import ceil from 'vegas-js-core/src/maths/ceil' ;

/**
 * Calculate pagination data from offset/limit/total.
 *
 * @param {Object} params
 * @param {number} params.offset - Current offset (0-based)
 * @param {number} params.limit - Items per page
 * @param {number} params.total - Total number of items
 * @param {number} [params.pageOffset=2] - Number of pages to show before/after current
 *
 * @returns {Object} Pagination data
 *
 * @example
 * ```js
 * getPaginationData({ offset: 24, limit: 12, total: 100, pageOffset: 2 })
 * // {
 * //   currentPage: 3,
 * //   pageCount: 9,
 * //   minPage: 1,
 * //   maxPage: 5,
 * //   hasNext: true,
 * //   hasPrev: true,
 * //   nextOffset: 36,
 * //   prevOffset: 12,
 * //   firstOffset: 0,
 * //   lastOffset: 96
 * // }
 * ```
 */
const getPaginationData = ({ offset , limit , total , pageOffset = 2 }) =>
{
    if ( limit <= 0 || total <= 0 )
    {
        return {
            currentPage  : 1 ,
            pageCount    : 0 ,
            minPage      : 1 ,
            maxPage      : 1 ,
            hasNext      : false ,
            hasPrev      : false ,
            nextOffset   : 0 ,
            prevOffset   : 0 ,
            firstOffset  : 0 ,
            lastOffset   : 0 ,
        } ;
    }

    // Calculate total pages
    const pageCount = ceil( total / limit ) ;

    // Calculate current page (1-based)
    const currentPage = pageCount - ceil( ( total - offset ) / limit ) + 1 ;

    // Calculate page range to display
    let minPage = currentPage - pageOffset ;
    let maxPage = currentPage + pageOffset ;

    if ( minPage < 1 )
    {
        minPage = 1 ;
    }

    if ( maxPage > pageCount )
    {
        maxPage = pageCount ;
    }

    // Calculate navigation offsets
    const nextOffset  = Math.min( offset + limit , total ) ;
    const prevOffset  = Math.max( offset - limit , 0 ) ;
    const firstOffset = 0 ;
    const lastOffset  = ( pageCount - 1 ) * limit ;

    return {
        currentPage ,
        pageCount ,
        minPage ,
        maxPage ,
        hasNext : currentPage < pageCount ,
        hasPrev : currentPage > 1 ,
        nextOffset ,
        prevOffset ,
        firstOffset ,
        lastOffset ,
    } ;
} ;

export default getPaginationData ;