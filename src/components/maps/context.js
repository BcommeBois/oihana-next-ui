'use client' ;

/**
 * The map instance, published to whatever is drawn inside it.
 *
 * ### Why a context of our own
 *
 * The engine has one, but it does not export it, and its public `useMap` hook
 * only answers under a `MapProvider` the consumer would have to mount himself.
 * Requiring that would be a leak : an application should be able to write
 * `<Map><MapMarkers …/></Map>` and nothing else.
 *
 * So `Map` publishes its instance here, and everything that needs to *move* the
 * map — a cluster that zooms to its own contents, a geolocation control, a
 * picker — reads it from one place.
 *
 * The value is `null` until the map has loaded, which is one paint after the
 * children first render. Anything reading it has to cope with that.
 *
 * @module components/maps/context
 */

import { createContext , useContext } from 'react' ;

/** @type {import('react').Context<Object|null>} */
const MapInstanceContext = createContext( null ) ;

/**
 * The MapLibre map instance drawn by the enclosing `Map`.
 *
 * @returns {Object|null} The instance, or `null` before it has loaded.
 */
export const useMapInstance = () => useContext( MapInstanceContext ) ;

export default MapInstanceContext ;
