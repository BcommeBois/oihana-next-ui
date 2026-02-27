import isInt from 'vegas-js-core/src/isInt'

/**
 * Validate that a number is a valid second (0-59).
 *
 * @param {number} number - Second number to validate
 * @returns {number} The validated number
 * @throws {RangeError} If number is invalid
 *
 * @example
 * requireValidSecondNumber(30)  // 30
 * requireValidSecondNumber(0)   // 0
 * requireValidSecondNumber(59)  // 59
 * requireValidSecondNumber(60)  // throws RangeError
 */
const requireValidSecondNumber = number =>
{
    if ( !isInt(number) || number < 0 || number > 59 )
    {
        throw new RangeError( `Expected a valid second number (0..59), got ${number}.` ) ;
    }
    return number ;
}

export default requireValidSecondNumber ;