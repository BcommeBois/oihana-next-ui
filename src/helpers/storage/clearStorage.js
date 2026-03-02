/**
 * Clears a storage while preserving specified keys.
 * @param {Storage} storage - localStorage or sessionStorage.
 * @param {string[]} [keepKeys=[]] - Keys to preserve.
 */
const clearStorage = ( storage , keepKeys = [] ) =>
{
    const preserved = keepKeys
        .map( key => ( { key , value : storage.getItem( key ) } ) )
        .filter( item => item.value !== null ) ;

    storage.clear() ;

    for ( const { key , value } of preserved )
    {
        storage.setItem( key , value ) ;
    }
} ;

export default clearStorage ;