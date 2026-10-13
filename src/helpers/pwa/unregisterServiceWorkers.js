/**
 * Removes every service worker registered for this origin.
 *
 * What a development server wants : a worker installed by a production build
 * served from the same origin — `localhost`, for every project in turn —
 * keeps controlling it, answering pages from its cache and fighting the hot
 * reload, until someone opens the browser's tools and removes it by hand.
 *
 * Nothing happens where there is no `serviceWorker` (a server, an old
 * browser) : the function resolves to `0`.
 *
 * @module helpers/pwa/unregisterServiceWorkers
 *
 * @returns {Promise<number>} How many registrations were removed.
 *
 * @example
 * ```js
 * if ( process.env.NODE_ENV !== 'production' )
 * {
 *     unregisterServiceWorkers() ;
 * }
 * ```
 */
const unregisterServiceWorkers = async () =>
{
    if ( typeof navigator === 'undefined' || !( 'serviceWorker' in navigator ) )
    {
        return 0 ;
    }

    const registrations = await navigator.serviceWorker.getRegistrations() ;

    const removed = await Promise.all( registrations.map( registration => registration.unregister() ) ) ;

    return removed.filter( Boolean ).length ;
} ;

export default unregisterServiceWorkers ;
