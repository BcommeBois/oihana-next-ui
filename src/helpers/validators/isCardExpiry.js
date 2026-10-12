/**
 * Whether a card's expiry, `MM/YY`, is complete and not past.
 *
 * A card is valid to the last day of its month : the month in progress still
 * counts. Two-digit years are read in this century.
 *
 * @module helpers/validators/isCardExpiry
 *
 * @param {string} value - `MM/YY`, as `InputCardExpiry` writes it.
 * @param {Object} [options]
 * @param {Date} [options.now=new Date()] - Today, for the tests.
 * @returns {boolean}
 *
 * @example
 * ```js
 * isCardExpiry( '12/29' ) ; // true, until the end of December 2029
 * isCardExpiry( '13/29' ) ; // false
 * isCardExpiry( '1/29' ) ;  // false : incomplete
 * ```
 */
const isCardExpiry = ( value , { now = new Date() } = {} ) =>
{
    const match = /^(\d{2})\/(\d{2})$/.exec( String( value ?? '' ).trim() ) ;

    if ( !match )
    {
        return false ;
    }

    const month = Number( match[ 1 ] ) ;
    const year  = 2000 + Number( match[ 2 ] ) ;

    if ( month < 1 || month > 12 )
    {
        return false ;
    }

    const current = now.getFullYear() * 12 + now.getMonth() ;

    return year * 12 + ( month - 1 ) >= current ;
} ;

export default isCardExpiry ;
