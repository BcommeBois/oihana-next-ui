import { describe , expect , test } from 'bun:test' ;

import applyKeypadKey ,
{
    formatKeypadText ,
    getDecimalSeparator ,
    keypadKeyFromEvent ,
    KEYPAD_KEYS ,
    KEYPAD_MAX_DIGITS ,
    parseKeypadText ,
    toKeypadText ,
} from '../../../src/helpers/numbers/applyKeypadKey' ;

const { BACKSPACE , CLEAR , DECIMAL , DECREMENT , INCREMENT , SUBMIT } = KEYPAD_KEYS ;

/**
 * Types a sequence of keys from an empty keypad, the way a hand would.
 */
const type = ( keys , options ) =>
{
    let state = { text : '' , value : null } ;
    const refusals = [] ;

    for ( const key of keys )
    {
        state = applyKeypadKey( state.text , key , options ) ;
        if ( state.refused )
        {
            refusals.push( state.refused ) ;
        }
    }

    return { ...state , refusals } ;
} ;

describe( 'parseKeypadText' , () =>
{
    test( 'nothing typed is null, never 0' , () =>
    {
        expect( parseKeypadText( '' ) ).toBeNull() ;
        expect( parseKeypadText( '-' ) ).toBeNull() ;
        expect( parseKeypadText( undefined ) ).toBeNull() ;
    } ) ;

    test( 'a trailing separator and trailing zeros read as the number so far' , () =>
    {
        expect( parseKeypadText( '12.' ) ).toBe( 12 ) ;
        expect( parseKeypadText( '0.50' ) ).toBe( 0.5 ) ;
        expect( parseKeypadText( '-3.25' ) ).toBe( -3.25 ) ;
    } ) ;

    test( '-0 is 0' , () =>
    {
        expect( Object.is( parseKeypadText( '-0' ) , 0 ) ).toBe( true ) ;
    } ) ;
} ) ;

describe( 'toKeypadText' , () =>
{
    test( 'rounds to the decimals and drops trailing zeros' , () =>
    {
        expect( toKeypadText( 2.5 , 2 ) ).toBe( '2.5' ) ;
        expect( toKeypadText( 0.1 + 0.2 , 2 ) ).toBe( '0.3' ) ;
        expect( toKeypadText( 1.239 , 2 ) ).toBe( '1.24' ) ;
        expect( toKeypadText( 40 , 0 ) ).toBe( '40' ) ;
        expect( toKeypadText( 100 , 3 ) ).toBe( '100' ) ;
    } ) ;

    test( 'null, undefined and NaN give nothing ; never an exponent' , () =>
    {
        expect( toKeypadText( null ) ).toBe( '' ) ;
        expect( toKeypadText( undefined ) ).toBe( '' ) ;
        expect( toKeypadText( Number.NaN ) ).toBe( '' ) ;
        expect( toKeypadText( 1e-7 , 7 ) ).toBe( '0.0000001' ) ;
        expect( toKeypadText( -0.0001 , 2 ) ).toBe( '0' ) ;
    } ) ;
} ) ;

describe( 'digits' , () =>
{
    test( 'append, and empty reads as null' , () =>
    {
        expect( type( [] ) ).toMatchObject( { text : '' , value : null } ) ;
        expect( type( [ '1' , '2' , '5' ] ) ).toMatchObject( { text : '125' , value : 125 } ) ;
    } ) ;

    test( 'no leading zeros : a lone 0 is replaced, not followed' , () =>
    {
        expect( type( [ '0' , '0' , '7' ] ) ).toMatchObject( { text : '7' , value : 7 } ) ;
        expect( type( [ '0' ] ) ).toMatchObject( { text : '0' , value : 0 } ) ;
    } ) ;

    test( 'a digit past max is refused, the value unchanged' , () =>
    {
        const result = type( [ '1' , '2' , '5' ] , { max : 100 } ) ;
        expect( result ).toMatchObject( { text : '12' , value : 12 } ) ;
        expect( result.refusals ).toEqual( [ { reason : 'max' , value : 125 } ] ) ;
    } ) ;

    test( 'max itself is accepted' , () =>
    {
        expect( type( [ '1' , '0' , '0' ] , { max : 100 } ) ).toMatchObject( { text : '100' , refusals : [] } ) ;
    } ) ;

    test( 'a positive number under min is let through : it is on its way' , () =>
    {
        expect( type( [ '1' , '5' ] , { min : 10 } ) ).toMatchObject( { text : '15' , refusals : [] } ) ;
    } ) ;

    test( `more than ${ KEYPAD_MAX_DIGITS } digits is refused` , () =>
    {
        const keys   = Array.from( { length : KEYPAD_MAX_DIGITS + 1 } , () => '9' ) ;
        const result = type( keys ) ;
        expect( result.text ).toHaveLength( KEYPAD_MAX_DIGITS ) ;
        expect( result.refusals[ 0 ].reason ).toBe( 'length' ) ;
    } ) ;
} ) ;

