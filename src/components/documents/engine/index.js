/**
 * The PDF engine : pdf.js, through `react-pdf`.
 *
 * Kept in one module, as the map and barcode engines are, so the rest of the
 * library never names `react-pdf` : the optional peer is imported here and
 * only here, dynamically, and never on the server — `pdfjs-dist` reaches for
 * a Node canvas there, which no application has.
 *
 * 🔑 **Every file the engine fetches at run time is served by the application
 * itself**, under `/pdfjs/<version>/` : the worker, the WebAssembly decoders,
 * the standard fonts, the character maps and the colour profiles. `react-pdf`
 * pins its own `pdfjs-dist`, and the version is read from it here, so the
 * folder `oihana-copy-pdfjs-assets` wrote and the one asked for can never
 * differ — pdf.js refuses an API and a worker of two versions.
 *
 * @module components/documents/engine
 */

import 'react-pdf/dist/Page/TextLayer.css' ;
import 'react-pdf/dist/Page/AnnotationLayer.css' ;

/**
 * Where the engine's files are served, under their version.
 *
 * Mirrors `DESTINATION` in `scripts/copy-pdfjs-assets.js` and `PDFJS_PATH` in
 * the offline service worker — one decision, written on each side because
 * nothing can be imported across them.
 *
 * @type {string}
 */
export const PDFJS_PATH = '/pdfjs' ;

/**
 * The name of the worker, as `oihana-copy-pdfjs-assets` writes it.
 *
 * @type {string}
 */
export const WORKER = 'pdf.worker.min.mjs' ;

let engine = null ;

/**
 * Loads `react-pdf` once, and points pdf.js at the files the application
 * serves instead of a CDN.
 *
 * The result carries the components (`Document`, `Page`, `Thumbnail`,
 * `Outline`), the `pdfjs` namespace, and **`options`** — the `getDocument`
 * options naming the served folders, frozen once so a `<Document>` given
 * them never sees a new object and never reloads for nothing.
 *
 * @returns {Promise<{ Document : React.ElementType , Outline : React.ElementType , Page : React.ElementType , Thumbnail : React.ElementType , options : Object , pdfjs : Object , version : string }>}
 */
export const loadEngine = () =>
{
    engine ??= import( 'react-pdf' ).then( module =>
    {
        const { pdfjs } = module ;

        const base = `${ PDFJS_PATH }/${ pdfjs.version }/` ;

        pdfjs.GlobalWorkerOptions.workerSrc = `${ base }${ WORKER }` ;

        const options = Object.freeze(
        {
            cMapPacked          : true ,
            cMapUrl             : `${ base }cmaps/` ,
            iccUrl              : `${ base }iccs/` ,
            standardFontDataUrl : `${ base }standard_fonts/` ,
            wasmUrl             : `${ base }wasm/` ,
        } ) ;

        return {
            Document  : module.Document ,
            Outline   : module.Outline ,
            Page      : module.Page ,
            Thumbnail : module.Thumbnail ,
            options ,
            pdfjs ,
            version   : pdfjs.version ,
        } ;
    } ) ;

    return engine ;
} ;

/**
 * Loads the engine ahead of its first use, so the worker is in the browser's
 * cache — and, with the offline service worker, available with no network.
 *
 * Does nothing on the server, and says `false` where the engine is not
 * installed : a page that lists documents can call it on mount without
 * caring whether this application ever opens one.
 *
 * @returns {Promise<boolean>} Whether the engine is ready.
 *
 * @example
 * ```js
 * useEffect( () => { preloadPdf() ; } , [] ) ;
 * ```
 */
export const preloadPdf = async () =>
{
    if ( typeof window === 'undefined' )
    {
        return false ;
    }

    try
    {
        await loadEngine() ;
        return true ;
    }
    catch
    {
        return false ;
    }
} ;

/**
 * Opens a PDF outside React : the pages, their count, their text — for a
 * thumbnail drawn by hand, a page count shown before any page is rendered,
 * or a test.
 *
 * `signal` destroys the loading task when it aborts, so a slow document
 * never lands after a faster one replaced it.
 *
 * @param {import('../../../helpers/pdf/toPdfSource').PdfSource} source - A url, a `Blob`, a `File`, a buffer, or `{ url , headers }`.
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal] - Aborts the loading.
 * @returns {Promise<Object>} The pdf.js document (`numPages`, `getPage( n )`, `destroy()`).
 */
export const loadPdf = async ( source , { signal } = {} ) =>
{
    const [ { pdfjs , options } , { default : toPdfSource } ] = await Promise.all(
    [
        loadEngine() ,
        import( '../../../helpers/pdf/toPdfSource' ) ,
    ] ) ;

    const task = pdfjs.getDocument( { ...options , ...await toPdfSource( source ) } ) ;

    signal?.addEventListener( 'abort' , () => { task.destroy() ; } , { once : true } ) ;

    return task.promise ;
} ;
