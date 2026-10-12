'use client' ;

import { useEffect , useId , useRef , useState } from 'react' ;

import {
    MdAudiotrack ,
    MdClose ,
    MdCloudUpload ,
    MdInsertDriveFile ,
    MdMovie ,
    MdPictureAsPdf ,
} from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import cn from '../../themes/helpers/cn' ;

import getButtonClassNames , { CIRCLE , GHOST } from '../../themes/components/button' ;

import useI18n         from '../../contexts/locale/useI18n' ;
import NO_LOCALE       from '../../contexts/locale/noLocale' ;
import useNumberFormat from '../../hooks/useNumberFormat' ;
import useValue        from '../../hooks/useValue' ;

import checkFiles , { FILE_REFUSALS , needsDimensions } from '../../helpers/files/checkFiles' ;
import formatFileSize from '../../helpers/files/formatFileSize' ;
import matchAccept , { acceptTokens } from '../../helpers/files/matchAccept' ;
import readImageSize from '../../helpers/images/readImageSize' ;
import resizeImage   from '../../helpers/images/resizeImage' ;

const NO_FILES = [] ;

/**
 * The images `resize` shrinks : an animated GIF would lose its animation, an SVG its vectors.
 */
const RESIZABLE = /^image\/(jpeg|png|webp|heic|heif)$/ ;

let lastId = 0 ;

/**
 * An id for a file : `crypto.randomUUID` needs HTTPS, a lab on a local network has none.
 * @returns {string}
 */
const nextId = () => `file-${ Date.now().toString( 36 ) }-${ ++lastId }` ;

/**
 * Whether a drag carries files — not a link, not a selection of text.
 * @param {DragEvent} event
 * @returns {boolean}
 */
const carriesFiles = event => Array.from( event.dataTransfer?.types ?? [] ).includes( 'Files' ) ;

/**
 * The icon of a file that has no thumbnail.
 * @param {string} type
 * @returns {React.ElementType}
 */
const iconOf = type =>
{
    if ( type === 'application/pdf' )
    {
        return MdPictureAsPdf ;
    }
    if ( type.startsWith( 'video/' ) )
    {
        return MdMovie ;
    }
    if ( type.startsWith( 'audio/' ) )
    {
        return MdAudiotrack ;
    }
    return MdInsertDriveFile ;
} ;

/**
 * Writes a limit of dimensions : `↔ 800 px  ↕ 600 px`, either one alone.
 */
const dimensionLimit = ( width , height ) =>
    [ width != null && `↔ ${ width } px` , height != null && `↕ ${ height } px` ].filter( Boolean ).join( '  ' ) ;

const zoneLooks =
{
    accept : 'border-primary bg-primary/10' ,
    idle   : 'border-base-content/25 hover:border-primary/60 hover:bg-base-200/60' ,
    reject : 'border-error bg-error/10' ,
} ;

