import { STORE } from '../db' ;

/**
 * The reserve's repository on IndexedDB, with the contract of `memoryStoreRepository`.
 *
 * @param {import('idb').IDBPDatabase} db - From `openOfflineDb`.
 * @returns {Object} The repository.
 *
 * @example
 * const repository = idbStoreRepository( await openOfflineDb( 'wms' ) ) ;
 */
const idbStoreRepository = db =>
({
    get    : async ( kind , key ) => ( await db.get( STORE , [ kind , key ] ) ) ?? null ,

    put    : record => db.put( STORE , record ) ,

    putMany : async records =>
    {
        const tx = db.transaction( STORE , 'readwrite' ) ;
        await Promise.all( [ ...records.map( record => tx.store.put( record ) ) , tx.done ] ) ;
    } ,

    delete : ( kind , key ) => db.delete( STORE , [ kind , key ] ) ,

    byKind : kind => db.getAllFromIndex( STORE , 'kind' , kind ) ,

    all    : () => db.getAll( STORE ) ,

    clear  : async kind =>
    {
        if ( kind === undefined )
        {
            await db.clear( STORE ) ;
            return ;
        }

        const tx = db.transaction( STORE , 'readwrite' ) ;
        let cursor = await tx.store.index( 'kind' ).openCursor( kind ) ;
        while ( cursor )
        {
            await cursor.delete() ;
            cursor = await cursor.continue() ;
        }
        await tx.done ;
    } ,
}) ;

export default idbStoreRepository ;
