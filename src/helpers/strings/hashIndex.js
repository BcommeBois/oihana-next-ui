/**
 * A stable index derived from a string — « always the same colour for the same
 * name », without storing anything.
 *
 * 🔑 **Stable is the whole point.** The same entity must land on the same
 * colour on a list, on its own page and after a reload, so the reader
 * recognises it before reading it. `Math.random()` or an array position would
 * both break that : a position changes with the sort order.
 *
 * ⚠️ It is NOT a security hash and must never be used as one : a 32-bit
 * polynomial over a short string collides readily, which costs nothing when
 * the answer is a colour and everything when it is an identity.
 *
 * @module helpers/strings/hashIndex
 *
 * @param {*} [value] - Anything ; non-strings are coerced, nullish yields 0.
 * @param {number} [length=1] - How many buckets — typically a palette's length.
 *
 * @returns {number} An index in `[ 0 , length )`, or 0 when `length` is not a positive number.
 *
 * @example
 * ```js
 * const PALETTE = [ 'primary' , 'secondary' , 'accent' ] ;
 *
 * PALETTE[ hashIndex( 'Acme Corp' , PALETTE.length ) ] ; // always the same one
 * ```
 */

const hashIndex = ( value , length = 1 ) =>
{
    const buckets = Math.floor( Number( length ) ) ;

    if ( !Number.isFinite( buckets ) || buckets < 1 ) { return 0 ; }

    const text = String( value ?? '' ) ;

    let hash = 0 ;

    for ( let i = 0 ; i < text.length ; i++ )
    {
        hash = ( hash * 31 + text.charCodeAt( i ) ) >>> 0 ;
    }

    return hash % buckets ;
} ;

export default hashIndex ;
