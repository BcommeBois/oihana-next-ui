'use client' ;

/**
 * The disc that says how sure a position is.
 *
 * @module components/maps/MapAccuracyCircle
 */

import { useEffect , useState } from 'react' ;

import { getMapAccuracyCircleClassNames } from '../../themes/components/map' ;

import { useMapInstance } from './context' ;

import { Marker } from './engine' ;

/**
 * How many metres one pixel covers, here and at this zoom.
 *
 * A degree of longitude is not a fixed distance — it shrinks towards the poles
 * — so the ratio has to be measured at the point itself rather than derived
 * from the zoom alone. Projecting the centre, stepping a hundred pixels east
 * and asking how far that is answers it in two calls, which is also how the
 * engine's own control does it.
 *
 * @param {Object} map - The map instance.
 * @param {{ latitude : number , longitude : number }} point
 * @returns {number} Metres per pixel.
 */
const metresPerPixel = ( map , point ) =>
{
    const origin = map.project( [ point.longitude , point.latitude ] ) ;
    const east   = map.unproject( [ origin.x + 100 , origin.y ] ) ;

    // `unproject` hands back the engine's own coordinate object, which is what
    // knows how to measure a distance — so the centre is read back the same way
    // rather than constructing one and importing the class to do it.
    return map.unproject( origin ).distanceTo( east ) / 100 ;
} ;

/**
 * A translucent disc of `accuracy` metres around a point.
 *
 * **Its radius is in real metres**, so it grows and shrinks with the zoom like
 * the ground under it — which is the whole reason it is worth drawing. A disc
 * of a fixed pixel size would say nothing.
 *
 * It is a plain element, so it takes the theme like everything else : the size
 * is the only thing set in JavaScript, and it has to be, since no CSS unit
 * knows about metres.
 *
 * @param {Object} props
 * @param {number} props.accuracy - Radius in metres, as the browser reports it.
 * @param {string} [props.className] - Additional classes.
 * @param {number} props.latitude
 * @param {number} props.longitude
 */
const MapAccuracyCircle = ( { accuracy , className , latitude , longitude } ) =>
{
    const map = useMapInstance() ;

    const [ diameter , setDiameter ] = useState( 0 ) ;

    useEffect( () =>
    {
        if ( !map || !Number.isFinite( accuracy ) || !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
        {
            return ;
        }

        const update = () =>
        {
            const ratio = metresPerPixel( map , { latitude , longitude } ) ;

            setDiameter( ratio > 0 ? ( 2 * accuracy ) / ratio : 0 ) ;
        } ;

        update() ;

        // Every gesture that changes the scale on screen changes the disc.
        for ( const event of [ 'move' , 'pitch' , 'rotate' , 'zoom' ] )
        {
            map.on( event , update ) ;
        }

        return () =>
        {
            for ( const event of [ 'move' , 'pitch' , 'rotate' , 'zoom' ] )
            {
                map.off( event , update ) ;
            }
        } ;
    }
    , [ accuracy , latitude , longitude , map ] ) ;

    if ( !diameter )
    {
        return null ;
    }

    return (
        <Marker latitude={ latitude } longitude={ longitude } pitchAlignment="map">
            <div
                aria-hidden = "true"
                className   = { getMapAccuracyCircleClassNames({ className }) }
                style       = {{ height : `${ diameter }px` , width : `${ diameter }px` }}
            />
        </Marker>
    ) ;
} ;

MapAccuracyCircle.displayName = 'MapAccuracyCircle' ;

export default MapAccuracyCircle ;
