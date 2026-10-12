import BarcodeContentError from './BarcodeContentError' ;

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

/**
 * Checks a GS1 number, then completes or verifies its check digit.
 *
 * With one digit short of `length`, the check digit is computed and appended ;
 * with `length` digits, the last one is verified.
 *
 * @param {string} format
 * @param {string} value
 * @param {number} length - The full length, check digit included.
 * @returns {string} The full number, check digit included.
 * @throws {BarcodeContentError} `empty`, `characters`, `length` or `checkDigit`.
 */
export const completeGS1Number = ( format , value , length ) =>
{
    const digits = String( value ?? '' ).trim() ;

    if ( digits === '' )
    {
        throw new BarcodeContentError( 'Nothing to encode.' , { format , reason : 'empty' } ) ;
    }

    if ( !/^[0-9]+$/.test( digits ) )
    {
        throw new BarcodeContentError( `${ format } carries digits only.` , { format , reason : 'characters' } ) ;
    }

    if ( digits.length === length - 1 )
    {
        return digits + gs1CheckDigit( digits ) ;
    }

    if ( digits.length !== length )
    {
        throw new BarcodeContentError( `${ format } takes ${ length - 1 } digits, or ${ length } with the check digit : ${ digits.length } given.` ,
        {
            data   : { expected : [ length - 1 , length ] , length : digits.length } ,
            format ,
            reason : 'length' ,
        } ) ;
    }

    const expected = gs1CheckDigit( digits.slice( 0 , -1 ) ) ;

    if ( Number( digits.at( -1 ) ) !== expected )
    {
        throw new BarcodeContentError( `The check digit of ${ digits } should be ${ expected }.` ,
        {
            data   : { expected , given : Number( digits.at( -1 ) ) } ,
            format ,
            reason : 'checkDigit' ,
        } ) ;
    }

    return digits ;
} ;

export default gs1CheckDigit ;
