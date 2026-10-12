import getCardBrand from './getCardBrand' ;
import isLuhn       from './isLuhn' ;

/**
 * Whether a card number is one a payment could be attempted with : a length
 * its brand allows, and the Luhn check.
 *
 * It says nothing of whether the card exists, has funds or is expired — only
 * the bank knows that. It catches what a reader mistyped.
 *
 * @module helpers/validators/isCardNumber
 *
 * @param {string} value - The number, spaces allowed.
 * @returns {boolean}
 *
 * @example
 * ```js
 * isCardNumber( '4242 4242 4242 4242' ) ; // true
 * isCardNumber( '4242 4242 4242' ) ;      // false : too short for a Visa
 * ```
 */
const isCardNumber = value =>
{
    const digits = String( value ?? '' ).replace( /\D/g , '' ) ;
    return getCardBrand( digits ).lengths.includes( digits.length ) && isLuhn( digits ) ;
} ;

export default isCardNumber ;
