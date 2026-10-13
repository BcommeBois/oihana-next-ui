/**
 * Whether a signature holds any stroke with at least one point.
 *
 * @module helpers/signature/isSignatureEmpty
 *
 * @param {?import('./scaleSignature').Signature} signature
 * @returns {boolean}
 */
const isSignatureEmpty = signature => !signature?.strokes?.some( stroke => Array.isArray( stroke ) && stroke.length > 0 ) ;

export default isSignatureEmpty ;
