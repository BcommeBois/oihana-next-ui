'use client' ;

/**
 * A corner of the map to put our own controls in.
 *
 * @module components/maps/MapControl
 */

import { getMapControlClassNames } from '../../themes/components/map' ;

/**
 * Holds anything of ours in one corner of the map.
 *
 * The engine has its own control mechanism and its own look. This is the other
 * door : an ordinary box, in the DOM, above the canvas, where a `Button` is a
 * `Button` and follows the theme like every other button in the library.
 *
 * It settles once what is tedious every time — the stacking above the canvas,
 * and a box that wraps its children exactly so the map stays draggable
 * everywhere it does not actually cover.
 *
 * **What goes in it has to be opaque.** The box paints nothing — its children
 * may be a button, a panel or a legend, and forcing a surface on all three
 * would be wrong. But map tiles are a busy background : a ghost button placed
 * here leaves an icon floating over a street plan and reads as an artefact.
 * Give a control its own surface, as `MapGeolocate` does.
 *
 * **It defaults to the top-left**, because the engine's own controls take the
 * top-right and negotiating an order inside a stack we do not own is not worth
 * the trouble. `bottom-right` sits higher than its siblings : the source credit
 * lives there, and covering a licence condition is not an option.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - What goes in the corner.
 * @param {string} [props.className] - Additional classes.
 * @param {import('../../themes/components/map').MapControlPosition} [props.position='top-left'] - Which corner.
 *
 * @example
 * ```jsx
 * <Map { ...point } mapStyle={ style }>
 *     <MapControl position="bottom-left">
 *         <Button icon={ MdLayers } onClick={ toggleLayers } />
 *     </MapControl>
 * </Map>
 * ```
 */
const MapControl = ( { children , className , position , ...rest } ) => (
    <div className={ getMapControlClassNames({ className , position }) } { ...rest }>
        { children }
    </div>
) ;

MapControl.displayName = 'MapControl' ;

export default MapControl ;
