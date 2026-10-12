/**
 * Draws a module grid into a PNG image, as a `Blob`.
 *
 * ⚠️ **Browser only** : it needs a canvas (`OffscreenCanvas`, or a `<canvas>`
 * element), which a server does not have. On a server, export the SVG with
 * {@link module:helpers/barcodes/matrixToSvg} and rasterize it there if a
 * bitmap is really needed.
 *
 * `scale` is a whole number of pixels per module, so every module lands on
 * whole pixels and the image is sharp — a fractional scale would blur the
 * edges a scanner reads.
 *
 * @module helpers/barcodes/matrixToPng
 *
 * @param {boolean[][]} matrix - The module grid, rows first, quiet zone included.
 * @param {Object} [options]
 * @param {?string} [options.background='#ffffff'] - The light colour ; `null` leaves the background transparent.
 * @param {string} [options.foreground='#000000'] - The dark colour.
 * @param {number} [options.moduleHeight=1] - The height of a row, in modules.
 * @param {number} [options.scale=8] - Pixels per module, rounded to a whole number, at least 1.
 *
 * @returns {Promise<Blob>} The PNG image.
 *
 * @throws {Error} When no canvas is available (on a server) or the grid is empty.
 *
 * @example
 * ```js
 * const png = await matrixToPng( encodeQRCode( 'https://example.com' ) , { scale : 12 } ) ;
 * const form = new FormData() ;
 * form.append( 'file' , png , 'code.png' ) ;
 * ```
 */
const matrixToPng = async (
    matrix ,
    {
        background   = '#ffffff' ,
        foreground   = '#000000' ,
        moduleHeight = 1 ,
        scale        = 8 ,
    }
    = {}
) =>
{
    if ( !Array.isArray( matrix ) || matrix.length === 0 )
    {
        throw new Error( 'matrixToPng : the grid is empty.' ) ;
    }

    const pixels    = Math.max( 1 , Math.round( scale ) ) ;
    const rowHeight = Math.max( 1 , Math.round( moduleHeight * pixels ) ) ;
    const width     = matrix[ 0 ].length * pixels ;
    const height    = matrix.length * rowHeight ;

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
        throw new Error( 'matrixToPng : no canvas is available here — export the SVG instead.' ) ;
    }

    const context = canvas.getContext( '2d' ) ;

    if ( background )
    {
        context.fillStyle = background ;
        context.fillRect( 0 , 0 , width , height ) ;
    }

    context.fillStyle = foreground ;

    matrix.forEach( ( row , y ) =>
    {
        let x = 0 ;

        while ( x < row.length )
        {
            if ( !row[ x ] )
            {
                x++ ;
                continue ;
            }

            const start = x ;

            while ( x < row.length && row[ x ] )
            {
                x++ ;
            }

            context.fillRect( start * pixels , y * rowHeight , ( x - start ) * pixels , rowHeight ) ;
        }
    } ) ;

    if ( typeof canvas.convertToBlob === 'function' )
    {
        return canvas.convertToBlob( { type : 'image/png' } ) ;
    }

    return new Promise( ( resolve , reject ) =>
    {
        canvas.toBlob( blob => blob ? resolve( blob ) : reject( new Error( 'matrixToPng : the image could not be encoded.' ) ) , 'image/png' ) ;
    } ) ;
} ;

export default matrixToPng ;
