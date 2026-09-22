'use client' ;

/**
 * A searchable list loaded page by page : the state behind a picker, a filter
 * list, anything fed to `InfiniteScroll`.
 *
 * Given a `loader( { search , limit , offset } ) => { result , total }` — a
 * server action, a fetch — it :
 *
 *  - **debounces** the `search` ;
 *  - **starts over** at the first page whenever `search` or the `loader`
 *    identity changes — so a caller switches data sets by varying the loader
 *    (binding another key). A `loader` change also clears the rows at once :
 *    the loading state shows instead of the previous set ; a `search` change
 *    keeps them while the new page loads, so typing does not flicker ;
 *  - **appends** the next page on `loadMore` ;
 *  - on a failed page, raises `error` and stops loading ; `retry` fetches the
 *    same page again.
 *
 * 🚨 **It solves the double load `useInfiniteScroll` warns about.** `loading`
 * is asynchronous state : the observer can call `loadMore` again before it
 * flips, and StrictMode invokes twice. Three guards keep the same page from
 * landing twice :
 *
 *  - a synchronous lock — a second append is skipped while one runs. A reset
 *    is never skipped, it is what the reader asked for ;
 *  - a token — the latest request wins, a superseded answer is dropped ;
 *  - a de-duplication on append, through `getKey`.
 *
 * **The end** is judged on the page size, not on `total` : a page shorter than
 * `limit` means there is nothing left. It cannot loop, even when a server's
 * `total` is wrong.
 *
 * **Keys** : `getKey( item )` defaults to `item._key ?? item.id`. A row with no
 * key is kept — it simply cannot be de-duplicated — rather than dropped.
 *
 * @module hooks/usePagedSearch
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

/**
 * The key of a row, by default : a document store's `_key`, else an `id`.
 *
 * @param {Object} item
 * @returns {*}
 */
const defaultGetKey = item => item?._key ?? item?.id ;

/**
 * A searchable list loaded page by page.
 *
 * @param {Object}   options
 * @param {Function} options.loader              - `( { search , limit , offset } ) => Promise<{ result , total }>`. Wrap it in `useCallback` : a new identity starts over.
 * @param {string}   [options.search='']         - The search, debounced here.
 * @param {number}   [options.limit=30]          - Rows per page.
 * @param {number}   [options.debounceMs=250]    - Debounce of the search ; `0` when the input already debounces.
 * @param {boolean}  [options.enabled=true]      - `false` loads nothing and shows an empty, finished list.
 * @param {Function} [options.getKey]            - `( item ) => key`, for the de-duplication. Defaults to `_key`, then `id`.
 *
 * @returns {{
 *   items    : Object[],
 *   total    : number,
 *   loading  : boolean,
 *   hasMore  : boolean,
 *   error    : boolean,
 *   loadMore : () => void,
 *   reload   : () => Promise<boolean>,
 *   retry    : () => void
 * }} `reload` starts over and resolves `true` on success ; `retry` fetches the failed page again.
 *
 * @example
 * ```jsx
 * const loader = useCallback( ( { search , limit , offset } ) => searchPeople( { search , limit , offset } ) , [] ) ;
 *
 * const { items , loading , hasMore , error , loadMore , retry } = usePagedSearch( { loader , search } ) ;
 *
 * <InfiniteScroll hasMore={ hasMore } loading={ loading } onLoadMore={ loadMore }>
 *     { items.map( item => <Row key={ item._key } item={ item } /> ) }
 * </InfiniteScroll>
 * ```
 */