describe( 'decimals' , () =>
{
    test( 'the separator is refused where decimals is 0' , () =>
    {
        const result = type( [ '4' , DECIMAL , '5' ] ) ;
        expect( result ).toMatchObject( { text : '45' , value : 45 } ) ;
        expect( result.refusals[ 0 ] ).toEqual( { reason : 'decimals' , value : 4 } ) ;
    } ) ;

    test( 'a separator first gives 0. ; a second one changes nothing' , () =>
    {
        expect( type( [ DECIMAL , '5' ] , { decimals : 2 } ) ).toMatchObject( { text : '0.5' , value : 0.5 } ) ;
        expect( type( [ '1' , DECIMAL , DECIMAL , '2' ] , { decimals : 2 } ) ).toMatchObject( { text : '1.2' , refusals : [] } ) ;
    } ) ;

    test( 'trailing zeros stay in the text while typing' , () =>
    {
        expect( type( [ '2' , DECIMAL , '5' , '0' ] , { decimals : 3 } ) ).toMatchObject( { text : '2.50' , value : 2.5 } ) ;
    } ) ;

    test( 'one decimal too many is refused' , () =>
    {
        const result = type( [ '1' , DECIMAL , '2' , '5' , '0' , '7' ] , { decimals : 3 } ) ;
        expect( result ).toMatchObject( { text : '1.250' , value : 1.25 } ) ;
        expect( result.refusals ).toEqual( [ { reason : 'decimals' , value : 1.2507 } ] ) ;
    } ) ;

    test( 'a decimal past max is refused too' , () =>
    {
        const result = type( [ '9' , DECIMAL , '5' ] , { decimals : 1 , max : 9.4 } ) ;
        expect( result.text ).toBe( '9.' ) ;
        expect( result.refusals[ 0 ] ).toEqual( { reason : 'max' , value : 9.5 } ) ;
    } ) ;
} ) ;

describe( 'backspace and clear' , () =>
{
    test( 'backspace removes the last character' , () =>
    {
        expect( type( [ '1' , '2' , BACKSPACE ] ) ).toMatchObject( { text : '1' , value : 1 } ) ;
        expect( type( [ '1' , DECIMAL , BACKSPACE ] , { decimals : 2 } ) ).toMatchObject( { text : '1' , value : 1 } ) ;
        expect( type( [ '1' , BACKSPACE ] ) ).toMatchObject( { text : '' , value : null } ) ;
        expect( type( [ BACKSPACE ] ) ).toMatchObject( { text : '' , value : null , refusals : [] } ) ;
    } ) ;

    test( 'a lone sign left behind goes too' , () =>
    {
        expect( applyKeypadKey( '-3' , BACKSPACE , { min : -10 } ) ).toMatchObject( { text : '' , value : null } ) ;
    } ) ;

    test( 'clear empties everything' , () =>
    {
        expect( type( [ '1' , '2' , CLEAR ] ) ).toMatchObject( { text : '' , value : null } ) ;
    } ) ;
} ) ;

