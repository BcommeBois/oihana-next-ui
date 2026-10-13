/**
 * The part of a signature drawn by a given moment : what a replay shows at
 * `elapsed` milliseconds.
 *
 * A point carries its time as a fourth value, `[ x , y , pressure , t ]`,
 * milliseconds since the signature's first point. A point with no time is
 * shown at once, so a signature stored before times were kept replays as a
 * still.
 *
 * @module helpers/signature/frameAt
 *
 * @param {import('./scaleSignature').Signature} signature
 * @param {number} elapsed - Milliseconds since the start.
 * @returns {import('./scaleSignature').Signature} The same signature, its strokes cut at `elapsed` ; strokes not yet begun left out.
 */
const frameAt = ( signature , elapsed ) =>
{
    if ( !signature )
    {
        return signature ;
    }

    return {
        ...signature ,
        strokes : signature.strokes
            .map( stroke => stroke.filter( point => point[ 3 ] === undefined || point[ 3 ] <= elapsed ) )
            .filter( stroke => stroke.length > 0 ) ,
    } ;
} ;

/**
 * How long a signature took, from its first point to its last : the length
 * of its replay. `0` when no point carries a time.
 *
 * @param {?import('./scaleSignature').Signature} signature
 * @returns {number} Milliseconds.
 */
export const signatureDuration = signature =>
    ( signature?.strokes ?? [] ).reduce( ( max , stroke ) => stroke.reduce( ( inner , point ) => Math.max( inner , point[ 3 ] ?? 0 ) , max ) , 0 ) ;

export default frameAt ;