/**
 * FileDropzone — files dropped from the desktop, or chosen, checked before they are taken.
 *
 * A zone files are dragged onto, which is also a button : a click, Enter or
 * Space opens the file chooser — and on a phone, where nothing can be dragged
 * onto a page, a tap does. Each file is checked against the rules — type,
 * weight, count and, for an image, dimensions — **before** it is taken : a file
 * refused never enters the list ; it shows under the zone with its reason, and
 * `onReject( rejections )` is called.
 *
 * While files hover the zone, the browser tells their types but not their
 * names nor their weight : the zone says « refused » only for a type it is
 * sure of. Everything else is checked on the drop.
 *
 * 🚨 **A file dropped beside the zone does nothing.** Left alone, the browser
 * opens it — the page and whatever was typed in it are gone. While a zone is
 * mounted, a file dropped anywhere it does not take is ignored — beside it,
 * or on the zone itself once it is full or disabled.
 *
 * `onChange( files )` receives every file taken, each
 * `{ id , file , url? , width? , height? , originalSize? }` : `file` is what
 * to send ; `url` previews an image and lives as long as the component.
 * `resize` (off) shrinks the images through
 * {@link module:helpers/images/resizeImage} — which also takes their metadata
 * out — and sets `originalSize`. With `name`, the files go with a `<form>`.
 * `showList={ false }` leaves the list to the host.
 *
 * Sending the files, and their progress, are the application's.
 *
 * @module components/media/FileDropzone
 *
 * @example
 * ```jsx
 * <FileDropzone
 *     accept   = ".pdf"
 *     helper   = "PDF, 5 MB at most"
 *     maxFiles = { 3 }
 *     maxSize  = { 5 * 1024 * 1024 }
 *     onChange = { setDocuments }
 * />
 *
 * // Images of 800 × 600 at least, shrunk before they are taken
 * <FileDropzone accept="image/*" minHeight={ 600 } minWidth={ 800 } onChange={ setImages } resize />
 * ```
 *
 * @param {Object} props
 * @param {string|string[]} [props.accept] - The types taken : MIME types, wildcards (`image/*`), extensions (`.pdf`).
 * @param {string} [props.className] - Additional classes for the container.
 * @param {Array} [props.defaultValue=[]] - The initial files (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the zone and the remove buttons.
 * @param {string} [props.error] - An error of the host's, under the zone.
 * @param {React.ReactNode} [props.helper] - Shown in the zone, under its sentence : say what it takes.
 * @param {string} [props.label] - The visible name of the field.
 * @param {number} [props.maxFiles] - How many files, those already there counted.
 * @param {number} [props.maxHeight] - In pixels, images only.
 * @param {number} [props.maxSize] - In bytes.
 * @param {number} [props.maxWidth] - In pixels, images only.
 * @param {number} [props.minHeight] - In pixels, images only.
 * @param {number} [props.minSize] - In bytes.
 * @param {number} [props.minWidth] - In pixels, images only.
 * @param {string} [props.name] - Sends the files with a `<form>`, under this name.
 * @param {Function} [props.onChange] - `( files ) => void`.
 * @param {Function} [props.onReject] - `( rejections ) => void`, each `{ file , reason , message }`.
 * @param {string} [props.path='components.media.dropzone'] - i18n path of the labels.
 * @param {React.ReactNode} [props.prompt] - The zone's sentence. Defaults to the i18n `prompt` (a mouse) and `touch` (a finger) keys.
 * @param {boolean|{ maxSize? : ?number , quality? : number , type? : string }} [props.resize=false] - Shrink the images ; `true` for the defaults of `resizeImage`.
 * @param {boolean} [props.showList=true] - Show the files taken, under the zone.
 * @param {Function} [props.validate] - `( file ) => true | string`, a rule of the host's.
 * @param {Array} [props.value] - The files (controlled).
 */
