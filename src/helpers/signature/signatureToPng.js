import strokesToPaths from './strokesToPaths' ;

/**
 * Draws a signature into a PNG, in the browser.
 *
 * The strokes are drawn as paths on a canvas at `scale` times the pad's
 * size — 2 for a screen, 4 for print — on a transparent ground unless a
 * `background` is given. What a back end stores, or `stampImage` puts on a
 * received PDF.
 *
 * @module helpers/signature/signatureToPng
 *
 * @param {import('./scaleSignature').Signature} signature
 * @param {Object} [options]
 * @param {?string} [options.background=null] - A fill behind the strokes ; `null` leaves it transparent.
 * @param {string} [options.color='#000000'] - The ink.
 * @param {number} [options.scale=2] - Pixels per pad unit.
 * @param {number} [options.size=3] - The pen's width, in the pad's units.
 *
 * @returns {Promise<?Blob>} The PNG ; `null` for an empty signature, or outside a browser.
 */
const signatureToPng = ( signature , { background = null , color = '#000000' , scale = 2 , size = 3 } = {} ) => new Promise( resolve =>
{
    const paths = strokesToPaths( signature , { size } ) ;

    if ( paths.length === 0 || typeof document === 'undefined' )
    {
        resolve( null ) ;
        return ;
    }

    const canvas = document.createElement( 'canvas' ) ;

    canvas.width  = Math.round( signature.width * scale ) ;
    canvas.height = Math.round( signature.height * scale ) ;

    const context = canvas.getContext( '2d' ) ;

    if ( background )
    {
        context.fillStyle = background ;
        context.fillRect( 0 , 0 , canvas.width , canvas.height ) ;
    }

    context.scale( scale , scale ) ;
    context.fillStyle = color ;

    for ( const d of paths )
    {
        context.fill( new Path2D( d ) ) ;
    }

    canvas.toBlob( blob => resolve( blob ) , 'image/png' ) ;
} ) ;

export default signatureToPng ;
