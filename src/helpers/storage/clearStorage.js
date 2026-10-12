/**
 * Whether a key is one of those to keep : named exactly, or under a prefix
 * ending with `*`.
 *
 * @param {string} key
 * @param {string[]} keepKeys
 * @returns {boolean}
 */
const isKept = ( key , keepKeys ) => keepKeys.some( pattern =>
    pattern.endsWith( '*' ) ? key.startsWith( pattern.slice( 0 , -1 ) ) : key === pattern ) ;

/**
 * Clears a storage while preserving specified keys.
 *
 * A key is kept when named exactly, or when it starts with a pattern ending
 * with `*` — `'my-app:feedback:*'` keeps every setting the feedback provider
 * writes under that prefix, so a setting added later is kept too.
 *
 * @module helpers/storage/clearStorage
 *
 * @param {Storage} storage - localStorage or sessionStorage.
 * @param {string[]} [keepKeys=[]] - Keys to preserve : exact names, or prefixes ending with `*`.
 *
 * @example
 * ```js
 * clearStorage( localStorage , [ 'lang' , 'theme' , 'my-app:feedback:*' ] ) ;
 * ```
 */
const clearStorage = ( storage , keepKeys = [] ) =>
{
    const preserved = [] ;

    for ( let index = 0 ; index < storage.length ; index++ )
    {
        const key = storage.key( index ) ;

        if ( key !== null && isKept( key , keepKeys ) )
        {
            preserved.push( { key , value : storage.getItem( key ) } ) ;
        }
    }

    storage.clear() ;

    for ( const { key , value } of preserved )
    {
        storage.setItem( key , value ) ;
    }
} ;

export default clearStorage ;