const FileDropzone =
({
    accept ,
    className ,
    defaultValue = NO_FILES ,
    disabled     = false ,
    error ,
    helper ,
    label ,
    maxFiles ,
    maxHeight ,
    maxSize ,
    maxWidth ,
    minHeight ,
    minSize ,
    minWidth ,
    name ,
    onChange ,
    onReject ,
    path         = 'components.media.dropzone' ,
    prompt ,
    resize       = false ,
    showList     = true ,
    validate ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { locale } = useNumberFormat() ;

    const labelId  = useId() ;
    const helperId = useId() ;

    const zoneRef  = useRef( null ) ;
    const inputRef = useRef( null ) ;
    const formRef  = useRef( null ) ;

    // Entered minus left : the children of the zone send their own enter and leave, which must not blink the zone.
    const depthRef = useRef( 0 ) ;

    const [ items , setItems ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const [ hover   , setHover   ] = useState( 'idle' ) ;
    const [ pending , setPending ] = useState( false ) ;
    const [ refused , setRefused ] = useState( [] ) ;

    // The files as they are now : a drop is checked across an await, the render it started from is gone by then.
    const itemsRef = useRef( items ) ;
    useEffect( () =>
    {
        itemsRef.current = items ;
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

    // A file dropped beside the zone : without this, the browser would open it and the page would be lost.
    useEffect( () =>
    {
        // Runs after the zone's own handlers : a drop the zone took is already marked as handled.
        const guard = event =>
        {
            if ( carriesFiles( event ) && !event.defaultPrevented )
            {
                event.preventDefault() ;
                if ( event.dataTransfer )
                {
                    event.dataTransfer.dropEffect = 'none' ;
                }
            }
        } ;

        globalThis.addEventListener( 'dragover' , guard ) ;
        globalThis.addEventListener( 'drop' , guard ) ;

        return () =>
        {
            globalThis.removeEventListener( 'dragover' , guard ) ;
            globalThis.removeEventListener( 'drop' , guard ) ;
        } ;
    }
    , [] ) ;

    // The files, in the hidden input a form sends.
    useEffect( () =>
    {
        if ( !name || !formRef.current || typeof DataTransfer !== 'function' )
        {
            return ;
        }

        try
        {
            const transfer = new DataTransfer() ;
            for ( const item of items ?? [] )
            {
                transfer.items.add( item.file ) ;
            }
            formRef.current.files = transfer.files ;
        }
        catch
        {
            // A browser that cannot build a file list : the files still reach onChange.
        }
    }
    , [ items , name ] ) ;

    const list = items ?? NO_FILES ;
    const full = maxFiles != null && list.length >= maxFiles ;

    const rules = { accept , maxFiles , maxHeight , maxSize , maxWidth , minHeight , minSize , minWidth , validate } ;

    // `file` describes the refused file : its name, its weight, its dimensions written out.
    const message = ( { file , message : own , reason } ) =>
    {
        const template = labels.errors?.[ reason ] ;

        if ( reason === FILE_REFUSALS.CUSTOM && own )
        {
            return own ;
        }

        switch ( reason )
        {
            case FILE_REFUSALS.MAX_SIZE :
                return format( template ?? '{0}' , file.name , formatFileSize( file.size , locale ) , formatFileSize( maxSize , locale ) ) ;
            case FILE_REFUSALS.MIN_SIZE :
                return format( template ?? '{0}' , file.name , formatFileSize( file.size , locale ) , formatFileSize( minSize , locale ) ) ;
            case FILE_REFUSALS.MAX_FILES :
                return format( template ?? '{0}' , file.name , maxFiles ) ;
            case FILE_REFUSALS.MIN_DIMENSIONS :
            case FILE_REFUSALS.MAX_DIMENSIONS :
            {
                const [ width , height ] = reason === FILE_REFUSALS.MIN_DIMENSIONS ? [ minWidth , minHeight ] : [ maxWidth , maxHeight ] ;
                return format( template ?? '{0}' , file.name , file.dimensions ?? '' , dimensionLimit( width , height ) ) ;
            }
            default :
                return format( template ?? '{0}' , file.name ) ;
        }
    } ;

    const take = async files =>
    {
        if ( disabled || files.length === 0 )
        {
            return ;
        }

        setPending( true ) ;
        setRefused( [] ) ;

        // Only an image that could be taken is decoded : refusing a PDF needs no pixel.
        const dimensions = new Map() ;

        if ( needsDimensions( rules ) )
        {
            await Promise.all( files
                .filter( file => file.type.startsWith( 'image/' ) && matchAccept( file , accept ) )
                .map( async file =>
                {
                    try
                    {
                        dimensions.set( file , await readImageSize( file ) ) ;
                    }
                    catch
                    {
                        dimensions.set( file , false ) ;
                    }
                } ) ) ;
        }

        const { accepted , rejected } = checkFiles( files , rules , { count : ( itemsRef.current ?? [] ).length , dimensions } ) ;

        const results = await Promise.allSettled( accepted.map( async file =>
        {
            const size = dimensions.get( file ) ;

            if ( resize && RESIZABLE.test( file.type ) )
            {
                const shrunk = await resizeImage( file , resize === true ? undefined : resize ) ;
                return { file : shrunk.file , height : shrunk.height , originalSize : shrunk.originalSize , width : shrunk.width } ;
            }

            return { file , ...size && { height : size.height , width : size.width } } ;
        } ) ) ;

        const added = [] ;

        results.forEach( ( result , index ) =>
        {
            if ( result.status === 'rejected' )
            {
                rejected.push( { file : accepted[ index ] , reason : FILE_REFUSALS.DECODE } ) ;
                return ;
            }

            const item = { id : nextId() , ...result.value } ;

            if ( item.file.type.startsWith( 'image/' ) )
            {
                item.url = URL.createObjectURL( item.file ) ;
                urlsRef.current.add( item.url ) ;
            }

            added.push( item ) ;
        } ) ;

        const rejections = rejected.map( rejection =>
        {
            const size = dimensions.get( rejection.file ) ;
            const file =
            {
                dimensions : size ? `${ size.width } × ${ size.height } px` : undefined ,
                name       : rejection.file.name ,
                size       : rejection.file.size ,
            } ;
            return { ...rejection , message : message( { ...rejection , file } ) } ;
        } ) ;

        setPending( false ) ;
        setRefused( rejections ) ;

        if ( rejections.length > 0 )
        {
            onReject?.( rejections ) ;
        }

        if ( added.length > 0 )
        {
            setItems( [ ...( itemsRef.current ?? [] ) , ...added ] ) ;
        }
    } ;

    const remove = item =>
    {
        setItems( list.filter( entry => entry.id !== item.id ) ) ;

        if ( item.url && urlsRef.current.has( item.url ) )
        {
            URL.revokeObjectURL( item.url ) ;
            urlsRef.current.delete( item.url ) ;
        }
    } ;

    // --------- Dragging over the zone

    const onDragEnter = event =>
    {
        if ( disabled || !carriesFiles( event ) )
        {
            return ;
        }

        event.preventDefault() ;
        depthRef.current += 1 ;

        // Types only : the names and weights come with the drop. Safari may give none yet — taken as fine.
        const types = Array.from( event.dataTransfer.items ?? [] ).filter( item => item.kind === 'file' ).map( item => item.type ) ;
        const fits  = types.every( type => matchAccept( { type } , accept , { unknown : true } ) ) ;

        setHover( fits ? 'accept' : 'reject' ) ;
    } ;

    const onDragOver = event =>
    {
        if ( disabled || !carriesFiles( event ) )
        {
            return ;
        }

        event.preventDefault() ;
        event.dataTransfer.dropEffect = hover === 'reject' ? 'none' : 'copy' ;
    } ;

    const onDragLeave = event =>
    {
        if ( disabled || !carriesFiles( event ) )
        {
            return ;
        }

        depthRef.current = Math.max( 0 , depthRef.current - 1 ) ;

        if ( depthRef.current === 0 )
        {
            setHover( 'idle' ) ;
        }
    } ;

    const onDrop = event =>
    {
        if ( disabled || !carriesFiles( event ) )
        {
            return ;
        }

        event.preventDefault() ;
        depthRef.current = 0 ;
        setHover( 'idle' ) ;
        take( Array.from( event.dataTransfer.files ?? [] ) ) ;
    } ;

    const onPick = event =>
    {
        const files = Array.from( event.target.files ?? [] ) ;

        // Emptied, so the same file can be chosen again.
        event.target.value = '' ;

        take( files ) ;
    } ;

    const sentence = hover === 'accept' ? labels.accept : hover === 'reject' ? labels.reject : null ;

    return (
        <div className={ cn( 'flex flex-col gap-3' , className ) }>

            { label && <span className="label" id={ labelId }>{ label }</span> }

            <button
                aria-describedby = { [ label && labelId , helper && helperId ].filter( Boolean ).join( ' ' ) || undefined }
                className        = { cn(
                    'flex w-full flex-col items-center justify-center gap-2 rounded-box border-2 border-dashed p-8 text-center transition-colors' ,
                    'outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary' ,
                    zoneLooks[ hover ] ,
                    error && hover === 'idle' && 'border-error' ,
                    ( disabled || full ) && 'cursor-not-allowed opacity-50 hover:border-base-content/25 hover:bg-transparent'
                ) }
                disabled         = { disabled || full }
                onClick          = { () => inputRef.current?.click() }
                onDragEnter      = { onDragEnter }
                onDragLeave      = { onDragLeave }
                onDragOver       = { onDragOver }
                onDrop           = { onDrop }
                ref              = { zoneRef }
                type             = "button"
            >
                { pending
                    ? <span aria-hidden="true" className="loading loading-spinner loading-lg text-primary" />
                    : <MdCloudUpload aria-hidden="true" className={ cn( 'size-10' , hover === 'reject' ? 'text-error' : hover === 'accept' ? 'text-primary' : 'text-base-content/50' ) } /> }

                <span className="font-medium">
                    { pending ? labels.processing : sentence ?? prompt ?? (
                        <>
                            <span className="pointer-coarse:hidden">{ labels.prompt }</span>
                            <span className="hidden pointer-coarse:inline">{ labels.touch }</span>
                        </>
                    ) }
                </span>

                { helper && <span className="text-xs text-base-content/60" id={ helperId }>{ helper }</span> }
            </button>

            <input
                accept    = { acceptTokens( accept ).join( ',' ) || undefined }
                className = "hidden"
                multiple  = { maxFiles !== 1 }
                onChange  = { onPick }
                ref       = { inputRef }
                tabIndex  = { -1 }
                type      = "file"
            />

            { name && (
                <input className="hidden" multiple name={ name } ref={ formRef } tabIndex={ -1 } type="file" />
            ) }

            { refused.map( ( { file , message : text } , index ) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: two refusals may share a file name.
                <p className="text-xs text-error" key={ `${ file.name }-${ index }` } role="alert">{ text }</p>
            ) ) }

            { showList && list.length > 0 && (
                <ul className="flex flex-col divide-y divide-base-content/10 rounded-box bg-base-100">
                    { list.map( item =>
                    {
                        const Icon = iconOf( item.file.type ) ;
                        return (
                            <li className="flex items-center gap-3 p-2" key={ item.id }>
                                { item.url
                                    // biome-ignore lint/performance/noImgElement: a local object URL, nothing for next/image to optimise.
                                    ? <img alt="" className="size-10 shrink-0 rounded-field bg-base-200 object-cover" src={ item.url } />
                                    : <Icon aria-hidden="true" className="size-10 shrink-0 p-1.5 text-base-content/50" /> }
                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-sm">{ item.file.name }</span>
                                    <span className="text-xs text-base-content/60 tabular-nums">
                                        { item.originalSize ? `${ formatFileSize( item.originalSize , locale ) } → ` : '' }
                                        { formatFileSize( item.file.size , locale ) }
                                        { item.width ? ` · ${ item.width } × ${ item.height } px` : '' }
                                    </span>
                                </span>
                                <button
                                    aria-label = { format( labels.remove ?? '{0}' , item.file.name ) }
                                    className  = { getButtonClassNames( { shape : CIRCLE , size : 'sm' , style : GHOST } ) }
                                    disabled   = { disabled }
                                    onClick    = { () => remove( item ) }
                                    title      = { format( labels.remove ?? '{0}' , item.file.name ) }
                                    type       = "button"
                                >
                                    <MdClose aria-hidden="true" className="size-4" />
                                </button>
                            </li>
                        ) ;
                    } ) }
                </ul>
            ) }

            { error && <p className="text-xs text-error">{ error }</p> }

        </div>
    ) ;
} ;

FileDropzone.displayName = 'FileDropzone' ;

export default FileDropzone ;
