import BarcodeContentError from './BarcodeContentError' ;
import gs1CheckDigit       from './gs1CheckDigit' ;

/**
 * The three digit sets of the EAN / UPC family, 7 modules per digit.
 *
 * `L` (odd parity) and `G` (even parity) fill the left half, `R` the right
 * half. `R` is `L` inverted, `G` is `R` reversed.
 *
 * @type {{ L : string[] , G : string[] , R : string[] }}
 */
export const EAN_DIGITS =
{
    L : [ '0001101' , '0011001' , '0010011' , '0111101' , '0100011' , '0110001' , '0101111' , '0111011' , '0110111' , '0001011' ] ,
    G : [ '0100111' , '0110011' , '0011011' , '0100001' , '0011101' , '0111001' , '0000101' , '0010001' , '0001001' , '0010111' ] ,
    R : [ '1110010' , '1100110' , '1101100' , '1000010' , '1011100' , '1001110' , '1010000' , '1000100' , '1001000' , '1110100' ] ,
} ;

/**
 * In an EAN-13, the first digit is not drawn : it is told by the L / G parity
 * of the six digits of the left half.
 *
 * @type {string[]}
 */
export const EAN13_PARITY =
[
    'LLLLLL' , 'LLGLGG' , 'LLGGLG' , 'LLGGGL' , 'LGLLGG' , 'LGGLLG' , 'LGGGLL' , 'LGLGLG' , 'LGLGGL' , 'LGGLGL' ,
] ;

const GUARD  = '101' ;
const CENTER = '01010' ;

const toModules = bits => Array.from( bits , bit => bit === '1' ) ;

/**
 * Checks a string of digits, completes or verifies its check digit.
 *
 * @param {string} format
 * @param {string} value
 * @param {number} length - The full length, check digit included.
 * @returns {string} The full number, check digit included.
 */
const complete = ( format , value , length ) =>
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

const center = ( from , index ) => from + 7 * index + 3.5 ;

/**
 * Encodes an EAN-13 : 12 digits (the check digit is computed) or 13 (it is verified).
 *
 * @param {string} value
 * @returns {Object} The encoded symbol — see {@link module:helpers/barcodes/encodeBarcode}.
 * @throws {BarcodeContentError}
 *
 * @example
 * ```js
 * encodeEAN13( '400638133393' ).text ; // → '4006381333931'
 * ```
 */
export const encodeEAN13 = value =>
{
    const number = complete( 'ean_13' , value , 13 ) ;
    const digits = Array.from( number , Number ) ;
    const parity = EAN13_PARITY[ digits[ 0 ] ] ;

    const left  = digits.slice( 1 , 7 ).map( ( digit , index ) => EAN_DIGITS[ parity[ index ] ][ digit ] ).join( '' ) ;
    const right = digits.slice( 7 ).map( digit => EAN_DIGITS.R[ digit ] ).join( '' ) ;

    return {
        format    : 'ean_13' ,
        modules   : toModules( GUARD + left + CENTER + right + GUARD ) ,
        quietZone : { left : 11 , right : 7 } ,
        text      : number ,
        retail    :
        {
            extended : [ [ 0 , 3 ] , [ 45 , 50 ] , [ 92 , 95 ] ] ,
            digits   :
            [
                { value : number[ 0 ] , x : -4 } ,
                ...digits.slice( 1 , 7 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 3 , index ) } ) ) ,
                ...digits.slice( 7 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 50 , index ) } ) ) ,
            ] ,
        } ,
    } ;
} ;

/**
 * Encodes an EAN-8 : 7 digits (the check digit is computed) or 8 (it is verified).
 *
 * @param {string} value
 * @returns {Object} The encoded symbol — see {@link module:helpers/barcodes/encodeBarcode}.
 * @throws {BarcodeContentError}
 */
export const encodeEAN8 = value =>
{
    const number = complete( 'ean_8' , value , 8 ) ;
    const digits = Array.from( number , Number ) ;

    const left  = digits.slice( 0 , 4 ).map( digit => EAN_DIGITS.L[ digit ] ).join( '' ) ;
    const right = digits.slice( 4 ).map( digit => EAN_DIGITS.R[ digit ] ).join( '' ) ;

    return {
        format    : 'ean_8' ,
        modules   : toModules( GUARD + left + CENTER + right + GUARD ) ,
        quietZone : { left : 7 , right : 7 } ,
        text      : number ,
        retail    :
        {
            extended : [ [ 0 , 3 ] , [ 31 , 36 ] , [ 64 , 67 ] ] ,
            digits   :
            [
                ...digits.slice( 0 , 4 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 3 , index ) } ) ) ,
                ...digits.slice( 4 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 36 , index ) } ) ) ,
            ] ,
        } ,
    } ;
} ;

/**
 * Encodes a UPC-A : 11 digits (the check digit is computed) or 12 (it is verified).
 *
 * The same bars as the EAN-13 of the same number with a leading `0` — which
 * is why every EAN scanner reads it — but laid out its own way : the first and
 * last digits are printed small, outside the bars, and their bars run as long
 * as the guards.
 *
 * @param {string} value
 * @returns {Object} The encoded symbol — see {@link module:helpers/barcodes/encodeBarcode}.
 * @throws {BarcodeContentError}
 */
export const encodeUPCA = value =>
{
    const number = complete( 'upc_a' , value , 12 ) ;
    const digits = Array.from( number , Number ) ;

    const left  = digits.slice( 0 , 6 ).map( digit => EAN_DIGITS.L[ digit ] ).join( '' ) ;
    const right = digits.slice( 6 ).map( digit => EAN_DIGITS.R[ digit ] ).join( '' ) ;

    return {
        format    : 'upc_a' ,
        modules   : toModules( GUARD + left + CENTER + right + GUARD ) ,
        quietZone : { left : 9 , right : 9 } ,
        text      : number ,
        retail    :
        {
            extended : [ [ 0 , 10 ] , [ 45 , 50 ] , [ 85 , 95 ] ] ,
            digits   :
            [
                { value : number[ 0 ] , x : -4.5 , small : true } ,
                ...digits.slice( 1 , 6 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 10 , index ) } ) ) ,
                ...digits.slice( 6 , 11 ).map( ( digit , index ) => ( { value : String( digit ) , x : center( 50 , index ) } ) ) ,
                { value : number[ 11 ] , x : 99.5 , small : true } ,
            ] ,
        } ,
    } ;
} ;
