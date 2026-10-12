import matrixToPath from './matrixToPath' ;

const ENTITIES = { '"' : '&quot;' , '&' : '&amp;' , "'" : '&apos;' , '<' : '&lt;' , '>' : '&gt;' } ;

const escapeXml = value => String( value ).replace( /["&'<>]/g , character => ENTITIES[ character ] ) ;

/**
 * Serializes a module grid into a standalone SVG document, as a string.
 *
 * Pure JavaScript : it runs in the browser, in a Next server component, a route
 * handler or plain Node — wherever a code has to be stored, uploaded or mailed.
 * The SVG carries its own `width` and `height` in pixels and a `viewBox` in
 * modules, so it stays sharp at any size it is later drawn or printed at.
 *
 * 🔑 **The background is drawn inside the SVG.** A code laid over a dark page
 * would otherwise read light-on-dark, which many scanners refuse. Pass
 * `background : null` only when the surface underneath is known to be light.
 *
 * @module helpers/barcodes/matrixToSvg
 *
 * @param {boolean[][]} matrix - The module grid, rows first, quiet zone included.
 * @param {Object} [options]
 * @param {?string} [options.background='#ffffff'] - The light colour ; `null` leaves the background transparent.
 * @param {string} [options.foreground='#000000'] - The dark colour.
 * @param {number} [options.moduleHeight=1] - The height of a row, in modules.
 * @param {number} [options.scale=8] - Pixels per module, for the `width` and `height` attributes.
 * @param {string} [options.title] - A `<title>`, the accessible name of the document.
 *
 * @returns {string} The SVG document, empty for an empty grid.
 *
 * @example
 * ```js
 * const svg = matrixToSvg( encodeQRCode( 'https://example.com' ) , { scale : 10 } ) ;
 * await fetch( '/api/labels' , { method : 'POST' , body : svg , headers : { 'Content-Type' : 'image/svg+xml' } } ) ;
 * ```
 */
const matrixToSvg =
(
    matrix ,
    {
        background   = '#ffffff' ,
        foreground   = '#000000' ,
        moduleHeight = 1 ,
        scale        = 8 ,
        title ,
    }
    = {}
) =>
{
    if ( !Array.isArray( matrix ) || matrix.length === 0 )
    {
        return '' ;
    }

    const columns = matrix[ 0 ].length ;
    const rows    = matrix.length * moduleHeight ;

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${ columns * scale }" height="${ rows * scale }" viewBox="0 0 ${ columns } ${ rows }" shape-rendering="crispEdges">` ,
        title ? `<title>${ escapeXml( title ) }</title>` : '' ,
        background ? `<rect width="100%" height="100%" fill="${ escapeXml( background ) }"/>` : '' ,
        `<path fill="${ escapeXml( foreground ) }" d="${ matrixToPath( matrix , { moduleHeight } ) }"/>` ,
        '</svg>' ,
    ].join( '' ) ;
} ;

export default matrixToSvg ;
