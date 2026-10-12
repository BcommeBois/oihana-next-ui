/**
 * The barcode reading engine : the browser's own `BarcodeDetector` where it
 * reads every requested format, ZXing in WebAssembly everywhere else.
 *
 * Kept in one module, as the map engine is, so the rest of the library never
 * names `barcode-detector` : the optional peer is imported here and only here,
 * and only when it is needed — on a phone with a native detector, neither its
 * JavaScript nor its WebAssembly is ever downloaded.
 *
 * @module components/barcodes/engine
 */

/**
 * Where the WebAssembly reader is served, under its version.
 *
 * Mirrors `DESTINATION` in `scripts/copy-zxing-wasm.js` and `ZXING_PATH` in
 * the offline service worker — one decision, written on each side because
 * nothing can be imported across them.
 *
 * @type {string}
 */
export const ZXING_PATH = '/zxing' ;

/**
 * The formats read by default : those the library draws, under the names of
 * the Barcode Detection API — a GS1-128 reads as `code_128`, an ITF-14 as `itf`.
 *
 * @type {string[]}
 */
export const SCANNER_FORMATS = [ 'qr_code' , 'code_128' , 'ean_13' , 'ean_8' , 'upc_a' , 'itf' ] ;

export const NATIVE = 'native' ;
export const ZXING  = 'zxing' ;

let ponyfill  = null ;
let overrides = null ;

/**
 * Loads the ponyfill once, and points it at the reader served by the
 * application instead of its default CDN.
 *
 * @returns {Promise<Object>} The `barcode-detector/ponyfill` module.
 */
const loadPonyfill = () =>
{
    ponyfill ??= import( 'barcode-detector/ponyfill' ).then( module =>
    {
        // One object, kept : the module compares its overrides to decide whether to load the WebAssembly again.
        overrides =
        {
            locateFile : ( path , prefix ) => path.endsWith( '.wasm' ) ? `${ ZXING_PATH }/${ module.ZXING_WASM_VERSION }/${ path }` : prefix + path ,
        } ;

        module.prepareZXingModule( { overrides } ) ;

        return module ;
    } ) ;

    return ponyfill ;
} ;

/**
 * Whether the browser's own detector reads every requested format.
 *
 * @param {string[]} formats
 * @returns {Promise<boolean>}
 */
const nativeReads = async formats =>
{
    const Detector = globalThis.BarcodeDetector ;

    if ( typeof Detector !== 'function' )
    {
        return false ;
    }

    try
    {
        const supported = await Detector.getSupportedFormats() ;
        return formats.every( format => supported.includes( format ) ) ;
    }
    catch
    {
        return false ;
    }
} ;

/**
 * Creates a detector for the requested formats.
 *
 * @param {string[]} [formats=SCANNER_FORMATS] - The formats to read, named as the Barcode Detection API names them.
 * @param {Object} [options]
 * @param {'auto'|'native'|'zxing'} [options.engine='auto'] - `auto` prefers the native detector ; `zxing`
 *        forces the WebAssembly one — the path of every iPhone, worth trying on a device that has both.
 * @returns {Promise<{ detector : { detect : Function } , engine : 'native'|'zxing' }>}
 * @throws {Error} When `native` is forced on a browser without it.
 */
export const createDetector = async ( formats = SCANNER_FORMATS , { engine = 'auto' } = {} ) =>
{
    if ( engine !== ZXING && await nativeReads( formats ) )
    {
        return { detector : new globalThis.BarcodeDetector( { formats } ) , engine : NATIVE } ;
    }

    if ( engine === NATIVE )
    {
        throw new Error( 'This browser has no native BarcodeDetector for these formats.' ) ;
    }

    const { BarcodeDetector } = await loadPonyfill() ;

    return { detector : new BarcodeDetector( { formats } ) , engine : ZXING } ;
} ;

/**
 * Fetches the WebAssembly reader ahead of need.
 *
 * Call it while online — at sign-in, on the home screen — on a device that will
 * scan offline : the offline service worker keeps the reader once fetched, so
 * the first scan without a network finds it. Does nothing where the native
 * detector reads every default format, nor on a server.
 *
 * @param {Object} [options]
 * @param {string[]} [options.formats=SCANNER_FORMATS] - The formats that will be read.
 * @param {boolean} [options.force=false] - Fetch it even where the native detector would do.
 * @returns {Promise<boolean>} Whether the reader is ready.
 *
 * @example
 * ```js
 * useEffect( () => { preloadScanner() ; } , [] ) ;
 * ```
 */
export const preloadScanner = async ( { formats = SCANNER_FORMATS , force = false } = {} ) =>
{
    if ( typeof window === 'undefined' )
    {
        return false ;
    }

    if ( !force && await nativeReads( formats ) )
    {
        return true ;
    }

    try
    {
        const module = await loadPonyfill() ;
        await module.prepareZXingModule( { fireImmediately : true , overrides } ) ;
        return true ;
    }
    catch
    {
        return false ;
    }
} ;
