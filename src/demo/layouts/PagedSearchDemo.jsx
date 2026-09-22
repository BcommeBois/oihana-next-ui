'use client' ;

/**
 * PagedSearchDemo — `usePagedSearch` feeding `InfiniteScroll`.
 *
 * A fake server of 137 rows answers after a delay. The counters are the point :
 * « duplicates » must stay at 0 however fast the list is scrolled, StrictMode
 * included. « The server fails » makes the next page throw : the list stops,
 * says so, and « Retry » asks for the same page again. Scroll down, then type :
 * the list opens on its first results (`resetKey={ generation }`).
 *
 * @module demo/layouts/PagedSearchDemo
 */

import { useCallback , useRef , useState } from 'react' ;

import Badge          from '@/components/Badge' ;
import Button         from '@/components/Button' ;
import InfiniteScroll from '@/components/layouts/InfiniteScroll' ;
import usePagedSearch from '@/hooks/usePagedSearch' ;

/**
 * The fake data set.
 * @type {Object[]}
 */
const ROWS = Array.from( { length : 137 } , ( _ , index ) => ( { _key : `k${ index + 1 }` , name : `Essence n° ${ index + 1 }` } ) ) ;

/**
 * How long the fake server takes, in milliseconds.
 * @type {number}
 */
const LATENCY = 600 ;

const PagedSearchDemo = () =>
{
    const [ search , setSearch ] = useState( '' ) ;
    const [ fail   , setFail   ] = useState( false ) ;

    const failRef  = useRef( fail ) ;
    failRef.current = fail ;

    const [ calls , setCalls ] = useState( 0 ) ;

    const loader = useCallback( async ( { search : query , limit , offset } ) =>
    {
        setCalls( count => count + 1 ) ;
        await new Promise( resolve => setTimeout( resolve , LATENCY ) ) ;
        if ( failRef.current && offset > 0 ) { throw new Error( 'The server failed' ) ; }
        const matching = ROWS.filter( row => row.name.toLowerCase().includes( query.toLowerCase() ) ) ;
        return { result : matching.slice( offset , offset + limit ) , total : matching.length } ;
    } , [] ) ;

    const { items , total , loading , hasMore , error , generation , loadMore , retry } = usePagedSearch( { loader , search , limit : 20 } ) ;

    const duplicates = items.length - new Set( items.map( item => item._key ) ).size ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">

                <h2 className="card-title">usePagedSearch</h2>

                <div className="flex flex-wrap items-center gap-3">
                    <input
                        className   = "input input-sm w-56"
                        onChange    = { event => setSearch( event.target.value ) }
                        placeholder = "Rechercher (ex. 12)"
                        value       = { search }
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input checked={ fail } className="toggle toggle-sm" onChange={ event => setFail( event.target.checked ) } type="checkbox" />
                        Le serveur échoue
                    </label>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge color="primary">lignes { items.length } / { total }</Badge>
                    <Badge color={ duplicates === 0 ? 'success' : 'error' }>doublons { duplicates }</Badge>
                    <Badge color="neutral">appels { calls }</Badge>
                    <Badge color="neutral">départs { generation }</Badge>
                </div>

                <InfiniteScroll
                    className  = "flex max-h-72 flex-col gap-1 overflow-y-auto rounded-box bg-base-100 p-2"
                    endMessage = { <p className="py-2 text-center text-sm text-base-content/60">{ error ? '' : 'Fin de la liste' }</p> }
                    hasMore    = { hasMore }
                    loading    = { loading }
                    onLoadMore = { loadMore }
                    resetKey   = { generation }
                    scrollable
                >
                    { items.map( item => <div key={ item._key } className="px-2 py-1 text-sm">{ item.name }</div> ) }
                </InfiniteScroll>

                { error ? (
                    <div className="flex items-center gap-3 text-sm text-error">
                        Une page n'a pas pu être chargée.
                        <Button onClick={ retry } size="xs" style="soft" type="button">Réessayer</Button>
                    </div>
                ) : null }

            </div>
        </div>
    ) ;
} ;

PagedSearchDemo.displayName = 'PagedSearchDemo' ;

export default PagedSearchDemo ;
