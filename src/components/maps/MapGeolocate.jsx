'use client' ;

/**
 * Our own « where am I » button, and what it draws.
 *
 * @module components/maps/MapGeolocate
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import { MdLocationDisabled , MdLocationSearching , MdMyLocation } from 'react-icons/md' ;

import useGeolocation from '../../hooks/useGeolocation' ;

import cn from '../../themes/helpers/cn' ;

import Button from '../Button' ;

import MapAccuracyCircle from './MapAccuracyCircle' ;
import MapControl        from './MapControl' ;
import MapMarker         from './MapMarker' ;

import { useMapInstance } from './context' ;

/** How close the map gets when it centres on a fix. */
const DEFAULT_ZOOM = 15 ;

/**
 * A button that puts the user on the map, written here rather than borrowed.
 *
 * **It is ours end to end**, on `useGeolocation` and a plain `Button` — so it
 * takes the theme, sits beside the other controls we may add later, and its
 * behaviour is ours to change. The engine ships one too ; this one exists
 * because a control we cannot open is worth less than a small one we own.
 *
 * **Two states, not five.** Idle, and locating. `track` turns the button into a
 * toggle that follows the user until it is pressed again. What is deliberately
 * missing is the engine's third state — « the watch is running but you dragged
 * the map away, so the button changed shape and one press re-locks » — which
 * costs two more appearances and is understood by nobody who sees it.
 *
 * **It is solid, never ghost.** A transparent button over map tiles leaves an
 * icon floating on a street plan, which is unreadable on anything denser than a
 * field — the same reason a marker carries a ring. Any control put on a map has
 * to bring its own surface.
 *
 * **The accuracy circle is the honest part.** A browser gives a position *and*
 * a margin, and a bare dot on a desktop fix five kilometres wide reads as a
 * certainty. Turning it off is the particular choice, so it is on by default.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the button.
 * @param {import('../../themes/components/map').MapMarkerColor} [props.color='info'] - Colour of the dot.
 * @param {string} [props.label='Ma position'] - Accessible name of the button.
 * @param {Function} [props.onLocate] - `( position ) => void`, on every fix.
 * @param {import('../../themes/components/map').MapControlPosition} [props.position='top-left'] - Which corner.
 * @param {boolean} [props.showAccuracyCircle=true] - Draw the margin around the dot.
 * @param {boolean} [props.showControl=true] - Draw the button. `false` leaves only what a fix draws.
 * @param {boolean} [props.track=false] - Follow the user until pressed again.
 * @param {number} [props.zoom=15] - Zoom used when centring on a fix.
 *
 * @example
 * ```jsx
 * <Map { ...point } mapStyle={ style }>
 *     <MapGeolocate track />
 * </Map>
 * ```
 */
const MapGeolocate =
({
    className ,
    color = 'info' ,
    label = 'Ma position' ,
    onLocate ,
    position = 'top-left' ,
    showAccuracyCircle = true ,
    showControl = true ,
    track = false ,
    zoom = DEFAULT_ZOOM ,
}) =>
{
    const map = useMapInstance() ;

    const { error , position : fix , request , stop , watching } = useGeolocation({ watch : track }) ;

    const [ active , setActive ] = useState( false ) ;

    // The map is moved on a *new* fix, never on a re-render : without this a
    // parent's state change would drag the map back under the user's hands.
    const centred = useRef( null ) ;

    const toggle = useCallback( () =>
    {
        if ( active )
        {
            stop() ;
            setActive( false ) ;
            return ;
        }

        centred.current = null ;
        setActive( true ) ;
        request() ;
    }
    , [ active , request , stop ] ) ;

    useEffect( () =>
    {
        if ( !fix || !active )
        {
            return ;
        }

        onLocate?.( fix ) ;

        if ( map && centred.current !== fix.timestamp )
        {
            centred.current = fix.timestamp ;
            map.easeTo( { center : [ fix.longitude , fix.latitude ] , zoom } ) ;
        }

        // A one-shot request is over as soon as it answers ; a tracked one is not.
        if ( !track )
        {
            setActive( false ) ;
        }
    }
    , [ active , fix , map , onLocate , track , zoom ] ) ;

    const Icon = error ? MdLocationDisabled : ( active || watching ) ? MdLocationSearching : MdMyLocation ;

    return (
        <>
            {
                showControl && (
                    <MapControl position={ position }>
                        <Button
                            className = { cn( 'shadow-md' , className ) }
                            color     = { error ? 'error' : watching ? 'primary' : undefined }
                            icon      = { Icon }
                            onClick   = { toggle }
                            shape     = "square"
                            size      = "sm"
                            title     = { label }
                        />
                    </MapControl>
                )
            }

            {
                fix && showAccuracyCircle && Number.isFinite( fix.accuracy ) && (
                    <MapAccuracyCircle
                        accuracy  = { fix.accuracy }
                        latitude  = { fix.latitude }
                        longitude = { fix.longitude }
                    />
                )
            }

            { fix && <MapMarker { ...fix } color={ color } size="sm" title={ label } /> }
        </>
    ) ;
} ;

MapGeolocate.displayName = 'MapGeolocate' ;

export default MapGeolocate ;
