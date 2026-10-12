import { BARCODE_FONT } from './symbolToPath' ;

/**
 * Draws a laid-out linear barcode into a PNG image, as a `Blob`.
 *
 * ⚠️ **Browser only** : it needs a canvas, which a server does not have. On a
 * server, export the SVG with {@link module:helpers/barcodes/barcodeToSvg}.
 *
 * `scale` is a whole number of pixels per module, so every bar lands on whole
 * pixels : a fractional scale would blur the edges a scanner measures.
 *
 * 🔑 **The face is loaded before the text is drawn.** A canvas does not wait
 * for a web font : drawn too early, the text comes out in the fallback face.
 * The font is asked of `document.fonts` first, and the drawing waits for it.
 *
 * @module helpers/barcodes/barcodeToPng
 *
 * @param {Object} symbol - What {@link module:helpers/barcodes/layoutBarcode} returns.
 * @param {Object} [options]
 * @param {?string} [options.background='#ffffff'] - The light colour ; `null` leaves the background transparent.
 * @param {string} [options.fontFamily] - The face of the text, a CSS font list. Defaults to a system monospace face.
 * @param {string|number} [options.fontWeight] - The weight of the text (`400`, `600`, `'bold'`…).
 * @param {string} [options.foreground='#000000'] - The colour of the bars, and of the text unless `textColor` says otherwise.
 * @param {number} [options.scale=2] - Pixels per module, rounded to a whole number, at least 1.
 * @param {string} [options.textColor] - The colour of the text. Defaults to `foreground`.
 *
 * @returns {Promise<Blob>} The PNG image.
 *
 * @throws {Error} When no canvas is available (on a server) or the symbol is empty.
 *
 * @example
 * ```js
 * const png = await barcodeToPng( layoutBarcode( encodeBarcode( 'ABC-1234' ) ) , { scale : 4 } ) ;
 * ```
 */
const barcodeToPng = async (
    symbol ,
    {
        background = '#ffffff' ,
        fontFamily = BARCODE_FONT ,
        fontWeight = 'normal' ,
        foreground = '#000000' ,
        scale      = 2 ,
        textColor ,
    }
    = {}
) =>
{
    if ( !symbol?.rects?.length )
    {
        throw new Error( 'barcodeToPng : the symbol is empty.' ) ;
    }

    const pixels = Math.max( 1 , Math.round( scale ) ) ;
    const width  = symbol.width * pixels ;
    const height = Math.ceil( symbol.height * pixels ) ;

    let canvas ;

    if ( typeof OffscreenCanvas !== 'undefined' )
    {
        canvas = new OffscreenCanvas( width , height ) ;
    }
    else if ( typeof document !== 'undefined' )
    {
        canvas = document.createElement( 'canvas' ) ;
        canvas.width  = width ;
        canvas.height = height ;
    }
    else
    {
        throw new Error( 'barcodeToPng : no canvas is available here — export the SVG instead.' ) ;
    }

    const fonts = [ ...new Set( symbol.texts.map( text => `${ fontWeight } ${ text.size * pixels }px ${ fontFamily }` ) ) ] ;

    if ( fonts.length > 0 && typeof document !== 'undefined' && document.fonts?.load )
    {
        // A face that cannot be loaded leaves the fallback face : the bars are drawn all the same.
        await Promise.all( fonts.map( font => document.fonts.load( font ) ) ).catch( () => null ) ;
    }

    const context = canvas.getContext( '2d' ) ;

    if ( background )
    {
        context.fillStyle = background ;
        context.fillRect( 0 , 0 , width , height ) ;
    }

    context.fillStyle = foreground ;

    for ( const rect of symbol.rects )
    {
        context.fillRect( rect.x * pixels , rect.y * pixels , rect.width * pixels , rect.height * pixels ) ;
    }

    context.fillStyle    = textColor ?? foreground ;
    context.textAlign    = 'center' ;
    context.textBaseline = 'alphabetic' ;

    for ( const text of symbol.texts )
    {
        context.font = `${ fontWeight } ${ text.size * pixels }px ${ fontFamily }` ;
        context.fillText( text.value , text.x * pixels , text.y * pixels ) ;
    }

    if ( typeof canvas.convertToBlob === 'function' )
    {
        return canvas.convertToBlob( { type : 'image/png' } ) ;
    }

    return new Promise( ( resolve , reject ) =>
    {
        canvas.toBlob( blob => blob ? resolve( blob ) : reject( new Error( 'barcodeToPng : the image could not be encoded.' ) ) , 'image/png' ) ;
    } ) ;
} ;

export default barcodeToPng ;
