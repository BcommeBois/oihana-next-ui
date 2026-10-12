import BarcodeContentError from './BarcodeContentError' ;
import gs1CheckDigit       from './gs1CheckDigit' ;

import { FNC1 , FNC1_MARK , closeSymbols , pickValues , valuesToModules } from './encodeCode128' ;

const FORMAT = 'gs1_128' ;

/**
 * The most data characters a GS1-128 carries, application identifiers included.
 *
 * @type {number}
 */
export const GS1_128_MAX_LENGTH = 48 ;

/**
 * The application identifiers of predefined length, by their first two digits :
 * the number of digits of the AI, and of its data. These need no FNC1 separator
 * after them ; every other AI does, unless it comes last.
 *
 * @type {Object.<string,{ ai : number , data : number }>}
 */
export const GS1_PREDEFINED =
{
    '00' : { ai : 2 , data : 18 } ,
    '01' : { ai : 2 , data : 14 } ,
    '02' : { ai : 2 , data : 14 } ,
    '03' : { ai : 2 , data : 14 } ,
    '04' : { ai : 2 , data : 16 } ,
    '11' : { ai : 2 , data : 6 } ,
    '12' : { ai : 2 , data : 6 } ,
    '13' : { ai : 2 , data : 6 } ,
    '14' : { ai : 2 , data : 6 } ,
    '15' : { ai : 2 , data : 6 } ,
    '16' : { ai : 2 , data : 6 } ,
    '17' : { ai : 2 , data : 6 } ,
    '18' : { ai : 2 , data : 6 } ,
    '19' : { ai : 2 , data : 6 } ,
    '20' : { ai : 2 , data : 2 } ,
    '31' : { ai : 4 , data : 6 } ,
    '32' : { ai : 4 , data : 6 } ,
    '33' : { ai : 4 , data : 6 } ,
    '34' : { ai : 4 , data : 6 } ,
    '35' : { ai : 4 , data : 6 } ,
    '36' : { ai : 4 , data : 6 } ,
    '41' : { ai : 3 , data : 13 } ,
} ;

/**
 * Common application identifiers of variable length : the most characters
 * their data takes, and whether only digits are allowed. An AI missing here is
 * accepted as variable, its data held to the GS1 character set alone.
 *
 * @type {Object.<string,{ max : number , numeric ?: boolean }>}
 */
export const GS1_VARIABLE =
{
    '10'  : { max : 20 } ,                  // batch or lot
    '21'  : { max : 20 } ,                  // serial number
    '22'  : { max : 20 } ,                  // consumer product variant
    '30'  : { max : 8  , numeric : true } , // variable count
    '37'  : { max : 8  , numeric : true } , // count of trade items
    '240' : { max : 30 } ,                  // additional product identification
    '241' : { max : 30 } ,                  // customer part number
    '250' : { max : 30 } ,                  // secondary serial number
    '400' : { max : 30 } ,                  // customer's purchase order number
    '401' : { max : 30 } ,                  // global identification number for consignment
    '402' : { max : 17 , numeric : true } , // global shipment identification number
    '403' : { max : 30 } ,                  // routing code
    '420' : { max : 20 } ,                  // ship to postal code
} ;

// AIs whose data ends with a GS1 check digit : SSCC, GTIN, and the GLNs of 410 to 417.
const CHECKED = /^(0[0-2]|41[0-7])$/ ;

