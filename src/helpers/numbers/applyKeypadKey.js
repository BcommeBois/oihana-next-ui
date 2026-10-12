import getNumberFormat from './getNumberFormat' ;

/**
 * The keys of a numeric keypad.
 *
 * Digits are their own character, `'0'` to `'9'` ; the others are named.
 *
 * @type {{ BACKSPACE : string , CLEAR : string , DECIMAL : string , DECREMENT : string , INCREMENT : string , SUBMIT : string }}
 */
export const KEYPAD_KEYS = Object.freeze(
{
    BACKSPACE : 'backspace' ,
    CLEAR     : 'clear' ,
    DECIMAL   : 'decimal' ,
    DECREMENT : 'decrement' ,
    INCREMENT : 'increment' ,
    SUBMIT    : 'submit' ,
} ) ;

/**
 * Why a key was refused.
 *
 * - `max` : the value would go past `max`.
 * - `min` : the value would go under `min` — by the stepper, by a digit that
 *   makes a negative number larger, or on submit.
 * - `decimals` : one decimal too many, or a separator where `decimals` is 0.
 * - `length` : more digits than a number keeps exactly.
 *
 * @type {{ DECIMALS : string , LENGTH : string , MAX : string , MIN : string }}
 */
export const KEYPAD_LIMITS = Object.freeze(
{
    DECIMALS : 'decimals' ,
    LENGTH   : 'length' ,
    MAX      : 'max' ,
    MIN      : 'min' ,
} ) ;

/**
 * Beyond 15 significant digits a double no longer keeps every digit typed.
 * @type {number}
 */
export const KEYPAD_MAX_DIGITS = 15 ;

const DIGIT = /^[0-9]$/ ;

/**
 * Reads the text being typed as a number.
 *
 * The text is canonical : digits, an optional leading `-`, an optional `.` —
 * never the locale's separator, which only the display uses.
 *
 * @param {string} text - `''`, `'12'`, `'12.'`, `'-0.50'`…
 * @returns {?number} `null` for nothing typed.
 *
 * @example
 * ```js
 * parseKeypadText( '' ) ;     // null
 * parseKeypadText( '12.' ) ;  // 12
 * parseKeypadText( '-0.5' ) ; // -0.5
 * ```
 */
export const parseKeypadText = text =>
{
    if ( !text || text === '-' )
    {
        return null ;
    }

    const value = Number( text.endsWith( '.' ) ? text.slice( 0 , -1 ) : text ) ;

    if ( Number.isNaN( value ) )
    {
        return null ;
    }

    // -0 would print as « -0 » and compare oddly : it is 0.
    return value === 0 ? 0 : value ;
} ;

/**
 * Writes a number as the text a keypad would hold for it.
 *
 * Rounded to `decimals`, trailing zeros dropped : `2.50` with 2 decimals gives
 * `'2.5'`. Never an exponent.
 *
 * @param {?number} value
 * @param {number} [decimals=0]
 * @returns {string} `''` for `null`, `undefined` or `NaN`.
 */
export const toKeypadText = ( value , decimals = 0 ) =>
{
    if ( value === null || value === undefined || Number.isNaN( Number( value ) ) )
    {
        return '' ;
    }

    const text = Number( value ).toFixed( Math.max( 0 , decimals ) ) ;

    const trimmed = text.includes( '.' ) ? text.replace( /\.?0+$/ , '' ) : text ;

    return trimmed === '-0' ? '0' : trimmed ;
} ;

/**
 * The number of digits a text holds, sign and separator left out.
 *
 * @param {string} text
 * @returns {number}
 */
const countDigits = text => text.replace( /[^0-9]/g , '' ).replace( /^0+(?=\d)/ , '' ).length ;

