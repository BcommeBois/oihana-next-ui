'use client' ;

/**
 * A point you place by dragging it.
 *
 * @module components/maps/MapPicker
 */

import { useCallback } from 'react' ;

import useValue from '../../hooks/useValue' ;

// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this module never uses the built-in.
import Map       from './Map' ;
import MapMarker from './MapMarker' ;

/**
 * True when both halves are there.
 *
 * Half a point is not a point : `{ latitude : 48.85 }` alone would open the map
 * on the Gulf of Guinea, which is a real place and not the one meant.
 *
 * @param {*} point
 * @returns {boolean}
 */
const isPlaced = ( point ) => Number.isFinite( point?.latitude ) && Number.isFinite( point?.longitude ) ;

/**
 * Reads a drag event into a point.
 *
 * The engine reports `lngLat` ; everything on this side is named, so the
 * translation happens once, here, at the boundary.
 *
 * @param {Object} event
 * @returns {{ latitude : number , longitude : number }|null}
 */
const readEvent = ( event ) =>
{
    const { lat , lng } = event?.lngLat ?? {} ;

    return Number.isFinite( lat ) && Number.isFinite( lng ) ? { latitude : lat , longitude : lng } : null ;
} ;

/**
 * A map whose marker can be dragged, and a value that follows it.
 *
 * **Dragging only, never a click on the map.** Setting the point wherever the
 * map is clicked reads as a convenience until the first time someone taps to
 * dismiss a tooltip and silently moves a customer's address. A drag is a
 * deliberate gesture on a deliberate object ; a click is not.
 *
 * **The value is not rounded here.** The engine hands back a float with fifteen
 * decimals ; rounding it on the way in, then displaying the rounded figure,
 * then writing that back, walks the point a little further on every round trip.
 * Display rounds — `InputCoordinate` does — and storage keeps what it was
 * given.
 *
 * **The map is uncontrolled**, as everywhere in this group : it opens where the
 * value says and does not chase it afterwards. Dragging the marker moves the
 * marker, not the map, which is what lets someone drag towards the edge and
 * keep their bearings.
 *
 * @param {Object} props
 * @param {import('../../themes/components/map').MapMarkerColor} [props.color='primary'] - Marker colour.
 * @param {{ latitude : number , longitude : number }} [props.defaultValue] - Initial point, uncontrolled.
 * @param {number} [props.latitude] - Opening latitude, when there is no value yet.
 * @param {number} [props.longitude] - Opening longitude, when there is no value yet.
 * @param {Function} [props.onChange] - `( { latitude , longitude } ) => void`, on drag end.
 * @param {Function} [props.onDrag] - `( { latitude , longitude } ) => void`, continuously while dragging.
 * @param {string} [props.title='Position'] - Accessible name of the marker.
 * @param {{ latitude : number , longitude : number }} [props.value] - Controlled point.
 *
 * @example
 * ```jsx
 * <MapPicker mapStyle={ style } value={ point } onChange={ setPoint } />
 * ```
 */
const MapPicker =
({
    color = 'primary' ,
    defaultValue ,
    latitude ,
    longitude ,
    onChange ,
    onDrag ,
    title = 'Position' ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ point , setPoint ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const handleDrag = useCallback( ( event ) =>
    {
        const next = readEvent( event ) ;

        if ( next )
        {
            onDrag?.( next ) ;
        }
    }
    , [ onDrag ] ) ;

    const handleDragEnd = ( event ) =>
    {
        const next = readEvent( event ) ;

        if ( next )
        {
            setPoint( next ) ;
        }
    } ;

    const placed = isPlaced( point ) ;

    // Where the map opens : the point once it is whole, the fallback until then.
    // Read once — the map is uncontrolled and will not follow later changes.
    const opening = placed ? point : { latitude , longitude } ;

    return (
        <Map { ...opening } { ...rest }>
            {
                placed && (
                    <MapMarker
                        { ...point }
                        color     = { color }
                        draggable
                        onDrag    = { handleDrag }
                        onDragEnd = { handleDragEnd }
                        title     = { title }
                    />
                )
            }
        </Map>
    ) ;
} ;

MapPicker.displayName = 'MapPicker' ;

export default MapPicker ;
