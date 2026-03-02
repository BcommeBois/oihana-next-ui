/**
 * Reads a JSON value from localStorage.
 * @param {string} key - Storage key.
 * @returns {*} Parsed value or null.
 */
const readStorage = key =>
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

export default readStorage ;