/**
 * Removes a value from localStorage and its associated cookie.
 * @param {string} key - Storage key.
 */
const removeStorage = key =>
{
    localStorage.removeItem( key ) ;

    document.cookie = `${key}=;path=/;max-age=0` ;

    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

export default removeStorage ;