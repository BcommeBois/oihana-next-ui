'use client' ;

import { useEffect , useState } from 'react' ;

import useOfflineStore from '../contexts/offlineStore/useOfflineStore' ;

/**
 * A search of the reserve, kept up to date : run at mount, run again when the
 * request changes or a record of the kind does.
 *
 * The request is compared by value, so an inline object is fine.
 *
 * @module hooks/useOfflineQuery
 *
 * @param {string} kind
 * @param {Object} [request] - `{ text , where , sort , limit , offset }`, see `runQuery`.
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true] - `false` runs nothing (online, the page asks the server).
 * @returns {{ items : Object[] , total : number , loading : boolean }}
 *
 * @example
 * ```jsx
 * const { items , total } = useOfflineQuery( 'parcel' , { text , where : { state } , sort : 'number' , limit : 20 } , { enabled : !online } ) ;
 * ```
 */
const useOfflineQuery = ( kind , request , { enabled = true } = {} ) =>
{
    const store = useOfflineStore() ;

    const signature = JSON.stringify( request ?? {} ) ;

    const [ state , setState ] = useState( { items : [] , loading : true , total : 0 } ) ;

    useEffect( () =>
    {
        if ( !store || !enabled )
        {
            setState( previous => ( { ...previous , loading : false } ) ) ;
            return undefined ;
        }

        let cancelled = false ;

        const parsed = JSON.parse( signature ) ;

        const load = async () =>
        {
            const { items , total } = await store.query( kind , parsed ) ;
            if ( !cancelled )
            {
                setState( { items , loading : false , total } ) ;
            }
        } ;

        setState( previous => ( { ...previous , loading : true } ) ) ;
        load() ;

        const unsubscribe = store.subscribe( change =>
        {
            if ( change.kind === undefined || change.kind === kind )
            {
                load() ;
            }
        }) ;

        return () =>
        {
            cancelled = true ;
            unsubscribe() ;
        } ;
    }
    , [ enabled , kind , signature , store ] ) ;

    return state ;
} ;

export default useOfflineQuery ;
