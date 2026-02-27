import { AM, PM } from './meridies' ;

/**
 * Convert 12-hour format time to 24-hour format.
 *
 * @param {number} hour - Hour in 12-hour format (1-12)
 * @param {string} meridiem - 'AM' or 'PM'
 * @returns {number} Hour in 24-hour format (0-23)
 *
 * @example
 * convertTo24Hour(12, 'AM')  // 0  (minuit)
 * convertTo24Hour(1, 'AM')   // 1  (1h du matin)
 * convertTo24Hour(11, 'AM')  // 11 (11h du matin)
 * convertTo24Hour(12, 'PM')  // 12 (midi)
 * convertTo24Hour(1, 'PM')   // 13 (13h)
 * convertTo24Hour(11, 'PM')  // 23 (23h)
 */
export const convertTo24Hour = ( hour, meridiem ) =>
{
    if ( meridiem === AM )
    {
        // 12 AM = minuit (0h)
        return hour === 12 ? 0 : hour ;
    }
    else if ( meridiem === PM )
    {
        // 12 PM = midi (12h), autres heures PM = heure + 12
        return hour === 12 ? 12 : hour + 12 ;
    }

    return hour ;
} ;

export default convertTo24Hour ;