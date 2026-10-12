import BarcodeContentError from './BarcodeContentError' ;

/**
 * The 107 Code 128 symbols, as bar / space widths in modules, bar first.
 *
 * Every symbol is 11 modules wide (three bars, three spaces) ; the stop symbol
 * (106) is 13, with its closing bar. Index = symbol value.
 *
 * @type {string[]}
 */
export const CODE128_PATTERNS =
[
    '212222' , '222122' , '222221' , '121223' , '121322' , '131222' , '122213' , '122312' , '132212' , '221213' ,
    '221312' , '231212' , '112232' , '122132' , '122231' , '113222' , '123122' , '123221' , '223211' , '221132' ,
    '221231' , '213212' , '223112' , '312131' , '311222' , '321122' , '321221' , '312212' , '322112' , '322211' ,
    '212123' , '212321' , '232121' , '111323' , '131123' , '131321' , '112313' , '132113' , '132311' , '211313' ,
    '231113' , '231311' , '112133' , '112331' , '132131' , '113123' , '113321' , '133121' , '313121' , '211331' ,
    '231131' , '213113' , '213311' , '213131' , '311123' , '311321' , '331121' , '312113' , '312311' , '332111' ,
    '314111' , '221411' , '431111' , '111224' , '111422' , '121124' , '121421' , '141122' , '141221' , '112214' ,
    '112412' , '122114' , '122411' , '142112' , '142211' , '241211' , '221114' , '413111' , '241112' , '134111' ,
    '111242' , '121142' , '121241' , '114212' , '124112' , '124211' , '411212' , '421112' , '421211' , '212141' ,
    '214121' , '412121' , '111143' , '111341' , '131141' , '114113' , '114311' , '411113' , '411311' , '113141' ,
    '114131' , '311141' , '411131' , '211412' , '211214' , '211232' , '2331112' ,
] ;

export const START_A = 103 ;
export const START_B = 104 ;
export const START_C = 105 ;
export const STOP    = 106 ;

export const CODE_A = 101 ; // in sets B and C
export const CODE_B = 100 ; // in sets A and C
export const CODE_C = 99 ;  // in sets A and B
export const FNC1   = 102 ;

const isDigit = code => code >= 48 && code <= 57 ;

const digitRun = ( codes , from ) =>
{
    let to = from ;
    while ( to < codes.length && isDigit( codes[ to ] ) )
    {
        to++ ;
    }
    return to - from ;
} ;

// Set A carries the control characters, set B the lower case : whichever is met first decides.
const prefersA = ( codes , from ) =>
{
    for ( let index = from ; index < codes.length ; index++ )
    {
        if ( codes[ index ] < 32 )
        {
            return true ;
        }
        if ( codes[ index ] >= 96 )
        {
            return false ;
        }
    }
    return false ;
} ;

const valueIn = ( set , code ) => set === 'A' && code < 32 ? code + 64 : code - 32 ;

/**
 * Turns symbol values into modules, bar first.
 *
 * @param {number[]} values
 * @returns {boolean[]}
 */
export const valuesToModules = values =>
{
    const modules = [] ;

    for ( const value of values )
    {
        const widths = CODE128_PATTERNS[ value ] ;

        for ( let index = 0 ; index < widths.length ; index++ )
        {
            const dark = index % 2 === 0 ;
            for ( let count = widths.charCodeAt( index ) - 48 ; count > 0 ; count-- )
            {
                modules.push( dark ) ;
            }
        }
    }

    return modules ;
} ;

/**
 * Appends the check symbol (weighted sum modulo 103) and the stop symbol.
 *
 * @param {number[]} values - The start symbol and the data symbols.
 * @returns {number[]}
 */
export const closeSymbols = values =>
{
    let sum = values[ 0 ] ;

    for ( let index = 1 ; index < values.length ; index++ )
    {
        sum += values[ index ] * index ;
    }

    return [ ...values , sum % 103 , STOP ] ;
} ;

/**
 * Picks the symbol values for an ASCII text, switching between the three code sets.
 *
 * Set C packs two digits in one symbol, so a run of digits long enough to pay
 * for the switch is encoded there : four at the start or the end, six in the
 * middle. Set A is used only for control characters, set B for the rest.
 *
 * @param {number[]} codes - The character codes, all below 128.
 * @param {Object} [options]
 * @param {number[]} [options.prefix=[]] - Values written right after the start symbol (FNC1 for GS1-128).
 * @returns {number[]} The start symbol and the data symbols, without check and stop.
 */
