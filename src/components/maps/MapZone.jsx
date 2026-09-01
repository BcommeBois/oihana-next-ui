'use client' ;

/**
 * An area on the map — a delivery zone, a radius, a district.
 *
 * @module components/maps/MapZone
 */

import { useMemo } from 'react' ;

import parseGeoShape from '../../helpers/geo/parseGeoShape' ;
import toCirclePolygon from '../../helpers/geo/toCirclePolygon' ;

import MapGeoJSON from './MapGeoJSON' ;

/**
 * Reads whatever a caller hands over into a drawable feature.
 *
 * Three shapes are accepted because three are what an application actually
 * has : the `GeoShape` its API returned, the `Place` holding one in `geo`, or
 * GeoJSON it built itself.
 *
 * @param {Object} shape
 * @returns {Object|null}
 */
const read = ( shape ) =>
{
    if ( !shape )
    {
        return null ;
    }

    // Already GeoJSON : a feature, or a bare geometry.
    if ( shape.type === 'Feature' || shape.type === 'FeatureCollection' )
    {
        return shape ;
    }

    if ( shape.type && shape.coordinates )
    {
        return { type : 'Feature' , geometry : shape , properties : {} } ;
    }

    // A `Place` keeps its area in `geo`, like it keeps its point there.
    return parseGeoShape( shape.geo ?? shape ) ;
} ;

/**
 * Draws an area.
 *
 * **A circle becomes a polygon here, and that is the whole component.**
 * `parseGeoShape` keeps a `GeoShape.circle` as a centre and a radius, faithful
 * to schema.org and impossible to fill — a point has no inside. So the circle
 * is approximated as a polygon in real coordinates, which survives a rotation
 * and a tilt where a disc of fixed pixels would not.
 *
 * Everything else is `MapGeoJSON` doing what it already did.
 *
 * @param {Object} props
 * @param {string} [props.color='primary'] - A theme token, or the colour the zone carries.
 * @param {boolean} [props.fill=true] - Fill the area, or draw only its outline.
 * @param {Object} props.shape - A `GeoShape`, a `Place` holding one, or GeoJSON.
 * @param {number} [props.steps=64] - Sides of a circle's approximation.
 * @param {number} [props.width] - Outline width in pixels.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapZone shape={ place.geo } color={ area.color } />
 * </Map>
 * ```
 */
const MapZone = ( { color , fill = true , shape , steps , width , ...rest } ) =>
{
    const data = useMemo( () =>
    {
        const feature = read( shape ) ;

        if ( !feature )
        {
            return null ;
        }

        const { geometry , properties } = feature ;

        if ( geometry?.type !== 'Point' )
        {
            return feature ;
        }

        const [ longitude , latitude ] = geometry.coordinates ?? [] ;
        const radius = properties?.radius ;

        const circle = toCirclePolygon( { latitude , longitude } , radius , { steps } ) ;

        // A point with no radius is not an area, and drawing it as one would
        // invent a zone the data never described.
        return circle && { ...feature , geometry : circle } ;
    }
    , [ shape , steps ] ) ;

    return data && <MapGeoJSON color={ color } data={ data } fill={ fill } width={ width } { ...rest } /> ;
} ;

MapZone.displayName = 'MapZone' ;

export default MapZone ;
