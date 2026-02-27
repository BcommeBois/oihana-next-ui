import { AM, PM } from './meridies' ;

/**
 * Convert 24-hour format time to 12-hour format with meridiem.
 *
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {[number, string]} Tuple of [hour in 12h format, meridiem]
 *
 * @example
 * convertTo12Hour(0)   // [12, 'AM'] (minuit)
 * convertTo12Hour(1)   // [1, 'AM']  (1h du matin)
 * convertTo12Hour(11)  // [11, 'AM'] (11h du matin)
 * convertTo12Hour(12)  // [12, 'PM'] (midi)
 * convertTo12Hour(13)  // [1, 'PM']  (13h)
 * convertTo12Hour(23)  // [11, 'PM'] (23h)
 */
export const convertTo12Hour = ( hour ) =>
{
    if ( hour === 0 )
    {
        return [ 12, AM ] ; // Minuit
    }
    else if ( hour < 12 )
    {
        return [ hour, AM ] ; // Matin
    }
    else if ( hour === 12 )
    {
        return [ 12, PM ] ; // Midi
    }
    else
    {
        return [ hour - 12, PM ] ; // Après-midi/soir
    }
} ;

export default convertTo12Hour ;