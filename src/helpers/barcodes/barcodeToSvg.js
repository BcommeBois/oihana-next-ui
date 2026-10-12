import symbolToPath , { BARCODE_FONT } from './symbolToPath' ;

const ENTITIES = { '"' : '&quot;' , '&' : '&amp;' , "'" : '&apos;' , '<' : '&lt;' , '>' : '&gt;' } ;

const escapeXml = value => String( value ).replace( /["&'<>]/g , character => ENTITIES[ character ] ) ;

/**
 * Serializes a laid-out linear barcode into a standalone SVG document, as a string.
 *
 * Pure JavaScript : browser, server component, route handler or Node — wherever
 * a code has to be stored, uploaded or mailed. The SVG carries its own `width`
 * and `height` in pixels and a `viewBox` in modules, so it stays sharp at any
 * size it is later drawn or printed at.
 *
 * 🔑 **The background is drawn inside the SVG**, as for a QR code : a scanner
 * reads dark bars on a light ground, whatever the page underneath.
 *
 * ⚠️ The text is real SVG text : how it looks depends on the fonts of whatever
 * displays the file — a face it does not have falls back to the next one in
 * `fontFamily`. The bars do not depend on anything ; and a scanner never reads
 * the text, only a person does.
 *
 * @module helpers/barcodes/barcodeToSvg
 *
 * @param {Object} symbol - What {@link module:helpers/barcodes/layoutBarcode} returns.
 * @param {Object} [options]
 * @param {?string} [options.background='#ffffff'] - The light colour ; `null` leaves the background transparent.
 * @param {string} [options.fontFamily] - The face of the text, a CSS font list. Defaults to a system monospace face.
 * @param {string|number} [options.fontWeight] - The weight of the text (`400`, `600`, `'bold'`…).
 * @param {string} [options.foreground='#000000'] - The colour of the bars, and of the text unless `textColor` says otherwise.
 * @param {number} [options.scale=2] - Pixels per module, for the `width` and `height` attributes.
 * @param {string} [options.textColor] - The colour of the text. Defaults to `foreground`.
 * @param {string} [options.title] - A `<title>`, the accessible name of the document.
 *
 * @returns {string} The SVG document.
 *
 * @example
 * ```js
 * const svg = barcodeToSvg( layoutBarcode( encodeBarcode( 'ABC-1234' ) ) , { scale : 3 } ) ;
 * await fetch( '/api/labels' , { method : 'POST' , body : svg , headers : { 'Content-Type' : 'image/svg+xml' } } ) ;
 * ```
 */
const barcodeToSvg =
(
    symbol ,
    {
        background = '#ffffff' ,
        fontFamily = BARCODE_FONT ,
        fontWeight ,
        foreground = '#000000' ,
        scale      = 2 ,
        textColor ,
        title ,
    }
    = {}
) =>
{
    if ( !symbol?.rects?.length )
    {
        return '' ;
    }

    const { height , rects , texts , width } = symbol ;

    const text = texts.map( ( { size , value , x , y } ) =>
        `<text x="${ x }" y="${ y }" font-size="${ size }" text-anchor="middle">${ escapeXml( value ) }</text>`
    ).join( '' ) ;

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${ width * scale }" height="${ Math.ceil( height * scale ) }" viewBox="0 0 ${ width } ${ height }">` ,
        title ? `<title>${ escapeXml( title ) }</title>` : '' ,
        background ? `<rect width="100%" height="100%" fill="${ escapeXml( background ) }"/>` : '' ,
        `<path fill="${ escapeXml( foreground ) }" shape-rendering="crispEdges" d="${ symbolToPath( rects ) }"/>` ,
        text ? `<g fill="${ escapeXml( textColor ?? foreground ) }" font-family="${ escapeXml( fontFamily ) }"${ fontWeight ? ` font-weight="${ escapeXml( fontWeight ) }"` : '' }>${ text }</g>` : '' ,
        '</svg>' ,
    ].join( '' ) ;
} ;

export default barcodeToSvg ;
