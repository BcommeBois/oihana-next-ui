import clip         from 'vegas-js-core/src/numbers/clip' ;
import isUint       from 'vegas-js-core/src/isUint' ;
import padTo2Digits from 'vegas-js-core/src/numbers/padTo2Digits' ;
import padTo3Digits from 'vegas-js-core/src/numbers/padTo3Digits' ;

import meridies, { AM, PM } from './meridies' ;

export { AM , PM , meridies } ;

/**
 * Format time components into a time string.
 *
 * @param {Object} options - Time components
 * @param {number} [options.hour] - Hour (0-23 for 24h, 1-12 for 12h)
 * @param {number} [options.minute] - Minute (0-59)
 * @param {number} [options.second] - Second (0-59)
 * @param {number} [options.millisecond] - Millisecond (0-999)
 * @param {string} [options.meridiem] - 'AM' or 'PM'
 * @param {boolean} [options.ampm=false] - Use 12-hour format
 * @returns {string} Formatted time string
 *
 * @example
 * formatTime({ hour: 14, minute: 30 })
 * // "14:30"
 *
 * @example
 * formatTime({ hour: 2, minute: 30, meridiem: 'PM', ampm: true })
 * // "02:30 PM"
 *
 * @example
 * formatTime({ hour: 23, minute: 59, second: 59, millisecond: 999 })
 * // "23:59:59.999"
 */
const formatTime = ({ hour, minute, second, millisecond, meridiem, ampm = false } = {}) =>
{
    const parts = [] ;

    // Hour
    if ( isUint( hour ) )
    {
        parts.push( padTo2Digits( clip( hour, ampm ? 1 : 0, ampm ? 12 : 23 ) ) ) ;
    }

    // Minute
    if ( isUint( minute ) )
    {
        parts.push( padTo2Digits( clip( minute, 0, 59 ) ) ) ;
    }

    // Seconde
    if ( isUint( second ) )
    {
        parts.push( padTo2Digits( clip( second, 0, 59 ) ) ) ;
    }

    let value = parts.join( ':' ) ;

    // Milliseconde
    if ( isUint( millisecond ) )
    {
        value += `.${padTo3Digits( clip( millisecond, 0, 999 ) )}` ;
    }

    // Meridiem (AM/PM)
    if ( ampm && ( meridiem === AM || meridiem === PM ) )
    {
        value += ` ${meridiem}` ;
    }

    return value ;
} ;

export default formatTime ;