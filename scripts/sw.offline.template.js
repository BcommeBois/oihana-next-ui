const CACHE_NAME = '__CACHE_PREFIX__-v__VERSION__' ;

// No skipWaiting on install : the new worker parks in `waiting` so the client
// (useServiceWorkerUpdate) can surface an « update available » prompt. The swap
// happens on demand when the client posts a SKIP_WAITING message.
self.addEventListener( 'install' , () => {} ) ;

self.addEventListener( 'message' , ( event ) =>
{
    // Keep the type in sync with SKIP_WAITING_MESSAGE (hooks/useServiceWorkerUpdate).
    if ( event.data?.type === 'SKIP_WAITING' ) self.skipWaiting() ;
}) ;

self.addEventListener( 'activate' , ( event ) =>
{
    event.waitUntil(
        caches.keys().then( ( names ) =>
        {
            return Promise.all
            (
                names
                    .filter( ( name ) => name !== CACHE_NAME )
                    .map( ( name ) => caches.delete( name ) )
            ) ;
        })
    ) ;
    self.clients.claim() ;
}) ;

// Served under its version (oihana-copy-zxing-wasm), so a cached copy never goes stale : cache first.
const ZXING_PATH = '/zxing/' ;

self.addEventListener( 'fetch' , ( event ) =>
{
    const url = new URL( event.request.url ) ;

    // The barcode reader's WebAssembly : kept after its first fetch, so a camera scan works offline.
    if ( event.request.method === 'GET' && url.origin === self.location.origin && url.pathname.startsWith( ZXING_PATH ) )
    {
        event.respondWith
        (
            caches.open( CACHE_NAME ).then( ( cache ) =>
            {
                return cache.match( event.request ).then( ( cached ) =>
                {
                    return cached || fetch( event.request ).then( ( response ) =>
                    {
                        if ( response.ok ) cache.put( event.request , response.clone() ) ;
                        return response ;
                    }) ;
                }) ;
            })
        ) ;
        return ;
    }

    if ( event.request.mode === 'navigate' )
    {
        event.respondWith
        (
            fetch( event.request ).then( ( response ) =>
            {
                // Stores a copy of each visited page in cache
                const clone = response.clone() ;
                caches.open( CACHE_NAME ).then( ( cache ) =>
                {
                    cache.put( event.request , clone ) ;
                }) ;
                return response ;
            })
            .catch( () =>
            {
                return caches.match( event.request ).then( ( cached ) =>
                {
                    return cached || caches.match( '/' ) ;
                }) ;
            })
        ) ;
    }
}) ;