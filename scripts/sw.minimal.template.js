const CACHE_NAME = '__CACHE_PREFIX__-v__VERSION__' ;

// No skipWaiting on install : the new worker parks in `waiting` so the client
// (useServiceWorkerUpdate) can surface an « update available » prompt. The swap
// happens on demand when the client posts a SKIP_WAITING message.
self.addEventListener( 'install' , () => {} ) ;

self.addEventListener( 'activate' , () => self.clients.claim() ) ;

self.addEventListener( 'message' , ( event ) =>
{
    // Keep the type in sync with SKIP_WAITING_MESSAGE (hooks/useServiceWorkerUpdate).
    if ( event.data?.type === 'SKIP_WAITING' ) self.skipWaiting() ;
}) ;
