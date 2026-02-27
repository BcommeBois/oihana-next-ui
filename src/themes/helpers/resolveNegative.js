/**
 * Resolves a value that may be negative.
 *
 * Detects negative numbers and string values prefixed with '-',
 * returns the absolute value and a negative flag.
 *
 * @param {string | number} value - The input value.
 * @param {boolean} [negative=false] - Force negative flag.
 *
 * @returns {{ value: string | number , negative: boolean }} Resolved value and negative state.
 *
 * @example
 * ```js
 * resolveNegative( -4 ) ;
 * // → { value: 4 , negative: true }
 *
 * resolveNegative( '-4' ) ;
 * // → { value: '4' , negative: true }
 *
 * resolveNegative( 4 ) ;
 * // → { value: 4 , negative: false }
 *
 * resolveNegative( 4 , true ) ;
 * // → { value: 4 , negative: true }
 * ```
 */
const resolveNegative = ( value , negative = false ) =>
{
    if ( typeof value === 'number' && value < 0 )
    {
        return { value: Math.abs( value ) , negative: true } ;
    }

    if ( typeof value === 'string' && value.startsWith( '-' ) )
    {
        return { value: value.slice( 1 ) , negative: true } ;
    }

    return { value , negative } ;
} ;

export default resolveNegative ;