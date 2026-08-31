/**
 * The fields a point carries besides its two coordinates.
 *
 * ### Why this list has to exist
 *
 * The whole point of naming coordinates was that a point could be spread into
 * a component — `<Map { ...fromSchema( place ) } />`, `<MapMarker
 * { ...position } />` — with nothing converting anything in between. The cost
 * of that convenience is that everything *else* the point carries is spread in
 * too : `elevation` and `source` from the adapter, `accuracy`, `heading`,
 * `speed` and the rest from a browser fix.
 *
 * Left in the rest object they end up as attributes on a DOM element. React
 * says so out loud for a camel-cased one — `altitudeAccuracy` — and says
 * nothing at all for a lower-cased one, which is worse : `elevation="20"` sits
 * quietly in the markup of every map drawn from an adapted place.
 *
 * So the components that accept a spread point absorb its fields, and this is
 * the one list they share. Adding a field to a point shape means adding it
 * here, or it reappears in the DOM.
 *
 * @module helpers/geo/pointFields
 */

/**
 * Everything a point of this library may carry.
 * @type {string[]}
 */
export const POINT_FIELDS =
[
    'accuracy' ,
    'altitude' ,
    'altitudeAccuracy' ,
    'elevation' ,
    'heading' ,
    'source' ,
    'speed' ,
    'timestamp' ,
] ;

/**
 * Copies props without the fields a point carries.
 *
 * `latitude` and `longitude` are not in the list : a component reading a point
 * destructures those itself, and removing them here would only hide a mistake.
 *
 * @param {Object} [props] - The rest object.
 * @returns {Object} The same props, minus the point's own fields.
 *
 * @example
 * ```js
 * withoutPointFields({ id : 'a' , elevation : 20 , source : {} }) ; // → { id : 'a' }
 * ```
 */
export const withoutPointFields = ( props ) =>
{
    if ( !props )
    {
        return props ;
    }

    const kept = {} ;

    for ( const key of Object.keys( props ) )
    {
        if ( !POINT_FIELDS.includes( key ) )
        {
            kept[ key ] = props[ key ] ;
        }
    }

    return kept ;
} ;

export default withoutPointFields ;
