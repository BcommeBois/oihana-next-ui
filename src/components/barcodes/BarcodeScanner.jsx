'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import { MdFlashOff , MdFlashOn , MdLockOutline , MdNoPhotography , MdVideocamOff } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import Button  from '../Button' ;
import Loading from '../Loading' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import normalizeScan from '../../helpers/barcodes/normalizeScan' ;

import { SCANNER_FORMATS , createDetector } from './engine' ;

export const IDLE      = 'idle' ;
export const STARTING  = 'starting' ;
export const SCANNING  = 'scanning' ;
export const DENIED    = 'denied' ;
export const NO_CAMERA = 'noCamera' ;
export const INSECURE  = 'insecure' ;
export const ERROR     = 'error' ;

const ICONS =
{
    [ DENIED    ] : MdNoPhotography ,
    [ ERROR     ] : MdVideocamOff ,
    [ INSECURE  ] : MdLockOutline ,
    [ NO_CAMERA ] : MdVideocamOff ,
} ;

/**
 * What a `getUserMedia` failure means for the person holding the device.
 *
 * @param {Error} error
 * @returns {string}
 */
const statusOf = error =>
{
    switch ( error?.name )
    {
        case 'NotAllowedError' :
        case 'SecurityError' :
            return DENIED ;
        case 'NotFoundError' :
        case 'NotReadableError' :
        case 'OverconstrainedError' :
            return NO_CAMERA ;
        default :
            return ERROR ;
    }
} ;

/**
 * Whether the page is shown — the camera stops while it is not.
 *
 * @returns {boolean}
 */
const usePageVisible = () =>
{
    const [ visible , setVisible ] = useState( true ) ;

    useEffect( () =>
    {
        const onChange = () => setVisible( document.visibilityState !== 'hidden' ) ;
        onChange() ;
        document.addEventListener( 'visibilitychange' , onChange ) ;
        return () => document.removeEventListener( 'visibilitychange' , onChange ) ;
    } , [] ) ;

    return visible ;
} ;

/**
 * BarcodeScanner — the camera, reading codes.
 *
 * Films with the back camera and reports every code it reads through
 * `onDetect( reading )`. It reads
 * QR codes and the linear formats the library draws by default ; `formats`
 * narrows or widens that, under the names of the Barcode Detection API.
 *
 * 🔑 **Two engines, one API.** Where the browser has its own `BarcodeDetector`
 * reading every requested format — Chrome on Android and macOS — it is used ;
 * everywhere else — every iPhone, Firefox, Chrome on Windows — ZXing compiled to
 * WebAssembly, through the optional peer `zxing-wasm`, loaded only then.
 * Its binary is served by the application (`oihana-copy-zxing-wasm`) and kept by
 * the offline service worker ; `preloadScanner()` fetches it ahead of need.
 * `onReady( { engine } )` says which one runs.
 *
 * 🔑 **The same reading from either engine.** The two disagree on GS1 — a native
 * detector may put the symbology identifier in the text (`]C1…` on Android),
 * ZXing keeps it apart — so every reading goes through
 * {@link module:helpers/barcodes/normalizeScan} :
 *
 * - `value` : the data alone, the field to use ;
 * - `rawValue` : the text as the engine gave it, untouched ;
 * - `format` : under the names of the Barcode Detection API (a GS1-128 is a `code_128`) ;
 * - `symbology` : the AIM identifier (`]C1`, `]E0`…) when known ;
 * - `gs1` and `elements` : whether the code carries GS1 data, and its elements `[ { ai , data } ]` ;
 * - `cornerPoints` and `boundingBox` : where it was, in the video's pixels.
 *
 * 🔑 **The camera is held only while it films.** It opens when `active` and the
 * page is shown, and every track is stopped when either stops, and on unmount :
 * a hidden tab does not keep the camera light on, nor drain the battery.
 *
 * 🔑 **One code, one call.** A code held in view is read many times a second ;
 * it is reported once, then again only after it has left the view for
 * `dedupeDelay` milliseconds. The same code read by both engines is the same
 * `value`, so it counts once.
 *
 * It draws its own states — opening, refused, no camera, no HTTPS — with a
 * retry where one can help. It makes no sound : pair it with
 * `useFeedbackSignal` if the screen wants one.
 *
 * ⚠️ **HTTPS only**, as every camera on the web : `localhost` counts as secure,
 * a phone reaching a computer by its address over plain HTTP does not.
 *
 * @module components/barcodes/BarcodeScanner
 *
 * @example
 * ```jsx
 * <BarcodeScanner onDetect={ ( { rawValue , format } ) => open( rawValue , format ) } />
 *
 * // Only product codes, paused while a sheet is open
 * <BarcodeScanner active={ !sheetOpen } formats={ [ 'ean_13' , 'ean_8' ] } onDetect={ addToCart } />
 * ```
 *
 * @param {Object} props
 * @param {boolean} [props.active=true] - Film and read. `false` stops the camera.
 * @param {string} [props.ariaLabel] - The name of the region. Defaults to the i18n `label` key read at `path`.
 * @param {React.ReactNode} [props.children] - Drawn over the video, under the states : a hint, a counter.
 * @param {string} [props.className] - Additional classes on the frame. It is `aspect-[3/4]` on a phone and `aspect-video` from `sm`.
 * @param {number} [props.dedupeDelay=1500] - How long a code must stay out of view before it is reported again, in milliseconds.
 * @param {'auto'|'native'|'zxing'} [props.engine='auto'] - The engine. `zxing` forces the WebAssembly one, the path of every iPhone.
 * @param {'environment'|'user'} [props.facingMode='environment'] - The back or the front camera.
 * @param {string[]} [props.formats] - The formats to read. Defaults to `SCANNER_FORMATS`.
 * @param {number} [props.interval=100] - The pause between two readings, in milliseconds : ten a second is plenty, and spares the battery.
 * @param {Function} [props.onDetect] - `( { value , rawValue , format , symbology , gs1 , elements , cornerPoints , boundingBox } ) => void`.
 * @param {Function} [props.onError] - `( error , status ) => void`, when the camera or the engine fails.
 * @param {Function} [props.onReady] - `( { engine , formats } ) => void`, once the camera films and the engine reads.
 * @param {string} [props.path='components.barcode.scanner'] - i18n path of the labels.
 * @param {boolean} [props.showTorch=true] - Offer the torch where the camera has one (Chrome on Android).
 * @param {boolean} [props.showViewfinder=true] - Draw the frame to aim with.
 */
