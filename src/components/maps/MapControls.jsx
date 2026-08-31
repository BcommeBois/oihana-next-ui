'use client' ;

/**
 * The engine controls a map shows, resolved from one prop.
 *
 * @module components/maps/MapControls
 */

import { FullscreenControl , NavigationControl , ScaleControl } from './engine' ;

import MapGeolocate from './MapGeolocate' ;

/**
 * What `controls={ true }` means.
 *
 * Zoom and compass, and nothing else. A map with no way to zoom is not a
 * simpler map, it is a broken one — which is why this is the one default in
 * the group that is on. The scale bar and the fullscreen button are genuinely
 * optional, so they are opt-in.
 *
 * @type {Object}
 */
const DEFAULTS =
{
    fullscreen : false ,
    geolocate  : false ,
    navigation : true ,
    scale      : false ,
} ;

/**
 * Reads the `controls` prop.
 *
 * An object is merged **over** the defaults rather than replacing them, so
 * `{ scale : true }` adds the scale bar to the navigation instead of trading
 * one for the other. `{ navigation : false , scale : true }` still gets you
 * the scale alone.
 *
 * @param {boolean|Object} [controls]
 * @returns {Object}
 */
export const resolveControls = ( controls ) =>
{
    if ( controls === true || controls == null )
    {
        return DEFAULTS ;
    }

    if ( !controls )
    {
        return { fullscreen : false , geolocate : false , navigation : false , scale : false } ;
    }

    return { ...DEFAULTS , ...controls } ;
} ;

/**
 * @param {Object} props
 * @param {boolean|Object} [props.controls=true] - `true` for navigation only, `false` for none, or `{ fullscreen , geolocate , navigation , scale }`. `geolocate` also takes an options object, handed to `MapGeolocate`.
 * @param {string} [props.position='top-right'] - Corner the controls sit in.
 */
const MapControls = ({ controls = true , position = 'top-right' }) =>
{
    const { fullscreen , geolocate , navigation , scale } = resolveControls( controls ) ;

    return (
        <>
            { navigation && <NavigationControl position={ position } /> }
            {
                // Ours, not the engine's. The engine ships a geolocation control
                // and it is a good one on paper, but a control whose click we
                // could not make fire is worth less than a small button we own
                // end to end — and this one takes the theme like every other
                // button in the library.
                geolocate && <MapGeolocate { ...( geolocate === true ? null : geolocate ) } />
            }
            { fullscreen && <FullscreenControl position={ position } /> }
            { scale      && <ScaleControl position="bottom-left" /> }
        </>
    ) ;
} ;

MapControls.displayName = 'MapControls' ;

export default MapControls ;
