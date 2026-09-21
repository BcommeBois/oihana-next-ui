import formatNumber from './formatNumber' ;

/**
 * Formats a number in compact notation : `163174` → « 163,2 k ».
 *
 * Meant for an axis tick, a legend entry, a narrow cell : places where the
 * order of magnitude is the claim. 🚨 Not for a figure the reader acts on — a
 * total, a price, a KPI : « 85 M € » rounds six digits away and still reads as
 * the measurement.
 *
 * 🚨 **Both fraction bounds are set, and the minimum is why.** Under compact
 * notation, an engine given only a maximum infers the minimum itself, and Node
 * and the browsers do not agree : the same `168000` came out « 168,0 k » on the
 * server and « 168 k » in the browser — a hydration mismatch that re-renders
 * the whole tree. Naming the minimum leaves nothing to infer.
 *
 * ⚠️ **The abbreviations themselves are data, and the engines carry their own
 * copy.** No option reaches them : in `en-GB`, Node 22 (ICU 75) writes
 * « €168K » where Chrome 152 writes « €168k ». `fr-FR` agrees on both. A compact
 * number rendered on the server AND hydrated in the browser can therefore
 * mismatch in some locales ; render it where one engine does all the work — a
 * chart drawn in the browser, a component mounted after hydration.
 *
 * @module helpers/numbers/formatCompact
 *
 * @param {*}       value     - The number. Anything that is not a finite number gives `''`.
 * @param {?string} locale    - A BCP 47 tag (`fr-FR`) or a language code (`fr`).
 * @param {Object}  [options]
 * @param {string}  [options.currency] - An ISO 4217 code (`EUR`) : the number is an amount.
 * @param {number}  [options.maximumFractionDigits=1] - Decimals kept on the shortened number.
 * @returns {string} The compact number, or an empty string when there is nothing to format.
 *
 * @example
 * ```js
 * formatCompact( 163174.19 , 'fr-FR' ) ;                        // '163,2 k'
 * formatCompact( 168000 , 'fr-FR' , { currency : 'EUR' } ) ;    // '168 k €' — not '168,0 k €'
 * formatCompact( 85011246.93 , 'en-GB' , { currency : 'EUR' } ) ; // '€85M'
 * ```
 */
const formatCompact = ( value , locale , { currency , maximumFractionDigits = 1 } = {} ) =>
    formatNumber( value , locale ,
    {
        ...( currency ? { currency , style : 'currency' } : {} ) ,
        maximumFractionDigits ,
        minimumFractionDigits : 0 ,
        notation              : 'compact' ,
    } ) ;

export default formatCompact ;
