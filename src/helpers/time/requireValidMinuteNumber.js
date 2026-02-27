import isInt from 'vegas-js-core/src/isInt'

/**
 * Validate that a number is a valid minute (0-59).
 *
 * @param {number} number - Minute number to validate
 * @returns {number} The validated number
 * @throws {RangeError} If number is invalid
 *
 * @example
 * requireValidMinuteNumber(30)  // 30
 * requireValidMinuteNumber(0)   // 0
 * requireValidMinuteNumber(59)  // 59
 * requireValidMinuteNumber(60)  // throws RangeError
 */
const requireValidMinuteNumber = number =>
{
    if ( !isInt(number) || number < 0 || number > 59 )
    {
        throw new RangeError( `Expected a valid minute number (0..59), got ${number}.` ) ;
    }
    return number ;
}

export default requireValidMinuteNumber ;