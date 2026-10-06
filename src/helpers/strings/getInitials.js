/**
 * The initials of a name — what an avatar shows when there is no picture.
 *
 * One word gives one letter, several give one each, up to `max` : « Jean
 * Dupont » reads `JD`, « Acme » reads `A`, « Acme Corp Ltd » reads `AC`.
 *
 * ⚠️ It reads a NAME, not a record. Which fields make up that name — a given
 * name and a family name, a company name, an e-mail when nothing else is
 * known — is the caller's business, and it changes with every payload.
 *
 * @module helpers/strings/getInitials
 *
 * @param {*} [value] - Anything ; non-strings are coerced, nullish yields the fallback.
 * @param {Object} [options]
 * @param {string} [options.fallback='?'] - What an empty name reads as. A mark is better than a hole : an avatar with nothing in it looks broken rather than anonymous.
 * @param {number} [options.max=2] - How many letters at most.
 *
 * @returns {string} The initials, upper-cased.
 *
 * @example
 * ```js
 * getInitials( 'Jean Dupont' )                ; // 'JD'
 * getInitials( 'Acme' )                       ; // 'A'
 * getInitials( 'Acme Corp Ltd' )              ; // 'AC'
 * getInitials( 'Acme Corp Ltd' , { max : 3 } ); // 'ACL'
 * getInitials( '' )                           ; // '?'
 * getInitials( '' , { fallback : '' } )       ; // ''
 * ```
 */

const getInitials = ( value , { fallback = '?' , max = 2 } = {} ) =>
{
    const words = String( value ?? '' ).trim().split( /\s+/ ).filter( Boolean ) ;

    if ( words.length === 0 ) { return fallback ; }

    return words
        .slice( 0 , Math.max( 1 , max ) )
        .map( word => word.charAt( 0 ) )
        .join( '' )
        .toUpperCase() ;
} ;

export default getInitials ;
