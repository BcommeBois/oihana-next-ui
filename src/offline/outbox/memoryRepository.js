/**
 * A repository in memory, with the contract of `idbRepository` : for tests, for
 * the server render, and for a browser without IndexedDB (the queue then lives
 * as long as the page). Values are cloned in and out, as IndexedDB does, so a
 * caller never shares an object with the store.
 *
 * The contract :
 * - `all()` → every item ;
 * - `get( id )` → an item or `null` ;
 * - `put( item , files? )` → stores an item, and its bytes when given, at once ;
 * - `putMany( items )` → stores several items at once ;
 * - `delete( id )` → removes an item and its bytes ;
 * - `getFiles( id )` → `[ { name , type , field , size , bytes } ]`, `[]` when none ;
 * - `getMeta( key )` / `setMeta( key , value )` ;
 * - `clear()` → removes every item and every byte, keeps the meta.
 *
 * @returns {Object} The repository.
 */
const memoryRepository = () =>
{
    const items = new Map() ;
    const files = new Map() ;
    const meta  = new Map() ;

    return {
        all : async () => [ ...items.values() ].map( item => structuredClone( item ) ) ,

        get : async id => items.has( id ) ? structuredClone( items.get( id ) ) : null ,

        put : async ( item , bytes ) =>
        {
            items.set( item.id , structuredClone( item ) ) ;
            if ( bytes )
            {
                files.set( item.id , structuredClone( bytes ) ) ;
            }
        } ,

        putMany : async list =>
        {
            for ( const item of list )
            {
                items.set( item.id , structuredClone( item ) ) ;
            }
        } ,

        delete : async id =>
        {
            items.delete( id ) ;
            files.delete( id ) ;
        } ,

        getFiles : async id => files.has( id ) ? structuredClone( files.get( id ) ) : [] ,

        getMeta : async key => meta.has( key ) ? structuredClone( meta.get( key ) ) : null ,

        setMeta : async ( key , value ) =>
        {
            meta.set( key , structuredClone( value ) ) ;
        } ,

        clear : async () =>
        {
            items.clear() ;
            files.clear() ;
        } ,
    } ;
} ;

export default memoryRepository ;
