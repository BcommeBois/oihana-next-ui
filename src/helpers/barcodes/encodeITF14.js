import { completeGS1Number } from './gs1CheckDigit' ;

/**
 * Interleaved 2 of 5 : every digit as five elements, two of them wide.
 *
 * In a pair of digits, the first is drawn by the five bars, the second by the
 * five spaces between them.
 *
 * @type {string[]}
 */
export const ITF_DIGITS =
[
    'nnwwn' , 'wnnnw' , 'nwnnw' , 'wwnnn' , 'nnwnw' , 'wnwnn' , 'nwwnn' , 'nnnww' , 'wnnwn' , 'nwnwn' ,
] ;

/**
 * The widths of a narrow and a wide element, in units.
 *
 * 🔑 A ratio of 2.5, the one GS1 aims at for ITF-14 : drawn on a grid twice as
 * fine as the narrow bar, so both widths stay whole.
 *
 * @type {{ n : number , w : number }}
 */
export const ITF_WIDTHS = { n : 2 , w : 5 } ;

const START = 'nnnn' ;
const STOP  = 'wnn' ;

const push = ( modules , widths , dark ) =>
{
    for ( let count = ITF_WIDTHS[ widths ] ; count > 0 ; count-- )
    {
        modules.push( dark ) ;
    }
} ;

/**
 * Encodes an ITF-14 : 13 digits (the check digit is computed) or 14 (it is verified).
 *
 * The code of cartons and trade units. One unit is half a narrow bar, so the
 * quiet zone of ten narrow bars is twenty units, and the bearer bars — two
 * narrow bars thick — four.
 *
 * ⚠️ A scanner reports an ITF-14 as `itf` : the Barcode Detection API names the
 * symbology, not its GS1 use.
 *
 * @module helpers/barcodes/encodeITF14
 *
 * @param {string} value
 * @returns {Object} The encoded symbol — see {@link module:helpers/barcodes/encodeBarcode} — with a `bearer` thickness.
 * @throws {BarcodeContentError} `empty`, `characters`, `length` or `checkDigit`.
 *
 * @example
 * ```js
 * encodeITF14( '1540014128876' ).text ; // → '15400141288763'
 * ```
 */
const encodeITF14 = value =>
{
    const number  = completeGS1Number( 'itf_14' , value , 14 ) ;
    const modules = [] ;

    Array.from( START ).forEach( ( width , index ) =>
    {
        push( modules , width , index % 2 === 0 ) ;
    } ) ;

    for ( let index = 0 ; index < number.length ; index += 2 )
    {
        const bars   = ITF_DIGITS[ number.charCodeAt( index ) - 48 ] ;
        const spaces = ITF_DIGITS[ number.charCodeAt( index + 1 ) - 48 ] ;

        for ( let element = 0 ; element < 5 ; element++ )
        {
            push( modules , bars[ element ] , true ) ;
            push( modules , spaces[ element ] , false ) ;
        }
    }

    Array.from( STOP ).forEach( ( width , index ) =>
    {
        push( modules , width , index % 2 === 0 ) ;
    } ) ;

    return {
        bearer    : { thickness : 2 * ITF_WIDTHS.n } ,
        format    : 'itf_14' ,
        modules ,
        quietZone : { left : 10 * ITF_WIDTHS.n , right : 10 * ITF_WIDTHS.n } ,
        text      : number ,
    } ;
} ;

export default encodeITF14 ;
