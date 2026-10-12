import { GS1_PREDEFINED } from './encodeGS1_128' ;

/**
 * The GS1 separator : the character a reader writes where a FNC1 closed a
 * variable-length element (ASCII 29, « group separator »).
 *
 * @type {string}
 */
export const GS = '\u001d' ;

/**
 * The length of an application identifier, by its first two digits.
 *
 * Only the first two digits of an AI are needed to know how many it has —
 * which is how a reader splits an element string that carries no parentheses.
 * From the GS1 General Specifications ; a prefix missing here is one GS1 has not
 * assigned, and the element string cannot be split past it.
 *
 * @type {Object.<string,number>}
 */
export const GS1_AI_LENGTHS =
{
    '00' : 2 , '01' : 2 , '02' : 2 , '03' : 2 , '04' : 2 ,
    '10' : 2 , '11' : 2 , '12' : 2 , '13' : 2 , '14' : 2 , '15' : 2 , '16' : 2 , '17' : 2 , '18' : 2 , '19' : 2 ,
    '20' : 2 , '21' : 2 , '22' : 2 , '23' : 3 , '24' : 3 , '25' : 3 ,
    '30' : 2 , '31' : 4 , '32' : 4 , '33' : 4 , '34' : 4 , '35' : 4 , '36' : 4 , '37' : 2 , '39' : 4 ,
    '40' : 3 , '41' : 3 , '42' : 3 , '43' : 4 ,
    '70' : 4 , '71' : 3 , '72' : 4 ,
    '80' : 4 , '81' : 4 , '82' : 4 ,
    '90' : 2 , '91' : 2 , '92' : 2 , '93' : 2 , '94' : 2 , '95' : 2 , '96' : 2 , '97' : 2 , '98' : 2 , '99' : 2 ,
} ;

// The AIM symbology identifiers that announce GS1 data : Code 128 with FNC1 first,
// DataBar, Data Matrix, QR Code and Aztec in their GS1 modes.
const GS1_SYMBOLOGIES = new Set( [ ']C1' , ']e0' , ']d2' , ']Q3' , ']z1' , ']z2' ] ) ;

// The letter an AIM identifier starts with, by format : a prefix is only taken
// off when it names the symbology that was read.
const AIM_LETTERS =
{
    aztec       : 'z' ,
    codabar     : 'F' ,
    code_128    : 'C' ,
    code_39     : 'A' ,
    code_93     : 'G' ,
    data_matrix : 'd' ,
    ean_13      : 'E' ,
    ean_8       : 'E' ,
    itf         : 'I' ,
    pdf417      : 'L' ,
    qr_code     : 'Q' ,
    upc_a       : 'E' ,
    upc_e       : 'E' ,
} ;

const AIM_PREFIX = /^\][A-Za-z][0-9A-Za-z]/ ;

/**
 * Splits a GS1 element string as a reader returns it — AIs and data run
 * together, a separator after each variable-length element that is not last —
 * into its elements.
 *
 * @param {string} text - The data, without symbology identifier.
 * @returns {?Array<{ ai : string , data : string }>} The elements, or `null` when the string cannot be split :
 *   an unassigned AI, a fixed-length element cut short, an empty element.
 *
 * @example
 * ```js
 * splitGS1( '0109501101530003' + '10ABC' + GS + '17261231' ) ;
 * // → [ { ai : '01' , data : '09501101530003' } , { ai : '10' , data : 'ABC' } , { ai : '17' , data : '261231' } ]
 * ```
 */
export const splitGS1 = text =>
{
    const elements = [] ;

    let index = 0 ;

    while ( index < text.length )
    {
        if ( text[ index ] === GS )
        {
            index++ ;
            continue ;
        }

        const prefix = text.slice( index , index + 2 ) ;
        const size   = GS1_AI_LENGTHS[ prefix ] ;

        if ( !size || !/^[0-9]+$/.test( text.slice( index , index + size ) ) )
        {
            return null ;
        }

        const ai    = text.slice( index , index + size ) ;
        const start = index + size ;
        const fixed = GS1_PREDEFINED[ prefix ] ;

        let end ;

        if ( fixed && fixed.ai === size )
        {
            end = start + fixed.data ;

            if ( end > text.length )
            {
                return null ;
            }
        }
        else
        {
            end = text.indexOf( GS , start ) ;
            end = end === -1 ? text.length : end ;
        }

        const data = text.slice( start , end ) ;

        if ( data === '' )
        {
            return null ;
        }

        elements.push( { ai , data } ) ;
        index = end ;
    }

    return elements.length > 0 ? elements : null ;
} ;

