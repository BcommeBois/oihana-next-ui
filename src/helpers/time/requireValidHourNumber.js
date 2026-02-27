import isInt from 'vegas-js-core/src/isInt'

/**
 * Validate that a number is a valid hour.
 *
 * @param {number} number - Hour number to validate
 * @param {boolean} [ampm=false] - Use 12-hour format (1-12) or 24-hour format (0-23)
 * @returns {number} The validated number
 * @throws {RangeError} If number is invalid
 *
 * @example
 * requireValidHourNumber(14)          // 14
 * requireValidHourNumber(2, true)     // 2
 * requireValidHourNumber(25)          // throws RangeError
 * requireValidHourNumber(0, true)     // throws RangeError (12h format requires 1-12)
 */
const requireValidHourNumber = ( number , ampm = false ) =>
{
    const min = ampm ?  1 :  0 ;
    const max = ampm ? 12 : 23 ;
    if ( !isInt(number) || number < min || number > max )
    {
        throw new RangeError( `Expected a valid hour number (${min}..${max}), got ${number}.` ) ;
    }
    return number ;
}

export default requireValidHourNumber ;