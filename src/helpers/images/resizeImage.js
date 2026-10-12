import fitWithin from './fitWithin' ;

/**
 * The defaults of {@link module:helpers/images/resizeImage} : a phone photo
 * comes out around 200 to 400 KB, still sharp on a desktop screen.
 *
 * @type {{ maxSize : number , quality : number , type : string }}
 */
export const RESIZE_DEFAULTS = Object.freeze( { maxSize : 1600 , quality : 0.8 , type : 'image/jpeg' } ) ;

const EXTENSIONS =
{
    'image/jpeg' : 'jpg' ,
    'image/png'  : 'png' ,
    'image/webp' : 'webp' ,
} ;

/**
 * Why an image could not be resized.
 *
 * `reason` is `type` (not an image), `decode` (an image the browser cannot
 * read — a HEIC photo in Chrome on a desktop) or `encode` (the canvas gave
 * nothing back).
 */
export class ImageResizeError extends Error
{
    /**
     * @param {'type'|'decode'|'encode'} reason
     * @param {File|Blob} [file]
     * @param {Error} [cause]
     */
    constructor( reason , file , cause )
    {
        super( `Cannot resize ${ file?.name ?? 'the image' } : ${ reason }` , { cause } ) ;
        this.name   = 'ImageResizeError' ;
        this.reason = reason ;
        this.file   = file ;
    }
}

/**
 * Decodes an image, upright.
 *
 * `imageOrientation : 'from-image'` applies the EXIF orientation to the
 * pixels : a phone often stores its photos unrotated and says how to turn them
 * in the EXIF — which the encoding removes, so the turn must be done first.
 * A browser that rejects the option is asked again without it (it applies the
 * orientation by default) ; one without `createImageBitmap` goes through an
 * `<img>`, which does too.
 *
 * @param {Blob} file
 * @returns {Promise<{ source : CanvasImageSource , width : number , height : number , release : Function }>}
 */
const decode = async file =>
{
    if ( typeof createImageBitmap === 'function' )
    {
        let bitmap ;

        try
        {
            bitmap = await createImageBitmap( file , { imageOrientation : 'from-image' } ) ;
        }
        catch ( error )
        {
            if ( !( error instanceof TypeError ) )
            {
                throw error ;
            }
            bitmap = await createImageBitmap( file ) ;
        }

        return { height : bitmap.height , release : () => bitmap.close() , source : bitmap , width : bitmap.width } ;
    }

    const url   = URL.createObjectURL( file ) ;
    const image = new Image() ;

    try
    {
        image.src = url ;
        await image.decode() ;
    }
    catch ( error )
    {
        URL.revokeObjectURL( url ) ;
        throw error ;
    }

    return { height : image.naturalHeight , release : () => URL.revokeObjectURL( url ) , source : image , width : image.naturalWidth } ;
} ;

/**
 * @param {HTMLCanvasElement} canvas
 * @param {string} type
 * @param {number} quality
 * @returns {Promise<?Blob>}
 */
const encode = ( canvas , type , quality ) => new Promise( resolve => canvas.toBlob( resolve , type , quality ) ) ;

/**
 * Shrinks a photo before it is sent, and takes its metadata out.
 *
 * The image is decoded upright, drawn on a canvas no larger than `maxSize` on
 * either side — never enlarged — and encoded again.
 *
 * 🔑 **The metadata always goes.** Encoding from a canvas writes the pixels
 * and nothing else : the EXIF of the original — position, camera, date — is
 * not in the result, **GPS included**. A property, not an accident : it holds
 * whatever the size, a small JPEG is encoded again too. To keep the position,
 * read it from the original first with
 * {@link module:helpers/images/exif.readGpsLocation}.
 *
 * ⚠️ A browser that cannot encode `type` (WebP in an older Safari) silently
 * gives a PNG : the result is then encoded again as JPEG.
 *
 * Browser only : it needs a canvas.
 *
 * @module helpers/images/resizeImage
 *
 * @param {File|Blob} file - The image, as a file input gives it.
 * @param {Object} [options]
 * @param {?number} [options.maxSize=1600] - The largest width and height, in pixels. `null` keeps the size.
 * @param {number} [options.quality=0.8] - From 0 to 1, for JPEG and WebP.
 * @param {string} [options.type='image/jpeg'] - `image/jpeg`, `image/webp` or `image/png`.
 *
 * @returns {Promise<{ file : File , width : number , height : number , originalWidth : number , originalHeight : number , originalSize : number }>}
 * @throws {ImageResizeError}
 *
 * @example
 * ```js
 * const { file } = await resizeImage( input.files[ 0 ] , { maxSize : 1200 , quality : 0.7 } ) ;
 * body.append( 'photo' , file ) ;
 * ```
 */
const resizeImage = async ( file , { maxSize = RESIZE_DEFAULTS.maxSize , quality = RESIZE_DEFAULTS.quality , type = RESIZE_DEFAULTS.type } = {} ) =>
{
    // An empty type is let through : some systems give none for a HEIC photo, and decoding decides.
    if ( !file || ( file.type && !file.type.startsWith( 'image/' ) ) )
    {
        throw new ImageResizeError( 'type' , file ) ;
    }

    let decoded ;

    try
    {
        decoded = await decode( file ) ;
    }
    catch ( error )
    {
        throw new ImageResizeError( 'decode' , file , error ) ;
    }

    try
    {
        const { height , width } = fitWithin( decoded.width , decoded.height , maxSize ) ;

        const canvas  = document.createElement( 'canvas' ) ;
        canvas.width  = width ;
        canvas.height = height ;

        const context = canvas.getContext( '2d' ) ;
        context.imageSmoothingEnabled = true ;
        context.imageSmoothingQuality = 'high' ;

        // A transparent PNG turned to JPEG would come out black where it was clear.
        if ( type !== 'image/png' )
        {
            context.fillStyle = '#fff' ;
            context.fillRect( 0 , 0 , width , height ) ;
        }

        context.drawImage( decoded.source , 0 , 0 , width , height ) ;

        let blob = await encode( canvas , type , quality ) ;

        if ( blob && blob.type !== type )
        {
            blob = await encode( canvas , RESIZE_DEFAULTS.type , quality ) ;
        }

        if ( !blob )
        {
            throw new ImageResizeError( 'encode' , file ) ;
        }

        const base = ( file.name ?? 'photo' ).replace( /\.[^.]*$/ , '' ) || 'photo' ;

        return {
            file           : new File( [ blob ] , `${ base }.${ EXTENSIONS[ blob.type ] ?? 'jpg' }` , { type : blob.type } ) ,
            height ,
            originalHeight : decoded.height ,
            originalSize   : file.size ,
            originalWidth  : decoded.width ,
            width ,
        } ;
    }
    finally
    {
        decoded.release() ;
    }
} ;

export default resizeImage ;
