import { openDB } from 'idb' ;

/**
 * The store of the queued items (metadata only), keyed by `id`.
 * @type {string}
 */
export const OUTBOX = 'outbox' ;

/**
 * The store of the queued bytes, keyed by the item's `id` : `[ { name , type , field , size , bytes } ]`.
 * @type {string}
 */
export const OUTBOX_FILES = 'outboxFiles' ;

/**
 * The store of the small values the outbox keeps (`lastSyncAt`, `persisted`…).
 * @type {string}
 */
export const META = 'meta' ;

/**
 * The store of the reserve : the records kept to be read offline, keyed by `[ kind , key ]`.
 * @type {string}
 */
export const STORE = 'store' ;

/**
 * The version of the schema. Every new store bumps it and adds a step to `upgrade`.
 * @type {number}
 */
export const VERSION = 2 ;

/**
 * Opens the IndexedDB database of an application — one per application, named
 * after it. Nothing here runs on the server : call it from an effect.
 *
 * Each version adds its stores to what the previous one left : a device that
 * kept a queue under an older version keeps it. A tab still holding an older
 * version closes its connection when a newer one asks to upgrade, instead of
 * blocking it.
 *
 * @param {string} name - The database name (`'wms'`, `'lab'`…).
 * @returns {Promise<import('idb').IDBPDatabase>}
 *
 * @example
 * const db = await openOfflineDb( 'wms' ) ;
 */
const openOfflineDb = name => openDB( name , VERSION ,
{
    upgrade( db , oldVersion )
    {
        if ( oldVersion < 1 )
        {
            const outbox = db.createObjectStore( OUTBOX , { keyPath : 'id' } ) ;
            outbox.createIndex( 'status' , 'status' ) ;
            db.createObjectStore( OUTBOX_FILES ) ;
            db.createObjectStore( META ) ;
        }

        if ( oldVersion < 2 )
        {
            const store = db.createObjectStore( STORE , { keyPath : [ 'kind' , 'key' ] } ) ;
            store.createIndex( 'kind' , 'kind' ) ;
            store.createIndex( 'seenAt' , 'seenAt' ) ;
        }
    } ,

    blocking( _currentVersion , _blockedVersion , event )
    {
        event.target.close() ;
    } ,
}) ;

export default openOfflineDb ;