/**
 * Joins GS1 elements into the element string a reader returns : AIs and data
 * run together, a separator after each variable-length element that is not
 * last. The inverse of `splitGS1`.
 *
 * @param {Array<{ ai : string , data : string }>} elements
 * @returns {string}
 *
 * @example
 * ```js
 * joinGS1( [ { ai : '10' , data : 'AB12' } , { ai : '17' , data : '261231' } ] ) ;
 * // → '10AB12' + GS + '17261231'
 * ```
 */
export const joinGS1 = elements => elements.map( ( { ai , data } , index ) =>
{
    const fixed = GS1_PREDEFINED[ ai.slice( 0 , 2 ) ]?.ai === ai.length ;
    const last  = index === elements.length - 1 ;
    return ai + data + ( fixed || last ? '' : GS ) ;
} ).join( '' ) ;

/**
 * Makes one reading look the same whichever engine read it.
 *
 * The engines disagree on GS1 : a native detector may put the AIM symbology
 * identifier in the text (`]C1…` on Android), ZXing keeps it apart, and the
 * standard API has no field for it at all. Here :
 *
 * - `rawValue` is the text as the engine gave it, untouched ;
 * - `value` is the data alone — no symbology identifier, no leading separator ;
 * - `symbology` is the AIM identifier, wherever it came from (`]C1`, `]E0`…), or `null` ;
 * - `gs1` says whether the code carries GS1 data — known from the identifier,
 *   from a reader's content type, or from a separator inside a Code 128 ;
 * - `elements` lists the GS1 elements `[ { ai , data } ]`, or is `null`.
 *
 * @module helpers/barcodes/normalizeScan
 *
 * @param {Object} reading
 * @param {string} reading.rawValue - The text the engine read.
 * @param {string} reading.format - The format, under the names of the Barcode Detection API.
 * @param {string} [reading.symbologyIdentifier] - The AIM identifier, when the engine gives it apart.
 * @param {string} [reading.contentType] - The reader's view of the content (`'GS1'` for ZXing).
 *
 * @returns {{ elements : ?Array<{ ai : string , data : string }> , format : string , gs1 : boolean , rawValue : string , symbology : ?string , value : string }}
 *
 * @example
 * ```js
 * normalizeScan( { format : 'code_128' , rawValue : ']C1' + '00106141411234567897' } ) ;
 * // → { value : '00106141411234567897' , symbology : ']C1' , gs1 : true ,
 * //     elements : [ { ai : '00' , data : '106141411234567897' } ] , … }
 * ```
 */
const normalizeScan = ( { contentType , format , rawValue , symbologyIdentifier } ) =>
{
    const raw = String( rawValue ?? '' ) ;

    let value     = raw ;
    let symbology = symbologyIdentifier || null ;

    const match  = raw.match( AIM_PREFIX ) ;
    const letter = AIM_LETTERS[ format ] ;

    if ( match && ( !letter || match[ 0 ][ 1 ] === letter ) )
    {
        symbology ??= match[ 0 ] ;
        value = raw.slice( match[ 0 ].length ) ;
    }

    // Some readers spell the leading FNC1 as a separator.
    const leadingSeparator = value.startsWith( GS ) ;

    if ( leadingSeparator )
    {
        value = value.slice( 1 ) ;
    }

    const gs1 = GS1_SYMBOLOGIES.has( symbology )
        || contentType === 'GS1'
        || ( format === 'code_128' && ( leadingSeparator || value.includes( GS ) ) ) ;

    return {
        elements  : gs1 ? splitGS1( value ) : null ,
        format ,
        gs1 ,
        rawValue  : raw ,
        symbology ,
        value ,
    } ;
} ;

export default normalizeScan ;