const BarcodeScanner =
({
    active         = true ,
    ariaLabel ,
    children ,
    className ,
    dedupeDelay    = 1500 ,
    engine         = 'auto' ,
    facingMode     = 'environment' ,
    formats        = SCANNER_FORMATS ,
    interval       = 100 ,
    onDetect ,
    onError ,
    onReady ,
    path           = 'components.barcode.scanner' ,
    showTorch      = true ,
    showViewfinder = true ,

    ...rest
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const visible = usePageVisible() ;

    const [ status  , setStatus  ] = useState( IDLE ) ;
    const [ attempt , setAttempt ] = useState( 0 ) ;
    const [ torch   , setTorch   ] = useState( { available : false , on : false } ) ;

    const videoRef = useRef( null ) ;
    const trackRef = useRef( null ) ;

    // The latest callbacks, read by the loop without restarting the camera when they change.
    const callbacks = useRef( { onDetect , onError , onReady } ) ;

    useEffect( () =>
    {
        callbacks.current = { onDetect , onError , onReady } ;
    } , [ onDetect , onError , onReady ] ) ;

    const formatsKey = formats.join( ',' ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: `attempt` is read by no line, it is what « Try again » changes to start the camera over
    useEffect( () =>
    {
        if ( !active || !visible )
        {
            setStatus( IDLE ) ;
            return undefined ;
        }

        if ( !window.isSecureContext )
        {
            setStatus( INSECURE ) ;
            return undefined ;
        }

        if ( typeof navigator.mediaDevices?.getUserMedia !== 'function' )
        {
            setStatus( NO_CAMERA ) ;
            return undefined ;
        }

        const requested = formatsKey.split( ',' ) ;
        const seen      = new Map() ;

        let cancelled = false ;
        let failed    = false ;
        let stream    = null ;
        let timer     = null ;

        const stop = () =>
        {
            clearTimeout( timer ) ;

            for ( const track of stream?.getTracks() ?? [] )
            {
                track.stop() ;
            }

            stream           = null ;
            trackRef.current = null ;

            if ( videoRef.current )
            {
                videoRef.current.srcObject = null ;
            }
        } ;

        const report = codes =>
        {
            const now = performance.now() ;

            for ( const code of codes )
            {
                const reading = normalizeScan( code ) ;
                const key     = `${ reading.format }:${ reading.value }` ;
                const last    = seen.get( key ) ;

                seen.set( key , now ) ;

                if ( last === undefined || now - last > dedupeDelay )
                {
                    callbacks.current.onDetect?.( { ...reading , boundingBox : code.boundingBox , cornerPoints : code.cornerPoints } ) ;
                }
            }
        } ;

        setStatus( STARTING ) ;

        const start = async () =>
        {
            try
            {
                // The camera and the engine start together. Whichever settles last must not outlive a failure of
                // the other : a stream that arrives after the engine failed, or after unmount, is stopped on arrival.
                const media = navigator.mediaDevices
                    .getUserMedia( { audio : false , video : { facingMode : { ideal : facingMode } , height : { ideal : 720 } , width : { ideal : 1280 } } } )
                    .then( opened =>
                    {
                        if ( cancelled || failed )
                        {
                            for ( const track of opened.getTracks() )
                            {
                                track.stop() ;
                            }
                        }
                        else
                        {
                            stream = opened ;
                        }
                        return opened ;
                    } ) ;

                const [ , { detector , engine : running } ] = await Promise.all( [ media , createDetector( requested , { engine } ) ] ) ;

                if ( cancelled )
                {
                    stop() ;
                    return ;
                }

                const video = videoRef.current ;
                video.srcObject = stream ;
                await video.play().catch( () => null ) ;

                const [ track ] = stream.getVideoTracks() ;
                trackRef.current = track ;
                setTorch( { available : Boolean( track?.getCapabilities?.().torch ) , on : false } ) ;

                setStatus( SCANNING ) ;
                callbacks.current.onReady?.( { engine : running , formats : requested } ) ;

                const tick = async () =>
                {
                    if ( cancelled )
                    {
                        return ;
                    }

                    if ( video.readyState >= 2 )
                    {
                        try
                        {
                            report( await detector.detect( video ) ) ;
                        }
                        catch
                        {
                            // A frame that cannot be read is skipped : the next one may.
                        }
                    }

                    timer = setTimeout( tick , interval ) ;
                } ;

                tick() ;
            }
            catch ( error )
            {
                failed = true ;
                stop() ;

                if ( cancelled )
                {
                    return ;
                }

                const next = statusOf( error ) ;
                setStatus( next ) ;
                callbacks.current.onError?.( error , next ) ;
            }
        } ;

        start() ;

        return () =>
        {
            cancelled = true ;
            stop() ;
        } ;
    }
    , [ active , attempt , dedupeDelay , engine , facingMode , formatsKey , interval , visible ] ) ;

    const toggleTorch = async () =>
    {
        const on = !torch.on ;

        try
        {
            await trackRef.current?.applyConstraints( { advanced : [ { torch : on } ] } ) ;
            setTorch( { available : true , on } ) ;
        }
        catch
        {
            setTorch( { available : false , on : false } ) ;
        }
    } ;

    const Icon     = ICONS[ status ] ;
    const failed   = Boolean( Icon ) ;
    const message  = status === DENIED ? `${ labels.denied ?? '' } ${ labels.deniedHelp ?? '' }` : labels[ status ] ;
    const scanning = status === SCANNING ;

    return (
        <section
            aria-label = { ariaLabel ?? labels.label ?? 'Code reader' }
            className  = { cn( 'relative aspect-[3/4] overflow-hidden rounded-box bg-neutral text-neutral-content sm:aspect-video' , className ) }
            data-status = { status }
            { ...rest }
        >
            <video
                autoPlay
                className   = { cn( 'absolute inset-0 h-full w-full object-cover' , !scanning && 'invisible' ) }
                muted
                playsInline
                ref         = { videoRef }
            />

            { scanning && showViewfinder && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="aspect-[4/3] w-3/4 max-w-md rounded-box border-2 border-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
                </div>
            ) }

            { scanning && children }

            { status === STARTING && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <Loading color="neutral-content" size="lg" />
                    <span className="text-sm">{ labels.starting }</span>
                </div>
            ) }

            { failed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <Icon aria-hidden="true" className="h-10 w-10 opacity-80" />
                    <p className="max-w-sm text-sm">{ message }</p>
                    { status !== INSECURE && (
                        <Button onClick={ () => setAttempt( count => count + 1 ) } size="sm" style="outline" className="text-neutral-content">
                            { labels.retry }
                        </Button>
                    ) }
                </div>
            ) }

            { scanning && showTorch && torch.available && (
                <Button
                    className = "absolute right-3 bottom-3"
                    color     = { torch.on ? 'warning' : undefined }
                    icon      = { torch.on ? MdFlashOff : MdFlashOn }
                    onClick   = { toggleTorch }
                    shape     = "circle"
                    size      = "lg"
                    title     = { torch.on ? labels.torchOff : labels.torchOn }
                />
            ) }

            <span aria-live="polite" className="sr-only">
                { scanning ? labels.scanning : failed ? message : status === STARTING ? labels.starting : '' }
            </span>
        </section>
    ) ;
} ;

BarcodeScanner.displayName = 'BarcodeScanner' ;

export default BarcodeScanner ;
