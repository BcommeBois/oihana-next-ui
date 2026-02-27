const CACHE_NAME = 'oihana-ui-v__VERSION__' ;

self.addEventListener( 'install' , () => self.skipWaiting() ) ;
self.addEventListener( 'activate' , () => self.clients.claim() ) ;