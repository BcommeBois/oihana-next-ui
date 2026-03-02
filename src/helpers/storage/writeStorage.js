/**
 * Writes a JSON value to localStorage, sets a cookie for SSR,
 * and dispatches a storage event so other tabs stay in sync.
 * @param {string} key - Storage key.
 * @param {*} value - Value to store.
 * @param {object} [options] - Options.
 * @param {boolean} [options.cookie=true] - Also set a cookie for SSR.
 * @param {number} [options.maxAge=31536000] - Cookie max-age in seconds (default 1 year).
 */
const writeStorage = ( key , value , { cookie = true , maxAge = 31536000 } = {} ) =>
{
    const json = JSON.stringify( value ) ;

    localStorage.setItem( key , json ) ;

    if ( cookie )
    {
        document.cookie = `${key}=${value};path=/;max-age=${maxAge};SameSite=Lax` ;
    }

    window.dispatchEvent( new StorageEvent( 'storage' , { key } ) ) ;
} ;

export default writeStorage ;