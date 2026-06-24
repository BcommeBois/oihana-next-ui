'use client' ;

import { useCallback , useEffect , useState } from 'react' ;

import InfiniteScroll from '@/components/layouts/InfiniteScroll' ;
import List           from '@/components/lists/List' ;
import ListRow        from '@/components/lists/ListRow' ;

/**
 * Number of items appended on each load.
 * @type {number}
 */
const PAGE_SIZE = 15 ;

/**
 * Total number of items available in the simulated dataset.
 * @type {number}
 */
const TOTAL_ITEMS = 75 ;

/**
 * Simulated network latency, in milliseconds.
 * @type {number}
 */
const LATENCY = 700 ;

/**
 * Simulates a paginated API call returning a slice of items.
 *
 * @param {number} page - Zero-based page index to fetch.
 * @returns {Promise<{ items: Array<{ id: number, title: string, subtitle: string }>, hasMore: boolean }>}
 */
const fetchPage = ( page ) => new Promise( resolve =>
{
    setTimeout( () =>
    {
        const start = page * PAGE_SIZE ;
        const end   = Math.min( start + PAGE_SIZE , TOTAL_ITEMS ) ;

        const items = [] ;

        for ( let i = start ; i < end ; i++ )
        {
            items.push
            ({
                id       : i + 1 ,
                title    : `Item #${ i + 1 }` ,
                subtitle : `Loaded on page ${ page + 1 }` ,
            }) ;
        }

        resolve({ items , hasMore : end < TOTAL_ITEMS }) ;
    }
    , LATENCY ) ;
}) ;

/**
 * InfiniteScroll showcase : a scrollable container that lazily loads
 * paginated items as the user scrolls towards the bottom.
 */
const InfiniteScrollDemo = () =>
{
    const [ items   , setItems   ] = useState( [] ) ;
    const [ page    , setPage    ] = useState( 0 ) ;
    const [ loading , setLoading ] = useState( false ) ;
    const [ hasMore , setHasMore ] = useState( true ) ;

    // --------- Append the next page, guarding against concurrent loads

    const loadMore = useCallback( async () =>
    {
        if ( loading || !hasMore )
        {
            return ;
        }

        setLoading( true ) ;

        const { items : newItems , hasMore : more } = await fetchPage( page ) ;

        setItems( prev => [ ...prev , ...newItems ] ) ;
        setHasMore( more ) ;
        setPage( prev => prev + 1 ) ;
        setLoading( false ) ;
    }
    , [ hasMore , loading , page ] ) ;

    // --------- Initial load

    useEffect( () =>
    {
        loadMore() ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] ) ;

    return (
        <div className="flex flex-col gap-8">

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">

                    <h2 className="card-title text-2xl mb-2">Scrollable container</h2>
                    <p className="text-sm opacity-70 mb-4">
                        { items.length } / { TOTAL_ITEMS } items loaded — scroll down to load more.
                    </p>

                    <InfiniteScroll
                        className  = "max-h-96 py-2 rounded-box border border-base-300 bg-base-100"
                        endMessage = {
                            <p className="text-center text-sm opacity-60 py-4">
                                — End of the list —
                            </p>
                        }
                        hasMore    = { hasMore }
                        loading    = { loading }
                        onLoadMore = { loadMore }
                        scrollable
                    >
                        <List>
                            { items.map( item => (
                                <ListRow
                                    key      = { item.id }
                                    title    = { item.title }
                                    subtitle = { item.subtitle }
                                />
                            ) ) }
                        </List>
                    </InfiniteScroll>

                </div>
            </div>

        </div>
    ) ;
} ;

export default InfiniteScrollDemo ;