describe( 'the stepper' , () =>
{
    test( 'starts from 0 when nothing was typed' , () =>
    {
        expect( type( [ INCREMENT ] ) ).toMatchObject( { text : '1' , value : 1 } ) ;
        expect( type( [ INCREMENT , INCREMENT , DECREMENT ] , { step : 5 } ) ).toMatchObject( { text : '5' , value : 5 } ) ;
    } ) ;

    test( 'negative numbers are refused by default' , () =>
    {
        const result = type( [ DECREMENT ] ) ;
        expect( result ).toMatchObject( { text : '' , value : null } ) ;
        expect( result.refusals ).toEqual( [ { reason : 'min' , value : -1 } ] ) ;
    } ) ;

    test( 'a negative min lets it go under 0, and a digit then follows the sign' , () =>
    {
        expect( type( [ DECREMENT , DECREMENT ] , { min : -5 } ) ).toMatchObject( { text : '-2' , value : -2 } ) ;
        expect( type( [ DECREMENT , '2' ] , { min : -50 } ) ).toMatchObject( { text : '-12' , value : -12 } ) ;
    } ) ;

    test( 'a digit that makes a negative number pass min is refused' , () =>
    {
        const result = type( [ DECREMENT , '2' ] , { min : -10 } ) ;
        expect( result.text ).toBe( '-1' ) ;
        expect( result.refusals ).toEqual( [ { reason : 'min' , value : -12 } ] ) ;
    } ) ;

    test( 'min null allows anything' , () =>
    {
        expect( type( [ DECREMENT ] , { min : null } ) ).toMatchObject( { text : '-1' , value : -1 } ) ;
    } ) ;

    test( 'refused past max going up, under min going down, never clamped' , () =>
    {
        const up = applyKeypadKey( '9' , INCREMENT , { max : 10 , step : 2 } ) ;
        expect( up ).toEqual( { refused : { reason : 'max' , value : 11 } , text : '9' , value : 9 } ) ;

        const down = applyKeypadKey( '3' , DECREMENT , { min : 2 , step : 2 } ) ;
        expect( down ).toEqual( { refused : { reason : 'min' , value : 1 } , text : '3' , value : 3 } ) ;
    } ) ;

    test( 'moving toward the range is always allowed' , () =>
    {
        expect( applyKeypadKey( '3' , INCREMENT , { min : 10 } ) ).toMatchObject( { text : '4' } ) ;
        expect( applyKeypadKey( '30' , DECREMENT , { max : 10 } ) ).toMatchObject( { text : '29' } ) ;
    } ) ;

    test( 'a decimal step is rounded to the decimals, without float noise' , () =>
    {
        expect( applyKeypadKey( '0.1' , INCREMENT , { decimals : 2 , step : 0.2 } ) ).toMatchObject( { text : '0.3' , value : 0.3 } ) ;
        expect( applyKeypadKey( '2.5' , INCREMENT , { decimals : 1 , step : 0.5 } ) ).toMatchObject( { text : '3' , value : 3 } ) ;
        expect( applyKeypadKey( '2.50' , DECREMENT , { decimals : 3 , step : 0.25 } ) ).toMatchObject( { text : '2.25' } ) ;
    } ) ;
} ) ;

describe( 'submit' , () =>
{
    test( 'changes nothing and is accepted inside the range' , () =>
    {
        expect( applyKeypadKey( '12.' , SUBMIT , { decimals : 2 , max : 20 , min : 1 } ) ).toEqual( { text : '12.' , value : 12 } ) ;
    } ) ;

    test( 'is refused under min' , () =>
    {
        expect( applyKeypadKey( '0.5' , SUBMIT , { decimals : 1 , min : 1 } ) ).toEqual(
        {
            refused : { reason : 'min' , value : 0.5 } ,
            text    : '0.5' ,
            value   : 0.5 ,
        } ) ;
    } ) ;

    test( 'is refused past max, which only a value set from outside can be' , () =>
    {
        expect( applyKeypadKey( '120' , SUBMIT , { max : 100 } ).refused ).toEqual( { reason : 'max' , value : 120 } ) ;
    } ) ;

    test( 'nothing typed is not refused : the caller decides' , () =>
    {
        expect( applyKeypadKey( '' , SUBMIT , { min : 1 } ) ).toEqual( { text : '' , value : null } ) ;
    } ) ;
} ) ;

