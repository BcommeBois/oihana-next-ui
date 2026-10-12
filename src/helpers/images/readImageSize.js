/**
 * The size of an image as it shows — upright, its EXIF orientation applied :
 * a portrait photo stored sideways reads as a portrait.
 *
 * Browser only : the image is decoded, then released.
 *
 * @module helpers/images/readImageSize
 *
 * @param {Blob} file
 * @returns {Promise<{ width : number , height : number }>} Rejects when the browser cannot read the image.
 *
 * @example
 * ```js
 * const { width , height } = await readImageSize( file ) ;
 * ```
 */
const readImageSize = async file =>
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
            // A browser that does not know the option : it applies the orientation by default.
            if ( !( error instanceof TypeError ) )
            {
                throw error ;
            }
            bitmap = await createImageBitmap( file ) ;
        }

        const { height , width } = bitmap ;
        bitmap.close() ;

        return { height , width } ;
    }

    const url = URL.createObjectURL( file ) ;

    try
    {
        const image = new Image() ;
        image.src = url ;
        await image.decode() ;
        return { height : image.naturalHeight , width : image.naturalWidth } ;
    }
    finally
    {
        URL.revokeObjectURL( url ) ;
    }
} ;

export default readImageSize ;
