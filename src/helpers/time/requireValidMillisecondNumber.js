import isInt from 'vegas-js-core/src/isInt';

/**
 * Validate that a number is a valid millisecond (0-999).
 *
 * @param {number} number - Millisecond number to validate
 * @returns {number} The validated number
 * @throws {RangeError} If number is invalid
 *
 * @example
 * requireValidMillisecondNumber(500)   // 500
 * requireValidMillisecondNumber(0)     // 0
 * requireValidMillisecondNumber(999)   // 999
 * requireValidMillisecondNumber(1000)  // throws RangeError
 */
const requireValidMillisecondNumber = number =>
{
    if ( !isInt(number) || number < 0 || number > 999 )
    {
        throw new RangeError( `Expected a valid millisecond number (0..999), got ${number}.` ) ;
    }
    return number ;
}

export default requireValidMillisecondNumber ;