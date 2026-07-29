/**
 * Guards the chord matrix shape.
 *
 * @module helpers/charts/isChordDataValid
 */

/**
 * Whether a chord matrix can be drawn.
 *
 * A chord diagram is the one chart in the family taking a square matrix, and
 * nivo indexes it against `keys` without checking the two agree. A matrix
 * that is not exactly `keys.length × keys.length` therefore throws while
 * rendering rather than drawing nothing — which is why this is checked up
 * front and turned into the empty state.
 *
 * @param {*} data - The matrix.
 * @param {*} keys - The entity names.
 * @returns {boolean} `true` when the matrix is square and matches `keys`.
 *
 * @example
 * ```js
 * isChordDataValid( [ [ 0 , 1 ] , [ 1 , 0 ] ] , [ 'a' , 'b' ] ) ; // → true
 * isChordDataValid( [ [ 0 , 1 ] ] , [ 'a' , 'b' ] ) ;             // → false
 * ```
 */
const isChordDataValid = ( data , keys ) =>
{
    if ( !Array.isArray( data ) || !Array.isArray( keys ) || keys.length === 0 )
    {
        return false ;
    }

    if ( data.length !== keys.length )
    {
        return false ;
    }

    return data.every( ( row ) => Array.isArray( row ) && row.length === keys.length ) ;
} ;

export default isChordDataValid ;
