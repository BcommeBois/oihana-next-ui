/**
 * Sets a cookie (without localStorage).
 * @param {string} key - Cookie name.
 * @param {string} value - Cookie value.
 * @param {number} [maxAge=31536000] - Max-age in seconds (default 1 year).
 */
const setCookie = ( key , value , maxAge = 31536000 ) =>
{
    document.cookie = `${key}=${value};path=/;max-age=${maxAge};SameSite=Lax` ;
} ;

export default setCookie ;