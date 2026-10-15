const CACHE_NAME = '__CACHE_PREFIX__-v__VERSION__' ;

// The page a failed navigation is sent to (pwa.offlineShell) ; empty when the application has none.
const OFFLINE_SHELL = '__OFFLINE_SHELL__' ;

// Served under its version (oihana-copy-zxing-wasm), so a cached copy never goes stale : cache first.
const ZXING_PATH = '/zxing/' ;

// Likewise the PDF engine (oihana-copy-pdfjs-assets) : worker, WebAssembly and fonts under their version.
const PDFJS_PATH = '/pdfjs/' ;

// Next's scripts and styles : their names change with every build, so a cached copy never goes stale either.
const NEXT_STATIC = '/_next/static/' ;

// The last resort, when nothing is cached : a word rather than the browser's error screen.
const OFFLINE_PAGE = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title></head>'
    + '<body style="font-family:system-ui,sans-serif;display:grid;place-content:center;min-height:100vh;margin:0;text-align:center;gap:1rem">'
    + '<h1 style="margin:0">Hors ligne · Offline</h1><p style="margin:0">Cette page demande le réseau. · This page needs the network.</p>'
    + '<p style="margin:0"><button onclick="location.reload()" style="font:inherit;padding:.5rem 1rem">Réessayer · Retry</button></p></body></html>' ;

/**
 * Keeps the offline shell and the scripts, styles and images its HTML names,
 * so it renders — and runs — with no network at all.
 */
const precacheShell = async () =>
{
    if ( !OFFLINE_SHELL )
    {
        return ;
    }

    const cache    = await caches.open( CACHE_NAME ) ;
    const response = await fetch( OFFLINE_SHELL , { cache : 'reload' , credentials : 'same-origin' } ) ;

    if ( !response.ok )
    {
        return ;
    }

    const html = await response.clone().text() ;

    await cache.put( OFFLINE_SHELL , response ) ;

    const assets = [ ...new Set( html.match( /\/(?:_next\/static|assets)\/[^"'\s<>)\\]+/g ) ?? [] ) ] ;

    await Promise.all( assets.map( asset => cache.add( asset ).catch( () => {} ) ) ) ;
} ;

// No skipWaiting on install : the new worker parks in `waiting` so the client
// (useServiceWorkerUpdate) can surface an « update available » prompt. The swap
// happens on demand when the client posts a SKIP_WAITING message. A shell that
// cannot be fetched (installed offline) does not stop the install.
self.addEventListener( 'install' , ( event ) =>
{
    event.waitUntil( precacheShell().catch( () => {} ) ) ;
}) ;

/**
 * Keeps the HTML of a page reached by a link (`next/link` fetches data, never
 * the page) : once per page and per version, in the background. A redirect is
 * not kept — a navigation cannot be answered with one that was followed.
 *
 * @param {string} path
 */
const cachePage = async ( path ) =>
{
    const url = new URL( path , self.location.origin ) ;

    if ( url.origin !== self.location.origin )
    {
        return ;
    }

    const cache   = await caches.open( CACHE_NAME ) ;
    const request = new Request( url.href , { credentials : 'same-origin' } ) ;

    if ( await cache.match( request ) )
    {
        return ;
    }

    const response = await fetch( request ) ;

    if ( response.ok && !response.redirected && ( response.headers.get( 'content-type' ) ?? '' ).includes( 'text/html' ) )
    {
        await cache.put( request , response ) ;
    }
} ;

self.addEventListener( 'message' , ( event ) =>
{
    // Keep the type in sync with SKIP_WAITING_MESSAGE (hooks/useServiceWorkerUpdate).
    if ( event.data?.type === 'SKIP_WAITING' ) self.skipWaiting() ;

    // Keep the type in sync with CACHE_PAGE_MESSAGE (hooks/useServiceWorkerPageCache).
    if ( event.data?.type === 'CACHE_PAGE' && typeof event.data.url === 'string' )
    {
        event.waitUntil( cachePage( event.data.url ).catch( () => {} ) ) ;
    }
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

/**
 * What a navigation gets when the network fails : the copy of the page if it
 * was visited ; else the shell, by a redirect that keeps the page asked for in
 * `?from=` (the address and the page shown then agree, which Next's router
 * needs) ; else the home page if cached ; else a word.
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
const offline = async ( request ) =>
{
    const cached = await caches.match( request ) ;

    if ( cached )
    {
        return cached ;
    }

    const url = new URL( request.url ) ;

    if ( OFFLINE_SHELL )
    {
        if ( url.pathname !== OFFLINE_SHELL )
        {
            return Response.redirect( `${ OFFLINE_SHELL }?from=${ encodeURIComponent( url.pathname + url.search ) }` , 302 ) ;
        }

        const shell = await caches.match( OFFLINE_SHELL , { ignoreSearch : true } ) ;

        if ( shell )
        {
            return shell ;
        }
    }

    return ( await caches.match( '/' ) )
        ?? new Response( OFFLINE_PAGE , { headers : { 'Content-Type' : 'text/html; charset=utf-8' } , status : 503 } ) ;
} ;

self.addEventListener( 'fetch' , ( event ) =>
{
    const url = new URL( event.request.url ) ;

    // Versioned files — the barcode reader, the PDF engine, Next's scripts and styles : kept after their first fetch, cache first.
    if ( event.request.method === 'GET' && url.origin === self.location.origin && ( url.pathname.startsWith( ZXING_PATH ) || url.pathname.startsWith( PDFJS_PATH ) || url.pathname.startsWith( NEXT_STATIC ) ) )
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

    // Images, fonts, the manifest of the application (`public/`) : network first, the kept copy offline.
    // Their names do not change with a deploy, so the network stays the one that answers when it can.
    if ( event.request.method === 'GET' && url.origin === self.location.origin && [ 'font' , 'image' , 'manifest' ].includes( event.request.destination ) )
    {
        event.respondWith
        (
            fetch( event.request ).then( ( response ) =>
            {
                if ( response.ok )
                {
                    const clone = response.clone() ;
                    caches.open( CACHE_NAME ).then( ( cache ) => cache.put( event.request , clone ) ) ;
                }
                return response ;
            })
            .catch( () => caches.match( event.request ).then( ( cached ) => cached || Response.error() ) )
        ) ;
        return ;
    }

    // A navigation by next/link (`?_rsc=`) is not a `navigate` request : when it fails, Next falls
    // back to a full navigation, which comes here.
    if ( event.request.mode === 'navigate' )
    {
        event.respondWith
        (
            fetch( event.request ).then( ( response ) =>
            {
                // Keeps a copy of each page visited, to show it offline — not the shell, kept once at install,
                // which would otherwise pile up a copy per `?from=`.
                if ( response.ok && url.pathname !== OFFLINE_SHELL )
                {
                    const clone = response.clone() ;
                    caches.open( CACHE_NAME ).then( ( cache ) =>
                    {
                        cache.put( event.request , clone ) ;
                    }) ;
                }
                return response ;
            })
            .catch( () => offline( event.request ) )
        ) ;
    }
}) ;
