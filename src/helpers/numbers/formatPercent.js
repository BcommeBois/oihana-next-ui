import formatNumber from './formatNumber' ;

/**
 * Formats a ratio as a percentage : `0.254` → « 25,4 % ».
 *
 * `smallBelow` gives more precision to a small share, which would otherwise
 * read « 0 % » : below that threshold the percentage takes two decimals. The
 * threshold is judged on the **absolute** value of the ratio — a fall of 5 %
 * is as small as a rise of 5 %, and must not be printed with two decimals
 * merely because it is negative.
 *
 * Both fraction bounds are always set : an engine given only a maximum infers
 * the minimum itself, and two engines may infer it differently.
 *
 * @module helpers/numbers/formatPercent
 *
 * @param {*}       value     - The ratio, `1` being 100 %. Anything that is not a finite number gives `''`.
 * @param {?string} locale    - A BCP 47 tag (`fr-FR`) or a language code (`fr`).
 * @param {Object}  [options]
 * @param {number}  [options.maximumFractionDigits=1] - Decimals kept on an ordinary share.
 * @param {('auto'|'always'|'exceptZero'|'negative'|'never')} [options.signDisplay='auto'] - `exceptZero` for a change : « +3 % », « −3 % », « 0 % ».
 * @param {number}  [options.smallBelow] - Below this absolute ratio, two decimals are kept. Omitted, never.
 * @returns {string} The percentage, or an empty string when there is nothing to format.
 *
 * @example
 * ```js
 * formatPercent( 0.254 , 'fr-FR' ) ;                                           // '25,4 %'
 * formatPercent( 0.254 , 'fr-FR' , { maximumFractionDigits : 0 } ) ;           // '25 %'
 * formatPercent( 0.0042 , 'fr-FR' , { maximumFractionDigits : 0 , smallBelow : 0.1 } ) ; // '0,42 %'
 * formatPercent( -0.5 , 'fr-FR' , { maximumFractionDigits : 0 , smallBelow : 0.1 } ) ;   // '-50 %'
 * formatPercent( 0.03 , 'fr-FR' , { signDisplay : 'exceptZero' } ) ;           // '+3 %'
 * ```
 */
const formatPercent = ( value , locale , { maximumFractionDigits = 1 , signDisplay = 'auto' , smallBelow } = {} ) =>
{
    if ( !Number.isFinite( value ) )
    {
        return '' ;
    }

    const small = Number.isFinite( smallBelow ) && value !== 0 && Math.abs( value ) < smallBelow ;

    return formatNumber( value , locale ,
    {
        maximumFractionDigits : small ? Math.max( 2 , maximumFractionDigits ) : maximumFractionDigits ,
        minimumFractionDigits : 0 ,
        signDisplay ,
        style                 : 'percent' ,
    } ) ;
} ;

export default formatPercent ;
