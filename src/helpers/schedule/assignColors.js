/**
 * Gives every key of a set its own colour, and keeps giving it the same one.
 *
 * Colouring events **by resource** — by room, by round, by category — is the
 * moment the eight theme tokens run out : fifteen rounds cannot each have their
 * own, and a wash of the same tint tells the reader nothing. A palette answers
 * the count ; this answers the harder half, which is **stability**.
 *
 * A colour assigned by order of appearance drifts : navigate to a week where the
 * Blue Room happens to come first and every room shifts one place. So the keys
 * are **sorted** before they are indexed, and the mapping depends only on the set
 * of keys — not on what the current window happens to contain, nor on the order
 * the payload arrived in.
 *
 * A set that grows still shifts what sorts after the newcomer. An application
 * that cannot live with that passes its own `keys`, in its own order, and the
 * mapping is then frozen for good.
 *
 * @module helpers/schedule/assignColors
 */

/**
 * @param {Array<string|number>} keys - The distinct keys to colour. Order is ignored unless `sort` is false.
 * @param {string[]} colors - The palette, from {@link module:hooks/usePalette}.
 * @param {Object} [options]
 * @param {boolean} [options.sort=true] - Sort the keys before indexing. `false` keeps the order given, which is how an application freezes the mapping.
 * @returns {Map<string, string>} Key → colour. Empty when either input is.
 *
 * @example
 * const byRoom = assignColors( [ 'atelier' , 'auditorium' ] , [ '#a' , '#b' ] ) ;
 * byRoom.get( 'atelier' ) // → '#a' , whatever week is being looked at
 */
export const assignColors = ( keys , colors , { sort = true } = {} ) =>
{
    const map = new Map() ;

    if ( !Array.isArray( keys ) || !Array.isArray( colors ) || colors.length === 0 )
    {
        return map ;
    }

    const distinct = [ ...new Set( keys.filter( key => key !== null && key !== undefined && key !== '' ).map( String ) ) ] ;

    if ( sort )
    {
        distinct.sort( ( a , b ) => a.localeCompare( b ) ) ;
    }

    distinct.forEach( ( key , index ) =>
    {
        // The palette cycles rather than running out : more keys than colours is a
        // legibility problem, not a crash, and the application is better placed to
        // decide whether to widen the palette or group the keys.
        map.set( key , colors[ index % colors.length ] ) ;
    }) ;

    return map ;
} ;

export default assignColors ;
