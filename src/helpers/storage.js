/**
 * Reads a JSON value from localStorage.
 * @param {string} key - Storage key.
 * @returns {*} Parsed value or null.
 */
export const readStorage = ( key ) =>
{
    if ( typeof window === 'undefined' ) return null ;
    try
    {
        const raw = localStorage.getItem( key ) ;
        return raw ? JSON.parse( raw ) : null ;
    }
    catch
    {
        return null ;
    }
} ;

/**
 * Writes a JSON value to localStorage, sets a cookie for SSR,
 * and dispatches a storage event so other tabs stay in sync.
 * @param {string} key - Storage key.
 * @param {*} value - Value to store.
 * @param {object} [options] - Options.
 * @param {boolean} [options.cookie=true] - Also set a cookie for SSR.
 * @param {number} [options.maxAge=31536000] - Cookie max-age in seconds (default 1 year).
 */
export const writeStorage = ( key , value , { cookie = true , maxAge = 31536000 } = {} ) =>
{
    const json = JSON.stringify( value ) ;
    localStorage.setItem( key , json ) ;

    if ( cookie )
    {
        document.cookie = `${key}=${value};path=/;max-age=${maxAge};SameSite=Lax` ;
    }

    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

/**
 * Removes a value from localStorage and its associated cookie.
 * @param {string} key - Storage key.
 */
export const removeStorage = key =>
{
    localStorage.removeItem( key ) ;
    document.cookie = `${key}=;path=/;max-age=0` ;
    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

/**
 * Clears a storage while preserving specified keys.
 * @param {Storage} storage - localStorage or sessionStorage.
 * @param {string[]} [keepKeys=[]] - Keys to preserve.
 */
export const clearStorage = ( storage , keepKeys = [] ) =>
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

/**
 * Subscribe to storage changes (for useSyncExternalStore).
 * @param {function} callback - Callback on storage change.
 * @returns {function} Unsubscribe function.
 */
export const subscribeStorage = callback =>
{
    window.addEventListener( 'storage' , callback ) ;
    return () => window.removeEventListener( 'storage' , callback ) ;
} ;

/**
 * Sets a cookie (without localStorage).
 * @param {string} key - Cookie name.
 * @param {string} value - Cookie value.
 * @param {number} [maxAge=31536000] - Max-age in seconds (default 1 year).
 */
export const setCookie = ( key , value , maxAge = 31536000 ) =>
{
    document.cookie = `${key}=${value};path=/;max-age=${maxAge};SameSite=Lax` ;
} ;