import { describe , expect , test } from 'bun:test' ;

import getCardBrand from '../../../src/helpers/validators/getCardBrand' ;
import isCardExpiry from '../../../src/helpers/validators/isCardExpiry' ;
import isCardNumber from '../../../src/helpers/validators/isCardNumber' ;
import isLuhn       from '../../../src/helpers/validators/isLuhn' ;

/** Public test numbers : they pass the Luhn check and match no account. */
const VISA       = '4242 4242 4242 4242' ;
const MASTERCARD = '5555 5555 5555 4444' ;
const MC_2SERIES = '2223 0031 2200 3222' ;
const AMEX       = '3782 822463 10005' ;
const DISCOVER   = '6011 1111 1111 1117' ;

describe( 'isLuhn' , () =>
{
    test( 'the public test numbers pass' , () =>
    {
        for ( const number of [ VISA , MASTERCARD , MC_2SERIES , AMEX , DISCOVER ] )
        {
            expect( isLuhn( number ) ).toBe( true ) ;
        }
    } ) ;

    test( 'one digit wrong, or two neighbours swapped, fails' , () =>
    {
        expect( isLuhn( '4242 4242 4242 4241' ) ).toBe( false ) ;
        expect( isLuhn( '4242 4242 4242 2442' ) ).toBe( false ) ;
    } ) ;

    test( 'separators are ignored, fewer than 12 digits is never a card' , () =>
    {
        expect( isLuhn( '4242-4242-4242-4242' ) ).toBe( true ) ;
        expect( isLuhn( 4242424242424242 ) ).toBe( true ) ;
        expect( isLuhn( '0000 0000 00' ) ).toBe( false ) ;
        expect( isLuhn( '' ) ).toBe( false ) ;
        expect( isLuhn( undefined ) ).toBe( false ) ;
    } ) ;
} ) ;

describe( 'getCardBrand' , () =>
{
    test( 'the brand from the first digits' , () =>
    {
        expect( getCardBrand( VISA ).type ).toBe( 'visa' ) ;
        expect( getCardBrand( MASTERCARD ).type ).toBe( 'mastercard' ) ;
        expect( getCardBrand( MC_2SERIES ).type ).toBe( 'mastercard' ) ;
        expect( getCardBrand( AMEX ).type ).toBe( 'amex' ) ;
        expect( getCardBrand( DISCOVER ).type ).toBe( 'discover' ) ;
        expect( getCardBrand( '42' ).type ).toBe( 'visa' ) ;
    } ) ;

    test( 'the 2-series of Mastercard is 2221 to 2720, and no further' , () =>
    {
        expect( getCardBrand( '2221' ).type ).toBe( 'mastercard' ) ;
        expect( getCardBrand( '2720' ).type ).toBe( 'mastercard' ) ;
        expect( getCardBrand( '2220' ).type ).toBe( 'unknown' ) ;
        expect( getCardBrand( '2721' ).type ).toBe( 'unknown' ) ;
    } ) ;

    test( 'what the brand implies : grouping, lengths, security code' , () =>
    {
        expect( getCardBrand( AMEX ) ).toEqual( { cvvLength : 4 , lengths : [ 15 ] , pattern : [ 4 , 6 , 5 ] , type : 'amex' } ) ;
        expect( getCardBrand( VISA ) ).toEqual( { cvvLength : 3 , lengths : [ 16 ] , pattern : [ 4 , 4 , 4 , 4 ] , type : 'visa' } ) ;
    } ) ;

    test( 'a number of no brand is held to every card length' , () =>
    {
        const unknown = getCardBrand( '9' ) ;
        expect( unknown.type ).toBe( 'unknown' ) ;
        expect( unknown.lengths ).toEqual( [ 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 ] ) ;
        expect( getCardBrand( '' ).type ).toBe( 'unknown' ) ;
    } ) ;
} ) ;

describe( 'isCardNumber' , () =>
{
    test( 'a length the brand allows, and the Luhn check' , () =>
    {
        expect( isCardNumber( VISA ) ).toBe( true ) ;
        expect( isCardNumber( AMEX ) ).toBe( true ) ;
        expect( isCardNumber( '4242 4242 4242' ) ).toBe( false ) ;
        expect( isCardNumber( '4242 4242 4242 4241' ) ).toBe( false ) ;
    } ) ;

    test( 'an Amex at sixteen digits is refused, even when the checksum works' , () =>
    {
        // 3782 8224 6310 0052 : Luhn-valid, one digit too long for an Amex.
        expect( isLuhn( '3782822463100052' ) ).toBe( true ) ;
        expect( isCardNumber( '3782822463100052' ) ).toBe( false ) ;
    } ) ;
} ) ;

describe( 'isCardExpiry' , () =>
{
    const now = new Date( 2026 , 9 , 12 ) ; // October 2026

    test( 'the month in progress still counts, a past one does not' , () =>
    {
        expect( isCardExpiry( '10/26' , { now } ) ).toBe( true ) ;
        expect( isCardExpiry( '09/26' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( '01/27' , { now } ) ).toBe( true ) ;
        expect( isCardExpiry( '12/25' , { now } ) ).toBe( false ) ;
    } ) ;

    test( 'incomplete or impossible is never valid' , () =>
    {
        expect( isCardExpiry( '13/29' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( '00/29' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( '1/29' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( '10/2' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( '' , { now } ) ).toBe( false ) ;
        expect( isCardExpiry( undefined , { now } ) ).toBe( false ) ;
    } ) ;
} ) ;