describe( 'unknown keys' , () =>
{
    test( 'change nothing' , () =>
    {
        expect( applyKeypadKey( '12' , 'x' ) ).toEqual( { text : '12' , value : 12 } ) ;
    } ) ;
} ) ;

describe( 'keypadKeyFromEvent' , () =>
{
    test( 'digits, and both separators' , () =>
    {
        expect( keypadKeyFromEvent( { key : '7' } ) ).toBe( '7' ) ;
        expect( keypadKeyFromEvent( { key : '.' } ) ).toBe( DECIMAL ) ;
        expect( keypadKeyFromEvent( { key : ',' } ) ).toBe( DECIMAL ) ;
        expect( keypadKeyFromEvent( { key : 'Decimal' } ) ).toBe( DECIMAL ) ;
    } ) ;

    test( 'editing keys, the stepper and Enter' , () =>
    {
        expect( keypadKeyFromEvent( { key : 'Backspace' } ) ).toBe( BACKSPACE ) ;
        expect( keypadKeyFromEvent( { key : 'Delete' } ) ).toBe( CLEAR ) ;
        expect( keypadKeyFromEvent( { key : 'Escape' } ) ).toBe( CLEAR ) ;
        expect( keypadKeyFromEvent( { key : '+' } ) ).toBe( INCREMENT ) ;
        expect( keypadKeyFromEvent( { key : '-' } ) ).toBe( DECREMENT ) ;
        expect( keypadKeyFromEvent( { key : 'Enter' } ) ).toBe( SUBMIT ) ;
    } ) ;

    test( 'shortcuts and other keys are left to the browser' , () =>
    {
        expect( keypadKeyFromEvent( { ctrlKey : true , key : '1' } ) ).toBeNull() ;
        expect( keypadKeyFromEvent( { key : 'r' , metaKey : true } ) ).toBeNull() ;
        expect( keypadKeyFromEvent( { altKey : true , key : '5' } ) ).toBeNull() ;
        expect( keypadKeyFromEvent( { key : 'Tab' } ) ).toBeNull() ;
        expect( keypadKeyFromEvent( { key : 'a' } ) ).toBeNull() ;
        expect( keypadKeyFromEvent() ).toBeNull() ;
    } ) ;
} ) ;

describe( 'formatKeypadText' , () =>
{
    test( 'groups the integer part and uses the locale separator' , () =>
    {
        expect( formatKeypadText( '12345.5' , 'en-US' ) ).toBe( '12,345.5' ) ;
        expect( formatKeypadText( '12345.5' , 'fr-FR' ) ).toBe( '12 345,5' ) ;
    } ) ;

    test( 'keeps what was typed so far : a trailing separator, trailing zeros' , () =>
    {
        expect( formatKeypadText( '12.' , 'fr-FR' ) ).toBe( '12,' ) ;
        expect( formatKeypadText( '0.50' , 'en-US' ) ).toBe( '0.50' ) ;
        expect( formatKeypadText( '-3.0' , 'en-US' ) ).toBe( '-3.0' ) ;
    } ) ;

    test( 'nothing typed shows nothing ; 15 digits stay exact' , () =>
    {
        expect( formatKeypadText( '' , 'en-US' ) ).toBe( '' ) ;
        expect( formatKeypadText( '999999999999999' , 'en-US' ) ).toBe( '999,999,999,999,999' ) ;
    } ) ;
} ) ;

describe( 'getDecimalSeparator' , () =>
{
    test( 'follows the locale' , () =>
    {
        expect( getDecimalSeparator( 'fr-FR' ) ).toBe( ',' ) ;
        expect( getDecimalSeparator( 'en-US' ) ).toBe( '.' ) ;
        expect( getDecimalSeparator( 'de-CH' ) ).toBe( '.' ) ;
    } ) ;
} ) ;
