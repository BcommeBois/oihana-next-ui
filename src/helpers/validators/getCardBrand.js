/**
 * The card brands recognised, with what each one implies : how its number is
 * grouped, how long it may be, and how long its security code is.
 *
 * A French « CB » card is also a Visa or a Mastercard, and is read as such.
 *
 * @type {Array<{ type : string , test : RegExp , pattern : number[] , lengths : number[] , cvvLength : number }>}
 */
export const CARD_BRANDS =
[
    { cvvLength : 3 , lengths : [ 16 ] , pattern : [ 4 , 4 , 4 , 4 ] , test : /^4/ , type : 'visa' } ,
    // 51–55, and the 2-series : 2221–2720.
    { cvvLength : 3 , lengths : [ 16 ] , pattern : [ 4 , 4 , 4 , 4 ] , test : /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/ , type : 'mastercard' } ,
    { cvvLength : 4 , lengths : [ 15 ] , pattern : [ 4 , 6 , 5 ] , test : /^3[47]/ , type : 'amex' } ,
    { cvvLength : 3 , lengths : [ 16 ] , pattern : [ 4 , 4 , 4 , 4 ] , test : /^6(011|5)/ , type : 'discover' } ,
] ;

/** What a number no brand recognises is held to. */
const UNKNOWN = { cvvLength : 3 , lengths : [ 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 ] , pattern : [ 4 , 4 , 4 , 4 ] , type : 'unknown' } ;

/**
 * The brand of a card number, from its first digits.
 *
 * Spaces and separators are ignored, so a masked value reads as well as a raw
 * one. A number too short to tell, or of a brand not listed, is `unknown` :
 * held to the lengths every card may have, 12 to 19 digits.
 *
 * @module helpers/validators/getCardBrand
 *
 * @param {string} value - The number, whole or partly typed.
 * @returns {{ type : string , pattern : number[] , lengths : number[] , cvvLength : number }}
 *
 * @example
 * ```js
 * getCardBrand( '3782 822463 10005' ) ; // { type : 'amex' , pattern : [ 4 , 6 , 5 ] , lengths : [ 15 ] , cvvLength : 4 }
 * getCardBrand( '42' ).type ;          // 'visa'
 * ```
 */
const getCardBrand = value =>
{
    const digits = String( value ?? '' ).replace( /\D/g , '' ) ;
    const brand  = CARD_BRANDS.find( ( { test } ) => test.test( digits ) ) ;

    if ( !brand )
    {
        return { ...UNKNOWN } ;
    }

    const { test : _test , ...rest } = brand ;
    return rest ;
} ;

export default getCardBrand ;
