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

self.addEventListener( 'fetch' , ( event ) =>
{
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