/**
 * Applies one key to the text being typed.
 *
 * Pure : the text in, the next text out, plus the value it reads as. A key the
 * options do not allow is **refused** — the text comes back unchanged and
 * `refused` says why, with the value it would have taken. Nothing is ever
 * brought back inside the limits silently : a quantity that changes by itself
 * is a quantity nobody typed.
 *
 * - **Digits** append ; a lone `0` is replaced rather than followed (`07` is
 *   not a number anyone types). Refused past `max`, past `decimals`, past
 *   {@link KEYPAD_MAX_DIGITS}, and — for a negative number — under `min`. A
 *   positive number under `min` is let through : `1` is on its way to `15`.
 * - **Decimal** adds the separator once (`0.` when nothing was typed).
 *   Refused where `decimals` is 0.
 * - **Backspace** removes the last character, **clear** everything.
 * - **Increment / decrement** add or take `step`, from 0 when nothing was
 *   typed, rounded to `decimals`. Refused when the result goes past `max`
 *   (up) or under `min` (down) ; moving toward the range is always allowed.
 * - **Submit** changes nothing ; refused when the value is outside `min` and
 *   `max`. Nothing typed is not refused — the caller decides what an empty
 *   submit means.
 *
 * Negative numbers are refused by default : `min` defaults to 0. Pass a
 * negative `min` to let the stepper go under 0.
 *
 * @module helpers/numbers/applyKeypadKey
 *
 * @param {string} text - The canonical text being typed (see {@link parseKeypadText}).
 * @param {string} key - A digit `'0'`–`'9'`, or one of {@link KEYPAD_KEYS}.
 * @param {Object} [options]
 * @param {number} [options.decimals=0] - The decimals allowed.
 * @param {?number} [options.max] - The largest value. None by default.
 * @param {?number} [options.min=0] - The smallest value. `null` for none.
 * @param {number} [options.step=1] - What the stepper adds or takes.
 *
 * @returns {{ text : string , value : ?number , refused? : { reason : string , value : ?number } }}
 *
 * @example
 * ```js
 * applyKeypadKey( '12' , '5' , { max : 100 } ) ;
 * // { text : '12' , value : 12 , refused : { reason : 'max' , value : 125 } }
 *
 * applyKeypadKey( '2.5' , 'increment' , { decimals : 1 , step : 0.5 } ) ;
 * // { text : '3' , value : 3 }
 * ```
 */
const applyKeypadKey = ( text , key , { decimals = 0 , max = null , min = 0 , step = 1 } = {} ) =>
{
    const current = text ?? '' ;
    const value   = parseKeypadText( current ) ;

    const keep   = () => ( { text : current , value } ) ;
    const accept = next => ( { text : next , value : parseKeypadText( next ) } ) ;
    const refuse = ( reason , refusedValue ) => ( { refused : { reason , value : refusedValue } , text : current , value } ) ;

    const hasMax = max !== null && max !== undefined ;
    const hasMin = min !== null && min !== undefined ;

    if ( DIGIT.test( key ) )
    {
        const separator = current.indexOf( '.' ) ;

        if ( separator >= 0 && current.length - separator - 1 >= decimals )
        {
            return refuse( KEYPAD_LIMITS.DECIMALS , parseKeypadText( current + key ) ) ;
        }

        let next = current + key ;

        if ( current === '0' || current === '-0' )
        {
            next = current.slice( 0 , -1 ) + key ;
        }

        if ( next === current )
        {
            return keep() ;
        }

        const nextValue = parseKeypadText( next ) ;

        if ( countDigits( next ) > KEYPAD_MAX_DIGITS )
        {
            return refuse( KEYPAD_LIMITS.LENGTH , nextValue ) ;
        }

        if ( hasMax && nextValue > max )
        {
            return refuse( KEYPAD_LIMITS.MAX , nextValue ) ;
        }

        if ( hasMin && nextValue < 0 && nextValue < min )
        {
            return refuse( KEYPAD_LIMITS.MIN , nextValue ) ;
        }

        return accept( next ) ;
    }

    switch ( key )
    {
        case KEYPAD_KEYS.DECIMAL :
        {
            if ( decimals <= 0 )
            {
                return refuse( KEYPAD_LIMITS.DECIMALS , value ) ;
            }

            if ( current.includes( '.' ) )
            {
                return keep() ;
            }

            return accept( current === '' || current === '-' ? `${ current }0.` : `${ current }.` ) ;
        }

        case KEYPAD_KEYS.BACKSPACE :
        {
            const next = current.slice( 0 , -1 ) ;
            return accept( next === '-' ? '' : next ) ;
        }

        case KEYPAD_KEYS.CLEAR :
        {
            return accept( '' ) ;
        }

        case KEYPAD_KEYS.INCREMENT :
        case KEYPAD_KEYS.DECREMENT :
        {
            const up        = key === KEYPAD_KEYS.INCREMENT ;
            const nextValue = parseKeypadText( toKeypadText( ( value ?? 0 ) + ( up ? step : -step ) , decimals ) ) ;

            if ( up && hasMax && nextValue > max )
            {
                return refuse( KEYPAD_LIMITS.MAX , nextValue ) ;
            }

            if ( !up && hasMin && nextValue < min )
            {
                return refuse( KEYPAD_LIMITS.MIN , nextValue ) ;
            }

            return accept( toKeypadText( nextValue , decimals ) ) ;
        }

        case KEYPAD_KEYS.SUBMIT :
        {
            if ( value !== null && hasMin && value < min )
            {
                return refuse( KEYPAD_LIMITS.MIN , value ) ;
            }

            if ( value !== null && hasMax && value > max )
            {
                return refuse( KEYPAD_LIMITS.MAX , value ) ;
            }

            return keep() ;
        }

        default :
        {
            return keep() ;
        }
    }
} ;