// GS1 « CSET 82 », the characters an alphanumeric AI may carry. The parentheses are left out : they delimit the AIs here.
const CSET82 = /^[!"%&'*+,\-./0-9:;<=>?A-Z_a-z]*$/ ;

const ELEMENT = /\((\d{2,4})\)([^()]*)/y ;

const fail = ( message , reason , data ) => new BarcodeContentError( message , { data , format : FORMAT , reason } ) ;

/**
 * Splits `(01)09501101530003(10)ABC` into `[ { ai , data } ]`.
 *
 * @param {string} text
 * @returns {Array<{ ai : string , data : string }>}
 */
export const parseGS1 = text =>
{
    const elements = [] ;

    ELEMENT.lastIndex = 0 ;

    while ( ELEMENT.lastIndex < text.length )
    {
        const from  = ELEMENT.lastIndex ;
        const match = ELEMENT.exec( text ) ;

        if ( !match )
        {
            throw fail( `Expected an application identifier in parentheses, such as (01), at « ${ text.slice( from , from + 12 ) } ».` , 'syntax' , { position : from } ) ;
        }

        const [ , ai , data ] = match ;

        if ( data === '' )
        {
            throw fail( `The application identifier (${ ai }) has no data.` , 'syntax' , { ai } ) ;
        }

        elements.push( { ai , data } ) ;
    }

    return elements ;
} ;

/**
 * Checks one element against what GS1 says of its AI.
 *
 * @param {{ ai : string , data : string }} element
 * @returns {boolean} Whether the AI is of predefined length.
 */
const check = ( { ai , data } ) =>
{
    const predefined = GS1_PREDEFINED[ ai.slice( 0 , 2 ) ] ;

    if ( predefined )
    {
        if ( ai.length !== predefined.ai )
        {
            throw fail( `(${ ai }) : an AI starting with ${ ai.slice( 0 , 2 ) } has ${ predefined.ai } digits.` , 'syntax' , { ai } ) ;
        }

        if ( !/^[0-9]+$/.test( data ) )
        {
            throw fail( `(${ ai }) carries digits only.` , 'characters' , { ai } ) ;
        }

        if ( data.length !== predefined.data )
        {
            throw fail( `(${ ai }) takes ${ predefined.data } digits : ${ data.length } given.` , 'length' , { ai , expected : predefined.data , length : data.length } ) ;
        }

        if ( CHECKED.test( ai ) )
        {
            const expected = gs1CheckDigit( data.slice( 0 , -1 ) ) ;
            const given    = Number( data.at( -1 ) ) ;

            if ( given !== expected )
            {
                throw fail( `(${ ai }) : the check digit of ${ data } should be ${ expected }.` , 'checkDigit' , { ai , expected , given } ) ;
            }
        }

        return true ;
    }

    const variable = GS1_VARIABLE[ ai ] ;

    if ( variable?.numeric && !/^[0-9]+$/.test( data ) )
    {
        throw fail( `(${ ai }) carries digits only.` , 'characters' , { ai } ) ;
    }

    if ( !CSET82.test( data ) )
    {
        const character = Array.from( data ).find( item => !CSET82.test( item ) ) ;
        throw fail( `(${ ai }) : « ${ character } » is not a GS1 character.` , 'characters' , { ai , character } ) ;
    }

    if ( variable && data.length > variable.max )
    {
        throw fail( `(${ ai }) takes ${ variable.max } characters at most : ${ data.length } given.` , 'length' , { ai , expected : variable.max , length : data.length } ) ;
    }

    return false ;
} ;

/**
 * Encodes a GS1-128 barcode from its element string.
 *
 * The input is written as on a label, every application identifier in
 * parentheses : `(00)106141411234567897`, `(01)09501101530003(17)261231(10)LOT-42`.
 * The encoder writes FNC1 right after the start symbol — what makes a Code 128
 * a GS1-128 — and a FNC1 separator after every AI of variable length that is
 * not the last. The order of the AIs is kept as given.
 *
 * What it checks : for the AIs of predefined length (`GS1_PREDEFINED`), the
 * exact length, digits only, and the check digit of (00), (01), (02) and (410)
 * to (417) ; for the common variable AIs (`GS1_VARIABLE`), their maximum length
 * and kind ; for any other AI, the GS1 character set ; and 48 data characters
 * at most, AIs included.
 *
 * ⚠️ A scanner reports a GS1-128 as `code_128` : the Barcode Detection API does
 * not tell the two apart. The FNC1 after the start symbol is what does.
 *
 * @module helpers/barcodes/encodeGS1_128
 *
 * @param {string} value - The element string, AIs in parentheses.
 * @param {Object} [options]
 * @param {'spaced'|'compact'} [options.gs1Text='spaced'] - The human-readable line : `(01) 09501101530003 (10) ABC`, or as typed.
 *
 * @returns {Object} The encoded symbol — see {@link module:helpers/barcodes/encodeBarcode} — with its `elements` and `values`.
 *
 * @throws {BarcodeContentError} `empty`, `syntax`, `characters`, `length` or `checkDigit`, with the offending `ai` in `data`.
 *
 * @example
 * ```js
 * encodeGS1_128( '(01)09501101530003(10)ABC123' ).text ;
 * // → '(01) 09501101530003 (10) ABC123'
 * ```
 */
const encodeGS1_128 = ( value , { gs1Text = 'spaced' } = {} ) =>
{
    const text = String( value ?? '' ).trim() ;

    if ( text === '' )
    {
        throw fail( 'Nothing to encode.' , 'empty' , {} ) ;
    }

    const elements = parseGS1( text ) ;
    const fixed    = elements.map( check ) ;

    const length = elements.reduce( ( sum , { ai , data } ) => sum + ai.length + data.length , 0 ) ;

    if ( length > GS1_128_MAX_LENGTH )
    {
        throw fail( `A GS1-128 carries ${ GS1_128_MAX_LENGTH } data characters at most : ${ length } given.` , 'length' , { expected : GS1_128_MAX_LENGTH , length } ) ;
    }

    const codes = [] ;

    elements.forEach( ( { ai , data } , index ) =>
    {
        codes.push( ...Array.from( ai + data , character => character.charCodeAt( 0 ) ) ) ;

        if ( !fixed[ index ] && index < elements.length - 1 )
        {
            codes.push( FNC1_MARK ) ;
        }
    } ) ;

    const values = closeSymbols( pickValues( codes , { prefix : [ FNC1 ] } ) ) ;

    return {
        elements ,
        format    : FORMAT ,
        modules   : valuesToModules( values ) ,
        quietZone : { left : 10 , right : 10 } ,
        text      : elements.map( ( { ai , data } ) => ( gs1Text === 'compact' ? `(${ ai })${ data }` : `(${ ai }) ${ data }` ) ).join( gs1Text === 'compact' ? '' : ' ' ) ,
        values ,
    } ;
} ;

export default encodeGS1_128 ;
