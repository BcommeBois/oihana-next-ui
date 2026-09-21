/**
 * Removes a cookie written by {@link module:helpers/storage/setCookie}.
 *
 * Expired on the same `path` it was written on — a cookie removed on another
 * path is a second cookie, and the first one stays.
 *
 * @module helpers/storage/removeCookie
 *
 * @param {string} key - Cookie name.
 * @returns {void}
 */
const removeCookie = key =>
{
    document.cookie = `${ key }=;path=/;max-age=0;SameSite=Lax` ;
} ;

export default removeCookie ;
