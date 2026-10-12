/**
 * Whether a number passes the Luhn check — the checksum every payment card
 * carries, which catches a mistyped digit or two swapped neighbours before
 * anything is sent.
 *
 * From the rightmost digit, every second one is doubled, nine taken off when
 * it passes nine, and the sum must end in 0. Not to be confused with
 * {@link module:helpers/barcodes/gs1CheckDigit} : modulo 10 as well, but
 * weighted 3 and 1.
 *
 * Spaces and separators are ignored ; fewer than 12 digits is never a card.
 *
 * @module helpers/validators/isLuhn
 *
 * @param {string|number} value
 * @returns {boolean}
 *
 * @example
 * ```js
 * isLuhn( '4242 4242 4242 4242' ) ; // true
 * isLuhn( '4242 4242 4242 4241' ) ; // false
 * ```
 */
const isLuhn = value =>
{
    const digits = String( value ?? '' ).replace( /\D/g , '' ) ;

    if ( digits.length < 12 )
    {
        return false ;
    }

    let sum = 0 ;

    for ( let index = 0 ; index < digits.length ; index++ )
    {
        let digit = digits.charCodeAt( digits.length - 1 - index ) - 48 ;

        if ( index % 2 === 1 )
        {
            digit *= 2 ;
            if ( digit > 9 )
            {
                digit -= 9 ;
            }
        }

        sum += digit ;
    }

    return sum % 10 === 0 ;
} ;

export default isLuhn ;
