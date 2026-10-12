'use client' ;

import { useEffect , useId , useRef , useState } from 'react' ;

import { MdClose , MdPhotoCamera , MdPhotoLibrary } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import cn from '../../themes/helpers/cn' ;

import getButtonClassNames , { CIRCLE , OUTLINE } from '../../themes/components/button' ;

import useI18n         from '../../contexts/locale/useI18n' ;
import NO_LOCALE       from '../../contexts/locale/noLocale' ;
import useNumberFormat from '../../hooks/useNumberFormat' ;
import useValue        from '../../hooks/useValue' ;

import resizeImage , { ImageResizeError , RESIZE_DEFAULTS } from '../../helpers/images/resizeImage' ;
import { EXIF_READ_LENGTH , readGpsLocation } from '../../helpers/images/exif' ;

const NO_PHOTOS = [] ;

let lastId = 0 ;

/**
 * An id for a photo : `crypto.randomUUID` needs HTTPS, a lab on a local network has none.
 * @returns {string}
 */
const nextId = () => `photo-${ Date.now().toString( 36 ) }-${ ++lastId }` ;

/**
 * Prepares one file : shrunk, stripped, with a preview address — and its
 * position, read from the original, when asked.
 *
 * @returns {Promise<Object>} The photo.
 */
const prepare = async ( file , resize , readLocation ) =>
{
    const location = readLocation
        ? readGpsLocation( await file.slice( 0 , EXIF_READ_LENGTH ).arrayBuffer() )
        : undefined ;

    const { file : resized , height , originalSize , width } = await resizeImage( file , resize ) ;

    return {
        file : resized ,
        height ,
        id   : nextId() ,
        ...readLocation && { location } ,
        originalSize ,
        size : resized.size ,
        url  : URL.createObjectURL( resized ) ,
        width ,
    } ;
} ;

/**
 * PhotoCapture — a photo taken on the spot, shrunk and stripped before it leaves.
 *
 * A large button opens the back camera of a phone at once (`capture`) — the
 * file chooser on a desktop. Each photo goes through
 * {@link module:helpers/images/resizeImage} : no larger than `resize.maxSize`,
 * encoded again, so a 5 MB photo leaves as a few hundred KB. The photos show as
 * thumbnails, each with its weight and a button to remove it ; the buttons go
 * away once `max` is reached.
 *
 * 🔑 **Nothing of the original metadata leaves** : no EXIF, **no GPS**,
 * whatever the photo. `readLocation` (off by default) reads the position from
 * the original before it is shrunk and gives it apart, as data —
 * `location : { latitude , longitude , elevation? }`, schema.org's
 * `GeoCoordinates`, or `null` when the photo has none (most do not : iOS takes
 * it out before the page sees the file).
 *
 * `onChange( photos )` receives every photo, each
 * `{ id , file , url , width , height , size , originalSize , location? }` :
 * `file` is what to send ; `url` shows it, and lives as long as the component
 * — it is released when the photo is removed and on unmount. With `name`, the
 * shrunk files also go with a `<form>`, through a hidden file input.
 *
 * Keeping the photos until the network comes back is the application's
 * business, as is sending them.
 *
 * @module components/media/PhotoCapture
 *
 * @example
 * ```jsx
 * <PhotoCapture label="Damage" max={ 3 } onChange={ setPhotos } />
 *
 * // Smaller, in WebP, from the gallery too, the position kept apart
 * <PhotoCapture
 *     allowGallery
 *     readLocation
 *     onChange = { setPhotos }
 *     resize   = { { maxSize : 1200 , quality : 0.7 , type : 'image/webp' } }
 * />
 * ```
 *
 * @param {Object} props
 * @param {boolean} [props.allowGallery=false] - A second button, for a photo already taken.
 * @param {'environment'|'user'} [props.capture='environment'] - The camera a phone opens : the back one, or the front.
 * @param {string} [props.className] - Additional classes for the container.
 * @param {Array} [props.defaultValue=[]] - The initial photos (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the buttons and the remove buttons.
 * @param {string} [props.error] - An error of the host's, under the photos.
 * @param {string} [props.helper] - Helper text, under the photos.
 * @param {string} [props.label] - The visible name of the field.
 * @param {number} [props.max=1] - How many photos.
 * @param {string} [props.name] - Sends the shrunk files with a `<form>`, under this name.
 * @param {Function} [props.onChange] - `( photos ) => void`.
 * @param {Function} [props.onError] - `( error : ImageResizeError , file ) => void`, for a file refused.
 * @param {string} [props.path='components.media.photo'] - i18n path of the labels.
 * @param {boolean} [props.readLocation=false] - Read the position from the original into `location`.
 * @param {{ maxSize? : ?number , quality? : number , type? : string }} [props.resize] - The options of `resizeImage` : 1600 pixels, 0.8, JPEG by default.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - The size of the buttons.
 * @param {Array} [props.value] - The photos (controlled).
 */
