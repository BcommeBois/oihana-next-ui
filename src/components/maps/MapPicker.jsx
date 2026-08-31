'use client' ;

/**
 * A point you place by dragging it.
 *
 * @module components/maps/MapPicker
 */

import { useCallback , useEffect , useRef } from 'react' ;

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
 * **The map follows a value it did not cause, and only that one.** Dragging the
 * marker moves the marker and never the map — pulling the ground from under the
 * hand doing the dragging is unusable. But a point arriving from anywhere else,
 * an address search above all, has to be flown to : choosing an address in
 * Amiens while the map shows Paris otherwise drops the marker off-screen and
 * looks like nothing happened.
 *
 * So the component remembers what its own drag last emitted, and moves only for
 * everything else.
 *
 * @param {Object} props
 * @param {import('../../themes/components/map').MapMarkerColor} [props.color='primary'] - Marker colour.
 * @param {{ latitude : number , longitude : number }} [props.defaultValue] - Initial point, uncontrolled.
 * @param {number} [props.latitude] - Opening latitude, when there is no value yet.
 * @param {number} [props.longitude] - Opening longitude, when there is no value yet.
 * @param {Function} [props.onChange] - `( { latitude , longitude } ) => void`, on drag end.
 * @param {Function} [props.onDrag] - `( { latitude , longitude } ) => void`, continuously while dragging.
 * @param {Function} [props.onLoad] - Called once the map has loaded.
 * @param {boolean} [props.follow=true] - Fly to a value that did not come from a drag.
 * @param {number} [props.followZoom] - Zoom used when flying there. Omitted, the current zoom is kept.
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
    follow = true ,
    followZoom ,
    latitude ,
    longitude ,
    onChange ,
    onDrag ,
    onLoad ,
    ref ,
    title = 'Position' ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ point , setPoint ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const instance = useRef( null ) ;

    // What our own drag last wrote. Compared by value rather than by identity :
    // a host is free to clone the point on its way through a reducer.
    const dragged = useRef( null ) ;

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
            dragged.current = next ;
            setPoint( next ) ;
        }
    } ;

    const placed = isPlaced( point ) ;

    useEffect( () =>
    {
        const map = instance.current ;

        if ( !follow || !map || !isPlaced( point ) )
        {
            return ;
        }

        const own = dragged.current ;

        if ( own && own.latitude === point.latitude && own.longitude === point.longitude )
        {
            return ;
        }

        // `flyTo` rather than `easeTo` : an address can be a hundred kilometres
        // away, and panning across at ground level reads as a glitch.
        map.flyTo({
            center : [ point.longitude , point.latitude ] ,
            ...Number.isFinite( followZoom ) && { zoom : followZoom } ,
        }) ;
    }
    , [ follow , followZoom , point ] ) ;

    // Where the map opens : the point once it is whole, the fallback until then.
    // Read once — the map is uncontrolled and will not follow later changes.
    const opening = placed ? point : { latitude , longitude } ;

    const handleLoad = ( event ) =>
    {
        instance.current = event.target ;
        onLoad?.( event ) ;
    } ;

    return (
        <Map { ...opening } onLoad={ handleLoad } ref={ ref } { ...rest }>
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
