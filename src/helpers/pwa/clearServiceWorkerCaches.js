'use client' ;

/**
 * Empties every Cache Storage entry a Service Worker holds.
 *
 * ### 🚨 Why a page ever needs this
 *
 * A worker caching navigate-mode responses serves them back from disk while
 * the network round trip is still in flight. After a sign-out — or any moment
 * the pages behind it stop being the reader's to see — the cached HTML of
 * those pages can flash for a frame when the address bar takes them back to a
 * public one. Emptying the caches as that public page mounts is what closes
 * the gap.
 *
 * ⚠️ **It is not `clearCache`.** That one is a server action asking Next to
 * revalidate a path ; this one is the BROWSER's Cache Storage, and the two
 * have nothing in common but a word.
 *
 * ⚠️ **It empties them ALL**, including whatever else the origin cached. A
 * worker that holds a precache it cannot rebuild should not be wiped this way.
 *
 * Best effort by design : it never throws and never reports. A caller that
 * must know whether the cache went away has to read Cache Storage itself.
 * Safe anywhere — on the server, and in a browser with no Cache Storage at
 * all, it returns having done nothing.
 *
 * @module helpers/pwa/clearServiceWorkerCaches
 *
 * @returns {Promise<void>} Resolves once every entry has been asked to go.
 *
 * @example
 * ```jsx
 * // On a public page, as it mounts.
 * useEffect( () => { clearServiceWorkerCaches() ; } , [] ) ;
 * ```
 */

const clearServiceWorkerCaches = async () =>
{
    if ( typeof window === 'undefined' || !( 'caches' in window ) ) { return ; }

    try
    {
        const names = await window.caches.keys() ;

        await Promise.all( names.map( name => window.caches.delete( name ) ) ) ;
    }
    catch
    {
        // Swallowed on purpose : a cache that refuses to go is not worth a
        // thrown error on a page whose job is to render. The caller asked for
        // a best effort, and has no branch to take on a failure.
    }
} ;

export default clearServiceWorkerCaches ;
