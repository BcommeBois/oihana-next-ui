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
 * ### The worker is served by the application
 *
 * See `MAPLIBRE_WORKER_URL` below.
 *
 * @module components/maps/engine
 */

import 'maplibre-gl/dist/maplibre-gl.css' ;

/**
 * Where the application serves the engine's worker from.
 *
 * 🚨 **A map whose worker never starts looks almost right.** It mounts, it
 * draws its controls, and it never requests a tile — and nothing on the page
 * says why. That is the failure this constant exists to prevent, so a wrong
 * value here is invisible until someone looks at the network panel.
 *
 * From version 6 the engine ships as ES modules only and loads its worker from
 * a real URL, resolved through `import.meta.url`. Inside a bundler's module
 * graph that does not reliably point at the file, so the url has to be named
 * once. Next is a documented exception on top of that : it emits the worker as
 * a hashed asset WITHOUT its `maplibre-gl-shared.mjs` sibling, which the worker
 * imports by relative path on its first line. Both files are therefore served
 * from `public/` instead, by `oihana-copy-maplibre-worker` on a `predev` /
 * `prebuild` hook.
 *
 * ⚠️ **An application under a `basePath` must prefix it** and hand the result
 * to `Map`'s `workerUrl` — this one is read from the root of the origin, which
 * is where the folder is served without one.
 *
 * It mirrors `DESTINATION` in `scripts/copy-maplibre-worker.js` : the folder
 * and the url it is served at are one decision, written once on each side
 * because nothing can be imported across them.
 *
 * @type {string}
 */
export const MAPLIBRE_WORKER_URL = '/maplibre/maplibre-gl-worker.mjs' ;

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
