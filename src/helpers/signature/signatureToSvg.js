import strokesToPaths from './strokesToPaths' ;

const ENTITIES = { '"' : '&quot;' , '&' : '&amp;' , "'" : '&apos;' , '<' : '&lt;' , '>' : '&gt;' } ;

const escapeXml = value => String( value ).replace( /["&'<>]/g , character => ENTITIES[ character ] ) ;

/**
 * Serializes a signature into a standalone SVG document, as a string.
 *
 * Pure JavaScript : browser, route handler or Node — wherever a signature
 * has to be stored, mailed or drawn later. The `viewBox` is the pad's size,
 * so the file stays sharp at any size it is shown at ; `width` sets the
 * pixel size written on it, the height following.
 *
 * @module helpers/signature/signatureToSvg
 *
 * @param {import('./scaleSignature').Signature} signature
 * @param {Object} [options]
 * @param {?string} [options.background=null] - A fill behind the strokes ; `null` leaves it transparent.
 * @param {string} [options.color='#000000'] - The ink.
 * @param {number} [options.size=3] - The pen's width, in the pad's units.
 * @param {string} [options.title] - A `<title>`, the accessible name of the document.
 * @param {number} [options.width] - The width written on the file, in pixels. Defaults to the pad's.
 *
 * @returns {string} The SVG document, empty for an empty signature.
 */
const signatureToSvg = ( signature , { background = null , color = '#000000' , size = 3 , title , width } = {} ) =>
{
    const paths = strokesToPaths( signature , { size } ) ;

    if ( paths.length === 0 )
    {
        return '' ;
    }

    const w = width ?? signature.width ;
    const h = Math.round( w * signature.height / signature.width ) ;

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${ w }" height="${ h }" viewBox="0 0 ${ signature.width } ${ signature.height }">` ,
        title ? `<title>${ escapeXml( title ) }</title>` : '' ,
        background ? `<rect width="100%" height="100%" fill="${ escapeXml( background ) }"/>` : '' ,
        `<g fill="${ escapeXml( color ) }">${ paths.map( d => `<path d="${ d }"/>` ).join( '' ) }</g>` ,
        '</svg>' ,
    ].join( '' ) ;
} ;

export default signatureToSvg ;
