/**
 * Every page of a document drawn as an image, for printing.
 *
 * 🔑 **One canvas, reused.** A page at 150 dpi is an A4 of 1240 × 1754 pixels,
 * nine megabytes once painted ; forty of them would not fit a phone. Each
 * page is drawn into the same canvas, turned into a JPEG data url — a few
 * hundred kilobytes — and the canvas is painted over by the next. The pages
 * come out in order, one at a time, and `onProgress` says how far it got.
 *
 * @module helpers/pdf/renderPagesToImages
 *
 * @param {Object} pdf - The pdf.js document (`numPages`, `getPage`).
 * @param {Object} [options]
 * @param {number} [options.dpi=150] - The resolution. 150 reads well on paper ; 300 is print quality, four times the work.
 * @param {Function} [options.onProgress] - `( done , total ) => void` after each page.
 * @param {number} [options.quality=0.92] - JPEG quality, 0 to 1.
 * @param {number} [options.rotation=0] - Degrees, as the viewer shows the document.
 * @param {AbortSignal} [options.signal] - Stops after the page in progress.
 * @returns {Promise<Array<{ height : number , url : string , width : number }>>} One image per page, with its size in CSS points at 72 dpi.
 */
const renderPagesToImages = async ( pdf , { dpi = 150 , onProgress , quality = 0.92 , rotation = 0 , signal } = {} ) =>
{
    const scale  = dpi / 72 ;
    const canvas = document.createElement( 'canvas' ) ;
    const images = [] ;

    for ( let number = 1 ; number <= pdf.numPages ; number++ )
    {
        if ( signal?.aborted )
        {
            break ;
        }

        const page     = await pdf.getPage( number ) ;
        const viewport = page.getViewport( { rotation : ( page.rotate + rotation ) % 360 , scale } ) ;

        canvas.width  = Math.ceil( viewport.width ) ;
        canvas.height = Math.ceil( viewport.height ) ;

        const context = canvas.getContext( '2d' , { alpha : false } ) ;

        context.fillStyle = '#fff' ;
        context.fillRect( 0 , 0 , canvas.width , canvas.height ) ;

        await page.render( { canvas , canvasContext : context , viewport } ).promise ;

        images.push(
        {
            height : viewport.height / scale ,
            url    : canvas.toDataURL( 'image/jpeg' , quality ) ,
            width  : viewport.width / scale ,
        } ) ;

        page.cleanup() ;

        onProgress?.( number , pdf.numPages ) ;
    }

    canvas.width  = 0 ;
    canvas.height = 0 ;

    return images ;
} ;

export default renderPagesToImages ;
