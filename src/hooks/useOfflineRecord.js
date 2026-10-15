'use client' ;

import { useEffect , useState } from 'react' ;

import useOfflineStore from '../contexts/offlineStore/useOfflineStore' ;

/**
 * A record of the reserve, kept up to date : read at mount, read again when it
 * changes — here or in another tab.
 *
 * @module hooks/useOfflineRecord
 *
 * @param {string} kind
 * @param {?(string|number)} key - Nothing is read while it is `null` or `undefined`.
 * @returns {{ value : * , seenAt : ?number , expired : boolean , pinned : boolean , token : * , loading : boolean , found : boolean }}
 *
 * @example
 * ```jsx
 * const { value : parcel , seenAt , found } = useOfflineRecord( 'parcel' , id ) ;
 * ```
 */
const useOfflineRecord = ( kind , key ) =>
{
    const store = useOfflineStore() ;

    const [ state , setState ] = useState( { loading : true , record : null } ) ;

    useEffect( () =>
    {
        if ( !store || key === null || key === undefined )
        {
            setState( { loading : false , record : null } ) ;
            return undefined ;
        }

        let cancelled = false ;

        const load = async () =>
        {
            const record = await store.read( kind , key ) ;
            if ( !cancelled )
            {
                setState( { loading : false , record } ) ;
            }
        } ;

        setState( previous => ( { ...previous , loading : true } ) ) ;
        load() ;

        const unsubscribe = store.subscribe( change =>
        {
            if ( change.kind === undefined || ( change.kind === kind && ( change.key === undefined || change.key === key ) ) )
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
    , [ key , kind , store ] ) ;

    const { loading , record } = state ;

    return {
        expired : record?.expired ?? false ,
        found   : record !== null ,
        loading ,
        pinned  : record?.pinned ?? false ,
        seenAt  : record?.seenAt ?? null ,
        token   : record?.token ?? null ,
        value   : record?.value ,
    } ;
} ;

export default useOfflineRecord ;
