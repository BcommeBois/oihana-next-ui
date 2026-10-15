'use client' ;

import { createContext } from 'react' ;

/**
 * The reserve of the application : the records kept to be read offline, and
 * what reads, keeps and searches them.
 *
 * `null` outside an `OfflineStoreProvider`.
 *
 * @module contexts/offlineStore/context
 */
const OfflineStoreContext = createContext( null ) ;

export default OfflineStoreContext ;
