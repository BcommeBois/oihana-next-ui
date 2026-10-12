/**
 * The GS1 check digit of a string of digits (modulo 10).
 *
 * Shared by every GS1 number : EAN-13, EAN-8, UPC-A, ITF-14, and the GTIN or
 * SSCC carried in a GS1-128. From the rightmost digit, weights alternate 3 and
 * 1 ; the check digit brings the sum to the next multiple of ten.
 *
 * @module helpers/barcodes/gs1CheckDigit
 *
 * @param {string} digits - The digits WITHOUT their check digit.
 * @returns {number} The check digit, 0 to 9.
 *
 * @example
 * ```js
 * gs1CheckDigit( '400638133393' ) ; // → 1  (EAN-13 4006381333931)
 * gs1CheckDigit( '9638507' ) ;      // → 4  (EAN-8 96385074)
 * ```
 */
const gs1CheckDigit = digits =>
{
    let sum = 0 ;

    for ( let index = 0 ; index < digits.length ; index++ )
    {
        const digit = digits.charCodeAt( digits.length - 1 - index ) - 48 ;
        sum += digit * ( index % 2 === 0 ? 3 : 1 ) ;
    }

    return ( 10 - ( sum % 10 ) ) % 10 ;
} ;

export default gs1CheckDigit ;
