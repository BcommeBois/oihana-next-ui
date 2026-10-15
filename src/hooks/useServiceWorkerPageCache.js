'use client' ;

import { useEffect } from 'react' ;

import { usePathname } from 'next/navigation' ;

/**
 * The message a page posts to its service worker to have its HTML kept.
 * Keep in sync with the `sw.offline.template.js` scaffold.
 * @type {string}
 */
export const CACHE_PAGE_MESSAGE = 'CACHE_PAGE' ;

/**
 * Asks the service worker to keep the page shown, at each move.
 *
 * A worker keeps the HTML of the pages it serves as navigations — a page typed
 * in the address bar, reloaded, opened first. A move by `next/link` is no
 * navigation : Next fetches the page's data, never its HTML, so a page reached
 * by the menu would not open offline after a reload. This posts its address to
 * the worker, which fetches and keeps the HTML once per page and per version,
 * in the background. A worker without the offline template ignores it.
 *
 * Used by `display/ServiceWorker` and `useServiceWorkerUpdate` ; nothing to do
 * with either of them.
 *
 * @module hooks/useServiceWorkerPageCache
 *
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true]
 */
const useServiceWorkerPageCache = ( { enabled = true } = {} ) =>
{
    const pathname = usePathname() ;

    useEffect( () =>
    {
        const container = typeof navigator === 'undefined' ? null : navigator.serviceWorker ;

        if ( !enabled || !pathname || !container )
        {
            return undefined ;
        }

        const post = () => container.controller?.postMessage( { type : CACHE_PAGE_MESSAGE , url : `${ window.location.pathname }${ window.location.search }` } ) ;

        post() ;

        // A worker that takes control after the page loaded (its first install, an update) never saw it.
        container.addEventListener( 'controllerchange' , post ) ;

        return () => container.removeEventListener( 'controllerchange' , post ) ;
    }
    , [ enabled , pathname ] ) ;
} ;

export default useServiceWorkerPageCache ;
