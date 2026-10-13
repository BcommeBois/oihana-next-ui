/**
 * A signature at another width : the points scaled, the height following.
 *
 * A signature is drawn in the coordinates of the pad it was signed on, and
 * shown elsewhere — a smaller pad, a PDF, a PNG at print resolution. Scaling
 * the points, not the image, keeps the stroke sharp at every size.
 *
 * @module helpers/signature/scaleSignature
 *
 * @typedef {Object} Signature
 * @property {number} width - The width of the pad, in CSS pixels, when it was signed.
 * @property {number} height - Its height.
 * @property {Array<Array<[number,number,number,number?]>>} strokes - The strokes, each a list of `[ x , y , pressure , t ]`, `t` the milliseconds since the first point — optional.
 *
 * @param {Signature} signature
 * @param {number} width - The width wanted.
 * @returns {Signature} A new signature ; the same object when the width is already right.
 */
const scaleSignature = ( signature , width ) =>
{
    if ( !signature?.width || !width || signature.width === width )
    {
        return signature ;
    }

    const ratio = width / signature.width ;

    return {
        height  : signature.height * ratio ,
        strokes : signature.strokes.map( stroke => stroke.map( ( [ x , y , pressure , t ] ) => ( t === undefined ? [ x * ratio , y * ratio , pressure ] : [ x * ratio , y * ratio , pressure , t ] ) ) ) ,
        width ,
    } ;
} ;

export default scaleSignature ;