export const pickValues = ( codes , { prefix = [] } = {} ) =>
{
    const values = [] ;
    const length = codes.length ;
    const first  = digitRun( codes , 0 ) ;

    let set ;

    if ( first >= 4 || ( first === length && first >= 2 && first % 2 === 0 ) )
    {
        set = 'C' ;
        values.push( START_C ) ;
    }
    else
    {
        set = prefersA( codes , 0 ) ? 'A' : 'B' ;
        values.push( set === 'A' ? START_A : START_B ) ;
    }

    values.push( ...prefix ) ;

    let index = 0 ;

    while ( index < length )
    {
        if ( set === 'C' )
        {
            if ( index + 1 < length && isDigit( codes[ index ] ) && isDigit( codes[ index + 1 ] ) )
            {
                values.push( ( codes[ index ] - 48 ) * 10 + codes[ index + 1 ] - 48 ) ;
                index += 2 ;
                continue ;
            }

            set = prefersA( codes , index ) ? 'A' : 'B' ;
            values.push( set === 'A' ? CODE_A : CODE_B ) ;
            continue ;
        }

        const run = digitRun( codes , index ) ;

        if ( run >= 4 && ( index + run === length || run >= 6 ) )
        {
            if ( run % 2 === 1 )
            {
                values.push( valueIn( set , codes[ index ] ) ) ;
                index++ ;
            }

            set = 'C' ;
            values.push( CODE_C ) ;
            continue ;
        }

        const code = codes[ index ] ;

        if ( set === 'B' && code < 32 )
        {
            set = 'A' ;
            values.push( CODE_A ) ;
            continue ;
        }

        if ( set === 'A' && code >= 96 )
        {
            set = 'B' ;
            values.push( CODE_B ) ;
            continue ;
        }

        values.push( valueIn( set , code ) ) ;
        index++ ;
    }

    return values ;
} ;

/**
 * Encodes an ASCII text as a Code 128 barcode.
 *
 * The code sets are picked automatically (see `pickValues`), and the check
 * symbol is computed. Only ASCII (0 to 127) is carried : an accented letter is
 * refused rather than sent through the extended mode, which few scanners read.
 *
 * @module helpers/barcodes/encodeCode128
 *
 * @param {string} value - The text to encode.
 *
 * @returns {{ format : string , modules : boolean[] , quietZone : { left : number , right : number } , text : string , values : number[] }}
 *   `modules` without quiet zone, `text` the human-readable line (control characters left out),
 *   `values` the symbol values from start to stop.
 *
 * @throws {BarcodeContentError} `empty`, or `characters` for a character outside ASCII.
 *
 * @example
 * ```js
 * encodeCode128( 'ABC-1234' ).values ;
 * // → [ 104 , 33 , 34 , 35 , 13 , 99 , 12 , 34 , …check , 106 ]
 * ```
 */
const encodeCode128 = value =>
{
    const text = String( value ?? '' ) ;

    if ( text === '' )
    {
        throw new BarcodeContentError( 'Nothing to encode.' , { format : 'code_128' , reason : 'empty' } ) ;
    }

    const codes = Array.from( text , character => character.codePointAt( 0 ) ) ;

    const outside = codes.findIndex( code => code > 127 ) ;

    if ( outside !== -1 )
    {
        const character = String.fromCodePoint( codes[ outside ] ) ;
        throw new BarcodeContentError( `Code 128 carries ASCII only : « ${ character } » is not.` ,
        {
            data   : { character , position : outside } ,
            format : 'code_128' ,
            reason : 'characters' ,
        } ) ;
    }

    const values = closeSymbols( pickValues( codes ) ) ;

    return {
        format    : 'code_128' ,
        modules   : valuesToModules( values ) ,
        quietZone : { left : 10 , right : 10 } ,
        text      : Array.from( text ).filter( character => character >= ' ' && character !== '\u007f' ).join( '' ) ,
        values ,
    } ;
} ;

export default encodeCode128 ;
