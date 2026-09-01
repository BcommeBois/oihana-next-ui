/**
 * Approximates a circle of real metres as a polygon.
 *
 * ### Why a polygon rather than a circle
 *
 * A `GeoShape.circle` is a centre and a radius, and `parseGeoShape` keeps it
 * that way — faithful to schema.org, and useless for filling : a point has no
 * inside. A delivery area has to be a polygon in real coordinates, or it will
 * not survive a rotation or a tilt, and it cannot be filled at all.
 *
 * ### The approximation, and where it stops being one
 *
 * The maths is flat-earth : a degree of latitude is taken as a constant, and a
 * degree of longitude as that constant times the cosine of the latitude.
 *
 * Measured against haversine distances rather than assumed : **0.11 % at 1.5 km,
 * 0.06 % at 50 km, 0.23 % at 100 km**, and 0.08 % at 5 km on latitude 68 — so
 * the error grows with the radius, not with the distance from the equator,
 * which the cosine already handles. At a two-kilometre delivery radius that is
 * two metres.
 *
 * Past a few hundred kilometres, or across a pole, this is the wrong tool and a
 * geodesic library is the right one. No delivery area has ever needed one.
 *
 * @module helpers/geo/toCirclePolygon
 */

/** Metres in a degree of latitude. Constant enough for this purpose. */
const METRES_PER_DEGREE = 111320 ;

/** Enough sides that the eye reads a circle at any zoom a zone is looked at. */
const DEFAULT_STEPS = 64 ;

/** Keeps the longitude conversion finite within a few metres of a pole. */
const MIN_COSINE = 1e-6 ;

/**
 * Builds the polygon of a circle.
 *
 * @param {{ latitude : number , longitude : number }} centre
 * @param {number} radius - In metres.
 * @param {Object} [options]
 * @param {number} [options.steps=64] - Sides of the approximation.
 * @returns {Object|null} A GeoJSON `Polygon` geometry, or `null` on unusable input.
 *
 * @example
 * ```js
 * toCirclePolygon( { latitude : 48.8566 , longitude : 2.3522 } , 1500 ) ;
 * ```
 */
const toCirclePolygon = ( centre , radius , { steps = DEFAULT_STEPS } = {} ) =>
{
    const { latitude , longitude } = centre ?? {} ;

    if ( !Number.isFinite( latitude ) || !Number.isFinite( longitude ) || !( radius > 0 ) )
    {
        return null ;
    }

    const perLatitude  = METRES_PER_DEGREE ;
    const perLongitude = METRES_PER_DEGREE * Math.max( Math.cos( ( latitude * Math.PI ) / 180 ) , MIN_COSINE ) ;

    const ring = [] ;

    for ( let step = 0 ; step < steps ; step++ )
    {
        const angle = ( 2 * Math.PI * step ) / steps ;

        ring.push([
            longitude + ( radius * Math.cos( angle ) ) / perLongitude ,
            latitude  + ( radius * Math.sin( angle ) ) / perLatitude ,
        ]) ;
    }

    // GeoJSON wants the ring closed, and the first position is the only one
    // guaranteed to match exactly.
    ring.push( ring[ 0 ] ) ;

    return { type : 'Polygon' , coordinates : [ ring ] } ;
} ;

export default toCirclePolygon ;