const usePagedSearch = (
{
    loader ,
    search     = '' ,
    limit      = 30 ,
    debounceMs = 250 ,
    enabled    = true ,
    getKey     = defaultGetKey ,
} = {} ) =>
{
    const [ items      , setItems        ] = useState( [] ) ;
    const [ total      , setTotal      ] = useState( 0 ) ;
    const [ loading    , setLoading    ] = useState( false ) ;
    const [ reachedEnd , setReachedEnd ] = useState( false ) ;
    const [ error      , setError      ] = useState( false ) ;

    const offsetRef   = useRef( 0 ) ;     // next page offset
    const inflightRef = useRef( false ) ; // synchronous single-flight lock
    const tokenRef    = useRef( 0 ) ;     // supersede token (latest wins)

    // Read through a ref : an inline `getKey` must not restart the list.
    const getKeyRef = useRef( getKey ) ;
    getKeyRef.current = getKey ;

    const run = useCallback( async ( reset ) =>
    {
        // Appends are skipped while a fetch runs ; resets always proceed and
        // supersede the in-flight one through the token.
        if ( inflightRef.current && !reset ) { return ; }

        const token = ++tokenRef.current ;

        if ( reset ) { offsetRef.current = 0 ; setError( false ) ; }
        const offset = offsetRef.current ;

        inflightRef.current = true ;
        setLoading( true ) ;

        try
        {
            if ( !enabled || typeof loader !== 'function' )
            {
                if ( token === tokenRef.current ) { setItems( [] ) ; setTotal( 0 ) ; setReachedEnd( true ) ; }
                return ;
            }

            const { result , total : count } = await loader( { search , limit , offset } ) ;

            if ( token !== tokenRef.current ) { return ; } // superseded → dropped

            const list = Array.isArray( result ) ? result : [] ;

            setItems( previous =>
            {
                if ( reset ) { return list ; }

                const keyOf = getKeyRef.current ;
                const seen  = new Set( previous.map( keyOf ).filter( key => key !== undefined && key !== null ) ) ;

                // A row with no key cannot be de-duplicated : it is kept.
                return [ ...previous , ...list.filter( item =>
                {
                    const key = keyOf( item ) ;
                    return key === undefined || key === null || !seen.has( key ) ;
                } ) ] ;
            } ) ;

            offsetRef.current = offset + list.length ;
            setTotal( typeof count === 'number' ? count : 0 ) ;
            setError( false ) ;

            // A page shorter than `limit` : nothing left, whatever `total` says.
            const end = list.length < limit ;
            setReachedEnd( reset ? end : previous => previous || end ) ;

            return true ;
        }
        catch ( reason )
        {
            if ( token === tokenRef.current )
            {
                if ( reset ) { setItems( [] ) ; setTotal( 0 ) ; }
                // Stop loading so the sentinel does not hammer a failing page.
                // The offset was not advanced : `retry` asks for the same page.
                setError( true ) ;
                setReachedEnd( true ) ;
            }

            if ( process.env.NODE_ENV !== 'production' )
            {
                console.warn( '[usePagedSearch] loader failed' , reason?.message ?? reason ) ;
            }

            return false ;
        }
        finally
        {
            // Only the current owner releases the lock : a superseded fetch
            // must not unlock the slot a newer reset now holds.
            if ( token === tokenRef.current )
            {
                inflightRef.current = false ;
                setLoading( false ) ;
            }
        }
    } , [ loader , search , limit , enabled ] ) ;

    // A new data set (`loader` identity) clears at once : the loading state
    // shows straight away instead of the previous set's rows.
    const loaderRef = useRef( loader ) ;
    useEffect( () =>
    {
        if ( loaderRef.current === loader ) { return ; }
        loaderRef.current = loader ;

        offsetRef.current = 0 ;
        setItems( [] ) ;
        setTotal( 0 ) ;
        setReachedEnd( false ) ;
        setError( false ) ;
        setLoading( true ) ;
    } , [ loader ] ) ;

    // Debounced start over, on any search or loader change.
    useEffect( () =>
    {
        const timer = setTimeout( () => { run( true ) ; } , debounceMs ) ;
        return () => clearTimeout( timer ) ;
    } , [ run , debounceMs ] ) ;

    const loadMore = useCallback( () => run( false ) , [ run ] ) ;

    const reload = useCallback( () => run( true ) , [ run ] ) ;

    const retry = useCallback( () =>
    {
        setError( false ) ;
        setReachedEnd( false ) ;
        run( false ) ;
    } , [ run ] ) ;

    return { items , total , loading , hasMore : !reachedEnd , error , loadMore , reload , retry } ;
} ;

export default usePagedSearch ;
