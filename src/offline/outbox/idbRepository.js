import { META , OUTBOX , OUTBOX_FILES } from '../db' ;

/**
 * The outbox repository on IndexedDB, with the contract of `memoryRepository`.
 * An item and its bytes are written in one transaction : a queued photo never
 * exists without its item, nor the other way round.
 *
 * @param {import('idb').IDBPDatabase} db - From `openOfflineDb`.
 * @returns {Object} The repository.
 *
 * @example
 * const repository = idbRepository( await openOfflineDb( 'wms' ) ) ;
 */
const idbRepository = db =>
({
    all : () => db.getAll( OUTBOX ) ,

    get : async id => ( await db.get( OUTBOX , id ) ) ?? null ,

    put : async ( item , bytes ) =>
    {
        const tx = db.transaction( [ OUTBOX , OUTBOX_FILES ] , 'readwrite' ) ;
        const writes = [ tx.objectStore( OUTBOX ).put( item ) ] ;
        if ( bytes )
        {
            writes.push( tx.objectStore( OUTBOX_FILES ).put( bytes , item.id ) ) ;
        }
        await Promise.all( [ ...writes , tx.done ] ) ;
    } ,

    putMany : async items =>
    {
        const tx = db.transaction( OUTBOX , 'readwrite' ) ;
        await Promise.all( [ ...items.map( item => tx.store.put( item ) ) , tx.done ] ) ;
    } ,

    delete : async id =>
    {
        const tx = db.transaction( [ OUTBOX , OUTBOX_FILES ] , 'readwrite' ) ;
        await Promise.all( [ tx.objectStore( OUTBOX ).delete( id ) , tx.objectStore( OUTBOX_FILES ).delete( id ) , tx.done ] ) ;
    } ,

    getFiles : async id => ( await db.get( OUTBOX_FILES , id ) ) ?? [] ,

    getMeta : async key => ( await db.get( META , key ) ) ?? null ,

    setMeta : ( key , value ) => db.put( META , value , key ) ,

    clear : async () =>
    {
        const tx = db.transaction( [ OUTBOX , OUTBOX_FILES ] , 'readwrite' ) ;
        await Promise.all( [ tx.objectStore( OUTBOX ).clear() , tx.objectStore( OUTBOX_FILES ).clear() , tx.done ] ) ;
    } ,
}) ;

export default idbRepository ;
