/**
 * Formats a coordinate pair for a human.
 *
 * Two notations, because they answer different questions : `decimal` is what
 * gets copied into a form or a URL, `dms` is what a reader compares with a
 * paper map or a GPS.
 *
 * **Rounding is display only.** The stored value keeps every digit it had —
 * six decimals already resolve to about ten centimetres, so a field that
 * rounds on the way in silently moves the point it was meant to record.
 *
 * @module helpers/geo/formatCoordinates
 */

export const DECIMAL = 'decimal' ;
export const DMS     = 'dms' ;

const DEFAULT_DIGITS = 6 ;

/**
 * Formats one axis in degrees, minutes and seconds.
 *
 * @param {number} value
 * @param {string} positive - Hemisphere letter for a positive value.
 * @param {string} negative - Hemisphere letter for a negative value.
 * @param {number} digits - Decimals kept on the seconds.
 * @returns {string}
 */
const toDms = ( value , positive , negative , digits ) =>
{
    const absolute = Math.abs( value ) ;
    const degrees  = Math.floor( absolute ) ;
    const rest     = ( absolute - degrees ) * 60 ;
    const minutes  = Math.floor( rest ) ;
    const seconds  = ( rest - minutes ) * 60 ;

    return `${ degrees }°${ String( minutes ).padStart( 2 , '0' ) }'${ seconds.toFixed( digits ) }"${ value < 0 ? negative : positive }` ;
} ;

/**
 * Formats a point.
 *
 * @param {{ latitude : number , longitude : number }|null} point
 * @param {Object} [options]
 * @param {'decimal'|'dms'} [options.format='decimal'] - Notation.
 * @param {number} [options.digits=6] - Decimals kept — on the degrees for `decimal`, on the seconds for `dms`.
 * @param {string} [options.separator=', '] - What sits between the two axes.
 * @returns {string} The formatted pair, or an empty string when there is no point.
 *
 * @example
 * ```js
 * formatCoordinates({ latitude : 48.856614 , longitude : 2.352222 }) ;
 * // → '48.856614, 2.352222'
 *
 * formatCoordinates({ latitude : 48.856614 , longitude : 2.352222 } , { format : 'dms' , digits : 1 }) ;
 * // → '48°51\'23.8"N, 2°21\'08.0"E'
 * ```
 */
const formatCoordinates = ( point , { digits = DEFAULT_DIGITS , format = DECIMAL , separator = ', ' } = {} ) =>
{
    const latitude  = point?.latitude ;
    const longitude = point?.longitude ;

    if ( !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
    {
        return '' ;
    }

    if ( format === DMS )
    {
        return toDms( latitude , 'N' , 'S' , digits ) + separator + toDms( longitude , 'E' , 'W' , digits ) ;
    }

    return latitude.toFixed( digits ) + separator + longitude.toFixed( digits ) ;
} ;

export default formatCoordinates ;
