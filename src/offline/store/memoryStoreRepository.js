const id = ( kind , key ) => `${ kind }\u0000${ key }` ;

/**
 * The reserve's repository in memory, with the contract of `idbStoreRepository`.
 * Values are cloned in and out, as IndexedDB does.
 *
 * The contract :
 * - `get( kind , key )` → a record or `null` ;
 * - `put( record )` → stores `{ kind , key , value , seenAt , expiresAt , token , pinned }` ;
 * - `putMany( records )` → stores several at once ;
 * - `delete( kind , key )` ;
 * - `byKind( kind )` → the records of a kind ;
 * - `all()` → every record ;
 * - `clear( kind? )` → the records of a kind, or all of them.
 *
 * @returns {Object} The repository.
 */
const memoryStoreRepository = () =>
{
    const records = new Map() ;

    return {
        get    : async ( kind , key ) => records.has( id( kind , key ) ) ? structuredClone( records.get( id( kind , key ) ) ) : null ,

        put    : async record =>
        {
            records.set( id( record.kind , record.key ) , structuredClone( record ) ) ;
        } ,

        putMany : async list =>
        {
            for ( const record of list )
            {
                records.set( id( record.kind , record.key ) , structuredClone( record ) ) ;
            }
        } ,

        delete : async ( kind , key ) =>
        {
            records.delete( id( kind , key ) ) ;
        } ,

        byKind : async kind => [ ...records.values() ].filter( record => record.kind === kind ).map( record => structuredClone( record ) ) ,

        all    : async () => [ ...records.values() ].map( record => structuredClone( record ) ) ,

        clear  : async kind =>
        {
            for ( const [ key , record ] of records )
            {
                if ( kind === undefined || record.kind === kind )
                {
                    records.delete( key ) ;
                }
            }
        } ,
    } ;
} ;

export default memoryStoreRepository ;
