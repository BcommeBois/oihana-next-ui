'use client' ;

/**
 * The element currently displayed fullscreen, or `null`.
 *
 * 🔑 **What it is for : finding the current painting root.** An element put
 * fullscreen is promoted to the browser's **top layer**, which does not belong
 * to the document's stacking order — nothing painted in `document.body` can
 * come above it, whatever its `z-index`. Anything that has to float above the
 * page has to be rendered INSIDE that element while it is fullscreen. See
 * {@link module:components/Portal}.
 *
 * 🚨 **It reads the document, not a provider.** `useFullscreen` throws outside
 * its provider, and this answers a question about the page itself — a primitive
 * has to work without anyone having mounted a context above it.
 *
 * The subscription goes through `useSyncExternalStore` rather than an effect :
 * an effect cannot tell a hydration render from a plain client mount, so it
 * would answer `null` first in both cases and cost a commit to every consumer
 * on the page. The server snapshot is `null` — there is no fullscreen on a
 * server, and the hydration render has to say what the server said.
 *
 * @module hooks/useFullscreenElement
 *
 * @returns {?HTMLElement} The fullscreen element, or `null`.
 *
 * @example
 * ```js
 * const fullscreen = useFullscreenElement() ;
 *
 * const host = fullscreen ?? document.body ;
 * ```
 */

import { useSyncExternalStore } from 'react' ;

/**
 * The two spellings of the event : browsers that ship the unprefixed one fire
 * it alone, the older WebKit builds fire theirs. Listening to both costs one
 * dead listener and covers both.
 *
 * @type {Array.<string>}
 */
const EVENTS = [ 'fullscreenchange' , 'webkitfullscreenchange' ] ;

const subscribe = onStoreChange =>
{
    for ( const event of EVENTS )
    {
        document.addEventListener( event , onStoreChange ) ;
    }

    return () =>
    {
        for ( const event of EVENTS )
        {
            document.removeEventListener( event , onStoreChange ) ;
        }
    } ;
} ;

// Both read back the same node while nothing changes, so the snapshot is
// stable and React does not re-render on every check.
const getSnapshot = () => document.fullscreenElement ?? document.webkitFullscreenElement ?? null ;

const getServerSnapshot = () => null ;

const useFullscreenElement = () => useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

export default useFullscreenElement ;
