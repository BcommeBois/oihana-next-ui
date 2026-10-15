'use client' ;

import { use } from 'react' ;

import OfflineStoreContext from './context' ;

/**
 * The reserve of the application, or `null` outside an `OfflineStoreProvider`.
 *
 * @module contexts/offlineStore/useOfflineStore
 *
 * @returns {?{ ready : boolean , remember : Function , rememberMany : Function , read : Function , list : Function , forget : Function , pin : Function , clear : Function , describe : Function , query : Function , sweep : Function , subscribe : Function }}
 *
 * @example
 * ```jsx
 * const { remember } = useOfflineStore() ?? {} ;
 * useEffect( () => { if ( parcel ) remember?.( 'parcel' , parcel.id , parcel ) ; } , [ parcel , remember ] ) ;
 * ```
 */
const useOfflineStore = () => use( OfflineStoreContext ) ;

export default useOfflineStore ;