/**
 * Turns a physical key press into a keypad key.
 *
 * Both `.` and `,` are the decimal separator, whatever the locale : the numeric
 * pad of a French keyboard sends one or the other depending on the system.
 * A press with Ctrl, Alt or Meta is never taken — the browser's shortcuts stay
 * the browser's.
 *
 * @param {{ key : string , altKey? : boolean , ctrlKey? : boolean , metaKey? : boolean }} event
 * @returns {?string} A digit, one of {@link KEYPAD_KEYS}, or `null`.
 */
export const keypadKeyFromEvent = ( { altKey , ctrlKey , key , metaKey } = {} ) =>
{
    if ( altKey || ctrlKey || metaKey || !key )
    {
        return null ;
    }

    if ( DIGIT.test( key ) )
    {
        return key ;
    }

    switch ( key )
    {
        case '.' :
        case ',' :
        case 'Decimal' :
            return KEYPAD_KEYS.DECIMAL ;

        case 'Backspace' :
            return KEYPAD_KEYS.BACKSPACE ;

        case 'Delete' :
        case 'Escape' :
            return KEYPAD_KEYS.CLEAR ;

        case '+' :
            return KEYPAD_KEYS.INCREMENT ;

        case '-' :
            return KEYPAD_KEYS.DECREMENT ;

        case 'Enter' :
            return KEYPAD_KEYS.SUBMIT ;

        default :
            return null ;
    }
} ;

/**
 * Shows the text being typed the way the locale writes numbers.
 *
 * Groups the integer part and swaps in the locale's separator, but keeps what
 * a formatter would drop : a trailing separator (`12,`) and trailing zeros
 * (`0,50`) are what was typed so far, and must stay on screen.
 *
 * @param {string} text - The canonical text.
 * @param {string} [locale] - A BCP 47 tag.
 * @returns {string}
 *
 * @example
 * ```js
 * formatKeypadText( '12345.50' , 'fr-FR' ) ; // '12 345,50'
 * formatKeypadText( '12.' , 'en-US' ) ;      // '12.'
 * ```
 */
export const formatKeypadText = ( text , locale ) =>
{
    if ( !text )
    {
        return '' ;
    }

    const negative = text.startsWith( '-' ) ;
    const body     = negative ? text.slice( 1 ) : text ;

    const [ integer , fraction ] = body.split( '.' ) ;

    const grouped = integer ? getNumberFormat( locale , { maximumFractionDigits : 0 } ).format( BigInt( integer ) ) : '0' ;

    const decimal = fraction === undefined ? '' : `${ getDecimalSeparator( locale ) }${ fraction }` ;

    return `${ negative ? '-' : '' }${ grouped }${ decimal }` ;
} ;

/**
 * The decimal separator of a locale : `,` in French, `.` in English.
 *
 * @param {string} [locale] - A BCP 47 tag.
 * @returns {string}
 */
export const getDecimalSeparator = locale =>
    getNumberFormat( locale ).formatToParts( 1.1 ).find( ( { type } ) => type === 'decimal' )?.value ?? '.' ;

export default applyKeypadKey ;
