'use client' ;

/**
 * The only door onto the map engine.
 *
 * Everything else in `components/maps` imports from here, so swapping the
 * engine — or opening a second one — is a change to this file and nothing
 * else. It is also where the engine's stylesheet is pulled in, once.
 *
 * ### The import is static, and that is deliberate
 *
 * The obvious reflex is `next/dynamic` with `ssr : false`, on the grounds that
 * WebGL has no business on a server. Reading `@vis.gl/react-maplibre` shows it
 * is not needed, and costs something real :
 *
 * - **It is already SSR-safe.** `Map` touches no browser global while
 *   rendering — it renders an empty container and initialises in an effect —
 *   and it renders its children *only once the map instance exists*, so
 *   `Marker`, which does call `document.createElement`, never runs on a
 *   server.
 * - **The heavy half is already split out.** `maplibre-gl` — 139 kB gzipped
 *   against a few for this wrapper — is loaded by `import( 'maplibre-gl' )`
 *   inside the library's own mount effect. `next/dynamic` would defer the
 *   wrapper, not the engine.
 * - **`next/dynamic` does not forward refs**, and `Map`'s ref is the handle on
 *   the map instance — `flyTo`, `fitBounds`, the whole imperative surface a
 *   picker needs. Wrapping it would throw that away for no gain.
 *
 * @module components/maps/engine
 */

import 'maplibre-gl/dist/maplibre-gl.css' ;

export {
    FullscreenControl ,
    Layer ,
    Map as MapGL ,
    Marker ,
    NavigationControl ,
    Popup ,
    ScaleControl ,
    Source ,
} from '@vis.gl/react-maplibre' ;
