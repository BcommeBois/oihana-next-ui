/**
 * Whether a signature holds too little to count as one.
 *
 * Nothing, no strokes, or strokes with no point is empty ; with `minPoints`,
 * so is a tracing of fewer points in all — a finger that brushed the pad,
 * a tap, is not a signature.
 *
 * @module helpers/signature/isSignatureEmpty
 *
 * @param {?import('./scaleSignature').Signature} signature
 * @param {Object} [options]
 * @param {number} [options.minPoints=1] - The points a signature needs, over all its strokes.
 * @returns {boolean}
 */
const isSignatureEmpty = ( signature , { minPoints = 1 } = {} ) =>
{
    const points = ( signature?.strokes ?? [] ).reduce( ( sum , stroke ) => sum + ( Array.isArray( stroke ) ? stroke.length : 0 ) , 0 ) ;

    return points < Math.max( 1 , minPoints ) ;
} ;

export default isSignatureEmpty ;
