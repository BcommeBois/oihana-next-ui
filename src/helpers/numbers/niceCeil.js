/**
 * Rounds a positive number UP to two significant figures, so a ceiling taken
 * from real data reads as a clean bound : `4200.49 → 4300`, `772.3 → 780`,
 * `0.0437 → 0.044`.
 *
 * What a slider sized on the data needs : its end sits just above the largest
 * value, on a round figure a human reads at a glance. Zero, a negative number
 * or a non-number is returned as is.
 *
 * @module helpers/numbers/niceCeil
 *
 * @param {number} n
 * @returns {number}
 *
 * @example
 * ```js
 * niceCeil( 4200.49 ) ; // 4300
 * niceCeil( 99 )      ; // 99
 * niceCeil( 101 )     ; // 110
 * ```
 */
const niceCeil = n =>
{
    if ( !( n > 0 ) ) { return n ; }
    const mag = 10 ** ( Math.floor( Math.log10( n ) ) - 1 ) ;
    return Math.ceil( n / mag ) * mag ;
} ;

export default niceCeil ;