const PhotoCapture =
({
    allowGallery = false ,
    capture      = 'environment' ,
    className ,
    defaultValue = NO_PHOTOS ,
    disabled     = false ,
    error ,
    helper ,
    label ,
    max          = 1 ,
    name ,
    onChange ,
    onError ,
    path         = 'components.media.photo' ,
    readLocation = false ,
    resize       = RESIZE_DEFAULTS ,
    size         = 'md' ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { formatNumber } = useNumberFormat() ;

    const labelId = useId() ;

    const cameraRef  = useRef( null ) ;
    const galleryRef = useRef( null ) ;
    const formRef    = useRef( null ) ;

    const [ photos , setPhotos ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const [ pending , setPending ] = useState( 0 ) ;
    const [ refused , setRefused ] = useState( [] ) ;

    // The photos as they are now : a file is prepared across an await, the render it started from is gone by then.
    const photosRef = useRef( photos ) ;
    useEffect( () =>
    {
        photosRef.current = photos ;
    } ) ;

    // The preview addresses this component made, released on unmount.
    const urlsRef = useRef( new Set() ) ;
    useEffect( () =>
    {
        const urls = urlsRef.current ;
        return () =>
        {
            for ( const url of urls )
            {
                URL.revokeObjectURL( url ) ;
            }
            urls.clear() ;
        } ;
    }
    , [] ) ;

    // The shrunk files, in the hidden input a form sends.
    useEffect( () =>
    {
        if ( !name || !formRef.current || typeof DataTransfer !== 'function' )
        {
            return ;
        }

        try
        {
            const transfer = new DataTransfer() ;
            for ( const photo of photos ?? [] )
            {
                transfer.items.add( photo.file ) ;
            }
            formRef.current.files = transfer.files ;
        }
        catch
        {
            // A browser that cannot build a file list : the photos still reach onChange.
        }
    }
    , [ name , photos ] ) ;

    const list  = photos ?? NO_PHOTOS ;
    const room  = Math.max( 0 , max - list.length - pending ) ;
    const full  = room === 0 ;

    const onFiles = async event =>
    {
        const files = Array.from( event.target.files ?? [] ).slice( 0 , room ) ;

        // Emptied, so the same photo can be picked again.
        event.target.value = '' ;

        if ( files.length === 0 )
        {
            return ;
        }

        setPending( count => count + files.length ) ;
        setRefused( [] ) ;

        const results = await Promise.allSettled( files.map( file => prepare( file , resize , readLocation ) ) ) ;

        const added    = [] ;
        const failures = [] ;

        results.forEach( ( result , index ) =>
        {
            if ( result.status === 'fulfilled' )
            {
                urlsRef.current.add( result.value.url ) ;
                added.push( result.value ) ;
                return ;
            }

            const failure = result.reason instanceof ImageResizeError
                ? result.reason
                : new ImageResizeError( 'decode' , files[ index ] , result.reason ) ;

            failures.push( { name : files[ index ].name , reason : failure.reason } ) ;
            onError?.( failure , files[ index ] ) ;
        } ) ;

        setPending( count => count - files.length ) ;
        setRefused( failures ) ;

        if ( added.length > 0 )
        {
            setPhotos( [ ...( photosRef.current ?? [] ) , ...added ] ) ;
        }
    } ;

    const remove = photo =>
    {
        setPhotos( list.filter( item => item.id !== photo.id ) ) ;

        if ( urlsRef.current.has( photo.url ) )
        {
            URL.revokeObjectURL( photo.url ) ;
            urlsRef.current.delete( photo.url ) ;
        }
    } ;

    const kilobytes = bytes => formatNumber( bytes / 1024 , { maximumFractionDigits : 0 , style : 'unit' , unit : 'kilobyte' } ) ;

    const multiple = room > 1 ;

    return (
        // biome-ignore lint/a11y/useSemanticElements: a fieldset draws a frame and a legend this field does not have.
        <div
            aria-labelledby = { label ? labelId : undefined }
            className       = { cn( 'flex flex-col gap-3' , className ) }
            role            = "group"
        >
            { label && (
                <div className="flex items-baseline justify-between gap-2">
                    <span className="label" id={ labelId }>{ label }</span>
                    { max > 1 && (
                        <span className="text-xs text-base-content/60">{ format( labels.count ?? '{0} / {1}' , list.length , max ) }</span>
                    ) }
                </div>
            ) }

            { !full && (
                <div className="flex flex-wrap gap-2">
                    <button
                        className = { getButtonClassNames( { color : 'primary' , size } ) }
                        disabled  = { disabled }
                        onClick   = { () => cameraRef.current?.click() }
                        type      = "button"
                    >
                        <MdPhotoCamera aria-hidden="true" className="size-5" />
                        { labels.take }
                    </button>

                    { allowGallery && (
                        <button
                            className = { getButtonClassNames( { color : 'primary' , size , style : OUTLINE } ) }
                            disabled  = { disabled }
                            onClick   = { () => galleryRef.current?.click() }
                            type      = "button"
                        >
                            <MdPhotoLibrary aria-hidden="true" className="size-5" />
                            { labels.gallery }
                        </button>
                    ) }
                </div>
            ) }

            <input
                accept    = "image/*"
                capture   = { capture }
                className = "hidden"
                multiple  = { multiple }
                onChange  = { onFiles }
                ref       = { cameraRef }
                tabIndex  = { -1 }
                type      = "file"
            />

            { allowGallery && (
                <input
                    accept    = "image/*"
                    className = "hidden"
                    multiple  = { multiple }
                    onChange  = { onFiles }
                    ref       = { galleryRef }
                    tabIndex  = { -1 }
                    type      = "file"
                />
            ) }

            { name && (
                <input className="hidden" multiple name={ name } ref={ formRef } tabIndex={ -1 } type="file" />
            ) }

            { ( list.length > 0 || pending > 0 ) && (
                <ul className="flex flex-wrap gap-3">
                    { list.map( ( photo , index ) => (
                        <li className="relative flex flex-col gap-1" key={ photo.id }>
                            {/* biome-ignore lint/performance/noImgElement: a local object URL, nothing for next/image to optimise. */}
                            <img
                                alt       = { format( labels.alt ?? '{0}' , index + 1 ) }
                                className = "size-24 rounded-box bg-base-200 object-cover"
                                height    = { photo.height }
                                src       = { photo.url }
                                width     = { photo.width }
                            />
                            <span className="text-center text-xs text-base-content/60 tabular-nums">{ kilobytes( photo.size ) }</span>
                            <button
                                aria-label = { format( labels.remove ?? '{0}' , index + 1 ) }
                                className  = { cn( getButtonClassNames( { shape : CIRCLE , size : 'sm' } ) , 'absolute -right-2 -top-2 shadow' ) }
                                disabled   = { disabled }
                                onClick    = { () => remove( photo ) }
                                title      = { format( labels.remove ?? '{0}' , index + 1 ) }
                                type       = "button"
                            >
                                <MdClose aria-hidden="true" className="size-4" />
                            </button>
                        </li>
                    ) ) }

                    { Array.from( { length : pending } , ( _ , index ) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: placeholders, identical and without identity.
                        <li className="flex size-24 items-center justify-center rounded-box bg-base-200" key={ `pending-${ index }` }>
                            <span aria-hidden="true" className="loading loading-spinner" />
                        </li>
                    ) ) }
                </ul>
            ) }

            <p aria-live="polite" className="sr-only">{ pending > 0 ? labels.processing : '' }</p>

            { refused.map( ( { name : file , reason } ) => (
                <p className="text-xs text-error" key={ `${ file }-${ reason }` } role="alert">
                    { format( labels.errors?.[ reason ] ?? '{0}' , file ) }
                </p>
            ) ) }

            { ( error || helper ) && (
                <p className={ cn( 'text-xs' , error ? 'text-error' : 'text-base-content/70' ) }>
                    { error || helper }
                </p>
            ) }
        </div>
    ) ;
} ;

PhotoCapture.displayName = 'PhotoCapture' ;

export default PhotoCapture ;
